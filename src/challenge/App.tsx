/**
 * First to Deal Challenge — DealMachine AI Edition. Standalone landing page.
 * A Vite entry (challenge.html → main.tsx → this) reusing the shared design
 * system (../components/ui, index.css) with a Matrix theme layered in
 * (src/challenge/section.tsx + the .bg-matrix-* / .matrix-* utilities).
 *
 * Lead-capture GATE: the hero is open, then the opt-in form (Register). The
 * rest of the page (Challenge, AISystems, Rewards, Host) is blurred + locked
 * until the visitor opts in; unlocking is remembered via localStorage.
 *
 * Section order:
 *   1. Hero  2. Register (gate: countdown + opt-in form)
 *   3. [locked] Challenge  4. AISystems  5. Rewards  6. Host   7. Footer
 */
import { useState, type ReactNode } from 'react'
import Nav from './Nav'
import Hero from './Hero'
import Challenge from './Challenge'
import AISystems from './AISystems'
import Rewards from './Rewards'
import Register from './Register'
import Host from './Host'
import Footer from './Footer'
import { LockIcon } from './icons'

const STORAGE_KEY = 'ftd_unlocked'

function useUnlock() {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })
  const unlock = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* private mode — unlock for this session only */
    }
    setUnlocked(true)
  }
  return { unlocked, unlock }
}

function scrollToGate() {
  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
}

/** Blurred teaser of the gated content with a lock overlay, until `unlocked`. */
function LockedContent({ unlocked, children }: { unlocked: boolean; children: ReactNode }) {
  if (unlocked) return <>{children}</>
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none max-h-[340px] select-none overflow-hidden opacity-60 blur-[7px]"
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#030705]" />
      <div className="relative z-10 -mt-24 flex flex-col items-center gap-4 px-5 pb-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-matrix/30 bg-matrix/10 text-matrix-bright">
          <LockIcon className="h-6 w-6" />
        </div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-matrix">
          {'> '}the rest is locked
        </p>
        <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
          Opt in to unlock the full challenge
        </h3>
        <p className="max-w-md font-body text-sm leading-relaxed text-slate-300/80">
          The 2-day schedule, the new DealMachine AI features, the prizes, and your host — all
          unlock the second you drop your info.
        </p>
        <button
          type="button"
          onClick={scrollToGate}
          className="group mt-1 inline-flex items-center gap-2 rounded-sm bg-redpill px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_28px_-4px_rgba(255,42,77,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-redpill-deep"
        >
          {'>'} Unlock Now
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const { unlocked, unlock } = useUnlock()
  return (
    <div className="min-h-screen bg-[#030705]">
      <Nav />
      <main>
        <Hero />
        <Register unlocked={unlocked} onUnlock={unlock} />
        <LockedContent unlocked={unlocked}>
          <Challenge />
          <AISystems />
          <Rewards />
          <Host />
        </LockedContent>
      </main>
      <Footer />
    </div>
  )
}
