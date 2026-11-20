import React, { useState } from 'react';
import { ActivePage } from '../types';
import { api } from '../services/api';
import { ArrowLeft, CheckCircle2, GraduationCap, Handshake, Send, Sparkles } from 'lucide-react';

interface PartnerPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const PartnerPage: React.FC<PartnerPageProps> = ({ onNavigate }) => {
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
    <main style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
      {/* 1. HERO EXPLAINER */}
      <section
        style={{
          backgroundColor: '#000000',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
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
              color: '#BFBFBF',
              fontSize: '0.84rem',
              fontWeight: 600,
              marginBottom: '1.75rem',
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Ecosystem Home</span>
          </button>

          <span className="label-smallcaps" style={{ color: '#FFFFFF', marginBottom: '0.65rem', display: 'flex' }}>
            <Handshake size={14} />
            <span>Creative Fellowships & Institutional Collaborations</span>
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginBottom: '1.5rem', lineHeight: 1.15, color: '#FFFFFF' }}>
            Partner with Nexafrica Group
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#BFBFBF', lineHeight: 1.65, maxWidth: '820px' }}>
            We collaborate with student creators, universities, cultural institutions, and visionary brands to produce
            exhibitions, films, culinary experiences, and editorial storytelling across Africa.
          </p>
        </div>
      </section>

      {/* 2. PARTNERSHIP PILLARS */}
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
                  backgroundColor: 'rgba(184, 145, 42, 0.15)',
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
              <h3 style={{ fontSize: '1.65rem', marginBottom: '0.75rem', color: '#FFFFFF' }}>
                Student Fellowships & Collaborations
              </h3>
              <p style={{ fontSize: '0.96rem', color: '#BFBFBF', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Are you an undergraduate or graduate creator in Nairobi or across the continent exploring art history,
                cinema production, gastronomic science, or cultural journalism? We offer studio fellowships, production
                gear access, and direct mentorship within our creative niches.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: '#BFBFBF' }}>
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

            {/* Pillar B: Institutional & Brand Collaborators */}
            <div className="card" style={{ padding: '2.5rem', borderTop: '4px solid #FFFFFF' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Handshake size={24} />
              </div>

              <div className="label-smallcaps" style={{ color: '#FFFFFF', marginBottom: '0.4rem' }}>
                For Brands & Cultural Institutions
              </div>
              <h3 style={{ fontSize: '1.65rem', marginBottom: '0.75rem', color: '#FFFFFF' }}>
                Strategic & Cultural Partnerships
              </h3>
              <p style={{ fontSize: '0.96rem', color: '#BFBFBF', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Partner with Nexafrica Group to co-curate gallery exhibitions, commission documentary series, host
                bespoke culinary supper clubs, or sponsor upcoming NexMagazine print editions and cultural galas.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: '#BFBFBF' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#FFFFFF" /> Co-branded exhibitions & cultural programming
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#FFFFFF" /> Full-service visual production & culinary curation
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#FFFFFF" /> Editorial features in NexMagazine
                </li>
              </ul>
            </div>
          </div>

          {/* 3. PARTNERSHIP INQUIRY FORM */}
          <div
            style={{
              backgroundColor: '#0B0B0B',
              borderRadius: '16px',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              maxWidth: '840px',
              margin: '0 auto',
              border: '1px solid rgba(255,255,255,0.14)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={56} color="#B8912A" style={{ margin: '0 auto 1.25rem' }} />
                <h3 style={{ marginBottom: '0.75rem', fontFamily: "'Playfair Display', serif", color: '#FFFFFF' }}>
                  Partnership Proposal Received
                </h3>
                <p style={{ color: '#BFBFBF', maxWidth: '580px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                  Thank you for your interest in partnering with Nexafrica Group. Your proposal has been routed to our
                  partnerships desk and we review submissions weekly.
                </p>
                <button className="btn btn-primary" onClick={() => setSuccess(false)}>
                  Submit Another Proposal
                </button>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  <span className="label-smallcaps" style={{ color: '#B8912A', marginBottom: '0.4rem', display: 'flex', justifyContent: 'center' }}>
                    <Sparkles size={13} />
                    <span>Partnership Desk</span>
                  </span>
                  <h2 style={{ color: '#FFFFFF' }}>Partner Inquiry</h2>
                  <p style={{ marginTop: '0.5rem', color: '#BFBFBF' }}>
                    Share your background, affiliation, and vision for creative collaboration.
                  </p>
                </div>

                {error && (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      backgroundColor: 'rgba(166,25,46,0.18)',
                      color: '#E04B60',
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
                      <label className="form-label">Partnership Type *</label>
                      <select
                        className="form-select"
                        value={formData.area_of_interest}
                        onChange={(e) => setFormData({ ...formData, area_of_interest: e.target.value })}
                      >
                        <option value="student_partner">Student Creator / Research Fellowship</option>
                        <option value="institutional_sponsor">Cultural Institution / Exhibition Partner</option>
                        <option value="strategic_collaborator">Brand / Creative Collaborator</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">University, Institution, or Brand</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. University of Nairobi / Contemporary Arts Trust"
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
                    <label className="form-label">Collaboration Proposal *</label>
                    <textarea
                      required
                      className="form-textarea"
                      placeholder="Outline your background, creative discipline, and how you would like to partner with the Nexafrica ecosystem..."
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
