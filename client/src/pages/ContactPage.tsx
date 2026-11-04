import React, { useState } from 'react';
import { ActivePage } from '../types';
import { api } from '../services/api';
import { ArrowLeft, CheckCircle2, Mail, MapPin, Phone, Clock, Send, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    target_niche: 'nexafrica-group',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res: any = await api.submitContact({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        target_niche: formData.target_niche,
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
      });
      setSuccessMessage(
        res?.message || 'Thank you! Your message has been routed to the appropriate department.'
      );
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        target_niche: 'nexafrica-group',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to dispatch inquiry. Please check your inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ backgroundColor: '#F5F3EF' }}>
      {/* 1. HEADER */}
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
            <MessageSquare size={14} />
            <span>Direct Communications</span>
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            Contact the Ecosystem
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#5A5751', lineHeight: 1.65, maxWidth: '820px' }}>
            Have a question for our group leadership or a specific niche? Use our routed inquiry system to reach the exact
            curator, producer, or team member.
          </p>
        </div>
      </section>

      {/* 2. CONTACT GRID: FORM & OFFICES */}
      <section className="section-padding">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 0.75fr',
              gap: '3rem',
              alignItems: 'start',
            }}
          >
            {/* Form */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: 'clamp(2rem, 3.5vw, 3rem)',
                border: '1px solid rgba(17,17,17,0.08)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3 style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>Send an Inquiry</h3>
              <p style={{ fontSize: '0.9rem', color: '#5A5751', marginBottom: '2rem' }}>
                Select your intended niche from the dropdown to route your message directly.
              </p>

              {successMessage ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={52} color="#111111" style={{ margin: '0 auto 1.25rem' }} />
                  <h3 style={{ marginBottom: '0.75rem', fontFamily: "'Playfair Display', serif" }}>
                    Message Dispatched
                  </h3>
                  <p style={{ color: '#5A5751', marginBottom: '2rem', lineHeight: 1.6 }}>{successMessage}</p>
                  <button className="btn btn-primary" onClick={() => setSuccessMessage(null)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Marcus Vance"
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
                        placeholder="marcus@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.25rem' }}>
                    {/* DROPDOWN ROUTING PER NICHE (KEY REQUIREMENT FROM BRIEF) */}
                    <div className="form-group">
                      <label className="form-label">Route to Niche *</label>
                      <select
                        className="form-select"
                        value={formData.target_niche}
                        onChange={(e) => setFormData({ ...formData, target_niche: e.target.value })}
                        id="contact-niche-select"
                      >
                        <option value="nexafrica-group">Nexafrica Group (General Secretariat)</option>
                        <option value="nexart-africa">NexArt Africa (Gallery & Commissions)</option>
                        <option value="nexstudios-africa">NexStudios Africa (Production & Shoots)</option>
                        <option value="nexafricuisine">NexAfriCuisine (Culinary & Catering)</option>
                        <option value="nexevents-africa">NexEvents Africa (Cultural Calendar)</option>
                      </select>
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
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Brief headline of inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      required
                      className="form-textarea"
                      placeholder="How can our ecosystem assist you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.9rem' }}
                    id="submit-contact-btn"
                  >
                    {submitting ? 'Routing Message...' : 'Send Routed Message'}
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>

            {/* Nairobi Headquarters Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card" style={{ padding: '2rem' }}>
                <div className="label-smallcaps" style={{ color: '#111111', marginBottom: '0.85rem' }}>
                  Nairobi Headquarters
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <MapPin size={18} color="#111111" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>NexHub Creative Pavilion</strong>
                      <div style={{ color: '#5A5751', marginTop: '2px' }}>
                        Kilimani & Westlands Creative Lofts, Nairobi, Kenya
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <Mail size={18} color="#111111" style={{ flexShrink: 0 }} />
                    <a href="mailto:hello@nexafrica.group" style={{ color: '#111111', fontWeight: 600 }}>
                      hello@nexafrica.group
                    </a>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <Phone size={18} color="#111111" style={{ flexShrink: 0 }} />
                    <span style={{ color: '#5A5751' }}>+254 (0) 720 000 000</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Clock size={18} color="#111111" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Studio & Gallery Hours</strong>
                      <div style={{ color: '#5A5751', marginTop: '2px' }}>
                        Tuesday – Saturday: 10:00 AM – 7:00 PM EAT
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Social Handles */}
              <div className="card" style={{ padding: '2rem', backgroundColor: '#FAF8F5' }}>
                <div className="label-smallcaps" style={{ color: '#111111', marginBottom: '0.85rem' }}>
                  Official Handles
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5A5751' }}>Nexafrica Group:</span>
                    <strong>@nexafricagroup</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5A5751' }}>NexArt Africa:</span>
                    <strong style={{ color: '#B8912A' }}>@nexartafrica</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5A5751' }}>NexStudios Africa:</span>
                    <strong style={{ color: '#A6192E' }}>@nexstudiosafrica</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5A5751' }}>NexAfriCuisine:</span>
                    <strong style={{ color: '#2F6B3A' }}>@nexafricuisine</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5A5751' }}>NexEvents Africa:</span>
                    <strong>@nexeventsafrica</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
