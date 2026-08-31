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
export const ArrowButton = ({ href, label, variant = 'primary', size = 'md', external = false }: { href: string; label: string; variant?: 'primary' | 'dark' | 'light'; size?: 'md' | 'lg'; external?: boolean }) => {
  const lg = size === 'lg'
  const shellSize = lg ? 'gap-5 ps-8 pe-2 py-2 text-lg' : 'gap-4 ps-6 pe-1.5 py-1.5 text-base'
  const badgeSize = lg ? 'size-12' : 'size-10'
  const slide = lg ? { rest: 'top-9', hover: 'group-hover:-translate-y-9', arrowRest: 'end-9' } : { rest: 'top-7', hover: 'group-hover:-translate-y-7', arrowRest: 'end-7' }
  const arrowSlide = lg ? 'group-hover:translate-x-9' : 'group-hover:translate-x-7'

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
            <Icon icon="tabler:arrow-narrow-right" className="flex size-6" />
          </span>
          <span className={`absolute ${slide.arrowRest} top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:end-0`}>
            <Icon icon="tabler:arrow-narrow-right" className="flex size-6" />
          </span>
        </span>
      </span>
    </>
  )

  // One uniform radius on the shell and a matching inset on the badge. The
  // previous mismatched corner radii ( shell,
  // badge) made the badge appear to break out of the button's corner.
  const className = `group rounded-control inline-flex items-center ${shellSize} font-medium leading-none transition-all ${shell}`

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
/**
 * The chapter number, at the scale the section deserves.
 *
 * ⚠ It does NOT pair with ChapterMarker, and an earlier draft of this comment
 * said it did. ChapterMarker is exported from this file and rendered by
 * nothing — it has been dead since the section rhythm moved to SectionBanner.
 * The sequence this numeral indexes is the banner strips: Our Products, Why
 * EID, Applications, Quality, in that order down the home page. Number against
 * those, or the figure is counting something the reader cannot see.
 *
 * The technique is not new here: CurtainGrid has been drawing its tile numbers
 * this way since it was built — `text-transparent` with a
 * `-webkit-text-stroke`, so the glyph is a line rather than a shape. This
 * promotes that device from tile scale to section scale, which is the whole
 * reason to use it: at 92px an outline reads as a numeral, at 200px+ it reads
 * as architecture, and either way it costs one element and no colour.
 *
 * ⚠ `-webkit-text-stroke` IS the load-bearing property and it has no standard
 * equivalent that ships everywhere yet. Every engine this site supports
 * implements the prefixed version — it is one of the very few `-webkit-`
 * properties that is genuinely cross-browser. Where it is not implemented the
 * fill is `transparent`, so the numeral simply does not appear: the layout does
 * not move, nothing overlaps, and the section is exactly what it was before.
 * That is the right failure and it is why the fill is transparent rather than a
 * pale grey that would have to be undone.
 *
 * `aria-hidden`, and it must stay that way. There is no textual counterpart to
 * announce — this is ornament that happens to be a glyph, and read aloud it is
 * a bare number interrupting a heading. `lg:block` for the same reason at the
 * other end: below lg there is no margin for it to bleed into, and a decorative
 * numeral that has to fight for space has stopped being decorative.
 */
export const ChapterNumeral = ({ index, side = 'end', className = '' }: { index: string; side?: 'start' | 'end'; className?: string }) => (
  <span
    aria-hidden
    className={`pointer-events-none absolute -z-10 hidden select-none text-[13rem] leading-none font-bold text-transparent lg:block xl:text-[17rem] ${side === 'end' ? '-end-6 xl:-end-10' : '-start-6 xl:-start-10'} ${className}`}
    /* 1px against CurtainGrid's 1px, but in default-200 rather than white/90 —
       the tile draws on a photograph and this draws on the canvas, so the same
       weight needs a far lighter colour to land at the same presence. */
    style={{ WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'var(--color-default-200)' }}
  >
    {index}
  </span>
)

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
