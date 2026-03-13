'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EXPERIENCE = [
  { company: 'Sheryians Pvt. Ltd.', role: 'Full Stack Dev Intern · UI/UX Designer', period: 'Sep 2025 – Present', dot: '#ff2d78' },
  { company: 'Digi{Coders} Technologies', role: 'Frontend Developer', period: 'Jan 2024 – Dec 2024', dot: '#ffd60a' },
]
const EDUCATION = [
  { deg: 'B.Tech — Computer Science', school: 'Shrinathji Institute For Technical Education', year: '2025 (Appearing)' },
  { deg: 'Diploma — Computer Science', school: 'BTEUP Board Lucknow', year: '2024 (Pass)' },
  { deg: 'B.Sc — Agra University', school: 'Dr. Bhimrao Ambedkar', year: '2022 (Pass)' },
]
const STATS = [
  { num: '2+',   label: 'Years Exp.' },
  { num: '100+', label: 'Projects' },
  { num: '2',    label: 'Companies' },
  { num: '6+',   label: 'Tech Stacks' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" className="relative py-16 sm:py-28 px-4 sm:px-8 md:px-16 overflow-hidden" style={{ background: 'var(--surface)' }}>
      {/* grid lines */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--pink) 1px,transparent 1px),linear-gradient(90deg,var(--pink) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      {/* blob */}
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-[0.06]" style={{ background: 'var(--pink)', filter: 'blur(90px)' }} />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="section-tag">About Me</motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mt-2">
          {/* LEFT */}
          <div>
            <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[clamp(2.2rem,5vw,4rem)] leading-none mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              <span style={{ color: 'var(--text-primary)' }}>MERN STACK </span><span className="grad-text">DEVELOPER</span><br />
              <span style={{ color: 'var(--text-primary)' }}>FROM LUCKNOW.</span>
            </motion.h2>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
              className="space-y-3 text-xs sm:text-sm font-light leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              <p>B.Tech CS graduate with strong expertise in Full Stack Development (MERN Stack) and Java with Data Structures & Algorithms. Skilled in building scalable web apps and designing intuitive UIs with Figma.</p>
              <p>Currently interning at Sheryians Pvt. Ltd. as Full Stack Developer & UI/UX Designer, actively using AI-powered tools to build faster and smarter. Previously delivered multiple projects at Digi&#123;Coders&#125; Technologies, Lucknow.</p>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {STATS.map(({ num, label }) => (
                <div key={label} className="glass rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl mb-0.5 grad-text font-bold" style={{ fontFamily: 'var(--font-display)' }}>{num}</div>
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Experience */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--pink)' }}>Experience</p>
              <div className="space-y-3">
                {EXPERIENCE.map((e) => (
                  <div key={e.company} className="glass rounded-xl p-4 flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: e.dot }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] sm:text-xs font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>{e.company}</p>
                      <p className="text-[10px] sm:text-[11px] font-light" style={{ color: 'var(--text-secondary)' }}>{e.role}</p>
                    </div>
                    <span className="font-mono text-[9px] sm:text-[10px] flex-shrink-0" style={{ color: 'var(--muted)' }}>{e.period}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            {/* Education */}
            <div className="glass rounded-2xl p-5 sm:p-6 mb-6" style={{ borderColor: 'rgba(255,45,120,0.12)' }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-5" style={{ color: 'var(--pink)' }}>Education</p>
              <div className="space-y-4">
                {EDUCATION.map((e, i) => (
                  <div key={e.deg} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-[10px]" style={{ background: 'rgba(255,45,120,0.1)', color: 'var(--pink)', border: '1px solid rgba(255,45,120,0.2)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{e.deg}</p>
                      <p className="text-[10px] sm:text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{e.school}</p>
                      <p className="font-mono text-[9px] mt-0.5" style={{ color: 'var(--pink)' }}>{e.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="glass rounded-2xl p-5 sm:p-6 mb-6" style={{ borderColor: 'rgba(255,45,120,0.12)' }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--pink)' }}>Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {['React','Next.js','Node.js','Express','MongoDB','MySQL','TypeScript','Tailwind','Framer Motion','Three.js','GSAP','Figma','React Native','Python','Django','Java'].map((t, i) => (
                  <motion.span key={t}
                    initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.03, duration: 0.3 }}
                    className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full"
                    style={{ border: '1px solid rgba(255,45,120,0.15)', color: 'var(--text-secondary)', background: 'rgba(255,45,120,0.04)' }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Computer course */}
            <div className="glass rounded-2xl p-5 sm:p-6" style={{ borderColor: 'rgba(255,213,10,0.12)' }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--yellow)' }}>NEXA Computer Institute (2022)</p>
              <div className="flex flex-wrap gap-2">
                {['MS Excel','MS Word','PowerPoint','Tally'].map(t => (
                  <span key={t} className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,213,10,0.08)', color: 'var(--yellow)', border: '1px solid rgba(255,213,10,0.18)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
