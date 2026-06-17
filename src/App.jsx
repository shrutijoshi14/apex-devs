import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import CaseStudies from './pages/CaseStudies';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import CustomCursor from './components/CustomCursor';
import ChatbotWidget from './components/ChatbotWidget';

// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// Scroll to Top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

// Scroll Reveal automatically triggers smooth animations on route changes and viewport entries using GSAP ScrollTrigger
function ScrollReveal({ loading }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (loading) return;

    let ctx = gsap.context(() => {
      // 1. Calm Page Entrance Animation
      const banner = document.querySelector('main section:first-of-type');
      if (banner) {
        const tag = banner.querySelector('.section-tag') || banner.querySelector('h1')?.previousElementSibling;
        const title = banner.querySelector('h1');
        const desc = banner.querySelector('p');
        const btns = banner.querySelectorAll('.btn');
        const visual = banner.querySelector('[style*="height: 300px"], [style*="min-height: 400px"], [style*="height: 100%"]');

        const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } });
        
        // Hide initially to prevent layout flash
        const targets = [];
        if (tag) targets.push(tag);
        if (title) targets.push(title);
        if (desc) targets.push(desc);
        if (btns && btns.length > 0) {
          btns.forEach(btn => targets.push(btn));
        }
        if (visual) targets.push(visual);

        if (targets.length > 0) {
          gsap.set(targets, { opacity: 0 });
        }

        if (tag) entranceTl.fromTo(tag, { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, 0.1);
        if (title) entranceTl.fromTo(title, { opacity: 0, y: 22 }, { opacity: 1, y: 0 }, 0.2);
        if (desc) entranceTl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.35);
        if (btns && btns.length > 0) entranceTl.fromTo(btns, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.1 }, 0.45);
        if (visual) entranceTl.fromTo(visual, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.0 }, 0.5);
      }

      // 2. Grid Items Stagger Reveal (Services, Portfolio, Stats, Pricing, Blog)
      const grids = document.querySelectorAll('.grid-3, .grid-4, .tech-solutions-grid, .stats-grid, .blog-grid-layout, .pricing-grid-layout, .detailed-services-list, .portfolio-projects-list');
      grids.forEach(grid => {
        const cards = grid.querySelectorAll('.glass-card, article, .tech-card, .pricing-card');
        if (cards.length > 0) {
          gsap.fromTo(cards, 
            { opacity: 0, y: 35 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        }
      });

      // 3. Section Heading Containers Reveal
      const headings = document.querySelectorAll('.section-heading-container');
      headings.forEach(heading => {
        gsap.fromTo(heading,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });

      // 4. Process Steps Timeline Items Slide Reveal
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, idx) => {
        const content = item.querySelector('.timeline-content');
        const graphic = item.querySelector('.timeline-graphic');
        const badge = item.querySelector('.timeline-img');

        const isEven = idx % 2 === 0;

        if (content) {
          gsap.fromTo(content,
            { opacity: 0, x: isEven ? -40 : 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        }

        if (graphic) {
          gsap.fromTo(graphic,
            { opacity: 0, x: isEven ? 40 : -40, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        }

        if (badge) {
          gsap.fromTo(badge,
            { opacity: 0, scale: 0.2 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'back.out(1.8)',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        }
      });
    });

    // Refresh ScrollTrigger to ensure bounds align with new content heights
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => ctx.revert();
  }, [pathname, loading]);

  return null;
}



function AppContent({ loading }) {
  const { pathname } = useLocation();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <main key={pathname} className="page-enter" style={{ flex: 1, paddingTop: '100px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);

  useEffect(() => {
    // Elegant fade out sequence
    const fadeTimer = setTimeout(() => {
      setFadeLoader(true);
    }, 1300);

    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false
    });
    window.lenis = lenis;

    // requestAnimationFrame loop for Lenis scroll engine
    let lenisFrame;
    function raf(time) {
      lenis.raf(time);
      lenisFrame = requestAnimationFrame(raf);
    }
    lenisFrame = requestAnimationFrame(raf);

    // Synchronize ScrollTrigger with Lenis
    lenis.on('scroll', () => ScrollTrigger.update());

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      cancelAnimationFrame(lenisFrame);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      {/* Premium SVG Noise Overlay */}
      <div className="noise-overlay" />
      
      <ScrollToTop />
      <ScrollReveal loading={loading} />
      
      {/* Premium Loader */}
      {loading && (
        <div className={`loader-wrapper ${fadeLoader ? 'fade-out' : ''}`}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Apex Devs" className="loader-logo" />
          <div className="loader-bar">
            <div className="loader-progress" />
          </div>
          <p style={{ marginTop: '1.2rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}>
            LAUNCHING APEX DEVS SYSTEM
          </p>
        </div>
      )}

      {/* Interactive Custom Mouse Follower */}
      <CustomCursor />

      {/* Premium AI Chatbot Assistant */}
      <ChatbotWidget />

      <AppContent loading={loading} />
    </Router>
  );
}
