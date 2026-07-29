/**
 * Challenge hero — Matrix code-rain background, a terminal "manifesto" block,
 * the two signature CTAs (red pill / green "execute" pill), and the three
 * live-day chips. Mirrors the reference's energy, updated for the AI Edition.
 */
import { motion } from 'motion/react'
import { Grain } from '../components/ui'
import CodeRain from './CodeRain'
import HeroBackdrop, { HAS_HERO_IMAGE } from './HeroBackdrop'
import { ArrowRightIcon, CalendarIcon } from './icons'
import { DAYS } from './config'

const MANIFESTO = [
  'REAL ESTATE HAS CHANGED.',
  'MARKETING HAS CHANGED.',
  'AI CHANGED HOW FAST YOU FIND, FOLLOW UP, AND CLOSE.',
  'THIS IS NOT THE SAME CHALLENGE.',
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.12 + i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section
      id="top"
      className="bg-matrix-depth relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {/* Scan-effect image backdrop (renders only if a hero image is set) */}
      <HeroBackdrop />
      {/* No image → animated binary rain fills the hero. With an image, the
          photo + moving ASCII layer carry the motion instead. */}
      {!HAS_HERO_IMAGE && <CodeRain opacity={0.7} />}
      <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
      <Grain className="opacity-[0.08] mix-blend-overlay" />
      {/* Darken the left (text) side; let the character breathe on the right.
          A flat scrim on mobile keeps centered text legible. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(3,7,5,0.94) 0%, rgba(3,7,5,0.78) 30%, rgba(3,7,5,0.38) 55%, transparent 80%)' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[#030705]/45 lg:hidden" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#030705]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl px-5 lg:px-10">
       <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 rounded-full border border-matrix/40 bg-matrix/10 px-4 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-matrix-bright backdrop-blur-sm"
        >
          <CalendarIcon className="h-4 w-4" />
          2-Day Live Challenge · New DealMachine AI Features
        </motion.span>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="matrix-caret mt-8 font-mono text-sm uppercase tracking-[0.16em] text-matrix/80"
        >
          {'> '}the first to deal challenge is back
        </motion.p>

        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-5 font-heading text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
        >
          NEW AI FEATURES.
          <br />
          <span className="text-matrix text-glow-green">MORE DEALS, CLOSED FASTER.</span>
        </motion.h1>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-8 max-w-2xl space-y-1.5 border-y border-matrix/15 py-5 text-left font-mono text-[0.82rem] leading-relaxed text-matrix/85 sm:text-sm lg:mx-0"
        >
          {MANIFESTO.map((line) => (
            <p key={line}>
              <span className="text-matrix-bright/60">{'>'}</span> {line}
            </p>
          ))}
        </motion.div>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-slate-300/90 sm:text-lg lg:mx-0"
        >
          This time it's not another wholesaling blueprint. I'm unveiling the new AI-powered
          system that finds opportunities, responds to leads, and moves your first deal toward
          the closing table — live over 2 days.
        </motion.p>

        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:items-start lg:justify-start"
        >
          <a
            href="#register"
            className="group inline-flex items-center justify-center gap-2 rounded-sm bg-redpill px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_28px_-4px_rgba(255,42,77,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-redpill-deep"
          >
            {'>'} Take the Red Pill
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#challenge"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-matrix/50 bg-matrix/10 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-matrix-bright backdrop-blur-sm transition-all duration-200 hover:bg-matrix/20 hover:shadow-[0_0_22px_rgba(34,224,107,0.4)]"
          >
            {'>'} Execute Deal Mode
          </a>
        </motion.div>

        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-11 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2 lg:mx-0"
        >
          {DAYS.map((d) => (
            <div
              key={d.n}
              className="matrix-card rounded-md px-4 py-3 text-left"
            >
              <div className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-matrix-bright">
                {d.label}
              </div>
              <div className="mt-1 font-body text-[0.8rem] text-slate-300">{d.when}</div>
            </div>
          ))}
        </motion.div>
       </div>
      </div>

      {/* Scroll-to-explore indicator */}
      <motion.a
        href="#challenge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-matrix/60 transition-colors hover:text-matrix-bright"
      >
        {'>'} Scroll to explore
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 22 22"
          fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M11 5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 12L11 17L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      </motion.a>
    </section>
  )
}
