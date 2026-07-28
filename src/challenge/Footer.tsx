/**
 * Challenge footer — terminal brandmark, quick anchors, legal disclaimer.
 * Standalone; edit copy/links below.
 */
import { BRAND, HOST_NAME } from './config'

const LINKS = [
  { label: 'The Challenge', href: '#challenge' },
  { label: 'AI Systems', href: '#ai' },
  { label: 'Rewards', href: '#rewards' },
  { label: 'Register', href: '#register', external: false },
]

export default function Footer() {
  return (
    <footer className="bg-matrix-deep relative text-slate-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/30 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#top"
            className="font-mono text-base font-bold uppercase tracking-[0.18em] text-matrix text-glow-green"
          >
            {'>'} {BRAND}
          </a>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="font-mono text-xs uppercase tracking-[0.1em] text-matrix/60 transition-colors hover:text-matrix-bright"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-matrix/12 pt-8">
          <p className="max-w-3xl font-body text-xs leading-relaxed text-slate-500">
            [Placeholder disclaimer — replace with your own legal copy.] The First to Deal Challenge
            is an educational live training. Real estate investing carries risk; results depend on
            the work you put in and are not guaranteed. Not financial, legal, or investment advice.
            DealMachine is a trademark of its respective owner and is referenced for identification
            only.
          </p>
          <p className="mt-6 font-body text-xs text-slate-500">
            © {new Date().getFullYear()} {HOST_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
