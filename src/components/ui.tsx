'use client'

import { Link } from '@/i18n/navigation'
import { Icon } from '@iconify/react'

/**
 * The template's signature button: a label that slides up on hover and an arrow
 * that slides across. Every CTA in the site goes through here so the motion and
 * the corner radius stay identical.
 */
/**
 * `size` exists for one reason: Uri's V1 note on the home hero — the two CTAs
 * were "a fifth of the size" they should be relative to a hero that big. Rather
 * than scale the component and grow every button on the site, `lg` is opt-in
 * and used by the hero only.
 *
 * The badge grows with the shell, and the label's hover duplicate is offset by
 * the badge height, so both `top-7`/`top-9` pairs have to move together — that
 * is why the offsets below are derived from `size` rather than hard-coded.
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
  /** Omit only when `onClick` is given — an action rather than a destination. */
  href?: string
  label: string
  variant?: 'primary' | 'dark' | 'light'
  size?: 'md' | 'sm' | 'lg'
  /** Render a plain <a> rather than the locale-aware Link. */
  external?: boolean
  /** Makes it a <button>. For the one CTA on the site that does something
      instead of going somewhere — error.tsx's "Try again", which calls the
      route segment's reset(). Before this existed that button was hand-rolled
      and sat directly beside an ArrowButton, two CTAs in one row wearing
      different clothes. */
  onClick?: () => void
  className?: string
}) => {
  const lg = size === 'lg'
  const sm = size === 'sm'
  /* `sm` exists for the navbar and nowhere else. At md this button is 52px
     tall, which towers over the 36px language switcher beside it and makes the
     bar top-heavy; at sm it is 40px and sits in the row. The animation, the
     radius and the badge inset are identical — only the scale moves. */
  const shellSize = lg ? 'gap-5 ps-8 pe-2 py-2 text-lg' : sm ? 'gap-3 ps-5 pe-1 py-1 text-[0.9rem]' : 'gap-4 ps-6 pe-1.5 py-1.5 text-base'
  const badgeSize = lg ? 'size-12' : sm ? 'size-8' : 'size-10'
  const slide = lg ? { rest: 'top-9', hover: 'group-hover:-translate-y-9', arrowRest: 'end-9' } : sm ? { rest: 'top-5', hover: 'group-hover:-translate-y-5', arrowRest: 'end-5' } : { rest: 'top-7', hover: 'group-hover:-translate-y-7', arrowRest: 'end-7' }
  const arrowSlide = lg ? 'group-hover:translate-x-9' : sm ? 'group-hover:translate-x-5' : 'group-hover:translate-x-7'

  const shell = variant === 'primary' ? 'bg-primary text-white' : variant === 'dark' ? 'bg-default-900 text-white' : 'bg-white text-default-900 border border-default-200'

  const badge = variant === 'primary' ? 'bg-default-900 text-white' : variant === 'dark' ? 'bg-primary text-white' : 'bg-primary text-white'

  const inner = (
    <>
      {/* The label slides up on hover and a duplicate rides in behind it. The
wrapper must stay exactly one line tall with no padding — any vertical
padding grows the box past the duplicate's top-7 offset and it stops
being clipped, showing both copies at rest. Pad the shell instead.

The second copy is purely the animation's other half, so it is hidden
from assistive tech. Without that, every CTA on the site announced and
copy-pasted as "Request a Quote Request a Quote". */}
      <span className="relative block overflow-hidden">
        <span className={`block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] ${slide.hover}`}>{label}</span>
        <span aria-hidden="true" className={`absolute start-0 ${slide.rest} duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0`}>
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

  // One uniform radius on the shell and a matching inset on the badge. The
  // previous mismatched corner radii ( shell,
  // badge) made the badge appear to break out of the button's corner.
  const className = `group rounded-control inline-flex items-center ${shellSize} font-medium leading-none transition-all ${shell} ${extra}`

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
  <Link href={href} className="group text-primary inline-flex items-center gap-2 text-sm font-semibold transition-all">
    {label}
    <Icon icon="tabler:arrow-narrow-right" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
)

/**
 * Numbered chapter rule. Carried over from the previous build — it gives a long
 * page a spine, so a buyer scanning knows where they are.
 */
export const ChapterMarker = ({ index, label }: { index: string; label: string }) => (
  <div className="border-default-200 flex items-center gap-5 border-t pt-6">
    <span className="text-primary text-sm font-semibold">{index}</span>
    <span className="text-default-500 text-sm tracking-[0.2em] uppercase">{label}</span>
  </div>
)

/** Section heading block: eyebrow, H2, optional lede. */
export const SectionHeading = ({ eyebrow, title, desc, align = 'start', light = false }: { eyebrow?: string; title: string; desc?: string; align?: 'start' | 'center'; light?: boolean }) => (
  <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    {eyebrow && (
      <div className="border-default-300 rounded-control inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
        <span className="bg-primary size-2"></span>
        <span className="text-default-900 text-sm">{eyebrow}</span>
      </div>
    )}
    <h2 className={`mt-4 text-[28px] font-bold md:text-[36px] lg:text-[42px] ${light ? 'text-white' : ''}`}>{title}</h2>
    {desc && <p className={`mt-5 ${light ? 'text-default-300' : ''}`}>{desc}</p>}
  </div>
)
