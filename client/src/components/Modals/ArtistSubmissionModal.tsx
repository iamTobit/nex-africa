import React, { useState } from 'react';
import { api } from '../../services/api';
import { X, CheckCircle, Sparkles, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ArtistSubmissionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    artist_name: '',
    email: '',
    phone: '',
    portfolio_url: '',
    bio: '',
    primary_medium: 'Painting',
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
      await api.submitArtistWork(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please check your inputs.');
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
            <CheckCircle size={52} color="#B8912A" style={{ margin: '0 auto 1.25rem' }} />
            <h3 style={{ marginBottom: '0.75rem', fontFamily: "'Playfair Display', serif" }}>
              Submission Received
            </h3>
            <p style={{ color: '#5A5751', marginBottom: '2rem' }}>
              Thank you for sharing your artistic vision with NexArt Africa. Our curatorial review board meets bi-weekly
              to review studio portfolios and exhibition submissions.
            </p>
            <button className="btn btn-gold" onClick={onClose} style={{ width: '100%' }}>
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.4rem', display: 'flex' }}>
                <Sparkles size={13} />
                <span>NexArt Africa Curatorial Review</span>
              </span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif" }}>Submit Your Work</h3>
              <p style={{ fontSize: '0.92rem', color: '#5A5751', marginTop: '0.35rem' }}>
                We discover and document Nairobi's emerging visual artists — connecting your creations to collectors and
                curators worldwide.
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
                <label className="form-label">Artist Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Wanjiku Mwangi"
                  value={formData.artist_name}
                  onChange={(e) => setFormData({ ...formData, artist_name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="artist@domain.com"
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
                  <label className="form-label">Primary Medium *</label>
                  <select
                    className="form-select"
                    value={formData.primary_medium}
                    onChange={(e) => setFormData({ ...formData, primary_medium: e.target.value })}
                  >
                    <option value="Painting">Painting (Oil / Acrylic)</option>
                    <option value="Sculpture">Sculpture & Fiber Art</option>
                    <option value="Photography">Fine Art Photography</option>
                    <option value="Mixed Media">Mixed Media & Collage</option>
                    <option value="Digital Art">Digital Art & New Media</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Portfolio / Instagram URL *</label>
                  <input
                    type="url"
                    required
                    className="form-input"
                    placeholder="https://instagram.com/yourhandle"
                    value={formData.portfolio_url}
                    onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Artist Statement & Bio *</label>
                <textarea
                  required
                  className="form-textarea"
                  placeholder="Tell us about the thematic focus, cultural lineage, and recent bodies of work you are exploring..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-gold"
                style={{ width: '100%', marginTop: '0.75rem' }}
                id="submit-artwork-btn"
              >
                {submitting ? 'Submitting Portfolio...' : 'Submit to Curators'}
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
