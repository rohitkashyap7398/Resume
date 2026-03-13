'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

const TOTAL_FRAMES = 96
const FRAME_PATH = (i: number) =>
  `/sequence/frame_${String(i).padStart(3, '0')}.jpg`

interface ScrollyCanvasProps {
  containerRef: React.RefObject<HTMLDivElement>
}

export default function ScrollyCanvas({ containerRef }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false))
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>()
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // High-quality cover-fit draw
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    const cw = canvas.width / (window.devicePixelRatio || 1)
    const ch = canvas.height / (window.devicePixelRatio || 1)
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // Cover fit: fill entire canvas, crop excess
    const scale = Math.max(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2

    ctx.clearRect(0, 0, cw, ch)
    // High quality image smoothing
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, dx, dy, dw, dh)
  }, [])

  const renderFrame = useCallback((index: number) => {
    const img = imagesRef.current[index]
    if (img && loadedRef.current[index]) {
      drawFrame(img)
    }
  }, [drawFrame])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'

    const ctx = canvas.getContext('2d', { alpha: false })
    if (ctx) {
      ctx.scale(dpr, dpr)
      ctxRef.current = ctx
    }
    renderFrame(currentFrameRef.current)
  }, [renderFrame])

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES)

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.src = FRAME_PATH(i + 1)
      img.onload = () => {
        loadedRef.current[i] = true
        if (i === 0) {
          imagesRef.current = images
          renderFrame(0)
        }
      }
      images[i] = img
    }

    imagesRef.current = images

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [renderFrame, resizeCanvas])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const frameIndex = Math.round(
      Math.min(Math.max(latest * (TOTAL_FRAMES - 1), 0), TOTAL_FRAMES - 1)
    )
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => renderFrame(frameIndex))
    }
  })

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', position: 'absolute', inset: 0 }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(13,10,15,0.82) 100%)',
        }}
      />
      {/* Top gradient */}
      <div
        className="absolute inset-x-0 top-0 h-36 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, var(--bg), transparent)' }}
      />
      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
      />
    </div>
  )
}
