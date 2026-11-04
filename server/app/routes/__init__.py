from flask import Flask
from app.routes.ecosystem import ecosystem_bp
from app.routes.art import art_bp
from app.routes.studios import studios_bp
from app.routes.cuisine import cuisine_bp
from app.routes.events import events_bp
from app.routes.inquiries import inquiries_bp
from app.routes.newsletter import newsletter_bp
from app.routes.admin import admin_bp


def register_blueprints(app: Flask):
    """Register all modular API blueprints."""
    app.register_blueprint(ecosystem_bp)
    app.register_blueprint(art_bp)
    app.register_blueprint(studios_bp)
    app.register_blueprint(cuisine_bp)
    app.register_blueprint(events_bp)
    app.register_blueprint(inquiries_bp)
    app.register_blueprint(newsletter_bp)
    app.register_blueprint(admin_bp)
