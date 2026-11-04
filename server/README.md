# Nexafrica Group — Backend API

A robust, production-ready Flask REST API and PostgreSQL backend designed for the **Nexafrica Group** creative ecosystem hub website.

It embodies the **"One idea, many expressions"** architecture, providing unified top-level group storytelling while powering dedicated endpoints for each active and upcoming niche:
- **Nexafrica Group** (Black `#111111`) — Ecosystem hub, values, six verbs, founder statements, partner/invest inquiries.
- **NexArt Africa** (Gold `#B8912A`) — Artist exhibitions, artwork gallery, commissions, "submit your work" CTA.
- **NexStudios Africa** (Red `#A6192E`) — Portfolio & reel embeds, rate cards, production booking CTA.
- **NexAfriCuisine** (Green `#2F6B3A`) — Culinary heritage storytelling, menu highlights & e-commerce ready items, catering booking CTA.
- **NexEvents Africa** (Black `#111111`, upcoming) — Nairobi cultural calendar, event RSVP, past event recaps.

---

## 🛠 Tech Stack

- **Framework:** Python 3.11+ / Flask 3.1
- **Database:** PostgreSQL (with `psycopg2-binary` driver & seamless SQLite fallback)
- **ORM & Migrations:** Flask-SQLAlchemy 3.1 & Flask-Migrate (Alembic)
- **CORS:** Flask-CORS for frontend decoupling
- **Testing:** Pytest & pytest-flask
- **Production Server:** Gunicorn WSGI

---

## 📁 Project Structure

```
server/
├── app/
│   ├── __init__.py           # Flask application factory (create_app)
│   ├── config.py             # Config classes (Dev, Prod, Test) & DB URL normalizer
│   ├── extensions.py         # Extensions: db, migrate, cors
│   ├── models/               # SQLAlchemy Models
│   │   ├── __init__.py
│   │   ├── ecosystem.py      # Niche & EcosystemVision
│   │   ├── portfolio.py      # Artwork & StudioProject
│   │   ├── rate_card.py      # ServicePackage
│   │   ├── cuisine.py        # MenuItem (e-commerce ready)
│   │   ├── event.py          # Event (upcoming & recaps)
│   │   ├── inquiry.py        # Inquiry (Contact, Booking, Partner/Invest, Artist)
│   │   └── newsletter.py     # NewsletterSubscriber
│   ├── routes/               # API Blueprints
│   │   ├── __init__.py       # Blueprint registry
│   │   ├── ecosystem.py      # /api/ecosystem, /api/niches
│   │   ├── art.py            # /api/art/artworks, /api/art/submit-work
│   │   ├── studios.py        # /api/studios/portfolio, /api/studios/rate-card, /api/studios/book
│   │   ├── cuisine.py        # /api/cuisine/menu, /api/cuisine/catering-inquiry
│   │   ├── events.py         # /api/events, /api/events/upcoming, /api/events/past, /api/events/<id>/rsvp
│   │   ├── inquiries.py      # /api/inquiries/contact, /api/inquiries/partner-invest
│   │   ├── newsletter.py     # /api/newsletter/subscribe
│   │   └── admin.py          # /api/health, /api/admin/overview, /api/instagram/<niche>
│   ├── utils/
│   │   ├── responses.py      # Standardized JSON response helpers
│   │   └── validators.py     # Email and field validation
│   └── seed_data.py          # Rich seed data based on the design brief
├── tests/
│   ├── conftest.py           # Pytest fixtures and test app
│   └── test_api.py           # 12 automated integration tests
├── migrations/               # Alembic database migrations
├── .env.example              # Documented environment variables template
├── .env                      # Active local environment settings
├── requirements.txt          # Python dependencies
├── pytest.ini                # Pytest configuration
└── run.py                    # Entry point & CLI manager
```

---

## 🚀 Quick Start Guide

### 1. Activate Virtual Environment
```bash
cd server
source venv/bin/activate
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=nexafrica_creative_ecosystem_secret_key_2026
PORT=5001

# PostgreSQL connection string:
DATABASE_URL=postgresql://fidelorwasa@localhost:5432/nexafrica_db

# CORS allowed frontend origins:
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173
```
> **Note:** If `DATABASE_URL` is omitted, the application automatically falls back to local SQLite (`nexafrica_dev.db`).

### 3. Initialize & Seed Database
Create tables and pre-populate with the initial brand data (founder statement, six verbs, niche colors, sample artworks, reels, menu items, and events):
```bash
python run.py seed-db
```

### 4. Start the Development Server
```bash
python run.py
```
The API server will boot up at `http://127.0.0.1:5001`.

---

## 🧪 Running Automated Tests

Run the full automated test suite using `pytest`:
```bash
./venv/bin/pytest
```
All 12 tests will validate health checks, niche endpoints, artwork submissions, studio booking, catering inquiries, event RSVPs, and partner investment routing.

---

## 📡 API Reference Overview

### 1. Ecosystem & Brand Story
- `GET /api/ecosystem`: Complete ecosystem vision, founder statement, six verbs, values, and niches.
- `GET /api/niches`: List all active and upcoming niches with brand colors and stats.
- `GET /api/niches/<slug>`: Get details for a specific niche (e.g. `nexart-africa`, `nexstudios-africa`, `nexafricuisine`).

### 2. NexArt Africa (`/api/art`)
- `GET /api/art/artworks`: Filterable gallery by `category`, `for_sale=true`, `featured=true`, and `search`.
- `GET /api/art/categories`: Available artwork categories (`Painting`, `Sculpture`, `Photography`, `Mixed Media`).
- `GET /api/art/artworks/<id>`: Full artwork profile with dimensions, medium, and backstory.
- `POST /api/art/submit-work`: **"Submit your work" CTA** for emerging artists.
- `POST /api/art/artworks`: Add new artwork to the catalog.

### 3. NexStudios Africa (`/api/studios`)
- `GET /api/studios/portfolio`: Photo and video portfolio & reels filterable by `category` and `media_type`.
- `GET /api/studios/rate-card`: Standalone rate card packages with deliverables and pricing.
- `POST /api/studios/book`: **Booking CTA** for brand campaigns, event coverage, and portrait sessions.

### 4. NexAfriCuisine (`/api/cuisine`)
- `GET /api/cuisine/menu`: Culinary menu items with heritage notes, dietary tags, and e-commerce readiness.
- `GET /api/cuisine/menu/<id>`: Single dish details.
- `POST /api/cuisine/catering-inquiry`: **Catering & private dining booking CTA**.

### 5. NexEvents Africa (`/api/events`)
- `GET /api/events`: Events list with `upcoming=true` or past filter.
- `GET /api/events/upcoming`: Active cultural calendar.
- `GET /api/events/past`: Past event recaps with attendee counts, photos, and highlights.
- `POST /api/events/<id>/rsvp`: RSVP registration for attendees.

### 6. Forms & Inquiries (`/api/inquiries`)
- `POST /api/inquiries/contact`: **General inquiry form** with dropdown routing (`target_niche`).
- `POST /api/inquiries/partner-invest`: **Partner / Invest CTA** for prospective student partners and future investors.
- `GET /api/inquiries`: Admin list of all inquiries (filter by `type`, `niche`, `status`).
- `PATCH /api/inquiries/<id>/status`: Update workflow status (`new`, `in_review`, `contacted`, `archived`).

### 7. Social & Feeds
- `GET /api/instagram/<niche_slug>`: Curated Instagram feed for each niche page (`handle`, posts, likes, photos, captions).
- `POST /api/newsletter/subscribe`: Join the Nexafrica collective newsletter.
- `GET /api/health`: Database connection and service health monitor.
