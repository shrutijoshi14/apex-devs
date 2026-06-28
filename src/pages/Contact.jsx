import { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import DropsHeaderVisual from '../components/DropsHeaderVisual';
import Tilt3D from '../components/Tilt3D';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Business Website',
    budget: '₹8,000 - ₹15,000',
    details: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (8-15 digits)';
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Project details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate sending email/form to server
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'Business Website',
        budget: '₹8,000 - ₹15,000',
        details: ''
      });
    }, 1800);
  };

  return (
    <div style={{ position: 'relative' }}>

      {/* Header Banner */}
      <section className="section" style={{ paddingTop: '7rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <span className="section-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Initiate Scoping</span>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: '1.2', fontWeight: 700, marginBottom: '1.5rem' }}>
                Let's Build Your <span className="gradient-text">Next System</span>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '540px' }}>
                Have a project in mind or need assistance with digital automation? Let's trace out a solution blueprint.
              </p>
            </div>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DropsHeaderVisual themeColor="purple" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section" style={{ padding: '2rem 0', background: 'var(--gradient-dark)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start' }}>
            
            {/* Form Section */}
            <Tilt3D className="glass-card">
              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                  <CheckCircle size={54} style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem' }} />
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Consultation Scheduled!</h2>
                  <p style={{ fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                    Thank you for contacting Apex Devs. Our development lead will audit your requirements and email you within 24 hours to schedule a Zoom consultation.
                  </p>
                  <button onClick={() => setSubmitSuccess(false)} className="btn btn-primary">
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.8rem' }}>
                    Project Scoping Form
                  </h3>

                  {/* Name */}
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Dr. Sandeep Sharma"
                    />
                    {errors.name && (
                      <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Company */}
                  <div className="form-group">
                    <label className="form-label">Company Name (Optional)</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Apex Academy"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="contact-row">
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. sandeep@domain.com"
                      />
                      {errors.email && (
                        <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <AlertCircle size={12} /> {errors.email}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. +91 98765 43210"
                      />
                      {errors.phone && (
                        <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <AlertCircle size={12} /> {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Service & Budget */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="contact-row">
                    <div className="form-group">
                      <label className="form-label">Service Required</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="form-control"
                        style={{ background: 'var(--bg-surface)' }}
                      >
                        <option value="Business Website">Business Website Development</option>
                        <option value="Custom Web App">Custom Web App Development</option>
                        <option value="CRM System">CRM Development</option>
                        <option value="Institute ERP">Institute Management ERP</option>
                        <option value="E-Commerce Store">E-Commerce Solution</option>
                        <option value="API Integration">API Integration</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="form-control"
                        style={{ background: 'var(--bg-surface)' }}
                      >
                        <option value="₹8,000 - ₹15,000">₹8,000 - ₹15,000</option>
                        <option value="₹15,000 - ₹25,000">₹15,000 - ₹25,000</option>
                        <option value="₹25,000 - ₹40,000">₹25,000 - ₹40,000</option>
                        <option value="₹40,000+">₹40,000+</option>
                        <option value="Custom SaaS Quote">Custom SaaS Quote</option>
                      </select>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label className="form-label">Project Details *</label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      className="form-control"
                      rows="5"
                      placeholder="Outline your application specifications, target pages, or workflows..."
                    />
                    {errors.details && (
                      <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={12} /> {errors.details}
                      </span>
                    )}
                  </div>

                  <Magnetic>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                      style={{ width: '100%', pointerEvents: isSubmitting ? 'none' : 'auto' }}
                    >
                      {isSubmitting ? 'Syncing Coordinates...' : 'Submit Form'} <Send size={16} />
                    </button>
                  </Magnetic>
                </form>
              )}
            </Tilt3D>

            {/* Info & Map Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Contact card */}
              <Tilt3D className="glass-card">
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>Direct Operations Channels</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <a href="mailto:hello@apexdevs.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }} onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}>
                    <span className="tech-icon"><Mail size={16} /></span>
                    <div>
                      <span style={{ fontSize: '0.78rem', display: 'block', color: 'var(--text-muted)' }}>Email Scoping Details</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>hello@apexdevs.com</span>
                    </div>
                  </a>
                  
                  <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }} onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}>
                    <span className="tech-icon"><Phone size={16} /></span>
                    <div>
                      <span style={{ fontSize: '0.78rem', display: 'block', color: 'var(--text-muted)' }}>Phone Operational Line</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>+91 98765 43210</span>
                    </div>
                  </a>

                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }} onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}>
                    <span className="tech-icon"><MessageSquare size={16} /></span>
                    <div>
                      <span style={{ fontSize: '0.78rem', display: 'block', color: 'var(--text-muted)' }}>WhatsApp Chat Support</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>Chat with Tech Lead</span>
                    </div>
                  </a>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-glass)', margin: '1.5rem 0' }} />

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="tech-icon" style={{ flex: 1, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> LinkedIn
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="tech-icon" style={{ flex: 1, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub
                  </a>
                </div>
              </Tilt3D>

              {/* Google Maps Mockup */}
              <Tilt3D className="glass-card" style={{ padding: 0, overflow: 'hidden', height: '280px' }}>
                <iframe
                  title="Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.414777599042!2d77.20651717830154!3d28.626682229562725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37e0e85493%3A0x89ee18e778648c08!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1689254890887!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Tilt3D>

            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 576px) {
          .contact-row {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
