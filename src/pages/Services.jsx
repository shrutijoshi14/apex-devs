import { 
  Globe, Database, Cpu, Laptop, ShoppingBag, ShieldAlert, 
  HelpCircle, CheckCircle, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import Magnetic from '../components/Magnetic';
import DropsHeaderVisual from '../components/DropsHeaderVisual';
import Tilt3D from '../components/Tilt3D';

export default function Services() {
  const detailedServices = [
    {
      icon: <Globe size={28} />,
      title: "Website Development",
      subtitle: "Professional responsive websites",
      desc: "We engineer responsive, SEO-ready websites designed to capture audience attention and convert visitors into clients. Built with pixel-perfect layouts matching modern UI/UX guidelines.",
      features: ["Search Engine Optimization (SEO)", "CMS Integration (headless/custom)", "Responsive Mobile-first Design"],
      tech: ["HTML5", "CSS3/SCSS", "React.js", "Vite"]
    },
    {
      icon: <Database size={28} />,
      title: "CRM Development",
      subtitle: "Lead management and workflow automation",
      desc: "Gain complete visibility over your customer lifecycle. We build custom-tailored CRMs featuring automated lead tracking, support ticket queues, and communication channels.",
      features: ["Custom Sales Pipeline Boards", "Automated Email/SMS Notifications", "Granular Role-based Access Control"],
      tech: ["React.js", "Node.js", "MongoDB", "Auth0"]
    },
    {
      icon: <Cpu size={28} />,
      title: "Institute Management Systems",
      subtitle: "Admissions, fees, attendance, examinations, reports",
      desc: "All-in-one ERP suite customized for schools, colleges, and training institutes to automate admin work, class schedules, exams scoring, and fees collection.",
      features: ["Student & Staff Portals", "Fee Collection & Invoicing Modules", "Automated Progress Report Generators"],
      tech: ["React.js", "Express.js", "MySQL", "ChartJS"]
    },
    {
      icon: <Laptop size={28} />,
      title: "Custom Web Applications",
      subtitle: "Tailored business solutions",
      desc: "Have a unique business model? We build bespoke cloud-based applications engineered to solve specific operational bottlenecks and streamline daily task workflows.",
      features: ["Cloud Scalable Architecture", "Custom Dashboard Analytics", "Real-time Synchronization"],
      tech: ["React.js", "Node.js", "Express", "REST APIs"]
    },
    {
      icon: <ShoppingBag size={28} />,
      title: "E-Commerce Solutions",
      subtitle: "Online stores and payment integration",
      desc: "Start selling your products globally. We deliver secure, fast e-commerce setups with inventory management, cart recovery tools, and payment integrations.",
      features: ["Stripe / PayPal Gateways", "Dynamic Inventory Trackers", "Coupon & Promotion Engines"],
      tech: ["React.js", "Redux Toolkit", "MongoDB", "Node.js"]
    },
    {
      icon: <ShieldAlert size={28} />,
      title: "API Development & Integration",
      subtitle: "REST APIs and third-party integrations",
      desc: "Unify your digital ecosystem. We write robust RESTful APIs and connect your core systems with external tools like Stripe, Twilio, Salesforce, or shipping systems.",
      features: ["Secure Token Authentication", "Rate Limiting & Threat Shielding", "Detailed API Documentation"],
      tech: ["Node.js", "Express", "Postman", "Swagger"]
    },
    {
      icon: <HelpCircle size={28} />,
      title: "Maintenance & Support",
      subtitle: "Continuous updates and technical support",
      desc: "Keep your applications running smoothly. We provide monthly software updates, cloud server optimization, security audits, and developer support.",
      features: ["Daily Database Backups", "SSL & Domain Health Monitoring", "24/7 Priority Emergency Support"],
      tech: ["Git/GitHub", "AWS Cloudwatch", "Nginx", "PM2"]
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <ParticleBackground />

      {/* Header Banner */}
      <section className="section" style={{ paddingTop: '7rem', paddingBottom: '4.5rem' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <span className="section-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Our Capabilities</span>
              <h1 style={{ fontSize: 'clamp(2rem, 4.2vw, 3.2rem)', lineHeight: '1.2', fontWeight: 700, marginBottom: '1.5rem' }}>
                Bespoke Solutions, <span className="gradient-text">Zero Compromises</span>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '540px' }}>
                Explore our professional services and discover how custom web engineering can automate operations and boost your bottom line.
              </p>
            </div>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DropsHeaderVisual themeColor="cyan" />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="section" style={{ background: 'var(--gradient-dark)' }}>
        <div className="container">
          <div className="detailed-services-list" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {detailedServices.map((service, idx) => (
              <Tilt3D key={idx}>
                <div className="glass-card service-detail-row" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr', 
                  gap: '2rem',
                  height: '100%',
                  borderLeft: idx % 2 === 0 ? '4px solid var(--color-primary)' : '4px solid var(--color-secondary)'
                }}>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {/* Icon */}
                    <div style={{ 
                      background: idx % 2 === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(6, 182, 212, 0.1)', 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: idx % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
                      flexShrink: 0
                    }}>
                      {service.icon}
                    </div>
                    
                    {/* Text Details */}
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>{service.subtitle}</span>
                      <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '0.3rem 0 1rem 0' }}>{service.title}</h2>
                      <p style={{ fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>{service.desc}</p>
                      
                      {/* Features list */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <CheckCircle size={16} style={{ color: idx % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>{feat}</span>
                          </div>
                        ))}
                      </div>
  
                      {/* Tech Badges */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Tech Stack:</span>
                        {service.tech.map((t, tIdx) => (
                          <span key={tIdx} style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            border: '1px solid var(--border-glass)',
                            padding: '0.35rem 0.8rem', 
                            borderRadius: '4px', 
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--text-main)'
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>
  
      {/* CTA section */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <Tilt3D>
            <div className="glass-card" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', height: '100%' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Need a Custom Integration or SaaS Setup?</h2>
              <p style={{ marginBottom: '2.5rem', maxWidth: '560px', margin: '0 auto 2rem auto' }}>
                We design scalable cloud services and integrate third-party payment gateways, CRMs, and school management ERP tools.
              </p>
              <Magnetic>
                <Link to="/contact" className="btn btn-primary">
                  Book Consultation <ArrowRight size={16} />
                </Link>
              </Magnetic>
            </div>
          </Tilt3D>
        </div>
      </section>

      <style>{`
        .service-detail-row {
          padding: 3rem !important;
        }
        @media (max-width: 768px) {
          .service-detail-row {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
