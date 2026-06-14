import { useState } from 'react';
import { Check, Info, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import Magnetic from '../components/Magnetic';
import DropsHeaderVisual from '../components/DropsHeaderVisual';
import Tilt3D from '../components/Tilt3D';

export default function Pricing() {
  // Calculator state
  const [pagesCount, setPagesCount] = useState(5);
  const [hasDatabase, setHasDatabase] = useState(false);
  const [hasAuth, setHasAuth] = useState(false);
  const [hasAnalytics, setHasAnalytics] = useState(false);

  const calculateEstimate = () => {
    let base = 8000;
    // Pages cost: ₹800 per page after page 3
    if (pagesCount > 3) {
      base += (pagesCount - 3) * 800;
    }
    if (hasDatabase) base += 12000;
    if (hasAuth) base += 5000;
    if (hasAnalytics) base += 7000;
    return base;
  };

  const pricingTiers = [
    {
      title: "Starter Website",
      price: "₹8,000",
      desc: "Perfect for local companies looking to secure an online brochure web presence.",
      features: [
        "Up to 3 Custom Web Pages",
        "Responsive Mobile Layouts",
        "Contact Email Form Setup",
        "Standard SEO Optimization",
        "1 Month Support & Edits"
      ],
      popular: false,
      color: "var(--color-secondary)"
    },
    {
      title: "Business Website",
      price: "₹15,000",
      desc: "Ideal for growing service firms needing high-speed landing pages and client lead captures.",
      features: [
        "Up to 10 Custom Web Pages",
        "Custom Lead Forms & CTAs",
        "Speed & Performance Tuning",
        "Google Maps & Social Links",
        "3 Months Support & Backups"
      ],
      popular: true,
      color: "var(--color-primary)"
    },
    {
      title: "E-Commerce Website",
      price: "₹25,000",
      desc: "Fully functional online marketplaces featuring custom payment processing checkouts.",
      features: [
        "Product Catalog (Up to 100 items)",
        "Stripe & Local Payment Gateways",
        "Shopping Cart & Admin Dashboard",
        "Automated Tax & Shipping Rates",
        "6 Months Support & Security"
      ],
      popular: false,
      color: "var(--color-accent)"
    },
    {
      title: "CRM Development",
      price: "₹40,000",
      desc: "Bespoke internal dashboards built to manage leads, support tickets, and workflows.",
      features: [
        "Custom Deal Pipeline Board",
        "Lead Capture Forms Routing",
        "Automatic Email Notifications",
        "Role-Based User Permissions",
        "12 Months Priority Support"
      ],
      popular: false,
      color: "var(--color-primary)"
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <ParticleBackground />

      {/* Header Banner */}
      <section className="section" style={{ paddingTop: '7rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <span className="section-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Pricing Framework</span>
              <h1 style={{ fontSize: 'clamp(2rem, 4.2vw, 3.2rem)', lineHeight: '1.2', fontWeight: 700, marginBottom: '1.5rem' }}>
                Transparent Pricing, <span className="gradient-text">No Hidden Fees</span>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '540px' }}>
                Browse through our baseline service starting tiers. All configurations are highly customized to fit your brand.
              </p>
            </div>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DropsHeaderVisual themeColor="cyan" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="section" style={{ padding: '2rem 0', background: 'var(--gradient-dark)' }}>
        <div className="container">
          <div className="pricing-grid-layout" style={{ marginBottom: '4rem' }}>
            
            {pricingTiers.map((tier, idx) => (
              <Tilt3D 
                key={idx} 
                className="glass-card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  border: tier.popular ? '2px solid var(--color-primary)' : '1px solid var(--border-glass)',
                  boxShadow: tier.popular ? 'var(--shadow-main), 0 0 30px rgba(139, 92, 246, 0.2)' : 'var(--shadow-main)',
                  position: 'relative'
                }}
              >
                {tier.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}>
                    RECOMMENDED
                  </span>
                )}

                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{tier.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>{tier.price}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>starting rate</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>{tier.desc}</p>
                  
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-glass)', marginBottom: '2rem' }} />

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        <Check size={16} style={{ color: tier.color, flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Magnetic>
                  <Link to="/contact" className="btn btn-secondary" style={{ width: '100%', borderColor: tier.color }}>
                    Select Plan
                  </Link>
                </Magnetic>
              </Tilt3D>
            ))}

            {/* Custom Quote Card */}
            <Tilt3D className="glass-card" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              background: 'radial-gradient(circle at top right, rgba(6,182,212,0.1), transparent)',
              border: '1px dashed var(--color-secondary)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Custom Web Application</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Custom</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>quote</span>
                </div>
                <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Tailored enterprise suites, SaaS systems, database architectures, and complex workflow automation tools.
                </p>
                
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-glass)', marginBottom: '2rem' }} />

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <Check size={16} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                    <span>Bespoke Functional Logic Modules</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <Check size={16} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                    <span>Database Clustering & Tuning</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <Check size={16} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                    <span>External Third-party Integrations</span>
                  </li>
                </ul>
              </div>

              <Magnetic>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                  Request Custom Quote
                </Link>
              </Magnetic>
            </Tilt3D>

          </div>

          {/* Pricing Calculator Mockup */}
          <Tilt3D className="glass-card" style={{ maxWidth: '800px', margin: '0 auto 4rem auto', padding: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
              <Calculator size={24} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>Interactive Price Calculator</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="calc-grid">
              {/* Controls */}
              <div>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: 600 }}>Number of Pages: {pagesCount}</label>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={pagesCount}
                    onChange={(e) => setPagesCount(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    <span>1 Page</span>
                    <span>20 Pages</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.92rem' }}>
                    <input 
                      type="checkbox" 
                      checked={hasDatabase} 
                      onChange={(e) => setHasDatabase(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                    />
                    Requires Database / User Storage (+₹12,000)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.92rem' }}>
                    <input 
                      type="checkbox" 
                      checked={hasAuth} 
                      onChange={(e) => setHasAuth(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                    />
                    Requires User Accounts & Login (+₹5,000)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.92rem' }}>
                    <input 
                      type="checkbox" 
                      checked={hasAnalytics} 
                      onChange={(e) => setHasAnalytics(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                    />
                    Custom Admin Dashboard Metrics (+₹7,000)
                  </label>
                </div>
              </div>

              {/* Estimate Display */}
              <div style={{ 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid var(--border-glass)', 
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Estimated Baseline Quote</span>
                <span style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0' }}>
                  ₹{calculateEstimate().toLocaleString('en-IN')}
                </span>
                <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                  This is a baseline calculation. Final rates vary based on functional requirements.
                </p>
                <Magnetic>
                  <Link to="/contact" className="btn btn-primary" style={{ padding: '0.7rem 1.4rem', fontSize: '0.88rem' }}>
                    Consult this configuration <ArrowRight size={14} />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Tilt3D>

          {/* Disclaimer Info */}
          <Tilt3D className="glass-card" style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            display: 'flex', 
            gap: '1rem', 
            alignItems: 'flex-start',
            background: 'rgba(139, 92, 246, 0.03)',
            borderColor: 'var(--border-glass-glow)'
          }}>
            <Info size={24} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '0.3rem', fontSize: '1.02rem' }}>Pricing Scope Notice:</h4>
              <p style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>
                All figures represent estimated starting points. Final pricing depends on project scope, functional complexities, integration specifications, and deployment frameworks. We provide legally-binding statements of work after scoping requirements.
              </p>
            </div>
          </Tilt3D>

        </div>
      </section>

      <style>{`
        .pricing-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
          gap: 2rem !important;
        }
        @media (min-width: 768px) {
          .calc-grid {
            grid-template-columns: 3fr 2fr !important;
          }
        }
      `}</style>
    </div>
  );
}
