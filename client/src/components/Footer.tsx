import React, { useState } from 'react';
import { NexLogo } from './NexLogo';
import { ActivePage } from '../types';
import { api } from '../services/api';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribedMessage, setSubscribedMessage] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribing(true);
    try {
      await api.subscribeNewsletter(email.trim());
      setSubscribedMessage('Welcome to the Nexafrica Collective.');
      setEmail('');
    } catch {
      setSubscribedMessage('Thank you for subscribing to updates.');
      setEmail('');
    } finally {
      setSubscribing(false);
    }
  };

  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#111111', color: '#F5F3EF', paddingTop: '5rem', paddingBottom: '3.5rem' }}>
      <div className="container">
        {/* Six Verbs Architectural Banner */}
        <div
          style={{
            borderBottom: '1px solid rgba(245, 243, 239, 0.12)',
            paddingBottom: '2.5rem',
            marginBottom: '4rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem 2rem', alignItems: 'center' }}>
            <span className="label-smallcaps" style={{ color: '#B8912A', letterSpacing: '0.22em' }}>
              The Nexafrica Standard
            </span>
            <span style={{ color: 'rgba(245,243,239,0.3)' }}>|</span>
            {['Create', 'Document', 'Preserve', 'Connect', 'Communicate', 'Build'].map((verb, idx) => (
              <span
                key={verb}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.05rem',
                  letterSpacing: '0.04em',
                  color: idx % 2 === 0 ? '#F5F3EF' : 'rgba(245, 243, 239, 0.7)',
                }}
              >
                {verb} {idx < 5 && <span style={{ opacity: 0.35, marginLeft: '0.6rem' }}>·</span>}
              </span>
            ))}
          </div>

          <button
            onClick={() => handleNav('partner-invest')}
            style={{
              color: '#B8912A',
              fontSize: '0.86rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>Partner / Invest Portal</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4 Columns Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4.5rem',
          }}
        >
          {/* Col 1: Brand & Founder Statement */}
          <div>
            <div onClick={() => handleNav('home')} style={{ marginBottom: '1.5rem', cursor: 'pointer' }}>
              <NexLogo variant="group" colorOverride="#F5F3EF" size="md" />
            </div>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(245, 243, 239, 0.72)',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
                fontStyle: 'italic',
              }}
            >
              "Nexafrica Group exists because Africa's creativity deserves more than admiration — it deserves
              infrastructure."
            </p>
            <div style={{ fontSize: '0.8rem', color: '#B8912A', fontWeight: 600, letterSpacing: '0.08em' }}>
              FRANCIS KIMATHI — FOUNDER
            </div>
          </div>

          {/* Col 2: The Niches */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#F5F3EF',
                marginBottom: '1.5rem',
              }}
            >
              Creative Niches
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li>
                <button
                  onClick={() => handleNav('nexart-africa')}
                  style={{
                    color: 'rgba(245,243,239,0.8)',
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B8912A' }} />
                  <span>NexArt Africa (Gold)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('nexstudios-africa')}
                  style={{
                    color: 'rgba(245,243,239,0.8)',
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#A6192E' }} />
                  <span>NexStudios Africa (Red)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('nexafricuisine')}
                  style={{
                    color: 'rgba(245,243,239,0.8)',
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2F6B3A' }} />
                  <span>NexAfriCuisine (Green)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('nexevents-africa')}
                  style={{
                    color: 'rgba(245,243,239,0.6)',
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#777' }} />
                  <span>NexEvents Africa (Upcoming)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#F5F3EF',
                marginBottom: '1.5rem',
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  style={{ color: 'rgba(245,243,239,0.8)', fontSize: '0.92rem' }}
                >
                  About & Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('nexevents-africa')}
                  style={{ color: 'rgba(245,243,239,0.8)', fontSize: '0.92rem' }}
                >
                  Nairobi Cultural Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('partner-invest')}
                  style={{ color: 'rgba(245,243,239,0.8)', fontSize: '0.92rem' }}
                >
                  Partner / Invest Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  style={{ color: 'rgba(245,243,239,0.8)', fontSize: '0.92rem' }}
                >
                  Contact & Direct Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Social */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#F5F3EF',
                marginBottom: '1.25rem',
              }}
            >
              The Dispatches
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'rgba(245,243,239,0.7)', marginBottom: '1.2rem', lineHeight: 1.5 }}>
              Receive invitations to private gallery previews, film screenings, and secret supper clubs.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRight: 'none',
                    borderRadius: '4px 0 0 4px',
                    padding: '0.75rem 1rem',
                    color: '#F5F3EF',
                    fontSize: '0.88rem',
                    outline: 'none',
                    flex: 1,
                  }}
                  required
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  style={{
                    backgroundColor: '#B8912A',
                    color: '#FFFFFF',
                    padding: '0 1.25rem',
                    borderRadius: '0 4px 4px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  id="footer-subscribe-btn"
                >
                  <Send size={15} />
                </button>
              </div>

              {subscribedMessage && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B8912A', fontSize: '0.82rem' }}>
                  <CheckCircle2 size={14} />
                  <span>{subscribedMessage}</span>
                </div>
              )}
            </form>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span className="label-smallcaps" style={{ color: 'rgba(245,243,239,0.5)', fontSize: '0.68rem' }}>
                Social Channels:
              </span>
              <a
                href="https://instagram.com/nexafricagroup"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#F5F3EF', opacity: 0.8 }}
                title="@nexafricagroup"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(245, 243, 239, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'rgba(245, 243, 239, 0.5)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Nexafrica Group. Nairobi, Kenya. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>One idea, many expressions.</span>
            <span>Kilimani · Nairobi HQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
