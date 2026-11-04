from datetime import datetime
from app.extensions import db


class Artwork(db.Model):
    __tablename__ = "artworks"

    id = db.Column(db.Integer, primary_key=True)
    niche_id = db.Column(db.Integer, db.ForeignKey("niches.id"), nullable=False, index=True)
    title = db.Column(db.String(180), nullable=False)
    artist_name = db.Column(db.String(120), nullable=False, index=True)
    category = db.Column(db.String(80), nullable=False, index=True)  # e.g., "Painting", "Sculpture", "Photography", "Mixed Media"
    medium = db.Column(db.String(120), nullable=True)  # e.g. "Oil & Sisal on Canvas"
    dimensions = db.Column(db.String(80), nullable=True)  # e.g. "120 x 90 cm"
    year = db.Column(db.Integer, nullable=True)
    price = db.Column(db.Float, nullable=True)
    currency = db.Column(db.String(10), default="KES")
    is_for_sale = db.Column(db.Boolean, default=False)
    is_featured = db.Column(db.Boolean, default=False)
    image_url = db.Column(db.String(500), nullable=False)
    description = db.Column(db.Text, nullable=True)
    exhibition_title = db.Column(db.String(180), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "niche_id": self.niche_id,
            "title": self.title,
            "artist_name": self.artist_name,
            "category": self.category,
            "medium": self.medium,
            "dimensions": self.dimensions,
            "year": self.year,
            "price": self.price,
            "currency": self.currency,
            "is_for_sale": self.is_for_sale,
            "is_featured": self.is_featured,
            "image_url": self.image_url,
            "description": self.description,
            "exhibition_title": self.exhibition_title,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class StudioProject(db.Model):
    __tablename__ = "studio_projects"

    id = db.Column(db.Integer, primary_key=True)
    niche_id = db.Column(db.Integer, db.ForeignKey("niches.id"), nullable=False, index=True)
    title = db.Column(db.String(180), nullable=False)
    client = db.Column(db.String(120), nullable=True)
    category = db.Column(db.String(80), nullable=False, index=True)  # e.g., "Brand Content", "Event Coverage", "Documentary", "Portraiture"
    media_type = db.Column(db.String(40), default="video")  # "video", "reel", "photo_series"
    media_url = db.Column(db.String(500), nullable=False)  # Embed URL or stream URL
    thumbnail_url = db.Column(db.String(500), nullable=True)
    duration = db.Column(db.String(30), nullable=True)  # e.g. "02:15"
    year = db.Column(db.Integer, nullable=True)
    is_featured = db.Column(db.Boolean, default=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "niche_id": self.niche_id,
            "title": self.title,
            "client": self.client,
            "category": self.category,
            "media_type": self.media_type,
            "media_url": self.media_url,
            "thumbnail_url": self.thumbnail_url,
            "duration": self.duration,
            "year": self.year,
            "is_featured": self.is_featured,
            "description": self.description,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
