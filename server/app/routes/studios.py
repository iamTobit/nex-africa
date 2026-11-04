from flask import Blueprint, request
from app.extensions import db
from app.models.portfolio import StudioProject
from app.models.rate_card import ServicePackage
from app.models.inquiry import Inquiry
from app.models.ecosystem import Niche
from app.utils.responses import success_response, error_response
from app.utils.validators import validate_required_fields, is_valid_email

studios_bp = Blueprint("studios", __name__, url_prefix="/api/studios")


@studios_bp.route("/portfolio", methods=["GET"])
def list_portfolio():
    """List studio projects and video reels, filterable by category, media_type, or featured."""
    category = request.args.get("category")
    media_type = request.args.get("media_type")
    is_featured = request.args.get("featured")

    query = StudioProject.query

    if category and category.lower() != "all":
        query = query.filter(StudioProject.category.ilike(f"%{category.strip()}%"))

    if media_type:
        query = query.filter_by(media_type=media_type.strip())

    if is_featured is not None:
        val = is_featured.lower() in ("true", "1")
        query = query.filter_by(is_featured=val)

    projects = query.order_by(StudioProject.created_at.desc()).all()
    return success_response(
        data=[p.to_dict() for p in projects],
        message="Studios portfolio retrieved successfully",
        meta={"total": len(projects)}
    )


@studios_bp.route("/categories", methods=["GET"])
def list_categories():
    """Return distinct project categories."""
    categories = db.session.query(StudioProject.category).distinct().all()
    cats = sorted([c[0] for c in categories if c[0]])
    return success_response(data=cats, message="Studio project categories retrieved successfully")


@studios_bp.route("/rate-card", methods=["GET"])
def get_rate_card():
    """Retrieve NexStudios rate card service packages."""
    category = request.args.get("category")
    query = ServicePackage.query

    if category:
        query = query.filter(ServicePackage.category.ilike(f"%{category.strip()}%"))

    packages = query.order_by(ServicePackage.sort_order.asc()).all()
    return success_response(
        data=[pkg.to_dict() for pkg in packages],
        message="Rate card packages retrieved successfully"
    )


@studios_bp.route("/book", methods=["POST"])
def book_studio_session():
    """Booking CTA for photo/video production sessions or event coverage."""
    data = request.get_json(silent=True) or {}
    valid, err = validate_required_fields(data, ["full_name", "email", "service_type", "message"])
    if not valid:
        return error_response(message=err, status_code=400)

    email = data.get("email", "").strip()
    if not is_valid_email(email):
        return error_response(message="Please provide a valid email address", status_code=400)

    inquiry = Inquiry(
        inquiry_type="booking",
        target_niche="nexstudios-africa",
        full_name=data.get("full_name").strip(),
        email=email,
        phone=data.get("phone"),
        organization=data.get("organization") or data.get("company"),
        subject=f"NexStudios Booking — {data.get('service_type')}",
        message=data.get("message").strip(),
        metadata_json={
            "service_type": data.get("service_type"),
            "package_id": data.get("package_id"),
            "preferred_date": data.get("preferred_date"),
            "shoot_location": data.get("location", "Nairobi Studio / On-Location"),
            "estimated_budget": data.get("estimated_budget"),
            "project_scope": data.get("project_scope"),
        },
        status="new",
    )
    db.session.add(inquiry)
    db.session.commit()

    return success_response(
        data=inquiry.to_dict(),
        message="Your production inquiry has been received! Our creative producer will contact you within 24 hours.",
        status_code=201
    )
