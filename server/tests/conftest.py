import pytest
from app import create_app
from app.extensions import db
from app.seed_data import seed_database


@pytest.fixture(scope="session")
def app():
    """Create and configure a clean testing app instance."""
    app = create_app("testing")
    with app.app_context():
        db.create_all()
        seed_database()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    """Test HTTP client."""
    return app.test_client()


@pytest.fixture
def runner(app):
    """CLI runner fixture."""
    return app.test_cli_runner()
