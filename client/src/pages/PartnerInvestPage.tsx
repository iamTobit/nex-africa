import React, { useState } from 'react';
import { ActivePage } from '../types';
import { api } from '../services/api';
import { NexLogo } from '../components/NexLogo';
import { ArrowLeft, CheckCircle2, TrendingUp, GraduationCap, Building2, Send, Sparkles } from 'lucide-react';

interface PartnerInvestPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const PartnerInvestPage: React.FC<PartnerInvestPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    area_of_interest: 'student_partner',
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
        area_of_interest: formData.area_of_interest,
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
    <main style={{ backgroundColor: '#F5F3EF' }}>
      {/* 1. HERO EXPLAINER */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
          paddingTop: '3.5rem',
          paddingBottom: '4.5rem',
        }}
      >
        <div className="container" style={{ maxWidth: '960px' }}>
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
            <span>Back to Ecosystem Home</span>
          </button>

          <span className="label-smallcaps" style={{ color: '#111111', marginBottom: '0.65rem', display: 'flex' }}>
            <TrendingUp size={14} />
            <span>Capital & Creative Fellowships</span>
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginBottom: '1.5rem', lineHeight: 1.15 }}>
            Partner with Nexafrica Group
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#5A5751', lineHeight: 1.65, maxWidth: '820px' }}>
            We are engineering the physical, digital, and commercial platforms where African creative equity compounds.
            We invite prospective student partners and future capital investors to build this generational infrastructure
            with us.
          </p>
        </div>
      </section>

      {/* 2. TWO PILLARS: STUDENT PARTNERS & FUTURE INVESTORS */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '4rem' }}>
            {/* Pillar A: Student Partners */}
            <div className="card" style={{ padding: '2.5rem', borderTop: '4px solid #B8912A' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(184, 145, 42, 0.12)',
                  color: '#B8912A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <GraduationCap size={24} />
              </div>

              <div className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.4rem' }}>
                For Student Visionaries
              </div>
              <h3 style={{ fontSize: '1.65rem', marginBottom: '0.75rem' }}>Student Fellowships & Collaborations</h3>
              <p style={{ fontSize: '0.96rem', color: '#5A5751', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Are you an undergraduate or graduate creator in Nairobi or across the continent exploring art history,
                cinema production, gastronomic science, or cultural entrepreneurship? We offer studio fellowships,
                production gear access, and direct mentorship within our commercial niches.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: '#5A5751' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#B8912A" /> Apprenticeships with veteran directors & curators
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#B8912A" /> Studio space & production equipment access
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#B8912A" /> Portfolio exhibition in our physical pavilions
                </li>
              </ul>
            </div>

            {/* Pillar B: Future Investors */}
            <div className="card" style={{ padding: '2.5rem', borderTop: '4px solid #111111' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(17, 17, 17, 0.08)',
                  color: '#111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Building2 size={24} />
              </div>

              <div className="label-smallcaps" style={{ color: '#111111', marginBottom: '0.4rem' }}>
                For Strategic Capital
              </div>
              <h3 style={{ fontSize: '1.65rem', marginBottom: '0.75rem' }}>Investor & Ecosystem Facility</h3>
              <p style={{ fontSize: '0.96rem', color: '#5A5751', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                The African creative economy is projected to create millions of high-value cultural exports. Nexafrica
                Group provides a de-risked, multi-vertical holding model cross-pollinating cash flow from video
                production and culinary catering with high-appreciation contemporary fine art holdings.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: '#5A5751' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111111" /> Multi-niche recurring revenue streams
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111111" /> First-look rights to emerging artist catalogs
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111111" /> Pan-African hub expansion roadmap
                </li>
              </ul>
            </div>
          </div>

          {/* 3. INQUIRY FORM */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              maxWidth: '840px',
              margin: '0 auto',
              border: '1px solid rgba(17,17,17,0.08)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={56} color="#B8912A" style={{ margin: '0 auto 1.25rem' }} />
                <h3 style={{ marginBottom: '0.75rem', fontFamily: "'Playfair Display', serif" }}>
                  Proposal Transmitted to Leadership
                </h3>
                <p style={{ color: '#5A5751', maxWidth: '580px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                  Thank you for your interest in Nexafrica Group. Your inquiry has been routed directly to the founder's
                  desk. We review partnership proposals weekly.
                </p>
                <button className="btn btn-primary" onClick={() => setSuccess(false)}>
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  <span className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.4rem', display: 'flex', justifyContent: 'center' }}>
                    <Sparkles size={13} />
                    <span>Direct Channel</span>
                  </span>
                  <h2>Partner & Invest Inquiry</h2>
                  <p style={{ marginTop: '0.5rem', color: '#5A5751' }}>
                    Share your background, institutional affiliation, and vision for collaboration.
                  </p>
                </div>

                {error && (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      backgroundColor: 'rgba(166,25,46,0.08)',
                      color: '#A6192E',
                      borderRadius: '4px',
                      marginBottom: '1.5rem',
                      fontSize: '0.9rem',
                    }}
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Adisa Adeleke"
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
                        placeholder="adisa@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group">
                      <label className="form-label">Area of Interest *</label>
                      <select
                        className="form-select"
                        value={formData.area_of_interest}
                        onChange={(e) => setFormData({ ...formData, area_of_interest: e.target.value })}
                      >
                        <option value="student_partner">Student Creator / Research Partner</option>
                        <option value="future_investor">Future Investor / Seed Syndicate</option>
                        <option value="institutional_sponsor">Cultural Institution / Sponsor</option>
                        <option value="strategic_collaborator">Strategic Enterprise Partner</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">University, Firm, or Collective</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. University of Nairobi / Heritage Capital"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      />
                    </div>
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

                  <div className="form-group">
                    <label className="form-label">Proposal & Strategic Message *</label>
                    <textarea
                      required
                      className="form-textarea"
                      placeholder="Outline your background, your anticipated contribution or investment horizon, and how you see our ecosystem synergies alignment..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
                    id="submit-partner-form-btn"
                  >
                    {submitting ? 'Transmitting...' : 'Submit Partnership Inquiry'}
                    <Send size={15} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
