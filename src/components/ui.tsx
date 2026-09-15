'use client'

import { Link } from '@/i18n/navigation'
import { Icon } from '@iconify/react'

/**
 * Signature CTA. Geometry changes by size; typography, colour relationships
 * and motion come from the shared system so every CTA feels related.
 */
export const ArrowButton = ({
  href,
  label,
  variant = 'primary',
  size = 'md',
  external = false,
  onClick,
  className: extra = '',
}: {
  href?: string
  label: string
  variant?: 'primary' | 'dark' | 'light'
  size?: 'md' | 'sm' | 'lg'
  external?: boolean
  onClick?: () => void
  className?: string
}) => {
  const lg = size === 'lg'
  const sm = size === 'sm'

  const shellSize = lg ? 'gap-5 ps-8 pe-2 py-2' : sm ? 'gap-3 ps-5 pe-1 py-1' : 'gap-4 ps-6 pe-1.5 py-1.5'
  const badgeSize = lg ? 'size-12' : sm ? 'size-8' : 'size-10'
  const slide = lg ? { rest: 'top-9', hover: 'group-hover:-translate-y-9', arrowRest: 'end-9' } : sm ? { rest: 'top-5', hover: 'group-hover:-translate-y-5', arrowRest: 'end-5' } : { rest: 'top-7', hover: 'group-hover:-translate-y-7', arrowRest: 'end-7' }
  const arrowSlide = lg ? 'group-hover:translate-x-9' : sm ? 'group-hover:translate-x-5' : 'group-hover:translate-x-7'

  const shell =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary-3'
      : variant === 'dark'
        ? 'bg-primary-3 text-white hover:bg-primary'
        : 'border border-default-200 bg-white text-default-900 hover:border-primary/35 hover:bg-canvas'

  const badge =
    variant === 'primary'
      ? 'bg-primary-3 text-white'
      : variant === 'dark'
        ? 'bg-primary-1 text-white'
        : 'bg-primary text-white'

  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className={`eid-motion-emphasized block ${slide.hover}`}>{label}</span>
        <span aria-hidden="true" className={`eid-motion-emphasized absolute start-0 select-none ${slide.rest} group-hover:top-0`}>
          {label}
        </span>
      </span>

      <span aria-hidden="true" className={`flex ${badgeSize} shrink-0 items-center justify-center rounded-[calc(var(--radius-control)-4px)] ${badge}`}>
        <span className="relative block overflow-hidden">
          <span className={`eid-motion-emphasized block ${arrowSlide}`}>
            <Icon icon="tabler:arrow-narrow-right" className={sm ? 'flex size-5' : 'flex size-6'} />
          </span>
          <span className={`eid-motion-emphasized absolute ${slide.arrowRest} top-0 group-hover:end-0`}>
            <Icon icon="tabler:arrow-narrow-right" className={sm ? 'flex size-5' : 'flex size-6'} />
          </span>
        </span>
      </span>
    </>
  )

  const className = `ui eid-motion-base group rounded-control inline-flex items-center shadow-sm hover:shadow-card ${shellSize} ${shell} ${extra}`

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {inner}
      </button>
    )
  }

  if (external) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href ?? '/'} className={className}>
      {inner}
    </Link>
  )
}

/** Inline action link used in cards and supporting content. */
export const ArrowLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="small group text-primary inline-flex items-center gap-2 font-semibold">
    {label}
    <Icon icon="tabler:arrow-narrow-right" className="eid-motion-base size-5 transition-transform group-hover:translate-x-1" />
  </Link>
)

/** Numbered chapter rule used as the scanning spine on long pages. */
export const ChapterMarker = ({ index, label }: { index: string; label: string }) => (
  <div className="border-default-200 flex items-center gap-5 border-t pt-6">
    <span className="small text-primary font-semibold tabular-nums">{index}</span>
    <span className="label text-default-500">{label}</span>
  </div>
)

/** Section eyebrow: one compact overline treatment across the site. */
export const Eyebrow = ({ children, align = 'center' }: { children: React.ReactNode; align?: 'start' | 'center' }) => (
  <p className={`label text-primary ${align === 'center' ? 'text-center' : ''}`}>{children}</p>
)

/** Section heading block: chip, H2, optional lead. */
export const SectionHeading = ({ eyebrow, title, desc, align = 'start', light = false }: { eyebrow?: string; title: string; desc?: string; align?: 'start' | 'center'; light?: boolean }) => (
  <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    {eyebrow && (
      <div className={`eid-chip ${light ? 'border-white/20 bg-white/8' : ''}`}>
        <span className={`${light ? 'bg-primary-1' : 'bg-primary'} size-2 rounded-full`} />
        <span className={`small ${light ? 'text-white' : 'text-default-900'}`}>{eyebrow}</span>
      </div>
    )}
    <h2 className={`mt-4 ${light ? 'text-white' : ''}`}>{title}</h2>
    {desc && <p className={`lead mt-5 max-w-[62ch] ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-white/75' : 'text-default-600'}`}>{desc}</p>}
  </div>
)
