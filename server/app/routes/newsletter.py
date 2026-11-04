from flask import Blueprint, request
from app.extensions import db
from app.models.newsletter import NewsletterSubscriber
from app.utils.responses import success_response, error_response
from app.utils.validators import validate_required_fields, is_valid_email

newsletter_bp = Blueprint("newsletter", __name__, url_prefix="/api/newsletter")


@newsletter_bp.route("/subscribe", methods=["POST"])
def subscribe():
    """Subscribe to Nexafrica ecosystem updates and niche announcements."""
    data = request.get_json(silent=True) or {}
    valid, err = validate_required_fields(data, ["email"])
    if not valid:
        return error_response(message=err, status_code=400)

    email = data.get("email", "").strip().lower()
    if not is_valid_email(email):
        return error_response(message="Please provide a valid email address", status_code=400)

    existing = NewsletterSubscriber.query.filter_by(email=email).first()
    if existing:
        if not existing.is_active:
            existing.is_active = True
            db.session.commit()
            return success_response(
                data=existing.to_dict(),
                message="Welcome back! Your subscription has been reactivated."
            )
        return success_response(
            data=existing.to_dict(),
            message="You are already subscribed to Nexafrica updates."
        )

    subscriber = NewsletterSubscriber(
        email=email,
        niche_interest=data.get("niche_interest", "all"),
        is_active=True
    )
    db.session.add(subscriber)
    db.session.commit()

    return success_response(
        data=subscriber.to_dict(),
        message="Thank you for subscribing to Nexafrica updates!",
        status_code=201
    )


@newsletter_bp.route("/subscribers", methods=["GET"])
def list_subscribers():
    """List active newsletter subscribers."""
    subscribers = NewsletterSubscriber.query.order_by(NewsletterSubscriber.subscribed_at.desc()).all()
    return success_response(
        data=[s.to_dict() for s in subscribers],
        message="Subscribers retrieved successfully",
        meta={"total": len(subscribers)}
    )
