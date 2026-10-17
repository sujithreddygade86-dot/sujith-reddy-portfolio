import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Server,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

const profile = {
  name: 'Sujith Reddy Gade',
  email: 'sujithreddygade86@gmail.com',
  phone: '+91 93925 93707',
  linkedin: 'https://www.linkedin.com/in/sujith-reddy-gade-97ba1131b/',
  github: 'https://github.com/sujithreddygade86-dot',
  whatsapp: 'https://wa.me/919392593707?text=' + encodeURIComponent('Hi Sujith, I found your portfolio and would like to connect with you about a project.'),
}

const resumeUrl = `${import.meta.env.BASE_URL}Sujith-Reddy-Gade-Resume.pdf`
const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

const skills = [
  {
    name: 'Java',
    category: 'Backend foundation',
    description: 'OOP, exception handling, validation and clean application logic.',
    icon: Code2,
    accent: 'violet',
  },
  {
    name: 'Spring Boot',
    category: 'APIs & services',
    description: 'REST APIs, Spring Data JPA, Hibernate and modular service design.',
    icon: Server,
    accent: 'cyan',
  },
  {
    name: 'React & JavaScript',
    category: 'Frontend craft',
    description: 'Responsive interfaces, reusable components and purposeful motion.',
    icon: Sparkles,
    accent: 'pink',
  },
  {
    name: 'SQL & MySQL',
    category: 'Data thinking',
    description: 'Relational modeling, joins, CRUD flows and dependable data access.',
    icon: Database,
    accent: 'lime',
  },
  {
    name: 'HTML & CSS',
    category: 'Web essentials',
    description: 'Semantic structure, visual systems and mobile-first layouts.',
    icon: Globe2,
    accent: 'orange',
  },
  {
    name: 'Git & GitHub',
    category: 'Ship together',
    description: 'Version control, clear collaboration and a steady delivery rhythm.',
    icon: Github,
    accent: 'blue',
  },
]

