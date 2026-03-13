'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [copied, setCopied] = useState(false)

  return (
    <section id="contact" className="relative py-16 sm:py-32 px-4 sm:px-8 md:px-16 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* blobs */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none opacity-[0.07]" style={{ background: 'var(--pink)', filter: 'blur(100px)' }} />
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full pointer-events-none opacity-[0.05]" style={{ background: 'var(--purple)', filter: 'blur(100px)' }} />
      {/* giant bg text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[18vw] leading-none select-none pointer-events-none whitespace-nowrap opacity-[0.025]"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--pink)' }}>HELLO.</div>

      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-tag justify-center mb-6">Get in touch</motion.div>

        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.1 }}
          className="text-[clamp(3rem,10vw,8rem)] leading-none mb-6 sm:mb-8" style={{ fontFamily: 'var(--font-display)' }}>
          <span style={{ color: 'var(--text-primary)' }}>LET'S</span><br />
          <span className="grad-text">CREATE</span><br />
          <span style={{ WebkitTextStroke: '1px var(--text-secondary)', color: 'transparent' }}>TOGETHER.</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto mb-3 sm:mb-5" style={{ color: 'var(--text-secondary)' }}>
          Open to internships, full-time roles and freelance projects. Let's build something great together.
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.38 }}
          className="font-mono text-sm sm:text-base mb-8 sm:mb-10 grad-text font-bold">
          📱 +91 739883976
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.42 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
          <button onClick={() => { navigator.clipboard.writeText('rohitkashyap3464@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            className="font-mono text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
            style={{ background: 'linear-gradient(135deg, var(--pink), var(--orange))', color: '#fff' }}>
            {copied ? '✓ Copied!' : 'rohitkashyap3464@gmail.com'}
          </button>
          <a href="mailto:rohitkashyap3464@gmail.com"
            className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 w-full sm:w-auto text-center"
            style={{ border: '1px solid rgba(255,45,120,0.3)', color: 'var(--text-secondary)' }}
            onMouseEnter={e => { (e.currentTarget as any).style.borderColor = 'var(--pink)'; (e.currentTarget as any).style.color = 'var(--pink)' }}
            onMouseLeave={e => { (e.currentTarget as any).style.borderColor = 'rgba(255,45,120,0.3)'; (e.currentTarget as any).style.color = 'var(--text-secondary)' }}>
            Send Email →
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
          className="flex flex-wrap justify-center gap-5 sm:gap-10">
          {[
            { label: 'GitHub', href: 'https://github.com/rohitkashyap7398' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rohit-kashyap73' },
            { label: 'Email', href: 'mailto:rohitkashyap3464@gmail.com' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-colors duration-300"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => { (e.currentTarget as any).style.color = 'var(--pink)' }}
              onMouseLeave={e => { (e.currentTarget as any).style.color = 'var(--muted)' }}>
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
        className="mt-16 sm:mt-24 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto"
        style={{ borderTop: '1px solid rgba(255,45,120,0.08)' }}>
        <span className="font-mono text-[10px] sm:text-[11px] text-center" style={{ color: 'var(--muted)' }}>© 2025 Rohit Kashyap · Lucknow, India</span>
        <span className="font-mono text-[10px] sm:text-[11px] text-center" style={{ color: 'var(--muted)' }}>Built with Next.js + Framer Motion</span>
      </motion.div>
    </section>
  )
}
