import { useState } from 'react';
import { ExternalLink, Layers } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import Magnetic from '../components/Magnetic';
import DropsHeaderVisual from '../components/DropsHeaderVisual';
import Tilt3D from '../components/Tilt3D';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Websites', 'SaaS Applications', 'Automation & ERP'];

  const projects = [
    {
      title: "Institute Management System",
      category: "Automation & ERP",
      desc: "A comprehensive administrative dashboard built for institutional operation management. It manages everything from admissions and attendance to fee calculations, online classes, exams scoring, and reports generating.",
      features: ["Full Billing and Fees Ledger", "Interactive Student Attendance Sheet", "Granular Staff Roles & Permissions"],
      tech: ["React.js", "Express.js", "MySQL Database", "Chart.js"],
      gradient: "linear-gradient(135deg, #8b5cf6, #3b82f6)"
    },
    {
      title: "Enterprise CRM Solution",
      category: "SaaS Applications",
      desc: "A custom customer relations manager designed to organize leads, log sales activity, build workflows, and trigger automated follow-up email sequences for marketing teams.",
      features: ["Drag-and-Drop Deal Pipelines", "Email Campaign Scheduling Engine", "Automated Daily Activity Logs"],
      tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "JWT Auth"],
      gradient: "linear-gradient(135deg, #06b6d4, #10b981)"
    },
    {
      title: "Personal Budget Planner",
      category: "SaaS Applications",
      desc: "A smart web app that tracks monthly revenues, catalogs expenses, aggregates transaction data, and displays real-time budget limit alerts with visualizations.",
      features: ["Real-time Expenditure Graphs", "Monthly Budget Limit Alerts", "CSV Transaction Logs Exporting"],
      tech: ["HTML5", "CSS3", "JavaScript", "React.js", "Local Storage"],
      gradient: "linear-gradient(135deg, #ec4899, #f59e0b)"
    },
    {
      title: "Premium Catering Website",
      category: "Websites",
      desc: "A responsive business web presence for an elite catering firm. Integrates custom menu catalogs, service booking inquiry forms, and customer testimonial sliders.",
      features: ["Interactive Event Menu Selector", "Secure Party Booking Inquiry Form", "Google Map Venue Integrations"],
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "React.js"],
      gradient: "linear-gradient(135deg, #ef4444, #f59e0b)"
    },
    {
      title: "Product Management Website",
      category: "Websites",
      desc: "A sleek product listing and catalog website with category grouping, advanced text search tools, filters, and product details query prompts.",
      features: ["Instant Search & Filter Systems", "Detailed Query Prompts", "Optimized Image Grid Loaders"],
      tech: ["React.js", "Vite", "Vanilla CSS", "REST APIs"],
      gradient: "linear-gradient(135deg, #6366f1, #d946ef)"
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div style={{ position: 'relative' }}>
      <ParticleBackground />

      {/* Header Banner */}
      <section className="section" style={{ paddingTop: '7rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <span className="section-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Case Showcase</span>
              <h1 style={{ fontSize: 'clamp(2rem, 4.2vw, 3.2rem)', lineHeight: '1.2', fontWeight: 700, marginBottom: '1.5rem' }}>
                Delivering High-Performance <span className="gradient-text">Applications</span>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '540px' }}>
                Browse through our portfolio of custom-engineered school management ERPs, automated CRMs, budgeting trackers, and business websites.
              </p>
            </div>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DropsHeaderVisual themeColor="pink" />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Filter Section */}
      <section className="section" style={{ padding: '2rem 0', zIndex: 10 }}>
        <div className="container">
          <div className="filters-container">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Showcase Grid */}
          <div className="portfolio-projects-list" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '3rem' }}>
            {filteredProjects.map((project, idx) => (
              <Tilt3D key={idx}>
                <div className="glass-card" data-cursor-text="View" style={{ padding: '0', overflow: 'hidden', height: '100%' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0' }} className="project-grid-row">
                    {/* Left Column - Graphic Placeholder */}
                    <div style={{ 
                      background: project.gradient, 
                      minHeight: '280px', 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      justifyContent: 'center',
                      padding: '2rem',
                      position: 'relative',
                      color: '#fff',
                      textAlign: 'center'
                    }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
                      <Layers size={48} style={{ zIndex: 1, marginBottom: '1rem', opacity: 0.8 }} />
                      <h3 style={{ fontSize: '1.6rem', fontWeight: 800, zIndex: 1, textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>{project.title}</h3>
                      <span style={{ 
                        background: 'rgba(255,255,255,0.2)', 
                        padding: '0.3rem 0.8rem', 
                        borderRadius: '50px', 
                        fontSize: '0.8rem', 
                        fontWeight: 600,
                        marginTop: '0.5rem',
                        zIndex: 1,
                        backdropFilter: 'blur(5px)'
                      }}>
                        {project.category}
                      </span>
                    </div>

                    {/* Right Column - Project Specifications */}
                    <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="project-details-pane">
                      <p style={{ fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                        {project.desc}
                      </p>

                      <h4 style={{ color: 'var(--text-main)', marginBottom: '0.8rem', fontSize: '1rem' }}>Key Deliverables:</h4>
                      <ul style={{ listStyle: 'none', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {project.features.map((feat, fIdx) => (
                          <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-main)' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {project.tech.map((t, tIdx) => (
                            <span key={tIdx} style={{ 
                              background: 'rgba(255,255,255,0.05)', 
                              border: '1px solid var(--border-glass)',
                              padding: '0.35rem 0.8rem', 
                              borderRadius: '4px', 
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              color: 'var(--text-main)'
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>

                        <Magnetic>
                          <button onClick={() => alert(`Navigating to Case Study of ${project.title}`)} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}>
                            Case Analysis <ExternalLink size={14} />
                          </button>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 992px) {
          .project-grid-row {
            grid-template-columns: 2fr 3fr !important;
          }
        }
        @media (max-width: 768px) {
          .project-details-pane {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
