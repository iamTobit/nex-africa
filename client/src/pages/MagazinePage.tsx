import React, { useState } from 'react';
import { ActivePage, MagazineIssue } from '../types';
import { NexLogo } from '../components/NexLogo';
import { MagazinePitchModal } from '../components/Modals/MagazinePitchModal';
import { resolveImageUrl, handleImageError } from '../utils/images';
import { ArrowLeft, BookOpen, ArrowUpRight, Sparkles, Clock, FileText, X } from 'lucide-react';

interface MagazinePageProps {
  onNavigate: (page: ActivePage) => void;
}

const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: 1,
    issue_number: 'ISSUE 01 · VOL. I',
    title: 'THE INFRASTRUCTURE OF IMAGINATION',
    subtitle: 'Why East Africa’s creative vanguard is building its own galleries, studios, and tables.',
    release_date: 'Autumn / Winter 2026',
    cover_image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    theme_tag: 'Inaugural Print & Digital Edition',
    featured_stories: [
      {
        title: 'From Red Soil to Global Canvas: Inside Kilimani’s New Studio Movement',
        author: 'Wanjiku Mwangi & Editorial Desk',
        category: 'NexArt Dispatch',
        excerpt:
          'An intimate portrait of four Nairobi visual artists reclaiming indigenous pigments, volcanic ash, and sisal fibers to challenge contemporary gallery norms.',
        read_time: '7 min read',
      },
      {
        title: 'The New Cinema of the Swahili Coast',
        author: 'NexStudios Editorial',
        category: 'Cinema & Motion',
        excerpt:
          'How a new generation of cinematographers and colorists are treating commercial brand reels with the rigor of archival documentary.',
        read_time: '5 min read',
      },
      {
        title: 'Fermentation, Memory & Fire: The Architecture of the African Table',
        author: 'NexAfriCuisine Curators',
        category: 'Gastronomy',
        excerpt:
          'Tracing the spice corridors from Lamu to Northern Nigeria — why culinary storytelling is our most immediate cultural preservation tool.',
        read_time: '6 min read',
      },
    ],
  },
  {
    id: 2,
    issue_number: 'ISSUE 02 · PREVIEW',
    title: 'MONOCHROME & MOTION',
    subtitle: 'Archiving the nocturnal rhythm, soundscapes, and architectural futures of Nairobi.',
    release_date: 'Coming Early 2027',
    cover_image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80',
    theme_tag: 'Forthcoming Issue',
    featured_stories: [
      {
        title: 'Nairobi After Dark: Visual Essays in Black and White',
        author: 'Amina Abdi',
        category: 'Photography Essay',
        excerpt:
          'A 24-plate monochrome folio documenting the kinetic street typography, transit culture, and late-night studio sessions of the capital.',
        read_time: '8 min read',
      },
      {
        title: 'Creator Equity: Owning the Master Recording and the Frame',
        author: 'Francis Kimathi',
        category: 'Founder Essay',
        excerpt:
          'A blueprint for how multidisciplinary collectives can retain intellectual property across art, film, and live cultural programming.',
        read_time: '6 min read',
      },
    ],
  },
];

