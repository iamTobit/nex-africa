import json


def test_health_check(client):
    """Test health check endpoint."""
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "healthy"
    assert "nexart-africa" in data["active_niches"]


def test_ecosystem_overview(client):
    """Test top-level ecosystem vision, founder statement, six verbs, and values."""
    res = client.get("/api/ecosystem")
    assert res.status_code == 200
    data = res.get_json()["data"]
    
    # Check founder statement
    founder = data["group_vision"]["founder"]
    assert "Francis Kimathi" in founder["name"]
    assert "Africa's creativity deserves more than admiration" in founder["statement"]

    # Check six verbs
    verbs = [v["verb"] for v in data["group_vision"]["six_verbs"]]
    assert set(verbs) == {"Create", "Document", "Preserve", "Connect", "Communicate", "Build"}

    # Check niches
    niches = data["niches"]
    slugs = [n["slug"] for n in niches]
    assert "nexart-africa" in slugs
    assert "nexstudios-africa" in slugs
    assert "nexafricuisine" in slugs


def test_niche_detail(client):
    """Test single niche lookup."""
    res = client.get("/api/niches/nexart-africa")
    assert res.status_code == 200
    data = res.get_json()["data"]
    assert data["name"] == "NexArt Africa"
    assert data["brand_color"] == "#B8912A"
    assert data["instagram_handle"] == "@nexartafrica"


def test_niche_not_found(client):
    """Test non-existent niche returns 404."""
    res = client.get("/api/niches/non-existent-niche")
    assert res.status_code == 404


def test_art_endpoints(client):
    """Test NexArt Africa artworks and submission."""
    # List artworks
    res = client.get("/api/art/artworks")
    assert res.status_code == 200
    artworks = res.get_json()["data"]
    assert len(artworks) > 0

    # Categories
    cat_res = client.get("/api/art/categories")
    assert cat_res.status_code == 200
    assert "Painting" in cat_res.get_json()["data"]

    # Artist submission CTA
    sub_res = client.post(
        "/api/art/submit-work",
        data=json.dumps({
            "artist_name": "Kiprono Bett",
            "email": "kiprono@africanart.co.ke",
            "portfolio_url": "https://instagram.com/kiprono_art",
            "bio": "Sculptor working with recycled Nairobi brass and ebony.",
            "primary_medium": "Sculpture",
        }),
        content_type="application/json",
    )
    assert sub_res.status_code == 201
    assert sub_res.get_json()["status"] == "success"


def test_studios_endpoints(client):
    """Test NexStudios Africa portfolio, rate card, and booking CTA."""
    # Portfolio
    res = client.get("/api/studios/portfolio")
    assert res.status_code == 200
    assert len(res.get_json()["data"]) > 0

    # Rate card
    rc_res = client.get("/api/studios/rate-card")
    assert rc_res.status_code == 200
    packages = rc_res.get_json()["data"]
    assert len(packages) > 0
    assert any("Portraiture" in p["name"] for p in packages)

    # Booking CTA
    book_res = client.post(
        "/api/studios/book",
        data=json.dumps({
            "full_name": "Sarah Omondi",
            "email": "sarah@fashionhouse.africa",
            "service_type": "Brand Commercial & Reel Campaign",
            "message": "Looking to shoot our AW26 campaign film in Nairobi.",
            "preferred_date": "2026-11-20",
        }),
        content_type="application/json",
    )
    assert book_res.status_code == 201


def test_cuisine_endpoints(client):
    """Test NexAfriCuisine menu, dietary tags, and catering inquiry CTA."""
    # Menu items
    res = client.get("/api/cuisine/menu")
    assert res.status_code == 200
    items = res.get_json()["data"]
    assert len(items) > 0

    # Single item
    first_id = items[0]["id"]
    item_res = client.get(f"/api/cuisine/menu/{first_id}")
    assert item_res.status_code == 200

    # Catering inquiry CTA
    cat_res = client.post(
        "/api/cuisine/catering-inquiry",
        data=json.dumps({
            "full_name": "David Mwangi",
            "email": "david@techsummit.africa",
            "event_type": "VIP Gala Dinner",
            "guest_count": 80,
            "message": "Catering requested for 80 tech leaders featuring coastal seafood and suya bites.",
        }),
        content_type="application/json",
    )
    assert cat_res.status_code == 201


def test_events_endpoints(client):
    """Test NexEvents Africa calendar and RSVP."""
    res = client.get("/api/events")
    assert res.status_code == 200
    events = res.get_json()["data"]
    assert len(events) > 0

    upcoming_res = client.get("/api/events/upcoming")
    assert upcoming_res.status_code == 200

    past_res = client.get("/api/events/past")
    assert past_res.status_code == 200

    # RSVP to first upcoming event
    first_event = events[0]
    rsvp_res = client.post(
        f"/api/events/{first_event['id']}/rsvp",
        data=json.dumps({
            "full_name": "Faith Kemunto",
            "email": "faith@creatives.africa",
            "tickets_count": 2,
        }),
        content_type="application/json",
    )
    assert rsvp_res.status_code == 201


def test_partner_invest_inquiry(client):
    """Test Partner / Invest inquiry form."""
    res = client.post(
        "/api/inquiries/partner-invest",
        data=json.dumps({
            "full_name": "Adisa Adeleke",
            "email": "adisa@heritagecap.africa",
            "organization": "Heritage Ventures",
            "area_of_interest": "investor",
            "message": "Interested in syndicating a seed expansion facility for the Nexafrica creator hub.",
        }),
        content_type="application/json",
    )
    assert res.status_code == 201
    assert res.get_json()["status"] == "success"


def test_general_contact_routing(client):
    """Test Contact inquiry form with niche routing."""
    res = client.post(
        "/api/inquiries/contact",
        data=json.dumps({
            "full_name": "Marcus Vance",
            "email": "marcus@curators.com",
            "target_niche": "nexart-africa",
            "subject": "Acquisition inquiry",
            "message": "Inquiring about international loan agreements for upcoming European showcase.",
        }),
        content_type="application/json",
    )
    assert res.status_code == 201
    data = res.get_json()["data"]
    assert data["target_niche"] == "nexart-africa"


def test_newsletter_subscribe(client):
    """Test newsletter subscription."""
    res = client.post(
        "/api/newsletter/subscribe",
        data=json.dumps({"email": "patron@culture.africa", "niche_interest": "all"}),
        content_type="application/json",
    )
    assert res.status_code == 201

    # Duplicate subscribe
    dup_res = client.post(
        "/api/newsletter/subscribe",
        data=json.dumps({"email": "patron@culture.africa"}),
        content_type="application/json",
    )
    assert dup_res.status_code == 200
    assert "already subscribed" in dup_res.get_json()["message"]


def test_instagram_feed(client):
    """Test curated Instagram feed endpoint."""
    res = client.get("/api/instagram/nexart-africa")
    assert res.status_code == 200
    feed = res.get_json()["data"]
    assert feed["handle"] == "@nexartafrica"
    assert len(feed["posts"]) > 0
