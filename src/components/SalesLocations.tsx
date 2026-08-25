import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * The countries you can buy from, and nothing else about them.
 *
 * Uri's F6 note, close to verbatim: the contact page should not repeat the full
 * locations block — "I'm not going to do that with the full information for all
 * our sales locations." What he wants instead is "just showing the locations
 * they could buy from … in an interesting way, in a very small section at the
 * end — that would close the page."
 *
 * So: no addresses, no phone numbers, no map, no cards. Twelve country names on
 * a hairline grid, numbered, sitting under a single line of context. It reads
 * as a list of facts rather than a directory, which is the point — the section
 * exists to say "we are already where you are", and a buyer who wants to reach
 * one of them uses the form directly above.
 *
 * ⚠ ELEVEN, NOT TWELVE. The list below is the eleven Uri named in F6. He owes
 * one more — "Argentina and one more, I'll send you whatever it is". When it
 * arrives it is one line here and nothing else; the grid reflows on its own.
 */
const COUNTRIES = ['United Kingdom', 'United States', 'Germany', 'Italy', 'Japan', 'Israel', 'Brazil', 'Taiwan', 'Ireland', 'South Africa', 'Argentina']

const SalesLocations = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="sales-locations" className="border-default-200 border-t py-12 lg:py-16">
      <div className="container">
        <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2">
          <p className="font-mono text-[11px] tracking-[0.22em] text-default-500 uppercase">{t(locale, 'Where you can buy from')}</p>
          <p className="text-default-600 text-sm">{t(locale, 'Sales locations across five continents. Any of them can be reached through the form above.')}</p>
        </div>

        {/* A hairline grid rather than boxes: `gap-px` over a grey ground is
            the same rule-not-border device the rest of the site uses, and at
            this size it keeps eleven items reading as one object instead of
            eleven cards.

            The 24px radius goes on the OUTER list, not on each cell. Eleven
            small rounded chips would be visual noise for what is really a list
            of eleven words; one rounded plate with rules through it is the same
            object the section always was, with the new corner on it. */}
        <ul className="bg-default-200 rounded-card mt-7 grid grid-cols-2 gap-px overflow-hidden sm:grid-cols-3 lg:grid-cols-4">
          {COUNTRIES.map((c, i) => (
            <li key={c} className="flex items-baseline gap-3 bg-white px-4 py-3.5">
              <span className="text-default-400 font-mono text-[11px]">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-default-900 text-[0.95rem]">{t(locale, c)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SalesLocations
