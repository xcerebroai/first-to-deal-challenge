/**
 * "What happens across 3 days" — the day-by-day roadmap plus the three pillars
 * of the challenge (live coaching / AI software training / scripts & systems).
 * Section id="challenge" (hero "Execute Deal Mode" scrolls here).
 */
import { Reveal } from '../components/ui'
import { MatrixHeading } from './section'
import { VideoIcon, CpuIcon, TerminalIcon } from './icons'
import { DAYS } from './config'

const ROADMAP = [
  {
    ...DAYS[0],
    title: 'Set Up & Find',
    body: 'Set up your deal system, turn on the AI, and use it to surface better opportunities and work your leads — then take on your first action challenge.',
  },
  {
    ...DAYS[1],
    title: 'Automate & Close',
    body: 'Automate your follow-up, organize your whole pipeline, and let AI tell you exactly what to say — moving your first deal toward the closing table.',
  },
]

const PILLARS = [
  {
    icon: VideoIcon,
    title: 'Live Coaching',
    body: 'Learn directly from me in 2 power-packed live sessions. Cameras on, questions answered, no fluff.',
  },
  {
    icon: CpuIcon,
    title: 'New DealMachine Features & Tools',
    body: "See DealMachine's brand-new AI features and tools first-hand — how the system works, and how to use AI to work your leads.",
  },
  {
    icon: TerminalIcon,
    title: 'Scripts & Systems',
    body: 'Copy-paste the exact scripts, offers, and AI-driven follow-up sequences that talk to sellers and get deals signed.',
  },
]

export default function Challenge() {
  return (
    <section id="challenge" className="bg-matrix-deep relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/30 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <MatrixHeading
          eyebrow="2 Days Live · Aug 5–6"
          title={<>Follow the exact steps to your <span className="text-matrix text-glow-green">first deal</span></>}
          intro="Join me live both days. Every session builds on the last — by Day 2 you're not taking notes, you're executing."
        />

        {/* Day-by-day roadmap */}
        <div className="mx-auto mt-14 grid max-w-3xl gap-5 md:grid-cols-2">
          {ROADMAP.map((d, i) => (
            <Reveal key={d.n} delay={i * 0.08}>
              <div className="matrix-card h-full rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-matrix-bright">
                    {d.label}
                  </span>
                  <span className="font-mono text-5xl font-extrabold leading-none text-matrix/15">
                    0{d.n}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[0.72rem] text-matrix/60">{d.when}</div>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">{d.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-slate-300/80">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Three pillars */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-lg border border-matrix/12 bg-black/30 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md border border-matrix/30 bg-matrix/10 text-matrix-bright">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-mono text-sm font-bold uppercase tracking-[0.12em] text-white">
                  {p.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-slate-300/80">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
