from datetime import datetime
from app.extensions import db


class Niche(db.Model):
    __tablename__ = "niches"

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(80), unique=True, nullable=False, index=True)
    name = db.Column(db.String(120), nullable=False)
    tagline = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text, nullable=False)
    brand_color = db.Column(db.String(20), nullable=False, default="#111111")
    color_symbolism = db.Column(db.String(150), nullable=True)
    logo_filename = db.Column(db.String(150), nullable=True)
    instagram_handle = db.Column(db.String(80), nullable=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    sort_order = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    artworks = db.relationship("Artwork", backref="niche", lazy="dynamic", cascade="all, delete-orphan")
    projects = db.relationship("StudioProject", backref="niche", lazy="dynamic", cascade="all, delete-orphan")
    packages = db.relationship("ServicePackage", backref="niche", lazy="dynamic", cascade="all, delete-orphan")
    menu_items = db.relationship("MenuItem", backref="niche", lazy="dynamic", cascade="all, delete-orphan")

    def to_dict(self, include_stats=False):
        data = {
            "id": self.id,
            "slug": self.slug,
            "name": self.name,
            "tagline": self.tagline,
            "bio": self.bio,
            "brand_color": self.brand_color,
            "color_symbolism": self.color_symbolism,
            "logo_filename": self.logo_filename,
            "instagram_handle": self.instagram_handle,
            "is_active": self.is_active,
            "sort_order": self.sort_order,
        }
        if include_stats:
            data["stats"] = {
                "artworks_count": self.artworks.count(),
                "projects_count": self.projects.count(),
                "packages_count": self.packages.count(),
                "menu_items_count": self.menu_items.count(),
            }
        return data


class EcosystemVision(db.Model):
    __tablename__ = "ecosystem_vision"

    id = db.Column(db.Integer, primary_key=True)
    brand_name = db.Column(db.String(120), default="Nexafrica Group")
    brand_statement = db.Column(
        db.String(255),
        default="An interconnected African creative ecosystem — one idea, many expressions.",
    )
    founder_name = db.Column(db.String(100), default="Francis Kimathi")
    founder_title = db.Column(db.String(100), default="Founder")
    founder_statement = db.Column(
        db.Text,
        default="Nexafrica Group exists because Africa's creativity deserves more than admiration — it deserves infrastructure. We're building the platforms, the audiences, and the businesses that let African creators own their own story.",
    )
    six_verbs = db.Column(
        db.JSON,
        default=lambda: [
            {"verb": "Create", "description": "Ignite novel African expressions and visionary artistry."},
            {"verb": "Document", "description": "Capture the real-time renaissance across our continent."},
            {"verb": "Preserve", "description": "Safeguard cultural heritage, traditions, and historic masteries."},
            {"verb": "Connect", "description": "Bridge creators with collectors, collaborators, and international stages."},
            {"verb": "Communicate", "description": "Tell nuanced, authentic stories that challenge monolithic narratives."},
            {"verb": "Build", "description": "Construct lasting creative commercial infrastructure and ecosystems."},
        ],
    )
    nexafrica_standard_values = db.Column(
        db.JSON,
        default=lambda: [
            {"title": "Uncompromising Quality", "desc": "World-class execution rooted in African authenticity."},
            {"title": "Creator Equity", "desc": "Ensuring our artists and storytellers own their intellectual value."},
            {"title": "Cultural Depth", "desc": "Respecting historical lineages while pushing modern frontiers."},
            {"title": "Ecosystem Synergies", "desc": "Cross-pollinating food, art, film, and live gatherings into one whole."},
        ],
    )
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "brand_name": self.brand_name,
            "brand_statement": self.brand_statement,
            "founder": {
                "name": self.founder_name,
                "title": self.founder_title,
                "statement": self.founder_statement,
            },
            "six_verbs": self.six_verbs,
            "values": self.nexafrica_standard_values,
        }
