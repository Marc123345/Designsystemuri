'use client'

import { Link } from '@/i18n/navigation'
import { Icon } from '@iconify/react'

/**
 * The template's signature button: a label that slides up on hover and an arrow
 * that slides across. Every CTA in the site goes through here so the motion and
 * the corner radius stay identical.
 */
export const ArrowButton = ({ href, label, variant = 'primary', external = false }: { href: string; label: string; variant?: 'primary' | 'dark' | 'light'; external?: boolean }) => {
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
        <span className="block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">{label}</span>
        <span aria-hidden="true" className="absolute start-0 top-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0">
          {label}
        </span>
      </span>

      <span aria-hidden="true" className={`flex size-10 shrink-0 items-center justify-center ${badge}`}>
        <span className="relative block overflow-hidden">
          <span className="block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-7">
            <Icon icon="tabler:arrow-narrow-right" className="flex size-6" />
          </span>
          <span className="absolute end-7 top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:end-0">
            <Icon icon="tabler:arrow-narrow-right" className="flex size-6" />
          </span>
        </span>
      </span>
    </>
  )

  // One uniform radius on the shell and a matching inset on the badge. The
  // previous mismatched corner radii ( shell,
  // badge) made the badge appear to break out of the button's corner.
  const className = `group inline-flex items-center gap-4  ps-6 pe-1.5 py-1.5 text-base font-medium leading-none transition-all ${shell}`

  if (external) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
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
      <div className="border-default-300 inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
        <span className="bg-primary size-2"></span>
        <span className="text-default-900 text-sm">{eyebrow}</span>
      </div>
    )}
    <h2 className={`mt-4 text-[28px] font-bold md:text-[36px] lg:text-[42px] ${light ? 'text-white' : ''}`}>{title}</h2>
    {desc && <p className={`mt-5 ${light ? 'text-default-300' : ''}`}>{desc}</p>}
  </div>
)
