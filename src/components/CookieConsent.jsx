import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import Magnetic from './Magnetic';

// Utility helper to set cookies
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax; Secure";
};

// Utility helper to read cookies
const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a decision
    const consent = getCookie('apex_cookie_consent_v1');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie('apex_cookie_consent_v1', 'accepted', 365);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setCookie('apex_cookie_consent_v1', 'declined', 365);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="cookie-consent-card"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        maxWidth: '420px',
        width: 'calc(100% - 48px)',
        zIndex: 99999,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-glass-glow)',
        borderRadius: 'var(--border-radius-md)',
        boxShadow: 'var(--shadow-main), 0 0 25px rgba(139, 92, 246, 0.15)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        pointerEvents: 'auto',
        animation: 'slide-up-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            padding: '0.5rem',
            borderRadius: '8px',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={22} />
          </div>
          <h4 style={{ color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>
            Cookie Preferences
          </h4>
        </div>
        <button
          onClick={handleDecline}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-main)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <X size={16} />
        </button>
      </div>

      <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-muted)', margin: 0 }}>
        We use cookies to optimize site navigation, analyze traffic, and persist your display theme choices. By accepting, you consent to our use of cookies.
      </p>

      <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
        <button
          onClick={handleDecline}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-glass)',
            borderRadius: '6px',
            color: 'var(--text-main)',
            fontSize: '0.82rem',
            fontWeight: 600,
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Decline
        </button>
        <Magnetic>
          <button
            onClick={handleAccept}
            className="btn btn-primary"
            style={{
              padding: '0.5rem 1.2rem',
              fontSize: '0.82rem',
              borderRadius: '6px'
            }}
          >
            Accept All
          </button>
        </Magnetic>
      </div>

      <style>{`
        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
