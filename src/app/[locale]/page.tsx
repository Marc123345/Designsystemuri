import GlobeSection from '@/components/GlobeSection'
import Marquee from '@/components/Marquee'
import QuoteForm from '@/components/QuoteForm'
import Hero from '@/components/home/Hero'
import TheProblem from '@/components/home/TheProblem'
import WhyEid from '@/components/home/WhyEid'
import { CardGrid, DarkFeatureList, Faq, TrustBar } from '@/components/sections'
import { SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { getApplications, getProducts, t } from '@/lib/i18n-content'
import { site, trustPoints } from '@/lib/site'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return { alternates: localeAlternates(locale, '/') }
}

// Vol 03 replaced the rotating three-slide hero with a single block.
const hero = {
  eyebrow: 'Industrial Diamond & CBN Solutions · Precision Manufactured & QC-Controlled',
  title: 'The full industrial diamond and CBN range, manufactured, processed, and graded in-house to EID standards.',
  desc: 'For over 50 years, EID has manufactured industrial diamond and CBN for tool makers worldwide. Every grade is processed and tested in our own laboratory, delivering consistent performance from batch to batch. One manufacturer, one specification, the complete superabrasive range.',
}

/**
 * FAQ — written for AI search and FAQPage rich results. Every answer is grounded
 * in the Vol 03 copy deck, and deliberately repeats the graduated production
 * claim rather than implying EID grows its own CVD or makes bonded powder from
 * raw. Needs Uri's sign-off before launch.
 */
