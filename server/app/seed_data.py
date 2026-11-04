from datetime import datetime, timedelta
from app.extensions import db
from app.models.ecosystem import Niche, EcosystemVision
from app.models.portfolio import Artwork, StudioProject
from app.models.rate_card import ServicePackage
from app.models.cuisine import MenuItem
from app.models.event import Event


def seed_database():
    """Seed the database with rich, production-ready data aligned with the design brief."""

    # 1. Ecosystem Vision & Brand Statements
    vision = EcosystemVision.query.first()
    if not vision:
        vision = EcosystemVision(
            brand_name="Nexafrica Group",
            brand_statement="An interconnected African creative ecosystem — one idea, many expressions.",
            founder_name="Francis Kimathi",
            founder_title="Founder",
            founder_statement=(
                "Nexafrica Group exists because Africa's creativity deserves more than admiration "
                "— it deserves infrastructure. We're building the platforms, the audiences, and the "
                "businesses that let African creators own their own story."
            ),
            six_verbs=[
                {"verb": "Create", "description": "Ignite novel African expressions and visionary artistry without creative compromise."},
                {"verb": "Document", "description": "Capture the real-time renaissance across our continent and diaspora."},
                {"verb": "Preserve", "description": "Safeguard cultural heritage, ancestral traditions, and historic masteries."},
                {"verb": "Connect", "description": "Bridge creators with collectors, collaborators, and international stages."},
                {"verb": "Communicate", "description": "Tell nuanced, authentic stories that challenge monolithic narratives."},
                {"verb": "Build", "description": "Construct lasting creative commercial infrastructure and sustainable creative businesses."},
            ],
            nexafrica_standard_values=[
                {"title": "Uncompromising Quality", "desc": "World-class execution rooted in African authenticity and craftsmanship."},
                {"title": "Creator Equity", "desc": "Ensuring our artists, filmmakers, and culinary artisans own their intellectual value."},
                {"title": "Cultural Depth", "desc": "Respecting historical lineages while fearlessly pushing modern frontiers."},
                {"title": "Ecosystem Synergies", "desc": "Cross-pollinating food, visual art, cinema, and live gatherings into one seamless collective."},
            ],
        )
        db.session.add(vision)

    # 2. Niches
    niches_data = [
        {
            "slug": "nexafrica-group",
            "name": "Nexafrica Group",
            "tagline": "The parent brand for an interconnected African creative ecosystem",
            "bio": (
                "Nexafrica Group is the parent brand unifying and empowering Africa's creative vanguard. "
                "By uniting contemporary art, cinematic visual production, culinary storytelling, and cultural gatherings "
                "under one visionary umbrella, we prove the power of 'one idea, many expressions'."
            ),
            "brand_color": "#111111",
            "color_symbolism": "The people, unity",
            "logo_filename": "logo_nexafrica_group.svg",
            "instagram_handle": "@nexafricagroup",
            "is_active": True,
            "sort_order": 1,
        },
        {
            "slug": "nexart-africa",
            "name": "NexArt Africa",
            "tagline": "Discovering and documenting Nairobi's emerging visual artists",
            "bio": (
                "NexArt Africa discovers and documents Nairobi's emerging visual artists — from studio visits to "
                "full exhibitions — connecting their work to collectors, institutions, and audiences who might otherwise "
                "never see it. We don't just sell art; we build the story around it."
            ),
            "brand_color": "#B8912A",
            "color_symbolism": "Wealth/richness of heritage",
            "logo_filename": "logo_nexart_africa.svg",
            "instagram_handle": "@nexartafrica",
            "is_active": True,
            "sort_order": 2,
        },
        {
            "slug": "nexstudios-africa",
            "name": "NexStudios Africa",
            "tagline": "Photo and video production house telling African stories visually",
            "bio": (
                "NexStudios Africa is a Nairobi-based photo and video production house creating brand content, "
                "event coverage, and personal portraiture — built to help African businesses and individuals "
                "tell their story visually, one shoot at a time."
            ),
            "brand_color": "#A6192E",
            "color_symbolism": "Energy, passion, motion",
            "logo_filename": "logo_nexstudios_africa.svg",
            "instagram_handle": "@nexstudiosafrica",
            "is_active": True,
            "sort_order": 3,
        },
        {
            "slug": "nexafricuisine",
            "name": "NexAfriCuisine",
            "tagline": "Celebrating African culinary heritage through storytelling and catering",
            "bio": (
                "NexAfriCuisine celebrates African culinary heritage — from home-cooked traditions to modern reinterpretations "
                "— through content, catering, and cultural storytelling that treats food as identity, not just consumption."
            ),
            "brand_color": "#2F6B3A",
            "color_symbolism": "The land, growth, nourishment",
            "logo_filename": "logo_nexafricuisine.svg",
            "instagram_handle": "@nexafricuisine",
            "is_active": True,
            "sort_order": 4,
        },
        {
            "slug": "nexevents-africa",
            "name": "NexEvents Africa",
            "tagline": "Curating Nairobi's cultural calendar in person",
            "bio": (
                "NexEvents Africa curates Nairobi's cultural calendar — exhibitions, tastings, galas, and live performances "
                "that bring the whole Nexafrica ecosystem to life in person."
            ),
            "brand_color": "#111111",
            "color_symbolism": "Unity, gatherings",
            "logo_filename": "logo_nexevents_africa.svg",
            "instagram_handle": "@nexeventsafrica",
            "is_active": False,  # Once active
            "sort_order": 5,
        },
    ]

    niche_map = {}
    for nd in niches_data:
        niche = Niche.query.filter_by(slug=nd["slug"]).first()
        if not niche:
            niche = Niche(**nd)
            db.session.add(niche)
            db.session.flush()
        else:
            # Update attributes
            for k, v in nd.items():
                setattr(niche, k, v)
        niche_map[nd["slug"]] = niche

    db.session.commit()

    # 3. NexArt Africa Artworks
    art_niche = niche_map.get("nexart-africa")
    if art_niche and Artwork.query.count() == 0:
        artworks = [
            Artwork(
                niche_id=art_niche.id,
                title="Echoes of the Rift",
                artist_name="Wanjiku Mwangi",
                category="Painting",
                medium="Acrylic and volcanic ash on unprimed canvas",
                dimensions="150cm x 110cm",
                year=2026,
                price=185000.0,
                currency="KES",
                is_for_sale=True,
                is_featured=True,
                image_url="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
                description="Explores the geologic memory and maternal lineages of the Great Rift Valley using natural pigments and earth textures.",
                exhibition_title="Voices from the Red Soil",
            ),
            Artwork(
                niche_id=art_niche.id,
                title="Sisal Metamorphosis III",
                artist_name="Otieno Ochieng",
                category="Sculpture",
                medium="Hand-twisted sisal, brass wire, and reclaimed mahogany",
                dimensions="80cm x 45cm x 40cm",
                year=2025,
                price=240000.0,
                currency="KES",
                is_for_sale=True,
                is_featured=True,
                image_url="https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=80",
                description="A tactile study on how traditional Kenyan agricultural fibers can be elevated into monumental abstract forms.",
                exhibition_title="The Tactile Frontier",
            ),
            Artwork(
                niche_id=art_niche.id,
                title="Nairobi Nocturne: Matatu Reverie",
                artist_name="Amina Abdi",
                category="Photography",
                medium="Archival pigment print on Hahnemühle paper",
                dimensions="90cm x 60cm",
                year=2026,
                price=95000.0,
                currency="KES",
                is_for_sale=True,
                is_featured=False,
                image_url="https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80",
                description="Long exposure capturing the luminous street ballet of Nairobi's customized matatu transit culture.",
                exhibition_title="Nairobi In Transit",
            ),
            Artwork(
                niche_id=art_niche.id,
                title="Ancestral Algorithm",
                artist_name="Kofi Mensah",
                category="Mixed Media",
                medium="Kente textiles, gold leaf, and circuit board fragments",
                dimensions="120cm x 120cm",
                year=2026,
                price=310000.0,
                currency="KES",
                is_for_sale=False,
                is_featured=True,
                image_url="https://images.unsplash.com/photo-1582561173612-421718cb17ec?auto=format&fit=crop&w=1200&q=80",
                description="Synthesizing sacred geometric patterns found in ancient weaving with modern computational diagrams.",
                exhibition_title="Voices from the Red Soil",
            ),
        ]
        db.session.bulk_save_objects(artworks)

    # 4. NexStudios Africa Portfolio & Projects
    studios_niche = niche_map.get("nexstudios-africa")
    if studios_niche and StudioProject.query.count() == 0:
        projects = [
            StudioProject(
                niche_id=studios_niche.id,
                title="Swahili Coast Couture: The Dawn Reel",
                client="Mombasa Fashion Council",
                category="Commercial Reel",
                media_type="reel",
                media_url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                thumbnail_url="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
                duration="00:58",
                year=2026,
                is_featured=True,
                description="High-energy 9:16 vertical fashion reel capturing indigenous textiles against the backdrop of Fort Jesus.",
            ),
            StudioProject(
                niche_id=studios_niche.id,
                title="Sound & Soil: Benga Music Docuseries",
                client="East Africa Cultural Archive",
                category="Documentary",
                media_type="video",
                media_url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                thumbnail_url="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
                duration="08:24",
                year=2025,
                is_featured=True,
                description="Cinematic mini-documentary exploring the surviving pioneers of authentic Benga guitar fingerpicking in Western Kenya.",
            ),
            StudioProject(
                niche_id=studios_niche.id,
                title="Tech Leaders of Nairobi: Editorial Series",
                client="Venture Africa Magazine",
                category="Portraiture",
                media_type="photo_series",
                media_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
                thumbnail_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
                duration="12 Plates",
                year=2026,
                is_featured=False,
                description="Studio-lit environmental portraits capturing the founders driving Kenya's fintech and renewable energy revolution.",
            ),
        ]
        db.session.bulk_save_objects(projects)

    # 5. NexStudios Africa Rate Card Packages
    if studios_niche and ServicePackage.query.count() == 0:
        packages = [
            ServicePackage(
                niche_id=studios_niche.id,
                name="Executive & Creative Portraiture",
                category="Photography",
                tagline="Clean, magnetic portraits that command authority and authenticity.",
                starting_price=35000.0,
                currency="KES",
                billing_type="per_session",
                turnaround_time="3 business days",
                deliverables=[
                    "2 hours studio or curated location session",
                    "3 outfit changes & look variations",
                    "8 fully retouched high-resolution images",
                    "Web & print licensing rights",
                    "Private online gallery delivery",
                ],
                is_popular=False,
                sort_order=1,
            ),
            ServicePackage(
                niche_id=studios_niche.id,
                name="Brand Commercial & Reel Campaign",
                category="Video Production",
                tagline="The comprehensive visual arsenal for product launches and campaigns.",
                starting_price=120000.0,
                currency="KES",
                billing_type="per_project",
                turnaround_time="5 - 7 business days",
                deliverables=[
                    "Pre-production creative direction & storyboard",
                    "Full-day multi-camera cinema shoot (4K/6K)",
                    "1 x 60s Main Brand Hero Film",
                    "3 x 15-30s High-Conversion Vertical Social Reels (9:16)",
                    "Pro audio capture, licensed score & sound design",
                    "Advanced color grade & brand graphic lower-thirds",
                ],
                is_popular=True,
                sort_order=2,
            ),
            ServicePackage(
                niche_id=studios_niche.id,
                name="Cultural & Corporate Event Documentation",
                category="Events",
                tagline="Unfiltered energy, VIP coverage, and lightning-fast same-day highlight reels.",
                starting_price=85000.0,
                currency="KES",
                billing_type="per_day",
                turnaround_time="48 hours",
                deliverables=[
                    "2 dedicated camera operators (Photo + Cinema Video)",
                    "Up to 8 hours comprehensive coverage",
                    "150+ color-graded high-resolution photos",
                    "1 x 2-minute cinematic recap film",
                    "Same-night social media teaser clip (delivered in 4 hours)",
                ],
                is_popular=False,
                sort_order=3,
            ),
        ]
        db.session.bulk_save_objects(packages)

    # 6. NexAfriCuisine Menu & Products
    cuisine_niche = niche_map.get("nexafricuisine")
    if cuisine_niche and MenuItem.query.count() == 0:
        menu_items = [
            MenuItem(
                niche_id=cuisine_niche.id,
                title="Smoked Suya Spiced Beef Short Ribs",
                category="Signature Mains",
                heritage_origin="Northern Nigerian Yaji spice infused with Kenyan highland slow smoke",
                description=(
                    "48-hour slow-braised prime beef short ribs crusted in house-blended yaji peanut spice, "
                    "served with charred sweet plantain puree and pickled red onions."
                ),
                price=2450.0,
                currency="KES",
                image_url="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
                dietary_tags=["Chef Signature", "Nut Allergen (Peanut)", "Gluten-Free"],
                is_available=True,
                is_signature=True,
                sku="CUIS-MAIN-001",
                sort_order=1,
            ),
            MenuItem(
                niche_id=cuisine_niche.id,
                title="Lamu Coconut Tamarind Snapper",
                category="Signature Mains",
                heritage_origin="Swahili Coast / Lamu Archipelago",
                description=(
                    "Pan-seared Indian Ocean red snapper fillet bathed in a rich coconut milk reduction, "
                    "fragrant cardamom, sun-ripened tamarind, and fresh curry leaves over fragrant saffron coconut rice."
                ),
                price=2200.0,
                currency="KES",
                image_url="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
                dietary_tags=["Gluten-Free", "Pescatarian", "Dairy-Free"],
                is_available=True,
                is_signature=True,
                sku="CUIS-MAIN-002",
                sort_order=2,
            ),
            MenuItem(
                niche_id=cuisine_niche.id,
                title="Cassava Croquettes with Baobab Chili Dip",
                category="Tasting Starters",
                heritage_origin="Central & Coastal Kenyan heirloom root crops",
                description=(
                    "Crisp cassava bites infused with aged coastal goat cheese and fresh coriander, "
                    "paired with a tart baobab fruit reduction and Scotch bonnet honey."
                ),
                price=1100.0,
                currency="KES",
                image_url="https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80",
                dietary_tags=["Vegetarian", "Gluten-Free"],
                is_available=True,
                is_signature=False,
                sku="CUIS-STAR-001",
                sort_order=3,
            ),
            MenuItem(
                niche_id=cuisine_niche.id,
                title="Cold-Pressed Hibiscus, Ginger & Baobab Elixir",
                category="Artisan Beverages",
                heritage_origin="Sudanese Karkadeh & West African Bissap traditions",
                description=(
                    "Pure wild hibiscus blossoms cold-steeped with organic ginger root, fresh lime juice, "
                    "wild honey, and cold-pressed wild baobab powder."
                ),
                price=650.0,
                currency="KES",
                image_url="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80",
                dietary_tags=["Non-Alcoholic", "Immunity Boosting", "Vegan"],
                is_available=True,
                is_signature=False,
                sku="CUIS-DRNK-001",
                sort_order=4,
            ),
        ]
        db.session.bulk_save_objects(menu_items)

    # 7. Events (Upcoming & Past Recaps)
    if Event.query.count() == 0:
        events = [
            Event(
                title="Voices from the Red Soil: Contemporary Art Showcase",
                niche_slug="nexart-africa",
                event_date=datetime.utcnow() + timedelta(days=14),
                end_date=datetime.utcnow() + timedelta(days=16),
                location="NexArt Pavilion, Kilimani, Nairobi",
                category="Exhibition",
                short_description="An exclusive preview of 25 works from emerging Kenyan and diaspora visual masters.",
                description=(
                    "Curated by NexArt Africa, this 3-day exhibition introduces collectors, patrons, and art lovers "
                    "to a bold group of Nairobi artists blending ancient mediums with provocative contemporary forms."
                ),
                image_url="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
                rsvp_url="https://nexafrica.group/events/red-soil",
                ticket_price=1500.0,
                currency="KES",
                is_past=False,
            ),
            Event(
                title="NexAfriCuisine Secret Supper Club: Coastal Flavors Reimagined",
                niche_slug="nexafricuisine",
                event_date=datetime.utcnow() + timedelta(days=28),
                location="The Rooftop Greenhouse, Westlands, Nairobi",
                category="Culinary Tasting",
                short_description="An intimate 6-course multi-sensory tasting dinner paired with storytelling and live jazz.",
                description=(
                    "A private 30-seat culinary journey curated by our resident chefs, celebrating the spice trade routes "
                    "and Swahili coast delicacies with modern gastronomic flair."
                ),
                image_url="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
                rsvp_url="https://nexafrica.group/events/supper-club",
                ticket_price=6500.0,
                currency="KES",
                is_past=False,
            ),
            Event(
                title="Nexafrica Inaugural Ecosystem Gala 2025",
                niche_slug="nexafrica-group",
                event_date=datetime.utcnow() - timedelta(days=90),
                location="Nairobi National Museum Grounds",
                category="Gala & Exhibition",
                short_description="The formal launch of Nexafrica Group celebrating the fusion of African film, art, and food.",
                description=(
                    "A gathering of 400 cultural patrons, international ambassadors, and creative visionaries. "
                    "Featured live art auctions, the premiere of NexStudios documentary reels, and signature tastings by NexAfriCuisine."
                ),
                image_url="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
                is_past=True,
                attendees_count=420,
                recap_notes="Raised over 4.5M KES for emerging artist grants and premiered 3 original documentary productions.",
                recap_gallery=[
                    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
                ],
            ),
        ]
        db.session.bulk_save_objects(events)

    db.session.commit()
    print("Database successfully seeded with Nexafrica Group ecosystem data!")
