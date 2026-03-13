'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_GROUPS = [
  {
    title: 'Frontend',
    icon: '⚡',
    color: '#ff2d78',
    skills: [
      { name: 'React.js',       level: 92 },
      { name: 'Next.js',        level: 88 },
      { name: 'JavaScript',     level: 90 },
      { name: 'TypeScript',     level: 82 },
      { name: 'Tailwind CSS',   level: 90 },
      { name: 'Framer Motion',  level: 85 },
      { name: 'Three.js',       level: 72 },
      { name: 'GSAP',           level: 78 },
    ],
  },
  {
    title: 'Backend',
    icon: '🔧',
    color: '#ffd60a',
    skills: [
      { name: 'Node.js',        level: 85 },
      { name: 'Express.js',     level: 88 },
      { name: 'MongoDB',        level: 85 },
      { name: 'MySQL',          level: 78 },
      { name: 'REST API',       level: 90 },
      { name: 'JWT Auth',       level: 85 },
      { name: 'Socket.io',      level: 75 },
      { name: 'Redis',          level: 65 },
    ],
  },
  {
    title: 'AI Tools',
    icon: '🤖',
    color: '#c026d3',
    skills: [
      { name: 'ChatGPT / GPT-4',    level: 92 },
      { name: 'GitHub Copilot',      level: 90 },
      { name: 'Cursor AI',           level: 88 },
      { name: 'Claude AI',           level: 85 },
      { name: 'Midjourney',          level: 78 },
      { name: 'Stable Diffusion',    level: 70 },
      { name: 'OpenAI API',          level: 82 },
      { name: 'Vercel AI SDK',       level: 75 },
    ],
  },
  {
    title: 'Design & Others',
    icon: '🎨',
    color: '#ff7d1a',
    skills: [
      { name: 'Figma',          level: 88 },
      { name: 'React Native',   level: 78 },
      { name: 'Python',         level: 72 },
      { name: 'Java / DSA',     level: 75 },
      { name: 'Git / GitHub',   level: 88 },
      { name: 'Vercel / Netlify',level: 85 },
      { name: 'Postman',        level: 82 },
      { name: 'VS Code',        level: 95 },
    ],
  },
]

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="mb-3 sm:mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{name}</span>
        <span className="font-mono text-[10px] sm:text-xs font-medium" style={{ color }}>{level}%</span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay * 0.06 + 0.1 }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="relative py-16 sm:py-28 px-4 sm:px-8 md:px-16 overflow-hidden" style={{ background: 'var(--surface)' }}>
      {/* blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-64 rounded-full pointer-events-none opacity-[0.05]" style={{ background: 'var(--pink)', filter: 'blur(90px)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-64 rounded-full pointer-events-none opacity-[0.05]" style={{ background: 'var(--purple)', filter: 'blur(90px)' }} />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="section-tag">Skills & Tools</motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.5rem,7vw,6rem)] leading-none" style={{ fontFamily: 'var(--font-display)' }}>
            <span style={{ color: 'var(--text-primary)' }}>MY </span><span className="grad-text">SKILLS</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm font-light max-w-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Tech stack and AI tools I use daily to build, design and ship products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div key={group.title}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay: gi * 0.12 }}
              className="glass rounded-2xl p-5 sm:p-6">
              {/* header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base" style={{ background: `${group.color}18`, border: `1px solid ${group.color}30` }}>
                  {group.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl" style={{ fontFamily: 'var(--font-display)', color: group.color }}>{group.title}</h3>
                  <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{group.skills.length} skills</p>
                </div>
              </div>
              {group.skills.map((s, i) => <SkillBar key={s.name} {...s} color={group.color} delay={i} />)}
            </motion.div>
          ))}
        </div>

        {/* AI Tools highlight strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10 sm:mt-14 rounded-2xl p-5 sm:p-8 relative overflow-hidden glass"
          style={{ borderColor: 'rgba(192,38,211,0.2)' }}>
          <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(192,38,211,0.06), rgba(255,45,120,0.04))' }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <div className="flex-shrink-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-1" style={{ color: '#c026d3' }}>AI-Powered Development</p>
              <h4 className="text-xl sm:text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>USING AI TOOLS TO BUILD 10× FASTER</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {['ChatGPT','GitHub Copilot','Cursor AI','Claude AI','Midjourney','OpenAI API','Vercel AI SDK','Stable Diffusion'].map(t => (
                <span key={t} className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full"
                  style={{ background: 'rgba(192,38,211,0.1)', color: '#c026d3', border: '1px solid rgba(192,38,211,0.2)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
