import { useState } from 'react';
import { ExternalLink, Layers } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import DropsHeaderVisual from '../components/DropsHeaderVisual';
import Tilt3D from '../components/Tilt3D';
import Modal3D from '../components/Modal3D';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenProjectModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const categories = ['All', 'Websites', 'SaaS Applications', 'Automation & ERP'];

  const projects = [
    {
      title: "Code Insight Academy",
      category: "Websites",
      desc: "An advanced e-learning academy dashboard designed for programming courses, featuring video lectures, student progress metrics, and course certificates.",
      features: ["Interactive Lecture Viewer", "Secure Course Purchasing Ledger", "Automated Student Progress Metrics"],
      tech: ["React.js", "Node.js", "MongoDB", "Express.js"],
      gradient: "linear-gradient(135deg, #06b6d4, #10b981)",
      link: "https://codeinsightacademy.com"
    },
    {
      title: "PIB Insurance",
      category: "Websites",
      desc: "A responsive portal for premium insurance agents. Features policy calculators, customer document upload engines, and agent dashboard grids.",
      features: ["Dynamic Policy Premium Calculator", "Secure Document Upload Portals", "Agent Performance Tracking Graphs"],
      tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      gradient: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
      link: "https://pibinsurance.in"
    },
    {
      title: "GP Sheledadhare",
      category: "Websites",
      desc: "Official citizen portal and administrative website for Gram Panchayat Sheledadhare, facilitating digital certificate queries and village notifications.",
      features: ["Certificate Request Dashboard", "Village Development Notifications", "Public Grievance Submission Forms"],
      tech: ["React.js", "Vite", "Vanilla CSS", "REST APIs"],
      gradient: "linear-gradient(135deg, #ef4444, #f59e0b)",
      link: "https://gpsheledadhare.co.in"
    },
    {
      title: "AIpreneur",
      category: "Websites",
      desc: "An advanced business landing page and community portal built for AI entrepreneurs. Featuring neon glassmorphism UI layouts and interactive calculators.",
      features: ["Interactive Startup Cost Calculator", "Secure Subscriber Database", "Modern Glassmorphic Visuals"],
      tech: ["React.js", "GSAP ScrollTrigger", "Lenis Scroll", "CSS3"],
      gradient: "linear-gradient(135deg, #6366f1, #d946ef)",
      link: "https://shrutijoshi14.github.io/aipreneur/"
    },
    {
      title: "Personal Portfolio",
      category: "Websites",
      desc: "A visually striking developer showcase website featuring smooth custom cursor trails, SVG micro-animations, and dynamic visual grids.",
      features: ["Custom Cursor Trail & Sparks", "Responsive Case Study Modals", "Optimized Fluid Layouts"],
      tech: ["React.js", "Vite", "GSAP Animations", "CSS Modules"],
      gradient: "linear-gradient(135deg, #ec4899, #f59e0b)",
      link: "https://shrutijoshi14.github.io/personal-portfolio/"
    },
    {
      title: "Apex Devs Website",
      category: "Websites",
      desc: "The next-generation agency landing page for Apex Devs, displaying service offerings, interactive cost estimators, and AI clone assistants.",
      features: ["AI Chatbot Widget Integration", "3D Interactive Hero Canvas", "Flexible Price Calculators"],
      tech: ["React.js", "Three.js", "GSAP Animations", "Vite"],
      gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      link: "https://shrutijoshi14.github.io/apex-devs/"
    },
    {
      title: "Institute Hub",
      category: "Automation & ERP",
      desc: "An all-in-one administrative hub designed to streamline operations for schools and colleges, managing student databases, admissions, fees, and enquiries.",
      features: ["Comprehensive Student Database Ledger", "Interactive Invoicing and Inbound Fees Tracker", "Query Scoping and Ticket Escalation System"],
      tech: ["React.js", "Express.js", "MySQL Database", "Bootstrap"],
      gradient: "linear-gradient(135deg, #ef4444, #ec4899)",
      link: "https://institute-hub-2.onrender.com",
      inquiryLink: "https://institute-hub-2.onrender.com/enquiry"
    },
    {
      title: "SPF Invoicing Portal",
      category: "Automation & ERP",
      desc: "A custom ERP portal designed for small businesses to automate bill generations, track tax rates, manage inventory databases, and export PDF statements.",
      features: ["One-Click PDF Invoice Generator", "Automated Tax Calculation Engine", "Client Statement Mailing System"],
      tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Redux"],
      gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
      link: "http://spf.zazpu.in"
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div style={{ position: 'relative' }}>

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
                Browse through our portfolio of custom-built school management ERPs, automated CRMs, budgeting trackers, and business websites.
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

                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                          <Magnetic>
                            <button onClick={() => handleOpenProjectModal(project)} className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}>
                              Case Analysis
                            </button>
                          </Magnetic>
                          {project.link && (
                            <Magnetic>
                              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                                Visit Live <ExternalLink size={14} />
                              </a>
                            </Magnetic>
                          )}
                          {project.inquiryLink && (
                            <Magnetic>
                              <a href={project.inquiryLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', background: 'transparent', border: '1px solid var(--color-secondary)', color: 'var(--color-secondary)' }}>
                                Inquiry Form <ExternalLink size={14} />
                              </a>
                            </Magnetic>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <Modal3D
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedProject.title}
          subtitle={selectedProject.category}
          content={`${selectedProject.desc}\n\nProject Architecture & Core Deliverables:\n• ${selectedProject.features.join('\n• ')}`}
          tags={selectedProject.tech}
          gradient={selectedProject.gradient}
        />
      )}

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
