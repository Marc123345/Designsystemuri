import Image from 'next/image'
import { Link } from '@/i18n/navigation'

/**
 * The site's card: a photograph filling the box, the words on top of it.
 *
 * ── The rule ────────────────────────────────────────────────────────────────
 *
 * Marc's, and it applies everywhere: images are FULL COVER and text sits OVER
 * them. Not beside, not above. A card with a photo in the top half and copy in
 * the bottom half is two things stacked; a card whose photograph IS the card is
 * one thing.
 *
 * This exists so that rule lives in one file. It was being re-implemented per
 * section — the entry cards, the About values, the QC controls — and three
 * hand-rolled scrims drift apart within a week.
 *
 * ── What makes text-over-image actually readable ───────────────────────────
 *
 * The scrim is the whole component. EID's photography is mostly laboratory
 * work: pale coats, bright benches, high-key SEM plates. White type dropped
 * straight onto that is unreadable, and a flat 50% wash over the frame makes
 * every photograph look like a mistake.
 *
 * So it is a bottom-up gradient, near-opaque where the words are and clear at
 * the top where the picture is doing its job — three stops rather than two,
 * because a two-stop ramp over this much copy leaves the middle lines sitting
 * in the transition. `primary-3` rather than black: against cool blue-grey
 * footage a black scrim is a foreign colour and reads as a bar laid on top.
 *
 * `weight` exists because a four-bullet QC card needs far more cover than a
 * two-line value card, and using the heavy scrim everywhere would waste the
 * photography on the cards that do not need it.
 *
 * `heavy` is deliberately not as heavy as it first was. At 80% through the
 * middle and 25% at the top it covered the photograph almost entirely, which
 * defeats the point of the rule — the image has to be visible for putting the
 * text on it to mean anything. 72/8 with the ramp pushed to 62% keeps the top
 * third of the frame clear while still carrying four bullet pairs. Cards that
 * need more cover than that need less copy, not a darker scrim.
 *
 * ── Fallback ────────────────────────────────────────────────────────────────
 *
 * `image` is optional. Without one the card fills with brand navy instead —
 * the same device the About mosaic uses for its one non-photographic tile — so
 * a card whose photograph does not exist yet reads as a deliberate solid rather
 * than as a broken image. That is the T.I. toughness control on /quality, whose
 * shot EID has not supplied.
 */
export type PhotoCardProps = {
  /** Omit to fill the card with brand navy instead. See the note above. */
  image?: string
  alt?: string
  /** Small mono label above the title — a number, a stage, a category. */
  eyebrow?: string
  title: string
  /** One paragraph under the title. */
  body?: string
  /** Label/description pairs, for cards that carry a spec rather than a claim. */
  points?: readonly (readonly [string, string])[]
  /** Italic aside under the points — used for "optional, by request". */
  note?: string
  /**
   * Put `points` behind a disclosure instead of listing them.
   *
   * The QC controls carry three and four label/description pairs each. Listed
   * open, four of those cards is a wall of small text and the photographs are
   * squeezed to a strip at the top — which is the layout failing in exactly the
   * way the image rule exists to prevent.
   *
   * Collapsed, each card is a photograph, a number, a title and a count. The
   * detail is one click away for the reader who wants it, which is the whole
   * point of this page — a buyer scanning for "do they measure micron sizes"
   * gets an answer in a second, and the one qualifying us against a spec opens
   * the card.
   *
   * Native `<details>`, so it works with no JavaScript, is keyboard operable
   * and announces its own state to a screen reader. Anything hand-rolled here
   * would be worse in all three respects.
   */
  collapsible?: boolean
  /** Summary text for the disclosure. Defaults to a count of the points. */
  disclosureLabel?: string
  href?: string
  /** Grid span etc. The card never sets its own width. */
  className?: string
  /** Minimum height. Bento tiles need this; a grid row alone will not give it. */
  minHeight?: string
  /** How much cover the copy needs. `heavy` for bullet lists. */
  weight?: 'light' | 'heavy'
}

