import { useEffect, useRef } from 'react';

export default function DropsHeaderVisual({ themeColor = 'purple' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = canvas.width = 300;
    let height = canvas.height = 300;

    // Retrieve active colors from the DOM CSS variables
    const getThemeColors = () => {
      const isLight = document.body.classList.contains('light-theme');
      
      // Default color fallbacks matching our design tokens
      let primary = isLight ? '#6d28d9' : '#8b5cf6'; // Purple
      let secondary = isLight ? '#0891b2' : '#06b6d4'; // Cyan
      let accent = isLight ? '#db2777' : '#ec4899'; // Pink

      try {
        const computedStyle = getComputedStyle(document.documentElement);
        const pVal = computedStyle.getPropertyValue('--color-primary').trim();
        const sVal = computedStyle.getPropertyValue('--color-secondary').trim();
        const aVal = computedStyle.getPropertyValue('--color-accent').trim();
        if (pVal) primary = pVal;
        if (sVal) secondary = sVal;
        if (aVal) accent = aVal;
      } catch (e) {
        console.warn('Could not read CSS color variables, using fallbacks');
      }

      if (themeColor === 'cyan') return secondary;
      if (themeColor === 'pink') return accent;
      return primary;
    };

    // Particles array
    const particles = [];
    const drips = [];

    // Central core (large pulsing liquid droplet)
    const core = {
      x: width / 2,
      y: height / 2 - 10,
      baseRadius: 48,
      radius: 48,
      pulseSpeed: 0.03,
      angle: 0
    };

    // Mouse interactive state
    const mouse = {
      x: null,
      y: null,
      radius: 40,
      active: false
    };

    // Initialize floating sub-droplets
    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 55 + Math.random() * 35;
      particles.push({
        x: core.x + Math.cos(angle) * distance,
        y: core.y + Math.sin(angle) * distance,
        baseX: core.x,
        baseY: core.y,
        radius: 12 + Math.random() * 12,
        angle: angle,
        orbitSpeed: 0.008 + Math.random() * 0.012 * (Math.random() > 0.5 ? 1 : -1),
        orbitRadius: distance,
        driftOffset: Math.random() * Math.PI * 2,
        driftSpeed: 0.02 + Math.random() * 0.03
      });
    }

    // Handle mouse events
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      const activeColor = getThemeColors();

      // 1. Update Central Liquid Core
      core.angle += core.pulseSpeed;
      core.radius = core.baseRadius + Math.sin(core.angle) * 4;

      // Mouse attraction to core
      if (mouse.active) {
        const dx = mouse.x - core.x;
        const dy = mouse.y - core.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          // Gently shift core position toward mouse
          core.x += (mouse.x - core.x) * 0.08;
          core.y += (mouse.y - core.y) * 0.08;
        } else {
          // Return to center
          core.x += (width / 2 - core.x) * 0.08;
          core.y += (height / 2 - 10 - core.y) * 0.08;
        }
      } else {
        // Return to center
        core.x += (width / 2 - core.x) * 0.05;
        core.y += (height / 2 - 10 - core.y) * 0.05;
      }

      // Draw gooey backdrop circle for smooth merges
      ctx.beginPath();
      ctx.arc(core.x, core.y, core.radius, 0, Math.PI * 2);
      ctx.fillStyle = activeColor;
      ctx.fill();

      // 2. Update and Draw Orbiting / Floating Droplets
      particles.forEach((p) => {
        p.angle += p.orbitSpeed;
        p.driftOffset += p.driftSpeed;
        
        // Compute base orbit position
        const targetX = core.x + Math.cos(p.angle) * p.orbitRadius;
        const targetY = core.y + Math.sin(p.angle) * p.orbitRadius;
        
        // Add organic waving/drifting movement
        const drift = Math.sin(p.driftOffset) * 6;
        p.x += (targetX - p.x) * 0.1 + Math.cos(p.angle) * drift * 0.05;
        p.y += (targetY - p.y) * 0.1 + Math.sin(p.angle) * drift * 0.05;

        // Interaction with mouse cursor (push away slightly)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius + p.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius + p.radius - dist) * 0.15;
            p.x -= Math.cos(angle) * force;
            p.y -= Math.sin(angle) * force;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeColor;
        ctx.fill();
      });

      // 3. Dripping Mechanics (Generate a dripping droplet every 75-100 frames)
      if (frameCount % 90 === 0 && drips.length < 5) {
        drips.push({
          x: core.x + (Math.random() - 0.5) * 20,
          y: core.y + core.radius - 8,
          radius: 6 + Math.random() * 6,
          vy: 0.5,
          gravity: 0.12,
          stretchY: 1
        });
      }

      // Update and Draw Drips
      for (let i = drips.length - 1; i >= 0; i--) {
        const d = drips[i];
        d.vy += d.gravity;
        d.y += d.vy;
        
        // Elongate drop shape slightly as it speeds up
        d.stretchY = Math.min(1.4, 1 + d.vy * 0.08);

        // Remove if past canvas height
        if (d.y - d.radius > height) {
          drips.splice(i, 1);
          continue;
        }

        // Draw elongated droplet shape
        ctx.beginPath();
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.scale(1 / d.stretchY, d.stretchY);
        ctx.arc(0, 0, d.radius, 0, Math.PI * 2);
        ctx.restore();
        ctx.fillStyle = activeColor;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [themeColor]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        filter: 'url(#goo-header)', // Applies gooey merging effect to children
        userSelect: 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
      {/* SVG gooey liquid filter definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} width="0" height="0">
        <defs>
          <filter id="goo-header">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