const projects = [
  {
    number: '01',
    title: 'AI English Speaking Platform',
    label: 'AI / FULL-STACK',
    highlight: 'Practice without pressure',
    description:
      'A full-stack learning platform that helps people build confidence through real-time AI conversations, grammar feedback and guided speaking challenges.',
    stack: ['Java', 'Spring Boot', 'Gemini API', 'Supabase'],
    github: 'https://github.com/sujithreddygade86-dot/english-speaking-app',
    demo: 'https://english-speaking-app-i1f5.onrender.com',
    icon: MessageCircle,
    accent: 'violet',
  },
  {
    number: '02',
    title: 'LearnFlow E-Learning System',
    label: 'WEB APPLICATION',
    highlight: 'Learning, in one flow',
    description:
      'A responsive course experience with registration, enrollment tracking, personalized dashboards and a JSON Server-backed CRUD workflow.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'REST API'],
    github: 'https://github.com/sujithreddygade86-dot/LearnFlow',
    demo: 'https://learnflow-zvjw.onrender.com',
    icon: Layers3,
    accent: 'cyan',
  },
]

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -70px' },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function App() {
  useReveal()

  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [formState, setFormState] = useState('idle')
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormState('sending')
    setFormMessage('')

    try {
      const response = await fetch(`${apiBaseUrl}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        const fallbackMessage = response.status >= 500
          ? 'The contact service is temporarily unavailable. Please try again in a moment.'
          : 'Unable to send your message.'
        throw new Error(payload.error || fallbackMessage)
      }

      setForm({ name: '', email: '', message: '' })
      setFormState('success')
      setFormMessage(payload.emailSent ? 'Message sent — I will get back to you soon.' : 'Message saved, but email delivery is not configured yet.')
    } catch (error) {
      setFormState('error')
      setFormMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-violet" aria-hidden="true" />
      <div className="ambient ambient-cyan" aria-hidden="true" />
      <div className="ambient ambient-pink" aria-hidden="true" />
      <div className="background-grid" aria-hidden="true" />

      <header className={`site-nav ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner">
          <button className="brand" onClick={() => scrollTo('top')} aria-label="Back to the top">
            <span className="brand-mark">SR</span>
            <span className="brand-name">SUJITH<span className="brand-accent">.</span></span>
          </button>

          <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</button>
            ))}
            <a className="nav-resume" href={resumeUrl} target="_blank" rel="noreferrer">
              <FileText size={15} /> Resume
            </a>
            <button className="nav-cta" onClick={() => scrollTo('contact')}>
              Let&apos;s talk <ArrowUpRight size={15} />
            </button>
          </nav>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-pad" id="top">
          <div className="hero-grid">
            <div className="hero-copy" data-reveal="left">
              <p className="eyebrow"><span className="status-dot" /> Java developer / full-stack builder</p>
              <h1>Building <span>useful</span><br />things for the <span className="outline-word">web.</span></h1>
              <p className="hero-intro">
                I&apos;m <strong>Sujith Reddy Gade</strong> — a computer science student who turns ideas into clear, human-friendly digital experiences.
              </p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => scrollTo('projects')}>
                  See my work <ArrowUpRight size={17} />
                </button>
                <button className="button button-ghost" onClick={() => scrollTo('contact')}>
                  Start a conversation <ArrowDownRight size={17} />
                </button>
                <a className="button button-resume" href={resumeUrl} target="_blank" rel="noreferrer">
                  View resume <FileText size={16} />
                </a>
              </div>
              <div className="hero-meta">
                <span><MapPin size={14} /> Hyderabad, India</span>
                <span><Zap size={14} /> Open to opportunities</span>
              </div>
            </div>

            <div className="hero-visual" data-reveal="scale" aria-label="A visual representation of Sujith's developer toolkit">
              <div className="visual-ring ring-large" />
              <div className="visual-ring ring-small" />
              <div className="visual-orb"><span>SR</span><i>✦</i></div>
              <div className="visual-star star-one">✦</div>
              <div className="visual-star star-two">✧</div>
              <div className="code-window">
                <div className="code-window-bar">
                  <span className="window-dots"><i /><i /><i /></span>
                  <span className="mono">sujith.dev</span>
                  <span className="window-status">● online</span>
                </div>
                <div className="code-lines mono">
                  <p><b>const</b> developer = {'{'}</p>
                  <p className="code-indent"><span>name:</span> <em>&apos;Sujith&apos;</em>,</p>
                  <p className="code-indent"><span>focus:</span> <em>&apos;useful products&apos;</em>,</p>
                  <p className="code-indent"><span>stack:</span> <em>&apos;Java + React&apos;</em>,</p>
                  <p className="code-indent"><span>energy:</span> <em>&apos;curious&apos;</em></p>
                  <p>{'}'}<span className="code-cursor">_</span></p>
                </div>
              </div>
              <div className="floating-note note-top"><span className="note-icon"><Sparkles size={14} /></span><span><b>Good ideas</b><small>start small</small></span></div>
              <div className="floating-note note-bottom"><span className="note-icon note-icon-green"><Check size={14} /></span><span><b>Built with care</b><small>always learning</small></span></div>
            </div>
          </div>
          <div className="hero-footer">
            <span className="mono scroll-label">SCROLL TO EXPLORE</span>
            <span className="scroll-line"><i /></span>
            <span className="mono hero-index">01 / 04</span>
          </div>
        </section>

        <section className="marquee" aria-label="Technologies">
          <div className="marquee-track mono">
            <span>JAVA</span><i>✦</i><span>SPRING BOOT</span><i>✦</i><span>REACT</span><i>✦</i><span>JAVASCRIPT</span><i>✦</i><span>SQL</span><i>✦</i><span>GITHUB</span><i>✦</i>
            <span>JAVA</span><i>✦</i><span>SPRING BOOT</span><i>✦</i><span>REACT</span><i>✦</i><span>JAVASCRIPT</span><i>✦</i><span>SQL</span><i>✦</i><span>GITHUB</span><i>✦</i>
          </div>
        </section>

        <section className="about section-pad" id="about">
          <div className="section-topline" data-reveal="up">
            <span className="section-kicker mono">01 / A LITTLE ABOUT ME</span>
            <span className="section-rule" />
            <span className="section-count mono">01</span>
          </div>
          <div className="about-grid">
            <div className="about-heading" data-reveal="left">
              <p className="micro-label">CURIOUS BY DEFAULT</p>
              <h2>Thoughtful code.<br /><span>Human results.</span></h2>
            </div>
            <div className="about-copy" data-reveal="up">
              <p className="lead-copy">I&apos;m an aspiring software developer with a strong interest in building user-focused applications from the first sketch to the final API.</p>
              <p>I enjoy the space between frontend polish and backend problem-solving. My work combines Java and Spring Boot foundations with React, JavaScript, HTML and CSS to create products that feel simple, useful and considered.</p>
              <div className="about-link-row">
                <button className="inline-link" onClick={() => scrollTo('skills')}>Explore my toolkit <ArrowDownRight size={16} /></button>
                <span className="tiny-note mono">ALWAYS LEARNING / ALWAYS BUILDING</span>
              </div>
            </div>
          </div>
        </section>

        <section className="skills section-pad" id="skills">
          <div className="section-topline" data-reveal="up">
            <span className="section-kicker mono">02 / THE TOOLKIT</span>
            <span className="section-rule" />
            <span className="section-count mono">02</span>
          </div>
          <div className="section-intro" data-reveal="up">
            <div><p className="micro-label">TOOLS I TRUST</p><h2>Small toolkit.<br /><span>Wide point of view.</span></h2></div>
            <p>I like learning the fundamentals deeply, then using the right tool for the problem in front of me.</p>
          </div>
          <div className="skills-grid">
            {skills.map(({ name, category, description, icon: Icon, accent }, index) => (
              <article className={`skill-card skill-${accent}`} key={name} data-reveal="up" style={{ '--delay': `${index * 70}ms` }}>
                <div className="skill-card-head"><span className="skill-number mono">0{index + 1}</span><span className="skill-icon"><Icon size={19} strokeWidth={1.7} /></span><ArrowUpRight size={16} /></div>
                <div><p className="skill-category mono">{category}</p><h3>{name}</h3><p className="skill-description">{description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="projects section-pad" id="projects">
          <div className="section-topline" data-reveal="up">
            <span className="section-kicker mono">03 / SELECTED PROJECTS</span>
            <span className="section-rule" />
            <span className="section-count mono">03</span>
          </div>
          <div className="section-intro projects-intro" data-reveal="up">
            <div><p className="micro-label">MADE TO BE USED</p><h2>Ideas that became<br /><span>working things.</span></h2></div>
            <p>Real projects are where curiosity turns into judgment — what to keep, what to simplify and what to improve next.</p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => {
              const Icon = project.icon
              return (
                <article className={`project-card project-${project.accent}`} key={project.number} data-reveal="up" style={{ '--delay': `${index * 120}ms` }}>
                  <div className="project-visual">
                    <div className="project-grid-lines" />
                    <div className="project-halo" />
                    <Icon className="project-icon" size={54} strokeWidth={1.2} />
                    <span className="project-highlight">{project.highlight}</span>
                    <span className="project-number mono">{project.number}</span>
                  </div>
                  <div className="project-content">
                    <div className="project-meta"><span className="project-label mono">{project.label}</span><span className="project-line" /></div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-footer">
                      <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                      <div className="project-links">
                        <a className="project-link project-link-github" href={project.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ExternalLink size={14} /></a>
                        <a className="project-link project-link-demo" href={project.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={15} /></a>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-orbit contact-orbit-one" aria-hidden="true" />
          <div className="contact-orbit contact-orbit-two" aria-hidden="true" />
          <div className="contact-panel">
            <div className="contact-copy" data-reveal="left">
              <div className="section-topline"><span className="section-kicker mono">04 / YOUR TURN</span><span className="section-rule" /><span className="section-count mono">04</span></div>
              <p className="micro-label">LET&apos;S MAKE SOMETHING USEFUL</p>
              <h2>Have a good<br /><span>idea?</span></h2>
              <p className="contact-lead">Tell me what you&apos;re building, what&apos;s stuck, or what you&apos;re curious about. I&apos;d love to hear from you.</p>
              <div className="contact-details">
                <a href={`mailto:${profile.email}`}><span className="contact-detail-icon"><Mail size={17} /></span><span><small>EMAIL</small>{profile.email}</span><ArrowUpRight size={15} /></a>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`}><span className="contact-detail-icon"><Phone size={17} /></span><span><small>PHONE</small>{profile.phone}</span><ArrowUpRight size={15} /></a>
              </div>
              <div className="social-row">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn"><Linkedin size={18} /><span>LinkedIn</span></a>
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub"><Github size={18} /><span>GitHub</span></a>
                <a href={profile.whatsapp} target="_blank" rel="noreferrer" aria-label="Open WhatsApp"><MessageCircle size={18} /><span>WhatsApp</span></a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} data-reveal="up">
              <div className="form-heading"><span className="form-number mono">01</span><div><h3>Send a message</h3><p>I usually reply within a day.</p></div></div>
              <label>Your name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label>
              <label>Email address<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label>
              <label>What&apos;s on your mind?<textarea required minLength="10" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell me a little about your idea..." rows="4" /></label>
              <button className="button button-submit" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending…' : 'Send message'} <Send size={16} /></button>
              {formMessage && <p className={`form-note ${formState}`} aria-live="polite">{formState === 'success' && <Check size={15} />}{formMessage}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer section-pad">
        <div className="footer-brand"><span className="brand-mark">SR</span><span><b>SUJITH REDDY GADE</b><small>Java developer / full-stack builder</small></span></div>
        <div className="footer-middle"><span className="mono">© {new Date().getFullYear()}</span></div>
        <button onClick={() => scrollTo('top')} className="back-top">Back to top <ArrowUpRight size={14} /></button>
      </footer>
    </div>
  )
}

export default App
