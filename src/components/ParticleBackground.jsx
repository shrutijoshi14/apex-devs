import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, targetX: null, targetY: null };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const getThemeColors = (isLight) => {
      return [
        isLight ? '109, 40, 217' : '139, 92, 246', // Purple
        isLight ? '8, 145, 178' : '6, 182, 212',   // Cyan
        isLight ? '219, 39, 119' : '236, 72, 153'   // Pink
      ];
    };

    const initParticles = () => {
      const activeIsLight = document.body.classList.contains('light-theme');
      const colors = getThemeColors(activeIsLight);
      
      const particleCount = Math.min(80, Math.floor(canvas.width / 15));
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const depth = Math.random(); // 0 is far/deep (slower), 1 is close/shallow (faster, larger)
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: depth * 2.2 + 0.8,
          alpha: depth * 0.35 + 0.1,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          pulseVal: Math.random() * Math.PI,
          color: colors[Math.floor(Math.random() * colors.length)],
          parallax: depth * 0.12 + 0.05,
          ox: 0,
          oy: 0
        });
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollY = window.scrollY || window.pageYOffset;

      // Smooth mouse tracking
      if (mouse.targetX !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.1;
          mouse.y += (mouse.targetY - mouse.y) * 0.1;
        }
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      particles.forEach((p) => {
        // 1. Natural Ambient Motion
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // 2. Mouse Repulsion Effect
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          // Compensate for scroll offset since canvas is fixed
          const dy = (p.y - scrollY * p.parallax) - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const activeRadius = 140;

          if (distance < activeRadius) {
            const force = (activeRadius - distance) / activeRadius;
            const angle = Math.atan2(dy, dx);
            
            p.ox += Math.cos(angle) * force * 1.5;
            p.oy += Math.sin(angle) * force * 1.5;
          }
        }

        // Apply friction
        p.ox *= 0.93;
        p.oy *= 0.93;

        const drawX = p.x + p.ox;
        const drawY = p.y - scrollY * p.parallax + p.oy;

        p.pulseVal += p.pulseSpeed;
        const pulseAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseVal));

        if (drawX + p.radius > 0 && drawX - p.radius < canvas.width &&
            drawY + p.radius > 0 && drawY - p.radius < canvas.height) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${pulseAlpha})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="animated-gradient-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <div className="bg-blob blob-purple" />
      <div className="bg-blob blob-cyan" />
      <div className="bg-blob blob-pink" />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
