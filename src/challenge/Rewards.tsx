/**
 * "The Matrix Rewards" — the three cheat codes every participant unlocks:
 * 1-year Skool community access, 10,000 skip-traced leads, and a free year of
 * DealMachine (AI Edition). Mirrors the reference's rewards stack.
 */
import { Reveal } from '../components/ui'
import { MatrixHeading } from './section'
import { CheckIcon, UsersIcon, DatabaseIcon, CpuIcon } from './icons'

const REWARDS = [
  {
    icon: UsersIcon,
    tag: 'Cheat Code 01',
    title: '1-Year Premium Community Access',
    body: 'Step inside my private Skool community and unlock the vault: weekly calls, AI automations, cash-buyer databases, and everything that closes deals.',
    value: '$1,164 value',
  },
  {
    icon: DatabaseIcon,
    tag: 'Cheat Code 02',
    title: '10,000 Skip-Traced Leads',
    body: "Tap into a database of real sellers with owner contact info already attached. These aren't just any leads — these are the kind that move.",
    value: '$497 value',
  },
  {
    icon: CpuIcon,
    tag: 'Cheat Code 03',
    title: '1 Year of DealMachine — AI Edition, Free',
    body: 'The ultimate tool to find, track, and market properties off-market — now with the full AI stack. Paired with my guidance, it becomes a weapon.',
    value: '$1,164 value',
  },
]

export default function Rewards() {
  return (
    <section id="rewards" className="bg-matrix-deep relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/30 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <MatrixHeading
          eyebrow="The Matrix Rewards"
          title={<>Unlock your <span className="text-matrix text-glow-green">cheat codes</span></>}
          intro="Show up and do the work — you walk away with the exact tools and access I use to close, stacked in your favor."
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
            {'> '}Total stack value:{' '}
            <span className="font-bold text-matrix-bright text-glow-green">$2,825+</span>
            {' '}— yours free when you show up and execute.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
