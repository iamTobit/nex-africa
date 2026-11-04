from flask import Blueprint, request
from app.models.ecosystem import Niche, EcosystemVision
from app.utils.responses import success_response, error_response

ecosystem_bp = Blueprint("ecosystem", __name__, url_prefix="/api")


@ecosystem_bp.route("/ecosystem", methods=["GET"])
def get_ecosystem():
    """Returns the top-level Nexafrica Group brand narrative, six verbs, values, and all niches."""
    vision = EcosystemVision.query.first()
    niches = Niche.query.order_by(Niche.sort_order.asc()).all()

    data = {
        "group_vision": vision.to_dict() if vision else {},
        "niches": [n.to_dict(include_stats=True) for n in niches],
    }
    return success_response(data=data, message="Nexafrica ecosystem retrieved successfully")


@ecosystem_bp.route("/niches", methods=["GET"])
def list_niches():
    """List all niches, optionally filtering by active status."""
    active_only = request.args.get("active_only", "false").lower() in ("true", "1")
    
    query = Niche.query
    if active_only:
        query = query.filter_by(is_active=True)
    
    niches = query.order_by(Niche.sort_order.asc()).all()
    return success_response(
        data=[n.to_dict(include_stats=True) for n in niches],
        message="Niches retrieved successfully"
    )


@ecosystem_bp.route("/niches/<slug>", methods=["GET"])
def get_niche_by_slug(slug):
    """Retrieve full detail for a specific niche entity."""
    niche = Niche.query.filter_by(slug=slug.lower()).first()
    if not niche:
        return error_response(message=f"Niche with slug '{slug}' not found", status_code=404)

    return success_response(
        data=niche.to_dict(include_stats=True),
        message=f"{niche.name} retrieved successfully"
    )
