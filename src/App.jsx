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
import ThreeScrollBackground from './components/ThreeScrollBackground';
import CookieConsent from './components/CookieConsent';

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
      const isHome = pathname.replace(import.meta.env.BASE_URL, '/').replace('//', '/') === '/';

      if (isHome) {
        // --- HOMEPAGE SECTION-SPECIFIC 3D ANIMATIONS ---
        const sections = document.querySelectorAll('main section');

        // Section 1: Hero entrance 3D zoom & drift
        const heroSection = sections[0];
        if (heroSection) {
          const tag = heroSection.querySelector('.section-tag') || heroSection.querySelector('h1')?.previousElementSibling;
          const title = heroSection.querySelector('h1');
          const desc = heroSection.querySelector('p');
          const btns = heroSection.querySelectorAll('.btn');
          const visual = heroSection.querySelector('[style*="height: 300px"], [style*="min-height: 400px"], [style*="height: 100%"]');

          const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.95 } });
          const targets = [];
          if (tag) targets.push(tag);
          if (title) targets.push(title);
          if (desc) targets.push(desc);
          if (btns) btns.forEach(b => targets.push(b));
          if (visual) targets.push(visual);

          if (targets.length > 0) gsap.set(targets, { opacity: 0 });

          if (tag) entranceTl.fromTo(tag, { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, 0.1);
          if (title) entranceTl.fromTo(title, { opacity: 0, y: 30, rotationX: -15, transformPerspective: 1000, transformOrigin: "top center" }, { opacity: 1, y: 0, rotationX: 0 }, 0.2);
          if (desc) entranceTl.fromTo(desc, { opacity: 0, y: 22 }, { opacity: 1, y: 0 }, 0.38);
          if (btns && btns.length > 0) entranceTl.fromTo(btns, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.1 }, 0.48);
          if (visual) entranceTl.fromTo(visual, { opacity: 0, scale: 0.9, rotationY: -18, rotationX: 8, z: -80, transformPerspective: 1200 }, { opacity: 1, scale: 1, rotationY: 0, rotationX: 0, z: 0, duration: 1.15 }, 0.5);
        }

        // Section 2: Web Solutions -> 3D Cylindrical Arc (Circle shift)
        const servicesSection = sections[1];
        if (servicesSection) {
          const cards = servicesSection.querySelectorAll('.glass-card');
          cards.forEach((card, index) => {
            const angle = (index - 1.5) * 20; // Staggered curve rotation Y
            gsap.fromTo(card,
              {
                opacity: 0,
                rotationY: angle,
                z: -180 - Math.abs(angle) * 3,
                x: angle * 6,
                y: 50,
                transformPerspective: 1200,
                transformOrigin: "center center -100px"
              },
              {
                opacity: 1,
                rotationY: 0,
                z: 0,
                x: 0,
                y: 0,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: servicesSection,
                  start: 'top 82%',
                  toggleActions: 'play reverse play reverse'
                }
              }
            );
          });
        }

        // Section 3: Why Choose Us -> 3D Fan-out & Cubes
        const advantagesSection = sections[2];
        if (advantagesSection) {
          // Left column benefits: fan-out slide
          const benefitItems = advantagesSection.querySelectorAll('.grid-2 > div:first-child > div');
          benefitItems.forEach((item, index) => {
            gsap.fromTo(item,
              { 
                opacity: 0, 
                x: -50, 
                rotationZ: (index - 2.5) * 3.0,
                transformOrigin: "left center" 
              },
              { 
                opacity: 1, 
                x: 0, 
                rotationZ: 0, 
                duration: 0.85, 
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 85%',
                  toggleActions: 'play reverse play reverse'
                }
              }
            );
          });

          // Right column stats: floating cubes
          const statsCards = advantagesSection.querySelectorAll('.stats-grid .glass-card');
          if (statsCards.length > 0) {
            gsap.fromTo(statsCards,
              { 
                opacity: 0, 
                scale: 0.72, 
                rotationX: 30, 
                rotationY: -22, 
                z: -160, 
                transformPerspective: 1000 
              },
              { 
                opacity: 1, 
                scale: 1, 
                rotationX: 0, 
                rotationY: 0, 
                z: 0, 
                duration: 0.9, 
                stagger: 0.12, 
                ease: 'back.out(1.2)',
                scrollTrigger: {
                  trigger: advantagesSection.querySelector('.stats-grid'),
                  start: 'top 85%',
                  toggleActions: 'play reverse play reverse'
                }
              }
            );
          }
        }

        // Section 4: Featured Cases -> 3D Hinge Unfold
        const projectsSection = sections[3];
        if (projectsSection) {
          const projectCards = projectsSection.querySelectorAll('.grid-3 .glass-card');
          if (projectCards.length > 0) {
            gsap.fromTo(projectCards,
              { 
                opacity: 0, 
                y: 120, 
                rotationX: -45, 
                z: -120,
                transformPerspective: 1200, 
                transformOrigin: "bottom center" 
              },
              { 
                opacity: 1, 
                y: 0, 
                rotationX: 0, 
                z: 0, 
                duration: 1.05, 
                stagger: 0.15, 
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: projectsSection,
                  start: 'top 80%',
                  toggleActions: 'play reverse play reverse'
                }
              }
            );
          }
        }

        // Section 5: Workflows (Timeline) -> Horizontal Double-door Swing
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, idx) => {
          const content = item.querySelector('.timeline-content');
          const graphic = item.querySelector('.timeline-graphic');
          const badge = item.querySelector('.timeline-img');
          const isEven = idx % 2 === 0;

          if (content) {
            gsap.fromTo(content,
              { 
                opacity: 0, 
                x: isEven ? -60 : 60,
                rotationY: isEven ? 22 : -22,
                z: -50,
                transformPerspective: 1000,
                transformOrigin: isEven ? "left center" : "right center"
              },
              {
                opacity: 1,
                x: 0,
                rotationY: 0,
                z: 0,
                duration: 0.85,
                ease: 'power3.out',
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
              { 
                opacity: 0, 
                x: isEven ? 60 : -60,
                rotationY: isEven ? -22 : 22,
                z: -50,
                scale: 0.88,
                transformPerspective: 1000,
                transformOrigin: isEven ? "right center" : "left center"
              },
              {
                opacity: 1,
                x: 0,
                rotationY: 0,
                z: 0,
                scale: 1,
                duration: 0.85,
                ease: 'power3.out',
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

        // Section 6: Testimonials -> 3D Skewed Conveyor Belt
        const testimonialsSection = sections[5];
        if (testimonialsSection) {
          const testimonialCards = testimonialsSection.querySelectorAll('.glass-card, .testimonial-item');
          if (testimonialCards.length > 0) {
            gsap.fromTo(testimonialCards,
              { 
                opacity: 0, 
                scale: 0.85, 
                rotationY: 20, 
                skewX: -5, 
                z: -80,
                transformPerspective: 1000 
              },
              { 
                opacity: 1, 
                scale: 1, 
                rotationY: 0, 
                skewX: 0, 
                z: 0, 
                duration: 0.95, 
                stagger: 0.14, 
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: testimonialsSection,
                  start: 'top 82%',
                  toggleActions: 'play reverse play reverse'
                }
              }
            );
          }
        }

        // Section 7: Call To Action -> 3D Box Unfold
        const ctaSection = sections[6];
        if (ctaSection) {
          const ctaCard = ctaSection.querySelector('.glass-card');
          if (ctaCard) {
            gsap.fromTo(ctaCard,
              { 
                opacity: 0, 
                scale: 0.82, 
                rotationX: 30, 
                z: -180, 
                transformPerspective: 1500,
                transformOrigin: "center bottom"
              },
              { 
                opacity: 1, 
                scale: 1, 
                rotationX: 0, 
                z: 0, 
                duration: 1.1, 
                ease: 'back.out(1.2)',
                scrollTrigger: {
                  trigger: ctaSection,
                  start: 'top 85%',
                  toggleActions: 'play reverse play reverse'
                }
              }
            );
          }
        }
      } else {
        // --- SUB-PAGES: ALTERNATING 3D WAVE REVEALS ---

        // 1. Calm Page Entrance
        const banner = document.querySelector('main section:first-of-type');
        if (banner) {
          const tag = banner.querySelector('.section-tag') || banner.querySelector('h1')?.previousElementSibling;
          const title = banner.querySelector('h1');
          const desc = banner.querySelector('p');
          const visual = banner.querySelector('[style*="height: 300px"], [style*="min-height: 400px"], [style*="height: 100%"]');

          const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
          if (tag) entranceTl.fromTo(tag, { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, 0.1);
          if (title) entranceTl.fromTo(title, { opacity: 0, y: 25, rotationX: -12, transformPerspective: 1000 }, { opacity: 1, y: 0, rotationX: 0 }, 0.2);
          if (desc) entranceTl.fromTo(desc, { opacity: 0, y: 18 }, { opacity: 1, y: 0 }, 0.35);
          if (visual) entranceTl.fromTo(visual, { opacity: 0, scale: 0.92, rotationY: 10, z: -50, transformPerspective: 1000 }, { opacity: 1, scale: 1, rotationY: 0, z: 0, duration: 1.0 }, 0.45);
        }

        // 2. Grids and Lists: Alternating 3D wave reveal
        const grids = document.querySelectorAll('.grid-3, .grid-4, .tech-solutions-grid, .blog-grid-layout, .pricing-grid-layout, .detailed-services-list, .portfolio-projects-list');
        grids.forEach(grid => {
          const cards = grid.querySelectorAll('.glass-card, article, .tech-card, .pricing-card');
          cards.forEach((card, index) => {
            const rotY = index % 2 === 0 ? 15 : -15; // Alternating Y tilt
            gsap.fromTo(card,
              { 
                opacity: 0, 
                y: 60,
                rotationY: rotY,
                rotationX: -10,
                z: -120,
                transformPerspective: 1200,
                transformOrigin: "center center"
              },
              { 
                opacity: 1, 
                y: 0, 
                rotationY: 0,
                rotationX: 0,
                z: 0,
                duration: 0.95,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card, // trigger individual cards for smooth infinite waves
                  start: 'top 86%',
                  toggleActions: 'play reverse play reverse'
                }
              }
            );
          });
        });
      }

      // Shared Headings (always reveal)
      const headings = document.querySelectorAll('.section-heading-container');
      headings.forEach(heading => {
        gsap.fromTo(heading,
          { 
            opacity: 0, 
            y: 30,
            rotationX: -12,
            transformPerspective: 1000,
            transformOrigin: "bottom center"
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
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

      {/* Global Background Animation */}
      {!loading && <ThreeScrollBackground />}

      {/* Premium AI Chatbot Assistant */}
      <ChatbotWidget />

      {/* Cookie Consent Consent Banner */}
      <CookieConsent />

      <AppContent loading={loading} />
    </Router>
  );
}
