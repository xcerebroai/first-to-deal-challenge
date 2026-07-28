/**
 * Host / instructor bio. Terminal "ID card" styling with an avatar slot that
 * falls back to a green monogram if no photo is provided. Edit copy in config
 * (HOST_NAME / HOST_HANDLE) and the bio paragraphs below.
 */
import { Reveal, ImageWithFallback } from '../components/ui'
import { MatrixHeading } from './section'
import { HOST_NAME, HOST_HANDLE } from './config'

// Drop your Matrix host image at src/assets/challenge-host.(png|jpg|jpeg|webp)
// and it's auto-detected and inlined into the build. No file present → the
// green monogram shows. (Named challenge-host so it never collides with the
// bootcamp page's host.jpg.)
const hostPhotos = import.meta.glob('../assets/challenge-host.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>
const HOST_PHOTO = Object.values(hostPhotos)[0]

const initials = HOST_NAME.split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

export default function Host() {
  return (
    <section id="host" className="bg-matrix-deep relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/30 to-transparent" />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <MatrixHeading eyebrow="Your Host" title="Learn from someone who actually closes" />

        <Reveal delay={0.1} className="mt-12">
          <div className="matrix-card mx-auto grid max-w-3xl gap-8 rounded-xl p-7 sm:grid-cols-[auto_1fr] sm:items-center sm:p-9">
            <div className="mx-auto h-36 w-36 overflow-hidden rounded-lg border border-matrix/30">
              {HOST_PHOTO ? (
                <ImageWithFallback
                  src={HOST_PHOTO}
                  alt={HOST_NAME}
                  className="h-full w-full object-cover object-top"
                  fallback={
                    <div className="flex h-full w-full items-center justify-center bg-matrix/10 font-heading text-4xl font-extrabold text-matrix-bright text-glow-green">
                      {initials || 'FD'}
                    </div>
                  }
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-matrix/10 font-heading text-4xl font-extrabold text-matrix-bright text-glow-green">
                  {initials || 'FD'}
                </div>
              )}
            </div>

            <div className="text-center sm:text-left">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-matrix">
                {'> '}HOST
              </span>
              <h3 className="mt-2 font-heading text-2xl font-extrabold text-white">{HOST_NAME}</h3>
              <p className="font-mono text-sm text-matrix/70">{HOST_HANDLE}</p>
              <p className="mt-4 font-body text-sm leading-relaxed text-slate-300/85">
                I'll be live with you both days, walking through the exact system I use to find
                and close off-market deals — now supercharged with DealMachine's AI. No theory, no
                gurus, just the steps that get contracts signed. Show up, plug in, and let's get you
                your first deal.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
