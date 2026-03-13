'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SERVICES = [
  {
    icon: '🌐',
    title: 'Full Stack Web Development',
    desc: 'End-to-end web apps using MERN stack — from database design to pixel-perfect frontend. Scalable, fast and production-ready.',
    tags: ['React', 'Node.js', 'MongoDB', 'Next.js'],
    accent: '#ff2d78',
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    desc: 'Cross-platform apps with React Native for iOS and Android — clean UI, smooth performance and real device tested.',
    tags: ['React Native', 'Expo', 'Firebase'],
    accent: '#ffd60a',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'User research, wireframes, prototypes and design systems in Figma. Beautiful interfaces that are intuitive to use.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
    accent: '#c026d3',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Features',
    desc: 'Integrate GPT-4, DALL-E and other AI APIs into your product. Chatbots, content generators, smart automation and more.',
    tags: ['OpenAI API', 'Prompt Engineering', 'LLMs'],
    accent: '#ff7d1a',
  },
  {
    icon: '⚡',
    title: 'Frontend Development',
    desc: 'Blazing-fast, responsive frontends with cinematic animations using GSAP, Framer Motion and Three.js for 3D effects.',
    tags: ['Three.js', 'GSAP', 'Framer Motion'],
    accent: '#ff2d78',
  },
  {
    icon: '🔧',
    title: 'API & Backend Development',
    desc: 'Robust REST and GraphQL APIs, authentication systems, payment integrations and cloud deployments.',
    tags: ['Express', 'REST API', 'JWT', 'Stripe'],
    accent: '#ffd60a',
  },
]

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="services" className="relative py-16 sm:py-28 px-4 sm:px-8 md:px-16 overflow-hidden" style={{ background: 'var(--bg2)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,45,120,0.04), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="section-tag">What I Offer</motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.5rem,7vw,6rem)] leading-none" style={{ fontFamily: 'var(--font-display)' }}>
            <span style={{ color: 'var(--text-primary)' }}>MY </span><span className="grad-text-2">SERVICES</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm font-light max-w-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Everything you need to take your idea from concept to a live, polished product.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16,1,0.3,1], delay: i * 0.08 }}
              className="group glass rounded-2xl p-6 sm:p-7 relative overflow-hidden"
              style={{ borderColor: 'rgba(255,45,120,0.08)', transition: 'border-color 0.3s, transform 0.3s' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = `${s.accent}28`; el.style.transform = 'translateY(-5px)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,45,120,0.08)'; el.style.transform = 'translateY(0)' }}>

              {/* bg glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.4s', background: `radial-gradient(250px at 0% 0%, ${s.accent}07, transparent 65%)` }} />

              {/* number */}
              <div className="absolute top-4 right-5 font-display text-5xl sm:text-6xl opacity-[0.06] group-hover:opacity-[0.12]" style={{ fontFamily: 'var(--font-display)', color: s.accent, transition: 'opacity 0.3s' }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl mb-5" style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}28` }}>
                  {s.icon}
                </div>
                <h3 className="text-lg sm:text-xl mb-3 font-medium" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(t => (
                    <span key={t} className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${s.accent}0e`, color: s.accent, border: `1px solid ${s.accent}28` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
