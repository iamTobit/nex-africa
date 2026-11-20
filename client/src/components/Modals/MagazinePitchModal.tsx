import React, { useState } from 'react';
import { api } from '../../services/api';
import { X, CheckCircle, BookOpen, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MagazinePitchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    category: 'Visual Art Monograph & Criticism',
    headline: '',
    sample_url: '',
    pitch_summary: '',
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
      await api.submitContact({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        target_niche: 'nexafrica-group',
        subject: `[NexMagazine Pitch - ${formData.category}] ${formData.headline}`,
        message: `Category: ${formData.category}\nProposed Headline: ${formData.headline}\nWriting/Photo Sample URL: ${formData.sample_url || 'N/A'}\n\nPitch Summary:\n${formData.pitch_summary}`,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Could not submit your story pitch. Please check your inputs and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleResetAndClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleResetAndClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#BFBFBF' }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle size={52} color="#B8912A" style={{ margin: '0 auto 1.25rem' }} />
            <h3 style={{ marginBottom: '0.75rem', fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}>
              Pitch Received by the Editorial Board
            </h3>
            <p style={{ color: '#BFBFBF', marginBottom: '2rem' }}>
              Thank you for pitching to <strong>NexMagazine</strong>. Our editors review essay proposals, artist monographs,
              and visual folios weekly and will reach out to you via email.
            </p>
            <button className="btn btn-primary" onClick={handleResetAndClose} style={{ width: '100%' }}>
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.4rem', display: 'flex' }}>
                <BookOpen size={13} />
                <span>NexMagazine Editorial Desk</span>
              </span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}>
                Pitch a Story or Visual Essay
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#BFBFBF', marginTop: '0.35rem' }}>
                Submit your story angle, cultural critique, or photo essay directly to the NexMagazine editorial team.
              </p>
            </div>

            {error && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(166,25,46,0.18)',
                  color: '#E04B60',
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
                <label className="form-label">Writer / Creator Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Zuri Ochieng"
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
                    placeholder="zuri@domain.com"
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
                  <label className="form-label">Editorial Column *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Visual Art Monograph & Criticism">Visual Art Monograph & Criticism</option>
                    <option value="Cinema, Motion & Sound">Cinema, Motion & Sound</option>
                    <option value="Gastronomy & Culinary Heritage">Gastronomy & Culinary Heritage</option>
                    <option value="Black & White Photography Folio">Black & White Photography Folio</option>
                    <option value="Cultural Infrastructure Essay">Cultural Infrastructure Essay</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Writing Sample / Portfolio URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://yourportfolio.com"
                    value={formData.sample_url}
                    onChange={(e) => setFormData({ ...formData, sample_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Proposed Story Headline *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Inside Nairobi's New Wave of Sculptural Architecture"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pitch Synopsis & Key Angle *</label>
                <textarea
                  required
                  className="form-textarea"
                  placeholder="Outline the core thesis of your story, the artists or subjects featured, estimated word count or photo plates, and why it belongs in NexMagazine..."
                  value={formData.pitch_summary}
                  onChange={(e) => setFormData({ ...formData, pitch_summary: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.75rem' }}
                id="submit-magazine-pitch-btn"
              >
                {submitting ? 'Submitting Pitch...' : 'Submit Pitch to NexMagazine'}
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
