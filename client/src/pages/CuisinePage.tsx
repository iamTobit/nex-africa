import React, { useEffect, useState } from 'react';
import { ActivePage, MenuItem } from '../types';
import { api } from '../services/api';
import { NexLogo } from '../components/NexLogo';
import { InstagramFeed } from '../components/InstagramFeed';
import { CateringInquiryModal } from '../components/Modals/CateringInquiryModal';
import { ArrowLeft, Utensils, Sparkles, ChefHat, Leaf, Flame, ArrowRight } from 'lucide-react';

interface CuisinePageProps {
  onNavigate: (page: ActivePage) => void;
}

export const CuisinePage: React.FC<CuisinePageProps> = ({ onNavigate }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cateringModalOpen, setCateringModalOpen] = useState(false);

  const categories = ['All', 'Signature Mains', 'Tasting Starters', 'Artisan Beverages'];

  useEffect(() => {
    let isMounted = true;
    api.getCuisineMenu(selectedCategory).then((data) => {
      if (isMounted) setMenuItems(data);
    });
    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  return (
    <main style={{ backgroundColor: '#F5F3EF' }}>
      {/* 1. BRAND HEADER & HERO */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(47, 107, 58, 0.25)',
          paddingTop: '3.5rem',
          paddingBottom: '4.5rem',
        }}
      >
        <div className="container">
          <button
            onClick={() => onNavigate('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#5A5751',
              fontSize: '0.84rem',
              fontWeight: 600,
              marginBottom: '1.75rem',
            }}
          >
            <ArrowLeft size={15} />
            <span>Part of Nexafrica Group</span>
          </button>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
            <div style={{ maxWidth: '820px' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <NexLogo variant="cuisine" size="lg" />
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <span className="badge badge-green">Entity Color: #2F6B3A</span>
                <span className="badge">Symbolism: The Land, Growth & Nourishment</span>
              </div>

              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                }}
              >
                "Treating food as identity, not just consumption."
              </h1>

              <p style={{ fontSize: '1.15rem', color: '#5A5751', lineHeight: 1.65, maxWidth: '780px' }}>
                NexAfriCuisine celebrates African culinary heritage — from home-cooked traditions to modern
                reinterpretations — through content, catering, and cultural storytelling rooted in continental soils.
              </p>
            </div>

            {/* Catering CTA Card */}
            <div
              style={{
                backgroundColor: '#FAF8F5',
                border: '1.5px solid rgba(47, 107, 58, 0.3)',
                borderRadius: '12px',
                padding: '1.85rem',
                maxWidth: '340px',
                width: '100%',
              }}
            >
              <div className="label-smallcaps" style={{ color: '#2F6B3A', marginBottom: '0.6rem' }}>
                Private Dining & Events
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>
                Book Our Catering
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#5A5751', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Bring our multi-sensory African culinary journey to private gatherings, tasting dinners, and corporate summits.
              </p>
              <button
                onClick={() => setCateringModalOpen(true)}
                className="btn btn-green"
                style={{ width: '100%', padding: '0.75rem 1rem' }}
                id="cuisine-catering-btn"
              >
                <ChefHat size={15} />
                <span>Inquire Catering</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HERITAGE MENU & PRODUCTS DISPLAY */}
      <section className="section-padding">
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.5rem',
              gap: '1.5rem',
            }}
          >
            <div>
              <span className="label-smallcaps" style={{ color: '#2F6B3A', marginBottom: '0.35rem', display: 'flex' }}>
                <Utensils size={13} />
                <span>Gastronomic Lineage</span>
              </span>
              <h2>Menu & Product Highlights</h2>
              <p style={{ fontSize: '0.88rem', color: '#8A867E', marginTop: '0.2rem' }}>
                Structured for future online ordering and seasonal dining subscriptions.
              </p>
            </div>

            {/* Categories */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    backgroundColor: selectedCategory === cat ? '#2F6B3A' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : '#5A5751',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#2F6B3A' : 'rgba(17,17,17,0.1)',
                    transition: 'all 150ms ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid-2" style={{ gap: '2.5rem' }}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="card card-hover"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div>
                  {item.image_url && (
                    <div
                      style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        height: '240px',
                        backgroundColor: '#EDEAE4',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <span className="label-smallcaps" style={{ color: '#2F6B3A', fontSize: '0.72rem' }}>
                        {item.category}
                      </span>
                      <h3 style={{ fontSize: '1.45rem', marginTop: '0.25rem' }}>{item.title}</h3>
                    </div>

                    <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: "'Playfair Display', serif", color: '#111111' }}>
                      {item.currency} {item.price.toLocaleString()}
                    </div>
                  </div>

                  {item.heritage_origin && (
                    <div style={{ fontSize: '0.86rem', color: '#8c6a15', marginBottom: '0.75rem', fontWeight: 500 }}>
                      Heritage Origin: <em>{item.heritage_origin}</em>
                    </div>
                  )}

                  <p style={{ fontSize: '0.94rem', color: '#5A5751', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {item.description}
                  </p>

                  {/* Dietary & Highlight Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {item.dietary_tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge"
                        style={{
                          fontSize: '0.72rem',
                          backgroundColor: tag.includes('Signature') ? 'rgba(47,107,58,0.12)' : 'rgba(17,17,17,0.04)',
                          color: tag.includes('Signature') ? '#2F6B3A' : '#5A5751',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(17,17,17,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: '#8A867E' }}>
                    SKU: <code>{item.sku || 'CUISINE-PROD'}</code>
                  </span>
                  <button
                    onClick={() => setCateringModalOpen(true)}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
                  >
                    <span>Request on Menu</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECRET SUPPER CLUBS CALLOUT */}
      <section className="section-padding-sm" style={{ backgroundColor: '#FAF8F5', borderTop: '1px solid rgba(47, 107, 58, 0.2)' }}>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          <span className="label-smallcaps" style={{ color: '#2F6B3A', marginBottom: '0.75rem' }}>
            Nairobi Secret Supper Clubs
          </span>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Multi-Course Heritage Gastronomy</h2>
          <p style={{ color: '#5A5751', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Monthly communal banquets pairing ancient fermentation techniques, indigenous spices, and contemporary
            African jazz. Limited to 30 seats per seating.
          </p>
          <button onClick={() => onNavigate('nexevents-africa')} className="btn btn-green" style={{ padding: '0.85rem 1.85rem' }}>
            <span>View Upcoming Supper Club Dates</span>
          </button>
        </div>
      </section>

      {/* 4. INSTAGRAM FEED */}
      <InstagramFeed nicheSlug="nexafricuisine" themeColor="#2F6B3A" />

      {/* Catering Inquiry Modal */}
      <CateringInquiryModal isOpen={cateringModalOpen} onClose={() => setCateringModalOpen(false)} />
    </main>
  );
};
