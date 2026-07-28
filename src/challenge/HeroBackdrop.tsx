/**
 * Hero "scan effect" backdrop — the lightweight, universally-supported take on
 * the WebGPU depth-scan demo. Renders your HERO_IMAGE as a green duotone with a
 * red scan line sweeping top→bottom (plus a trailing green line and bloom glow)
 * and a subtle pointer parallax. No WebGPU / three.js — plain CSS + Motion, so
 * it works in every browser and inside the single-file build.
 *
 * If HERO_IMAGE is empty or fails to load, it quietly renders nothing and the
 * dark binary-rain background shows through — the hero never breaks.
 */
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import AsciiArt from './AsciiArt'
import { HERO_IMAGE } from './config'

// A local image dropped at src/assets/challenge-hero.(png|jpg|jpeg|webp) takes
// priority and is inlined into the build; otherwise we fall back to the
// HERO_IMAGE config URL. No image at all → the dark binary-rain background.
const heroAssets = import.meta.glob('../assets/challenge-hero.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>
const HERO_SRC = Object.values(heroAssets)[0] || HERO_IMAGE

/** True when a hero image is set — the hero uses this to dial the animated
 *  rain down so it doesn't wash over the character. */
export const HAS_HERO_IMAGE = Boolean(HERO_SRC)

export default function HeroBackdrop() {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  // Pointer parallax — springy translate on the image layer.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.6 })
  const y = useSpring(my, { stiffness: 60, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (!HERO_SRC) return
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * -18)
      my.set((e.clientY / window.innerHeight - 0.5) * -18)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  const showImage = HERO_SRC && !failed

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Image layer (only if an image is set + loads). Light tint only —
          these images are already Matrix-green, so we preserve them. */}
      {showImage && (
        <>
          {/* Wrapper carries the pointer parallax; the <img> carries the slow
              Ken Burns "drift" — kept on separate elements so their transforms
              don't collide. */}
          <motion.div style={{ x, y }} className="absolute inset-0">
            <img
              src={HERO_SRC}
              alt=""
              aria-hidden
              onLoad={() => setReady(true)}
              onError={() => setFailed(true)}
              style={{ objectPosition: '72% 50%' }}
              className={`hero-drift h-full w-full object-cover transition-opacity duration-1000 ${
                ready ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </motion.div>
          {/* gentle green unify + slight darken for text legibility */}
          <div className="absolute inset-0 bg-matrix/12 mix-blend-color" />
          <div className="absolute inset-0 bg-black/25" />
        </>
      )}

      {/* Moving ASCII "code" layer — screen-blended so its green glyphs drift
          over the scene while the dark background drops out. */}
      <div className="absolute inset-0 opacity-45" style={{ mixBlendMode: 'screen' }}>
        <AsciiArt className="h-full w-full" />
      </div>

      {/* Soft red bloom band trailing the line (behind it) */}
      <div
        aria-hidden
        className="matrix-scan absolute inset-x-0 h-24 blur-2xl"
        style={{ background: 'linear-gradient(180deg, rgba(255,42,77,0.28), transparent)' }}
      />
      {/* Red scan line sweeping top → bottom, with bloom */}
      <div
        aria-hidden
        className="matrix-scan absolute inset-x-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #ff2a4d 45%, #ff7a90 50%, #ff2a4d 55%, transparent)',
          boxShadow: '0 0 22px 3px rgba(255,42,77,0.75)',
        }}
      />
      {/* Fainter green scan line, slower + offset in time */}
      <div
        aria-hidden
        className="matrix-scan absolute inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(34,224,107,0.9), transparent)',
          boxShadow: '0 0 16px 2px rgba(34,224,107,0.5)',
          animationDuration: '5.2s',
          animationDelay: '-1.2s',
        }}
      />
    </div>
  )
}
