import { useEffect } from 'react'
import { useUIStore } from './store'
import { TerminalTypewriter } from './components/TerminalTypewriter'
import { TAB_CONTENT, WORKBENCH_METADATA } from './components/terminalData'
import type { Pillar, Instrument, CaseStudy, ArchitectProfile } from './schemas'

import './App.css'

import { Moon, Sun1 } from 'iconsax-reactjs'

import logoImg from './assets/logo.png'
import logoDarkImg from './assets/logo-dark.png'
import logoIcon from './assets/logo-icon-only.png'
import heroImg from './assets/hero.png'

import FadeInEffect from './animations/AnimatedFadeIn'
import AnimatedPresenceWrapper from './animations/AnimatedPresenceWrapper'
import ScrollReveal from './animations/ScrollReveal'
import SlideInEffect from './animations/AnimatedSlideIn'

const PILLARS: Pillar[] = [
  {
    nodeId: '01_CL',
    title: 'Code as Digital Luthiery',
    subtitle: 'TACTILE PRECISION & CLEAN ARCHITECTURE',
    description: 'We carve software the way a master luthier shapes tone wood. Built with Clean & Hexagonal Architecture so domain logic remains durable, responsive, and timeless.',
    icon: 'hub',
  },
  {
    nodeId: '02_NI',
    title: 'Non-Intrusive Intelligence',
    subtitle: 'THE COLLABORATIVE MUSE',
    description: 'We reject synthetic systems that replace human expression. Our AI layers illuminate context, uncover structural patterns, and organize research while keeping the author\'s voice sovereign.',
    icon: 'neurology',
  },
  {
    nodeId: '03_DF',
    title: 'Deterministic Foundations',
    subtitle: 'SYSTEMS OVER HYPE',
    description: 'AI models are non-deterministic; the systems surrounding them must be deterministic, auditable, and secure. Enforcing strict guardrails, zero-ORM boundaries, and fail-open telemetry.',
    icon: 'terminal',
  },
]

const FLAGSHIP_INSTRUMENT: Instrument = {
  id: '01_FOLIOR',
  title: 'Folior Writer',
  tagline: 'AI-Assisted Writing Mentor & Digital Vellum',
  description: 'A serene, distraction-free digital vellum crafted for novelists, journalists, and researchers to sustain deep creative flow states with zero administrative clutter.',
  category: 'FLAGSHIP INSTRUMENT',
  isFlagship: true,
  url: 'https://folior.io/',
  highlights: [
    'Style-Aware AI Mentoring: Contextual reading and ghost suggestions that honor the author\'s voice without overwriting prose.',
    'Codex Entity Graph: Relational compendiums for character hierarchies, world-building lore, and thematic linking.',
    'Local-First & AES-256 Encrypted: Creative intellectual property stays sovereign, private, and permanently accessible.',
  ],
  badges: ['LOCAL_FIRST', 'GO_NATIVE_AI', 'AES_256_GCM', 'CODEX_GRAPH', 'REACT_19'],
}

const CASE_STUDY: CaseStudy = {
  id: '01_FASTMCP_ERP',
  title: 'Enterprise FastMCP ERP Gateway',
  subtitle: 'Mission-Critical Accounting & Production Intelligence Bridge',
  client: 'Grupo Pedreira Um Valemix',
  architecture: 'Hexagonal (Ports & Adapters) · Python 3.12 · FastMCP · SQL Server · MariaDB',
  description: 'High-maturity FastMCP server built with Clean Architecture, serving as an intelligent bridge between AI agents and enterprise SQL Server ERP databases to expose accounting and production analytics with strict security.',
  challengesOvercome: [
    'Zero-ORM Parameterized SQL: Pure, optimized queries over 6-level chart of accounts with zero hidden N+1 latency.',
    'Async Event Loop Protection: Encapsulated synchronous pyodbc calls in asyncio.to_thread() to preserve FastMCP throughput.',
    'OAuth Entra ID + MariaDB Auth Gate: Dual-layer security re-verifying active employee status on every token refresh.',
    'Fail-Open Dual Audit Telemetry: High-fidelity observability logging latency, token counts, and sanitized JSON parameters without blocking production calls.',
  ],
  badges: ['FASTMCP', 'HEXAGONAL', 'ZERO_ORM', 'ENTRA_ID_OAUTH', 'FAIL_OPEN_AUDIT'],
  status: 'PRODUCTION DEPLOYED',
}

