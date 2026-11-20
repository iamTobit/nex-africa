import React, { useEffect, useState } from 'react';
import { ActivePage, EcosystemVision } from '../types';
import { api } from '../services/api';
import { Sparkles, Compass, Award } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [vision, setVision] = useState<EcosystemVision | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.getEcosystem().then((data) => {
      if (isMounted) setVision(data.group_vision);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const sixVerbs = vision?.six_verbs || [
    { verb: 'Create', description: 'Ignite novel African expressions and visionary artistry without compromise.' },
    { verb: 'Document', description: 'Capture the real-time renaissance across our continent and global diaspora.' },
    { verb: 'Preserve', description: 'Safeguard cultural heritage, ancestral traditions, and historic masteries.' },
    { verb: 'Connect', description: 'Bridge creators with collectors, collaborators, and international stages.' },
    { verb: 'Communicate', description: 'Tell nuanced, authentic stories that challenge monolithic narratives.' },
    { verb: 'Build', description: 'Construct lasting commercial infrastructure and sustainable creative businesses.' },
  ];

  const values = vision?.values || [
    { title: 'Uncompromising Quality', desc: 'World-class execution rooted in African authenticity and craftsmanship.' },
    { title: 'Creator Equity', desc: 'Ensuring our artists, filmmakers, and culinary artisans own their intellectual value.' },
    { title: 'Cultural Depth', desc: 'Respecting historical lineages while fearlessly pushing modern frontiers.' },
    { title: 'Ecosystem Synergies', desc: 'Cross-pollinating food, visual art, cinema, editorial, and live gatherings into one seamless collective.' },
  ];

  return (
    <main style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
      {/* 1. Header / Founding Story Hero */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <span className="label-smallcaps" style={{ color: '#FFFFFF', marginBottom: '0.65rem', display: 'flex' }}>
            <Compass size={14} />
            <span>Our Origin & Purpose</span>
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', marginBottom: '1.75rem', lineHeight: 1.15, color: '#FFFFFF' }}>
            Africa's creativity deserves more than admiration — it deserves infrastructure.
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#BFBFBF', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Nexafrica Group was founded in Nairobi on a singular conviction: that African storytellers, visual artists,
            and culinary custodians have sustained global culture for centuries, but have rarely owned the commercial
            and physical platforms through which their work is experienced.
          </p>

          <div
            style={{
              padding: '2.5rem',
              backgroundColor: '#0B0B0B',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.14)',
              borderLeft: '4px solid #FFFFFF',
            }}
          >
            <blockquote
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.35rem',
                lineHeight: 1.5,
                color: '#FFFFFF',
                fontStyle: 'italic',
                marginBottom: '1.25rem',
              }}
            >
              "Nexafrica Group exists because Africa's creativity deserves more than admiration — it deserves
              infrastructure. We're building the platforms, the audiences, and the businesses that let African creators own
              their own story."
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '1.1rem',
                }}
              >
                FK
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.96rem', color: '#FFFFFF' }}>Francis Kimathi</div>
                <div className="label-smallcaps" style={{ color: '#808080', fontSize: '0.68rem' }}>
                  Founder, Nexafrica Group
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SIX VERBS */}
      <section className="section-padding" style={{ backgroundColor: '#000000', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
            <span className="label-smallcaps" style={{ color: '#FFFFFF', marginBottom: '0.5rem', display: 'flex' }}>
              <Sparkles size={14} />
              <span>The Six Verbs</span>
            </span>
            <h2 style={{ color: '#FFFFFF' }}>Our Operational Doctrine</h2>
            <p style={{ marginTop: '0.65rem', color: '#BFBFBF' }}>
              Everything we build across contemporary art, cinema, food, magazine editorial, and gatherings is anchored
              in six foundational verbs. They guide every exhibition, reel, tasting menu, and partnership.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '2rem' }}>
            {sixVerbs.map((v, i) => (
              <div
                key={v.verb}
                className="card card-hover"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '3px solid #FFFFFF',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.65rem',
                    }}
                  >
                    <span style={{ fontSize: '0.95rem', color: '#808080', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      0{i + 1}
                    </span>
                    <span>{v.verb}</span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#BFBFBF', lineHeight: 1.6 }}>{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE NEXAFRICA STANDARD (VALUES) */}
      <section className="section-padding" style={{ backgroundColor: '#000000' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
            <span className="label-smallcaps" style={{ color: '#FFFFFF', marginBottom: '0.5rem', display: 'flex' }}>
              <Award size={14} />
              <span>Core Values</span>
            </span>
            <h2 style={{ color: '#FFFFFF' }}>The Nexafrica Standard</h2>
            <p style={{ marginTop: '0.65rem', color: '#BFBFBF' }}>
              The principles that govern our commercial standards, curatorial integrity, and community relationships.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '2rem' }}>
            {values.map((val, idx) => (
              <div key={val.title} className="card" style={{ padding: '2rem', display: 'flex', gap: '1.25rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: idx === 0 ? '#B8912A' : idx === 1 ? '#A6192E' : idx === 2 ? '#2F6B3A' : '#FFFFFF',
                    color: idx === 3 ? '#000000' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.45rem', fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}>
                    {val.title}
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: '#BFBFBF', lineHeight: 1.55 }}>{val.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
            <button onClick={() => onNavigate('partner')} className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
              <span>Explore Partnership Opportunities</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
