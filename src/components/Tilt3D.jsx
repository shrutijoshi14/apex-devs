import { useRef, useState } from 'react';

export default function Tilt3D({ children, className = '', style = {} }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    // Max rotation angles in degrees (keep subtle for clean card UX)
    const maxRotate = 8;
    const rotateX = -(dy / yc) * maxRotate;
    const rotateY = (dx / xc) * maxRotate;

    setTransformStyle(`perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: transformStyle,
        transition: 'transform 0.18s cubic-bezier(0.25, 1, 0.5, 1), border-color var(--transition-normal), box-shadow var(--transition-normal)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style
      }}
    >
      {children}
    </div>
  );
}
