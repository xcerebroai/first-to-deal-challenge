/**
 * Small shared UI primitives used across the homepage.
 * - Reveal: subtle, restrained scroll-in animation wrapper (Motion).
 * - SectionHeading: consistent eyebrow + title + gold rule + intro.
 */
import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'

/**
 * Film-grain overlay. Drop inside any `relative` container (alongside other
 * decorative layers). Tune intensity with Tailwind opacity utilities, e.g.
 * `<Grain className="opacity-[0.07] mix-blend-overlay" />`.
 */
export function Grain({ className = 'opacity-[0.05] mix-blend-overlay' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`grain-texture pointer-events-none absolute inset-0 ${className}`}
    />
  )
}

/**
 * <img> that swaps to a fallback if the file is missing — so a not-yet-added
 * placeholder never shows a broken-image icon. `fallback` defaults to a branded
 * navy panel. Used by the hero, product cards, TrackTool, and founder portrait.
 */
export function ImageWithFallback({
  src,
  alt,
  className,
  fallback,
  eager = false,
}: {
  src: string
  alt: string
  className?: string
  fallback?: ReactNode
  eager?: boolean
}) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <>
        {fallback ?? (
          <div className="bg-navy-depth grain-texture flex h-full w-full items-center justify-center">
            <span className="font-heading text-xs font-semibold uppercase tracking-widest text-gold/70">
              {alt}
            </span>
          </div>
        )}
      </>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

/** Easing + distance tuned to feel premium and understated (no bounce). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  light = false,
  accent = 'gold',
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'center' | 'left'
  light?: boolean
  /** Accent color for the eyebrow + rule. 'gold' = SurplusFunds site,
   *  'electric' = X Cerebro AI bootcamp page. */
  accent?: 'gold' | 'electric'
}) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  const eyebrowColor =
    accent === 'electric' ? 'text-electric' : light ? 'text-gold' : 'text-royal'
  const ruleClass = accent === 'electric' ? 'electric-rule' : 'gold-rule'
  return (
    <div className={`flex flex-col ${alignCls}`}>
      {eyebrow && (
        <Reveal>
          <span
            className={`font-heading text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowColor}`}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05} className="mt-4">
        <h2
          className={`max-w-3xl text-balance font-heading text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
            light ? 'text-white' : 'text-navy'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-5">
        <div className={`${ruleClass} ${align === 'center' ? 'mx-auto' : ''}`} />
      </Reveal>
      {intro && (
        <Reveal delay={0.15} className="mt-6 max-w-2xl">
          <p
            className={`text-pretty font-body text-base leading-relaxed sm:text-[1.0625rem] ${
              light ? 'text-slate-300' : 'text-charcoal/70'
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}
