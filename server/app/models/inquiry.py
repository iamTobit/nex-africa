from datetime import datetime
from app.extensions import db


class Inquiry(db.Model):
    __tablename__ = "inquiries"

    id = db.Column(db.Integer, primary_key=True)
    inquiry_type = db.Column(
        db.String(50), nullable=False, index=True
    )  # "contact", "booking", "partner_invest", "artist_submission"
    target_niche = db.Column(
        db.String(80), nullable=False, default="nexafrica-group", index=True
    )  # "nexafrica-group", "nexart-africa", "nexstudios-africa", "nexafricuisine", "nexevents-africa"
    
    # Common details
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, index=True)
    phone = db.Column(db.String(40), nullable=True)
    organization = db.Column(db.String(150), nullable=True)
    subject = db.Column(db.String(200), nullable=True)
    message = db.Column(db.Text, nullable=False)
    
    # Flexible structured details per submission type:
    # - Partner/Invest: { "interest_area": "student_partner"|"investor", "stage": "...", "budget": "..." }
    # - Booking: { "service_id": 1, "package_name": "...", "preferred_date": "2026-11-15", "location": "...", "guests": 50 }
    # - Artist Submission: { "portfolio_url": "...", "instagram": "...", "bio": "...", "exhibition_history": "..." }
    metadata_json = db.Column(db.JSON, default=dict)
    
    # Workflow status
    status = db.Column(db.String(30), default="new", index=True)  # "new", "in_review", "replied", "archived"
    internal_notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "inquiry_type": self.inquiry_type,
            "target_niche": self.target_niche,
            "full_name": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "organization": self.organization,
            "subject": self.subject,
            "message": self.message,
            "metadata": self.metadata_json or {},
            "status": self.status,
            "internal_notes": self.internal_notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