const PhotoCard = ({ image, alt = '', eyebrow, title, body, points, note, href, className = '', minHeight = 'min-h-[360px]', weight = 'light', collapsible = false, disclosureLabel }: PhotoCardProps) => {
  const scrim =
    weight === 'heavy'
      ? 'from-primary-3/95 via-primary-3/72 to-primary-3/8'
      : 'from-primary-3/94 via-primary-3/55 to-primary-3/10'

  const inner = (
    <>
      {image ? (
        <>
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            /* The zoom is on the image, never on the card. Scaling the card
               would run its 24px corner through a transform and soften it. */
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span aria-hidden className={`absolute inset-0 bg-linear-to-t ${scrim} ${weight === 'heavy' ? 'via-62%' : 'via-55%'}`} />
        </>
      ) : (
        <span aria-hidden className="bg-primary absolute inset-0" />
      )}

      {/* `mt-auto` in a full-height flex column pins the copy to the foot
          whatever the card's height turns out to be — and in a bento the height
          is never the card's own, it is the tallest cell in the row. */}
      <div className="relative z-10 flex h-full flex-col justify-end p-7 lg:p-9">
        {/* white/85, not white/60.
            ⚠ This is a contrast fix and it is site-wide, so do not tune it back
            down for looks. At 11px this label needs 4.5:1. Measured against the
            brightest ground behind it, white/60 came out at 1.9-3.2:1 on the
            Quality controls and 1.55-1.82:1 on About's core values — every
            PhotoCard eyebrow on the site was failing, on both the light and the
            heavy scrim. It surfaced when /quality took brighter photographs;
            it was never specific to them.

            ⚠ AND THIS DOES NOT FIX EVERY CARD. On About's brightest frames the
            ground is light enough that no white text can reach 4.5:1 at all —
            those need a heavier scrim or a darker photograph, which is a
            separate pass on that page. This raises the floor everywhere and
            clears the Quality controls outright; it does not close About. */}
        {eyebrow && <p className="font-mono text-[11px] tracking-[0.22em] text-white/85 uppercase">{eyebrow}</p>}

        <h3 className="mt-3 text-[22px] leading-tight font-bold text-white lg:text-[26px]">{title}</h3>

        {body && <p className="mt-3 max-w-[52ch] text-[0.95rem] leading-relaxed text-white/80">{body}</p>}

        {points &&
          (collapsible ? (
            <details className="group/d mt-6 border-t border-white/15 pt-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.9rem] font-semibold text-white [&::-webkit-details-marker]:hidden">
                <span>{disclosureLabel ?? `${points.length} checks`}</span>
                {/* The chevron rotates rather than swapping glyphs, so the
                    control never reflows and the label never shifts. */}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors group-open/d:border-white/60">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 transition-transform duration-300 group-open/d:rotate-180">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>

              <dl className="mt-5 space-y-3.5">
                {points.map(([label, desc]) => (
                  <div key={label}>
                    <dt className="text-[0.95rem] font-semibold text-white">{label}</dt>
                    <dd className="mt-1 max-w-[62ch] text-[0.9rem] leading-relaxed text-white/70">{desc}</dd>
                  </div>
                ))}
              </dl>

              {note && <p className="mt-5 text-[0.85rem] text-white/55 italic">{note}</p>}
            </details>
          ) : (
            <dl className="mt-5 space-y-3.5 border-t border-white/15 pt-5">
              {points.map(([label, desc]) => (
                <div key={label}>
                  <dt className="text-[0.95rem] font-semibold text-white">{label}</dt>
                  <dd className="mt-1 max-w-[62ch] text-[0.9rem] leading-relaxed text-white/70">{desc}</dd>
                </div>
              ))}
            </dl>
          ))}

        {note && !collapsible && <p className="mt-5 text-[0.85rem] text-white/55 italic">{note}</p>}

        {href && (
          <span aria-hidden className="mt-6 flex items-center gap-3 text-white">
            <span className="h-px w-9 bg-white/50 transition-all duration-500 group-hover:w-14" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </>
  )

  const shell = `group rounded-card relative isolate flex overflow-hidden ${minHeight} ${className}`

  return href ? (
    <Link href={href} className={`${shell} focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2`}>
      {inner}
    </Link>
  ) : (
    <div className={shell}>{inner}</div>
  )
}

export default PhotoCard
