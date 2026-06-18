import { useState } from 'react';
import { Check, Info, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Magnetic from '../components/Magnetic';
import DropsHeaderVisual from '../components/DropsHeaderVisual';
import Tilt3D from '../components/Tilt3D';

export default function Pricing() {
  // Calculator Category State
  const [projectCategory, setProjectCategory] = useState('website'); // 'website' or 'webapp'
  const [pagesCount, setPagesCount] = useState(5);

  // Website checkbox state variables
  const [webDb, setWebDb] = useState(false);
  const [webAuth, setWebAuth] = useState(false);
  const [webMaps, setWebMaps] = useState(false);
  const [webEcommerce, setWebEcommerce] = useState(false);
  const [webAi, setWebAi] = useState(false);
  const [webSeo, setWebSeo] = useState(false);
  const [webHosting, setWebHosting] = useState(false);
  const [webMaintenance, setWebMaintenance] = useState(false);

  // Web App checkbox state variables
  const [appDb, setAppDb] = useState(false);
  const [appAuth, setAppAuth] = useState(false);
  const [appAnalytics, setAppAnalytics] = useState(false);
  const [appAi, setAppAi] = useState(false);
  const [appWhatsapp, setAppWhatsapp] = useState(false);
  const [appHosting, setAppHosting] = useState(false);
  const [appMaintenance, setAppMaintenance] = useState(false);

  const calculateEstimate = () => {
    if (projectCategory === 'website') {
      let total = 8000; // Website base rate
      if (pagesCount > 3) {
        total += (pagesCount - 3) * 800; // ₹800 per page after 3
      }
      if (webDb) total += 12000;
      if (webAuth) total += 5000;
      if (webMaps) total += 2000;
      if (webEcommerce) total += 15000;
      if (webAi) total += 15000;
      if (webSeo) total += 6000;
      if (webHosting) total += 8000;
      if (webMaintenance) total += 5000;
      return total;
    } else {
      let total = 20000; // Web Application base rate
      if (pagesCount > 3) {
        total += (pagesCount - 3) * 1500; // ₹1,500 per page after 3
      }
      if (appDb) total += 15000;
      if (appAuth) total += 7000;
      if (appAnalytics) total += 10000;
      if (appAi) total += 15000;
      if (appWhatsapp) total += 10000;
      if (appHosting) total += 12000;
      if (appMaintenance) total += 8000;
      return total;
    }
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
    },
    {
      title: "AI Integration",
      price: "₹30,000",
      desc: "Connect neural language models and automated messaging to streamline workflows.",
      features: [
        "Custom Business GPT Assistant",
        "Autonomous Lead Capture Agents",
        "Official WhatsApp API Broadcasting",
        "External Database & API Sync",
        "12 Months Support & Retraining"
      ],
      popular: false,
      color: "var(--color-secondary)"
    }
  ];

  return (
    <div style={{ position: 'relative' }}>

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

          {/* Pricing Calculator */}
          <Tilt3D className="glass-card" style={{ maxWidth: '950px', margin: '0 auto 4rem auto', padding: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
              <Calculator size={24} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: 0 }}>Interactive Price Calculator</h3>
            </div>

            {/* Project Category Toggle (Website vs Custom Web App) */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', gap: '1rem' }}>
              <button
                onClick={() => {
                  setProjectCategory('website');
                  setPagesCount(5);
                }}
                className={`tab-btn ${projectCategory === 'website' ? 'active' : ''}`}
                style={{ flex: 1, maxWidth: '200px' }}
              >
                Website
              </button>
              <button
                onClick={() => {
                  setProjectCategory('webapp');
                  setPagesCount(5);
                }}
                className={`tab-btn ${projectCategory === 'webapp' ? 'active' : ''}`}
                style={{ flex: 1, maxWidth: '200px' }}
              >
                Custom Web App
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="calc-grid">
              {/* Controls */}
              <div>
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                      {projectCategory === 'website' ? 'Number of Pages' : 'Number of Interface Views'}: {pagesCount}
                    </label>
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
                    <span>1 {projectCategory === 'website' ? 'Page' : 'View'}</span>
                    <span>20 {projectCategory === 'website' ? 'Pages' : 'Views'}</span>
                  </div>
                </div>

                {/* Checkbox Options depending on Website vs Web App */}
                {projectCategory === 'website' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={webDb} 
                        onChange={(e) => setWebDb(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Database Setup & User Storage
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={webAuth} 
                        onChange={(e) => setWebAuth(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      User Login & Profile Accounts
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={webMaps} 
                        onChange={(e) => setWebMaps(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Google Maps & Social Link Integrations
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={webEcommerce} 
                        onChange={(e) => setWebEcommerce(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      E-Commerce Storefront (Catalog/Cart/Checkout)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={webAi} 
                        onChange={(e) => setWebAi(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Interactive AI Chatbot Assistant
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={webSeo} 
                        onChange={(e) => setWebSeo(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      SEO Setup & Performance Audit Pack
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={webHosting} 
                        onChange={(e) => setWebHosting(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Domain & Annual Cloud Server Hosting
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={webMaintenance} 
                        onChange={(e) => setWebMaintenance(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Monthly Site Backups & Maintenance SLA
                    </label>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={appDb} 
                        onChange={(e) => setAppDb(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Database Systems & Complex Schema Modelling
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={appAuth} 
                        onChange={(e) => setAppAuth(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Granular User Roles & Permissions Setup
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={appAnalytics} 
                        onChange={(e) => setAppAnalytics(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Admin Analytics Dashboard & Interactive Charts
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={appAi} 
                        onChange={(e) => setAppAi(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Neural AI Custom Agent Integration
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={appWhatsapp} 
                        onChange={(e) => setAppWhatsapp(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      WhatsApp API Gateway & Bot Automation
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={appHosting} 
                        onChange={(e) => setAppHosting(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Secure Auto-scaling Infrastructure & SSL Setup
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      <input 
                        type="checkbox" 
                        checked={appMaintenance} 
                        onChange={(e) => setAppMaintenance(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', flexShrink: 0 }}
                      />
                      Priority Developer SLA Support
                    </label>
                  </div>
                )}
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
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
          gap: 2rem !important;
        }
        .tab-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          color: var(--text-muted);
          padding: 0.7rem 1.4rem;
          border-radius: var(--border-radius-full);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
          border-color: var(--border-glass-glow);
        }
        .tab-btn.active {
          background: var(--gradient-primary);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }
        @media (min-width: 992px) {
          .calc-grid {
            grid-template-columns: 3fr 2fr !important;
          }
        }
      `}</style>
    </div>
  );
}
