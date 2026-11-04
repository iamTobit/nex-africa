from flask import Blueprint, request
from app.extensions import db
from app.models.portfolio import Artwork
from app.models.ecosystem import Niche
from app.models.inquiry import Inquiry
from app.utils.responses import success_response, error_response
from app.utils.validators import validate_required_fields, is_valid_email

art_bp = Blueprint("art", __name__, url_prefix="/api/art")


@art_bp.route("/artworks", methods=["GET"])
def list_artworks():
    """List artworks filterable by category, featured, for_sale, or search."""
    category = request.args.get("category")
    is_featured = request.args.get("featured")
    for_sale = request.args.get("for_sale")
    search = request.args.get("search")

    query = Artwork.query

    if category and category.lower() != "all":
        query = query.filter(Artwork.category.ilike(f"%{category.strip()}%"))

    if is_featured is not None:
        val = is_featured.lower() in ("true", "1")
        query = query.filter_by(is_featured=val)

    if for_sale is not None:
        val = for_sale.lower() in ("true", "1")
        query = query.filter_by(is_for_sale=val)

    if search:
        term = f"%{search.strip()}%"
        query = query.filter(
            db.or_(
                Artwork.title.ilike(term),
                Artwork.artist_name.ilike(term),
                Artwork.description.ilike(term),
                Artwork.medium.ilike(term),
            )
        )

    artworks = query.order_by(Artwork.created_at.desc()).all()
    return success_response(
        data=[a.to_dict() for a in artworks],
        message="Artworks retrieved successfully",
        meta={"total": len(artworks)}
    )


@art_bp.route("/categories", methods=["GET"])
def list_categories():
    """Return distinct artwork categories."""
    categories = db.session.query(Artwork.category).distinct().all()
    cats = sorted([c[0] for c in categories if c[0]])
    return success_response(data=cats, message="Artwork categories retrieved successfully")


@art_bp.route("/artworks/<int:artwork_id>", methods=["GET"])
def get_artwork(artwork_id):
    """Retrieve single artwork details."""
    artwork = db.session.get(Artwork, artwork_id)
    if not artwork:
        return error_response(message="Artwork not found", status_code=404)
    return success_response(data=artwork.to_dict(), message="Artwork details retrieved successfully")


@art_bp.route("/submit-work", methods=["POST"])
def submit_artist_work():
    """Submit your work CTA: artists can submit their portfolio/details for NexArt review."""
    data = request.get_json(silent=True) or {}
    
    valid, err = validate_required_fields(data, ["artist_name", "email", "portfolio_url", "bio"])
    if not valid:
        return error_response(message=err, status_code=400)

    email = data.get("email", "").strip()
    if not is_valid_email(email):
        return error_response(message="Please provide a valid email address", status_code=400)

    inquiry = Inquiry(
        inquiry_type="artist_submission",
        target_niche="nexart-africa",
        full_name=data.get("artist_name").strip(),
        email=email,
        phone=data.get("phone"),
        organization=data.get("organization") or data.get("collective"),
        subject=f"NexArt Artist Submission — {data.get('artist_name')}",
        message=data.get("bio", "").strip(),
        metadata_json={
            "portfolio_url": data.get("portfolio_url"),
            "instagram_handle": data.get("instagram_handle"),
            "primary_medium": data.get("primary_medium", "Visual Arts"),
            "location": data.get("location", "Nairobi"),
            "exhibitions_summary": data.get("exhibitions_summary"),
            "sample_links": data.get("sample_links", []),
        },
        status="new",
    )
    db.session.add(inquiry)
    db.session.commit()

    return success_response(
        data=inquiry.to_dict(),
        message="Thank you! Your artist submission has been received by the NexArt Africa curatorial team.",
        status_code=201
    )


@art_bp.route("/artworks", methods=["POST"])
def create_artwork():
    """Create a new artwork in the gallery."""
    data = request.get_json(silent=True) or {}
    valid, err = validate_required_fields(data, ["title", "artist_name", "category", "image_url"])
    if not valid:
        return error_response(message=err, status_code=400)

    niche = Niche.query.filter_by(slug="nexart-africa").first()
    if not niche:
        return error_response(message="NexArt Africa niche not configured in database", status_code=500)

    artwork = Artwork(
        niche_id=niche.id,
        title=data.get("title").strip(),
        artist_name=data.get("artist_name").strip(),
        category=data.get("category").strip(),
        medium=data.get("medium"),
        dimensions=data.get("dimensions"),
        year=data.get("year", 2026),
        price=data.get("price"),
        currency=data.get("currency", "KES"),
        is_for_sale=bool(data.get("is_for_sale", False)),
        is_featured=bool(data.get("is_featured", False)),
        image_url=data.get("image_url").strip(),
        description=data.get("description"),
        exhibition_title=data.get("exhibition_title"),
    )
    db.session.add(artwork)
    db.session.commit()

    return success_response(
        data=artwork.to_dict(),
        message="Artwork added successfully",
        status_code=201
    )
