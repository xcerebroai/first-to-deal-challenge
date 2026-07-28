/**
 * Matrix "digital rain" — a lightweight canvas background for dark sections.
 * Drop inside a `relative` container; it fills it absolutely and sits behind
 * content (add your own z-index on the content). Respects prefers-reduced-motion
 * (renders one static frame) and caps to ~24fps to stay light on the CPU.
 */
import { useEffect, useRef } from 'react'

// Binary rain — pure 0/1 streams. Weighted lightly toward 0 so the columns
// read as flowing binary rather than an even checkerboard.
const GLYPHS = ['0', '1', '0', '1', '0']

export default function CodeRain({
  className = '',
  opacity = 0.5,
}: {
  className?: string
  opacity?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let columns = 0
    let drops: number[] = []
    const fontSize = 16
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const parent = canvas!.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.floor(width * dpr)
      canvas!.height = Math.floor(height * dpr)
      canvas!.style.width = width + 'px'
      canvas!.style.height = height + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.ceil(width / fontSize)
      drops = new Array(columns).fill(0).map(() => Math.random() * -50)
    }

    function draw() {
      // translucent black wash → trailing fade
      // Lighter wash = longer, more visible trails.
      ctx!.fillStyle = 'rgba(3, 7, 5, 0.10)'
      ctx!.fillRect(0, 0, width, height)
      ctx!.font = `${fontSize}px "Share Tech Mono", monospace`

      for (let i = 0; i < columns; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Bright white-green head, then vivid phosphor green for the trail.
        ctx!.fillStyle = Math.random() > 0.94 ? '#d7ffe6' : '#2aff77'
        ctx!.fillText(char, x, y)

        if (y > height && Math.random() > 0.975) drops[i] = 0
        drops[i] += 1
      }
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduced) {
      // one static pass so the section still reads as "code"
      ctx.fillStyle = '#030705'
      ctx.fillRect(0, 0, width, height)
      for (let n = 0; n < 60; n++) draw()
      return () => window.removeEventListener('resize', resize)
    }

    // Seed a full field up front so the code is visible on the very first
    // painted frame (otherwise the columns start empty and take ~2s to fill).
    for (let i = 0; i < 60; i++) draw()

    let raf = 0
    let last = 0
    const frameMs = 1000 / 24
    function loop(t: number) {
      raf = requestAnimationFrame(loop)
      if (t - last < frameMs) return
      last = t
      draw()
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    />
  )
}
