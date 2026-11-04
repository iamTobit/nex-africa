# Nexafrica Group — Web Platform

The official digital home for **Nexafrica Group**, the parent brand for an interconnected African creative ecosystem based in Nairobi, Kenya.

> *"One idea, many expressions."*  
> *"Nexafrica Group exists because Africa's creativity deserves more than admiration — it deserves infrastructure. We're building the platforms, the audiences, and the businesses that let African creators own their own story."*  
> — **Francis Kimathi**, Founder

---

## 🏗 Architecture

```
nexafrica-rono/
├── client/                     # Frontend Client (React 19 + TypeScript + Vite + Vanilla CSS)
│   ├── src/
│   │   ├── components/         # Nav, Footer, NexLogo, InstagramFeed, Modals (RSVP, Booking, Submit, Catering)
│   │   ├── pages/              # Home, About, NexArt, NexStudios, NexAfriCuisine, NexEvents, Partner/Invest, Contact
│   │   ├── services/api.ts     # REST API client connecting to Flask backend
│   │   └── index.css           # Vanilla CSS Design System with brand guidelines
│   └── package.json
└── server/                     # Backend API (Python 3.11 + Flask 3.1 + PostgreSQL + SQLAlchemy)
    ├── app/
    │   ├── models/             # 9 PostgreSQL tables (niches, vision, artworks, projects, menu, events, inquiries)
    │   ├── routes/             # Modular REST Blueprints (/api/ecosystem, /api/art, /api/studios, etc.)
    │   └── seed_data.py        # Seed script populating authentic brand content from the design brief
    ├── tests/                  # 12 automated pytest integration tests
    ├── .env                    # PostgreSQL connection string and environment variables
    └── run.py                  # CLI runner and entry point
```

---

## 🎨 Creative Ecosystem & Color Palette

| Entity | Primary Color | Significance | Core Focus |
|---|---|---|---|
| **Nexafrica Group** | `#111111` (Black) | The people, unity | Parent brand, values, founder vision, investor relations |
| **NexArt Africa** | `#B8912A` (Gold) | Wealth/richness of heritage | Visual arts curation, emerging artist exhibitions, artist submissions |
| **NexStudios Africa** | `#A6192E` (Red) | Energy, passion, motion | Cinema & video production, commercial reels, portraiture sessions, rate card |
| **NexAfriCuisine** | `#2F6B3A` (Green) | The land, growth, nourishment | African culinary heritage, secret supper clubs, catering bookings |
| **NexEvents Africa** | `#111111` (Black) | Gatherings & community | Nairobi cultural calendar, live performances, galas, event RSVPs |

---

## 🚀 Running the Project

### 1. Start the Flask + PostgreSQL Backend
```bash
cd server
source venv/bin/activate
python run.py
```
Backend runs at: **`http://127.0.0.1:5001`**  
Health Check: **`http://127.0.0.1:5001/api/health`**

To re-seed the PostgreSQL database anytime:
```bash
python run.py seed-db
```

To run automated backend tests:
```bash
pytest
```

---

### 2. Start the React + TypeScript Frontend
```bash
cd client
npm install
npm run dev
```
Frontend runs at: **`http://127.0.0.1:5173/`**

---

## 📩 Key Functionality & CTAs

- **General Contact Routing:** Single contact form in the Contact page that dynamically routes inquiries to the chosen niche inbox (`target_niche`).
- **Partner / Invest Portal:** Dedicated section and form for student fellow partners and future seed syndicate investors.
- **NexArt "Submit Your Work":** Open call submission modal for East African visual artists.
- **NexStudios Rate Card Booking:** Interactive standalone pricing packages with one-click production booking modal.
- **NexAfriCuisine Catering Inquiries:** Private dinner & banquet catering booking modal with dietary preferences.
- **NexEvents Cultural Calendar:** Interactive RSVPs for Nairobi exhibitions and supper club gatherings.
- **Embedded Instagram Feeds:** Live post grids per niche page (`@nexafricagroup`, `@nexartafrica`, `@nexstudiosafrica`, `@nexafricuisine`, `@nexeventsafrica`).
# nex-africa
