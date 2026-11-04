from datetime import datetime
from app.extensions import db


class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    niche_slug = db.Column(db.String(80), nullable=True, default="nexevents-africa", index=True)
    event_date = db.Column(db.DateTime, nullable=False, index=True)
    end_date = db.Column(db.DateTime, nullable=True)
    location = db.Column(db.String(200), nullable=False)  # e.g. "NexHub Creative Loft, Kilimani, Nairobi"
    category = db.Column(db.String(80), nullable=False)  # "Exhibition", "Culinary Tasting", "Masterclass", "Gala", "Live Performance"
    short_description = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    rsvp_url = db.Column(db.String(500), nullable=True)
    ticket_price = db.Column(db.Float, nullable=True)
    currency = db.Column(db.String(10), default="KES")
    is_past = db.Column(db.Boolean, default=False, index=True)
    recap_notes = db.Column(db.Text, nullable=True)
    recap_gallery = db.Column(db.JSON, default=list)  # list of photo URLs
    attendees_count = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "niche_slug": self.niche_slug,
            "event_date": self.event_date.isoformat() if self.event_date else None,
            "end_date": self.end_date.isoformat() if self.end_date else None,
            "location": self.location,
            "category": self.category,
            "short_description": self.short_description,
            "description": self.description,
            "image_url": self.image_url,
            "rsvp_url": self.rsvp_url,
            "ticket_price": self.ticket_price,
            "currency": self.currency,
            "is_past": self.is_past,
            "recap_notes": self.recap_notes,
            "recap_gallery": self.recap_gallery or [],
            "attendees_count": self.attendees_count,
        }
