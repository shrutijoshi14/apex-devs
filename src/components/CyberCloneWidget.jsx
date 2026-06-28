import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function CyberCloneWidget() {
  const { pathname } = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeMessage, setActiveMessage] = useState('');
  const [typedText, setTypedText] = useState('');
  const typingTimerRef = useRef(null);

  // Define route and scroll-specific messages
  const getCloneMessage = (path, scroll) => {
    // Normalize pathname
    const route = path.replace(import.meta.env.BASE_URL, '/').replace('//', '/');

    if (route === '/' || route === '') {
      if (scroll < 300) {
        return "Hi there! I am Apex Devs' digital clone. Try scrolling down to check out my capabilities!";
      } else if (scroll >= 300 && scroll < 1200) {
        return "We specialize in constructing custom web applications, performance-oriented websites, and intelligent systems.";
      } else if (scroll >= 1200 && scroll < 2100) {
        return "Check out our key advantages. We guarantee secure development, modern UI/UX, and scalable architectures.";
      } else {
        return "I will sit back in the core network. Feel free to visit our contact page to get in touch with our team!";
      }
    } else if (route.includes('about')) {
      if (scroll < 450) {
        return "Welcome to our agency. Let me share our mission and vision.";
      } else {
        return "We build with strict component isolation. This means future updates never break visual components or databases.";
      }
    } else if (route.includes('services')) {
      return "Explore our cloud solutions: Business website development, custom CRMs, institute ERPs, and e-commerce.";
    } else if (route.includes('portfolio') || route.includes('case-studies')) {
      return "Here are some of the high-end applications designed and built by our development team.";
    } else if (route.includes('pricing')) {
      return "Review our flexible tiered pricing packages. We build performant, transparent SaaS systems.";
    } else if (route.includes('contact')) {
      return "Ready to launch your digital solution? Drop us a message for a free design audit and project scope evaluation.";
    } else if (route.includes('blog')) {
      return "Browse our developer journal. We share web dev tutorials, API integrations, and code optimizations.";
    }
    
    return "I am here to guide you. Scroll through the page to discover more.";
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active message based on route and scroll
  useEffect(() => {
    const msg = getCloneMessage(pathname, scrollPosition);
    if (msg !== activeMessage) {
      setActiveMessage(msg);
    }
  }, [pathname, scrollPosition, activeMessage]);

  // Typewriter effect
  useEffect(() => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    setTypedText('');
    let i = 0;
    
    typingTimerRef.current = setInterval(() => {
      if (i < activeMessage.length) {
        setTypedText((prev) => prev + activeMessage.charAt(i));
        i++;
      } else {
        clearInterval(typingTimerRef.current);
      }
    }, 22);

    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, [activeMessage]);

  // Determine speech bubble screen position relative to clone coordinates
  const getBubblePosition = () => {
    // Normalise route
    const route = pathname.replace(import.meta.env.BASE_URL, '/').replace('//', '/');

    if (route !== '/' && route !== '') {
      // Non-home pages have standard headers. Clone is floating around left-center or top-right.
      if (scrollPosition < 300) {
        return {
          right: 'calc(50% + 140px)',
          top: '180px',
          opacity: 1,
          pointerEvents: 'auto',
          arrowDirection: 'right'
        };
      }
      return {
        opacity: 0,
        pointerEvents: 'none',
        arrowDirection: 'none'
      };
    }

    // Homepage scroll thresholds
    if (scrollPosition < 300) {
      // Hero (Right) -> Speech bubble on the left of clone
      return {
        right: 'calc(25% + 140px)',
        top: 'calc(35vh - 20px)',
        opacity: 1,
        pointerEvents: 'auto',
        arrowDirection: 'right'
      };
    } else if (scrollPosition >= 300 && scrollPosition < 1100) {
      // Middle (Left) -> Speech bubble on the right of clone
      return {
        left: 'calc(25% + 140px)',
        top: 'calc(45vh - 20px)',
        opacity: 1,
        pointerEvents: 'auto',
        arrowDirection: 'left'
      };
    } else if (scrollPosition >= 1100 && scrollPosition < 2000) {
      // Heading center (Top center)
      return {
        left: '50%',
        transform: 'translateX(-50%)',
        top: 'calc(48vh - 120px)',
        opacity: 1,
        pointerEvents: 'auto',
        arrowDirection: 'bottom'
      };
    } else {
      // Bottom (Deep bg center) -> Hide text to avoid clutter
      return {
        opacity: 0,
        pointerEvents: 'none',
        arrowDirection: 'none'
      };
    }
  };

  const pos = getBubblePosition();

  if (pos.opacity === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 50,
        opacity: pos.opacity,
        pointerEvents: pos.pointerEvents,
        right: pos.right,
        left: pos.left,
        top: pos.top,
        transform: pos.transform,
        transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '320px',
        width: '85vw'
      }}
    >
      <div 
        className="glass"
        style={{
          borderRadius: 'var(--border-radius-md)',
          padding: '1rem 1.25rem',
          border: '1px solid var(--border-glass-glow)',
          boxShadow: 'var(--shadow-main), var(--shadow-glow)',
          position: 'relative'
        }}
      >
        {/* Caption Tag */}
        <div
          style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-secondary)',
            marginBottom: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--color-secondary)',
              boxShadow: '0 0 6px var(--color-secondary)',
              display: 'inline-block'
            }}
          />
          CLONE_CORE v1.02
        </div>

        {/* Text Area */}
        <p
          style={{
            fontSize: '0.88rem',
            lineHeight: '1.5',
            color: 'var(--text-main)',
            margin: 0,
            minHeight: '2.8rem'
          }}
        >
          {typedText}
          <span 
            className="typing-cursor"
            style={{
              display: 'inline-block',
              width: '5px',
              height: '12px',
              background: 'var(--color-primary)',
              marginLeft: '3px',
              animation: 'blink 0.8s step-end infinite'
            }}
          />
        </p>

        {/* Speech Bubble Arrow */}
        {pos.arrowDirection === 'right' && (
          <div
            style={{
              position: 'absolute',
              right: '-6px',
              top: '25px',
              width: '12px',
              height: '12px',
              background: 'var(--bg-glass)',
              borderRight: '1px solid var(--border-glass-glow)',
              borderTop: '1px solid var(--border-glass-glow)',
              transform: 'rotate(45deg)',
              backdropFilter: 'blur(14px)'
            }}
          />
        )}
        {pos.arrowDirection === 'left' && (
          <div
            style={{
              position: 'absolute',
              left: '-6px',
              top: '25px',
              width: '12px',
              height: '12px',
              background: 'var(--bg-glass)',
              borderLeft: '1px solid var(--border-glass-glow)',
              borderBottom: '1px solid var(--border-glass-glow)',
              transform: 'rotate(45deg)',
              backdropFilter: 'blur(14px)'
            }}
          />
        )}
        {pos.arrowDirection === 'bottom' && (
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '12px',
              height: '12px',
              background: 'var(--bg-glass)',
              borderRight: '1px solid var(--border-glass-glow)',
              borderBottom: '1px solid var(--border-glass-glow)',
              backdropFilter: 'blur(14px)'
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes blink {
          from, to { opacity: 0 }
          50% { opacity: 1 }
        }
      `}</style>
    </div>
  );
}
