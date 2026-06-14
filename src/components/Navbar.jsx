import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`glass-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <div className="logo-wrapper">
            <img src={`${import.meta.env.BASE_URL}logo.png?v=6`} alt="Apex Devs Logo" className="logo-img" />
            <span className="logo-subtitle">FUTURE SCALING SOLUTIONS.</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </NavLink>
            </Magnetic>
          ))}
          
          {/* Theme Toggle Button */}
          <Magnetic>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </Magnetic>
        </nav>

        {/* Mobile Nav Trigger & Theme toggle */}
        <div className="mobile-controls">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="menu-toggle-btn"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay glass ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Inline styles for responsive layouts, scrolling effects, logo hover transformations */}
      <style>{`
        .glass-nav {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          width: 100%;
          height: 100px;
          transition: height 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease;
        }

        .glass-nav.scrolled {
          height: 72px;
          background: rgba(3, 3, 3, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        body.light-theme .glass-nav.scrolled {
          background: rgba(248, 250, 252, 0.85);
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.06), 0 1px 0 rgba(15, 23, 42, 0.04);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          transition: padding var(--transition-normal);
        }

        /* Logo Branding & 3D Hover Animation */
        .logo-link {
          display: flex;
          align-items: center;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .logo-link:hover {
          transform: scale(1.04);
        }

        .logo-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2px;
        }

        .logo-img {
          height: 80px;
          width: auto;
          border-radius: 4px;
          transition: transform 0.4s ease, height 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-nav.scrolled .logo-img {
          height: 60px;
        }

        .logo-subtitle {
          font-family: var(--font-display);
          font-size: 7px;
          font-weight: 700;
          color: #8a8a8a;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          max-width: none;
          white-space: nowrap;
          text-align: center;
          line-height: 1.2;
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), font-size 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: -4px;
        }

        body.light-theme .logo-subtitle {
          color: #64748b;
        }

        .glass-nav.scrolled .logo-subtitle {
          font-size: 6px;
          max-width: none;
          margin-top: -2px;
        }

        .logo-link:hover .logo-img {
          transform: rotate(-3deg);
        }

        /* Nav Items & Active Glowing Highlight Underline */
        .desktop-nav {
          display: none;
          gap: 0.8rem;
          align-items: center;
        }

        .nav-item {
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.88rem;
          padding: 0.5rem 0.8rem;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
          white-space: nowrap;
          border-radius: 30px;
          border: 1px solid transparent;
        }

        /* Hover capsule styling */
        .nav-item:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        body.light-theme .nav-item:hover {
          background: rgba(15, 23, 42, 0.05);
          border-color: rgba(15, 23, 42, 0.08);
        }

        /* Active capsule styling */
        .nav-item.active {
          color: var(--text-main);
          background: rgba(139, 92, 246, 0.12);
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.15);
          font-weight: 700;
        }

        body.light-theme .nav-item.active {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.2);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.1);
        }

        /* Theme button */
        .theme-toggle-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-main);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
          margin-left: 0.5rem;
        }

        body.light-theme .theme-toggle-btn {
          background: rgba(15, 23, 42, 0.05);
        }

        .theme-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--color-primary);
        }

        body.light-theme .theme-toggle-btn:hover {
          background: rgba(15, 23, 42, 0.08);
        }

        .mobile-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .menu-toggle-btn {
          display: flex;
          background: transparent;
          border: none;
          color: var(--text-main);
          cursor: pointer;
          transition: transform var(--transition-fast);
        }

        .menu-toggle-btn:hover {
          transform: scale(1.1);
        }

        /* Fullscreen Mobile Glassmorphic Overlay Menu */
        .mobile-menu-overlay {
          position: fixed;
          top: 100px;
          left: 0;
          width: 280px;
          height: calc(100vh - 100px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 1.8rem;
          z-index: 999;
          padding: 3rem 2.5rem;
          transform: translateX(-100%);
          opacity: 0;
          visibility: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, visibility 0.4s;
          background: rgba(3, 3, 3, 0.96);
          border-right: 1px solid var(--border-glass);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        body.light-theme .mobile-menu-overlay {
          background: rgba(248, 250, 252, 0.98);
        }

        .mobile-menu-overlay.open {
          transform: translateX(0);
          opacity: 1;
          visibility: visible;
        }

        .glass-nav.scrolled .mobile-menu-overlay {
          top: 72px;
          height: calc(100vh - 72px);
        }

        .mobile-nav-item {
          color: var(--text-muted);
          font-weight: 700;
          font-size: 1.25rem;
          transition: color var(--transition-fast), transform var(--transition-fast);
          position: relative;
          width: fit-content;
        }

        .mobile-nav-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 3px;
          background: var(--gradient-primary);
          transition: width 0.25s ease;
          border-radius: var(--border-radius-full);
        }

        .mobile-nav-item:hover, .mobile-nav-item.active {
          color: var(--color-primary);
          transform: translateX(6px);
        }

        .mobile-nav-item.active::after {
          width: 32px;
        }

        @media (min-width: 1000px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-controls {
            display: none !important;
          }
          .mobile-menu-overlay {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
