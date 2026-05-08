import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Github, Linkedin, Mail, ExternalLink, Server, Brain,
  Globe, Code2, Moon, Sun, ArrowUpRight, MapPin
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import myPhoto from './img/myphoto.jpg';

const PROJECTS = [
  {
    name: 'Zaynah AI',
    url: 'https://zaynah.app',
    repo: null,
    status: 'Production',
    statusColor: 'emerald',
    description:
      'WhatsApp-native e-commerce automation for MENA merchants. Multi-tenant backend with NLP workflows for Tunisian Derja — handles order confirmation, lead qualification, and store sync automatically.',
    tags: ['FastAPI', 'PostgreSQL', 'Redis', 'Next.js 15', 'Docker'],
    geo: 'MENA',
  },
  {
    name: 'SovereignGuard',
    url: 'https://github.com/bahaeddinmselmi/sovereignguard',
    repo: 'bahaeddinmselmi/sovereignguard',
    status: 'Open Source',
    statusColor: 'violet',
    description:
      'GDPR-compliant AI privacy gateway for EMEA enterprises. Strips PII before LLM requests leave your infrastructure, restores context locally. Ships with Tunisia, Morocco, and France recognizers out of the box.',
    tags: ['Python', 'FastAPI', 'Microsoft Presidio', 'Docker'],
    geo: 'EMEA',
  },
  {
    name: 'Recouvr AI',
    url: 'https://recouvr.dev',
    repo: null,
    status: 'In Development',
    statusColor: 'amber',
    description:
      'B2B collections and client relationship automation for EMEA SMEs. GDPR-compliant by architecture — built on the same privacy-first infrastructure principles as SovereignGuard.',
    tags: ['Next.js', 'Supabase', 'Claude API'],
    geo: 'EMEA',
  },
  {
    name: 'Derja Smart Scraper',
    url: 'https://github.com/bahaeddinmselmi/derja-smart-scraper',
    repo: 'bahaeddinmselmi/derja-smart-scraper',
    status: 'Open Source',
    statusColor: 'violet',
    description:
      'CLI tool for building Tunisian Arabic (Derja) NLP corpora from the open web. Heuristic dialect detector filters sentences for training-ready datasets — addresses a gap for 12M speakers with near-zero model coverage.',
    tags: ['Python', 'NLP', 'SerpAPI', 'Data Pipelines'],
    geo: 'Arabic NLP',
  },
  {
    name: 'Tunisian Arabic AI Dataset',
    url: 'https://github.com/bahaeddinmselmi/tunisian-arabic-ai-dataset',
    repo: 'bahaeddinmselmi/tunisian-arabic-ai-dataset',
    status: 'Open Source',
    statusColor: 'violet',
    description:
      'The largest open-source dataset for Tunisian Arabic NLP — social media text, transcripts, and e-commerce data structured for LLM fine-tuning and dialect classification.',
    tags: ['NLP', 'Dataset', 'Derja', 'LLM Training'],
    geo: 'Arabic NLP',
  },
  {
    name: 'SiteForge',
    url: 'https://github.com/bahaeddinmselmi/siteforge-chrome-extension',
    repo: 'bahaeddinmselmi/siteforge-chrome-extension',
    status: 'Open Source',
    statusColor: 'violet',
    description:
      'Chrome extension that exports any live website as a ready-to-run project — client-side, no AI, no hallucinations. Deterministic visual layout reconstruction. What you see is exactly what you get.',
    tags: ['JavaScript', 'Chrome Extension API'],
    geo: null,
  },
];

const SKILLS = [
  {
    icon: <Server className="w-5 h-5" />,
    title: 'Backend & Infrastructure',
    items: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Node.js', 'WebSockets'],
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: 'AI & NLP',
    items: ['LLM Workflows', 'RAG', 'Arabic NLP', 'Groq', 'HuggingFace', 'Vector DBs'],
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Full-stack',
    items: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'REST APIs'],
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'MENA / EMEA Focus',
    items: ['Tunisian Derja NLP', 'GDPR Infrastructure', 'Arabic Dialect AI', 'Multi-tenant SaaS'],
  },
];

