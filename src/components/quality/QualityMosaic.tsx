import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * The figures, the photographs and the two statements — About's mosaic, with
 * the Quality page's evidence in it.
 *
 * The composition is AboutMosaic's, unchanged, and the three things that make
 * it work are the same three (they are set out in full in that file):
 *
 *   1. THE FIGURES SIT ON PHOTOGRAPHS. "100% batches tested" over two SEM
 *      frames of two different lots is a claim with its evidence beside it.
 *   2. THE TILES ARE DIFFERENT SIZES. One tall, two short, one of the short
 *      ones solid brand colour.
 *   3. THE TEXT IS NOT BOXED. Ruled left edge, page ground behind it.
 *
 * ── The tall tile's photograph is the argument ──────────────────────────────
 *
 * /eid/qc-batch-to-batch.jpg is a genuine side-by-side SEM: two production
 * lots, same magnification, a 1 µm scale bar under each. It is the only frame
 * in the library that shows consistency rather than asserting it, which makes
 * it the right ground for figures whose whole subject is consistency. On
 * About it would be an illustration; here it is the proof.
 *
 * ── The solid tile ──────────────────────────────────────────────────────────
 *
 * About makes exactly one tile non-photographic and gives it the biggest
 * number. Here that is 9001 — the ISO badge that used to sit at the end of the
 * thin compliance strip under the hero, where it read as a footnote. A buyer
 * scanning this page for a credential finds a four-digit number they already
 * recognise, at 52-64px, instead of a 12px pill.
 *
 * ── ⚠ On "4 laboratory controls" ────────────────────────────────────────────
 *
 * Four controls are documented on this page and three of them run on every
 * batch — the toughness test is by request. This tile says how many controls
 * the laboratory operates, not how many run on every lot, and the two figures
 * beside it must not be read as one sentence. The distinction is made where
 * someone acts on it: on control 04's own card, in its `note`.
 *
 * If that still reads as overclaiming on review, the fix is to relabel this
 * "Controls documented" rather than to drop the figure.
 *
 * The other two are safe. "100%" is the page's opening sentence, which is
 * EID's own wording. "3" is FEPA, ISO 6106 and ANSI, counted off the standards
 * line in TheLaboratory.
 *
 * ── ⚠ The two statements are written, not supplied ──────────────────────────
 *
 * Same caveat as About's vision and mission, and the same constraint applied:
 * claim nothing the site does not already claim, in its own words. Everything
 * below appears elsewhere on this site — "measured rather than sampled" is the
 * About mission, and the certificate of analysis, the retention sample and the
 * traceability chain are the Excellence value on About's core values.
 *
 * Safe to show Uri. Wrong to ship without him. Two `body` strings.
 */
const STACKED = [
  { value: '100%', label: 'Batches tested' },
  { value: '4', label: 'Laboratory controls' },
  /* "Standards met", not "International standards". The longer label is the
     one that reads better and it was the first choice, but it wraps to two
     lines at 1024px while the other two hold at one, which tips the tall
     tile's three figures out of rhythm at exactly one breakpoint. About's
     three labels never wrap at any width, and matching that is the point of
     this page. The standards themselves are named in full in TheLaboratory. */
  { value: '3', label: 'Standards met' },
]

const STATEMENTS = [
  {
    label: 'Measured, not sampled',
    body: 'A lot that was spot-checked is a lot you have to re-qualify on arrival. Every batch is measured — sieve and micron sizing, morphology, and a particle size distribution curve on record — so the grade you ordered last year is the grade that arrives this year, and the variable you are managing is your process rather than our material.',
  },
  {
    label: 'Documented, not asserted',
    body: 'Every lot leaves with a certificate of analysis, a retention sample is kept from every batch, and traceability runs from incoming raw material through to the lot that shipped. If a grade ever needs answering for, the record exists and so does the material it was taken from.',
  },
]

const QualityMosaic = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="quality-mosaic" className="bg-default-50 py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="grid auto-rows-fr grid-cols-2 gap-6 lg:col-span-6">
            {/* TALL — three figures over the two-lot comparison. */}
            <div className="rounded-card relative row-span-2 min-h-[420px] overflow-hidden lg:min-h-[520px]">
              <Image src="/eid/qc-batch-to-batch.jpg" alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <span aria-hidden className="bg-primary-3/78 absolute inset-0" />

              <dl className="absolute inset-0 flex flex-col items-center justify-around p-5 text-center">
                {STACKED.map((f) => (
                  <div key={f.label}>
                    <dd className="text-[38px] leading-none font-bold text-white lg:text-[46px]">{f.value}</dd>
                    <dt className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/75 uppercase">{t(locale, f.label)}</dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* SHORT — the retention shelf, no figure. About's equivalent tile
                is the one that stops the column being all claims; this one
                does that and doubles as the evidence for the second statement
                on the right, which is the sentence about retention samples. */}
            <div className="rounded-card relative min-h-[200px] overflow-hidden lg:min-h-[248px]">
              <Image
                src="/eid/qc-samples.jpg"
                alt={t(locale, 'A laboratory shelf of labelled retention sample jars, coarse grit at the front graduating to fine powder along the row')}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* SHORT — solid brand colour, one figure. */}
            <div className="rounded-card bg-primary relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden text-center lg:min-h-[248px]">
              <span className="text-[52px] leading-none font-bold text-white lg:text-[64px]">9001</span>
              <span className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase">{t(locale, 'ISO certified')}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-12 lg:col-span-6 lg:gap-16">
            {STATEMENTS.map((b) => (
              <div key={b.label} className="border-primary border-s-2 ps-7 lg:ps-9">
                <h2 className="text-default-900 text-[26px] leading-none font-bold lg:text-[32px]">{t(locale, b.label)}</h2>
                <p className="text-default-600 mt-5 text-[16px] leading-relaxed lg:text-[17px]">{t(locale, b.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default QualityMosaic
