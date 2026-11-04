import React, { useEffect, useState } from 'react';
import { ActivePage, EventItem } from '../types';
import { api } from '../services/api';
import { NexLogo } from '../components/NexLogo';
import { InstagramFeed } from '../components/InstagramFeed';
import { RsvpModal } from '../components/Modals/RsvpModal';
import { ArrowLeft, Calendar, MapPin, Users, Ticket, CheckCircle2, ArrowRight } from 'lucide-react';

interface EventsPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<EventItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    Promise.all([api.getEvents(true), api.getEvents(false)])
      .then(([upcoming, past]) => {
        if (isMounted) {
          setUpcomingEvents(upcoming);
          setPastEvents(past);
        }
      })
      .catch((err) => console.error(err));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main style={{ backgroundColor: '#F5F3EF' }}>
      {/* 1. BRAND HEADER & HERO */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(17, 17, 17, 0.12)',
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

          <div style={{ maxWidth: '820px' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <NexLogo variant="events" size="lg" />
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <span className="badge" style={{ backgroundColor: '#111111', color: '#F5F3EF' }}>
                Cultural Calendar
              </span>
              <span className="badge">Nairobi Gatherings</span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                lineHeight: 1.2,
                marginBottom: '1.25rem',
              }}
            >
              "Bringing the creative ecosystem to life in person."
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#5A5751', lineHeight: 1.65, maxWidth: '780px' }}>
              NexEvents Africa curates Nairobi's cultural calendar — exhibitions, tastings, galas, and live performances
              that unite art collectors, film lovers, food enthusiasts, and founders in shared celebration.
            </p>
          </div>
        </div>
      </section>

      {/* 2. UPCOMING EVENTS CALENDAR */}
      <section className="section-padding">
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '3rem' }}>
            <span className="label-smallcaps" style={{ color: '#111111', marginBottom: '0.4rem', display: 'flex' }}>
              <Calendar size={13} />
              <span>Calendar Schedule</span>
            </span>
            <h2>Upcoming Gatherings</h2>
            <p style={{ marginTop: '0.5rem' }}>
              Reserve early access passes and RSVP for forthcoming gallery openings and supper clubs.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="card card-hover"
                style={{
                  padding: '2rem',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(240px, 320px) 1fr',
                  gap: '2.5rem',
                  alignItems: 'center',
                }}
              >
                {evt.image_url && (
                  <div style={{ borderRadius: '8px', overflow: 'hidden', height: '220px', backgroundColor: '#EDEAE4' }}>
                    <img src={evt.image_url} alt={evt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
                    <span className="badge">{evt.category}</span>
                    {evt.ticket_price && (
                      <span className="badge badge-gold">
                        {evt.currency} {evt.ticket_price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.65rem', marginBottom: '0.65rem' }}>{evt.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: '#5A5751', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {evt.description || evt.short_description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.86rem', color: '#8A867E', marginBottom: '1.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={15} color="#111111" />
                      {new Date(evt.event_date).toLocaleDateString(undefined, {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={15} color="#111111" />
                      {evt.location}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedEventForRsvp(evt)}
                    className="btn btn-primary"
                    style={{ padding: '0.65rem 1.4rem', fontSize: '0.86rem' }}
                  >
                    <Ticket size={15} />
                    <span>RSVP / Reserve Pass</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PAST EVENT RECAPS */}
      {pastEvents.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(17,17,17,0.08)' }}>
          <div className="container">
            <div style={{ maxWidth: '720px', marginBottom: '3rem' }}>
              <span className="label-smallcaps" style={{ color: '#8A867E', marginBottom: '0.4rem', display: 'flex' }}>
                <CheckCircle2 size={13} />
                <span>Archive & History</span>
              </span>
              <h2>Past Event Recaps</h2>
              <p style={{ marginTop: '0.5rem' }}>Highlights and attendance records from our flagship gatherings.</p>
            </div>

            <div className="grid-2" style={{ gap: '2.5rem' }}>
              {pastEvents.map((pe) => (
                <div key={pe.id} className="card" style={{ padding: '2rem' }}>
                  {pe.image_url && (
                    <div style={{ borderRadius: '8px', overflow: 'hidden', height: '240px', marginBottom: '1.5rem' }}>
                      <img src={pe.image_url} alt={pe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <span className="badge">{pe.category}</span>
                    {pe.attendees_count && (
                      <span style={{ fontSize: '0.82rem', color: '#5A5751', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Users size={14} /> {pe.attendees_count} Attendees
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.45rem', marginBottom: '0.65rem' }}>{pe.title}</h3>
                  <p style={{ fontSize: '0.92rem', color: '#5A5751', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {pe.description}
                  </p>

                  {pe.recap_notes && (
                    <div
                      style={{
                        padding: '1rem',
                        backgroundColor: '#FAF8F5',
                        borderRadius: '6px',
                        borderLeft: '3px solid #111111',
                        fontSize: '0.86rem',
                        color: '#111111',
                      }}
                    >
                      <strong>Recap Highlight:</strong> {pe.recap_notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. INSTAGRAM FEED */}
      <InstagramFeed nicheSlug="nexevents-africa" themeColor="#111111" />

      {/* RSVP Modal */}
      <RsvpModal
        isOpen={Boolean(selectedEventForRsvp)}
        onClose={() => setSelectedEventForRsvp(null)}
        event={selectedEventForRsvp}
      />
    </main>
  );
};
