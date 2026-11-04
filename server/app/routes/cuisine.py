from flask import Blueprint, request
from app.extensions import db
from app.models.cuisine import MenuItem
from app.models.ecosystem import Niche
from app.models.inquiry import Inquiry
from app.utils.responses import success_response, error_response
from app.utils.validators import validate_required_fields, is_valid_email

cuisine_bp = Blueprint("cuisine", __name__, url_prefix="/api/cuisine")


@cuisine_bp.route("/menu", methods=["GET"])
def list_menu_items():
    """List menu highlights and products, filterable by category, signature, or availability."""
    category = request.args.get("category")
    is_signature = request.args.get("signature")
    is_available = request.args.get("available")

    query = MenuItem.query

    if category and category.lower() != "all":
        query = query.filter(MenuItem.category.ilike(f"%{category.strip()}%"))

    if is_signature is not None:
        val = is_signature.lower() in ("true", "1")
        query = query.filter_by(is_signature=val)

    if is_available is not None:
        val = is_available.lower() in ("true", "1")
        query = query.filter_by(is_available=val)

    items = query.order_by(MenuItem.sort_order.asc(), MenuItem.created_at.desc()).all()
    return success_response(
        data=[item.to_dict() for item in items],
        message="Cuisine menu items retrieved successfully",
        meta={"total": len(items)}
    )


@cuisine_bp.route("/categories", methods=["GET"])
def list_categories():
    """Return distinct menu categories."""
    categories = db.session.query(MenuItem.category).distinct().all()
    cats = sorted([c[0] for c in categories if c[0]])
    return success_response(data=cats, message="Cuisine categories retrieved successfully")


@cuisine_bp.route("/menu/<int:item_id>", methods=["GET"])
def get_menu_item(item_id):
    """Retrieve single dish or culinary product."""
    item = db.session.get(MenuItem, item_id)
    if not item:
        return error_response(message="Menu item not found", status_code=404)
    return success_response(data=item.to_dict(), message="Menu item retrieved successfully")


@cuisine_bp.route("/catering-inquiry", methods=["POST"])
def submit_catering_inquiry():
    """Catering and private dining booking CTA."""
    data = request.get_json(silent=True) or {}
    valid, err = validate_required_fields(data, ["full_name", "email", "event_type", "message"])
    if not valid:
        return error_response(message=err, status_code=400)

    email = data.get("email", "").strip()
    if not is_valid_email(email):
        return error_response(message="Please provide a valid email address", status_code=400)

    inquiry = Inquiry(
        inquiry_type="booking",
        target_niche="nexafricuisine",
        full_name=data.get("full_name").strip(),
        email=email,
        phone=data.get("phone"),
        organization=data.get("organization") or data.get("company"),
        subject=f"NexAfriCuisine Catering — {data.get('event_type')}",
        message=data.get("message").strip(),
        metadata_json={
            "event_type": data.get("event_type"),  # "Private Dinner", "Corporate Gala", "Wedding", "Tasting Session"
            "estimated_guest_count": data.get("guest_count"),
            "event_date": data.get("event_date"),
            "venue_location": data.get("location"),
            "dietary_preferences": data.get("dietary_preferences", []),
            "selected_menu_items": data.get("selected_menu_items", []),
        },
        status="new",
    )
    db.session.add(inquiry)
    db.session.commit()

    return success_response(
        data=inquiry.to_dict(),
        message="Thank you! Your catering inquiry has been received. Our culinary curator will get in touch shortly.",
        status_code=201
    )
