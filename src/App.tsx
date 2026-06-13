import { useEffect } from 'react'
import { useUIStore } from './store'
import { TerminalTypewriter } from './components/TerminalTypewriter'
import { TAB_CONTENT } from './components/terminalData'
import type { TerminalTab } from './components/terminalData'

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

interface Pillar {
  nodeId: string
  title: string
  description: string
  icon: string
}

interface Project {
  projectId: string
  title: string
  description: string
  category: string
  isFlagship: boolean
  metricValue?: string
  metricLabel?: string
  status?: string
}

const PILLARS: Pillar[] = [
  {
    nodeId: '01_EX',
    title: 'Greenfield Excellence',
    description: 'We specialize in clean-slate architecture, bypassing legacy bloat to build optimized, high-performance foundations from day zero.',
    icon: 'hub',
  },
  {
    nodeId: '02_SI',
    title: 'Symbiotic Intelligence',
    description: 'Integrating RAG and Vector Databases into the application core, creating systems that learn, evolve, and reason with your data.',
    icon: 'neurology',
  },
  {
    nodeId: '03_RS',
    title: 'Radical Simplicity',
    description: 'We strip away the noise. Minimalist interfaces powered by complex, invisible engineering. If it\'s not essential, it\'s deleted.',
    icon: 'terminal',
  },
]

