import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from server directory
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


def fix_database_url(url: str) -> str:
    """Normalize Postgres connection string for SQLAlchemy with psycopg2 driver and Supabase SSL."""
    if not url:
        return url
    url = url.strip()
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+psycopg2://", 1)
    elif url.startswith("postgresql://") and not url.startswith("postgresql+"):
        url = url.replace("postgresql://", "postgresql+psycopg2://", 1)

    # Ensure sslmode=require for Supabase PostgreSQL connections if not already present
    if ("supabase.co" in url or "supabase.com" in url) and "sslmode=" not in url:
        separator = "&" if "?" in url else "?"
        url = f"{url}{separator}sslmode=require"

    return url


def parse_cors_origins(raw_origins: str):
    """Parse comma-separated CORS origins, preserving '*' wildcard when set."""
    if not raw_origins or raw_origins.strip() == "*":
        return "*"
    return [origin.strip().rstrip("/") for origin in raw_origins.split(",") if origin.strip()]


class BaseConfig:
    SECRET_KEY = os.getenv("SECRET_KEY", "nexafrica-super-secret-key-2026")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Database URL with fallback to local SQLite if Postgres/Supabase is not configured
    RAW_DB_URL = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'nexafrica_dev.db'}")
    SQLALCHEMY_DATABASE_URI = fix_database_url(RAW_DB_URL)

    # Connection pool settings optimized for Supabase Supavisor / PgBouncer
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 300,
    }

    # CORS
    CORS_ORIGINS = parse_cors_origins(os.getenv("CORS_ORIGINS", "*"))
    ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "nexafrica-admin-key-2026")
    JSON_SORT_KEYS = False


class DevelopmentConfig(BaseConfig):
    DEBUG = True


class ProductionConfig(BaseConfig):
    DEBUG = False


class TestingConfig(BaseConfig):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    WTF_CSRF_ENABLED = False


config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
    "default": DevelopmentConfig,
}
