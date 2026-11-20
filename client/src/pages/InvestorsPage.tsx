import React, { useState } from 'react';
import { ActivePage } from '../types';
import { api } from '../services/api';
import { ArrowLeft, CheckCircle2, Building2, Lock, Send, TrendingUp } from 'lucide-react';

interface InvestorsPageProps {
  onNavigate: (page: ActivePage) => void;
}

/**
 * Private Investor Relations Portal (Unlisted from public navigation and HomePage).
 * Accessible only via direct #investors link shared privately.
 */
export const InvestorsPage: React.FC<InvestorsPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    area_of_interest: 'future_investor',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.submitPartnerInvest({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        area_of_interest: 'future_investor',
        message: formData.message,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please check your inputs and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
      <section
        style={{
          backgroundColor: '#000000',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          paddingTop: '3.5rem',
          paddingBottom: '4.5rem',
        }}
      >
        <div className="container" style={{ maxWidth: '900px' }}>
          <button
            onClick={() => onNavigate('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#BFBFBF',
              fontSize: '0.84rem',
              fontWeight: 600,
              marginBottom: '1.75rem',
            }}
          >
            <ArrowLeft size={15} />
            <span>Return to Main Site</span>
          </button>

          <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1rem' }}>
            <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
              <Lock size={12} /> Private Portal · Unlisted
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.5rem)', marginBottom: '1.25rem', color: '#FFFFFF' }}>
            Investor & Capital Relations
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#BFBFBF', lineHeight: 1.65 }}>
            Nexafrica Group provides a multi-vertical holding model cross-pollinating commercial production and culinary
            catering with contemporary fine art and cultural IP.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container" style={{ maxWidth: '840px' }}>
          <div className="card" style={{ padding: '2.5rem', borderTop: '4px solid #FFFFFF', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Building2 size={24} color="#FFFFFF" />
              <span className="label-smallcaps" style={{ color: '#FFFFFF' }}>
                Strategic Capital Thesis
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.75rem', color: '#FFFFFF' }}>
              Investor & Ecosystem Facility
            </h3>
            <p style={{ color: '#BFBFBF', marginBottom: '1.5rem' }}>
              Direct inquiries submitted here are routed privately to the Founder’s office.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: '#BFBFBF' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#FFFFFF" /> Multi-niche recurring commercial revenue streams
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#FFFFFF" /> First-look rights to emerging artist catalogs & cultural IP
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#FFFFFF" /> Pan-African creative hub expansion roadmap
              </li>
            </ul>
          </div>

          <div className="card" style={{ padding: '2.5rem' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={52} color="#FFFFFF" style={{ margin: '0 auto 1.25rem' }} />
                <h3 style={{ marginBottom: '0.75rem' }}>Confidential Inquiry Transmitted</h3>
                <p style={{ color: '#BFBFBF', marginBottom: '2rem' }}>
                  Your inquiry has been routed directly to the Founder’s desk.
                </p>
                <button className="btn btn-primary" onClick={() => setSuccess(false)}>
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.75rem' }}>
                  <span className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.4rem', display: 'flex' }}>
                    <TrendingUp size={13} />
                    <span>Confidential Dispatch</span>
                  </span>
                  <h3>Request Investor Memorandum</h3>
                </div>

                {error && (
                  <div style={{ padding: '0.85rem 1rem', backgroundColor: 'rgba(166,25,46,0.18)', color: '#E04B60', borderRadius: '4px', marginBottom: '1.5rem' }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Firm / Family Office / Syndicate</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message & Mandate *</label>
                  <textarea
                    required
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%' }}>
                  {submitting ? 'Transmitting...' : 'Submit Confidential Inquiry'}
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
