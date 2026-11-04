from datetime import datetime
from app.extensions import db


class ServicePackage(db.Model):
    __tablename__ = "service_packages"

    id = db.Column(db.Integer, primary_key=True)
    niche_id = db.Column(db.Integer, db.ForeignKey("niches.id"), nullable=False, index=True)
    name = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(80), nullable=False, default="Production")  # "Video Production", "Commercial Photography", "Events", "Editorial"
    tagline = db.Column(db.String(255), nullable=True)
    starting_price = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), default="KES")
    billing_type = db.Column(db.String(40), default="per_project")  # "per_project", "per_half_day", "per_full_day", "custom"
    turnaround_time = db.Column(db.String(80), nullable=True)  # "3 - 5 business days"
    deliverables = db.Column(db.JSON, nullable=False, default=list)  # list of bullet points
    is_popular = db.Column(db.Boolean, default=False)
    sort_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "niche_id": self.niche_id,
            "name": self.name,
            "category": self.category,
            "tagline": self.tagline,
            "starting_price": self.starting_price,
            "currency": self.currency,
            "billing_type": self.billing_type,
            "turnaround_time": self.turnaround_time,
            "deliverables": self.deliverables,
            "is_popular": self.is_popular,
            "sort_order": self.sort_order,
        }
