/**
 * Final conversion block — live "registration closes in" countdown and the
 * on-page opt-in form that POSTs each signup to WEBHOOK_URL (config.ts).
 * Section id="register" (all CTAs scroll here).
 */
import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { Grain } from '../components/ui'
import CodeRain from './CodeRain'
import { ArrowRightIcon, CheckIcon, MapPinIcon, VideoIcon } from './icons'
import { WEBHOOK_URL } from './config'
import { REGISTRATION_CLOSES } from './config'

type Parts = { days: number; hours: number; minutes: number; seconds: number; done: boolean }

function getParts(target: number): Parts {
  const diff = target - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)
  return { days, hours, minutes, seconds, done: false }
}

function useCountdown(iso: string): Parts {
  const target = new Date(iso).getTime()
  const [parts, setParts] = useState<Parts>(() => getParts(target))
  useEffect(() => {
    const id = setInterval(() => setParts(getParts(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return parts
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="matrix-card min-w-[4.5rem] rounded-md px-3 py-3 font-mono text-3xl font-bold tabular-nums text-matrix-bright text-glow-green sm:min-w-[5.5rem] sm:text-4xl">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-matrix/60">
        {label}
      </span>
    </div>
  )
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

function RegistrationForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    // Honeypot: real users leave this hidden field empty. Bots fill it.
    if (fd.get('company')) return

    const payload = {
      firstName: String(fd.get('firstName') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      source: 'First to Deal Challenge — DealMachine AI Edition',
      submittedAt: new Date().toISOString(),
    }

    setStatus('submitting')
    try {
      const configured = WEBHOOK_URL && !WEBHOOK_URL.includes('your-webhook')
      if (configured) {
        // GoHighLevel inbound webhooks don't send CORS headers, so we fire a
        // "simple" request: mode:'no-cors' + form-urlencoded body (URLSearchParams
        // sets Content-Type: application/x-www-form-urlencoded, which is allowed in
        // no-cors and needs no preflight). GHL exposes each field as
        // {{inboundWebhookRequest.<key>}} in the workflow. The response is opaque,
        // so we optimistically show success once the request fires.
        const body = new URLSearchParams(payload)
        await fetch(WEBHOOK_URL, { method: 'POST', mode: 'no-cors', body })
      } else if (import.meta.env.DEV) {
        // Preview convenience: no webhook set yet, log instead of failing.
        console.warn('[Register] WEBHOOK_URL not configured — payload:', payload)
      }
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="matrix-card mx-auto flex max-w-md flex-col items-center rounded-xl px-7 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-matrix/40 bg-matrix/10 text-matrix-bright">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-heading text-2xl font-extrabold text-white">You're plugged in.</h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-slate-300/85">
          Your seat is locked. Check your email — your Zoom link and challenge details are on the
          way. See you live.
        </p>
        <p className="matrix-caret mt-6 font-mono text-xs text-matrix/70">{'> '}access granted</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="matrix-card mx-auto max-w-md rounded-xl p-6 text-left sm:p-7">
      {/* Honeypot — visually hidden, off-screen, not tab-focusable. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block font-mono text-xs uppercase tracking-[0.14em] text-matrix/70">
            {'> '}First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="Neo"
            className="w-full rounded-sm border border-matrix/25 bg-black/40 px-4 py-3 font-body text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-matrix focus:shadow-[0_0_16px_-2px_rgba(34,224,107,0.4)]"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-[0.14em] text-matrix/70">
            {'> '}Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className="w-full rounded-sm border border-matrix/25 bg-black/40 px-4 py-3 font-body text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-matrix focus:shadow-[0_0_16px_-2px_rgba(34,224,107,0.4)]"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block font-mono text-xs uppercase tracking-[0.14em] text-matrix/70">
            {'> '}Phone <span className="text-matrix/40">(for text reminders)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 555-5555"
            className="w-full rounded-sm border border-matrix/25 bg-black/40 px-4 py-3 font-body text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-matrix focus:shadow-[0_0_16px_-2px_rgba(34,224,107,0.4)]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-redpill px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_28px_-4px_rgba(255,42,77,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-redpill-deep disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? (
          <>{'> '}Securing your seat…</>
        ) : (
          <>
            {'>'} Take the Red Pill
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="mt-3 text-center font-mono text-xs text-redpill">
          {'> '}Something glitched. Please try again.
        </p>
      )}

      <p className="mt-4 text-center font-body text-[0.7rem] leading-relaxed text-slate-500">
        Free to join. We'll email your Zoom link. No spam — unsubscribe anytime.
      </p>
    </form>
  )
}

export default function Register() {
  const { days, hours, minutes, seconds, done } = useCountdown(REGISTRATION_CLOSES)

  return (
    <section id="register" className="bg-matrix-depth relative overflow-hidden py-20 sm:py-28">
      <CodeRain opacity={0.3} />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
      <Grain className="opacity-[0.08] mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030705] via-transparent to-[#030705]" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
        <p className="matrix-pulse font-mono text-xs font-bold uppercase tracking-[0.22em] text-redpill">
          {'> '}Registration Closes In
        </p>

        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
          {done ? (
            <p className="font-mono text-lg text-matrix-bright">{'> '}Registration is closed.</p>
          ) : (
            <>
              <Unit value={days} label="Days" />
              <Unit value={hours} label="Hrs" />
              <Unit value={minutes} label="Min" />
              <Unit value={seconds} label="Sec" />
            </>
          )}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 font-heading text-3xl font-extrabold leading-tight text-white sm:text-5xl"
        >
          Ready to lock in your
          <br />
          <span className="text-matrix text-glow-green">first real estate deal?</span>
        </motion.h2>

        <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-slate-300/85">
          The question is… will you stay plugged into their system — or will you break free? Drop
          your details and I'll see you live.
        </p>

        <div className="mt-10">
          <RegistrationForm />
        </div>

        {/* Location */}
        <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-2 rounded-lg border border-matrix/15 bg-black/30 px-6 py-6">
          <div className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.14em] text-matrix-bright">
            <MapPinIcon className="h-4 w-4" />
            Location: Online via Zoom
          </div>
          <p className="font-body text-sm text-slate-300/80">Join from anywhere — we're going live on Zoom.</p>
          <p className="mt-1 flex items-center gap-2 font-body text-xs text-matrix/70">
            <VideoIcon className="h-4 w-4" />
            Zoom link is emailed to you after registration.
          </p>
        </div>
      </div>
    </section>
  )
}
