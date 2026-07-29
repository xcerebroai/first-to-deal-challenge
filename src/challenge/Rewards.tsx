/**
 * Prize stack — complete the challenge for a chance to win a 1-year Jarvis
 * subscription, Lifetime REI Cheat Codes, and Lifetime AI Cheat Codes.
 */
import { Reveal } from '../components/ui'
import { MatrixHeading } from './section'
import { CheckIcon, CpuIcon, TerminalIcon, BoltIcon } from './icons'

const REWARDS = [
  {
    icon: CpuIcon,
    tag: 'Prize 01',
    title: '1-Year Jarvis Subscription',
    body: 'A full year inside Jarvis — the AI system that finds leads, automates your follow-up, and moves deals toward the closing table faster.',
    value: '1-Year Access',
  },
  {
    icon: TerminalIcon,
    tag: 'Prize 02',
    title: 'Lifetime REI Cheat Codes',
    body: 'Lifetime access to the real-estate-investing playbooks, scripts, and shortcuts that get contracts signed.',
    value: 'Lifetime',
  },
  {
    icon: BoltIcon,
    tag: 'Prize 03',
    title: 'Lifetime AI Cheat Codes',
    body: 'Lifetime access to the AI prompts, automations, and workflows that put your business on autopilot.',
    value: 'Lifetime',
  },
]

export default function Rewards() {
  return (
    <section id="rewards" className="bg-matrix-deep relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/30 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <MatrixHeading
          eyebrow="Complete The Challenge To Win"
          title={<>Cheat codes <span className="text-matrix text-glow-green">up for grabs</span></>}
          intro="Show up, run the daily action challenge, and you're in the running to win the exact tools that run a real estate business on AI."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {REWARDS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="matrix-card relative flex h-full flex-col rounded-lg p-7">
                <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-matrix/60">
                  {r.tag}
                </span>
                <div className="mt-4 flex h-13 w-13 items-center justify-center rounded-md border border-matrix/30 bg-matrix/10 p-3 text-matrix-bright">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-white">{r.title}</h3>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-slate-300/80">
                  {r.body}
                </p>
                <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-sm border border-matrix/25 bg-matrix/10 px-3 py-1 font-mono text-xs font-bold text-matrix-bright">
                  <CheckIcon className="h-3.5 w-3.5" />
                  {r.value}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <p className="text-center font-mono text-sm text-matrix/70">
            {'> '}Complete both days + your action challenge for your shot at{' '}
            <span className="font-bold text-matrix-bright text-glow-green">the full stack</span>.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
