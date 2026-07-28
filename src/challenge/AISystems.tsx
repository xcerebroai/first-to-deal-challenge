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
    title: 'Find Better Opportunities',
    body: 'AI surfaces the motivated, off-market owners most likely to sell — so you stop guessing which list to pull.',
  },
  {
    icon: PhoneIcon,
    title: 'Respond to Leads Faster',
    body: 'Reply to every lead in seconds with AI-assisted outreach, so no opportunity goes cold while you’re busy.',
  },
  {
    icon: CpuIcon,
    title: 'Know Exactly What to Say',
    body: 'AI drafts your scripts, objection handling, and offers — so you always know the next word on every call and text.',
  },
  {
    icon: TerminalIcon,
    title: 'Automate Your Follow-Up',
    body: 'Set it once and AI runs your follow-up on autopilot, nurturing every lead until they’re ready to deal.',
  },
  {
    icon: DatabaseIcon,
    title: 'Organize Your Entire Business',
    body: 'Your whole pipeline — leads, tasks, conversations — tracked and organized automatically in one place.',
  },
  {
    icon: BoltIcon,
    title: 'Move Your First Deal to Closing',
    body: 'From first contact to signed contract, the system guides your first deal toward the closing table.',
  },
]

export default function AISystems() {
  return (
    <section id="ai" className="bg-matrix-depth relative overflow-hidden py-20 sm:py-28">
      <CodeRain opacity={0.12} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030705] via-transparent to-[#030705]" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 lg:px-8">
        <MatrixHeading
          eyebrow="The New AI-Powered System"
          title={<>Use AI as an <span className="text-matrix text-glow-green">actual employee</span> in your business</>}
          intro="DealMachine's newest AI features handle the work that used to take a whole team. You'll see exactly how the system works — and how to put it to work for you."
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
