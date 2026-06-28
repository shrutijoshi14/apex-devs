import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

export default function Modal3D({ isOpen, onClose, title, subtitle, content, tags = [], gradient }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState('');

  // 3D Entrance & Exit animations
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Lock background scroll
      
      // GSAP 3D entry animation
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );

      gsap.fromTo(containerRef.current,
        { 
          opacity: 0, 
          scale: 0.72,
          rotationX: -28, 
          rotationY: 10,
          z: -250,
          transformPerspective: 1200
        },
        { 
          opacity: 1, 
          scale: 1, 
          rotationX: 0,
          rotationY: 0,
          z: 0,
          duration: 0.8, 
          ease: 'back.out(1.2)' 
        }
      );
    } else {
      document.body.style.overflow = ''; // Release body scroll lock
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    // GSAP exit transition
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.85,
      rotationX: 18,
      z: -100,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose
    });
    
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
  };

  // Interactive mouse tilt
  const handleMouseMove = (e) => {
    const card = containerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;

    // Subtle 3D tilt
    const maxRotate = 8;
    const rotateX = -(dy / yc) * maxRotate;
    const rotateY = (dx / xc) * maxRotate;

    setTiltStyle(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => {
    setTiltStyle('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 3, 3, 0.75)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        perspective: '1500px'
      }}
      onClick={handleClose}
    >
      <div
        ref={containerRef}
        className="glass-card"
        style={{
          maxWidth: '650px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: 0,
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-glass-glow)',
          boxShadow: 'var(--shadow-main), 0 0 35px var(--color-primary-glow)',
          transform: tiltStyle,
          transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
          transformStyle: 'preserve-3d',
          cursor: 'default'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent close on modal body click
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Banner header inside modal */}
        <div
          style={{
            background: gradient || 'var(--gradient-primary)',
            height: '140px',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1.5rem 2rem',
            transform: 'translateZ(20px)'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '1.2rem',
              right: '1.2rem',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.2s ease'
            }}
            className="modal-close-btn"
          >
            <X size={18} />
          </button>
          
          <div style={{ zIndex: 1 }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(255, 255, 255, 0.85)',
                display: 'block',
                marginBottom: '0.2rem'
              }}
            >
              {subtitle || 'Core Showcase'}
            </span>
            <h2
              style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#fff',
                margin: 0,
                textShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            >
              {title}
            </h2>
          </div>
        </div>

        {/* Modal Info body */}
        <div style={{ padding: '2rem', transform: 'translateZ(10px)' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: '1.7',
                color: 'var(--text-main)',
                whiteSpace: 'pre-line'
              }}
            >
              {content}
            </p>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-glass)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-main)'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          transform: scale(1.05) rotate(90deg);
        }
      `}</style>
    </div>
  );
}
