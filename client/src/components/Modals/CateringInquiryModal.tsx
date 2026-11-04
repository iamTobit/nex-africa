import React, { useState } from 'react';
import { api } from '../../services/api';
import { X, CheckCircle, UtensilsCrossed, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringInquiryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    event_type: 'Private Dinner / Tasting Session',
    guest_count: 25,
    event_date: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.submitCateringInquiry({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.event_type,
        guest_count: Number(formData.guest_count),
        event_date: formData.event_date,
        message: formData.message,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Catering inquiry failed. Please try again.');
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
            <CheckCircle size={52} color="#2F6B3A" style={{ margin: '0 auto 1.25rem' }} />
            <h3 style={{ marginBottom: '0.75rem', fontFamily: "'Playfair Display', serif" }}>
              Catering Inquiry Received
            </h3>
            <p style={{ color: '#5A5751', marginBottom: '2rem' }}>
              Thank you! Our executive culinary curator will contact you with sample multi-course heritage tasting menus
              and beverage pairing proposals.
            </p>
            <button className="btn btn-green" onClick={onClose} style={{ width: '100%' }}>
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="label-smallcaps" style={{ color: '#2F6B3A', marginBottom: '0.4rem', display: 'flex' }}>
                <UtensilsCrossed size={13} />
                <span>NexAfriCuisine Bespoke Dining</span>
              </span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif" }}>Catering & Private Dining</h3>
              <p style={{ fontSize: '0.92rem', color: '#5A5751', marginTop: '0.35rem' }}>
                Bring our celebrated African culinary heritage to your corporate gala, private supper club, or intimate gathering.
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
                  placeholder="e.g. David Mwangi"
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
                    placeholder="david@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Event Format *</label>
                  <select
                    className="form-select"
                    value={formData.event_type}
                    onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                  >
                    <option value="Private Dinner / Tasting Session">Private Dinner / Tasting Session</option>
                    <option value="Corporate Gala / Executive Banquet">Corporate Gala / Executive Banquet</option>
                    <option value="Cultural Showcase / Cocktail Gathering">Cultural Cocktail Reception</option>
                    <option value="Wedding / Milestone Celebration">Wedding / Milestone Celebration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Estimated Guest Count</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    className="form-input"
                    value={formData.guest_count}
                    onChange={(e) => setFormData({ ...formData, guest_count: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Target Event Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dietary Preferences & Venue Details *</label>
                <textarea
                  required
                  className="form-textarea"
                  placeholder="Share details on venue location, dietary guidelines (e.g. halal, vegetarian, gluten-free), and desired dining experience..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-green"
                style={{ width: '100%', marginTop: '0.75rem' }}
                id="submit-catering-btn"
              >
                {submitting ? 'Submitting Request...' : 'Send Catering Inquiry'}
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
