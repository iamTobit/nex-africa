import React, { useState } from 'react';
import { api } from '../../services/api';
import { ServicePackage } from '../../types';
import { X, CheckCircle, Video, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: ServicePackage | null;
}

export const StudioBookingModal: React.FC<Props> = ({ isOpen, onClose, selectedPackage }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    service_type: selectedPackage?.name || 'Brand Commercial & Reel Campaign',
    preferred_date: '',
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
      await api.bookStudioSession({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        service_type: formData.service_type,
        preferred_date: formData.preferred_date,
        package_id: selectedPackage?.id,
        message: `${formData.organization ? `Company: ${formData.organization} | ` : ''}${formData.message}`,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Booking request could not be sent. Please try again.');
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
            <CheckCircle size={52} color="#A6192E" style={{ margin: '0 auto 1.25rem' }} />
            <h3 style={{ marginBottom: '0.75rem', fontFamily: "'Playfair Display', serif" }}>
              Production Request Received
            </h3>
            <p style={{ color: '#5A5751', marginBottom: '2rem' }}>
              Thank you! Our creative producer will review your project brief and connect with you within 24 hours with a
              tailored call sheet and shoot timeline.
            </p>
            <button className="btn btn-red" onClick={onClose} style={{ width: '100%' }}>
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="label-smallcaps" style={{ color: '#A6192E', marginBottom: '0.4rem', display: 'flex' }}>
                <Video size={13} />
                <span>NexStudios Africa Production Desk</span>
              </span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif" }}>Book a Production</h3>
              <p style={{ fontSize: '0.92rem', color: '#5A5751', marginTop: '0.35rem' }}>
                Tell us about your visual storytelling needs — brand campaigns, documentary films, or portraiture sessions.
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
                <label className="form-label">Contact Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Sarah Omondi"
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
                    placeholder="sarah@company.com"
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
                  <label className="form-label">Service Package *</label>
                  <select
                    className="form-select"
                    value={formData.service_type}
                    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                  >
                    <option value="Executive & Creative Portraiture">Executive Portraiture (KES 35,000)</option>
                    <option value="Brand Commercial & Reel Campaign">Brand Commercial Campaign (KES 120,000)</option>
                    <option value="Cultural & Corporate Event Documentation">Event Documentation (KES 85,000)</option>
                    <option value="Custom Documentary Series">Custom Documentary Production</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Shoot Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Company / Brand Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Nairobi Creative Studio / Brand Ltd"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Scope & Brief *</label>
                <textarea
                  required
                  className="form-textarea"
                  placeholder="Describe your visual concept, target audience, preferred locations, and expected deliverables..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-red"
                style={{ width: '100%', marginTop: '0.75rem' }}
                id="submit-studio-booking-btn"
              >
                {submitting ? 'Sending Request...' : 'Send Production Request'}
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
