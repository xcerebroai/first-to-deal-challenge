/**
 * Sticky top nav for the challenge page — terminal-green brandmark, section
 * anchors, and a "> REGISTER" CTA. Translucent on scroll over the dark hero.
 */
import { useEffect, useState } from 'react'
import { BRAND } from './config'

const LINKS = [
  { label: 'The Challenge', href: '#challenge' },
  { label: 'AI Systems', href: '#ai' },
  { label: 'Rewards', href: '#rewards' },
  { label: 'Host', href: '#host' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-matrix/15 bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <a
          href="#top"
          className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-matrix text-glow-green"
        >
          {'>'} {BRAND}
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.12em] text-matrix/70 transition-colors hover:text-matrix-bright"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#register"
          className="rounded-sm border border-matrix/50 bg-matrix/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-matrix-bright transition-all hover:bg-matrix/20 hover:shadow-[0_0_16px_rgba(34,224,107,0.4)]"
        >
          {'>'} Register
        </a>
      </div>
    </header>
  )
}
