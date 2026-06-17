import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const targetMouse = useRef({ x: 0, y: 0 });
  const pointsRef = useRef([]);
  const magneticTargetRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Refs for tracking values inside the event listeners and animate loop
  // without triggering useEffect restarts
  const isHoveredRef = useRef(false);
  const isSnappedRef = useRef(false);
  const cursorTextRef = useRef('');
  const lastMouse = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const POINT_COUNT = 8; // Number of trail nodes

  // Initialize coordinate points
  if (pointsRef.current.length === 0) {
    for (let i = 0; i < POINT_COUNT; i++) {
      pointsRef.current.push({ x: 0, y: 0 });
    }
  }

  // Spawn star sparkles on cursor movement
  const spawnParticles = (x, y) => {
    // Avoid spawning too many particles when snapped to reduce visual noise
    const spawnCount = isSnappedRef.current ? 1 : 2;
    for (let i = 0; i < spawnCount; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 0.4, // float slightly upward
        size: 5 + Math.random() * 8, // larger stars for premium looks
        life: 1.0,
        decay: 0.012 + Math.random() * 0.015, // slower decay for longer visible trail
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        color: Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(139, 92, 246, ' // cyan or purple
      });
    }
  };

  useEffect(() => {
    // Show cursor only on mouse move initially to prevent showing at (0, 0)
    const handleFirstMove = (e) => {
      if (!hasMoved.current) {
        hasMoved.current = true;
        document.body.classList.add('custom-cursor-active');
        setIsVisible(true);
        lastMouse.current.x = e.clientX;
        lastMouse.current.y = e.clientY;
      }
    };
    window.addEventListener('mousemove', handleFirstMove);

    // Canvas setup - guaranteed non-null because we always render elements
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Track mouse position and emit sparkles on normal move
    const handleMouseMove = (e) => {
      if (!hasMoved.current) {
        handleFirstMove(e);
      }

      targetMouse.current.x = e.clientX;
      targetMouse.current.y = e.clientY;

      // Interpolate particle spawning for fast movements
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8) {
        const steps = Math.min(8, Math.floor(dist / 10));
        for (let s = 1; s <= steps; s++) {
          const ratio = s / steps;
          const px = lastMouse.current.x + dx * ratio;
          const py = lastMouse.current.y + dy * ratio;
          spawnParticles(px, py);
        }
      } else {
        spawnParticles(e.clientX, e.clientY);
      }

      lastMouse.current.x = e.clientX;
      lastMouse.current.y = e.clientY;
    };

    // Track hover states and active magnetic buttons/links & cursor texts
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Disable custom cursor and show browser cursor on input fields for usability
      const isInput = target.closest('input:not([type="range"]), textarea, select');
      if (isInput) {
        setIsVisible(false);
        setIsHovered(false);
        isHoveredRef.current = false;
        magneticTargetRef.current = null;
        setCursorText('');
        cursorTextRef.current = '';
        return;
      }

      if (hasMoved.current) {
        setIsVisible(true);
      }

      const interactive = target.closest('a, button, .btn, .filter-btn, .tab-btn, .magnetic, [data-cursor-text], input[type="range"]');
      if (interactive) {
        setIsHovered(true);
        isHoveredRef.current = true;
        magneticTargetRef.current = interactive.closest('.magnetic') || interactive.closest('.btn') || null;

        let text = '';
        if (interactive.getAttribute('data-cursor-text')) {
          text = interactive.getAttribute('data-cursor-text');
        } else if (interactive.tagName === 'A' && interactive.href && !interactive.href.includes('#')) {
          text = 'Open';
        } else if (interactive.type === 'range') {
          text = 'Drag';
        } else if (interactive.tagName === 'BUTTON' || interactive.classList.contains('btn') || interactive.classList.contains('filter-btn') || interactive.classList.contains('tab-btn')) {
          text = 'Click';
        }
        setCursorText(text);
        cursorTextRef.current = text;
      } else {
        setIsHovered(false);
        isHoveredRef.current = false;
        magneticTargetRef.current = null;
        setCursorText('');
        cursorTextRef.current = '';
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      if (hasMoved.current) {
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    let animationFrameId;

    const animate = () => {
      const mouseX = targetMouse.current.x;
      const mouseY = targetMouse.current.y;

      let targetX = mouseX;
      let targetY = mouseY;

      const currentTarget = magneticTargetRef.current;
      if (currentTarget) {
        try {
          const rect = currentTarget.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const dx = centerX - mouseX;
          const dy = centerY - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Snapping threshold distance (90px)
          if (distance < 90) {
            const pullFactor = 0.58; // Pull cursor closer to center of target
            targetX = mouseX + dx * pullFactor;
            targetY = mouseY + dy * pullFactor;
            if (!isSnappedRef.current) {
              isSnappedRef.current = true;
              setIsSnapped(true);
            }
          } else {
            if (isSnappedRef.current) {
              isSnappedRef.current = false;
              setIsSnapped(false);
            }
          }
        } catch (err) {
          if (isSnappedRef.current) {
            isSnappedRef.current = false;
            setIsSnapped(false);
          }
        }
      } else {
        if (isSnappedRef.current) {
          isSnappedRef.current = false;
          setIsSnapped(false);
        }
      }

      // Update trail points position using LERP
      const points = pointsRef.current;
      
      // Update primary point: 1:1 if not snapped, LERP when snapped
      if (isSnappedRef.current) {
        points[0].x += (targetX - points[0].x) * 0.28;
        points[0].y += (targetY - points[0].y) * 0.28;
      } else {
        points[0].x = targetX;
        points[0].y = targetY;
      }

      // Update following trail points
      for (let i = 1; i < POINT_COUNT; i++) {
        const lerpFactor = 0.18 + (i * 0.02); 
        points[i].x += (points[i - 1].x - points[i].x) * lerpFactor;
        points[i].y += (points[i - 1].y - points[i].y) * lerpFactor;
      }

      // Update DOM styles directly for high performance
      for (let i = 0; i < POINT_COUNT; i++) {
        const el = document.getElementById(`cursor-dot-${i}`);
        if (el) {
          el.style.transform = `translate3d(${points[i].x}px, ${points[i].y}px, 0)`;
        }
      }

      // Update Custom Text Badge Position
      const textEl = document.getElementById('cursor-text-badge');
      if (textEl) {
        textEl.style.transform = `translate3d(${points[0].x}px, ${points[0].y}px, 0)`;
      }

      // ── Animate & Render Star Particles on Canvas ──
      const canvasEl = canvasRef.current;
      if (canvasEl) {
        const ctx = canvasEl.getContext('2d');
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        
        const particles = particlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= p.decay;
          
          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }
          
          // Draw beautiful rotating glowing 5-pointed star shapes
          const cx = p.x;
          const cy = p.y;
          const spikes = 5;
          const outerRadius = p.size * p.life;
          const innerRadius = outerRadius / 2.5;
          
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(p.rotation);
          
          // Add beautiful canvas shadow/glow effect
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color + '0.6)';
          
          ctx.fillStyle = p.color + p.life + ')';
          ctx.beginPath();
          
          let rot = (Math.PI / 2) * 3;
          let step = Math.PI / spikes;
          let x = 0;
          let y = 0;

          ctx.moveTo(0, -outerRadius);
          for (let j = 0; j < spikes; j++) {
            x = Math.cos(rot) * outerRadius;
            y = Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = Math.cos(rot) * innerRadius;
            y = Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
          }
          ctx.lineTo(0, -outerRadius);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
          
          p.rotation += p.rotationSpeed;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleFirstMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.body.classList.remove('custom-cursor-active');
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {/* Sparkles Particle Layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99998
        }}
      />

      {/* Outer SVG filter definition for gooey blending */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} width="0" height="0">
        <defs>
          <filter id="goo-cursor">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Gooey Cursor Trail */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99999,
          filter: cursorText ? 'none' : 'url(#goo-cursor)', // disable gooey when displaying text
          mixBlendMode: isHovered && !cursorText ? 'difference' : 'normal'
        }}
      >
        {/* Render trailing points */}
        {pointsRef.current.map((_, i) => {
          // If cursor text is showing, hide the primary dot so it doesn't overlap text bubble
          if (cursorText && i === 0) return null;

          const baseSize = i === 0 ? 16 : Math.max(4, 14 - i * 1.3);
          const activeSize = isHovered 
            ? (i === 0 ? 32 : Math.max(6, 26 - i * 2.8)) 
            : baseSize;

          return (
            <div
              key={i}
              id={`cursor-dot-${i}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${activeSize}px`,
                height: `${activeSize}px`,
                backgroundColor: isHovered
                  ? (i === 0 ? 'rgba(6, 182, 212, 0.95)' : `rgba(139, 92, 246, ${1 - i * 0.11})`)
                  : 'var(--color-primary)',
                borderRadius: '50%',
                marginLeft: `-${activeSize / 2}px`,
                marginTop: `-${activeSize / 2}px`,
                willChange: 'transform',
                opacity: (isSnapped && i > 0) || (cursorText && i > 0) ? 0.3 : 1, 
                transition: 'width 0.2s ease, height 0.2s ease, background-color 0.3s ease, opacity 0.2s ease'
              }}
            />
          );
        })}
      </div>

      {/* Floating Hover Text Badge */}
      {cursorText && (
        <div
          id="cursor-text-badge"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '66px',
            height: '66px',
            background: 'var(--gradient-primary)',
            border: '2px solid rgba(255, 255, 255, 0.22)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            fontSize: '0.62rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginLeft: '-33px',
            marginTop: '-33px',
            willChange: 'transform',
            pointerEvents: 'none',
            zIndex: 100000,
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.45), 0 0 15px rgba(6, 182, 212, 0.2)',
            animation: 'cursorTextReveal 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
          }}
        >
          {cursorText}
        </div>
      )}

      <style>{`
        @keyframes cursorTextReveal {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
