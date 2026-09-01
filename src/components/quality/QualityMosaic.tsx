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
 * The grade comparison: sixteen dishes of micron powder laid out in order,
 * graduating from the finest white through to the coarsest dark grey. Figures
 * whose subject is consistency want a ground that shows a graded series rather
 * than one sample, and an ordered grid reads as exactly that even at tile size
 * under a heavy scrim.
 *
 * ⚠ It replaces a genuine side-by-side SEM of two production lots at 1 µm,
 * which was stronger evidence — it showed two real lots matching. This is a
 * range rather than a repeat, so it demonstrates breadth where the old frame
 * demonstrated repeatability. If the "100% batches tested" figure ever needs
 * its evidence back, /eid/qc-batch-to-batch.jpg is still on disk.
 *
 * One incidental benefit of the scrim here: the dish labels in this image are
 * generated and do not survive reading closely. At 78% navy over them they are
 * illegible, which is the right outcome. Do not reuse this frame anywhere it
 * is shown large and unscrimmed.
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
              <Image src="/eid/quality/08-micron-powder-grade-comparison.png" alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
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

            {/* SHORT — the sample cabinet, no figure. Doubles as the evidence
                for the second statement on the right, which is the sentence
                about retention samples and traceability: every jar in it
                carries a barcode, which is the traceability half made
                literal.

                ⚠ It is weaker than the frame it replaces on the retention
                half. The old shelf showed jars with material in them, coarse
                grit at the front graduating to fine powder; these jars read as
                empty glass. "A retention sample is kept from every batch" is
                better served by visible material. Worth a frame of the real
                cabinet with real samples in it. */}
            <div className="rounded-card relative min-h-[200px] overflow-hidden lg:min-h-[248px]">
              <Image
                src="/eid/quality/05-labeled-sample-storage-cabinet.png"
                alt={t(locale, 'A stainless steel cabinet of barcode-labelled sample jars on lit shelves')}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* SHORT — solid brand colour, one figure. AND IT IS A LINK NOW.
                Until the certificate landed on this page, "9001 / ISO
                CERTIFIED" was the site asserting its own credential in 64px
                type — the largest unevidenced claim on a page whose whole
                argument is that EID documents things rather than asserting
                them. The document is now three sections down, with the number,
                the issuer, the scope and the expiry on it.

                So the tile keeps the figure and becomes the way to the proof.
                Nothing is added visually at rest beyond one small line; the
                arrow and the lift are hover-only, so the mosaic still reads as
                a mosaic rather than a row of buttons.

                A plain <a href="#certificate"> rather than next-intl's Link:
                the target is on THIS page, and routing a same-page hash through
                the router re-runs locale resolution to land where the browser
                would have gone on its own. */}
            <a
              href="#certificate"
              className="group rounded-card bg-primary hover:bg-primary-1 focus-visible:outline-primary relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 lg:min-h-[248px]"
            >
              <span className="text-[52px] leading-none font-bold text-white lg:text-[64px]">9001</span>
              <span className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase">{t(locale, 'ISO certified')}</span>

              {/* white/85 on primary is 8.2:1, so this clears the floor at
                  11px without needing solid white — which would compete with
                  the figure above it. */}
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-white/85 uppercase">
                {t(locale, 'See the certificate')}
                {/* Inline SVG, not Iconify — CurtainGrid's rule, and the same
                    reason: this file is a server component and importing Icon
                    for one glyph would ship a client bundle for a decoration.
                    Same path as tabler:arrow-narrow-right. */}
                <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-500 group-hover:translate-x-1">
                  <path d="M5 12h14m-4 4l4-4m-4-4l4 4" />
                </svg>
              </span>
            </a>
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
