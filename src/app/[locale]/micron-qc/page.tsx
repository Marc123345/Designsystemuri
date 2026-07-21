import { RichText } from '@/components/RichText'
import { QuoteSection, CrossLinks, DarkFeatureList, PageHero } from '@/components/sections'
import { ChapterMarker, SectionHeading } from '@/components/ui'
import Wireframe from '@/components/Wireframe'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

/**
 * Companion to /mesh-qc. The copy deck links here from the Quality page and
 * from the "How diamond size distribution affects tool performance" guide,
 * because D-value control is the buying criterion for fine polishing.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Micron QC | Particle Size Distribution & D-Values | EID' },
    description:
      'How EID measures and controls particle size distribution on micron powder: D10, D50, D90 and span, with outliers controlled on every lot. ISO 9001 certified.',
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
        eyebrow="Quality · Micron QC in detail"
        title="Micron QC"
        desc="Particle-size-distribution measurement and the D-value control that fine polishing depends on."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Quality', href: '/quality' },
          { label: 'Micron QC' },
        ]}
        primaryCta={{ label: 'Request a Quote', href: '/contact' }}
        secondaryCta={{ label: 'Back to Quality', href: '/quality' }}
      />

      {/* D-values first: the page has to define the vocabulary before it can
          claim to control it. */}
      <div className="container pt-20">
        <ChapterMarker index="01" label="What D-values mean" />
      </div>
      <section className="lg:py-24 py-16">
        <div className="container">
          <div className="max-w-4xl">
            <SectionHeading
              eyebrow="The buying criterion"
              title="In fine finishing, the distribution is the specification."
            />
            <div className="mt-7 space-y-4 text-base text-default-600">
              <p>
                D50 is the midpoint of the distribution: half the particles sit below it, half above.
                D10 and D90 mark the fine and coarse tails, and span describes how wide the spread is
                between them. Two powders can share a D50 and behave completely differently, because
                the tails are where the surface finish is won or lost.
              </p>
              <p>
                <RichText>
                  {
                    'That is why we grade and verify the whole curve rather than a single number. Mesh grit is a different problem, sized mechanically against a calibrated sieve stack, which [Mesh QC](/mesh-qc) covers.'
                  }
                </RichText>
              </p>
            </div>
            <p className="mt-5 font-mono text-sm text-default-500">
              Instrument makes, models, calibration intervals, and the real D-value tolerances to be
              confirmed with Uri before launch.
            </p>

            {/* Photography of the actual measurement equipment is still outstanding. */}
            <div className="mt-12 grid md:grid-cols-2 grid-cols-1 gap-8">
              <Wireframe label="Laser diffraction analyser — lab photo pending from Uri" />
              <Wireframe label="Particle counter — lab photo pending from Uri" />
            </div>
          </div>
        </div>
      </section>

      <div className="container pb-20">
        <ChapterMarker index="02" label="The method" />
      </div>
      <DarkFeatureList
        eyebrow="Micron QC, step by step"
        title="What we measure on every micron batch."
        desc="Consistency at the top of the distribution is what protects the workpiece, so that is what our micron QC controls for."
        features={steps}
        ctaLabel="See the full QC process"
        ctaHref="/quality"
      />

      <div className="pt-20">
        <QuoteSection
          eyebrow="Specify your tolerances"
          title="Request a quote with your QC specification."
          desc="Send us the grade and the D-values you need documented, and a real person replies within one business day."
        />
      </div>

      <CrossLinks
        groups={[
          {
            title: 'Quality',
            links: [
              { label: 'Quality, QC & ISO 9001', href: '/quality' },
              { label: 'Mesh QC', href: '/mesh-qc' },
            ],
          },
          {
            title: 'Products graded this way',
            links: [
              {
                label: 'Natural Diamond Micron Powder',
                href: '/products/natural-grit-powder#micron',
              },
              {
                label: 'Polycrystalline Diamond Powder',
                href: '/products/polycrystalline-powder',
              },
              { label: 'Resin Bond Diamond', href: '/products/resin-bond' },
            ],
          },
          {
            title: 'Support',
            links: [
              { label: 'Datasheets', href: '/resources/datasheets' },
              { label: 'MSDS', href: '/resources/msds' },
            ],
          },
        ]}
      />
    </>
  )
}

export default MicronQcPage
