import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Dr. Sandeep Sharma",
    role: "Director, Apex Academy",
    text: "The Institute Management System developed by Apex Devs transformed our operations. Admissions, fees, and report cards are now fully automated. Highly recommended!",
    rating: 5
  },
  {
    name: "Rajesh Patel",
    role: "Founder, QuickCommerce Ltd",
    text: "Apex Devs built our custom web application and payment gateway integration. Our monthly processing has increased by 40% due to the smooth UX and fast loading times.",
    rating: 5
  },
  {
    name: "Meera Nair",
    role: "VP of Product, FinGrowth Systems",
    text: "We needed a custom CRM that integrates seamlessly with our sales pipelines. The team at Apex Devs delivered a secure, scalable product within the agreed timeframe. Outstanding support!",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[activeIndex];

  return (
    <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
        <div style={{ 
          background: 'rgba(139, 92, 246, 0.1)', 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'var(--color-primary)' 
        }}>
          <Quote size={28} />
        </div>
        
        <p style={{ fontStyle: 'italic', fontSize: '1.15rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
          "{active.text}"
        </p>

        <div style={{ display: 'flex', gap: '0.2rem' }}>
          {[...Array(active.rating)].map((_, i) => (
            <Star key={i} size={18} fill="currentColor" style={{ color: '#fbbf24', border: 'none' }} />
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>{active.name}</h4>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{active.role}</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <button className="filter-btn" onClick={handlePrev} aria-label="Previous Testimonial">
          <ChevronLeft size={20} />
        </button>
        <button className="filter-btn" onClick={handleNext} aria-label="Next Testimonial">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
