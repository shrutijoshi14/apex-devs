import { useState } from 'react';
import { Award, CheckCircle } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import DropsHeaderVisual from '../components/DropsHeaderVisual';
import Tilt3D from '../components/Tilt3D';

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState(0);

  const cases = [
    {
      title: "Institute Management ERP",
      client: "Apex Academy (Enrollment: 1200+ Students)",
      problem: "The academy was relying on disconnected Excel spreadsheets and paper logs for student registrations, fee collection reminders, course scheduling, and grading cards. This led to massive operational delays, high administrative costs, and recurring errors in tuition calculations.",
      solution: "We designed and launched a full-scale web-based Institute Management System. It links student profiles directly to active courses, automatically calculates fee installments with email invoice generation, provides attendance trackers, and hosts self-service portals for teachers and students.",
      tech: ["React.js", "Node.js (Express)", "MySQL", "Chart.js Analytics", "Nginx"],
      results: [
        "90% reduction in student registration processing times.",
        "Zero invoicing errors and automatic reminders sent to parents daily.",
        "Saved 24+ administrative hours per week in database maintenance."
      ],
      metrics: [
        { label: "Admin Speedup", value: "90%" },
        { label: "Hours Saved / Wk", value: "24" },
        { label: "Error Rate", value: "0%" }
      ],
      gradient: "linear-gradient(135deg, #8b5cf6, #3b82f6)"
    },
    {
      title: "SaaS CRM Integration",
      client: "QuickCommerce Ltd (Retail Hub)",
      problem: "The sales team was losing track of leads due to a lack of automated queues. Customer communications took place on disconnected individual accounts, causing a massive drop in support ticket resolution speeds and cold lead follow-ups.",
      solution: "We built a bespoke CRM Solution incorporating automated pipelines, lead queues, email triggers, and chat histories. It integrates lead forms directly from the company website, automatically assigns new leads, and displays interactive sales velocity charts for management.",
      tech: ["React.js", "Redux", "Express.js", "MongoDB", "SendGrid API"],
      results: [
        "Sales lead response time reduced from 12 hours to 10 minutes.",
        "Monthly lead conversion speed increased by 35% within 60 days.",
        "Centralized support communications, boosting SLA resolution rates.",
        "Sales velocity tracking enabled transparent monthly forecasts."
      ],
      metrics: [
        { label: "Response Speed", value: "10m" },
        { label: "Conversion Lift", value: "35%" },
        { label: "SLA Resolution", value: "99%" }
      ],
      gradient: "linear-gradient(135deg, #06b6d4, #10b981)"
    },
    {
      title: "Finance Budget Planner",
      client: "FinGrowth Systems (Internal Tool)",
      problem: "Internal project budgeting was slow and prone to errors. Teams were creating overlapping expense logs on isolated spreadsheets, making it impossible for managers to get real-time cost indicators or alert triggers for project budget boundaries.",
      solution: "We developed a centralized Personal and Project Budget Planner. This secure web application charts active project balances, files costs by custom categories, alerts project managers of budget boundaries, and exports analytical charts.",
      tech: ["React.js", "Vanilla CSS Modules", "LocalStorage", "REST APIs", "Bootstrap"],
      results: [
        "Complete real-time budget visibility across all active projects.",
        "Over-budget incidents decreased to 0% due to automated threshold alerts.",
        "Expense report processing time dropped from 3 days to 5 minutes."
      ],
      metrics: [
        { label: "Visibility", value: "100%" },
        { label: "Over-budgets", value: "0%" },
        { label: "Reporting Speed", value: "5m" }
      ],
      gradient: "linear-gradient(135deg, #ec4899, #f59e0b)"
    }
  ];

  const currentCase = cases[activeTab];

  return (
    <div style={{ position: 'relative' }}>
      <ParticleBackground />

      {/* Header Banner */}
      <section className="section" style={{ paddingTop: '7rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <span className="section-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Case Analyses</span>
              <h1 style={{ fontSize: 'clamp(2rem, 4.2vw, 3.2rem)', lineHeight: '1.2', fontWeight: 700, marginBottom: '1.5rem' }}>
                Proven Results, <span className="gradient-text">Measurable Impact</span>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '540px' }}>
                Read detailed breakdowns of how our custom architectures resolved core operational bottlenecks and accelerated business performance.
              </p>
            </div>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DropsHeaderVisual themeColor="pink" />
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed Case Navigation */}
      <section className="section" style={{ padding: '2rem 0', background: 'var(--gradient-dark)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginBottom: '4rem', 
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--border-glass)',
            paddingBottom: '1.5rem'
          }}>
            {cases.map((c, idx) => (
              <button
                key={idx}
                className={`filter-btn ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
                style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Active Case Study Details */}
          <Tilt3D>
            <div className="glass-card case-study-card" style={{ padding: '3rem', height: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="case-study-grid">
                
                {/* Left Column: Details */}
                <div>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>Active Case Study</span>
                  <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)', margin: '0.5rem 0 0.2rem 0' }}>{currentCase.title}</h2>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--color-secondary)', fontWeight: 500, marginBottom: '2.5rem' }}>{currentCase.client}</h3>
                  
                  {/* Challenge */}
                  <div style={{ marginBottom: '2.5rem' }}>
                    <h4 style={{ color: 'var(--text-main)', marginBottom: '0.8rem', fontSize: '1.2rem' }}>The Operational Challenge:</h4>
                    <p style={{ fontSize: '1.02rem', lineHeight: '1.7' }}>{currentCase.problem}</p>
                  </div>
  
                  {/* Solution */}
                  <div style={{ marginBottom: '2.5rem' }}>
                    <h4 style={{ color: 'var(--text-main)', marginBottom: '0.8rem', fontSize: '1.2rem' }}>The Solution Delivered:</h4>
                    <p style={{ fontSize: '1.02rem', lineHeight: '1.7' }}>{currentCase.solution}</p>
                  </div>
  
                  {/* Tech Stack used */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.1rem' }}>Technologies Deployed:</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {currentCase.tech.map((t, idx) => (
                        <span key={idx} style={{ 
                          background: 'rgba(255,255,255,0.05)', 
                          border: '1px solid var(--border-glass)',
                          padding: '0.4rem 0.9rem', 
                          borderRadius: '4px', 
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: 'var(--text-main)'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
  
                {/* Right Column: Outcomes & Metrics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', justifyContent: 'center' }}>
                  {/* Metrics Box */}
                  <div style={{ 
                    background: currentCase.gradient,
                    borderRadius: '16px',
                    padding: '2.5rem 2rem',
                    color: '#fff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                    textAlign: 'center'
                  }} className="metrics-box">
                    {currentCase.metrics.map((m, idx) => (
                      <div key={idx}>
                        <span style={{ fontSize: '2.2rem', fontWeight: 800, display: 'block', textShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>{m.value}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</span>
                      </div>
                    ))}
                  </div>
  
                  {/* Measurable Results */}
                  <div className="glass" style={{ borderRadius: '16px', padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                      <Award size={24} style={{ color: 'var(--color-secondary)' }} />
                      <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem', margin: 0 }}>Verified Outcomes:</h4>
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {currentCase.results.map((res, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                          <CheckCircle size={18} style={{ color: 'var(--color-secondary)', flexShrink: 0, marginTop: '2px' }} />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
  
              </div>
            </div>
          </Tilt3D>
        </div>
      </section>

      <style>{`
        .case-study-card {
          padding: 4rem !important;
        }
        @media (min-width: 992px) {
          .case-study-grid {
            grid-template-columns: 3fr 2fr !important;
          }
        }
        @media (max-width: 768px) {
          .case-study-card {
            padding: 1.5rem !important;
          }
          .metrics-box {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