const ARCHITECT_PROFILE: ArchitectProfile = {
  name: 'Herik Colares Rezende',
  role: 'Principal Systems Architect & AI Systems Engineer',
  location: 'Minas Gerais, Brazil',
  education: 'B.S. in Computer Science (2026)',
  bio: 'Specializing in bridging advanced backend systems (Go, Python) with production AI agent orchestration and Model Context Protocol (MCP) integrations. Passionate about Clean Architecture, PACELC trade-offs, and building software that endures.',
  github: 'https://github.com/devherik',
  linkedin: 'https://www.linkedin.com/in/herik-colares',
  studio: 'https://github.com/Green-Olive-Labs',
  corePrinciples: [
    'Clean & Hexagonal Architecture (Domain decoupled from external LLMs)',
    'Systems Thinking & PACELC (Data-driven latency, consistency, and token trade-offs)',
    'Deterministic Constraints (Deterministic boundaries around non-deterministic AI)',
    'Test-Driven Intent (Tests define the architectural definition of done)',
  ],
}

function App() {
  const { theme, setTheme, terminalTab, setTerminalTab, initState } = useUIStore()

  useEffect(() => {
    initState()
  }, [initState])

  return (
    <>
      <FadeInEffect>
        {/* Navigation Header */}
        <header className="nav-header">
          <div className="nav-logo-group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {theme === 'dark' ? (
              <img src={logoDarkImg} alt="Olive Labs Logo" className="nav-logo" />
            ) : (
              <img src={logoImg} alt="Olive Labs Logo" className="nav-logo" />
            )}
          </div>

          <nav className="nav-menu">
            <a href="#manifesto" className="nav-link">Manifesto</a>
            <a href="#instruments" className="nav-link">Instruments</a>
            <a href="#workbench" className="nav-link">Workbench</a>
            <a href="#commissions" className="nav-link">Commissions</a>
            <a href="#architect" className="nav-link">The Architect</a>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              title="Toggle theme schema"
            >
              <AnimatedPresenceWrapper isPresent={theme === 'dark'}>
                <Moon size={18} color="currentColor" variant="Bulk" />
              </AnimatedPresenceWrapper>
              <AnimatedPresenceWrapper isPresent={theme !== 'dark'}>
                <Sun1 size={18} color="currentColor" variant="Bold" />
              </AnimatedPresenceWrapper>
            </button>
            <a href="#contact" className="btn-primary">
              Commission a Build
            </a>
          </div>
        </header>

        {/* Main Container */}
        <main id="root">

          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-bg-container">
              <img src={heroImg} alt="Serene Olive Tree Landscape" className="hero-bg-image" />
              <div className="hero-bg-overlay"></div>
            </div>
            <ScrollReveal direction="up" distance={30} duration={1000}>
              <div className="hero-content">
                <div className="hero-tagline">
                  <span className="syntax-tag active">The Digital Atelier · Olive Labs</span>
                </div>
                <h1>
                  Craft for the creative voice.<br />
                  <span style={{ color: 'var(--secondary)' }}>Software as digital instruments.</span>
                </h1>
                <p className="body-lg" style={{ maxWidth: '680px', marginTop: '16px' }}>
                  Olive Labs is an independent digital atelier and boutique software house led by Herik Colares Rezende. We bridge Clean Architecture with non-intrusive artificial intelligence—crafting sovereign tools for creators and engineering high-stakes systems for forward-thinking enterprises.
                </p>
                <div className="hero-actions">
                  <a href="#instruments" className="btn-primary">
                    Explore Folior Writer
                  </a>
                  <a href="#workbench" className="btn-secondary">
                    Inspect the Workbench
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Manifesto & Pillars Section */}
          <section id="manifesto" className="section-wrapper">
            <ScrollReveal direction="up" distance={50} duration={1200}>
              <div className="section-header">
                <div>
                  <h2>The Atelier Ideals</h2>
                  <p className="body-md" style={{ maxWidth: '480px' }}>
                    Our creative and architectural commitments ensure every line of code serves human intent with aesthetic restraint and technical durability.
                  </p>
                </div>
                <div className="section-metadata">
                  Atelier Manifesto
                </div>
              </div>

              <div className="pillars-grid">
                {PILLARS.map((pillar) => (
                  <div key={pillar.nodeId} className="card pillar-card">
                    <div>
                      <div className="pillar-icon-container">
                        <span className="network-node" style={{ marginRight: '8px' }}></span>
                        <span className="label-sm" style={{ color: 'var(--outline)' }}>{pillar.nodeId}</span>
                      </div>
                      <div className="pillar-subtitle">{pillar.subtitle}</div>
                      <h3 className="headline-md" style={{ margin: '8px 0 12px' }}>{pillar.title}</h3>
                      <p className="body-md">{pillar.description}</p>
                    </div>
                    <div className="pillar-footer">
                      <span>{pillar.nodeId}</span>
                      <span style={{ color: 'var(--secondary)' }}>Sovereign Craft</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* Flagship Product Showcase: Folior Writer */}
          <section id="instruments" className="section-wrapper">
            <ScrollReveal direction="up" distance={40} duration={1100}>
              <div className="section-header">
                <div>
                  <h2>The Instruments: Folior Writer</h2>
                  <p className="body-md" style={{ maxWidth: '520px' }}>
                    Our flagship writing environment—tailored for novelists, journalists, and researchers who demand focus and sovereign permanence.
                  </p>
                </div>
                <div className="section-metadata">
                  Featured Instrument
                </div>
              </div>

              <div className="flagship-showcase">
                <div className="flagship-grid">
                  <div>
                    <div className="flagship-badge-group">
                      <span className="syntax-tag active">{FLAGSHIP_INSTRUMENT.category}</span>
                      {FLAGSHIP_INSTRUMENT.badges.map((badge) => (
                        <span key={badge} className="syntax-tag">{badge}</span>
                      ))}
                    </div>
                    <h3 className="display-lg" style={{ fontSize: '36px', marginBottom: '8px' }}>
                      {FLAGSHIP_INSTRUMENT.title}
                    </h3>
                    <p className="body-lg" style={{ color: 'var(--secondary)', fontWeight: 500, marginBottom: '16px' }}>
                      {FLAGSHIP_INSTRUMENT.tagline}
                    </p>
                    <p className="body-lg" style={{ lineHeight: 1.6 }}>
                      {FLAGSHIP_INSTRUMENT.description}
                    </p>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
                      <a href={FLAGSHIP_INSTRUMENT.url} target="_blank" rel="noreferrer" className="btn-primary">
                        Launch Folior.io ↗
                      </a>
                      <a href="#workbench" className="btn-secondary">
                        View Technical Spec
                      </a>
                    </div>
                  </div>

                  <div className="feature-pill-list">
                    <div className="feature-pill-item">
                      <div className="feature-pill-content">
                        <h4>Style-Aware AI Mentoring</h4>
                        <p>Contextual reading and ghost suggestions that illuminate pacing and character arcs without overwriting prose.</p>
                      </div>
                    </div>

                    <div className="feature-pill-item">
                      <div className="feature-pill-content">
                        <h4>Codex Entity Graph</h4>
                        <p>Relational compendiums and thematic links that cross-reference research notes, factions, and chapter hierarchies.</p>
                      </div>
                    </div>

                    <div className="feature-pill-item">
                      <div className="feature-pill-content">
                        <h4>Local-First Sovereignty & AES-256</h4>
                        <p>Creative intellectual property remains localized, encrypted, and owned exclusively by the writer.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Interactive Architect Workbench */}
          <section id="workbench" className="section-wrapper">
            <ScrollReveal direction="up" distance={40} duration={1100}>
              <div className="section-header">
                <div>
                  <h2>The Architect's Workbench</h2>
                  <p className="body-md" style={{ maxWidth: '520px' }}>
                    Inspect real domain contracts, Go native AI workers, and FastMCP enterprise servers built on Clean Architecture.
                  </p>
                </div>
                <div className="section-metadata">
                  Workbench Specification
                </div>
              </div>

              <div className="terminal-window" style={{ minWidth: '60vw' }}>
                <div className="terminal-header">
                  <div className="terminal-buttons">
                    <span className="terminal-dot red"></span>
                    <span className="terminal-dot yellow"></span>
                    <span className="terminal-dot green"></span>
                  </div>
                  <div className="terminal-filename">
                    <span>{WORKBENCH_METADATA[terminalTab].filename}</span>
                    <span className="syntax-tag" style={{ fontSize: '10px' }}>{WORKBENCH_METADATA[terminalTab].badge}</span>
                  </div>
                </div>
                <div className="terminal-body">
                  <aside className="terminal-sidebar">
                    <button
                      type="button"
                      className={`terminal-tab-btn ${terminalTab === 'engine.go' ? 'active' : ''}`}
                      onClick={() => setTerminalTab('engine.go')}
                    >
                      <span className="tab-title">engine.go</span>
                      <span className="tab-badge">Go Native AI Engine</span>
                    </button>
                    <button
                      type="button"
                      className={`terminal-tab-btn ${terminalTab === 'mcp_gateway.py' ? 'active' : ''}`}
                      onClick={() => setTerminalTab('mcp_gateway.py')}
                    >
                      <span className="tab-title">mcp_gateway.py</span>
                      <span className="tab-badge">FastMCP Enterprise Server</span>
                    </button>
                    <button
                      type="button"
                      className={`terminal-tab-btn ${terminalTab === 'domain_contract.ts' ? 'active' : ''}`}
                      onClick={() => setTerminalTab('domain_contract.ts')}
                    >
                      <span className="tab-title">domain_contract.ts</span>
                      <span className="tab-badge">Clean Domain & Zod</span>
                    </button>
                  </aside>
                  <div className="terminal-content">
                    <SlideInEffect>
                      <TerminalTypewriter key={terminalTab} tokens={TAB_CONTENT[terminalTab]} />
                    </SlideInEffect>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Bespoke Commissions & Case Study (Dev House) */}
          <section id="commissions" className="section-wrapper">
            <ScrollReveal direction="up" distance={40} duration={1200}>
              <div className="section-header">
                <div>
                  <h2>Bespoke Commissions & Dev House</h2>
                  <p className="body-md" style={{ maxWidth: '520px' }}>
                    We take on select, high-stakes commissions—engineering enterprise AI integrations, high-throughput microservices, and zero-debt applications.
                  </p>
                </div>
                <div className="section-metadata">
                  Enterprise Systems
                </div>
              </div>

              {/* Featured Case Study: FastMCP */}
              <div className="case-study-banner">
                <div className="case-study-header">
                  <div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <span className="syntax-tag active">{CASE_STUDY.status}</span>
                      <span className="syntax-tag">Client: {CASE_STUDY.client}</span>
                    </div>
                    <h3 className="headline-md" style={{ fontSize: '24px' }}>{CASE_STUDY.title}</h3>
                    <p className="body-md" style={{ color: 'var(--secondary)', marginTop: '4px' }}>{CASE_STUDY.subtitle}</p>
                  </div>
                  <div className="section-metadata" style={{ textAlign: 'right' }}>
                    {CASE_STUDY.architecture}
                  </div>
                </div>

                <p className="body-lg" style={{ marginTop: '16px' }}>{CASE_STUDY.description}</p>

                <div className="case-study-highlights-grid">
                  {CASE_STUDY.challengesOvercome.map((challenge, idx) => {
                    const [title, ...descParts] = challenge.split(': ')
                    return (
                      <div key={idx} className="case-study-highlight-item">
                        <strong>{title}</strong>
                        <p>{descParts.join(': ')}</p>
                      </div>
                    )
                  })}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
                  {CASE_STUDY.badges.map((badge) => (
                    <span key={badge} className="syntax-tag">{badge}</span>
                  ))}
                </div>
              </div>

              {/* Studio Capabilities */}
              <div className="services-subgrid">
                <div className="service-card">
                  <h4>Production AI Agents & MCP Gateways</h4>
                  <p>Enterprise Model Context Protocol (FastMCP) servers, multi-agent workflows (Agno/LangGraph), hybrid semantic retrieval (PgVector), and strict audit telemetry.</p>
                </div>
                <div className="service-card">
                  <h4>High-Throughput Go & Python Backends</h4>
                  <p>Clean & Hexagonal architecture, zero-ORM data layers, concurrent Go workers, and resilient microservices engineered for extreme longevity.</p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* About The Architect / Personal Portfolio */}
          <section id="architect" className="section-wrapper">
            <ScrollReveal direction="up" distance={40} duration={1200}>
              <div className="section-header">
                <div>
                  <h2>The Architect & Toolmaker</h2>
                  <p className="body-md" style={{ maxWidth: '480px' }}>
                    The mind and craft behind Olive Labs Studio and its bespoke software instruments.
                  </p>
                </div>
                <div className="section-metadata">
                  Architect & Founder
                </div>
              </div>

              <div className="architect-card">
                <div>
                  <div className="architect-meta">
                    <div className="architect-avatar-badge">HC</div>
                    <div>
                      <h3 className="headline-md" style={{ margin: 0 }}>{ARCHITECT_PROFILE.name}</h3>
                      <div className="body-md" style={{ color: 'var(--secondary)', fontWeight: 500 }}>
                        {ARCHITECT_PROFILE.role}
                      </div>
                      <div className="label-sm" style={{ color: 'var(--outline)', marginTop: '4px' }}>
                        📍 {ARCHITECT_PROFILE.location} · {ARCHITECT_PROFILE.education}
                      </div>
                    </div>
                  </div>

                  <p className="body-lg" style={{ lineHeight: 1.6 }}>
                    {ARCHITECT_PROFILE.bio}
                  </p>

                  <div className="architect-socials">
                    <a href={ARCHITECT_PROFILE.github} target="_blank" rel="noreferrer" className="btn-secondary">
                      GitHub (@devherik) ↗
                    </a>
                    <a href={ARCHITECT_PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
                      LinkedIn ↗
                    </a>
                    <a href={ARCHITECT_PROFILE.studio} target="_blank" rel="noreferrer" className="btn-secondary">
                      Olive Labs Studio ↗
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', color: 'var(--outline)' }}>
                    Architectural Axioms
                  </h4>
                  <div className="principles-list">
                    {ARCHITECT_PROFILE.corePrinciples.map((principle, idx) => (
                      <div key={idx} className="principle-item">
                        <span style={{ color: 'var(--secondary)' }}>◆</span>
                        <span>{principle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Manifesto Quote Section */}
          <section className="manifesto-section">
            <ScrollReveal direction="up" distance={30} duration={1000}>
              <img className="logoIcon-quote" src={logoIcon} alt="Olive Labs Logo" />
              <blockquote className="manifesto-quote">
                "We view software not merely as deterministic engineering, but as the creation of <span className="manifesto-highlight">bespoke digital instruments</span>. Our code disappears into the background so thought flows directly into form."
              </blockquote>
              <div className="manifesto-author">
                <span className="network-node" style={{ verticalAlign: 'middle', marginRight: '8px' }}></span>
                Olive Labs Studio Manifesto · Herik Colares Rezende
              </div>
            </ScrollReveal>
          </section>

          {/* Call To Action Banner */}
          <section id="contact" className="section-wrapper">
            <ScrollReveal direction="up" distance={30} duration={1000}>
              <div className="cta-banner">
                <div className="cta-content">
                  <h2 className="display-lg">Ready to architect an enduring system?</h2>
                  <p className="body-lg" style={{ marginTop: '12px' }}>
                    We accept a select number of high-stakes product builds, enterprise MCP integrations, and architectural consultations each quarter.
                  </p>
                </div>
                <a href="mailto:hello@olivelabs.studio" className="btn-primary" style={{ padding: '14px 28px', fontSize: '15px' }}>
                  Commission a Build ↗
                </a>
              </div>
            </ScrollReveal>
          </section>

          {/* Footer */}
          <footer className="footer-container">
            <div className="footer-logo-copyright">
              <img src={logoIcon} alt="Olive Logo Icon" className="footer-logo" />
              <span className="footer-copyright">
                © {new Date().getFullYear()} Olive Labs Studio. Led by Herik Colares Rezende. Craft for the creative voice.
              </span>
            </div>
            <div className="footer-nav">
              <a href="https://folior.io" target="_blank" rel="noreferrer" className="footer-link">Folior</a>
              <a href="https://github.com/devherik" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              <a href="https://www.linkedin.com/in/herik-colares" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
            </div>
          </footer>
        </main>
      </FadeInEffect>
    </>
  )
}

export default App

