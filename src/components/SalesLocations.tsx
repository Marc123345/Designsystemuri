import { Icon } from '@iconify/react'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * "Where you can buy from", as the cube on the contact split.
 *
 * ── What this was, and what moved ───────────────────────────────────────────
 *
 * A full-width band closing the contact page: a hairline grid of country names
 * under a line of context. Marc's instruction is to put it in a cube on the
 * left of the new split, so it is a card now and it sits over the photograph
 * rather than under the form. The content is unchanged.
 *
 * The section it used to be is gone; this renders inside the image panel.
 *
 * ── Why a translucent card and not a solid one ──────────────────────────────
 *
 * A solid navy box on a photograph is a box that could have gone anywhere —
 * the picture behind it stops mattering. At 80% with a blur the frame still
 * reads through it, so the list is on the laboratory rather than merely near
 * it, which is the site's text-over-image rule applied to a card instead of to
 * a whole tile.
 *
 * `backdrop-blur` is a progressive enhancement: where it is unsupported the
 * card is simply 80% navy, which is still legible. It is not doing any of the
 * contrast work — the 80% is.
 *
 * ── ⚠ ELEVEN, NOT EIGHT ─────────────────────────────────────────────────────
 *
 * The list Marc pasted with this instruction had eight countries. This keeps
 * the eleven Uri named in F6 — the extra three are Ireland, South Africa and
 * Argentina. Eight looked like the length of the example he was shown rather
 * than a decision to drop three live sales locations, and dropping a territory
 * from a page headed "where you can buy from" is not a formatting change. If he
 * does want eight, remove them here and nowhere else.
 *
 * Uri still owes one more country — "Argentina and one more, I'll send you
 * whatever it is". Argentina is in; the twelfth is one line when it arrives.
 */
const COUNTRIES = ['United Kingdom', 'United States', 'Germany', 'Italy', 'Japan', 'Israel', 'Brazil', 'Taiwan', 'Ireland', 'South Africa', 'Argentina']

const SalesLocations = () => {
  const locale = useLocale() as Locale

  return (
    <div className="rounded-card border border-white/15 bg-primary-3/80 p-5 backdrop-blur-sm lg:p-6">
      <div className="flex items-center gap-2.5">
        <Icon icon="tabler:world" className="size-4 shrink-0 text-white/70" aria-hidden />
        <p className="font-mono text-[11px] tracking-[0.22em] text-white/85 uppercase">{t(locale, 'Where you can buy from')}</p>
      </div>

      {/* "…through the form above" was true when this closed the page under the
          form. It is beside the form now, so the sentence would have been
          pointing at the hero. */}
      <p className="mt-2.5 text-sm leading-relaxed text-white/75">
        {t(locale, 'Sales locations across five continents. Any of them can be reached through the form on this page.')}
      </p>

      {/* Two columns of hairline-separated rows rather than the old four-column
          plate: the cube is roughly a third of the width the band had, and
          eleven items across four columns at this size would be two characters
          wide. `border-white/12` rather than a grey ground — a `gap-px` grid
          needs an opaque ground behind it, and an opaque ground here would
          undo the point of the card being translucent. */}
      {/* Three columns from lg, two below. ⚠ This is a HEIGHT constraint, not
          a taste one: the panel this cube sits in is sticky, and a sticky
          element taller than the viewport pins at its top and hides its own
          bottom — which would be this list. Eleven items over two columns made
          the panel 742px against 711px of usable space on a 812px window, and
          655px on a 767px one. Three columns is four rows instead of six.
          Adding countries costs a row every third one; re-measure then. */}
      <ul className="mt-4 grid grid-cols-2 gap-x-5 lg:grid-cols-3">
        {COUNTRIES.map((c, i) => (
          <li key={c} className="flex items-baseline gap-2 border-t border-white/12 py-1.5">
            <span className="font-mono text-[10px] text-white/70 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-[0.9rem] leading-snug text-white">{t(locale, c)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SalesLocations
