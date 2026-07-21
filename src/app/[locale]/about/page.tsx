import { BannerCTA, DarkFeatureList, FeaturesRow, PageHero, StatsBar } from '@/components/sections'
import { ArrowButton, ChapterMarker, SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { site } from '@/lib/site'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'About EID | Industrial Diamond Manufacturer, London' },
    description:
      'EID has manufactured and quality-controlled the full industrial diamond and CBN range from London for over 50 years, supplying tool makers worldwide.',
    alternates: localeAlternates(locale, '/about'),
  }
}

// The company story, told in the same four-paragraph order as the copy deck:
// what EID is, what customers buy, the experience behind it, and why that is
// different from a distributor.
const companyParagraphs = [
  'EID Ltd is a London-based manufacturer and finisher of industrial diamond and superabrasive materials. For more than fifty years we have supplied the full diamond and CBN range, meaning grit, powder, and crystal, to tool manufacturers and precision-parts producers worldwide.',
  'We manufacture the materials inside tools. Customers choose EID for metal bond powder, oriented CVD crystals, and consistent CBN that matches previous orders.',
  'Decades of experience supporting these industries have built our technical understanding of production environments.',
  'That track record is also what separates us from a distributor. We control the production and the quality decision, and we cover the whole range from one facility, so our customers manage one relationship instead of five.',
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
        secondaryCta={{ label: 'View Products', href: '/products' }}
      />

      <StatsBar
        items={[
          { value: '50+', label: "Years' experience" },
          { value: '8', label: 'Product groups' },
          { value: '12', label: 'Product lines' },
          { value: '100%', label: 'Batches QC-tested' },
        ]}
      />

      <div className="container pt-20">
        <ChapterMarker index="01" label="The Company" />
      </div>
      <section className="lg:py-30 py-20 pt-14">
        <div className="container">
          <SectionHeading
            eyebrow="London-based superabrasive manufacturer"
            title="Over 50 years making the material that goes into the world's diamond tools."
          />

          <div className="mt-14 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-5">
              {companyParagraphs.map((p) => (
                <p key={p} className="text-base text-default-600">
                  {p}
                </p>
              ))}
            </div>
            <div className="lg:col-span-5 divide-y divide-default-200 border-t border-default-200">
              {companyFeatures.map((feature) => (
                <div key={feature.title} className="py-6">
                  <h3 className="text-lg">{feature.title}</h3>
                  <p className="mt-1.5 text-base text-default-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE MAKE IT — the honest, graduated production model */}
      <div className="container pb-14">
        <ChapterMarker index="02" label="How We Make It" />
      </div>
      <FeaturesRow
        items={[
          {
            title: 'Natural grit & powder',
            desc: 'Manufactured entirely in-house, from raw material through crushing, grading, and final QC.',
            href: '/products/natural-grit-powder#grit',
          },
          {
            title: 'CVD single crystal',
            desc: "Grown to EID's exact specification and orientation through a dedicated growth partner, finished and inspected by us.",
            href: '/products/single-crystal#cvd',
          },
          {
            title: 'Bonded & CBN',
            desc: 'Produced to order, then re-processed and QC-upgraded through our facility to your spec.',
            href: '/products/metal-bond',
          },
          {
            title: 'Coating in-house',
            desc: 'Nickel, copper, and titanium coatings applied in-house rather than sourced from a second vendor.',
            href: '/products/metal-bond',
          },
        ]}
      />
      <section className="lg:py-24 py-16">
        <div className="container">
          <p className="max-w-[860px] text-base text-default-600">
            Across all three, the specification and the QC pass are ours. That is the part a tool
            maker is actually buying.
          </p>
        </div>
      </section>

      <div className="container pb-14">
        <ChapterMarker index="03" label="Quality" />
      </div>
      <DarkFeatureList
        eyebrow="Consistency, measured on every run"
        title="When you re-order a grade, you get the grade you qualified."
        desc="Our QC laboratory tests every production run for particle size distribution, crystal strength, morphology, and coating coverage. ISO 9001 certified, with a certificate of analysis available for each lot."
        features={[
          {
            title: 'In-house QC laboratory',
            desc: 'The backbone of everything we ship, not an afterthought.',
          },
          {
            title: 'Tested every batch',
            desc: 'Size distribution, crystal strength, morphology, coating coverage.',
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
      <section className="lg:py-30 py-20 pt-14">
        <div className="container">
          <SectionHeading
            eyebrow="Trusted by tool makers across industries and continents"
            title="We supply the manufacturers who convert diamond and CBN into finished tools."
          />
          <p className="mt-8 max-w-[860px] text-base text-default-600">
            Our customers include diamond and CBN grinding and dressing tool makers, dental bur and
            rotary instrument producers, ultra-precision tool makers for optics and watch components,
            and flexible-abrasive manufacturers for glass and stone. We supply them across Europe,
            Asia, the Americas, and the Middle East, with the material behind dental, optics and
            precision, automotive and aerospace, tool and die, stone and glass, and electronics
            applications.
          </p>
          <div className="mt-9">
            <ArrowButton href="/contact" label="Contact Us" />
          </div>
        </div>
      </section>

      {/* COMPANY DETAILS — reinforce that EID is a physical manufacturer */}
      <section className="border-t border-default-200 lg:py-24 py-16">
        <div className="container">
          <SectionHeading eyebrow="Company details" title={site.name} />
          <p className="mt-8 text-base text-default-600">
            {site.address}
            <br />
            Tel: {site.phone} · Fax: {site.fax} ·{' '}
            <a href={`mailto:${site.email}`} className="text-primary underline">
              {site.email}
            </a>
          </p>
        </div>
      </section>

      <div className="pt-20">
        <BannerCTA
          eyebrow="Trusted by tool makers across continents"
          title="Let's talk about what you manufacture."
          desc="Request a quote, order a sample, or ask a technical question. A real person replies within one business day."
          ctaLabel="Contact Us"
          ctaHref="/contact"
        />
      </div>
    </>
  )
}

export default AboutPage
