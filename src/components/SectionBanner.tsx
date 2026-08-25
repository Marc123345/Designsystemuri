import { Link } from '@/i18n/navigation'

/**
 * The thin band that cuts the page between sections.
 *
 * ── What this is, and what it is not ────────────────────────────────────────
 *
 * This component existed before, at `py-14` with a 44px label, and it was
 * pulled off the home page for a good reason: a full-bleed band carrying a
 * heading, sitting directly above a grid with its own heading, read as two
 * sections introducing one idea. Welding them together then read as the cards
 * spilling out of the band. Both faults were real.
 *
 * The fix chosen at the time was to fold the heading back into its section —
 * which removed the fault and the rhythm with it. Uri's V1 note is not asking
 * for a heading in a coloured box. It is asking for the Van Moppes move: "a
 * very, very thin banner with a bit of wording, prepping for the products —
 * and then the products."
 *
 * So this is now a *cut*, not a heading. One line tall. It does not compete
 * with the section heading below it, because it is not a heading: it is a
 * divider with a caption, closer to a chapter rule than to a title block. The
 * section underneath keeps its own h2, exactly as it does today.
 *
 * That is the whole mechanism behind the rhythm Uri is describing. Every
 * section on this site is currently the same height and the same weight, which
 * is why he reached for the word "shorter" six times — a page with no beat
 * gives a reader no signal about what matters. A band between sections is the
 * beat.
 *
 * ── Shades ──────────────────────────────────────────────────────────────────
 *
 * "The banners in progressively varying shades of ID blue" — his words. The
 * three tokens are the brand scale as it already exists in _config.css:
 *
 *   1 → #3d5290  primary-1   lightest
 *   2 → #2c3c6c  primary     the brand blue
 *   3 → #1c2749  primary-3   darkest
 *
 * Walking down the page from light to dark gives each band a different value
 * without introducing a colour, so the cuts stay distinguishable from each
 * other when three of them appear on one screen of scrolling.
 *
 * `as` is a heading level, not a style. The band's label is usually a section
 * label rather than the section's real heading, so it defaults to `p` and does
 * not enter the document outline — the h2 in the section below is the heading
 * for that content, and two h2s for one section is exactly the duplication
 * that got the first version pulled.
 */
const SectionBanner = ({
  id,
  label,
  body,
  ctaHref,
  ctaLabel,
  shade = 2,
}: {
  id?: string
  label: string
  body?: string
  ctaHref?: string
  ctaLabel?: string
  shade?: 1 | 2 | 3
}) => {
  const bg = shade === 1 ? 'bg-primary-1' : shade === 3 ? 'bg-primary-3' : 'bg-primary'

  return (
    <section id={id} data-note={id ? `banner:${id}` : 'banner'} className={`${bg} text-white`}>
      <div className="container">
        {/* One line at lg, stacked below it. `py-4` is the whole point: the
            band has to read as a rule with words on it, not as a short
            section. At this height three of them can appear inside one screen
            of scrolling without the page feeling striped. */}
        <div className="flex flex-col gap-1.5 py-4 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10 lg:py-4.5">
          <p className="shrink-0 font-mono text-[11px] tracking-[0.22em] text-white/70 uppercase">{label}</p>

          {body && <p className="text-[15px] leading-snug text-white lg:flex-1 lg:text-base">{body}</p>}

          {ctaHref && ctaLabel && (
            <Link href={ctaHref} className="shrink-0 text-[13px] font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline">
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default SectionBanner
