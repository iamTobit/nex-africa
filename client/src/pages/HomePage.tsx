import React, { useEffect, useState } from 'react';
import { ActivePage, EcosystemVision, Niche, EventItem } from '../types';
import { api } from '../services/api';
import { NexLogo } from '../components/NexLogo';
import { resolveImageUrl, handleImageError } from '../utils/images';
import { ArrowRight, ArrowUpRight, Sparkles, Calendar, Layers, BookOpen } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: ActivePage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [, setEcosystem] = useState<EcosystemVision | null>(null);
  const [, setNiches] = useState<Niche[]>([]);
  const [recentEvents, setRecentEvents] = useState<EventItem[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([api.getEcosystem(), api.getEvents()])
      .then(([ecoData, eventsData]) => {
        if (isMounted) {
          setEcosystem(ecoData.group_vision);
          setNiches(ecoData.niches.filter((n) => n.slug !== 'nexafrica-group'));
          setRecentEvents(eventsData.slice(0, 3));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load homepage data', err);
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          paddingTop: '6rem',
          paddingBottom: '6.5rem',
          backgroundColor: '#000000',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle geometric background watermark */}
        <div
          style={{
            position: 'absolute',
            right: '-6%',
            top: '5%',
            opacity: 0.05,
            pointerEvents: 'none',
            transform: 'scale(1.4)',
          }}
        >
          <NexLogo variant="group" colorOverride="#FFFFFF" size="lg" showSubtitle={false} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Animated Brand Hero Mark */}
          <div style={{ marginBottom: '1.5rem' }}>
            <NexLogo variant="group" size="lg" animated />
          </div>

          {/* Tagline / Small Caps Header */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span
              className="badge"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                padding: '0.45rem 1rem',
                fontSize: '0.78rem',
              }}
            >
              <Sparkles size={13} color="#FFFFFF" />
              <span className="label-smallcaps" style={{ color: '#FFFFFF' }}>
                One Idea, Many Expressions
              </span>
            </span>
          </div>

          {/* Hero Statement */}
          <div style={{ maxWidth: '960px' }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.5rem, 5.2vw, 4.5rem)',
                lineHeight: 1.12,
                color: '#FFFFFF',
                marginBottom: '1.75rem',
                fontWeight: 800,
              }}
            >
              The interconnected African creative ecosystem.
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                color: '#BFBFBF',
                lineHeight: 1.6,
                maxWidth: '780px',
                marginBottom: '2.5rem',
              }}
            >
              Nexafrica Group unifies contemporary visual arts, cinema production, culinary heritage, editorial
              chronicles, and live cultural gatherings under one commercial infrastructure.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => {
                  const target = document.getElementById('ecosystem-section');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary"
                style={{ padding: '0.9rem 1.85rem' }}
                id="hero-explore-btn"
              >
                <span>Explore the Ecosystem</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onNavigate('magazine')}
                className="btn btn-secondary"
                style={{ padding: '0.9rem 1.85rem' }}
                id="hero-magazine-btn"
              >
                <span>Read NexMagazine</span>
                <BookOpen size={16} />
              </button>

              <button
                onClick={() => onNavigate('partner')}
                className="btn btn-secondary"
                style={{ padding: '0.9rem 1.85rem' }}
                id="hero-partner-btn"
              >
                <span>Partner With Us</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Stats Bar — Majority White on Black, Minority Subsidiary Accents */}
          <div
            style={{
              marginTop: '4.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                5
              </div>
              <div className="label-smallcaps" style={{ color: '#808080', marginTop: '0.2rem' }}>
                Creative Niches & Editorial
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                6 Verbs
              </div>
              <div className="label-smallcaps" style={{ color: '#808080', marginTop: '0.2rem' }}>
                Foundational Doctrine
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                100%
              </div>
              <div className="label-smallcaps" style={{ color: '#808080', marginTop: '0.2rem' }}>
                African Creator Equity
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                Nairobi HQ
              </div>
              <div className="label-smallcaps" style={{ color: '#808080', marginTop: '0.2rem' }}>
                Pan-African Reach
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "OUR ECOSYSTEM" SECTION */}
      <section
        id="ecosystem-section"
        className="section-padding"
        style={{ backgroundColor: '#000000', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}
      >
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
            <span className="label-smallcaps" style={{ color: '#FFFFFF', marginBottom: '0.5rem', display: 'flex' }}>
              <Layers size={13} />
              <span>Dedicated Portals</span>
            </span>
            <h2 style={{ color: '#FFFFFF' }}>Our Creative Ecosystem</h2>
            <p style={{ marginTop: '0.65rem', color: '#BFBFBF' }}>
              Each niche entity operates with its own distinct identity, leadership, and calls to action while drawing
              strength from the unified Nexafrica Group umbrella.
            </p>
          </div>

          {/* 4 Niche Cards Grid */}
          <div className="grid-2" style={{ gap: '2.25rem' }}>
            {/* 1. NexArt Africa */}
            <div
              className="card card-hover"
              onClick={() => onNavigate('nexart-africa')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: '4px solid #B8912A',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <NexLogo variant="art" size="md" />
                  <span className="badge badge-gold">Wealth of Heritage</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '0.65rem', color: '#FFFFFF' }}>NexArt Africa</h3>
                <p style={{ fontSize: '0.96rem', lineHeight: 1.6, color: '#BFBFBF' }}>
                  Discovers and documents Nairobi's emerging visual artists — from studio visits to full exhibitions —
                  connecting their work to collectors and institutions worldwide.
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#B8912A',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                <span>Explore Artist Gallery & Submissions</span>
                <ArrowRight size={15} />
              </div>
            </div>

            {/* 2. NexStudios Africa */}
            <div
              className="card card-hover"
              onClick={() => onNavigate('nexstudios-africa')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: '4px solid #A6192E',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <NexLogo variant="studios" size="md" />
                  <span className="badge badge-red">Energy & Motion</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '0.65rem', color: '#FFFFFF' }}>NexStudios Africa</h3>
                <p style={{ fontSize: '0.96rem', lineHeight: 1.6, color: '#BFBFBF' }}>
                  A Nairobi-based photo and video production house creating brand content, event coverage, and personal
                  portraiture — built to help African businesses tell their story visually.
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#A6192E',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                <span>View Reels & Rate Card</span>
                <ArrowRight size={15} />
              </div>
            </div>

            {/* 3. NexAfriCuisine */}
            <div
              className="card card-hover"
              onClick={() => onNavigate('nexafricuisine')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: '4px solid #2F6B3A',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <NexLogo variant="cuisine" size="md" />
                  <span className="badge badge-green">The Land & Growth</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '0.65rem', color: '#FFFFFF' }}>NexAfriCuisine</h3>
                <p style={{ fontSize: '0.96rem', lineHeight: 1.6, color: '#BFBFBF' }}>
                  Celebrates African culinary heritage — from home-cooked traditions to modern reinterpretations — through
                  curated content, catering, and cultural storytelling that treats food as identity.
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#2F6B3A',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                <span>Discover Heritage Menu & Catering</span>
                <ArrowRight size={15} />
              </div>
            </div>

            {/* 4. NexEvents Africa */}
            <div
              className="card card-hover"
              onClick={() => onNavigate('nexevents-africa')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: '4px solid #FFFFFF',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <NexLogo variant="events" size="md" />
                  <span className="badge" style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 700 }}>
                    Nairobi Calendar
                  </span>
                </div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '0.65rem', color: '#FFFFFF' }}>NexEvents Africa</h3>
                <p style={{ fontSize: '0.96rem', lineHeight: 1.6, color: '#BFBFBF' }}>
                  Curates Nairobi's cultural calendar — exhibitions, tastings, galas, and live performances that bring the
                  whole Nexafrica ecosystem to life in person.
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                <span>View Upcoming Calendar & Recaps</span>
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEXMAGAZINE EDITORIAL SPOTLIGHT SECTION */}
      <section
        id="magazine-section"
        className="section-padding"
        style={{
          backgroundColor: '#060606',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '3rem',
              gap: '1.5rem',
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <span className="label-smallcaps" style={{ color: '#FFFFFF', marginBottom: '0.5rem', display: 'flex' }}>
                <BookOpen size={14} />
                <span>Editorial & Print Publication</span>
              </span>
              <h2 style={{ color: '#FFFFFF' }}>NexMagazine</h2>
              <p style={{ marginTop: '0.5rem', color: '#BFBFBF' }}>
                Long-form cultural criticism, studio monographs, and visual essays documenting East Africa’s creative
                vanguard.
              </p>
            </div>

            <button
              onClick={() => onNavigate('magazine')}
              className="btn btn-primary"
              style={{ fontSize: '0.88rem' }}
            >
              <span>Explore Magazine Issues</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div
            className="card"
            onClick={() => onNavigate('magazine')}
            style={{
              cursor: 'pointer',
              padding: 'clamp(1.75rem, 3.5vw, 3rem)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
              backgroundColor: '#0B0B0B',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            <div
              style={{
                borderRadius: '6px',
                overflow: 'hidden',
                height: '340px',
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.14)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
                alt="NexMagazine Issue 01"
                onError={(e) => handleImageError(e)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%) contrast(1.1)' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                ISSUE 01 · VOL. I
              </div>
            </div>

            <div>
              <div style={{ marginBottom: '1rem' }}>
                <NexLogo variant="magazine" size="sm" />
              </div>
              <span className="badge" style={{ marginBottom: '1rem' }}>
                Inaugural Print & Digital Edition
              </span>
              <h3 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginBottom: '0.85rem', color: '#FFFFFF' }}>
                The Infrastructure of Imagination
              </h3>
              <p style={{ color: '#BFBFBF', marginBottom: '1.5rem', lineHeight: 1.65 }}>
                Featuring studio visits in Kilimani, the new cinema of the Swahili Coast, and culinary essays on
                fermentation, memory, and fire across the African continent.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  marginBottom: '1.75rem',
                }}
              >
                <span className="badge badge-gold">Visual Art Monograph</span>
                <span className="badge badge-red">Cinema & Motion Essay</span>
                <span className="badge badge-green">Culinary Lineage</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                }}
              >
                <span>Read Issue 01 Dispatches</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER STATEMENT SPOTLIGHT */}
      <section
        className="section-padding"
        style={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          position: 'relative',
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span
              className="label-smallcaps"
              style={{ color: '#FFFFFF', opacity: 0.75, letterSpacing: '0.22em', marginBottom: '1.5rem' }}
            >
              The Nexafrica Premise
            </span>

            <blockquote
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)',
                lineHeight: 1.35,
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '2rem',
                fontStyle: 'italic',
              }}
            >
              "Nexafrica Group exists because Africa's creativity deserves more than admiration — it deserves
              infrastructure. We're building the platforms, the audiences, and the businesses that let African creators own
              their own story."
            </blockquote>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.04em', color: '#FFFFFF' }}>
                Francis Kimathi
              </div>
              <div className="label-smallcaps" style={{ color: '#B8912A' }}>
                Founder, Nexafrica Group
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECENT EVENT HIGHLIGHTS */}
      {recentEvents.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: '#000000', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <div className="container">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '3rem',
                gap: '1rem',
              }}
            >
              <div>
                <span className="label-smallcaps" style={{ color: '#FFFFFF', marginBottom: '0.4rem', display: 'flex' }}>
                  <Calendar size={13} />
                  <span>Cultural Momentum</span>
                </span>
                <h2 style={{ color: '#FFFFFF' }}>Recent & Upcoming Events</h2>
              </div>

              <button
                onClick={() => onNavigate('nexevents-africa')}
                className="btn btn-secondary"
                style={{ fontSize: '0.86rem' }}
              >
                <span>View Full Calendar</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid-3">
              {recentEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="card card-hover"
                  style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    {evt.image_url && (
                      <div style={{ borderRadius: '6px', overflow: 'hidden', height: '180px', marginBottom: '1.25rem' }}>
                        <img
                          src={resolveImageUrl(evt.image_url, evt.title)}
                          alt={evt.title}
                          onError={(e) => handleImageError(e)}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <span className="badge" style={{ marginBottom: '0.65rem' }}>
                      {evt.category}
                    </span>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}>
                      {evt.title}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: '#BFBFBF', lineHeight: 1.5 }}>
                      {evt.short_description}
                    </p>
                  </div>

                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.82rem', color: '#808080' }}>
                    <div>📍 {evt.location}</div>
                    <div style={{ marginTop: '0.25rem' }}>
                      📅 {new Date(evt.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CALL TO ACTION: PARTNER & GENERAL INQUIRY (No Public Investor Section) */}
      <section className="section-padding" style={{ backgroundColor: '#000000' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: '#0B0B0B',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '16px',
              padding: 'clamp(2.5rem, 5vw, 4.5rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <span className="label-smallcaps" style={{ color: '#FFFFFF', letterSpacing: '0.18em', marginBottom: '1rem' }}>
              Building the Future of African Storytelling
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', maxWidth: '720px', marginBottom: '1.25rem', color: '#FFFFFF' }}>
              Ready to collaborate, partner, or join our creator ecosystem?
            </h2>
            <p style={{ maxWidth: '620px', marginBottom: '2.5rem', color: '#BFBFBF', fontSize: '1.05rem' }}>
              Whether you are an emerging visual artist, student creator, brand collaborator, or cultural institution, we
              welcome visionary partners to build with us.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => onNavigate('partner')}
                className="btn btn-primary"
                style={{ padding: '0.9rem 1.85rem' }}
                id="cta-partner-btn"
              >
                <span>Partner Portal</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="btn btn-secondary"
                style={{ padding: '0.9rem 1.85rem' }}
                id="cta-contact-btn"
              >
                <span>General Contact</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
