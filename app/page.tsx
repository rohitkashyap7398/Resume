'use client'

import { useRef } from 'react'
import ScrollyCanvas from './components/ScrollyCanvas'
import Overlay from './components/Overlay'
import Marquee from './components/Marquee'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <main>
      {/* 1. Scrollytelling hero (500vh) */}
      <div ref={scrollRef} className="relative" style={{ height: '500vh' }}>
        <ScrollyCanvas containerRef={scrollRef} />
        <Overlay containerRef={scrollRef} />
      </div>

      {/* 2. Scrolling tech strip */}
      <Marquee />

      {/* 3. Projects (100+) */}
      <Projects />

      {/* 4. Skills with AI tools */}
      <Skills />

      {/* 5. Services */}
      <Services />

      {/* 6. About + Experience + Education */}
      <About />

      {/* 7. Contact */}
      <Contact />
    </main>
  )
}
