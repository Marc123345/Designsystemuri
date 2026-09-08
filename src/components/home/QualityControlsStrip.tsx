import { ArrowButton } from '@/components/ui'
import IconIndex from '@/components/home/IconIndex'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'

/**
 * The four QC controls, named, on the homepage.
 *
 * ── Why names only ──────────────────────────────────────────────────────────
 *
 * The quality page carries these as four PhotoCards, each with a photograph and
 * a paragraph. That is the right treatment on the page the reader chose to
 * open. Here the job is to say the four controls exist and get out of the way,
 * so it is the names, an icon each, and one route to where they are explained.
 *
 * ── Same layout as the applications block ───────────────────────────────────
 *
 * On Marc's instruction, and enforced rather than imitated: both blocks render
 * through IconIndex, so a change to the card is a change to both. Centred
 * heading and four across, matching the applications section directly above.
 *
 * ── The tiles do not link; the CTA does ─────────────────────────────────────
 *
 * There is no page per control — all four are explained on /quality. Four
 * identical links to one page would be four chances to click the same thing,
 * so the tiles are plain and "Explore our QC" underneath carries the route.
 *
 * Kept in step with components/quality/TheControls.tsx by hand: these are the
 * same four titles. If a control is renamed there, rename it here.
 */

const CONTROLS = [
  { label: 'Size & Morphology: Mesh', icon: 'tabler:grid-dots' },
  { label: 'Size & Morphology: Micron', icon: 'tabler:ruler-measure' },
  { label: 'Advanced Chemical Cleaning', icon: 'tabler:flask' },
  { label: 'Toughness (TI / TTI)', icon: 'tabler:shield-check' },
]

export default function QualityControlsStrip({ locale }: { locale: Locale }) {
  return (
    <section data-note="qc-strip" className="relative isolate py-14 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[24px] font-bold md:text-[30px] lg:text-[34px]">{t(locale, 'Every lot, four controls.')}</h2>
        </div>

        <div className="mt-8 lg:mt-10">
          <IconIndex items={CONTROLS} locale={locale} columns={4} />
        </div>

        {/* ── THE SITE'S BUTTON, NOT A LOOKALIKE ───────────────────────────
            This was a hand-rolled square link: bg-primary, px-6 py-3, its own
            hover colour mixed inline, and a small arrow that nudged 4px. It was
            the only CTA on the site not going through ArrowButton, which exists
            precisely so "the motion and the corner radius stay identical" — so
            it was also the only square button on a site with a 12px control
            radius, sitting one section below six rounded icon controls.

            Nothing is passed but href and label: the default `md` size and
            `primary` variant are what every other in-page CTA uses. */}
        <div className="mt-8 flex justify-center">
          <ArrowButton href="/quality" label={t(locale, 'Explore our QC')} />
        </div>
      </div>
    </section>
  )
}
