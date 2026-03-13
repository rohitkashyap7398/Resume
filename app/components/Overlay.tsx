'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

interface OverlayProps { containerRef: React.RefObject<HTMLDivElement> }

function HeroSection({ sp }: { sp: any }) {
  const opacity = useTransform(sp, [0, 0.15, 0.24], [1, 1, 0])
  const y = useTransform(sp, [0, 0.24], ['0%', '-10%'])
  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none" style={{ opacity, y }}>
      <div className="text-center px-4 sm:px-6">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
          className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-5 sm:mb-7" style={{ color: 'var(--pink)' }}>
          Full Stack Developer · UI/UX Designer · AI Tools
        </motion.p>
        <div>
          <motion.div className="overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.1 }}
              className="block text-[clamp(3.5rem,13vw,11rem)] leading-none" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              ROHIT
            </motion.span>
          </motion.div>
          <motion.div className="overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
            <motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.22 }}
              className="block text-[clamp(3.5rem,13vw,11rem)] leading-none grad-text" style={{ fontFamily: 'var(--font-display)' }}>
              KASHYAP
            </motion.span>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-8 sm:mt-12 flex flex-col items-center gap-3">
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Scroll to explore</span>
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-10 sm:h-14" style={{ background: 'linear-gradient(to bottom, var(--pink), transparent)' }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

function Section2({ sp }: { sp: any }) {
  const opacity = useTransform(sp, [0.22, 0.32, 0.47, 0.56], [0, 1, 1, 0])
  const x = useTransform(sp, [0.22, 0.56], ['-4%', '4%'])
  return (
    <motion.div className="absolute inset-0 flex items-center justify-start z-10 pointer-events-none" style={{ opacity, x }}>
      <div className="pl-[5vw] sm:pl-[8vw] max-w-xl">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: 'var(--yellow)' }}>02 / What I Do</p>
        <h2 className="text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.93]" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          I BUILD<br /><span style={{ color: 'var(--pink)' }}>DIGITAL</span><br />EXPERIENCES.
        </h2>
        <div className="mt-5 w-20 h-px opacity-70" style={{ background: 'var(--pink)' }} />
        <p className="mt-3 text-xs sm:text-sm font-light leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
          MERN stack + AI tools — scalable APIs, beautiful UIs, everything in between.
        </p>
      </div>
    </motion.div>
  )
}

function Section3({ sp }: { sp: any }) {
  const opacity = useTransform(sp, [0.56, 0.66, 0.83, 0.93], [0, 1, 1, 0])
  const x = useTransform(sp, [0.56, 0.93], ['4%', '-4%'])
  return (
    <motion.div className="absolute inset-0 flex items-center justify-end z-10 pointer-events-none" style={{ opacity, x }}>
      <div className="pr-[5vw] sm:pr-[8vw] max-w-xl text-right">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-3 sm:mb-4" style={{ color: 'var(--yellow)' }}>03 / Philosophy</p>
        <h2 className="text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.93]" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          DESIGN<br />MEETS<br /><span className="grad-text">ENGINEERING.</span>
        </h2>
        <div className="mt-5 ml-auto w-20 h-px opacity-70" style={{ background: 'var(--yellow)' }} />
        <p className="mt-3 text-xs sm:text-sm font-light leading-relaxed max-w-xs ml-auto" style={{ color: 'var(--text-secondary)' }}>
          From Figma wireframes to deployed full-stack products — one fluid process.
        </p>
      </div>
    </motion.div>
  )
}

function NavHUD({ sp }: { sp: any }) {
  const scaleX = useTransform(sp, [0, 1], ['0%', '100%'])
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-10 py-4 sm:py-6 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(13,10,15,0.8), transparent)' }}>
        <span className="font-mono text-sm sm:text-base tracking-widest grad-text font-bold">RK.</span>
        <div className="flex items-center gap-4 sm:gap-8 pointer-events-auto">
          {['Work','Skills','About','Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-colors duration-300 hidden sm:block"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => { (e.currentTarget as any).style.color = 'var(--pink)' }}
              onMouseLeave={e => { (e.currentTarget as any).style.color = 'var(--muted)' }}>
              {item}
            </a>
          ))}
          {/* Mobile hamburger hint */}
          <div className="sm:hidden flex flex-col gap-1">
            {[0,1,2].map(i => <div key={i} className="w-5 h-px" style={{ background: 'var(--pink)' }} />)}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-px z-50 pointer-events-none" style={{ background: 'rgba(255,45,120,0.1)' }}>
        <motion.div className="h-full" style={{ width: scaleX, background: 'linear-gradient(to right, var(--pink), var(--yellow))' }} />
      </div>
    </>
  )
}

export default function Overlay({ containerRef }: OverlayProps) {
  const { scrollYProgress: sp } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  return (
    <>
      <NavHUD sp={sp} />
      <div className="sticky top-0 h-screen w-full pointer-events-none" style={{ zIndex: 10 }}>
        <HeroSection sp={sp} />
        <Section2 sp={sp} />
        <Section3 sp={sp} />
      </div>
    </>
  )
}
