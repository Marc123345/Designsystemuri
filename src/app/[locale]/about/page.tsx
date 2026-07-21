import { QuoteSection, DarkFeatureList, FeaturesRow, PageHero, StatsBar } from '@/components/sections'
import { ArrowButton, ChapterMarker, SectionHeading } from '@/components/ui'
import Wireframe from '@/components/Wireframe'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { site } from '@/lib/site'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'About EID | Industrial Diamond Manufacturer, London' },
    description: 'EID has manufactured and quality-controlled the full industrial diamond and CBN range from London for over 50 years, supplying tool makers worldwide.',
    alternates: localeAlternates(locale, '/about'),
  }
}

// The company story, told in the same four-paragraph order as the copy deck:
// what EID is, what customers buy, the experience behind it, and why that is
// different from a distributor.
const companyParagraphs = [
  'EID Ltd is a London-based manufacturer and finisher of industrial diamond and superabrasives. For over fifty years we have supplied the full diamond and CBN range, covering grit, powder, and crystal products, to tool manufacturers and precision-parts producers worldwide.',
  'We make the material inside the tools, not the finished tools. A dental bur maker who needs metal bond powder that sinters the same way each run, an optics company that needs a CVD single crystal grown to a set orientation, a grinding wheel maker who needs CBN that matches the last order: they come to EID. Decades of supporting the same customers have built the consistency and technical understanding a production environment needs.',
  'That record is what separates us from a distributor. We control production and the quality decision, and we cover the whole range from one facility, so our customers manage one relationship instead of five.',
]

const companyFeatures = [
  {
    title: 'Manufacturer, not distributor',
    desc: 'We control the production and the quality decision. The specification and the QC pass are ours.',
  },
  {
    title: 'Full range, one facility',
    desc: 'Grit, powder, and crystal, all quality-controlled in-house.',
  },
  {
    title: 'Over 50 years',
    desc: 'Half a century supplying the same kinds of tool makers, order after order.',
  },
]

const AboutPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow="Over 50 years · the full range · made and graded in-house"
        title="About EID — Industrial Diamond Manufacturer"
        desc="EID has manufactured and quality-controlled the full industrial diamond and CBN range from London for over 50 years, supplying tool makers worldwide."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        primaryCta={{ label: 'Request a Quote', href: '/contact' }}
        secondaryCta={{ label: 'View Products', href: '/#products' }}
      />

      <StatsBar
        items={[
          { value: '50+', label: "Years' experience" },
          { value: '8', label: 'Product groups' },
          { value: '12', label: 'Product lines' },
          { value: '100%', label: 'Lots QC-tested' },
        ]}
      />

      <div className="container pt-20">
        <ChapterMarker index="01" label="The Company" />
      </div>
      <section className="py-20 pt-14 lg:py-30">
        <div className="container">
          <SectionHeading eyebrow="London-based superabrasive manufacturer" title="Over 50 years making the material that goes into the world's diamond tools." />

          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-7">
              {companyParagraphs.map((p) => (
                <p key={p} className="text-default-600 text-base">
                  {p}
                </p>
              ))}
            </div>
            <div className="divide-default-200 border-default-200 divide-y border-t lg:col-span-5">
              {companyFeatures.map((feature) => (
                <div key={feature.title} className="py-6">
                  <h3 className="text-lg">{feature.title}</h3>
                  <p className="text-default-600 mt-1.5 text-base">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <Wireframe label="EID production floor, London — crushing and grading of natural diamond grit" ratio="wide" />
          </div>
        </div>
      </section>

      {/* HOW WE MAKE IT — the honest, graduated production model */}
      <div className="container pb-14">
        <ChapterMarker index="02" label="How We Make It" />
      </div>
      <section className="pb-14">
        <div className="container">
          <SectionHeading eyebrow="Our production model, stated straight" title="How we make what we sell." />
        </div>
      </section>
      <FeaturesRow
        items={[
          {
            title: 'Natural grit & powder',
            desc: 'Natural grit and powder are manufactured entirely in-house at our own factory, from raw material through crushing, grading, and final QC.',
            href: '/products/natural-grit-powder#grit',
          },
          {
            title: 'CVD single crystal',
            desc: "CVD single crystal diamond is grown to EID's exact specification, orientation, and quality standard through a dedicated growth partner, then finished and inspected by us.",
            href: '/products/single-crystal#cvd',
          },
          {
            title: 'Metal bond, resin bond & CBN',
            desc: 'Metal bond, resin bond, and CBN grades are produced to order, then processed and graded through our facility to your specification before shipping. Coating, where you need it, is applied in-house rather than sourced from a second vendor.',
            href: '/products/metal-bond',
          },
        ]}
      />
      <section className="py-16 lg:py-24">
        <div className="container">
          <p className="text-default-600 max-w-[860px] text-base">Across all three, the specification and the QC pass are ours. That is the part a tool maker is actually buying.</p>
        </div>
      </section>

      <div className="container pb-14">
        <ChapterMarker index="03" label="Quality" />
      </div>
      <section className="pb-14">
        <div className="container">
          <Wireframe label="EID in-house QC laboratory — particle size distribution and morphology testing" ratio="wide" />
        </div>
      </section>
      <DarkFeatureList
          bgLabel="Background image — production floor, London"
        eyebrow="Quality & certification"
        title="Consistency, measured on every run."
        desc="Our QC laboratory tests every production lot for particle size distribution and morphology, with additional testing such as crystal strength and coating coverage performed where required."
        features={[
          {
            title: 'In-house QC laboratory',
            desc: 'The backbone of everything we ship, not an afterthought.',
          },
          {
            title: 'Every production lot',
            desc: 'Particle size distribution and morphology on every lot, with crystal strength and coating coverage where required.',
          },
          {
            title: 'Full traceability',
            desc: 'Documented from raw material through QC to delivery.',
          },
          {
            title: 'ISO 9001 certified',
            desc: 'Covering production, QC, and the full supply chain.',
          },
        ]}
        ctaLabel="See how our QC works"
        ctaHref="/quality"
      />

      {/* WHO WE SERVE — real buyer types and regions, no unverified figures */}
      <div className="container pt-20">
        <ChapterMarker index="04" label="Who We Serve" />
      </div>
      <section className="py-20 pt-14 lg:py-30">
        <div className="container">
          <SectionHeading eyebrow="Who we serve" title="Trusted by tool makers across industries and continents." />
          <p className="text-default-600 mt-8 max-w-[860px] text-base">
            Our customers convert raw diamond and CBN into finished tools: diamond and CBN grinding and dressing tool makers, dental bur and rotary instrument producers, ultra-precision tool makers for optics and watch components, and flexible-abrasive manufacturers for glass and
            stone. We supply them across Europe, the Middle East, Asia, the Americas, and beyond, with the material behind dental, optics and precision components, automotive and aerospace, tool and die, stone and glass, and electronics applications.
          </p>
          <div className="mt-9">
            <ArrowButton href="/contact" label="Contact Us" />
          </div>
        </div>
      </section>

      {/* COMPANY DETAILS — reinforce that EID is a physical manufacturer */}
      <section className="border-default-200 border-t py-16 lg:py-24">
        <div className="container">
          <SectionHeading eyebrow="Company details" title={site.name} />
          <p className="text-default-600 mt-8 text-base">
            EID House, 12 St. Cross Street, London, EC1N 8UB, England
            <br />
            Tel: {site.phone} ·{' '}
            <a href={`mailto:${site.email}`} className="text-primary underline">
              {site.email}
            </a>
          </p>
        </div>
      </section>

      <div className="pt-20">
        <QuoteSection
          eyebrow="Trusted by tool makers across continents"
          title="Let's talk about what you manufacture."
          desc="Request a quote, order a sample, or ask a technical question. A real person replies within one business day."
        />
      </div>
    </>
  )
}

export default AboutPage
