import { Link } from "react-router-dom";
import "./Landing.css";

const sample = `[{
  "id": 1,
  "title": "Wireless Headphones",
  "price": 59.99,
  "category": "electronics"
}]`;

export default function Landing() {
  return (
  <>
    <div className="landing-page">
      <header className="site-nav container">
        <Link className="brand" to="/">
          <span className="brand-mark">{`{ }`}</span> MockAPI Hub
        </Link>
        
        <nav>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </nav>
        
        <div className="nav-actions">
          <Link className="nav-signin" to="/signin">Sign in</Link>
          <Link className="btn" to="/signup">Get started 
            <span>↗</span>
          </Link>
        </div>
      </header>
    
      <main>
        <section className="hero container">
          <div className="hero-copy">
            <span className="eyebrow">YOUR DATA. YOUR API.</span>
            <h1>Turn your JSON into a <span>real API.</span></h1>
            <p className="hero-desc">Create instant REST API endpoints for your projects. Paste your JSON, get a URL, and start building — no backend setup needed.</p>
            
            <div className="hero-actions">
              <Link className="btn" to="/signup">Create your free API <span>→</span></Link>
              <a className="text-link" href="#how-it-works">See how it works ↓</a>
            </div>
            
            <div className="hero-note">
              <span className="check">✓</span> Simple setup 
              <span className="dot">·</span> Developer friendly 
              <span className="dot">·</span> Ready in seconds
            </div>
          </div>
    
        <div className="code-card">
          <div className="code-top">
            <div className="window-dots"><i /><i /><i />
            </div>
            <span>products.json</span>
            <span className="json-pill">JSON</span>
          </div>
          
          <pre>{sample}</pre>
          <div className="endpoint">
            <span className="method">GET</span>
            <span>../api/username/products</span>
            <span className="copy-icon">↗</span>
          </div>
          
          <div className="code-foot">
            <span className="status-dot" /> Your endpoint is ready to use
          </div>
        </div>
      </section>
    
      <section className="feature-strip container" id="features">
        <div><b>⚡ Instant endpoints</b>
          <span>Go from JSON to API in moments.</span>
        </div>
        <div><b>⌘ Developer-first</b>
          <span>Predictable REST-style URLs.</span>
        </div>
        <div><b>◈ Less setup</b>
          <span>Spend time building your app.</span>
        </div>
      </section>
    
        <section className="how-section" id="how-it-works">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">THREE SIMPLE STEPS</span>
              <h2>From sample data to API</h2>
              <p>Everything you need to test and prototype frontend projects.</p>
            </div>
            <div className="steps">
              <article>
                <span className="step-num">01</span>
                <h3>Paste your JSON</h3>
                <p>Bring an array or object with the sample data your app needs.</p>
              </article>
              <article>
                <span className="step-num">02</span>
                <h3>Create an endpoint</h3>
                <p>Give your collection a name and generate its API URL.</p>
              </article>
              <article>
                <span className="step-num">03</span>
                <h3>Build something great</h3>
                <p>Fetch your data from React, JavaScript, or any HTTP client.</p>
              </article>
            </div>
            
            <div className="bottom-cta">
              <div>
                <h2>Ready to build faster?</h2>
                <p>Your next prototype starts with one endpoint.</p>
              </div>
              <Link className="btn" to="/signup">Start for free →</Link>
            </div>
          </div>
        </section>
      </main>
    
      <footer className="site-footer container">
        <Link className="brand" to="/">
          <span className="brand-mark">{`{ }`}</span> 
          MockAPI Hub
        </Link>
        <span>Made for builders. Built for momentum.</span>
        <span>© 2026 MockAPI Hub</span>
      </footer>
    </div>;
  </>)
}
