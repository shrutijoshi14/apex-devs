import { Shield, Target, Compass, Code, Layout, Database, Wrench, Cpu } from 'lucide-react';
import DropsHeaderVisual from '../components/DropsHeaderVisual';
import Tilt3D from '../components/Tilt3D';

export default function About() {
  const techStack = [
    {
      category: "Frontend Development",
      icon: <Layout size={24} />,
      desc: "Modern responsive user interfaces built with industry-standard technologies to ensure speed, usability, and exceptional user experience.",
      items: ["HTML5", "CSS3/SCSS", "JavaScript", "React.js", "Vite"]
    },
    {
      category: "Backend Development",
      icon: <Code size={24} />,
      desc: "Scalable and secure application architecture designed to support business growth and operational efficiency.",
      items: ["Node.js", "Express.js", "REST APIs", "GSAP Animations"]
    },
    {
      category: "Database Solutions",
      icon: <Database size={24} />,
      desc: "Reliable data management systems that ensure performance, security, and seamless access to critical business information.",
      items: ["MySQL", "MongoDB", "Firebase Store", "IndexedDB"]
    },
    {
      category: "API Integration",
      icon: <Cpu size={24} />,
      desc: "Secure integration of third-party services and business platforms to streamline workflows and automate operations.",
      items: ["Stripe / PayPal", "Auth0 / JWT", "SendGrid", "Twilio API"]
    },
    {
      category: "Version Control & Deployment",
      icon: <Wrench size={24} />,
      desc: "Professional development workflows that ensure stability, maintainability, and efficient project delivery.",
      items: ["Git", "GitHub", "Nginx", "PM2 / Serverless"]
    }
  ];

  return (
    <div style={{ position: 'relative' }}>

      {/* Header Banner */}
      <section className="section" style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <span className="section-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Who We Are</span>
              <h1 style={{ fontSize: 'clamp(2rem, 4.2vw, 3rem)', lineHeight: '1.2', fontWeight: 700, marginBottom: '1.5rem' }}>
                Empowering Growth Through <span className="gradient-text">Premium Engineering</span>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '540px' }}>
                We specialize in creating modern websites and custom web applications that help businesses streamline operations and scale online.
              </p>
            </div>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DropsHeaderVisual themeColor="purple" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro & Values */}
      <section className="section" style={{ padding: '4rem 0', background: 'var(--gradient-dark)' }}>
        <div className="container">
          <div className="section-heading-container">
            <span className="section-tag">Our Philosophy</span>
            <h2 className="section-title">Mission & Vision</h2>
            <p className="section-desc">
              We are driven by a commitment to quality, building modern web experiences and highly optimized workflows.
            </p>
          </div>

          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            {/* Mission Card */}
            <Tilt3D style={{ display: 'flex' }}>
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div style={{ 
                    background: 'rgba(236, 72, 153, 0.1)', 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent)',
                    flexShrink: 0
                  }}>
                    <Target size={24} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontWeight: 700, margin: 0 }}>Our Mission</h2>
                </div>
                <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                  To deliver reliable, highly scalable, and user-friendly digital solutions that solve real business challenges and automate workflows. We strive to bring modern UX standards and clean architectures to businesses worldwide.
                </p>
              </div>
            </Tilt3D>

            {/* Vision Card */}
            <Tilt3D style={{ display: 'flex' }}>
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div style={{ 
                    background: 'rgba(6, 182, 212, 0.1)', 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-secondary)',
                    flexShrink: 0
                  }}>
                    <Compass size={24} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', fontWeight: 700, margin: 0 }}>Our Vision</h2>
                </div>
                <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                  To become a trusted global technology partner for businesses seeking digital transformation. We envision a future where organizations of all scales can operate seamlessly using smart, secure, and custom-tailored cloud software.
                </p>
              </div>
            </Tilt3D>
          </div>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="section">
        <div className="container">
          <div className="section-heading-container">
            <span className="section-tag">Engineering Focus</span>
            <h2 className="section-title">Professional Solutions</h2>
            <p className="section-desc">
              We design and construct client-ready systems engineered to optimize operations and support business growth.
            </p>
          </div>

          <div className="tech-solutions-grid">
            {techStack.map((tech, idx) => (
              <Tilt3D key={idx}>
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '2.5rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ 
                      background: 'rgba(139, 92, 246, 0.1)', 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      flexShrink: 0
                    }}>
                      {tech.icon}
                    </div>
                    <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', fontWeight: 700 }}>{tech.category}</h3>
                  </div>

                  <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                    {tech.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.8rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.2rem' }}>
                    {tech.items.map((item, i) => (
                      <span key={i} style={{ 
                        background: 'rgba(255,255,255,0.03)', 
                        border: '1px solid var(--border-glass)',
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '6px', 
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--text-main)'
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Philosophy */}
      <section className="section" style={{ background: 'var(--gradient-dark)', textAlign: 'center' }}>
        <div className="container">
          <Tilt3D>
            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', height: '100%' }}>
              <Shield size={48} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 700 }}>Strict Component Isolation & SaaS Architecture</h2>
              <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                We build using isolated components that act independently. This strict structure means updates to visual nodes, galleries, databases, or API routes never interfere with other site segments. We ensure the layout stands ready for future expansion into full SaaS structures.
              </p>
            </div>
          </Tilt3D>
        </div>
      </section>
    </div>
  );
}
