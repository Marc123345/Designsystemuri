import { RichText } from '@/components/RichText'
import {
  QuoteSection,
  CardGrid,
  CrossLinks,
  DarkFeatureList,
  PageHero,
  StatsBar,
} from '@/components/sections'
import { ChapterMarker, SectionHeading } from '@/components/ui'
import Wireframe from '@/components/Wireframe'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Quality Control & ISO 9001 | Industrial Diamond QC | EID' },
    description:
      "EID's in-house QC laboratory tests every batch of diamond and CBN for size distribution and morphology, with strength and coating coverage where required. ISO 9001.",
    alternates: localeAlternates(locale, '/quality'),
  }
}

const tests = [
  {
    icon: 'tabler:gauge',
    title: 'Particle size distribution',
    desc: 'Graded and verified for tight D50, D10 and D90, and span, with outliers controlled, on every lot. This is what keeps a grade cutting and finishing the same way order to order.',
    href: '/contact',
  },
  {
    icon: 'tabler:diamond',
    title: 'Crystal morphology, and shape factor on mesh grades',
    desc: 'Inspected to confirm the blocky, semi-blocky, or irregular form matches the grade specification.',
    href: '/contact',
  },
  {
    icon: 'tabler:shield',
    title: 'Crystal strength (friability)',
    desc: 'Tested where the grade or the application requires it, so the diamond or CBN performs as expected in your bond system rather than breaking down too fast or too slow. Not a routine every-batch test.',
    href: '/contact',
  },
  {
    icon: 'tabler:stack-2',
    title: 'Coating weight and coverage',
    desc: 'Every coated batch checked for target weight percentage and uniform coverage.',
    href: '/contact',
  },
  {
    icon: 'tabler:grid-dots',
    title: 'Traceability',
    desc: 'Every lot documented from raw material through production, QC, and shipping, with full traceability on request.',
    href: '/contact',
  },
]

// The five QC guarantees that sit beside the philosophy copy: the badge, the
// document, and the sample that lets a claim be checked later.
const philosophyFeatures = [
  { title: 'ISO 9001 certified', desc: 'Covering production, QC, and the full supply chain.' },
  { title: 'Certificate of analysis', desc: 'Issued with every shipment on request, per lot.' },
  { title: 'Retention samples', desc: 'Kept for every batch for retrospective testing.' },
]

// Named instruments, because "we test everything" is a claim and the machine
// that produces the number is the proof.
const machinery = [
  {
    meta: 'Particle sizing',
    title: 'Laser diffraction analyser',
    desc: 'Measures the full particle size distribution of micron powders, producing the D10, D50, D90, and span values recorded on the certificate of analysis.',
  },
  {
    meta: 'Particle counting',
    title: 'Coulter counter',
    desc: 'Independent electrical-sensing-zone count used to confirm distribution and catch outliers at the coarse tail, which is the failure mode in fine polishing.',
  },
  {
    meta: 'Sizing',
    title: 'Calibrated sieve stack & shaker',
    desc: 'Grades mesh grit to FEPA and US mesh, verified against calibrated reference sieves on a fixed re-certification interval.',
  },
  {
    meta: 'Morphology',
    title: 'Optical & stereo microscopy',
    desc: 'Confirms crystal shape (blocky, semi-blocky, irregular) against the grade specification and inspects coating coverage for uniformity.',
  },
  {
    meta: 'Strength',
    title: 'Friability / toughness test rig',
    desc: 'Measures how the crystal breaks down under load, run where the grade or the application calls for a friability figure rather than as a routine every-batch test.',
  },
  {
    meta: 'Coating',
    title: 'Coating weight assay',
    desc: 'Confirms target weight percentage on every coated batch, because retention in a sintered matrix depends on it.',
  },
]

const QualityPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow="In-house QC · ISO 9001 · full traceability"
        title="Quality Control & ISO 9001"
        desc="EID's in-house QC laboratory tests every batch of diamond and CBN for size distribution and morphology, with strength and coating coverage where required. ISO 9001."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Quality' }]}
        secondaryCta={{ label: 'View Products', href: '/#products' }}
      />

      <StatsBar
        items={[
          { value: '5', label: 'QC process steps' },
          { value: '100%', label: 'Batches tested' },
          { value: '8', label: 'Product groups' },
          { value: '50+', label: "Years' experience" },
        ]}
      />

      {/* QC PHILOSOPHY — the argument for why the laboratory exists, before any
          list of tests. */}
      <div className="container pt-20">
        <ChapterMarker index="01" label="QC Philosophy" />
      </div>
      <section className="lg:py-24 py-16">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Quality is the product"
                title="Quality control is what you are buying."
              />
              <div className="mt-7 space-y-4 text-base text-default-600">
                <p>
                  EID does not check quality after the fact. It is built into every stage, from raw
                  material selection through grading, coating, and final inspection, and the in-house
                  QC laboratory is the backbone of everything we ship.
                </p>
                <p>
                  The reason matters more than the badge. When a tool maker reorders a grade, they
                  are trusting that this lot behaves like the last one, because their own production
                  is tuned to it. Our job is to make that true every time, and to prove it with data
                  rather than a promise.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="divide-y divide-default-200 border-t border-default-200">
                {philosophyFeatures.map((f) => (
                  <div key={f.title} className="py-5">
                    <h4 className="text-base font-semibold text-default-900">{f.title}</h4>
                    <p className="mt-1 text-base text-default-600">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <ChapterMarker index="02" label="What We Test" />
      </div>
      <CardGrid
        eyebrow="What we test on every batch"
        title="What we test on every batch."
        desc="Particle size distribution and morphology are verified on every lot, with crystal strength and coating coverage tested where the grade or the application requires it. Every lot is documented and traceable from raw material through QC to delivery."
        items={tests}
        ctaHref="/contact"
        ctaLabel="Request a Quote with QC Spec"
      />

      <div className="container pb-20">
        <ChapterMarker index="03" label="QC Process" />
      </div>
      <DarkFeatureList
          bgLabel="Background image — QC laboratory"
        eyebrow="How our QC works"
        title="How a batch moves through our laboratory."
        desc="Five steps from incoming inspection to shipped product, with documentation at every stage and a retention sample kept from every batch."
        ctaLabel="Request a Quote"
        ctaHref="/contact"
        features={[
          {
            title: '01 · Incoming inspection',
            desc: 'Raw materials are tested on arrival against their incoming specification before anything enters production.',
          },
          {
            title: '02 · In-process control',
            desc: 'Production parameters are monitored and recorded through grading, coating, and finishing.',
          },
          {
            title: '03 · Final QC',
            desc: 'Every finished batch is sampled and tested in our laboratory, and results are compared against your specification and our internal standards.',
          },
          {
            title: '04 · Certificate of analysis',
            desc: 'Issued with any shipment on request, documenting the results for that specific lot.',
          },
          {
            title: '05 · Retention samples',
            desc: 'A sample from every batch is kept, so any later question can be checked against the exact material that shipped.',
          },
        ]}
      />

      {/* The deck asks for each QC step to be supported by a photo of the actual
          machinery or lab. EID has not supplied those assets, so every slot is a
          labelled wireframe rather than a stock image. */}
      <section className="lg:pt-24 pt-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            <Wireframe label="Incoming inspection — lab photo pending from Uri" />
            <Wireframe label="In-process control — production floor photo pending from Uri" />
            <Wireframe label="Final QC — laboratory photo pending from Uri" />
            <Wireframe label="Certificate of analysis — document photo pending from Uri" />
            <Wireframe label="Retention samples — sample store photo pending from Uri" />
          </div>
        </div>
      </section>

      {/* MESH & MICRON QC + ISO 9001 */}
      <div className="bg-default-50">
        <div className="container pt-20">
          <ChapterMarker index="04" label="Mesh & Micron QC" />
        </div>
        <section className="lg:py-24 py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="border-t-2 border-primary pt-5">
                <div className="text-sm uppercase tracking-[0.2em] text-default-500">
                  Mesh &amp; micron QC in detail
                </div>
                <h3 className="mt-3 text-2xl">Mesh and micron QC in detail.</h3>
                <p className="mt-3 text-base text-default-600">
                  Grading and testing differ between mesh grit and micron powder, so each has its own
                  detail.{' '}
                  <Link href="/mesh-qc" className="text-primary underline underline-offset-2">
                    Mesh QC
                  </Link>{' '}
                  covers how we grade and verify grit sizing and shape factor.{' '}
                  <Link href="/micron-qc" className="text-primary underline underline-offset-2">
                    Micron QC
                  </Link>{' '}
                  covers particle-size-distribution measurement and the D-value control fine
                  polishing depends on.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* QC MACHINERY — Phase 2 build-out. The equipment is shown as page
          content because "we test everything" is a claim; naming the instrument
          that produces the number is the proof. */}
      <div className="container pt-20">
        <ChapterMarker index="05" label="QC Machinery" />
      </div>
      <section className="lg:py-24 py-16">
        <div className="container">
          <SectionHeading
            eyebrow="The laboratory"
            title="The instruments behind the numbers."
            desc="Every figure on a certificate of analysis comes off a named instrument, calibrated and logged. Photographs of the laboratory and the exact model designations are to be supplied by Uri before launch."
          />

          <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {machinery.map((m) => (
              <div key={m.title} className="border-t-2 border-primary pt-5">
                <div className="text-sm uppercase tracking-[0.2em] text-default-500">{m.meta}</div>
                <h3 className="mt-3 text-xl">{m.title}</h3>
                <p className="mt-3 text-base text-default-600">{m.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 font-mono text-sm text-default-500">
            Confirm exact instrument makes, models, and calibration intervals with Uri. Replace this
            block with photographs of the actual QC laboratory before launch.
          </p>
        </div>
      </section>

      {/* CERTIFICATES — shown as content, offered as downloads. This replaces the
          pattern of embedding one large PDF as the whole page. */}
      <div className="bg-default-50">
        <div className="container pt-20">
          <ChapterMarker index="06" label="Certificates & Downloads" />
        </div>
        <section className="lg:py-24 py-16">
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7">
                <SectionHeading
                  eyebrow="ISO 9001 certified"
                  title="A documented, audited, repeatable process."
                />
                <p className="mt-7 text-base text-default-600">
                  EID&apos;s quality management system is ISO 9001 certified, covering the full
                  process from incoming raw material inspection through manufacturing, testing,
                  packaging, and delivery. Certification means the process is documented, audited,
                  and repeatable, which is what stands behind every certificate of analysis we issue.
                </p>
                <p className="mt-5 font-mono text-sm text-default-500">
                  Certificate number, issuing body, and validity dates to be confirmed with Uri. The
                  scanned certificate is displayed here as an image with the PDF offered alongside
                  it.
                </p>
              </div>

              <div className="lg:col-span-5">
                {/* The deck is explicit that the ISO 9001 certificate is shown,
                    not just claimed. The scan is outstanding. */}
                <Wireframe label="ISO 9001 certificate — scan pending from Uri" ratio="portrait" />

                <div className="mt-10 border-t-2 border-primary pt-5">
                  <div className="text-sm uppercase tracking-[0.2em] text-default-500">Downloads</div>
                  <ul className="mt-4 space-y-3">
                    {[
                      'ISO 9001 certificate (PDF) — [awaiting file from Uri]',
                      'Sample certificate of analysis (PDF) — [awaiting file from Uri]',
                      'QC methods & test parameters summary (PDF) — [awaiting file from Uri]',
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5 text-base text-default-600">
                        <Icon icon="tabler:check" className="mt-1 size-5 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-col gap-3">
                    <p className="text-base">
                      <RichText>[All datasheets](/resources/datasheets)</RichText>
                    </p>
                    <p className="text-base">
                      <RichText>[Safety data sheets](/resources/msds)</RichText>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="pt-20">
        <QuoteSection
          eyebrow="Specify your tolerances"
          title="Request a quote with your QC specification."
          desc="Send us your grade and the QC parameters you need documented, and a real person replies within one business day. A certificate of analysis is available with the shipment."
        />
      </div>

      {/* CROSS-LINKS — the deck's Products / Detail / Support blocks */}
      <CrossLinks
        groups={[
          { title: 'Products', links: [{ label: 'Products overview', href: '/#products' }] },
          {
            title: 'Detail',
            links: [
              { label: 'Mesh QC', href: '/mesh-qc' },
              { label: 'Micron QC', href: '/micron-qc' },
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

export default QualityPage
