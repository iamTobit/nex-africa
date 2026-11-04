from datetime import datetime
from flask import Blueprint, request
from app.extensions import db
from app.models.event import Event
from app.models.inquiry import Inquiry
from app.utils.responses import success_response, error_response
from app.utils.validators import validate_required_fields, is_valid_email

events_bp = Blueprint("events", __name__, url_prefix="/api/events")


@events_bp.route("", methods=["GET"])
def list_events():
    """List events with optional upcoming/past or niche filtering."""
    upcoming = request.args.get("upcoming")
    niche_slug = request.args.get("niche_slug")
    category = request.args.get("category")

    query = Event.query

    if upcoming is not None:
        is_upcoming = upcoming.lower() in ("true", "1")
        if is_upcoming:
            query = query.filter(Event.is_past == False, Event.event_date >= datetime.utcnow())
        else:
            query = query.filter(db.or_(Event.is_past == True, Event.event_date < datetime.utcnow()))

    if niche_slug and niche_slug.lower() != "all":
        query = query.filter_by(niche_slug=niche_slug.strip())

    if category:
        query = query.filter(Event.category.ilike(f"%{category.strip()}%"))

    # Upcoming ordered ascending, past ordered descending
    if upcoming and upcoming.lower() in ("true", "1"):
        events = query.order_by(Event.event_date.asc()).all()
    else:
        events = query.order_by(Event.event_date.desc()).all()

    return success_response(
        data=[e.to_dict() for e in events],
        message="Events retrieved successfully",
        meta={"total": len(events)}
    )


@events_bp.route("/upcoming", methods=["GET"])
def get_upcoming_events():
    """Calendar of upcoming cultural events across Nexafrica."""
    events = (
        Event.query.filter(Event.is_past == False, Event.event_date >= datetime.utcnow())
        .order_by(Event.event_date.asc())
        .all()
    )
    return success_response(data=[e.to_dict() for e in events], message="Upcoming events retrieved")


@events_bp.route("/past", methods=["GET"])
def get_past_events():
    """Archive of past events with attendee metrics and recap notes."""
    events = (
        Event.query.filter(db.or_(Event.is_past == True, Event.event_date < datetime.utcnow()))
        .order_by(Event.event_date.desc())
        .all()
    )
    return success_response(data=[e.to_dict() for e in events], message="Past event recaps retrieved")


@events_bp.route("/<int:event_id>", methods=["GET"])
def get_event_detail(event_id):
    """Retrieve full event detail."""
    event = db.session.get(Event, event_id)
    if not event:
        return error_response(message="Event not found", status_code=404)
    return success_response(data=event.to_dict(), message="Event retrieved successfully")


@events_bp.route("/<int:event_id>/rsvp", methods=["POST"])
def rsvp_event(event_id):
    """RSVP / ticket registration for an event."""
    event = db.session.get(Event, event_id)
    if not event:
        return error_response(message="Event not found", status_code=404)

    data = request.get_json(silent=True) or {}
    valid, err = validate_required_fields(data, ["full_name", "email"])
    if not valid:
        return error_response(message=err, status_code=400)

    email = data.get("email", "").strip()
    if not is_valid_email(email):
        return error_response(message="Please provide a valid email address", status_code=400)

    inquiry = Inquiry(
        inquiry_type="event_rsvp",
        target_niche=event.niche_slug or "nexevents-africa",
        full_name=data.get("full_name").strip(),
        email=email,
        phone=data.get("phone"),
        organization=data.get("organization"),
        subject=f"RSVP: {event.title}",
        message=f"RSVP registration for {event.title} on {event.event_date.strftime('%B %d, %Y')}",
        metadata_json={
            "event_id": event.id,
            "event_title": event.title,
            "tickets_requested": data.get("tickets_count", 1),
            "dietary_notes": data.get("dietary_notes"),
        },
        status="new",
    )
    db.session.add(inquiry)
    db.session.commit()

    return success_response(
        data={"rsvp_id": inquiry.id, "event": event.title},
        message="RSVP received! We look forward to seeing you.",
        status_code=201
    )
