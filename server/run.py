import os
import sys
import click
from app import create_app
from app.extensions import db
from app.models import (
    Niche,
    EcosystemVision,
    Artwork,
    StudioProject,
    ServicePackage,
    MenuItem,
    Event,
    Inquiry,
    NewsletterSubscriber,
)
from app.seed_data import seed_database

app = create_app(os.getenv("FLASK_ENV", "development"))


@app.shell_context_processor
def make_shell_context():
    """Register models for interactive flask shell."""
    return {
        "db": db,
        "Niche": Niche,
        "EcosystemVision": EcosystemVision,
        "Artwork": Artwork,
        "StudioProject": StudioProject,
        "ServicePackage": ServicePackage,
        "MenuItem": MenuItem,
        "Event": Event,
        "Inquiry": Inquiry,
        "NewsletterSubscriber": NewsletterSubscriber,
    }


@app.cli.command("init-db")
def init_db_command():
    """Initialize database tables."""
    with app.app_context():
        db.create_all()
        click.echo("✓ Database tables created successfully.")


@app.cli.command("seed-db")
def seed_db_command():
    """Seed database with Nexafrica Group ecosystem data."""
    with app.app_context():
        db.create_all()
        seed_database()
        click.echo("✓ Database seeded successfully with Nexafrica brand content.")


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    debug = os.getenv("FLASK_DEBUG", "True").lower() in ("true", "1")
    
    # Allow running cli commands directly e.g. `python run.py seed-db`
    if len(sys.argv) > 1 and sys.argv[1] == "seed-db":
        with app.app_context():
            db.create_all()
            seed_database()
        print("✓ Database seeded successfully.")
    elif len(sys.argv) > 1 and sys.argv[1] == "init-db":
        with app.app_context():
            db.create_all()
        print("✓ Database tables initialized.")
    else:
        print(f"🚀 Nexafrica Group backend running at http://127.0.0.1:{port}")
        app.run(host="0.0.0.0", port=port, debug=debug)
