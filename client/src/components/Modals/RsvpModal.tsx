import React, { useState } from 'react';
import { api } from '../../services/api';
import { EventItem } from '../../types';
import { X, CheckCircle, Calendar, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
}

export const RsvpModal: React.FC<Props> = ({ isOpen, onClose, event }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    tickets_count: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.rsvpEvent(event.id, {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        tickets_count: Number(formData.tickets_count),
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'RSVP registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#5A5751' }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle size={52} color="#111111" style={{ margin: '0 auto 1.25rem' }} />
            <h3 style={{ marginBottom: '0.75rem', fontFamily: "'Playfair Display', serif" }}>
              RSVP Confirmed
            </h3>
            <p style={{ color: '#5A5751', marginBottom: '1.5rem' }}>
              You are confirmed for <strong>{event.title}</strong>. A confirmation pass with event check-in instructions has
              been dispatched to your email.
            </p>
            <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
              Done
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="label-smallcaps" style={{ color: '#111111', marginBottom: '0.4rem', display: 'flex' }}>
                <Calendar size={13} />
                <span>Nairobi Cultural Calendar</span>
              </span>
              <h3 style={{ fontSize: '1.7rem', fontFamily: "'Playfair Display', serif" }}>{event.title}</h3>
              <p style={{ fontSize: '0.88rem', color: '#5A5751', marginTop: '0.35rem' }}>
                {event.location} · {new Date(event.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {error && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(166,25,46,0.08)',
                  color: '#A6192E',
                  borderRadius: '4px',
                  marginBottom: '1.25rem',
                  fontSize: '0.88rem',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Faith Kemunto"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="faith@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Number of Passes</label>
                <select
                  className="form-select"
                  value={formData.tickets_count}
                  onChange={(e) => setFormData({ ...formData, tickets_count: Number(e.target.value) })}
                >
                  <option value={1}>1 Guest (Standard RSVP)</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.75rem' }}
                id="submit-rsvp-btn"
              >
                {submitting ? 'Confirming...' : 'Reserve Access'}
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
