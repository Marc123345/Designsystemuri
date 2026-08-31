import { RichText } from '@/components/RichText'
import CanvasField from '@/components/CanvasField'
import { ChapterNumeral } from '@/components/ui'
import { CrossLinks, DarkFeatureList, LabPhoto, PageHero } from '@/components/sections'
import { SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

/**
 * Companion to /mesh-qc. The copy deck links here from the Quality page and
 * from the "How diamond size distribution affects tool performance" guide,
 * because D-value control is the buying criterion for fine polishing.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Micron QC | Particle Size Distribution & D-Values | EID' },
    description: 'How EID measures and controls particle size distribution on micron powder: D10, D50, D90 and span, with outliers controlled on every lot. ISO 9001 certified.',
    alternates: localeAlternates(locale, '/micron-qc'),
  }
}

const steps = [
  {
    title: 'Laser diffraction',
    desc: 'Produces the full distribution curve for the batch, giving the D10, D50, and D90 values recorded on the certificate of analysis.',
  },
  {
    title: 'Particle counting',
    desc: 'An independent electrical-sensing-zone count cross-checks the distribution and catches outliers at the coarse tail, which is the failure mode that scratches a workpiece.',
  },
  {
    title: 'Span control',
    desc: 'Span is graded to the specification, not just reported. A drifting span changes how the powder cuts even when the D50 looks unchanged.',
  },
  {
    title: 'Outlier control',
    desc: 'The top of the distribution is the part that costs money. A single oversized particle can scratch an optical surface or kill hundreds of die on a wafer, so the coarse tail is controlled deliberately.',
  },
  {
    title: 'Documentation',
    desc: 'Certificate of analysis per lot on request, with a retention sample kept so any later question can be checked against the exact material that shipped.',
  },
]

const MicronQcPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'Quality · Micron QC in detail')}
        title={t(locale, 'Micron QC')}
        desc={t(locale, 'Particle-size-distribution measurement and the D-value control that fine polishing depends on.')}
        /* The grade series itself: sixteen dishes of micron powder in order,
           finest through coarsest. This page is about grading and the D-value
           control, and a graded series says that in one frame where the single
           micrograph it replaces showed one grade being verified.

           ⚠ The dish labels in this image are generated and do not read
           closely. In a `variant="band"` hero they sit small and behind the
           heading scrim; do not promote this frame to a large unscrimmed slot
           without checking them. */
        bgImage="/eid/quality/08-micron-powder-grade-comparison.png"
        variant="band"
      />

      {/* D-values first: the page has to define the vocabulary before it can
claim to control it. */}
      {/* Fine screen, against Mesh QC’s coarse one. The two pages argue that
          mesh and micron are different problems; their backgrounds now say so
          before the copy does. See CanvasField. */}
      <section className="relative isolate py-16 lg:py-24">
        <CanvasField density="fine" />
        {/* Mesh QC is 01 and Micron QC is 02 — they are a pair, and the site
            says so in the copy ("mesh and micron are different problems") long
            before it says so anywhere else. This is the only place on the site
            with room for the device: the copy on both pages runs in a narrow
            left column with roughly a third of the width empty beside it. It
            was tried on the home range band first and pulled — the right edge
            there is a text column, so the numeral landed behind body copy and
            read as a smudge rather than as a crop. */}
        <ChapterNumeral index="02" className="top-24" />
        <div className="container">
          <div className="max-w-4xl">
            <SectionHeading eyebrow={t(locale, 'The buying criterion')} title={t(locale, 'In fine finishing, the distribution is the specification.')} />
            <div className="text-default-600 mt-7 space-y-4 text-base">
              <p>
                {t(
                  locale,
                  'D50 is the midpoint of the distribution: half the particles sit below it, half above. D10 and D90 mark the fine and coarse tails, and span describes how wide the spread is between them. Two powders can share a D50 and behave completely differently, because the tails are where the surface finish is won or lost.'
                )}
              </p>
              <p>
                <RichText>{t(locale, 'That is why we grade and verify the whole curve rather than a single number. Mesh grit is a different problem, sized mechanically against a calibrated sieve stack, which [Mesh QC](/mesh-qc) covers.')}</RichText>
              </p>
            </div>
            <p className="text-default-500 mt-5 font-mono text-sm">Instrument makes, models, calibration intervals, and the real D-value tolerances to be confirmed with Uri before launch.</p>

            {/* ⚠ ILLUSTRATIVE. These show the class of instrument micron sizing
                is measured on, not EID's own bench — see LabPhoto. The line
                above still asks Uri for the real makes and models. */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <LabPhoto src="/eid/quality/micron-qc-laser-diffraction.jpg" alt={t(locale, 'A benchtop laser diffraction particle size analyser mid-measurement, with its wet dispersion unit alongside')} />
              <LabPhoto src="/eid/quality/micron-qc-particle-counter.jpg" alt={t(locale, 'A benchtop liquid particle counter with a sample vial being loaded into its carousel')} />
            </div>
          </div>
        </div>
      </section>

      <DarkFeatureList
        bgLabel="Background image — particle sizing bench"
        eyebrow={t(locale, 'Micron QC, step by step')}
        title={t(locale, 'What we measure on every micron batch.')}
        desc={t(locale, 'Consistency at the top of the distribution is what protects the workpiece, so that is what our micron QC controls for.')}
        features={steps.map((s) => ({ title: t(locale, s.title), desc: t(locale, s.desc) }))}
        ctaLabel={t(locale, 'See the full QC process')}
        ctaHref="/quality"
      />

      {/* ── ⚠ THE QUOTE BLOCK IS GONE FROM EVERY PAGE BUT /contact ───────
          Marc's call, applied site-wide: the eyebrow, "Request a quote or a
          sample.", the email and phone lines, and the embedded Jotform.

          It was on seven pages — this one, the application hubs, both QC pages
          and all three resources pages — which meant the site shipped the same
          cross-origin form seven times over, each instance a second full copy
          of the contact page pasted onto the foot of something else. /contact
          is the header button on every page, it is in the footer, and the
          floating WhatsApp control sits over all of it.

          Each page's own eyebrow/title/desc strings went with it. They were
          Uri's per-page wording, so if the block ever returns it returns with
          them — check this file's history rather than writing new ones. */}

      <CrossLinks
        groups={[
          {
            title: t(locale, 'Quality'),
            links: [
              { label: t(locale, 'Quality, QC & ISO 9001'), href: '/quality' },
              { label: t(locale, 'Mesh QC'), href: '/mesh-qc' },
            ],
          },
          {
            title: t(locale, 'Products graded this way'),
            links: [
              {
                label: t(locale, 'Natural Diamond Micron Powder'),
                href: '/products/natural-grit-powder#micron',
              },
              {
                label: t(locale, 'Polycrystalline Diamond Powder'),
                href: '/products/polycrystalline-powder',
              },
              { label: t(locale, 'Resin Bond Diamond'), href: '/products/resin-bond' },
            ],
          },
          {
            title: t(locale, 'Support'),
            links: [
              { label: t(locale, 'Datasheets'), href: '/resources/datasheets' },
              { label: t(locale, 'MSDS'), href: '/resources/msds' },
            ],
          },
        ]}
      />
    </>
  )
}

export default MicronQcPage
