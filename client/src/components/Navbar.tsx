import React, { useState, useRef, useEffect } from 'react';
import { NexLogo } from './NexLogo';
import { ActivePage } from '../types';
import { ChevronDown, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const niches = [
    {
      slug: 'nexart-africa' as ActivePage,
      name: 'NexArt Africa',
      desc: 'Emerging visual artists, exhibitions & curation',
      color: '#B8912A',
      symbolism: 'Wealth & heritage',
    },
    {
      slug: 'nexstudios-africa' as ActivePage,
      name: 'NexStudios Africa',
      desc: 'Cinematic brand content, reels & portraiture',
      color: '#A6192E',
      symbolism: 'Energy, passion & motion',
    },
    {
      slug: 'nexafricuisine' as ActivePage,
      name: 'NexAfriCuisine',
      desc: 'Culinary heritage, catering & cultural stories',
      color: '#2F6B3A',
      symbolism: 'The land & nourishment',
    },
    {
      slug: 'nexevents-africa' as ActivePage,
      name: 'NexEvents Africa',
      desc: 'Nairobi cultural calendar & ecosystem galas',
      color: '#111111',
      symbolism: 'Live gatherings (Upcoming)',
    },
  ];

  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isNicheActive = ['nexart-africa', 'nexstudios-africa', 'nexafricuisine', 'nexevents-africa'].includes(
    currentPage
  );

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(245, 243, 239, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        transition: 'background-color 200ms ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        {/* Main Brand Wordmark (Site-wide black group version) */}
        <div onClick={() => handleNav('home')} style={{ cursor: 'pointer' }} id="nav-brand-logo">
          <NexLogo variant="group" size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <button
            onClick={() => handleNav('home')}
            style={{
              fontWeight: currentPage === 'home' ? 700 : 500,
              color: currentPage === 'home' ? '#111111' : '#5A5751',
              fontSize: '0.92rem',
              letterSpacing: '0.02em',
              padding: '0.5rem 0',
              borderBottom: currentPage === 'home' ? '2px solid #111111' : '2px solid transparent',
            }}
          >
            Home
          </button>

          {/* "Our Niches" Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: isNicheActive ? 700 : 500,
                color: isNicheActive ? '#111111' : '#5A5751',
                fontSize: '0.92rem',
                letterSpacing: '0.02em',
                padding: '0.5rem 0',
                borderBottom: isNicheActive ? '2px solid #111111' : '2px solid transparent',
              }}
              id="our-niches-dropdown-btn"
            >
              <span>Our Niches</span>
              <ChevronDown
                size={16}
                style={{
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms ease',
                }}
              />
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  left: '-40px',
                  width: '320px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  boxShadow: '0 16px 40px rgba(17, 17, 17, 0.12)',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  animation: 'fadeIn 180ms ease',
                }}
              >
                <div style={{ padding: '0.4rem 0.6rem 0.2rem', borderBottom: '1px solid rgba(17,17,17,0.06)' }}>
                  <span className="label-smallcaps" style={{ color: '#8A867E' }}>The Creative Ecosystem</span>
                </div>
                {niches.map((niche) => (
                  <div
                    key={niche.slug}
                    onClick={() => handleNav(niche.slug)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      transition: 'background-color 150ms ease',
                      backgroundColor: currentPage === niche.slug ? 'rgba(17,17,17,0.04)' : 'transparent',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(17,17,17,0.04)')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        currentPage === niche.slug ? 'rgba(17,17,17,0.04)' : 'transparent')
                    }
                  >
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: niche.color,
                        marginTop: '0.35rem',
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#111111' }}>{niche.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#5A5751', marginTop: '2px', lineHeight: 1.3 }}>
                        {niche.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('about')}
            style={{
              fontWeight: currentPage === 'about' ? 700 : 500,
              color: currentPage === 'about' ? '#111111' : '#5A5751',
              fontSize: '0.92rem',
              letterSpacing: '0.02em',
              padding: '0.5rem 0',
              borderBottom: currentPage === 'about' ? '2px solid #111111' : '2px solid transparent',
            }}
          >
            About & Vision
          </button>

          <button
            onClick={() => handleNav('nexevents-africa')}
            style={{
              fontWeight: currentPage === 'nexevents-africa' ? 700 : 500,
              color: currentPage === 'nexevents-africa' ? '#111111' : '#5A5751',
              fontSize: '0.92rem',
              letterSpacing: '0.02em',
              padding: '0.5rem 0',
              borderBottom: currentPage === 'nexevents-africa' ? '2px solid #111111' : '2px solid transparent',
            }}
          >
            Events & Calendar
          </button>

          <button
            onClick={() => handleNav('partner-invest')}
            style={{
              fontWeight: currentPage === 'partner-invest' ? 700 : 500,
              color: currentPage === 'partner-invest' ? '#111111' : '#5A5751',
              fontSize: '0.92rem',
              letterSpacing: '0.02em',
              padding: '0.5rem 0',
              borderBottom: currentPage === 'partner-invest' ? '2px solid #111111' : '2px solid transparent',
            }}
          >
            Partner / Invest
          </button>

          <button
            onClick={() => handleNav('contact')}
            style={{
              fontWeight: currentPage === 'contact' ? 700 : 500,
              color: currentPage === 'contact' ? '#111111' : '#5A5751',
              fontSize: '0.92rem',
              letterSpacing: '0.02em',
              padding: '0.5rem 0',
              borderBottom: currentPage === 'contact' ? '2px solid #111111' : '2px solid transparent',
            }}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => handleNav('partner-invest')}
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.86rem',
              letterSpacing: '0.04em',
              display: 'inline-flex',
            }}
            id="nav-partner-cta"
          >
            <span>Partner / Invest</span>
            <ArrowUpRight size={15} />
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ padding: '0.5rem', color: '#111111', display: 'none' }}
            className="mobile-menu-btn"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid rgba(17,17,17,0.1)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <button
            onClick={() => handleNav('home')}
            style={{ textAlign: 'left', fontWeight: 600, fontSize: '1.05rem', color: '#111111' }}
          >
            Home
          </button>

          <div style={{ borderTop: '1px solid rgba(17,17,17,0.08)', paddingTop: '0.85rem' }}>
            <span className="label-smallcaps" style={{ color: '#8A867E', marginBottom: '0.6rem', display: 'block' }}>
              Our Niches
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingLeft: '0.5rem' }}>
              {niches.map((n) => (
                <div
                  key={n.slug}
                  onClick={() => handleNav(n.slug)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: n.color }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{n.name}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleNav('about')}
            style={{ textAlign: 'left', fontWeight: 600, fontSize: '1.05rem', color: '#111111', borderTop: '1px solid rgba(17,17,17,0.08)', paddingTop: '0.85rem' }}
          >
            About & Vision
          </button>
          <button
            onClick={() => handleNav('nexevents-africa')}
            style={{ textAlign: 'left', fontWeight: 600, fontSize: '1.05rem', color: '#111111' }}
          >
            Events & Calendar
          </button>
          <button
            onClick={() => handleNav('partner-invest')}
            style={{ textAlign: 'left', fontWeight: 600, fontSize: '1.05rem', color: '#111111' }}
          >
            Partner / Invest
          </button>
          <button
            onClick={() => handleNav('contact')}
            style={{ textAlign: 'left', fontWeight: 600, fontSize: '1.05rem', color: '#111111' }}
          >
            Contact
          </button>
        </div>
      )}

      {/* Inline styles for responsive media queries */}
      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
};
