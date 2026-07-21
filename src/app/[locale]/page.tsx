import Marquee from '@/components/Marquee'
import QuoteForm from '@/components/QuoteForm'
import Hero from '@/components/home/Hero'
import TheProblem from '@/components/home/TheProblem'
import WhyEid from '@/components/home/WhyEid'
import { CardGrid, DarkFeatureList, Faq, TrustBar } from '@/components/sections'
import { SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { getApplications, getProducts } from '@/lib/i18n-content'
import { site, trustPoints } from '@/lib/site'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return { alternates: localeAlternates(locale, '/') }
}

// Vol 03 replaced the rotating three-slide hero with a single block.
const hero = {
  eyebrow: 'Industrial Diamond & CBN Solutions · Precision Manufactured & QC-Controlled',
  title:
    'The full industrial diamond and CBN range, manufactured, processed, and graded in-house to EID standards.',
  desc: 'EID manufactures industrial diamond and CBN for tool makers worldwide, plus CBN for the hardened and ferrous work diamond cannot do. Every grade is processed and tested in our own laboratory, so the material you reorder matches the run before it. One manufacturer, one specification, the whole range.',
}

/**
 * FAQ — written for AI search and FAQPage rich results. Every answer is grounded
 * in the Vol 03 copy deck, and deliberately repeats the graduated production
 * claim rather than implying EID grows its own CVD or makes bonded powder from
 * raw. Needs Uri's sign-off before launch.
 */
