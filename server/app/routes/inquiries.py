from flask import Blueprint, request
from app.extensions import db
from app.models.inquiry import Inquiry
from app.utils.responses import success_response, error_response
from app.utils.validators import validate_required_fields, is_valid_email

inquiries_bp = Blueprint("inquiries", __name__, url_prefix="/api/inquiries")

VALID_NICHES = {
    "nexafrica-group",
    "nexart-africa",
    "nexstudios-africa",
    "nexafricuisine",
    "nexevents-africa",
}


@inquiries_bp.route("/contact", methods=["POST"])
def submit_general_contact():
    """General inquiry form, routes to the right niche by dropdown target_niche."""
    data = request.get_json(silent=True) or {}
    valid, err = validate_required_fields(data, ["full_name", "email", "message"])
    if not valid:
        return error_response(message=err, status_code=400)

    email = data.get("email", "").strip()
    if not is_valid_email(email):
        return error_response(message="Please provide a valid email address", status_code=400)

    target_niche = (data.get("target_niche") or "nexafrica-group").strip().lower()
    if target_niche not in VALID_NICHES:
        target_niche = "nexafrica-group"

    inquiry = Inquiry(
        inquiry_type="contact",
        target_niche=target_niche,
        full_name=data.get("full_name").strip(),
        email=email,
        phone=data.get("phone"),
        organization=data.get("organization"),
        subject=data.get("subject", "General Inquiry"),
        message=data.get("message").strip(),
        metadata_json={
            "preferred_contact_method": data.get("preferred_contact_method", "email"),
            "source": data.get("source", "website_contact_form"),
        },
        status="new",
    )
    db.session.add(inquiry)
    db.session.commit()

    return success_response(
        data=inquiry.to_dict(),
        message=f"Thank you, {inquiry.full_name}! Your message has been routed to the {target_niche} team.",
        status_code=201
    )


@inquiries_bp.route("/partner-invest", methods=["POST"])
def submit_partner_invest_inquiry():
    """Partner / Invest inquiry form for prospective student partners and future investors."""
    data = request.get_json(silent=True) or {}
    valid, err = validate_required_fields(data, ["full_name", "email", "area_of_interest", "message"])
    if not valid:
        return error_response(message=err, status_code=400)

    email = data.get("email", "").strip()
    if not is_valid_email(email):
        return error_response(message="Please provide a valid email address", status_code=400)

    inquiry = Inquiry(
        inquiry_type="partner_invest",
        target_niche="nexafrica-group",
        full_name=data.get("full_name").strip(),
        email=email,
        phone=data.get("phone"),
        organization=data.get("organization") or data.get("institution"),
        subject=f"Partner / Invest Inquiry: {data.get('area_of_interest')}",
        message=data.get("message").strip(),
        metadata_json={
            "area_of_interest": data.get("area_of_interest"),  # "student_partner", "investor", "cultural_institution", "brand_sponsor"
            "institution_or_firm": data.get("organization"),
            "proposed_scope": data.get("proposed_scope"),
            "timeline": data.get("timeline"),
        },
        status="new",
    )
    db.session.add(inquiry)
    db.session.commit()

    return success_response(
        data=inquiry.to_dict(),
        message="Thank you! Your partnership & investment proposal has been delivered directly to Nexafrica leadership.",
        status_code=201
    )


@inquiries_bp.route("", methods=["GET"])
def list_inquiries():
    """List inquiries for administration, filterable by type, niche, or status."""
    inquiry_type = request.args.get("type")
    niche = request.args.get("niche")
    status = request.args.get("status")

    query = Inquiry.query

    if inquiry_type:
        query = query.filter_by(inquiry_type=inquiry_type)
    if niche:
        query = query.filter_by(target_niche=niche)
    if status:
        query = query.filter_by(status=status)

    inquiries = query.order_by(Inquiry.created_at.desc()).all()
    return success_response(
        data=[i.to_dict() for i in inquiries],
        message="Inquiries retrieved successfully",
        meta={"total": len(inquiries)}
    )


@inquiries_bp.route("/<int:inquiry_id>/status", methods=["PATCH"])
def update_inquiry_status(inquiry_id):
    """Update workflow status of an inquiry."""
    inquiry = db.session.get(Inquiry, inquiry_id)
    if not inquiry:
        return error_response(message="Inquiry not found", status_code=404)

    data = request.get_json(silent=True) or {}
    new_status = data.get("status")
    if new_status:
        inquiry.status = new_status
    if "internal_notes" in data:
        inquiry.internal_notes = data["internal_notes"]

    db.session.commit()
    return success_response(data=inquiry.to_dict(), message="Inquiry status updated")
