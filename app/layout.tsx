'use client'

import './globals.css'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const trailX = useSpring(mouseX, { stiffness: 150, damping: 22, mass: 0.4 })
  const trailY = useSpring(mouseY, { stiffness: 150, damping: 22, mass: 0.4 })
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).matches('a,button,[role="button"]')) {
        if (dotRef.current) { dotRef.current.style.width = '22px'; dotRef.current.style.height = '22px' }
        if (ringRef.current) { ringRef.current.style.opacity = '0'; ringRef.current.style.transform = 'translate(-50%,-50%) scale(2)' }
      }
    }
    const out = () => {
      if (dotRef.current) { dotRef.current.style.width = '8px'; dotRef.current.style.height = '8px' }
      if (ringRef.current) { ringRef.current.style.opacity = '0.4'; ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)' }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout', out)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); window.removeEventListener('mouseout', out) }
  }, [])

  return (
    <>
      <motion.div ref={dotRef} className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
        style={{ x: mouseX, y: mouseY, width: 8, height: 8, background: 'var(--pink)', translateX: '-50%', translateY: '-50%', transition: 'width 0.2s, height 0.2s' }} />
      <motion.div ref={ringRef} className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998]"
        style={{ x: trailX, y: trailY, width: 34, height: 34, border: '1px solid var(--pink)', translateX: '-50%', translateY: '-50%', opacity: 0.4, transition: 'opacity 0.25s, transform 0.25s' }} />
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Rohit Kashyap — Full Stack Developer</title>
        <meta name="description" content="MERN Stack Developer | UI/UX Designer | Lucknow, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d0a0f" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
