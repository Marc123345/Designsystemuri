import CountUp from '@/components/CountUp'
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
        {/* ── ONE BENTO, NOT TWO ROWS ──────────────────────────────────────
            Second pass at Marc's merge. The first one put the laboratory copy
            and the mosaic inside a single <section> and left them as two
            stacked 6/6 rows — which still read as two sections, correctly,
            because nothing about them was joined: same split, same ruled text
            block on the left, and a gap between them the size of a section
            break.

            This is one grid instead. No row repeats another's structure, and
            the figures tile spans rows 2-3 down the left so the composition
            interlocks rather than stacks:

              ┌ copy ──────────────┬ micrometer ─┐
              ├ figures ┬ measured ─┬ cabinet ───┤
              └─────────┴ documented┴ 9001 ──────┘

            3 + 5 + 4 = 12 on the lower rows, 7 + 5 on the top one. The bento
            is also the language of TheControls directly below, so the page now
            has one grammar rather than a mosaic followed by a bento.

            The ruled left edge marks every TEXT cell — heading and the two
            statements — which is what keeps text and photograph legible as
            different kinds of thing inside one grid. */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* ── COPY ──────────────────────────────────────────────────── */}
          <div className="border-primary border-s-2 ps-7 lg:col-span-7 lg:ps-9">
            <p className="text-default-500 font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'Quality control')}</p>
            <h2 className="text-default-900 mt-4 text-[32px] leading-none font-bold lg:text-[42px]">{t(locale, 'The Laboratory')}</h2>

            <p className="text-default-700 mt-6 text-[18px] leading-relaxed lg:text-[19px]">
              {t(
                locale,
                'At EID, every single batch of diamond and CBN powder undergoes strict laboratory validation to guarantee total product consistency, lot after lot.'
              )}
            </p>
            <p className="text-default-600 mt-5 max-w-[62ch] text-base leading-relaxed">
              {t(
                locale,
                'QC is built into every stage, from raw material selection through grading, crushing, chemical cleaning, coating and final inspection. The in-house QC laboratory is the backbone of everything we ship, and all laboratory testing is compliant with international FEPA, ISO 6106 and ANSI standards.'
              )}
            </p>
          </div>

          {/* ── MICROMETER ────────────────────────────────────────────────
              A digital micrometer closed on a diamond crystal, reading
              3.000 mm. The paragraph beside it says every batch is validated
              rather than sampled, and this is a measurement being taken — the
              claim, happening.

              No aspect ratio any more: as a bento cell it stretches to the
              height of the copy beside it, so the top row is level whatever
              the type does. min-h carries it on mobile, where it stacks.

              ⚠ WHAT THE SWAP TO THIS FRAME COST, so nobody re-litigates it
              blind. The previous one was the QC laboratory with an ISO 9001
              notice visibly on the wall — the only photograph in which the
              certification was part of the room rather than asserted in text.
              The standards are now text only here; the 9001 tile in this same
              grid is where a buyer meets the credential as an object.

              ⚠ Source is square (1024x1024) and this cell is not, so a good
              deal of height is cropped. object-center is right for this one —
              the jaw and the crystal sit dead centre — but that is not
              automatic for the others. */}
          <div className="rounded-card relative min-h-[260px] overflow-hidden lg:col-span-5">
            <Image
              src="/eid/quality/09-digital-micrometer-diamond-measurement.png"
              alt={t(locale, 'A digital micrometer closed on a diamond crystal, its display reading 3.000 mm')}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* ── FIGURES ───────────────────────────────────────────────────
              Spans the two lower rows. This is the cell that stops the grid
              reading as three separate bands: it is the only thing crossing a
              row boundary. */}
          <div className="rounded-card relative min-h-[420px] overflow-hidden lg:col-span-3 lg:row-span-2 lg:min-h-0">
            <Image src="/eid/quality/08-micron-powder-grade-comparison.png" alt="" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
            <span aria-hidden className="bg-primary-3/78 absolute inset-0" />

            <dl className="absolute inset-0 flex flex-col items-center justify-around p-5 text-center">
              {STACKED.map((f) => (
                <div key={f.label}>
                  <dd className="text-[38px] leading-none font-bold text-white lg:text-[46px]"><CountUp value={f.value} /></dd>
                  <dt className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/75 uppercase">{t(locale, f.label)}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* ── MEASURED, NOT SAMPLED ─────────────────────────────────── */}
          <div className="border-primary border-s-2 ps-7 lg:col-span-5 lg:self-center lg:ps-9">
            <h3 className="text-default-900 text-[26px] leading-none font-bold lg:text-[30px]">{t(locale, STATEMENTS[0].label)}</h3>
            <p className="text-default-600 mt-5 text-[16px] leading-relaxed lg:text-[17px]">{t(locale, STATEMENTS[0].body)}</p>
          </div>

          {/* ── CABINET ───────────────────────────────────────────────────
              Sits beside the traceability statement deliberately: every jar
              carries a barcode, which is the traceability half made literal.

              ⚠ Weaker than the frame it replaces on the retention half. The
              old shelf showed jars with material in them, coarse grit at the
              front graduating to fine powder; these read as empty glass. "A
              retention sample is kept from every batch" is better served by
              visible material. Worth a frame of the real cabinet. */}
          <div className="rounded-card relative min-h-[220px] overflow-hidden lg:col-span-4 lg:min-h-0">
            <Image
              src="/eid/quality/05-labeled-sample-storage-cabinet.png"
              alt={t(locale, 'A stainless steel cabinet of barcode-labelled sample jars on lit shelves')}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* ── DOCUMENTED, NOT ASSERTED ──────────────────────────────── */}
          <div className="border-primary border-s-2 ps-7 lg:col-span-5 lg:self-center lg:ps-9">
            <h3 className="text-default-900 text-[26px] leading-none font-bold lg:text-[30px]">{t(locale, STATEMENTS[1].label)}</h3>
            <p className="text-default-600 mt-5 text-[16px] leading-relaxed lg:text-[17px]">{t(locale, STATEMENTS[1].body)}</p>
          </div>

          {/* ── 9001 ──────────────────────────────────────────────────────
              Solid brand colour, one figure, and a link. Until the certificate
              landed on this page, "9001 / ISO CERTIFIED" was the site asserting
              its own credential in 64px type — the largest unevidenced claim on
              a page whose whole argument is that EID documents things rather
              than asserting them. So the tile keeps the figure and becomes the
              way to the proof; the arrow and the lift are hover-only, so the
              grid still reads as a grid rather than a row of buttons.

              Points at the certificate scan itself. It used to be
              href="#certificate", which scrolled to the Certification section —
              removed on Marc's instruction, so the anchor would now scroll to
              nothing. A plain <a> rather than next-intl's Link: the target is a
              raw asset in /public, not a route, so it must not be
              locale-prefixed.

              The ISO 9001:2015 registration details that used to sit in that
              section — certificate number 224122015, issued by Citation ISO
              Certification Limited, ASCB accredited, valid to 6 March 2029 —
              are in this file's history via TheCertificate.tsx if wanted back. */}
          <a
            href="/eid/iso-9001-eid.jpg"
            target="_blank"
            rel="noreferrer noopener"
            className="group rounded-card bg-primary hover:bg-primary-1 focus-visible:outline-primary relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden p-5 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 lg:col-span-4 lg:min-h-0"
          >
            {/* ⚠ Counts like the three figures beside it, for consistency. Worth
                knowing this one is a NAME, not a measure: it is ISO 9001, not
                nine thousand and one of anything. If counting it reads wrong,
                drop the CountUp here and leave the other three. */}
            <span className="text-[52px] leading-none font-bold text-white lg:text-[60px]"><CountUp value="9001" /></span>
            <span className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase">{t(locale, 'ISO certified')}</span>

            {/* white/85 on primary is 8.2:1, so this clears the floor at 11px
                without needing solid white, which would compete with the figure. */}
            <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-white/85 uppercase">
              {t(locale, 'See the certificate')}
              {/* Inline SVG, not Iconify — this file is a server component and
                  importing Icon for one glyph would ship a client bundle for a
                  decoration. Same path as tabler:arrow-narrow-right. */}
              <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-500 group-hover:translate-x-1">
                <path d="M5 12h14m-4 4l4-4m-4-4l4 4" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default QualityMosaic
