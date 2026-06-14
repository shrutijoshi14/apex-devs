import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const targetMouse = useRef({ x: 0, y: 0 });
  const pointsRef = useRef([]);
  const magneticTargetRef = useRef(null);

  const POINT_COUNT = 8; // Number of trail nodes

  // Initialize coordinate points
  if (pointsRef.current.length === 0) {
    for (let i = 0; i < POINT_COUNT; i++) {
      pointsRef.current.push({ x: 0, y: 0 });
    }
  }

  useEffect(() => {
    // Show cursor only on mouse move initially to prevent showing at (0, 0)
    const handleFirstMove = () => {
      setIsVisible(true);
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);

    // Track mouse position
    const handleMouseMove = (e) => {
      targetMouse.current.x = e.clientX;
      targetMouse.current.y = e.clientY;
    };

    // Track hover states and active magnetic buttons/links
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = target.closest('a, button, .btn, .filter-btn, .magnetic');
      if (interactive) {
        setIsHovered(true);
        magneticTargetRef.current = interactive;
      } else {
        setIsHovered(false);
        magneticTargetRef.current = null;
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
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
            setIsSnapped(true);
          } else {
            setIsSnapped(false);
          }
        } catch (err) {
          setIsSnapped(false);
        }
      } else {
        setIsSnapped(false);
      }

      // Update trail points position using LERP
      const points = pointsRef.current;
      
      // Update primary point
      points[0].x += (targetX - points[0].x) * 0.32;
      points[0].y += (targetY - points[0].y) * 0.32;

      // Update following trail points
      for (let i = 1; i < POINT_COUNT; i++) {
        // Higher delay/smoothness for outer dots
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

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
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

      {/* Cursor Container */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99999,
          filter: 'url(#goo-cursor)', // Apply gooey filter to join circles
          mixBlendMode: isHovered ? 'normal' : 'difference'
        }}
      >
        {/* Render trailing points */}
        {pointsRef.current.map((_, i) => {
          // Compute scale/size based on position (outer points are smaller)
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
                // Make colors gradient like and change if hovered
                backgroundColor: isHovered
                  ? (i === 0 ? 'rgba(6, 182, 212, 0.95)' : `rgba(139, 92, 246, ${1 - i * 0.11})`)
                  : 'var(--color-primary)',
                borderRadius: '50%',
                // Shift to center of translation
                marginLeft: `-${activeSize / 2}px`,
                marginTop: `-${activeSize / 2}px`,
                willChange: 'transform',
                opacity: isSnapped && i > 0 ? 0.3 : 1, // reduce trail opacity when snapped
                transition: 'width 0.2s ease, height 0.2s ease, background-color 0.3s ease, opacity 0.2s ease'
              }}
            />
          );
        })}
      </div>
    </>
  );
}