const STATUS_STYLES: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
  violet: 'bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20',
  amber: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20',
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export default function App() {
  const [dark, setDark] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const bg = dark ? 'bg-zinc-950 text-zinc-100' : 'bg-gray-50 text-zinc-900';
  const cardBg = dark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200';
  const muted = dark ? 'text-zinc-400' : 'text-zinc-500';
  const inputCls = dark
    ? 'bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-violet-500'
    : 'bg-white border-gray-300 text-zinc-900 placeholder-gray-400 focus:border-violet-500';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await emailjs.sendForm('service_l6tgm6r', 'template_5fa0a2v', formRef.current, 'oIZvTyxrOuXHGa69M');
      setSubmitStatus('success');
      formRef.current.reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-50 border-b ${dark ? 'bg-zinc-950/80 border-zinc-800' : 'bg-gray-50/80 border-gray-200'} backdrop-blur-md`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className={`font-semibold tracking-tight ${muted}`}>bahaeddin.dev</span>
          <div className="flex items-center gap-6">
            {['skills', 'projects', 'contact'].map((s) => (
              <a key={s} href={`#${s}`} className={`text-sm capitalize hover:text-violet-400 transition-colors ${muted}`}>
                {s}
              </a>
            ))}
            <button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-lg transition-colors ${dark ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`}
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="home" className="min-h-screen flex items-center pt-20">
        <div className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fade} className={`inline-flex items-center gap-2 text-sm ${muted} mb-6`}>
              <MapPin className="w-3.5 h-3.5" />
              Tunisia — building for MENA &amp; EMEA
            </motion.div>
            <motion.h1 variants={fade} className="text-5xl font-bold leading-tight tracking-tight mb-4">
              Baha Eddin<br />
              <span className="text-violet-400">Mselmi</span>
            </motion.h1>
            <motion.p variants={fade} className={`text-lg font-medium mb-2`}>
              Co-Founder &amp; CEO @{' '}
              <a href="https://zaynah.app" target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">Zaynah AI</a>
              {' '}·{' '}
              Founder @{' '}
              <a href="https://recouvr.dev" target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">Recouvr AI</a>
            </motion.p>
            <motion.p variants={fade} className={`${muted} mb-8 leading-relaxed`}>
              I build production AI systems at the intersection of Arabic NLP, WhatsApp
              automation, and GDPR infrastructure — for markets where English-first tooling
              breaks down.
            </motion.p>
            <motion.div variants={fade} className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                View Projects <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/baha-eddin-mselmi"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors ${dark ? 'border-zinc-700 hover:border-zinc-500' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/bahaeddinmselmi"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors ${dark ? 'border-zinc-700 hover:border-zinc-500' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-violet-600/20 blur-2xl scale-110" />
              <img
                src={myPhoto}
                alt="Baha Eddin Mselmi"
                className="relative w-72 h-72 rounded-2xl object-cover ring-1 ring-violet-500/30"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Skills */}
      <section id="skills" className={`py-24 border-t ${dark ? 'border-zinc-800' : 'border-gray-200'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12"
          >
            Skills
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.title}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`p-6 rounded-xl border ${cardBg}`}
              >
                <div className="text-violet-400 mb-3">{skill.icon}</div>
                <h3 className="font-semibold mb-3 text-sm">{skill.title}</h3>
                <ul className="space-y-1">
                  {skill.items.map((item) => (
                    <li key={item} className={`text-sm ${muted}`}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`py-24 border-t ${dark ? 'border-zinc-800' : 'border-gray-200'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12"
          >
            Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`group block p-6 rounded-xl border ${cardBg} hover:border-violet-500/50 transition-colors`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[project.statusColor]}`}>
                      {project.status}
                    </span>
                    {project.geo && (
                      <span className={`text-xs ${muted}`}>{project.geo}</span>
                    )}
                  </div>
                  <ExternalLink className={`w-4 h-4 ${muted} group-hover:text-violet-400 transition-colors flex-shrink-0`} />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-violet-400 transition-colors">
                  {project.name}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${muted}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded-md ${dark ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`py-24 border-t ${dark ? 'border-zinc-800' : 'border-gray-200'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${muted} mb-12 max-w-xl`}
          >
            Open to collaboration on Arabic NLP, AI infrastructure, and EMEA-focused developer tools.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <a
                href="mailto:baha@zaynah.app"
                className={`flex items-center gap-3 p-4 rounded-xl border ${cardBg} hover:border-violet-500/50 transition-colors group`}
              >
                <Mail className="w-5 h-5 text-violet-400" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className={`text-sm ${muted}`}>baha@zaynah.app</p>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/baha-eddin-mselmi"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-3 p-4 rounded-xl border ${cardBg} hover:border-violet-500/50 transition-colors group`}
              >
                <Linkedin className="w-5 h-5 text-violet-400" />
                <div>
                  <p className="text-sm font-medium">LinkedIn</p>
                  <p className={`text-sm ${muted}`}>baha-eddin-mselmi</p>
                </div>
              </a>
              <a
                href="https://github.com/bahaeddinmselmi"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-3 p-4 rounded-xl border ${cardBg} hover:border-violet-500/50 transition-colors group`}
              >
                <Github className="w-5 h-5 text-violet-400" />
                <div>
                  <p className="text-sm font-medium">GitHub</p>
                  <p className={`text-sm ${muted}`}>bahaeddinmselmi</p>
                </div>
              </a>
            </motion.div>

            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="from_name" className={`block text-sm font-medium mb-1.5 ${muted}`}>Name</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  required
                  placeholder="Your name"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${inputCls}`}
                />
              </div>
              <div>
                <label htmlFor="from_email" className={`block text-sm font-medium mb-1.5 ${muted}`}>Email</label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  required
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${inputCls}`}
                />
              </div>
              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-1.5 ${muted}`}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="What are you working on?"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors resize-none ${inputCls}`}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 px-6 rounded-lg text-sm font-medium text-white transition-colors ${
                  isSubmitting ? 'bg-violet-600/50 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-500'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-sm text-emerald-400 text-center">Message sent.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-sm text-red-400 text-center">Failed to send. Try emailing directly.</p>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${dark ? 'border-zinc-800' : 'border-gray-200'}`}>
        <div className={`max-w-5xl mx-auto px-6 flex justify-between items-center text-sm ${muted}`}>
          <span>Baha Eddin Mselmi</span>
          <span>Built in Tunisia</span>
        </div>
      </footer>

    </div>
  );
}
