import { Link } from 'react-router-dom';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <footer className="glass footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-column-brand">
            <div className="footer-logo-wrapper">
              <img src={`${import.meta.env.BASE_URL}logo.png?v=6`} alt="Apex Devs Logo" className="footer-logo-img" />
              <span className="footer-logo-subtitle">FUTURE SCALING SOLUTIONS.</span>
            </div>
            <p className="footer-brand-text">
              A premium technology company delivering high-end custom web applications, bespoke CRM solutions, and digital automation systems for growing enterprises.
            </p>
            <div className="footer-social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="tech-icon footer-social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="tech-icon footer-social-btn" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="tech-icon footer-social-btn" aria-label="WhatsApp">
                <MessageSquare size={16} />
              </a>
            </div>
          </div>
 
          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-title">Sitemap</h4>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>
 
          {/* Contact Details */}
          <div className="footer-column">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <Mail size={16} className="footer-contact-icon" />
                <a href="mailto:hello@apexdevs.com">hello@apexdevs.com</a>
              </li>
              <li>
                <Phone size={16} className="footer-contact-icon" />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <MessageSquare size={16} className="footer-contact-icon" />
                <span>WhatsApp: Live Support</span>
              </li>
            </ul>
          </div>
 
          {/* Newsletter */}
          <div className="footer-column">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-newsletter-text">
              Subscribe to receive updates on business automation, custom SaaS solutions, and web design trends.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <input
                type="email"
                required
                placeholder="Email Address"
                className="form-control footer-newsletter-input"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="btn btn-primary footer-newsletter-btn" aria-label="Submit subscription">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
 
        {/* Bottom copyright */}
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Apex Devs. All Rights Reserved.</span>
          <div className="footer-bottom-links">
            <Link to="/pricing">Terms of Service</Link>
            <Link to="/contact">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
