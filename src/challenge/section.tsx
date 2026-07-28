/**
 * Matrix-styled section heading — the terminal counterpart to the shared
 * <SectionHeading>. Green mono eyebrow (`> ...`), display title with optional
 * phosphor accent, glowing rule, and an intro line. Reuses the shared <Reveal>.
 */
import type { ReactNode } from 'react'
import { Reveal } from '../components/ui'

export function MatrixHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'center' | 'left'
}) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col ${alignCls}`}>
      {eyebrow && (
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-matrix">
            {'> '}
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05} className="mt-4">
        <h2 className="max-w-3xl text-balance font-heading text-[2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-5">
        <div className={`matrix-rule ${align === 'center' ? 'mx-auto' : ''}`} />
      </Reveal>
      {intro && (
        <Reveal delay={0.15} className="mt-6 max-w-2xl">
          <p className="text-pretty font-body text-base leading-relaxed text-slate-300/85 sm:text-[1.0625rem]">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}
