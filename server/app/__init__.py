import os
from flask import Flask, jsonify
from app.config import config_by_name
from app.extensions import db, migrate, cors
from app.routes import register_blueprints


def create_app(config_name: str = None) -> Flask:
    """Application factory for the Nexafrica creative ecosystem backend."""
    if not config_name:
        config_name = os.getenv("FLASK_ENV", "development").lower()

    app = Flask(__name__)
    config_class = config_by_name.get(config_name, config_by_name["default"])
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # CORS configuration
    cors_origins = app.config.get("CORS_ORIGINS", "*")
    cors.init_app(
        app,
        resources={r"/api/*": {"origins": cors_origins}},
        supports_credentials=True,
    )

    # Register API Blueprints
    register_blueprints(app)

    # Root route for welcome/discovery
    @app.route("/", methods=["GET"])
    def root():
        return jsonify({
            "brand": "Nexafrica Group API",
            "tagline": "One idea, many expressions — Interconnected African Creative Ecosystem",
            "status": "online",
            "version": "1.0.0",
            "docs_url": "/api/ecosystem",
            "health_check": "/api/health",
        })

    # Global Error Handlers
    @app.errorhandler(404)
    def handle_not_found(e):
        return jsonify({
            "status": "error",
            "message": "The requested resource was not found on this server."
        }), 404

    @app.errorhandler(405)
    def handle_method_not_allowed(e):
        return jsonify({
            "status": "error",
            "message": "The method is not allowed for the requested URL."
        }), 405

    @app.errorhandler(500)
    def handle_internal_error(e):
        return jsonify({
            "status": "error",
            "message": "An internal server error occurred. Please contact the administrator."
        }), 500

    return app
