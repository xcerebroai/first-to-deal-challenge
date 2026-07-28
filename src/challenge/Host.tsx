/**
 * Host / instructor bio. Terminal "ID card" styling with an avatar slot that
 * falls back to a green monogram if no photo is provided. Edit copy in config
 * (HOST_NAME / HOST_HANDLE) and the bio paragraphs below.
 */
import { Reveal, ImageWithFallback } from '../components/ui'
import { MatrixHeading } from './section'
import { HOST_NAME, HOST_HANDLE, HOST_VIDEO } from './config'

/** Accepts a YouTube video ID or any watch/share/embed URL and returns the ID. */
function youTubeId(input: string): string {
  if (!input) return ''
  const m = input.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  return m ? m[1] : input
}
const videoId = youTubeId(HOST_VIDEO)

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
              {HOST_HANDLE && <p className="font-mono text-sm text-matrix/70">{HOST_HANDLE}</p>}
              <p className="mt-4 font-body text-sm leading-relaxed text-slate-300/85">
                {HOST_NAME} has been wholesaling real estate for more than 12 years — and closed his
                very first deal using DealMachine. He'll be live with you both days, walking through
                the exact AI-powered system he uses to find and close off-market deals. No theory,
                no gurus — just the steps that get contracts signed.
              </p>
            </div>
          </div>
        </Reveal>

        {videoId && (
          <Reveal delay={0.15} className="mx-auto mt-6 max-w-3xl">
            <div className="matrix-card overflow-hidden rounded-xl p-2 sm:p-3">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                  title={`${HOST_NAME} — First to Deal`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