const PROJECTS: Project[] = [
  {
    projectId: '01_FOLIOR',
    title: 'folior.io',
    description: 'A sovereign writing sanctuary for professional novelists and journalists. Engineered for deep focus and data permanence.',
    category: 'FLAGSHIP',
    isFlagship: true,
    metricValue: 'CARBON_NEUTRAL',
    metricLabel: 'Efficiency Metric',
    status: '99.99% Uptime SLA',
  },
  {
    projectId: '02_GS',
    title: 'GreenStack',
    description: 'Real-time carbon-efficient code monitoring for K8s clusters.',
    category: 'PRODUCT',
    isFlagship: false,
    status: 'STABLE',
  },
  {
    projectId: '03_SR',
    title: 'Sovereign RAG',
    description: 'Private-first vector intelligence node for legal firms.',
    category: 'ENTERPRISE',
    isFlagship: false,
    status: 'STABLE',
  },
]


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
          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              title="Toggle theme schema"
            >
              <AnimatedPresenceWrapper isPresent={theme === 'dark'}>
                <Moon size={18} color="currentColor" variant='Bulk' />
              </AnimatedPresenceWrapper>
              <AnimatedPresenceWrapper isPresent={theme !== 'dark'}>
                <Sun1 size={18} color="currentColor" variant='Bold' />
              </AnimatedPresenceWrapper>
            </button>
            <a href="#contact" className="btn-primary">
              Build With Us
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
                  <span className="syntax-tag active">[SYSTEM_INIT] V.2026.0</span>
                </div>
                <h1>
                  Engineered for Longevity.<br />
                  <span style={{ color: 'var(--studio-sage)' }}>Rooted in Logic.</span>
                </h1>
                <p className="body-lg" style={{ maxWidth: '640px', marginTop: '16px' }}>
                  Olive Labs Studio bridges the gap between organic creative intuition and the rigid precision of clean, high-velocity software engineering. We don't just build products; we architect digital legacies.
                </p>
                <div className="hero-actions">
                  <a href="#projects" className="btn-primary">
                    INITIALIZE_PROJECT.SH
                  </a>
                  <a href="#stack" className="btn-secondary">
                    VIEW_STACK.SH
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Pillars Section */}
          <section id="expertise" className="section-wrapper">
            <ScrollReveal direction="up" distance={50} duration={1200}>
              <div className="section-header">
                <div>
                  <h2>The Architectural Pillars</h2>
                  <p className="body-md" style={{ maxWidth: '460px' }}>
                    Our core methodology is defined by three non-negotiable principles that ensure every line of code serves a strategic purpose.
                  </p>
                </div>
                <div className="section-metadata">
                  PATH: /METHODOLOGY/CORE_PILLARS
                </div>
              </div>

              <div className="pillars-grid">
                {PILLARS.map((pillar) => (
                  <div key={pillar.nodeId} className="card pillar-card">
                    <div className="pillar-icon-container">
                      <span className="network-node" style={{ marginRight: '8px' }}></span>
                      <code style={{ fontSize: '12px' }}>{pillar.nodeId}</code>
                    </div>
                    <h3 className="headline-md" style={{ margin: '16px 0 12px' }}>{pillar.title}</h3>
                    <p className="body-md">{pillar.description}</p>
                    <div className="pillar-footer">
                      <span>NODE_ID: {pillar.nodeId}</span>
                      <span style={{ color: 'var(--studio-mint)' }}>ACTIVE</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* Terminal Tech Stack Section */}
          <section id="stack" className="section-wrapper">
            <ScrollReveal direction="up" distance={40} duration={1100}>
              <div className="section-header">
                <div>
                  <h2>The Developer's Developer</h2>
                  <p className="body-md" style={{ maxWidth: '460px' }}>
                    Our infrastructure is built for scale, performance, and deterministic output.
                  </p>
                </div>
                <div className="section-metadata">
                  SYSTEM: /INFRASTRUCTURE/SPEC_SHEET
                </div>
              </div>

              <div className="terminal-window" style={{ minWidth: '60vw' }}>
                <div className="terminal-header">
                  <div className="terminal-buttons">
                    <span className="terminal-dot red"></span>
                    <span className="terminal-dot yellow"></span>
                    <span className="terminal-dot green"></span>
                  </div>
                  <div className="terminal-filename">olive-labs-manifest.json</div>
                </div>
                <div className="terminal-body">
                  <aside className="terminal-sidebar">
                    <button
                      type="button"
                      className={`terminal-tab-btn ${terminalTab === 'manifest' ? 'active' : ''}`}
                      onClick={() => setTerminalTab('manifest')}
                    >
                      manifest.json
                    </button>
                    <button
                      type="button"
                      className={`terminal-tab-btn ${terminalTab === 'infrastructure' ? 'active' : ''}`}
                      onClick={() => setTerminalTab('infrastructure')}
                    >
                      docker-compose.yml
                    </button>
                    <button
                      type="button"
                      className={`terminal-tab-btn ${terminalTab === 'commands' ? 'active' : ''}`}
                      onClick={() => setTerminalTab('commands')}
                    >
                      bootstrap.sh
                    </button>
                  </aside>
                  <div className="terminal-content">
                    <SlideInEffect>
                      <TerminalTypewriter key={terminalTab} tokens={TAB_CONTENT[terminalTab as TerminalTab]} />
                    </SlideInEffect>
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
                "We believe software is the modern <span className="manifesto-highlight">architecture of the mind</span>. Every line of code is a deliberate decision towards either <span style={{ color: 'var(--studio-mint)' }}>entropy or longevity</span>. We choose the latter."
              </blockquote>
              <div className="manifesto-author">
                <span className="network-node" style={{ verticalAlign: 'middle', marginRight: '8px' }}></span>
                Olive Labs Engineering Syndicate
              </div>
            </ScrollReveal>
          </section>

          {/* Project Showcase Section */}
          <section id="projects" className="section-wrapper">
            <ScrollReveal direction="up" distance={40} duration={1200}>
              <div className="section-header">
                <div>
                  <h2>Project Showcase</h2>
                  <p className="body-md" style={{ maxWidth: '460px' }}>
                    Explore stable nodes deployed across the global network ecosystem.
                  </p>
                </div>
                <div className="section-metadata">
                  REGISTRY: /DEPLOYMENTS/STABLE_NODES
                </div>
              </div>

              <div className="projects-grid">
                {/* Flagship Project */}
                {PROJECTS.filter(p => p.isFlagship).map((project) => (
                  <div key={project.projectId} className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 className="headline-md">{project.title}</h3>
                        <span className="syntax-tag active">{project.category}</span>
                      </div>
                      <p className="body-lg">{project.description}</p>

                      <div className="project-metrics">
                        <div className="metric-item">
                          <div className="metric-value">{project.metricValue}</div>
                          <div className="metric-label">{project.metricLabel}</div>
                        </div>
                        <div className="metric-item">
                          <div className="metric-value">99.99%</div>
                          <div className="metric-label">Uptime SLA</div>
                        </div>
                      </div>
                    </div>

                    <div className="project-footer">
                      <span className="interface-code project-footer-id">PROJECT_ID: {project.projectId}</span>
                      <a href="https://folior.io" target="_blank" rel="noreferrer" className="btn-secondary project-footer-btn">
                        EXPLORE_CASE_STUDY.SH
                      </a>
                    </div>
                  </div>
                ))}

                {/* Side Projects Stack */}
                <div className="side-projects-stack">
                  {PROJECTS.filter(p => !p.isFlagship).map((project) => (
                    <div key={project.projectId} className="card side-project-card" style={{ textAlign: 'left' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4 className="interface-code" style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary)' }}>{project.title}</h4>
                          <span className="syntax-tag">{project.category}</span>
                        </div>
                        <p className="body-md">{project.description}</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                        <span className="interface-code" style={{ fontSize: '11px', color: 'var(--outline)' }}>ID: {project.projectId}</span>
                        <span className="interface-code" style={{ fontSize: '11px', color: 'var(--studio-mint)' }}>{project.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Call To Action Banner */}
          <section id="contact" className="section-wrapper">
            <ScrollReveal direction="up" distance={30} duration={1000}>
              <div className="cta-banner">
                <div className="cta-content">
                  <h2 className="display-lg">Ready to build for the next decade?</h2>
                  <p className="body-lg" style={{ marginTop: '12px' }}>
                    We are currently accepting a limited number of high-stakes projects. Let's discuss your architectural needs.
                  </p>
                </div>
                <a href="mailto:hello@olivelabs.studio" className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
                  START_PROTOCOL.EXE
                </a>
              </div>
            </ScrollReveal>
          </section>

          {/* Footer */}
          <footer className="footer-container">
            <div className="footer-logo-copyright">
              <img src={logoIcon} alt="Olive Logo Icon" className="footer-logo" />
              <span className="footer-copyright">
                © {new Date().getFullYear()} Olive Labs. All rights reserved. Engineered for Longevity.
              </span>
            </div>
            <div className="footer-nav">
              <a href="https://github.com/Green-Olive-Labs" target="_blank" rel="noreferrer" className="footer-link">Github</a>
            </div>
          </footer>
        </main>
      </FadeInEffect>
    </>
  )
}

export default App
