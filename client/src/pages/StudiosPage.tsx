import React, { useEffect, useState } from 'react';
import { ActivePage, StudioProject, ServicePackage } from '../types';
import { api } from '../services/api';
import { NexLogo } from '../components/NexLogo';
import { InstagramFeed } from '../components/InstagramFeed';
import { StudioBookingModal } from '../components/Modals/StudioBookingModal';
import { ArrowLeft, Play, Video, CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';

interface StudiosPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const StudiosPage: React.FC<StudiosPageProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<StudioProject[]>([]);
  const [rateCard, setRateCard] = useState<ServicePackage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const categories = ['All', 'Commercial Reel', 'Documentary', 'Portraiture'];

  useEffect(() => {
    let isMounted = true;
    Promise.all([api.getStudioPortfolio(selectedCategory), api.getRateCard()])
      .then(([projData, rcData]) => {
        if (isMounted) {
          setProjects(projData);
          setRateCard(rcData);
        }
      })
      .catch((err) => console.error(err));
    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const handleBookPackage = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setBookingModalOpen(true);
  };

  return (
    <main style={{ backgroundColor: '#F5F3EF' }}>
      {/* 1. BRAND HEADER & HERO */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(166, 25, 46, 0.2)',
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
                <NexLogo variant="studios" size="lg" />
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <span className="badge badge-red">Entity Color: #A6192E</span>
                <span className="badge">Symbolism: Energy, Passion & Motion</span>
              </div>

              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                }}
              >
                "Telling the African story visually, one shoot at a time."
              </h1>

              <p style={{ fontSize: '1.15rem', color: '#5A5751', lineHeight: 1.65, maxWidth: '780px' }}>
                NexStudios Africa is a Nairobi-based photo and video production house creating brand content, event
                coverage, and personal portraiture — built to help African businesses and individuals command their narrative.
              </p>
            </div>

            {/* Quick Action Card */}
            <div
              style={{
                backgroundColor: '#FAF8F5',
                border: '1.5px solid rgba(166, 25, 46, 0.25)',
                borderRadius: '12px',
                padding: '1.85rem',
                maxWidth: '340px',
                width: '100%',
              }}
            >
              <div className="label-smallcaps" style={{ color: '#A6192E', marginBottom: '0.6rem' }}>
                Commercial Production
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>
                Book Your Shoot
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#5A5751', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Reserve our camera operators, directors, and studio suites for upcoming campaigns or executive sessions.
              </p>
              <button
                onClick={() => {
                  setSelectedPackage(null);
                  setBookingModalOpen(true);
                }}
                className="btn btn-red"
                style={{ width: '100%', padding: '0.75rem 1rem' }}
                id="studios-hero-book-btn"
              >
                <Calendar size={15} />
                <span>Request Booking</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PORTFOLIO & REELS SECTION */}
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
              <span className="label-smallcaps" style={{ color: '#A6192E', marginBottom: '0.35rem', display: 'flex' }}>
                <Video size={13} />
                <span>Motion & Frames</span>
              </span>
              <h2>Portfolio & Showreels</h2>
            </div>

            {/* Category Filter */}
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
                    backgroundColor: selectedCategory === cat ? '#A6192E' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : '#5A5751',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#A6192E' : 'rgba(17,17,17,0.1)',
                    transition: 'all 150ms ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Video / Projects Grid */}
          <div className="grid-3" style={{ gap: '2rem' }}>
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="card card-hover"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      height: '240px',
                      position: 'relative',
                      backgroundColor: '#111111',
                      marginBottom: '1rem',
                      cursor: 'pointer',
                    }}
                    onClick={() => setActiveVideoUrl(proj.media_url)}
                  >
                    <img
                      src={proj.thumbnail_url || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'}
                      alt={proj.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(17, 17, 17, 0.25)',
                      }}
                    >
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          backgroundColor: '#A6192E',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(166,25,46,0.5)',
                        }}
                      >
                        <Play size={20} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
                      </div>
                    </div>

                    {proj.duration && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(17,17,17,0.85)',
                          color: '#FFFFFF',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {proj.duration}
                      </span>
                    )}
                  </div>

                  <span className="label-smallcaps" style={{ color: '#A6192E', fontSize: '0.72rem' }}>
                    {proj.category} {proj.client && `· ${proj.client}`}
                  </span>
                  <h4 style={{ fontSize: '1.25rem', marginTop: '0.3rem', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>
                    {proj.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#5A5751', lineHeight: 1.5 }}>
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STANDALONE RATE CARD PRICING SECTION */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(17,17,17,0.08)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
            <span className="label-smallcaps" style={{ color: '#A6192E', marginBottom: '0.4rem', display: 'flex' }}>
              <Clock size={13} />
              <span>Production Packages</span>
            </span>
            <h2>NexStudios Africa Rate Card</h2>
            <p style={{ marginTop: '0.65rem' }}>
              Transparent pricing, world-class 4K/6K cinema equipment, dedicated colorists, and rapid delivery timelines.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '2rem' }}>
            {rateCard.map((pkg) => (
              <div
                key={pkg.id}
                className="card card-hover"
                style={{
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: pkg.is_popular ? '2px solid #A6192E' : '1px solid rgba(17,17,17,0.1)',
                  position: 'relative',
                  backgroundColor: '#FFFFFF',
                }}
              >
                {pkg.is_popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '24px',
                      backgroundColor: '#A6192E',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Most Requested
                  </span>
                )}

                <div>
                  <span className="label-smallcaps" style={{ color: '#8A867E' }}>{pkg.category}</span>
                  <h3 style={{ fontSize: '1.45rem', marginTop: '0.4rem', marginBottom: '0.65rem' }}>{pkg.name}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#5A5751', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                    {pkg.tagline}
                  </p>

                  <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(17,17,17,0.08)' }}>
                    <div className="label-smallcaps" style={{ color: '#8A867E', fontSize: '0.68rem' }}>Starting From</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: "'Playfair Display', serif", color: '#111111' }}>
                      {pkg.currency} {pkg.starting_price.toLocaleString()}
                    </div>
                    {pkg.turnaround_time && (
                      <div style={{ fontSize: '0.8rem', color: '#5A5751', marginTop: '0.2rem' }}>
                        Turnaround: <strong>{pkg.turnaround_time}</strong>
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <div className="label-smallcaps" style={{ color: '#111111', marginBottom: '0.75rem', fontSize: '0.72rem' }}>
                      Deliverables Included:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {pkg.deliverables.map((deliv, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.86rem', color: '#5A5751' }}>
                          <CheckCircle2 size={16} color="#A6192E" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleBookPackage(pkg)}
                  className={pkg.is_popular ? 'btn btn-red' : 'btn btn-secondary'}
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <span>Book This Package</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INSTAGRAM FEED */}
      <InstagramFeed nicheSlug="nexstudios-africa" themeColor="#A6192E" />

      {/* Video Modal Player */}
      {activeVideoUrl && (
        <div className="modal-overlay" onClick={() => setActiveVideoUrl(null)}>
          <div
            style={{
              maxWidth: '900px',
              width: '100%',
              backgroundColor: '#000000',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideoUrl}
              controls
              autoPlay
              style={{ width: '100%', maxHeight: '80vh', display: 'block' }}
            />
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <StudioBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </main>
  );
};