const faqs = [
  {
    q: 'Do you resell or manufacture the diamonds yourselves?',
    a: 'Both, and we are specific about which is which. The natural range — grit, micron powder, rotary diamond and tool stones — is manufactured in-house: raw material is crushed, shaped, graded and QC-passed in our own factory. The synthetic ranges (metal bond, resin bond, CBN, PCD, PCBN, CVD and MCD) are produced to EID\u2019s specification by long-standing manufacturing partners, then processed, graded, coated and inspected through our facility before shipping. Across all of it, the specification and the QC pass are ours, and we will tell you which category any grade falls into before you order.',
  },
  {
    q: 'Where are you located, and where is the material made?',
    a: 'EID is based in London, England, at EID House, 12 St. Cross Street, EC1N 8UB. Natural diamond is manufactured here in our own factory. Synthetic grades are made to our specification at partner plants and then finished, graded and released through our London facility. We will confirm the country of origin for any specific grade on request, in writing, and all rough diamond is supplied through legitimate conflict-free sources under the Kimberley Process Certification Scheme.',
  },
  {
    q: 'Can you provide COAs, retention samples, ISO certificates and references?',
    a: 'Yes to all four. A certificate of analysis is available per lot on request. A retention sample is kept from every batch, so a question raised months later can be checked against the exact material that shipped. Our ISO 9001 certificate is available on request, as is the full traceability record from incoming raw material to shipped lot. Customer references can be arranged where the customer has agreed to act as one — tell us your application and we will point you at the closest match.',
  },
  {
    q: 'Are you ISO-registered, and do you have the documentation large companies require?',
    a: 'Yes. EID\u2019s quality management system is ISO 9001 certified, covering incoming raw material inspection, manufacturing, testing, packaging and delivery. The document set a procurement or quality department normally asks for is available: ISO 9001 certificate, certificate of analysis per lot, safety data sheets, technical datasheets, Kimberley Process compliance for natural rough, and lot-level traceability. If your supplier-approval pack asks for something not on that list, send it over and we will complete it.',
  },
  {
    q: 'Do you offer electroplated / electroplating diamonds?',
    a: 'Yes, and several grades are specified for it. In the natural range, NS-100-P and the MB series are recommended for electroplated tools. In CBN, EBN A and EBN AA are used in electroplated single-layer bonds. We also etch crystal surfaces specifically for electroplating, which improves nickel-to-diamond clamping in micro-engineering applications — that is covered on the [Surface Enhancements](/products/surface-enhancements) page and in the Polish, Etch & CRT datasheet.',
  },
  {
    q: 'Can I download product specifications as a PDF?',
    a: 'Yes, and they are ungated: no form, no login, no email address. Eighteen technical datasheets covering the full range are published under [Resources](/resources/datasheets), each with grades, descriptions, size charts and coating options, and each product page links straight to its own sheet. Safety data sheets for natural, synthetic and CBN materials are published the same way under [MSDS](/resources/msds). If the exact specification you need is not on a published sheet, ask us and we will send it.',
  },
  {
    q: 'What industries and applications do you serve?',
    a: 'We supply tool makers, not end users, so the material goes into your product. The main sectors are dental, semiconductor and advanced electronics, automotive and aerospace, tool and die, construction and stone, and optics. By operation, that means grinding, cutting, sawing and drilling; polishing and lapping; dressing and truing; and precision machining with PCD, PCBN, MCD and CVD single crystal. Tell us the material you are working and the finish you need and we will specify the grade.',
  },
  {
    q: 'Can you customise products and do the finishing in-house?',
    a: 'Yes. Standard grades ship from stock and custom specifications are made to order: custom mesh and micron sizing, shape factor to your requirement, and CVD single crystal grown to a specified orientation and face. Finishing is done in our own facility — electroless nickel and copper coating at 30%, 56%, 60% or any percentage you specify, metallic PVD coatings including Ti, TiC, TiN, TiCN, Si, Cu, Cr and Zr, surface polishing, etching for electroplating, and CRT crystal rounding for customised engineering applications.',
  },
  {
    q: 'Can you supply customers who feed into large OEMs such as Boeing or Rolls-Royce?',
    a: 'Yes — we supply tool makers whose tooling and components feed aerospace, automotive and energy programmes, and we are set up for the documentation those supply chains run on: ISO 9001, certificate of analysis per lot, retention samples, lot traceability from raw material to delivery, and safety data sheets. To be clear about what that does and does not mean: EID is approved as your supplier, not as a direct supplier to those OEMs, and any flow-down requirement in your own approval sits with you. Send us the requirement and we will tell you plainly whether we can meet it.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    // Strip the inline markdown links; the rich text is for the page, not the
    // structured data.
    acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') },
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
  'polishing-lapping': 'tabler:aperture',
}

// Home lists the hubs in the copy deck's order, which leads with the two
// highest-volume buyer types rather than the lib order used elsewhere.
const HOME_HUB_ORDER = ['dental', 'grinding-cutting-sawing-drilling', 'semiconductor-electronics', 'automotive-aerospace', 'tool-and-die', 'polishing-lapping']

const Home = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  const products = getProducts(locale)
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
      <Hero eyebrow={t(locale, hero.eyebrow)} title={t(locale, hero.title)} desc={t(locale, hero.desc)} />

      {/* Proof points as icon plus label. No sentences — a buyer is scanning
here, not reading. */}
      <TrustBar items={trustPoints} />

      {/* THE PROBLEM — states the cost in the buyer's own process parameters,
then answers it with the graduated production model rather than a
fourth restatement of "we control quality". */}
      <TheProblem
        eyebrow={t(locale, 'Why suppliers get replaced')}
        title={t(locale, 'The cost of inconsistent diamond')}
        lede={t(locale, 'When diamond varies between lots, tools vary with it, and the customer notices. Sourcing across several suppliers multiplies it: several specifications, several lead times, several definitions of acceptable.')}
        drivers={[
          {
            variable: t(locale, 'Particle size distribution'),
            effect: t(locale, 'Wheel wear rate and dressing interval shift, so a line tuned to the last lot stops running to the same cycle.'),
            evidence: t(locale, 'Particle size distribution — D50 and span curve'),
          },
          {
            variable: t(locale, 'Crystal shape and friability'),
            effect: t(locale, 'Cutting action changes. Grades that break down too slowly glaze; too quickly and tool life drops.'),
            evidence: t(locale, 'Crystal morphology — microscopy against the grade spec'),
          },
          {
            variable: t(locale, 'Coating weight and coverage'),
            effect: t(locale, 'Retention in the bond changes. In a sintered tool that shows up as pull-out and shortened instrument life.'),
            evidence: t(locale, 'Coating weight assay — target percentage per batch'),
          },
          {
            variable: t(locale, 'Lot-to-lot variance'),
            effect: t(locale, 'Every delivery has to be re-qualified before it goes near production, which is hours you had not planned.'),
            evidence: t(locale, 'Certificate of analysis — sample lot'),
          },
        ]}
        resolutionTitle={t(locale, 'EID removes the variable, and is specific about how.')}
        production={[
          {
            title: t(locale, 'Natural grit and powder'),
            body: t(locale, 'Manufactured entirely in-house at our own factory, from raw material through crushing, grading, and final QC.'),
          },
          {
            title: t(locale, 'Metal bond, resin bond and CBN'),
            body: t(locale, 'Produced to order, then processed and graded through our facility to your specification. Coating applied in-house rather than sourced from a second vendor.'),
          },
          {
            title: t(locale, 'CVD single crystal'),
            body: t(locale, "Grown to EID's exact specification, orientation, and quality standard through a dedicated growth partner, then finished and inspected by us."),
          },
        ]}
        resolutionClosing={t(locale, 'Across all three, the specification and the QC pass are ours. That is the part a tool maker is actually buying.')}
        primaryCta={{ label: t(locale, 'See how our QC works'), href: '/quality' }}
        secondaryCta={{ label: t(locale, 'Browse the Full Range'), href: '/#products' }}
      />

      {/* THE RANGE — anchor target for the hero's "Browse the Full Range". */}
      <div id="products" className="scroll-mt-28">
        <CardGrid
          eyebrow={t(locale, 'The range · eight product groups')}
          note="range"
          title={t(locale, 'Every industrial diamond and CBN product, from one source.')}
          desc={t(locale, 'Natural grit and powder made in our own factory, bonded and CBN grades processed and graded to your spec, and single crystal grown to your exact orientation.')}
          items={groupCards}
          ctaHref="/#products"
          ctaLabel={t(locale, 'Browse the Full Range')}
        />
      </div>

      {/* Pillar one carries the graduated production claim, which is the honesty
a technical buyer checks for before anything else on this page. */}
      <WhyEid
        eyebrow={t(locale, 'Why tool makers qualify EID')}
        title={t(locale, 'One accountable manufacturer, spec to delivery.')}
        pillars={[
          {
            meta: t(locale, 'Accountability'),
            title: t(locale, 'We control production, not just supply.'),
            body: t(locale, 'Natural grit and powder made in our own factory. Bonded and CBN grades processed and graded to your spec. CVD grown to order through a dedicated partner. The quality decision is always ours: one accountable manufacturer, spec to delivery.'),
            href: '/about',
            cta: t(locale, 'How we make it'),
          },
          {
            meta: t(locale, 'Consistency'),
            title: t(locale, 'The same material, every reorder.'),
            body: t(locale, 'Every run is measured for particle size distribution and morphology, with crystal strength and coating coverage checked where the grade calls for it. ISO 9001, certificate of analysis per lot. Order the same grade twice, get the same grade twice.'),
            href: '/quality',
            cta: t(locale, 'See how our QC works'),
          },
          {
            meta: t(locale, 'Breadth'),
            title: t(locale, 'The full range, one relationship.'),
            body: t(locale, 'Every diamond and CBN product from one supplier: one contact, one quality standard. Standard grades from stock, specials to your lead time.'),
            href: '/#products',
            cta: t(locale, 'Browse the range'),
          },
        ]}
      />

      {/* Six hubs → 3-across, two rows, with the larger card treatment. */}
      <CardGrid
        eyebrow={t(locale, 'Applications · six hubs')}
        note="applications"
        title={t(locale, 'Diamond and CBN for the work your tools do.')}
        desc={t(locale, 'We supply the material. You build the tools that serve these applications.')}
        items={hubCards}
        ctaHref="/applications"
        ctaLabel={t(locale, 'View All Applications')}
        columns={3}
      />

      <DarkFeatureList
        bgLabel="Background image — QC laboratory, London"
        eyebrow={t(locale, 'Quality')}
        title={t(locale, 'Every production run is tested before it leaves.')}
        desc={t(
          locale,
          'Consistency is a process, and ours runs on measurement. Each lot is tested in our QC laboratory for particle size distribution and morphology, with crystal strength and coating coverage checked where the grade requires it. We test the run and record the result rather than sampling and assuming. ISO 9001 certified, with full traceability from incoming raw material to shipped lot.'
        )}
        ctaLabel={t(locale, 'See how our QC works')}
        ctaHref="/quality"
        features={[
          {
            title: t(locale, 'Particle size distribution'),
            desc: t(locale, 'Graded and verified for tight D50 and span, with outliers controlled, on every lot.'),
          },
          {
            title: t(locale, 'Crystal morphology'),
            desc: t(locale, 'Inspected on every lot, with shape factor on mesh grades.'),
          },
          {
            title: t(locale, 'Coating weight & coverage'),
            desc: t(locale, 'Every coated batch checked for target weight and uniform coverage.'),
          },
          {
            title: t(locale, 'ISO 9001 & traceability'),
            desc: t(locale, 'Certificate of analysis and retention samples available for every lot.'),
          },
        ]}
      />

      {/* Material vocabulary rather than a logo wall — the deck names customers
only as buyer types, so a wall of client logos would claim
endorsements EID has not given us. */}
      <Marquee
        items={[
          t(locale, 'ISO 9001'),
          t(locale, 'Natural Diamond Grit'),
          t(locale, 'Micron Powder'),
          t(locale, 'CBN'),
          t(locale, 'PCBN'),
          t(locale, 'CVD Single Crystal'),
          t(locale, 'MCD'),
          t(locale, 'PCD Blanks'),
          t(locale, 'Metal Bond'),
          t(locale, 'Resin Bond'),
          t(locale, 'Coated in-house'),
          t(locale, 'Made in London'),
        ]}
      />

      {/* REACH — the one-facility-worldwide story made visible: an animated globe
with London as the hub and arcs out to the markets EID ships to. */}
      <GlobeSection />

      {/* The conversion block is the form itself, not a button that defers to
          /contact. A buyer who has read this far should not have to load
another page to ask a question. */}
      <section className="py-20 lg:py-30">
        <div className="container">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={t(locale, 'Tell us what you need')}
                title={t(locale, 'Tell us the grade you need. A real person replies within one business day.')}
                desc={t(locale, 'Request a quote, order a sample, or ask a technical question. One form, routed to someone who works with the material.')}
              />

              <div className="text-default-600 mt-8 space-y-3 text-base">
                <p>
                  {t(locale, 'Email')}{' '}
                  <a href={`mailto:${site.email}`} className="text-primary underline">
                    {site.email}
                  </a>
                </p>
                <p>
                  {t(locale, 'Call')}{' '}
                  <a href={site.phoneHref} className="text-primary underline">
                    {site.phone}
                  </a>
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-default-200 bg-default-50 border p-6 lg:p-10">
                <QuoteForm formTitle={t(locale, 'Request a Quote')} formDesc={t(locale, 'Tell us the product, grade, size, and quantity you need. A specialist who understands the material replies within one business day.')} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ sits below the conversion CTA, per the deck: it is written for AI
search and rich results rather than to be read on the way down. */}
      <Faq
        eyebrow={t(locale, 'Frequently asked')}
        title={t(locale, 'Straight answers about the material.')}
        desc={t(locale, 'The questions technical buyers ask before they qualify a superabrasive supplier. If yours is not here, ask us and someone who works with the material will answer.')}
        items={faqs.map((f) => ({ q: t(locale, f.q), a: t(locale, f.a) }))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

export default Home
