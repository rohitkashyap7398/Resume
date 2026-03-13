'use client'

import { motion } from 'framer-motion'

const ITEMS = ['React','Next.js','Node.js','MongoDB','Framer Motion','Three.js','Figma','TypeScript','Tailwind CSS','GSAP','Python','React Native','ChatGPT','GitHub Copilot','Cursor AI','OpenAI API','Express.js','Socket.io','Redux','Vercel']

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="relative py-4 sm:py-5 overflow-hidden" style={{ background: 'var(--surface2)', borderTop: '1px solid rgba(255,45,120,0.08)', borderBottom: '1px solid rgba(255,45,120,0.08)' }}>
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--surface2), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--surface2), transparent)' }} />

      <motion.div
        className="flex items-center gap-6 sm:gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-5 sm:gap-7 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
            {item}
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--pink)', opacity: 0.6 }} />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
