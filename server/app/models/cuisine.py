from datetime import datetime
from app.extensions import db


class MenuItem(db.Model):
    __tablename__ = "menu_items"

    id = db.Column(db.Integer, primary_key=True)
    niche_id = db.Column(db.Integer, db.ForeignKey("niches.id"), nullable=False, index=True)
    title = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(80), nullable=False, index=True)  # "Signature Mains", "Tasting Starters", "Heritage Sides", "Artisan Beverages", "Desserts"
    heritage_origin = db.Column(db.String(180), nullable=True)  # e.g. "Swahili Coast / Lamu Archipelago"
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), default="KES")
    image_url = db.Column(db.String(500), nullable=True)
    dietary_tags = db.Column(db.JSON, default=list)  # ["Gluten-Free", "Chef Special", "Vegetarian", "Spicy"]
    is_available = db.Column(db.Boolean, default=True, nullable=False)
    is_signature = db.Column(db.Boolean, default=False)
    # E-commerce readiness fields
    sku = db.Column(db.String(50), nullable=True, unique=True)
    inventory_tracking = db.Column(db.Boolean, default=False)
    stock_quantity = db.Column(db.Integer, default=100)
    sort_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "niche_id": self.niche_id,
            "title": self.title,
            "category": self.category,
            "heritage_origin": self.heritage_origin,
            "description": self.description,
            "price": self.price,
            "currency": self.currency,
            "image_url": self.image_url,
            "dietary_tags": self.dietary_tags or [],
            "is_available": self.is_available,
            "is_signature": self.is_signature,
            "sku": self.sku,
            "sort_order": self.sort_order,
        }