export const MagazinePage: React.FC<MagazinePageProps> = ({ onNavigate }) => {
  const [pitchModalOpen, setPitchModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<{
    title: string;
    author: string;
    category: string;
    excerpt: string;
    read_time: string;
    issue_number: string;
  } | null>(null);

  const categoryAccent = (cat: string) => {
    if (cat.includes('Art')) return '#B8912A';
    if (cat.includes('Cinema') || cat.includes('Photo')) return '#A6192E';
    if (cat.includes('Gastronomy')) return '#2F6B3A';
    return '#FFFFFF';
  };

  return (
    <main style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
      {/* 1. EDITORIAL HEADER & HERO */}
      <section
        style={{
          backgroundColor: '#000000',
          borderBottom: '1px solid rgba(255, 255, 255, 0.14)',
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
              color: '#BFBFBF',
              fontSize: '0.84rem',
              fontWeight: 600,
              marginBottom: '1.75rem',
            }}
          >
            <ArrowLeft size={15} />
            <span>Part of Nexafrica Group</span>
          </button>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem' }}>
            <div style={{ maxWidth: '820px' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <NexLogo variant="magazine" size="lg" />
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span className="badge" style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 700 }}>
                  Print & Digital Journal
                </span>
                <span className="badge">Document · Preserve · Communicate</span>
              </div>

              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  lineHeight: 1.12,
                  marginBottom: '1.25rem',
                  color: '#FFFFFF',
                }}
              >
                The Cultural Record of the Nexafrica Ecosystem.
              </h1>

              <p style={{ fontSize: '1.15rem', color: '#BFBFBF', lineHeight: 1.65, maxWidth: '760px' }}>
                NexMagazine is our flagship editorial publication — a high-contrast chronicle of studio visits, visual
                essays, culinary lineages, and critical conversations with Africa’s creative vanguard.
              </p>
            </div>

            <button
              onClick={() => setPitchModalOpen(true)}
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.65rem' }}
              id="magazine-pitch-hero-btn"
            >
              <FileText size={15} />
              <span>Pitch a Story or Essay</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. FEATURED ISSUE SPOTLIGHT */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="container">
          {MAGAZINE_ISSUES.map((issue, idx) => (
            <div
              key={issue.id}
              style={{
                marginBottom: idx < MAGAZINE_ISSUES.length - 1 ? '5rem' : 0,
                paddingBottom: idx < MAGAZINE_ISSUES.length - 1 ? '5rem' : 0,
                borderBottom: idx < MAGAZINE_ISSUES.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '3rem',
                  alignItems: 'center',
                  marginBottom: '3rem',
                }}
              >
                {/* Cover Frame */}
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    backgroundColor: '#0B0B0B',
                    aspectRatio: '4 / 5',
                    maxHeight: '520px',
                  }}
                >
                  <img
                    src={resolveImageUrl(issue.cover_image, issue.title)}
                    alt={issue.title}
                    onError={(e) => handleImageError(e)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(25%) contrast(1.08)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.6) 100%)',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="label-smallcaps" style={{ color: '#FFFFFF', letterSpacing: '0.2em' }}>
                        NEXMAGAZINE
                      </span>
                      <span className="badge" style={{ backgroundColor: 'rgba(0,0,0,0.75)', color: '#FFFFFF' }}>
                        {issue.issue_number}
                      </span>
                    </div>

                    <div>
                      <div className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.5rem' }}>
                        {issue.release_date}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '1.85rem',
                          color: '#FFFFFF',
                          lineHeight: 1.15,
                        }}
                      >
                        {issue.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Issue Details & Dispatches */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                    <span className="badge" style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                      {issue.issue_number}
                    </span>
                    <span className="label-smallcaps" style={{ color: '#BFBFBF' }}>
                      {issue.theme_tag}
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)', marginBottom: '1rem', color: '#FFFFFF' }}>
                    {issue.title}
                  </h2>
                  <p style={{ fontSize: '1.1rem', color: '#BFBFBF', marginBottom: '2.25rem', lineHeight: 1.65 }}>
                    {issue.subtitle}
                  </p>

                  <div className="label-smallcaps" style={{ color: '#FFFFFF', marginBottom: '1.25rem', display: 'flex' }}>
                    <BookOpen size={14} />
                    <span>Featured Dispatches in This Issue</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {issue.featured_stories.map((story, sIdx) => {
                      const accent = categoryAccent(story.category);
                      return (
                        <div
                          key={sIdx}
                          className="card card-hover"
                          onClick={() => setSelectedStory({ ...story, issue_number: issue.issue_number })}
                          style={{
                            padding: '1.5rem',
                            borderLeft: `3px solid ${accent}`,
                            cursor: 'pointer',
                            backgroundColor: '#0B0B0B',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <span className="label-smallcaps" style={{ color: accent, fontSize: '0.68rem' }}>
                              {story.category}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#808080', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <Clock size={12} /> {story.read_time}
                            </span>
                          </div>
                          <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.45rem' }}>{story.title}</h4>
                          <p style={{ fontSize: '0.9rem', color: '#BFBFBF', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                            {story.excerpt}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                            <span style={{ color: '#808080' }}>By {story.author}</span>
                            <span style={{ color: '#FFFFFF', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                              Read Dispatch <ArrowUpRight size={14} />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EDITORIAL SUBMISSIONS CALLOUT */}
      <section className="section-padding-sm" style={{ backgroundColor: '#080808' }}>
        <div className="container" style={{ maxWidth: '840px', textAlign: 'center' }}>
          <span className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.75rem' }}>
            <Sparkles size={13} />
            <span>Open Editorial Desk</span>
          </span>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#FFFFFF' }}>
            Contribute to NexMagazine
          </h2>
          <p style={{ color: '#BFBFBF', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2rem' }}>
            We commission cultural critics, photojournalists, visual artists, and culinary historians across Africa and
            the diaspora. Submit your essay pitch or photographic folio to our editorial board.
          </p>
          <button
            onClick={() => setPitchModalOpen(true)}
            className="btn btn-primary"
            style={{ padding: '0.9rem 2rem' }}
            id="magazine-pitch-bottom-btn"
          >
            <span>Submit Your Pitch to NexMagazine</span>
          </button>
        </div>
      </section>

      {/* Pitch a Story Modal */}
      <MagazinePitchModal isOpen={pitchModalOpen} onClose={() => setPitchModalOpen(false)} />

      {/* Story Reader Modal */}
      {selectedStory && (
        <div className="modal-overlay" onClick={() => setSelectedStory(null)}>
          <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedStory(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#BFBFBF' }}
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.5rem' }}>
              {selectedStory.issue_number} · {selectedStory.category}
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#FFFFFF' }}>{selectedStory.title}</h2>
            <div style={{ fontSize: '0.88rem', color: '#808080', marginBottom: '1.75rem' }}>
              By <strong style={{ color: '#FFFFFF' }}>{selectedStory.author}</strong> · {selectedStory.read_time}
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.12)',
                paddingTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.15rem',
                color: '#BFBFBF',
                lineHeight: 1.75,
                fontSize: '1rem',
              }}
            >
              <p style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 500 }}>{selectedStory.excerpt}</p>
              <p>
                Across Nairobi’s studios, galleries, and communal kitchens, a quiet shift has taken place. The question is
                no longer whether African creative work can command global attention — it is who owns the room, the lens,
                the archive, and the distribution channel when it does.
              </p>
              <p>
                Through NexMagazine, Nexafrica Group documents the artists, directors, and culinary custodians building
                permanent creative infrastructure on the continent — preserving both process and philosophy for future
                generations.
              </p>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedStory(null)}>
                Close Preview
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedStory(null);
                  onNavigate('contact');
                }}
              >
                Request Full Print / Digital Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
