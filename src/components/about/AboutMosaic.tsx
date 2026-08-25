import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * The numbers, the photographs, and the vision and mission — one mosaic.
 *
 * ── What Strauss actually does here ─────────────────────────────────────────
 *
 * This is the block Uri pointed at, and the shape is easy to describe wrongly.
 * It is not a numbers strip with text under it. It is a two-column mosaic:
 *
 *   ┌─────────┬─────────┐ ┌────────────────────┐
 *   │ tall    │ photo   │ │ OUR VISION         │   ← ruled, no box
 *   │ dark    ├─────────┤ │ paragraph          │
 *   │ tile,   │ solid   │ ├────────────────────┤
 *   │ three   │ blue    │ │ OUR MISSION        │
 *   │ figures │ tile,   │ │ paragraph          │
 *   │ over a  │ one     │ └────────────────────┘
 *   │ photo   │ figure  │
 *   └─────────┴─────────┘
 *
 * Three things make it work, and all three are easy to drop:
 *
 *  1. THE FIGURES SIT ON PHOTOGRAPHS, not in bordered boxes. That is the whole
 *     difference between a stat bar and this — "80 countries" over a picture of
 *     the place the material ships from is a claim with its evidence beside it;
 *     "80" in a white box is a number.
 *  2. THE TILES ARE DIFFERENT SIZES. One tall, two short, one of them solid
 *     brand colour rather than photographic. A grid of five equal cells is a
 *     strip; unequal cells are a composition.
 *  3. THE TEXT IS NOT BOXED. Vision and mission sit on the page ground with a
 *     thin accent rule down their left edge. Boxing them too would give the
 *     block eight competing rectangles and nowhere to rest.
 *
 * This replaces both NumbersStrip and VisionMission, which were the same
 * content as two stacked full-width rows. Those files are gone.
 *
 * ── ⚠ Two of the four figures still need Uri's confirmation ────────────────
 *
 *  · "80 countries" is his own figure from the written doc, but the reach
 *    section at the foot of this page says five continents and the heritage
 *    wording says "customers on every continent". Three scales for one claim.
 *  · "55+ years" is derived from "Since 1970", the anniversary his approved
 *    hero copy uses. 1970 → 2026 is 56, so both are true and only one should be
 *    said. Written 55+ rather than 56 so it does not need editing every year.
 *
 * The other two are safe: eight product groups is countable on the home page,
 * and every-batch testing is what the whole Quality page documents.
 *
 * ── ⚠ THE VISION AND MISSION COPY IS NOT URI'S ─────────────────────────────
 *
 * Every other block on this page carries wording EID supplied. A vision and a
 * mission are the two things a company writes for itself, and EID has not
 * written these. The constraint applied was: claim nothing the site does not
 * already claim, in its own words — "every batch measured rather than sampled"
 * is the Quality page, "we supply tool makers, not end users" is the home hero
 * and the FAQ, "since 1970" is his approved hero copy.
 *
 * Safe to show him. Wrong to ship without him. The two `body` strings are the
 * only thing that changes if he writes his own, which is the better outcome.
 */
const STACKED = [
  { value: '55+', label: 'Years manufacturing' },
  { value: '8', label: 'Product groups' },
  { value: '100%', label: 'Batches tested' },
]

const STATEMENTS = [
  {
    label: 'Our vision',
    body: 'To be the supplier a tool maker never has to think about. Diamond and CBN that arrive to the same specification every time, from one source across the full range, so the variable our customers are managing is their process rather than their material.',
  },
  {
    label: 'Our mission',
    body: 'To manufacture, grade and quality-control superabrasives to a standard we can document rather than assert. Every batch is measured rather than sampled, every lot is traceable, and every grade is answered for by someone who works with the material. We supply tool makers, not end users, and the relationship is expected to outlast the order.',
  },
]

const AboutMosaic = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="about-mosaic" className="bg-default-50 py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          {/* ── THE MOSAIC ─────────────────────────────────────────────────
              Two columns of tiles inside the left half. The tall tile spans
              both rows, which is what stops the four tiles reading as a 2x2.

              `auto-rows-fr` rather than fixed heights: the tall tile's content
              is three figures and the short ones are one each, so letting the
              rows size themselves keeps the two columns level whatever the
              type does at a given width. */}
          <div className="grid auto-rows-fr grid-cols-2 gap-6 lg:col-span-6">
            {/* TALL — three figures over a photograph, spanning both rows. */}
            <div className="rounded-card relative row-span-2 min-h-[420px] overflow-hidden lg:min-h-[520px]">
              {/* ⚠ PLACEHOLDER, like every photograph on this page. */}
              <Image src="/eid/facility/sieve-stack-astm-e11.png" alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              {/* Heavy enough that white numerals clear contrast over the
                  brightest part of the frame, and in brand navy rather than
                  black so it darkens the photograph instead of covering it. */}
              <span aria-hidden className="bg-primary-3/78 absolute inset-0" />

              <dl className="absolute inset-0 flex flex-col items-center justify-around p-5 text-center">
                {STACKED.map((f) => (
                  <div key={f.label}>
                    <dd className="text-[38px] leading-none font-bold text-white lg:text-[46px]">{f.value}</dd>
                    <dt /* White, not the brand blue. Strauss sets these labels in a bright
                       cyan that pops off their dark tile; our lightest blue is #3d5290,
                       which on a navy scrim is barely separable from the ground at 11px.
                       Contrast wins over palette on a caption this small. */
                    className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/75 uppercase">{t(locale, f.label)}</dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* SHORT — a photograph on its own, no figure. It is the tile that
                stops the column being all claims. */}
            <div className="rounded-card relative min-h-[200px] overflow-hidden lg:min-h-[248px]">
              <Image src="/eid/qc-lab.jpg" alt={t(locale, 'A technician at an optical inspection system in the EID quality laboratory')} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>

            {/* SHORT — solid brand colour, one figure. Strauss makes exactly
                one of their tiles non-photographic, and it is the one carrying
                the biggest number. Without it the mosaic is four photographs
                and the reach claim has nothing to make it land. */}
            <div className="rounded-card bg-primary relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden text-center lg:min-h-[248px]">
              <span className="text-[52px] leading-none font-bold text-white lg:text-[64px]">80</span>
              <span className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase">{t(locale, 'Countries supplied')}</span>
            </div>
          </div>

          {/* ── VISION AND MISSION ─────────────────────────────────────────
              Ruled, not boxed. See point 3 in the note above — the mosaic beside
              them is already four rectangles, and boxing these would leave the
              block with nowhere to rest. */}
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

export default AboutMosaic
