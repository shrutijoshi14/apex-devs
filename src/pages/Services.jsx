import { useState } from 'react';
import { 
  Globe, Database, Cpu, Laptop, ShoppingBag, ShieldAlert, 
  HelpCircle, CheckCircle, ArrowRight, Brain, Zap, MessageSquare, 
  Video, Sparkles, Search, Share2, Users, Mail, Palette, FileText, Server, Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Magnetic from '../components/Magnetic';
import DropsHeaderVisual from '../components/DropsHeaderVisual';
import Tilt3D from '../components/Tilt3D';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("web-dev");

  const serviceCategories = [
    {
      id: "web-dev",
      title: "Web & App Development",
      description: "Scalable, secure, and fast websites and software architectures designed to capture value.",
      services: [
        {
          icon: <Globe size={28} />,
          title: "Business Websites",
          subtitle: "Corporate Presence & Lead Capture",
          desc: "We engineer pixel-perfect, SEO-ready corporate websites that project authority, validate customer trust, and generate inbound leads.",
          features: ["Mobile-first Responsive Design", "Search Engine Optimization (SEO)", "CMS Integration (headless/custom)"],
          tech: ["React.js", "Vite", "HTML5/CSS3", "Framer Motion"]
        },
        {
          icon: <ShoppingBag size={28} />,
          title: "E-Commerce Solutions",
          subtitle: "Global Online Marketplaces",
          desc: "Start selling your products globally. We deliver secure, fast online storefronts with inventory tracking, cart recovery, and payment integrations.",
          features: ["Stripe & Local Payment Gateways", "Dynamic Inventory Management", "Coupon & Promotion Engines"],
          tech: ["React.js", "Redux Toolkit", "Node.js", "MongoDB"]
        },
        {
          icon: <Laptop size={28} />,
          title: "Custom Web Applications",
          subtitle: "Tailored Business Software",
          desc: "Have a unique business model? We build bespoke cloud-based applications engineered to solve operational bottlenecks and automate workflows.",
          features: ["Cloud Scalable Architecture", "Custom Dashboard Analytics", "Real-time Synchronization"],
          tech: ["React.js", "Node.js", "Express", "REST APIs"]
        },
        {
          icon: <Database size={28} />,
          title: "CRM, ERP & LMS Systems",
          subtitle: "Enterprise Workflow Management",
          desc: "Gain complete control over operations. We build customized internal tools for lead tracking, classes, sales pipelines, and HR workflows.",
          features: ["Custom Sales Pipeline Boards", "Automated Email/SMS Alerts", "Granular Role-based Access Control"],
          tech: ["React.js", "Node.js", "PostgreSQL", "Auth0"]
        },
        {
          icon: <Smartphone size={28} />,
          title: "Mobile App Development",
          subtitle: "Native iOS & Android Apps",
          desc: "Extend your business footprint. We build high-performance mobile companion apps with push notifications and offline data capabilities.",
          features: ["Cross-platform React Native code", "Biometric Authentication", "Push Notification Campaigns"],
          tech: ["React Native", "Expo", "Firebase", "Node.js"]
        }
      ]
    },
    {
      id: "ai-automation",
      title: "AI & Automation Solutions",
      description: "Intelligent cognitive integrations, AI assistants, and automated communication tools to multiply productivity.",
      services: [
        {
          icon: <Brain size={28} />,
          title: "Custom Business GPTs",
          subtitle: "Proprietary Knowledge Bases",
          desc: "Train AI assistants on your proprietary files, documents, and business guidelines to handle internal queries or customer support.",
          features: ["Custom Knowledge Training", "Secure Data Privacy Standards", "Multi-role Access Control"],
          tech: ["OpenAI API", "Pinecone Vector DB", "LangChain", "Python"]
        },
        {
          icon: <Zap size={28} />,
          title: "Custom AI Agents",
          subtitle: "Goal-Oriented Autonomous Actions",
          desc: "Deploy autonomous workflows that trigger emails, qualify inbound leads, schedule sales calls, and process documents 24/7.",
          features: ["Continuous Lead Qualification", "Multi-tool API Hookups", "Automated Task Executions"],
          tech: ["n8n / Make", "LangGraph", "Node.js", "OpenAI Assistant"]
        },
        {
          icon: <MessageSquare size={28} />,
          title: "WhatsApp CRM & Bulk Sender",
          subtitle: "Official Messaging Workflows",
          desc: "Unify user messages into a custom dashboard. Automate notification broadcasts, reply flows, and capture structured leads in chats.",
          features: ["Official WhatsApp Business API", "Bulk Campaign Senders", "Structured Chat Capture Forms"],
          tech: ["WhatsApp API", "Node.js", "MongoDB", "Webhook Engines"]
        },
        {
          icon: <Video size={28} />,
          title: "AI Avatar Videos",
          subtitle: "Synthetic Marketing Collaterals",
          desc: "Generate professional talking-head videos and voice clones at scale without expensive recording sets or hiring actors.",
          features: ["High-Definition Avatar Rendering", "Voice Cloning Integration", "Automated Video Scripting"],
          tech: ["HeyGen API", "ElevenLabs", "OpenAI GPT-4", "Python"]
        },
        {
          icon: <Sparkles size={28} />,
          title: "Google Gemini Integrations",
          subtitle: "Next-gen Multi-modal Capabilities",
          desc: "Incorporate advanced vision and reasoning features into your software to analyze images, scan PDFs, and process structured audio data.",
          features: ["Multi-modal Data Extraction", "Document Scanning Pipelines", "Semantic Search Engines"],
          tech: ["Gemini API", "Google Cloud", "React.js", "Python"]
        }
      ]
    },
    {
      id: "marketing",
      title: "Digital Growth & Marketing",
      description: "Data-driven organic search engine positioning and paid advertising strategies to scale your sales funnel.",
      services: [
        {
          icon: <Search size={28} />,
          title: "Search Engine Optimization (SEO)",
          subtitle: "Permanent Organic Traffic Channels",
          desc: "Establish search engine authority. We map high-intent search queries, optimize page loading speeds, and build clean semantic site markups.",
          features: ["On-page Technical Audits", "Keyword Mapping Strategies", "High-quality Link Profile Strategy"],
          tech: ["Google Search Console", "Ahrefs / Semrush", "Next.js SEO", "HTML5 Schema"]
        },
        {
          icon: <Share2 size={28} />,
          title: "Meta & Google Ads",
          subtitle: "High-ROI Paid Advertising",
          desc: "Launch demographic and intent targeting ad campaigns. We construct creative assets, write ad copy, and set up conversion tracking pixels.",
          features: ["Meta Pixel & GTM Configs", "A/B Creative Split Testing", "Retargeting Display Funnels"],
          tech: ["Google Tag Manager", "Meta Ads Manager", "Google Analytics", "Looker Studio"]
        },
        {
          icon: <Users size={28} />,
          title: "Social Media Growth Platforms",
          subtitle: "Community Engagement & Curation",
          desc: "Build an active online brand profile. We design social templates, generate content calendars, and schedule media campaigns.",
          features: ["Automated Post Schedulers", "Visual Template Kits", "Brand Engagement Analytics"],
          tech: ["Figma", "Buffer / Hootsuite", "Meta Suite", "Canva Pro"]
        },
        {
          icon: <Mail size={28} />,
          title: "Email & Lead Generation Funnels",
          subtitle: "Automated Lead Nurturing",
          desc: "Connect capture landing pages to smart lead scoring and automated drip campaigns that move prospects to booked client calls.",
          features: ["Smart Form Conversions", "Automated Drip Sequences", "List Cleaning & SPAM Shields"],
          tech: ["Mailchimp / HubSpot", "Brevo", "Zapier", "Tailwind CSS"]
        }
      ]
    },
    {
      id: "branding-infra",
      title: "Branding & Infrastructure",
      description: "Visual guidelines, brand assets, fast cloud servers, and continuous support to secure your operations.",
      services: [
        {
          icon: <Palette size={28} />,
          title: "Logo & Corporate Identity",
          subtitle: "Memorable Visual Branding",
          desc: "Establish a striking visual presence. We design custom logotypes, set matching brand color guidelines, and establish typography rules.",
          features: ["Vector Logo Master Files", "Corporate Typography Specs", "Cohesive Color Palette Rules"],
          tech: ["Figma", "Adobe Illustrator", "Vector assets"]
        },
        {
          icon: <FileText size={28} />,
          title: "Decks & Brochure Design",
          subtitle: "High-converting Print & PDF Materials",
          desc: "Arm your sales team with premium print and PDF assets. We design high-end pitch decks, client brochures, and company sheets.",
          features: ["Investor Pitch Deck Layouts", "Multi-page Service Brochures", "Print-ready Crop & Bleed Files"],
          tech: ["InDesign", "Illustrator", "PowerPoint"]
        },
        {
          icon: <Server size={28} />,
          title: "Cloud Infrastructure & Hosting",
          subtitle: "99.9% Uptime & Dynamic SSL",
          desc: "Secure your deployment. We set up isolated, auto-scaling cloud servers with automated daily database backups and domain mappings.",
          features: ["Automatic Daily Backups", "Dynamic SSL Encryption Keys", "CDN Asset Delivery Networks"],
          tech: ["AWS / DigitalOcean", "Cloudflare", "Nginx", "Linux Server"]
        },
        {
          icon: <Cpu size={28} />,
          title: "Maintenance & Support SLA",
          subtitle: "Proactive Software Updates",
          desc: "Keep your applications secure and fast. We perform monthly library version upgrades, cloud load optimization, and offer priority developer hours.",
          features: ["24/7 Priority Emergency Help", "Database Health Inspections", "Vulnerability Security Audits"],
          tech: ["Git / GitHub", "AWS Cloudwatch", "Nginx", "PM2"]
        }
      ]
    }
  ];

  const activeCategoryData = serviceCategories.find(c => c.id === activeCategory) || serviceCategories[0];

  return (
    <div style={{ position: 'relative' }}>

      {/* Header Banner */}
      <section className="section" style={{ paddingTop: '7rem', paddingBottom: '3.5rem' }}>
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

      {/* Tab Switcher Area */}
      <section style={{ padding: '2rem 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="tabs-container">
            {serviceCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
            <p className="active-tagline" style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              &ldquo;{activeCategoryData.description}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="section" style={{ background: 'var(--gradient-dark)', paddingTop: '2rem' }}>
        <div className="container">
          <div key={activeCategory} className="detailed-services-list">
            {activeCategoryData.services.map((service, idx) => (
              <Tilt3D key={idx}>
                <div className="glass-card service-detail-row" style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  borderTop: idx % 2 === 0 ? '4px solid var(--color-primary)' : '4px solid var(--color-secondary)'
                }}>
                  <div>
                    {/* Header: Icon & Title */}
                    <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ 
                        background: idx % 2 === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(6, 182, 212, 0.1)', 
                        width: '56px', 
                        height: '56px', 
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: idx % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
                        flexShrink: 0
                      }}>
                        {service.icon}
                      </div>
                      <div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {service.subtitle}
                        </span>
                        <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: '0.1rem 0 0 0', fontWeight: 700 }}>
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                      {service.desc}
                    </p>

                    {/* Features checklist */}
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                          <CheckCircle size={15} style={{ color: idx % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)', flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Badges at the bottom */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '1.2rem' }}>
                    {service.tech.map((t, tIdx) => (
                      <span key={tIdx} style={{ 
                        background: 'rgba(255,255,255,0.03)', 
                        border: '1px solid var(--border-glass)',
                        padding: '0.25rem 0.6rem', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--text-main)'
                      }}>
                        {t}
                      </span>
                    ))}
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
                We design scalable cloud services, integrate neural language models, setup communication APIs, and construct school management ERP tools.
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
        .tabs-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          max-width: 900px;
          margin: 0 auto;
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
        .detailed-services-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .detailed-services-list {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .tab-btn {
            font-size: 0.82rem;
            padding: 0.6rem 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
