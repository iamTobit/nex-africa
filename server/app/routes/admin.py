from datetime import datetime
from flask import Blueprint, jsonify
from app.extensions import db
from app.models.ecosystem import Niche
from app.models.portfolio import Artwork, StudioProject
from app.models.cuisine import MenuItem
from app.models.event import Event
from app.models.inquiry import Inquiry
from app.models.newsletter import NewsletterSubscriber
from app.utils.responses import success_response, error_response

admin_bp = Blueprint("admin", __name__, url_prefix="/api")


@admin_bp.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint that tests database connectivity."""
    db_status = "connected"
    try:
        db.session.execute(db.text("SELECT 1"))
    except Exception as e:
        db_status = f"unreachable: {str(e)}"

    return jsonify({
        "status": "healthy" if "unreachable" not in db_status else "degraded",
        "service": "Nexafrica Group Backend API",
        "timestamp": datetime.utcnow().isoformat(),
        "database": db_status,
        "active_niches": [
            "nexafrica-group",
            "nexart-africa",
            "nexstudios-africa",
            "nexafricuisine",
        ],
    })


@admin_bp.route("/admin/overview", methods=["GET"])
def admin_overview():
    """Ecosystem summary metrics across all niches, inquiries, and entities."""
    inquiries_by_type = db.session.query(
        Inquiry.inquiry_type, db.func.count(Inquiry.id)
    ).group_by(Inquiry.inquiry_type).all()

    inquiries_by_niche = db.session.query(
        Inquiry.target_niche, db.func.count(Inquiry.id)
    ).group_by(Inquiry.target_niche).all()

    recent_inquiries = Inquiry.query.order_by(Inquiry.created_at.desc()).limit(5).all()

    data = {
        "metrics": {
            "total_niches": Niche.query.count(),
            "active_niches": Niche.query.filter_by(is_active=True).count(),
            "artworks_catalog": Artwork.query.count(),
            "studio_projects": StudioProject.query.count(),
            "cuisine_menu_items": MenuItem.query.count(),
            "total_events": Event.query.count(),
            "upcoming_events": Event.query.filter(Event.is_past == False).count(),
            "total_inquiries": Inquiry.query.count(),
            "newsletter_subscribers": NewsletterSubscriber.query.filter_by(is_active=True).count(),
        },
        "inquiries_breakdown": {
            "by_type": {t: c for t, c in inquiries_by_type},
            "by_niche": {n: c for n, c in inquiries_by_niche},
        },
        "recent_inquiries": [i.to_dict() for i in recent_inquiries],
    }
    return success_response(data=data, message="Admin overview metrics retrieved successfully")


@admin_bp.route("/instagram/<niche_slug>", methods=["GET"])
def get_instagram_feed(niche_slug):
    """
    Returns curated recent Instagram posts for each niche page
    (fulfills brief requirement: 'Embedded Instagram feed on each niche page or a simple recent-posts grid').
    """
    niche = Niche.query.filter_by(slug=niche_slug.lower()).first()
    handle = niche.instagram_handle if niche else f"@{niche_slug}"

    # Curated feed items per entity
    feeds_by_slug = {
        "nexart-africa": [
            {
                "id": "ig-art-1",
                "caption": "Studio visits with Wanjiku Mwangi in Karen. Red soil pigments and ancient memories on canvas. 🎨✨",
                "image_url": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
                "likes": 342,
                "comments": 28,
                "timestamp": "2 days ago",
                "permalink": "https://instagram.com/nexartafrica",
            },
            {
                "id": "ig-art-2",
                "caption": "Otieno Ochieng twisting sisal into monumental forms for the upcoming exhibition. Craft is power. #NexArtAfrica",
                "image_url": "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=800&q=80",
                "likes": 512,
                "comments": 41,
                "timestamp": "5 days ago",
                "permalink": "https://instagram.com/nexartafrica",
            },
            {
                "id": "ig-art-3",
                "caption": "Collectors preview night at the gallery. Conversations that challenge and inspire. #AfricanArt",
                "image_url": "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80",
                "likes": 289,
                "comments": 19,
                "timestamp": "1 week ago",
                "permalink": "https://instagram.com/nexartafrica",
            },
            {
                "id": "ig-art-4",
                "caption": "Gold and geometric mastery. Kofi Mensah’s latest piece in detail. #EmergingArtists",
                "image_url": "https://images.unsplash.com/photo-1582561173612-421718cb17ec?auto=format&fit=crop&w=800&q=80",
                "likes": 476,
                "comments": 33,
                "timestamp": "2 weeks ago",
                "permalink": "https://instagram.com/nexartafrica",
            },
        ],
        "nexstudios-africa": [
            {
                "id": "ig-studios-1",
                "caption": "Behind the lens on our Swahili Coast couture campaign. 6K anamorphic frames under the Lamu sun. 🎬",
                "image_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
                "likes": 620,
                "comments": 54,
                "timestamp": "1 day ago",
                "permalink": "https://instagram.com/nexstudiosafrica",
            },
            {
                "id": "ig-studios-2",
                "caption": "Color grading suite: fine-tuning the skin tones and warm dusk shadows for our upcoming Benga docuseries.",
                "image_url": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
                "likes": 410,
                "comments": 22,
                "timestamp": "4 days ago",
                "permalink": "https://instagram.com/nexstudiosafrica",
            },
            {
                "id": "ig-studios-3",
                "caption": "Executive portraits that tell a story. Lighting setup for our latest Venture Africa cover shoot.",
                "image_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
                "likes": 388,
                "comments": 17,
                "timestamp": "1 week ago",
                "permalink": "https://instagram.com/nexstudiosafrica",
            },
            {
                "id": "ig-studios-4",
                "caption": "Gimbal ready, sound rolling. Telling Africa's visual story, one production at a time. #NexStudios",
                "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
                "likes": 530,
                "comments": 39,
                "timestamp": "2 weeks ago",
                "permalink": "https://instagram.com/nexstudiosafrica",
            },
        ],
        "nexafricuisine": [
            {
                "id": "ig-cuisine-1",
                "caption": "Smoked Suya beef ribs fresh off the coals. 48 hours of slow heat and hand-ground yaji spice. 🥩🔥",
                "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
                "likes": 890,
                "comments": 76,
                "timestamp": "3 days ago",
                "permalink": "https://instagram.com/nexafricuisine",
            },
            {
                "id": "ig-cuisine-2",
                "caption": "Cardamom, fresh tamarind, and cold-pressed coconut milk simmering for our Lamu Red Snapper. Heritage on a plate. #NexAfriCuisine",
                "image_url": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
                "likes": 745,
                "comments": 58,
                "timestamp": "6 days ago",
                "permalink": "https://instagram.com/nexafricuisine",
            },
            {
                "id": "ig-cuisine-3",
                "caption": "Golden cassava croquettes with baobab-scotch bonnet honey. An homage to Kenyan root harvests.",
                "image_url": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
                "likes": 612,
                "comments": 34,
                "timestamp": "1 week ago",
                "permalink": "https://instagram.com/nexafricuisine",
            },
            {
                "id": "ig-cuisine-4",
                "caption": "Wild hibiscus, raw ginger, and pure baobab nectar. Nourishment rooted in the soil. #NexAfriCuisine",
                "image_url": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
                "likes": 520,
                "comments": 29,
                "timestamp": "2 weeks ago",
                "permalink": "https://instagram.com/nexafricuisine",
            },
        ],
        "nexevents-africa": [
            {
                "id": "ig-events-1",
                "caption": "The stage is set. Nairobi's cultural calendar begins here. #NexEventsAfrica",
                "image_url": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
                "likes": 412,
                "comments": 31,
                "timestamp": "1 week ago",
                "permalink": "https://instagram.com/nexeventsafrica",
            },
        ],
        "nexafrica-group": [
            {
                "id": "ig-group-1",
                "caption": "One idea, many expressions. The creative ecosystem in motion across Nairobi. #NexafricaGroup",
                "image_url": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
                "likes": 980,
                "comments": 88,
                "timestamp": "3 days ago",
                "permalink": "https://instagram.com/nexafricagroup",
            },
        ],
    }

    posts = feeds_by_slug.get(niche_slug.lower(), feeds_by_slug["nexafrica-group"])
    return success_response(
        data={"handle": handle, "posts": posts},
        message=f"Instagram feed for {handle} retrieved successfully"
    )