const faqs = [
  {
    q: 'What does EID manufacture?',
    a: 'EID supplies the complete industrial diamond and CBN range across eight product groups: natural diamond grit and micron powder, metal bond diamond, resin bond diamond, CBN and PCBN, CVD single crystal and MCD, PCD blanks and CVD dressing logs, natural tool stones, and polycrystalline diamond powder. We supply tool makers, not end users: the material goes into your saws, wheels, burs, inserts, and dressing tools.',
  },
  {
    q: 'Does EID manufacture the material, or resell it?',
    a: 'It depends on the product, and we are specific about which is which. Natural grit and powder are manufactured entirely in-house at our own factory, from raw material through crushing, grading, and final QC. Metal bond, resin bond, and CBN grades are produced to order, then processed, graded, and coated through our facility to your specification. CVD single crystal is grown to EID’s specification and orientation through a dedicated growth partner, then finished and inspected by us. Across all three, the specification and the QC pass are ours.',
  },
  {
    q: 'When should I use CBN instead of diamond?',
    a: 'Use diamond for non-ferrous and non-metallic materials such as stone, glass, ceramics, carbide, and composites. Use CBN for ferrous materials such as hardened steel, cast iron, superalloys, and high-speed steel. Diamond is the harder material, but it reacts chemically with iron at grinding temperatures and wears quickly, so for gears, bearings, crankshafts, and camshafts, CBN is the practical choice.',
  },
  {
    q: 'What is the difference between PCD and PCBN?',
    a: 'Both are sintered blanks for cutting-tool inserts, and the split follows the same ferrous rule. PCD (polycrystalline diamond) machines non-ferrous and abrasive materials: aluminium, copper and brass, composites, wood-based panels, and abrasive plastics. PCBN (polycrystalline cubic boron nitride) machines hardened ferrous parts above roughly 45 HRC, cast iron, powder-metallurgy parts, and superalloys. Do not run PCD on ferrous material.',
  },
  {
    q: 'Is EID ISO 9001 certified?',
    a: 'Yes. EID’s quality management system is ISO 9001 certified, covering the full process from incoming raw material inspection through manufacturing, testing, packaging, and delivery. A certificate of analysis is available per lot on request, and a retention sample is kept from every batch so any later question can be checked against the exact material that shipped.',
  },
  {
    q: 'How do you keep grades consistent between orders?',
    a: 'Every production run is tested in our own QC laboratory before it ships. We measure particle size distribution (D10, D50, D90, and span, with outliers controlled) and crystal morphology on every lot, with shape factor on mesh grades, coating weight and coverage on every coated batch, and crystal strength where the grade or the application requires it. The point is that the grade you qualify is the grade you receive, because your own production is tuned to it.',
  },
  {
    q: 'Can I order a sample before committing to a production quantity?',
    a: 'Yes. Samples are available for any grade so you can validate the material in your own process before scheduling supply. Tell us the product, grade, size, and the application, and a technical specialist will confirm what to send.',
  },
  {
    q: 'Do you supply custom grades and sizes?',
    a: 'Yes. Standard grades ship from stock and custom specifications are made to order, including custom mesh and micron sizing, coating type and weight, CVD single crystal grown to a specified orientation and face, and PCD, PCBN, and CVD log dimensions to drawing. If you are not sure of the exact grade, give us the material you are working and the finish you need and we will specify it.',
  },
  {
    q: 'Are your datasheets and safety data sheets free to download?',
    a: 'Yes, and they are ungated: no form and no login. Technical datasheets for every product and safety data sheets for every material family are published under Resources as page content with a downloadable PDF alongside. If the exact specification you need is not listed, ask us and we will send it.',
  },
  {
    q: 'Where is EID based, and where do you ship?',
    a: 'EID is based in London, England, at EID House, 12 St. Cross Street, EC1N 8UB. We supply tool makers across Europe, Asia, the Americas, and the Middle East. You can reach us by email at info@eid-ltd.com, by phone on +44 (0) 207 405 6594, or on WhatsApp, which is shared across the sales team so replies are not blocked on one person.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// The eight locked product groups as home cards.
const familyIcon: Record<string, string> = {
  'Natural Diamond Grit & Powder': 'tabler:diamond',
  'Metal Bond Diamond': 'tabler:blade',
  'Resin Bond Diamond': 'tabler:stack-2',
  CBN: 'tabler:gauge',
  'Single Crystal Diamond (CVD & MCD)': 'tabler:cube',
  'Polycrystalline Diamond (CVD & PCD)': 'tabler:grid-dots',
  'Natural Tool Stones': 'tabler:mountain',
  'Polycrystalline Diamond Powder': 'tabler:bolt',
}

// The six application hubs as home cards.
const hubIcon: Record<string, string> = {
  dental: 'tabler:dental',
  'semiconductor-electronics': 'tabler:cpu',
  'automotive-aerospace': 'tabler:engine',
  'tool-and-die': 'tabler:tools',
  'grinding-cutting-sawing-drilling': 'tabler:blade',
  'polishing-lapping': 'tabler:lens',
}

// Home lists the hubs in the copy deck's order, which leads with the two
// highest-volume buyer types rather than the lib order used elsewhere.
const HOME_HUB_ORDER = [
  'dental',
  'grinding-cutting-sawing-drilling',
  'semiconductor-electronics',
  'automotive-aerospace',
  'tool-and-die',
  'polishing-lapping',
]

const Home = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  const products = getProducts(locale)
  const productOptions = ['Help me specify', ...products.map((p) => p.name)]
  const apps = getApplications(locale)

  const groupCards = products.map((p) => ({
    icon: familyIcon[p.family] || 'tabler:diamond',
    title: p.name,
    desc: p.cardDesc,
    href: `/products/${p.slug}`,
  }))

  const hubCards = HOME_HUB_ORDER.map((slug) => apps.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .map((a) => ({
      icon: hubIcon[a.slug] || 'tabler:diamond',
      title: a.name,
      desc: a.cardDesc,
      href: `/applications/${a.slug}`,
    }))

  return (
    <>
      <Hero eyebrow={hero.eyebrow} title={hero.title} desc={hero.desc} />

      {/* Proof points as icon plus label. No sentences — a buyer is scanning
          here, not reading. */}
      <TrustBar items={trustPoints} />

      {/* THE PROBLEM — names the buyer's real cost before any product copy. */}
      <TheProblem
        eyebrow="Why suppliers get replaced"
        title="The cost of inconsistent diamond"
        lede="When diamond varies between lots, tools vary with it, and the customer notices. Sourcing across several suppliers multiplies that risk: several specifications, several lead times, several definitions of acceptable, each mismatch paid for in rejects and re-set machines."
        closing="EID removes the variable. One manufacturer covers the full diamond and CBN range, every grade verified in the same QC laboratory before it ships. The grade you qualify is the grade you reorder."
        imageLabel="Factory / production floor — London"
        primaryCta={{ label: 'See how our QC works', href: '/quality' }}
        secondaryCta={{ label: 'Browse the Full Range', href: '/#products' }}
      />

      {/* THE RANGE — anchor target for the hero's "Browse the Full Range". */}
      <div id="products" className="scroll-mt-28">
        <CardGrid
          eyebrow="The range · eight product groups"
          title="Every industrial diamond and CBN product, from one source."
          desc="Natural grit and powder made in our own factory, bonded and CBN grades processed and graded to your spec, and single crystal grown to your exact orientation."
          items={groupCards}
          ctaHref="/#products"
          ctaLabel="Browse the Full Range"
        />
      </div>

      {/* Pillar one carries the graduated production claim, which is the honesty
          a technical buyer checks for before anything else on this page. */}
      <WhyEid
        eyebrow="Why tool makers qualify EID"
        title="One accountable manufacturer, spec to delivery."
        pillars={[
          {
            meta: 'Accountability',
            title: 'We control production, not just supply.',
            body: 'Natural grit and powder made in our own factory. Bonded and CBN grades processed and graded to your spec. CVD grown to order through a dedicated partner. The quality decision is always ours: one accountable manufacturer, spec to delivery.',
            href: '/about',
            cta: 'How we make it',
          },
          {
            meta: 'Consistency',
            title: 'The same material, every reorder.',
            body: 'Every run is measured for particle size distribution and morphology, with crystal strength and coating coverage checked where the grade calls for it. ISO 9001, certificate of analysis per lot. Order the same grade twice, get the same grade twice.',
            href: '/quality',
            cta: 'See how our QC works',
          },
          {
            meta: 'Breadth',
            title: 'The full range, one relationship.',
            body: 'Every diamond and CBN product from one supplier: one contact, one quality standard. Standard grades from stock, specials to your lead time.',
            href: '/#products',
            cta: 'Browse the range',
          },
        ]}
      />

      {/* Six hubs → 3-across, two rows, with the larger card treatment. */}
      <CardGrid
        eyebrow="Applications · six hubs"
        title="Diamond and CBN for the work your tools do."
        desc="We supply the material. You build the tools that serve these applications."
        items={hubCards}
        ctaHref="/applications"
        ctaLabel="View All Applications"
        columns={3}
      />

      <DarkFeatureList
          bgLabel="Background image — QC laboratory, London"
        eyebrow="Quality"
        title="Every production run is tested before it leaves."
        desc="Consistency is a process, and ours runs on measurement. Each lot is tested in our QC laboratory for particle size distribution and morphology, with crystal strength and coating coverage checked where the grade requires it. We test the run and record the result rather than sampling and assuming. ISO 9001 certified, with full traceability from incoming raw material to shipped lot."
        ctaLabel="See how our QC works"
        ctaHref="/quality"
        features={[
          {
            title: 'Particle size distribution',
            desc: 'Graded and verified for tight D50 and span, with outliers controlled, on every lot.',
          },
          {
            title: 'Crystal morphology',
            desc: 'Inspected on every lot, with shape factor on mesh grades.',
          },
          {
            title: 'Coating weight & coverage',
            desc: 'Every coated batch checked for target weight and uniform coverage.',
          },
          {
            title: 'ISO 9001 & traceability',
            desc: 'Certificate of analysis and retention samples available for every lot.',
          },
        ]}
      />

      {/* Material vocabulary rather than a logo wall — the deck names customers
          only as buyer types, so a wall of client logos would claim
          endorsements EID has not given us. */}
      <Marquee
        items={[
          'ISO 9001',
          'Natural Diamond Grit',
          'Micron Powder',
          'CBN',
          'PCBN',
          'CVD Single Crystal',
          'MCD',
          'PCD Blanks',
          'Metal Bond',
          'Resin Bond',
          'Coated in-house',
          'Made in London',
        ]}
      />

      {/* The conversion block is the form itself, not a button that defers to
          /contact. A buyer who has read this far should not have to load
          another page to ask a question. */}
      <section className="lg:py-30 py-20">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Tell us what you need"
                title="Tell us the grade you need. A real person replies within one business day."
                desc="Request a quote, order a sample, or ask a technical question. One form, routed to someone who works with the material."
              />

              <div className="mt-8 space-y-3 text-base text-default-600">
                <p>
                  Email{' '}
                  <a href={`mailto:${site.email}`} className="text-primary underline">
                    {site.email}
                  </a>
                </p>
                <p>
                  Call{' '}
                  <a href={site.phoneHref} className="text-primary underline">
                    {site.phone}
                  </a>
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-md border border-default-200 bg-default-50 p-6 lg:p-10">
                <QuoteForm
                  formTitle="Request a Quote"
                  formDesc="Tell us the product, grade, size, and quantity you need. A specialist who understands the material replies within one business day."
                  productOptions={productOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ sits below the conversion CTA, per the deck: it is written for AI
          search and rich results rather than to be read on the way down. */}
      <Faq
        eyebrow="Frequently asked"
        title="Straight answers about the material."
        desc="The questions technical buyers ask before they qualify a superabrasive supplier. If yours is not here, ask us and someone who works with the material will answer."
        items={faqs}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

export default Home
