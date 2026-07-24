import { RichText } from '@/components/RichText'
import { QuoteSection, CrossLinks, DarkFeatureList, PageHero } from '@/components/sections'
import { SectionHeading } from '@/components/ui'
import Wireframe from '@/components/Wireframe'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

/**
 * The copy deck's Quality page (19) links down to /mesh-qc and /micron-qc as
 * detail pages, and its WHAT CHANGED note says those links are retained. They
 * sit below /quality as Level 2 detail, alongside the guides, rather than
 * inside the architecture's 22-page core inventory.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Mesh QC | Grit Sizing & Crystal Shape Control | EID' },
    description:
      'How EID grades and verifies mesh grit: sieve sizing against calibrated references, shape factor inspection, and strength testing where the grade requires it.',
    alternates: localeAlternates(locale, '/mesh-qc'),
  }
}

const steps = [
  {
    title: 'Sieve grading',
    desc: 'Grit is graded through a calibrated sieve stack to FEPA and US mesh. The stack is checked against reference sieves on a fixed re-certification interval, because a drifted sieve silently shifts every grade that passes through it.',
  },
  {
    title: 'Size verification',
    desc: 'Graded fractions are re-measured to confirm the distribution sits inside the grade specification, with the coarse and fine tails checked rather than only the mid-point.',
  },
  {
    title: 'Crystal morphology and shape factor',
    desc: 'Optical and stereo microscopy confirms the blocky, semi-blocky, or irregular form matches the grade specification. Shape factor is a mesh criterion: it drives how the crystal anchors in a bond, so it is a specification, not a by-product.',
  },
  {
    title: 'Crystal strength (friability)',
    desc: 'Tested where the grade or the application requires it, rather than as a routine every-batch test, so the grit breaks down the way your bond system expects: saw grades hold up under impact, wheel grades break down in a governed way.',
  },
  {
    title: 'Documentation',
    desc: 'Results are recorded per lot, with a certificate of analysis available on request and a retention sample kept from every batch.',
  },
]

const MeshQcPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'Quality · Mesh QC in detail')}
        title={t(locale, 'Mesh QC')}
        desc={t(locale, 'How we grade and verify grit sizing and shape factor, lot after lot.')}
        crumbs={[
          { label: t(locale, 'Home'), href: '/' },
          { label: t(locale, 'Quality'), href: '/quality' },
          { label: t(locale, 'Mesh QC') },
        ]}
        primaryCta={{ label: t(locale, 'Request a Quote'), href: '/contact' }}
        secondaryCta={{ label: t(locale, 'Back to Quality'), href: '/quality' }}
      />

      {/* Why mesh is its own page: sieve grading and micron counting are two
          different problems, and a buyer arrives already in one of them. */}
      <section className="lg:py-24 py-16">
        <div className="container">
          <div className="max-w-4xl">
            <SectionHeading
              eyebrow={t(locale, 'Grading by form')}
              title={t(locale, 'Mesh grit is graded by sieve, not by counter.')}
            />
            <p className="mt-7 text-base text-default-600">
              <RichText>
                {t(locale,
                  'Grading and testing differ between mesh grit and micron powder, so each has its own method. Mesh grit is sized mechanically against a calibrated sieve stack, and the buying criteria are the size fraction, the shape factor, and how the grit breaks down under load. Micron powder is a different problem entirely, measured by particle counting and controlled on D-values, which [Micron QC](/micron-qc) covers.'
                )}
              </RichText>
            </p>
            <p className="mt-5 font-mono text-sm text-default-500">
              Instrument makes, models, and calibration intervals to be confirmed with Uri before
              launch, together with photographs of the laboratory.
            </p>

            {/* Photography of the actual grading equipment is still outstanding. */}
            <div className="mt-12 grid md:grid-cols-2 grid-cols-1 gap-8">
              <Wireframe label="Calibrated sieve stack & shaker — lab photo pending from Uri" />
              <Wireframe label="Optical & stereo microscopy — lab photo pending from Uri" />
            </div>
          </div>
        </div>
      </section>

      <DarkFeatureList
          bgLabel="Background image — sieve grading bench"
        eyebrow={t(locale, 'Mesh QC, step by step')}
        title={t(locale, 'What we check on a mesh lot.')}
        desc={t(locale, 'Sizing and shape factor are verified on every lot, with strength tested where the grade or the application requires it. The record is what you can put in a qualification file.')}
        features={steps.map((s) => ({ title: t(locale, s.title), desc: t(locale, s.desc) }))}
        ctaLabel={t(locale, 'See the full QC process')}
        ctaHref="/quality"
      />

      <div className="pt-20">
        <QuoteSection
          eyebrow={t(locale, 'Specify your tolerances')}
          title={t(locale, 'Request a quote with your QC specification.')}
          desc={t(locale, 'Send us the mesh grade and the parameters you need documented, and a real person replies within one business day.')}
        />
      </div>

      <CrossLinks
        groups={[
          {
            title: t(locale, 'Quality'),
            links: [
              { label: t(locale, 'Quality, QC & ISO 9001'), href: '/quality' },
              { label: t(locale, 'Micron QC'), href: '/micron-qc' },
            ],
          },
          {
            title: t(locale, 'Products graded this way'),
            links: [
              { label: t(locale, 'Natural Diamond Grit (Mesh)'), href: '/products/natural-grit-powder#grit' },
              { label: t(locale, 'Metal Bond Diamond'), href: '/products/metal-bond' },
              { label: t(locale, 'CBN Powder'), href: '/products/cbn#mesh' },
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

export default MeshQcPage
