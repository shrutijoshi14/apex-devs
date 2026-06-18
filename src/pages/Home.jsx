import { Link } from 'react-router-dom';
import { 
  Code, Smartphone, Zap, Globe, Database, 
  ArrowRight, CheckCircle, Cpu, RefreshCw 
} from 'lucide-react';
import ThreeHero from '../components/ThreeHero';
import CountUp from '../components/CountUp';
import Testimonials from '../components/Testimonials';
import Magnetic from '../components/Magnetic';
import Tilt3D from '../components/Tilt3D';

export default function Home() {
  const services = [
    { icon: <Globe size={24} />, title: "Business Website Development", desc: "Enterprise-grade websites designed to capture leads, rank high on search engines, and establish authority." },
    { icon: <Code size={24} />, title: "Custom Web Application Development", desc: "Bespoke SaaS products and cloud software tailored exactly to your unique business workflows." },
    { icon: <Database size={24} />, title: "CRM Development", desc: "Customized CRM solutions for managing sales pipelines, tracking client accounts, and automating communications." },
    { icon: <Cpu size={24} />, title: "Institute Management Systems", desc: "All-in-one software managing admissions, academic courses, grading, fees, and student portals." },
    { icon: <Smartphone size={24} />, title: "E-Commerce Solutions", desc: "Full-scale online marketplaces featuring inventory trackers, shipping integrations, and payment gateways." },
    { icon: <Zap size={24} />, title: "API Integration & Development", desc: "Connecting your business systems with external web services and creating reliable internal APIs." },
    { icon: <RefreshCw size={24} />, title: "Website Maintenance", desc: "Around-the-clock updates, daily backups, structural health checks, and responsive developer support." }
  ];

  const benefits = [
    { title: "Responsive Design", desc: "Pixel-perfect rendering across all mobile, tablet, and widescreen desktop displays." },
    { title: "Fast Performance", desc: "Optimized loaders, code splitting, and asset caching for near-instant page delivery." },
    { title: "SEO Optimized", desc: "Clean semantic markup and metadata ensuring strong visibility in search results." },
    { title: "Secure Development", desc: "Data encryption, sanitized SQL/NoSQL entries, and secure authentication protocols." },
    { title: "Modern UI/UX", desc: "Stunning visual hierarchies, intuitive layouts, and micro-interactions." },
    { title: "Scalable Architecture", desc: "Codebase structured to easily support thousands of concurrent requests." }
  ];

  const projects = [
    {
      title: "Institute Management System",
      desc: "An enterprise ERP managing operations for large institutes: automating admissions, attendance, fees collection, and grades management.",
      tech: ["React", "Express.js", "MySQL", "ChartJS"],
      gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)"
    },
    {
      title: "Custom CRM Solution",
      desc: "A bespoke client relations platform designed for tracking leads, customer support tickets, and scheduling automatic sales emails.",
      tech: ["React.js", "Node.js", "MongoDB", "REST APIs"],
      gradient: "linear-gradient(135deg, #10b981, #06b6d4)"
    },
    {
      title: "Personal Budget Planner",
      desc: "A smart personal finance manager application featuring interactive analytics charts, expense categories, and monthly budget limits.",
      tech: ["React.js", "HTML5/CSS3", "JavaScript"],
      gradient: "linear-gradient(135deg, #f59e0b, #ec4899)"
    }
  ];

  const processSteps = [
    { phase: "01", name: "Requirement Analysis", desc: "Deep-diving into your target audience, functional needs, and project parameters." },
    { phase: "02", name: "Planning", desc: "Architecting the workflow, choosing dependencies, and outlining milestones." },
    { phase: "03", name: "Design", desc: "Creating visually stunning design system guides, wireframes, and prototypes." },
    { phase: "04", name: "Development", desc: "Writing clean, modular, and optimized production-ready codebase." },
    { phase: "05", name: "Testing", desc: "Comprehensive functional testing, load audits, and edge-case validation." },
    { phase: "06", name: "Deployment", desc: "Configuring server pipelines, CDNs, SSL certificates, and launching live." },
    { phase: "07", name: "Support", desc: "Continuous code audits, database backups, and responsive technical help." }
  ];

  return (
    <div style={{ position: 'relative' }}>

      {/* Hero Section */}
      <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '4rem' }}>
        <div className="container">
          <div className="grid-2">
            <div style={{ zIndex: 10 }}>
              {/* Premium Category Pill */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '0.4rem 1rem', borderRadius: '50px', marginBottom: '1.5rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-secondary)', display: 'inline-block', boxShadow: '0 0 8px var(--color-secondary)' }} />
                <span style={{ color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.78rem', fontFamily: 'var(--font-display)' }}>Next-Gen Web Engineering</span>
              </div>
              
              <h1 style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', lineHeight: '1.25', letterSpacing: '-0.015em', marginBottom: '1.5rem', fontWeight: 600 }}>
                Build Powerful Websites & <span className="gradient-text" style={{ paddingBottom: '0.1rem' }}>Custom Web Apps</span> For Growing Businesses
              </h1>
              
              <p style={{ fontSize: '1.12rem', lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '580px' }}>
                We help scale businesses through performance-oriented responsive websites, custom SaaS portals, secure CRM integrations, and intelligent automation systems.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Magnetic>
                  <Link to="/contact" className="btn btn-primary">
                    Get Free Consultation <ArrowRight size={16} />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link to="/portfolio" className="btn btn-secondary">
                    View Portfolio
                  </Link>
                </Magnetic>
              </div>
            </div>
            
            <div data-cursor-text="Drag" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
              <div className="spotlight" style={{ top: '-10%', left: '-10%' }} />
              <ThreeHero />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section" style={{ background: 'var(--gradient-dark)' }}>
        <div className="container">
          <div className="section-heading-container">
            <span className="section-tag">Capabilities</span>
            <h2 className="section-title">Our Web Solutions</h2>
            <p className="section-desc">
              We design and construct premium cloud applications and responsive websites engineered for business growth.
            </p>
          </div>

          <div className="grid-3">
            {services.map((s, idx) => (
              <Tilt3D key={idx}>
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                  <div style={{ 
                    background: 'rgba(139, 92, 246, 0.1)', 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)'
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.95rem' }}>{s.desc}</p>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Statistics */}
      <section className="section">
        <div className="container">
          {/* Centered Heading - Same as other sections */}
          <div className="section-heading-container">
            <span className="section-tag">Key Advantages</span>
            <h2 className="section-title">Why Growing Businesses Choose Apex Devs</h2>
            <p className="section-desc">
              We bridge the gap between creative visual designs and high-performance cloud code. Our systems are scalable, responsive, and secure.
            </p>
          </div>

          <div className="grid-2">
            {/* Left Column: Points stacked in ONE column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              {benefits.map((b, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ 
                    background: 'rgba(6, 182, 212, 0.1)', 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--color-secondary)',
                    flexShrink: 0 
                  }}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.3rem', fontWeight: 600 }}>{b.title}</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Statistics */}
            <div className="stats-grid">
              <Tilt3D>
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem', height: '100%' }}>
                  <h3 style={{ fontSize: '2.8rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                    <CountUp end={250} suffix="+" />
                  </h3>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>Projects Completed</span>
                </div>
              </Tilt3D>
              <Tilt3D>
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem', height: '100%' }}>
                  <h3 style={{ fontSize: '2.8rem', color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
                    <CountUp end={120} suffix="+" />
                  </h3>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>Happy Clients</span>
                </div>
              </Tilt3D>
              <Tilt3D>
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem', height: '100%' }}>
                  <h3 style={{ fontSize: '2.8rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                    <CountUp end={15} suffix="+" />
                  </h3>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>Technologies Used</span>
                </div>
              </Tilt3D>
              <Tilt3D>
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                  <h3 style={{ fontSize: '2.8rem', color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
                    24/7
                  </h3>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>Technical Support</span>
                </div>
              </Tilt3D>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section" style={{ background: 'var(--gradient-dark)' }}>
        <div className="container">
          <div className="section-heading-container">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">Featured Case Showcases</h2>
            <p className="section-desc">Explore some of the high-end applications and websites built by our engineers.</p>
          </div>

          <div className="grid-3">
            {projects.map((p, idx) => (
              <Tilt3D key={idx}>
                <div className="glass-card" data-cursor-text="View" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
                  <div style={{ 
                    background: p.gradient, 
                    height: '200px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
                    <span style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: '1.25rem', 
                      fontWeight: 700, 
                      color: '#fff',
                      zIndex: 1,
                      textShadow: '0 4px 10px rgba(0,0,0,0.3)'
                    }}>
                      {p.title}
                    </span>
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <p style={{ fontSize: '0.92rem', marginBottom: '1.5rem', height: '70px', overflow: 'hidden' }}>{p.desc}</p>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      {p.tech.map((t, i) => (
                        <span key={i} style={{ 
                          background: 'rgba(255,255,255,0.05)', 
                          border: '1px solid var(--border-glass)',
                          padding: '0.3rem 0.7rem', 
                          borderRadius: '4px', 
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--text-main)'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
  
                    <Link to="/portfolio" style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                      fontSize: '0.95rem'
                    }}>
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
            <Magnetic>
              <Link to="/portfolio" className="btn btn-secondary">
                View All Projects <ArrowRight size={16} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <div className="section-heading-container">
            <span className="section-tag">Workflows</span>
            <h2 className="section-title">Engineered For Delivery</h2>
            <p className="section-desc">Our structured roadmap ensures project alignment, timely milestones, and premium code releases.</p>
          </div>

          <div className="timeline">
            {processSteps.map((step, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-img">{step.phase}</div>
                <Tilt3D className="timeline-content">
                  <div className="glass-card" style={{ height: '100%' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{step.name}</h3>
                    <p style={{ fontSize: '0.95rem' }}>{step.desc}</p>
                  </div>
                </Tilt3D>
                
                {/* Opposite side: 3D animated graphic matching the phase */}
                <div className="timeline-graphic">
                  <div className="cyber-container">
                    {step.phase === "01" && (
                      <div className="workflow-graphic graphic-01">
                        <div className="radar-grid" />
                        <div className="radar-sweep" />
                        <div className="radar-crosshair" />
                        <div className="radar-dots">
                          <span className="dot dot-1"></span>
                          <span className="dot dot-2"></span>
                        </div>
                      </div>
                    )}
                    {step.phase === "02" && (
                      <div className="workflow-graphic graphic-02">
                        <div className="blueprint-grid">
                          <div className="bp-block block-1" />
                          <div className="bp-block block-2" />
                          <div className="bp-block block-3" />
                          <div className="bp-line line-h" />
                          <div className="bp-line line-v" />
                        </div>
                      </div>
                    )}
                    {step.phase === "03" && (
                      <div className="workflow-graphic graphic-03">
                        <div className="prism-canvas">
                          <div className="prism-circle pc-cyan" />
                          <div className="prism-circle pc-magenta" />
                          <div className="prism-circle pc-yellow" />
                          <div className="prism-core" />
                        </div>
                      </div>
                    )}
                    {step.phase === "04" && (
                      <div className="workflow-graphic graphic-04">
                        <div className="code-console">
                          <div className="terminal-header">
                            <span className="dot-red" />
                            <span className="dot-yellow" />
                            <span className="dot-green" />
                          </div>
                          <div className="terminal-code">
                            <div className="code-line line-1">&lt;div class="dev"&gt;</div>
                            <div className="code-line line-2">&nbsp;&nbsp;<span>const app = true;</span></div>
                            <div className="code-line line-3">&lt;/div&gt;</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {step.phase === "05" && (
                      <div className="workflow-graphic graphic-05">
                        <div className="scanner-shield">
                          <div className="shield-outline" />
                          <div className="scanner-laser" />
                          <div className="shield-icon">&#10004;</div>
                        </div>
                      </div>
                    )}
                    {step.phase === "06" && (
                      <div className="workflow-graphic graphic-06">
                        <div className="server-rack">
                          <div className="rack-unit unit-1"><span className="led led-green" /><span className="led-flow" /></div>
                          <div className="rack-unit unit-2"><span className="led led-blue" /><span className="led-flow" /></div>
                          <div className="rack-unit unit-3"><span className="led led-green" /><span className="led-flow" /></div>
                        </div>
                      </div>
                    )}
                    {step.phase === "07" && (
                      <div className="workflow-graphic graphic-07">
                        <div className="support-gears">
                          <div className="gear gear-large" />
                          <div className="gear gear-small" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--gradient-dark)' }}>
        <div className="container">
          <div className="section-heading-container">
            <span className="section-tag">Feedback</span>
            <h2 className="section-title">Client Success Stories</h2>
            <p className="section-desc">Hear from the businesses that have unlocked efficiency using our automation software.</p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Call To Action */}
      <section className="section" style={{ textAlign: 'center', position: 'relative' }}>
        <div className="spotlight spotlight-cyan" style={{ top: '10%', left: '30%' }} />
        <div className="container">
          <Tilt3D>
            <div className="glass-card" style={{ padding: '5rem 2rem', border: '1px solid var(--border-glass-glow)', height: '100%' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem', fontWeight: 800 }}>
                Let's Build Your Next <span className="gradient-text">Digital Solution</span>
              </h2>
              <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', fontSize: '1.1rem' }}>
                Connect with our technology consultants today for a free design audit and project scope evaluation.
              </p>
              <Magnetic>
                <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2.2rem', fontSize: '1rem' }}>
                  Get Free Consultation <ArrowRight size={16} />
                </Link>
              </Magnetic>
            </div>
          </Tilt3D>
        </div>
      </section>
    </div>
  );
}
