import { useState } from 'react';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import DropsHeaderVisual from '../components/DropsHeaderVisual';
import Tilt3D from '../components/Tilt3D';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Web Development', 'CRM Solutions', 'Business Automation', 'Website Design', 'Technology Trends'];

  const articles = [
    {
      title: "How Custom CRMs Automate Client Pipelines",
      category: "CRM Solutions",
      date: "June 12, 2026",
      author: "Apex Devs Team",
      snippet: "Discover how moving away from spreadsheets to dedicated, automated CRM dashboards can increase your sales response time and deal conversion speeds.",
      gradient: "linear-gradient(135deg, #06b6d4, #10b981)"
    },
    {
      title: "School ERP System Design Guidelines",
      category: "Business Automation",
      date: "May 28, 2026",
      author: "Apex Devs Team",
      snippet: "Developing software for academic institutes requires careful planning around database normalization, role permissions, and invoicing systems.",
      gradient: "linear-gradient(135deg, #8b5cf6, #3b82f6)"
    },
    {
      title: "Leveraging React for Ultra-Fast Landing Pages",
      category: "Web Development",
      date: "April 15, 2026",
      author: "Apex Devs Team",
      snippet: "Web performance affects SEO rankings. We analyze codebase splitting, image format compression, and rendering optimization strategies.",
      gradient: "linear-gradient(135deg, #ec4899, #f59e0b)"
    },
    {
      title: "Design Aesthetics for Tech Companies",
      category: "Website Design",
      date: "March 10, 2026",
      author: "Apex Design Team",
      snippet: "A look into modern CSS glassmorphism, dark visual layers, neon accents, and smooth GSAP layouts that help your site feel premium and professional.",
      gradient: "linear-gradient(135deg, #6366f1, #d946ef)"
    },
    {
      title: "Key Technology Trends in Web Architecture",
      category: "Technology Trends",
      date: "February 22, 2026",
      author: "Apex Tech Labs",
      snippet: "Explore serverless functions, database clustering, GraphQL gateways, and why edge rendering frameworks are shaping the SaaS landscape.",
      gradient: "linear-gradient(135deg, #ef4444, #ec4899)"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ position: 'relative' }}>

      {/* Header Banner */}
      <section className="section" style={{ paddingTop: '7rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <span className="section-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Company Journal</span>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: '1.2', fontWeight: 700, marginBottom: '1.5rem' }}>
                Insights on <span className="gradient-text">Web Development</span>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '540px' }}>
                We share technical guides on building scalable SaaS backends, design rules for conversion layouts, and ERP system audits.
              </p>
            </div>
            <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DropsHeaderVisual themeColor="purple" />
            </div>
          </div>
        </div>
      </section>

      {/* Search & Category Filter Section */}
      <section className="section" style={{ padding: '2rem 0', background: 'var(--gradient-dark)' }}>
        <div className="container">
          
          {/* Search bar */}
          <div style={{ maxWidth: '500px', margin: '0 auto 3rem auto', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '3rem', width: '100%', borderRadius: '50px' }}
              aria-label="Search articles input"
            />
          </div>

          {/* Categories */}
          <div className="filters-container" style={{ marginBottom: '4rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                style={{ fontSize: '0.88rem', padding: '0.5rem 1.2rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Listing Grid */}
          <div className="blog-grid-layout">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, idx) => (
                <Tilt3D key={idx} style={{ display: 'flex', height: '100%' }}>
                  <article className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden', height: '100%', width: '100%' }}>
                  {/* Article Thumbnail */}
                  <div style={{ 
                    background: article.gradient, 
                    height: '180px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#fff',
                    position: 'relative'
                  }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
                    <span style={{ 
                      fontSize: '0.8rem', 
                      background: 'rgba(0,0,0,0.4)', 
                      padding: '0.3rem 0.8rem', 
                      borderRadius: '50px',
                      fontWeight: 600,
                      zIndex: 1,
                      backdropFilter: 'blur(4px)'
                    }}>
                      {article.category}
                    </span>
                  </div>

                  {/* Article Text Content */}
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Meta details */}
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Calendar size={12} /> {article.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <User size={12} /> {article.author}
                        </span>
                      </div>
                      
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.3' }}>
                        {article.title}
                      </h3>
                      
                      <p style={{ fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        {article.snippet}
                      </p>
                    </div>

                    <Magnetic>
                      <button 
                        onClick={() => alert(`Redirecting to: ${article.title}`)} 
                        className="btn btn-secondary" 
                        style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        Read Full Article <ArrowRight size={12} />
                      </button>
                    </Magnetic>
                  </div>
                </article>
              </Tilt3D>
            ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 0' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>No articles found matching your criteria.</p>
              </div>
            )}
          </div>

        </div>
      </section>
      
      <style>{`
        .blog-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
          gap: 2rem !important;
        }
      `}</style>
    </div>
  );
}
