import React, { useState, useEffect } from 'react';
import { ActivePage } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ArtPage } from './pages/ArtPage';
import { StudiosPage } from './pages/StudiosPage';
import { CuisinePage } from './pages/CuisinePage';
import { EventsPage } from './pages/EventsPage';
import { PartnerInvestPage } from './pages/PartnerInvestPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');

  // Handle URL hash changes for deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as ActivePage;
      const validPages: ActivePage[] = [
        'home',
        'about',
        'nexart-africa',
        'nexstudios-africa',
        'nexafricuisine',
        'nexevents-africa',
        'partner-invest',
        'contact',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: ActivePage) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content View */}
      <div style={{ flex: 1 }}>
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'nexart-africa' && <ArtPage onNavigate={handleNavigate} />}
        {currentPage === 'nexstudios-africa' && <StudiosPage onNavigate={handleNavigate} />}
        {currentPage === 'nexafricuisine' && <CuisinePage onNavigate={handleNavigate} />}
        {currentPage === 'nexevents-africa' && <EventsPage onNavigate={handleNavigate} />}
        {currentPage === 'partner-invest' && <PartnerInvestPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </div>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
