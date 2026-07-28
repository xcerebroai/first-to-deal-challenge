/**
 * "The AI Edition" — what's new in DealMachine's latest update and how the
 * challenge puts each AI system to work. This is the differentiator vs. the
 * original challenge: the whole workflow now runs on AI.
 */
import { Reveal } from '../components/ui'
import CodeRain from './CodeRain'
import { MatrixHeading } from './section'
import { TargetIcon, DatabaseIcon, CpuIcon, PhoneIcon, BoltIcon, TerminalIcon } from './icons'

const SYSTEMS = [
  {
    icon: TargetIcon,
    title: 'AI Deal Finder',
    body: 'Point the AI at any market and it surfaces the most motivated, off-market sellers — no more guessing which list to pull.',
  },
  {
    icon: DatabaseIcon,
    title: 'AI Lists & Skip Trace',
    body: 'Build hyper-targeted lead lists and pull owner phone numbers and emails in seconds, enriched automatically.',
  },
  {
    icon: CpuIcon,
    title: 'AI Comps & Underwriting',
    body: 'Instant comparable sales and deal math, so you know your max offer before you ever pick up the phone.',
  },
  {
    icon: PhoneIcon,
    title: 'AI Outreach & Dialer',
    body: 'Reach owners at scale with the AI-assisted dialer and follow-up sequences that keep every lead warm.',
  },
  {
    icon: BoltIcon,
    title: 'AI Assistant On Call',
    body: 'Your always-on real-estate assistant answers questions, drafts offers, and tells you the next best move.',
  },
  {
    icon: TerminalIcon,
    title: 'Automations That Run 24/7',
    body: 'Set it once and the system tracks, tags, and nurtures your pipeline while you sleep. You just close.',
  },
]

export default function AISystems() {
  return (
    <section id="ai" className="bg-matrix-depth relative overflow-hidden py-20 sm:py-28">
      <CodeRain opacity={0.12} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030705] via-transparent to-[#030705]" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 lg:px-8">
        <MatrixHeading
          eyebrow="Unlock the Intelligent Strategy System"
          title={<>DealMachine, now with a <span className="text-matrix text-glow-green">full AI stack</span></>}
          intro="The newest DealMachine update turns finding, analyzing, and closing deals into one AI-powered workflow — and you'll run all of it inside the challenge."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="matrix-card group h-full rounded-lg p-6 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-matrix/30 bg-matrix/10 text-matrix-bright transition-shadow group-hover:shadow-[0_0_20px_rgba(34,224,107,0.35)]">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-slate-300/80">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
