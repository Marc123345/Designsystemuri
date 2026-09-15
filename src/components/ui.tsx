'use client'

import { Link } from '@/i18n/navigation'
import { Icon } from '@iconify/react'

/**
 * The template's signature button: a label that slides up on hover and an arrow
 * that slides across. Every CTA in the site goes through here so motion,
 * geometry and typography stay identical.
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

  /* Size variants change the control geometry, not the type scale. The `ui`
     class below is the single source of truth for button/nav typography. */
  const shellSize = lg ? 'gap-5 ps-8 pe-2 py-2' : sm ? 'gap-3 ps-5 pe-1 py-1' : 'gap-4 ps-6 pe-1.5 py-1.5'
  const badgeSize = lg ? 'size-12' : sm ? 'size-8' : 'size-10'
  const slide = lg ? { rest: 'top-9', hover: 'group-hover:-translate-y-9', arrowRest: 'end-9' } : sm ? { rest: 'top-5', hover: 'group-hover:-translate-y-5', arrowRest: 'end-5' } : { rest: 'top-7', hover: 'group-hover:-translate-y-7', arrowRest: 'end-7' }
  const arrowSlide = lg ? 'group-hover:translate-x-9' : sm ? 'group-hover:translate-x-5' : 'group-hover:translate-x-7'

  const shell = variant === 'primary' ? 'bg-primary text-white' : variant === 'dark' ? 'bg-default-900 text-white' : 'bg-white text-default-900 border border-default-200'
  const badge = variant === 'primary' ? 'bg-default-900 text-white' : variant === 'dark' ? 'bg-primary text-white' : 'bg-primary text-white'

  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className={`block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] ${slide.hover}`}>{label}</span>
        <span aria-hidden="true" className={`absolute start-0 select-none ${slide.rest} duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0`}>
          {label}
        </span>
      </span>

      <span aria-hidden="true" className={`flex ${badgeSize} shrink-0 items-center justify-center rounded-[calc(var(--radius-control)-4px)] ${badge}`}>
        <span className="relative block overflow-hidden">
          <span className={`block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] ${arrowSlide}`}>
            <Icon icon="tabler:arrow-narrow-right" className={sm ? 'flex size-5' : 'flex size-6'} />
          </span>
          <span className={`absolute ${slide.arrowRest} top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:end-0`}>
            <Icon icon="tabler:arrow-narrow-right" className={sm ? 'flex size-5' : 'flex size-6'} />
          </span>
        </span>
      </span>
    </>
  )

  const className = `ui group rounded-control inline-flex items-center ${shellSize} transition-all ${shell} ${extra}`

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

/** Inline text link with a sliding arrow — for in-card "read more" actions. */
export const ArrowLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="small group text-primary inline-flex items-center gap-2 font-semibold transition-all">
    {label}
    <Icon icon="tabler:arrow-narrow-right" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
)

/** Numbered chapter rule used as the scanning spine on long pages. */
export const ChapterMarker = ({ index, label }: { index: string; label: string }) => (
  <div className="border-default-200 flex items-center gap-5 border-t pt-6">
    <span className="small text-primary font-semibold">{index}</span>
    <span className="label text-default-500">{label}</span>
  </div>
)

/**
 * Section eyebrow. All section labels now use the shared `label` role instead
 * of hand-tuned 11px mono typography, so their scale and tracking stay in sync
 * with the rest of the responsive system.
 */
export const Eyebrow = ({ children, align = 'center' }: { children: React.ReactNode; align?: 'start' | 'center' }) => (
  <p className={`label text-primary ${align === 'center' ? 'text-center' : ''}`}>{children}</p>
)

/** Section heading block: eyebrow, H2, optional lede. */
export const SectionHeading = ({ eyebrow, title, desc, align = 'start', light = false }: { eyebrow?: string; title: string; desc?: string; align?: 'start' | 'center'; light?: boolean }) => (
  <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    {eyebrow && (
      <div className="border-default-300 rounded-control inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
        <span className="bg-primary size-2"></span>
        <span className="small text-default-900">{eyebrow}</span>
      </div>
    )}
    <h2 className={`mt-4 ${light ? 'text-white' : ''}`}>{title}</h2>
    {desc && <p className={`lead mt-5 ${light ? 'text-default-300' : ''}`}>{desc}</p>}
  </div>
)
