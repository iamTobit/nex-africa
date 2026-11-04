import React, { useEffect, useState } from 'react';
import { ActivePage, Artwork } from '../types';
import { api } from '../services/api';
import { NexLogo } from '../components/NexLogo';
import { InstagramFeed } from '../components/InstagramFeed';
import { ArtistSubmissionModal } from '../components/Modals/ArtistSubmissionModal';
import { ArrowLeft, Sparkles, Filter, PlusCircle, ExternalLink, ShieldCheck, Tag, X } from 'lucide-react';

interface ArtPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const ArtPage: React.FC<ArtPageProps> = ({ onNavigate }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [categories, setCategories] = useState<string[]>(['All', 'Painting', 'Sculpture', 'Photography', 'Mixed Media']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.getArtworks(selectedCategory)
      .then((data) => {
        if (isMounted) {
          setArtworks(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load artworks', err);
        if (isMounted) setLoading(false);
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
          borderBottom: '1px solid rgba(184, 145, 42, 0.25)',
          paddingTop: '3.5rem',
          paddingBottom: '4.5rem',
        }}
      >
        <div className="container">
          {/* Back to Group Tag */}
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
                <NexLogo variant="art" size="lg" />
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <span className="badge badge-gold">Entity Color: #B8912A</span>
                <span className="badge">Symbolism: Wealth & Heritage</span>
              </div>

              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                }}
              >
                "We don't just sell art; we build the story around it."
              </h1>

              <p style={{ fontSize: '1.15rem', color: '#5A5751', lineHeight: 1.65, maxWidth: '780px' }}>
                NexArt Africa discovers and documents Nairobi's emerging visual artists — from studio visits to full
                exhibitions — connecting their work to collectors, institutions, and audiences who might otherwise never
                see it.
              </p>
            </div>

            {/* Submit Your Work CTA Card */}
            <div
              style={{
                backgroundColor: '#FAF8F5',
                border: '1.5px solid rgba(184, 145, 42, 0.3)',
                borderRadius: '12px',
                padding: '1.85rem',
                maxWidth: '340px',
                width: '100%',
              }}
            >
              <div className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.6rem' }}>
                For Emerging Artists
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>
                Submit Your Portfolio
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#5A5751', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Open call for Nairobi-based and East African visual artists looking for exhibition and collection representation.
              </p>
              <button
                onClick={() => setSubmissionModalOpen(true)}
                className="btn btn-gold"
                style={{ width: '100%', padding: '0.75rem 1rem' }}
                id="art-submit-work-btn"
              >
                <PlusCircle size={15} />
                <span>Submit Your Work</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GALLERY & EXHIBITIONS */}
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
              <span className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.35rem', display: 'flex' }}>
                <Sparkles size={13} />
                <span>Curated Catalog</span>
              </span>
              <h2>Exhibitions & Artworks</h2>
            </div>

            {/* Category Filter Buttons */}
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
                    letterSpacing: '0.03em',
                    backgroundColor: selectedCategory === cat ? '#B8912A' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : '#5A5751',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#B8912A' : 'rgba(17,17,17,0.1)',
                    transition: 'all 150ms ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Artworks Grid */}
          <div className="grid-2" style={{ gap: '2.5rem' }}>
            {artworks.map((art) => (
              <div
                key={art.id}
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
                  <div
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      height: '320px',
                      backgroundColor: '#EDEAE4',
                      marginBottom: '1.25rem',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedArtwork(art)}
                  >
                    <img
                      src={art.image_url}
                      alt={art.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <span className="label-smallcaps" style={{ color: '#B8912A', fontSize: '0.7rem' }}>
                        {art.category} · {art.year}
                      </span>
                      <h3 style={{ fontSize: '1.45rem', marginTop: '0.2rem' }}>{art.title}</h3>
                      <div style={{ fontWeight: 600, color: '#111111', fontSize: '0.98rem' }}>
                        By {art.artist_name}
                      </div>
                    </div>

                    {art.price && (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111111', fontFamily: "'Playfair Display', serif" }}>
                          {art.currency} {art.price.toLocaleString()}
                        </div>
                        <span className="badge" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                          Available
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: '0.86rem', color: '#8A867E', marginBottom: '0.75rem' }}>
                    {art.medium} · {art.dimensions}
                  </div>

                  {art.description && (
                    <p style={{ fontSize: '0.92rem', color: '#5A5751', lineHeight: 1.55 }}>
                      {art.description}
                    </p>
                  )}
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
                    Exhibition: <strong>{art.exhibition_title || 'Current Showcase'}</strong>
                  </span>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
                  >
                    <span>Inquire Piece</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMMISSION INFO BANNER */}
      <section className="section-padding-sm" style={{ backgroundColor: '#FAF8F5', borderTop: '1px solid rgba(184, 145, 42, 0.2)' }}>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          <span className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.75rem' }}>
            Private & Institutional Commissions
          </span>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Commission a Bespoke Artwork</h2>
          <p style={{ color: '#5A5751', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Looking for large-scale fiber sculptures, monumental canvases, or bespoke collections for private residences,
            luxury hotels, or corporate offices? NexArt Africa curates direct commissions between clients and our
            vanguard artists.
          </p>
          <button onClick={() => onNavigate('contact')} className="btn btn-gold" style={{ padding: '0.85rem 1.85rem' }}>
            <span>Initiate a Commission Inquiry</span>
          </button>
        </div>
      </section>

      {/* 4. EMBEDDED INSTAGRAM FEED */}
      <InstagramFeed nicheSlug="nexart-africa" themeColor="#B8912A" />

      {/* Artist Submission Modal */}
      <ArtistSubmissionModal isOpen={submissionModalOpen} onClose={() => setSubmissionModalOpen(false)} />

      {/* Selected Artwork Inspection Modal */}
      {selectedArtwork && (
        <div className="modal-overlay" onClick={() => setSelectedArtwork(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: '800px', padding: '2rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArtwork(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#5A5751' }}
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', backgroundColor: '#EDEAE4' }}>
                <img
                  src={selectedArtwork.image_url}
                  alt={selectedArtwork.title}
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '480px', objectFit: 'cover' }}
                />
              </div>

              <div>
                <span className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.4rem', display: 'block' }}>
                  {selectedArtwork.category} · {selectedArtwork.year}
                </span>
                <h2 style={{ fontSize: '1.85rem', marginBottom: '0.35rem' }}>{selectedArtwork.title}</h2>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111111', marginBottom: '1rem' }}>
                  By {selectedArtwork.artist_name}
                </div>

                <div style={{ fontSize: '0.9rem', color: '#8A867E', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  <div><strong>Medium:</strong> {selectedArtwork.medium}</div>
                  <div><strong>Dimensions:</strong> {selectedArtwork.dimensions}</div>
                  {selectedArtwork.exhibition_title && (
                    <div><strong>Exhibition:</strong> {selectedArtwork.exhibition_title}</div>
                  )}
                </div>

                {selectedArtwork.description && (
                  <p style={{ fontSize: '0.95rem', color: '#5A5751', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {selectedArtwork.description}
                  </p>
                )}

                {selectedArtwork.price && (
                  <div style={{ marginBottom: '1.5rem', padding: '0.85rem 1rem', backgroundColor: '#FAF8F5', borderRadius: '6px' }}>
                    <div className="label-smallcaps" style={{ color: '#8A867E', fontSize: '0.68rem' }}>Acquisition Value</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: "'Playfair Display', serif", color: '#111111' }}>
                      {selectedArtwork.currency} {selectedArtwork.price.toLocaleString()}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSelectedArtwork(null);
                    onNavigate('contact');
                  }}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <span>Inquire Regarding Acquisition</span>
                  <ExternalLink size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
