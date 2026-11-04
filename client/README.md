# Nexafrica Group — Frontend Client

A responsive web application built with **React**, **TypeScript**, and **Vite**, styled with a custom **Vanilla CSS** design system faithful to the **Nexafrica Group Website Design Brief**.

---

## 🎨 Brand Design Guidelines Implemented

| Entity | Primary Hex | Symbolism | Page Route |
|---|---|---|---|
| **Nexafrica Group** | `#111111` (Black) | The people, unity | `/` (`#home`) |
| **NexArt Africa** | `#B8912A` (Gold) | Wealth/richness of heritage | `#nexart-africa` |
| **NexStudios Africa** | `#A6192E` (Red) | Energy, passion, motion | `#nexstudios-africa` |
| **NexAfriCuisine** | `#2F6B3A` (Green) | The land, growth, nourishment | `#nexafricuisine` |
| **NexEvents Africa** | `#111111` (Black) | Live gatherings (Upcoming) | `#nexevents-africa` |
| **Site-wide Canvas** | `#F5F3EF` | Neutral warm off-white | Site-wide |
| **Cards & Surfaces** | `#FFFFFF` | Crisp elevated canvas | Components |

### Typography
- **Headings & Wordmarks:** Display Serif (`Playfair Display` & Georgia) in bold weights.
- **Body & Navigation:** Clean Sans-serif (`Inter`, Helvetica, Arial).
- **Small Caps Labels:** Wide letter-spacing matching the official monogram logo family look (`letter-spacing: 0.16em`).

---

## 🧭 Site Structure & Pages

1. **Home (Nexafrica Group)**
   - Hero brand statement: *"An interconnected African creative ecosystem — one idea, many expressions."*
   - Interactive 4-card ecosystem grid with direct links to each niche
   - Founder statement spotlight: *"Africa's creativity deserves more than admiration — it deserves infrastructure."* — Francis Kimathi, Founder.
   - Six verbs ribbon & live upcoming event highlights.

2. **About / Vision**
   - The founding story and pan-African mission
   - The Six Verbs operational doctrine: **Create · Document · Preserve · Connect · Communicate · Build**
   - The Nexafrica Standard (Core values: *Uncompromising Quality, Creator Equity, Cultural Depth, Ecosystem Synergies*).

3. **NexArt Africa** (`#B8912A` Gold)
   - Artist gallery filterable by category (*Painting, Sculpture, Photography, Mixed Media*)
   - Modal artwork details viewer
   - Private and corporate commissions information
   - **"Submit Your Work" CTA** modal connected to `/api/art/submit-work`
   - Curated Instagram feed grid (`@nexartafrica`).

4. **NexStudios Africa** (`#A6192E` Red)
   - Video reels and production portfolio (*Commercial Reel, Documentary, Portraiture*)
   - Embedded video player modal
   - Standalone **Rate Card Pricing Section** with deliverables breakdown
   - **Production Booking CTA** modal connected to `/api/studios/book`
   - Curated Instagram feed grid (`@nexstudiosafrica`).

5. **NexAfriCuisine** (`#2F6B3A` Green)
   - Culinary heritage storytelling: *"Treating food as identity, not just consumption"*
   - Categorized menu & product highlights (*Signature Mains, Tasting Starters, Artisan Beverages*) with KES pricing and dietary badges
   - Structured for future e-commerce checkout integration
   - **Catering & Private Dining Booking CTA** modal connected to `/api/cuisine/catering-inquiry`
   - Curated Instagram feed grid (`@nexafricuisine`).

6. **NexEvents Africa** (`#111111` Black)
   - Upcoming Nairobi cultural calendar with **RSVP modal** connected to `/api/events/<id>/rsvp`
   - Past event recaps with attendee counts, photos, and highlight notes
   - Curated Instagram feed grid (`@nexeventsafrica`).

7. **Partner / Invest**
   - Explainer for prospective student partners and future capital investors
   - Interactive proposal inquiry form connected to `/api/inquiries/partner-invest`.

8. **Contact**
   - General contact form with **dropdown routing per niche** (`target_niche`) connected to `/api/inquiries/contact`
   - Nairobi HQ address, studio hours, and official channels.

---

## ⚡ Quick Start

```bash
cd client
npm install
npm run dev
```
> The development server will run at: `http://127.0.0.1:5173/`

### Production Build
```bash
npm run build
```
Builds the bundle into `dist/` with full TypeScript type checks and optimized assets.
