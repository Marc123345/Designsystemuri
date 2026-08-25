import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * The eleven territories, as chips along the foot of the globe.
 *
 * ── Why chips and not the list ──────────────────────────────────────────────
 *
 * This has been three things now: a full-width hairline band closing the page,
 * then a translucent cube over a photograph, and now this. The reason it keeps
 * moving is that it is doing a job the thing beside it cannot: the globe shows
 * REACH — London hub, arcs out to five continents — but it names nothing. A
 * buyer scanning for "do you sell in Taiwan" gets no answer from an arc.
 *
 * So the globe carries the picture and the chips carry the fact, and they have
 * to sit together or the panel is decorative. Chips rather than a numbered
 * list because eleven numbered rows under a globe is a second object competing
 * with it; eleven words on one baseline is a caption.
 *
 * The numerals went with the change. They were an ordering device for a list
 * and there is no ordering here — the countries are not ranked, and 01–11
 * against a globe implies a sequence that does not exist.
 *
 * ── ⚠ ELEVEN, NOT EIGHT ─────────────────────────────────────────────────────
 *
 * The list Marc pasted with the original instruction had eight. These are the
 * eleven Uri named in F6; the extra three are Ireland, South Africa and
 * Argentina. Eight looked like the length of the example rather than a decision
 * to drop three live sales territories. Uri still owes a twelfth — "Argentina
 * and one more, I'll send you whatever it is".
 *
 * ⚠ These eleven are SALES TERRITORIES and the globe's arcs are anonymous
 * destination points — they are not the same set and are not meant to line up.
 * Do not "fix" one against the other; see the note in Globe about why the
 * cities on it are unlabelled.
 */
const COUNTRIES = ['United Kingdom', 'United States', 'Germany', 'Italy', 'Japan', 'Israel', 'Brazil', 'Taiwan', 'Ireland', 'South Africa', 'Argentina']

const SalesLocations = () => {
  const locale = useLocale() as Locale

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.22em] text-white/85 uppercase">{t(locale, 'Where you can buy from')}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {COUNTRIES.map((c) => (
          <li key={c} className="rounded-control border border-white/20 px-2.5 py-1 text-[13px] text-white/90">
            {t(locale, c)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SalesLocations
