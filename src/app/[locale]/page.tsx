import GlobeSection from '@/components/GlobeSection'
import Marquee from '@/components/Marquee'
import ContactStrip from '@/components/home/ContactStrip'
import Hero from '@/components/home/Hero'
import ProofPanel from '@/components/home/ProofPanel'
import QcBanner from '@/components/home/QcBanner'
import CurtainGrid from '@/components/CurtainGrid'
import { ArrowButton } from '@/components/ui'
import { Faq } from '@/components/sections'
import type { Locale } from '@/i18n/routing'
import { applicationImage, productImage } from '@/lib/card-media'
import { localeAlternates } from '@/lib/hreflang'
import { getApplications, getProducts, t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return { alternates: localeAlternates(locale, '/') }
}

/**
 * The hero line.
 *
 * The headline is Uri's, verbatim from the feedback document, and stays that
 * way: it leads with the manufacturing and the date, which is what a buyer
 * qualifying a superabrasive supplier is actually checking for. (The line
 * before it — "The full industrial diamond & CBN range, made and graded
 * in-house." — led with the range instead.)
 *
 * ⚠ The supporting line is NOT verbatim any more, and needs Uri's sign-off
 * before launch, same as the two open FAQ answers. Two things changed:
 *
 *  1. Sentence case. His line was Title Cased On Every Word — "A Complete Range
 *     of Diamond & CBN Products. Precision Engineered and QC-Controlled to Your
 *     Specification." Every other line on the site is sentence case, so the
 *     hero was the one place the writing changed voice, and Title Case reads as
 *     brochure caption rather than as something a person said. All three of his
 *     substantive claims survive intact: the complete range, precision
 *     engineered, QC-controlled to your specification.
 *
 *  2. Who it is for. "We supply tool makers, not end users" is the sharpest
 *     qualifier EID has and it was buried in the fifth FAQ answer. In the hero
 *     it turns away the wrong enquiries in one second and tells the right buyer
 *     the site is aimed at them. The words are lifted from that FAQ answer
 *     rather than newly written, so nothing here is a claim EID has not already
 *     made in its own voice.
 */
const hero = {
  title: 'Industrial Diamond — Manufactured In-House Since 1970',
  desc: 'The complete range of diamond and CBN products, precision engineered and QC-controlled to your specification. We supply tool makers, not end users.',
}

/**
 * FAQ — written for AI search and FAQPage rich results.
 *
 * Two questions came out on Uri's pass, for the same commercial reason. The
 * first ("do you resell or manufacture") and the second ("where is the material
 * made") both answered by naming the synthetic ranges as made at partner
 * plants — which hands a buyer the idea of skipping EID and sourcing direct.
 * That framing is now gone from this page and from every other page on the
 * site; what remains is what EID does to the material and stands behind: the
 * specification, the processing, the coating, the grading and the QC pass.
 *
 * The two ISO/documentation questions were near-duplicates of each other —
 * "can you provide COAs, retention samples, ISO certificates and references"
 * and "are you ISO-registered, and do you have the documentation large
 * companies require" are the same question asked twice — so they are merged
 * into one answer that covers the whole document set.
 *
 * ⚠ Still needs Uri's sign-off before launch.
 */
const faqs = [
  {
    q: 'Where are you based, and what does EID do to the material?',
    a: 'EID is based in London, England, at EID House, 12 St. Cross Street, EC1N 8UB, and has manufactured industrial diamond since 1970. Natural diamond grit, micron powder, rotary diamond and tool stones are manufactured in our own factory: raw material is crushed, shaped, graded and QC-passed here. Across the rest of the range — metal bond, resin bond, CBN, PCD, PCBN, CVD and MCD — the specification is ours, and the material is processed, coated, graded and inspected through our facility before it ships. All rough diamond is supplied through legitimate conflict-free sources under the Kimberley Process Certification Scheme.',
  },
  {
    q: 'Are you ISO-registered, and can you supply COAs, retention samples and references?',
    a: 'Yes to all of it. EID’s quality management system is ISO 9001 certified, covering incoming raw material inspection, manufacturing, testing, packaging and delivery. A certificate of analysis is available per lot on request, and a retention sample is kept from every batch, so a question raised months later can be checked against the exact material that shipped. The document set a procurement or quality department normally asks for is available: ISO 9001 certificate, COA per lot, safety data sheets, technical datasheets, Kimberley Process compliance for natural rough, and lot-level traceability from incoming raw material to shipped lot. Customer references can be arranged where the customer has agreed to act as one — tell us your application and we will point you at the closest match. If your supplier-approval pack asks for something not on that list, send it over and we will complete it.',
  },
  {
    q: 'Do you offer electroplated / electroplating diamonds?',
    a: 'Yes, and several grades are specified for it. In the natural range, NS-100-P and the MB series are recommended for electroplated tools. In CBN, EBN A and EBN AA are used in electroplated single-layer bonds. We also etch crystal surfaces specifically for electroplating, which improves nickel-to-diamond clamping in micro-engineering applications — that is covered in the coated sections of the [metal bond](/products/metal-bond#coated) and [CBN](/products/cbn#coated) pages, and in the Polish, Etch & CRT datasheet.',
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

// Home lists the hubs in the copy deck's order, which leads with the two
// highest-volume buyer types rather than the lib order used elsewhere.
const HOME_HUB_ORDER = ['dental', 'grinding-cutting-sawing-drilling', 'semiconductor-electronics', 'automotive-aerospace', 'tool-and-die', 'polishing-lapping']

const Home = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  const products = getProducts(locale)
  const apps = getApplications(locale)

  // The eight groups as curtain tiles. The card carries no description, so the
  // group's own page opens with the same sentence its card used to show.
  const groupTiles = products.map((p) => ({
    title: p.name,
    href: `/products/${p.slug}`,
    image: { src: productImage(p.slug) ?? '', alt: p.name },
  }))

  // The same six hubs as curtain tiles: no description, because the card has
  // nowhere to put one.
  const hubTiles = HOME_HUB_ORDER.map((slug) => apps.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .map((a) => ({
      title: a.name,
      href: `/applications/${a.slug}`,
      image: { src: applicationImage(a.slug) ?? '', alt: a.name },
    }))

  return (
    <>
      <Hero title={t(locale, hero.title)} desc={t(locale, hero.desc)} />

      {/* THE RANGE. One section: its own heading, its own grid, its own padding.
          Anchor target for the header's "Products" and the hero's own CTA — the
          offset comes from html's scroll-padding-top (see _general.css), so no
          scroll-mt here or the two would add up.

          This used to be a full-bleed navy SectionBanner sitting on top of the
          grid, per Uri's Van Moppes markup. Two separate blocks introducing one
          idea read as two sections; welding them together with a flush grid then
          read as the cards spilling out of the band. Both were symptoms of the
          same thing — the heading was in a different section from the content it
          headed. It is now in the same one, which is what every other section on
          the page already does, and the page gets its normal py-20/py-30 of air
          under the hero back.

          No copy was rewritten: the band's single paragraph splits at its own
          full stop into the heading sentence and the lede, which is the
          eyebrow-plus-sentence shape ProofPanel and the FAQ already use.

          The trust bar that used to sit in this slot is gone. Its four points
          (ISO 9001, in-house QC, complete range, 50+ years) are each made
          properly further down — by the QC banner, the values row and the
          footer's own trust line — and as a strip of four ticks directly under
          the hero it was a row of assertions before the reader knew what EID
          sells. */}
      {/* THE RANGE. The heading lives in the same section as the grid it
          heads, rather than in a separate full-bleed banner above it.

          Uri's V1 note asked for a thin "Our Products" banner in the Van Moppes
          shape, and that was built — twice. It reads as a separate block from
          the grid it introduces, which is the fault Marc kept landing on. This
          is his call over the note; worth knowing it is a deliberate departure
          rather than an oversight.

          Anchor target for the header's "Products" and the hero's own CTA —
          nine things across the site link to /#products. The offset comes from
          html's scroll-padding-top, so no scroll-mt here or the two would add
          up. */}
      <section id="products" data-note="range" className="py-20 lg:py-30">
        <div className="container">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="border-default-300 inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
                <span className="bg-primary size-2"></span>
                <span className="text-default-900 text-sm">{t(locale, 'Our Products')}</span>
              </div>
              <h2 className="mt-4 text-[28px] font-bold md:text-[36px] lg:text-[42px]">{t(locale, 'Every industrial diamond and CBN product, from one source.')}</h2>
            </div>
            <p className="text-default-600 lg:col-span-5">
              {t(locale, 'Natural grit and powder made in our own factory, bonded and CBN grades processed, coated and graded to your specification, and single crystal made to your exact orientation.')}
            </p>
          </div>

          {/* Four across, revealed. The eight groups are a catalogue — the
              thing a buyer scans to find their material — so every photograph
              shows at rest. The curtain stays on the three pillars, where the
              point is to read one claim at a time. */}
          <div className="mt-14 lg:mt-18">
            <CurtainGrid items={groupTiles} columns={4} revealed />
          </div>

          <div className="mt-12">
            <ArrowButton href="/contact" label={t(locale, 'Tell us the tool')} variant="dark" />
          </div>
        </div>
      </section>

      <ProofPanel
        eyebrow={t(locale, 'Why tool makers qualify EID')}
        title={t(locale, 'One accountable manufacturer, spec to delivery.')}
        desc={t(locale, 'Fifty years of supplying tool makers has narrowed down to three things they buy us for.')}
        ghost={t(locale, 'Industrial diamond')}
        /* ⚠ The three paragraphs that used to sit here are gone, and that is
           the change rather than the layout. Six previous arrangements each
           tried to carry a three-to-four sentence body per claim and each read
           as a wall; the reference gives a tile a kicker and a headline and
           nothing else. Every claim still links to the page where it is made in
           full, and the lede above still frames all three — but this needs
           Uri's sign-off with the hero lede and the two open FAQ answers.

           This is the one grid that keeps the curtain. The products and
           applications rows below run revealed, because a catalogue is scanned;
           three claims are read one at a time, which is what the curtain is
           for. */
        pillars={[
          {
            meta: t(locale, 'Accountability'),
            title: t(locale, 'We control production, not just supply.'),
            href: '/about',
            image: {
              src: '/eid/qc-sieve.jpg',
              alt: t(locale, 'A technician operating a stack of laboratory test sieves beside a tray of graded grey diamond grit'),
            },
          },
          {
            meta: t(locale, 'Consistency'),
            title: t(locale, 'The same material, every reorder.'),
            href: '/quality',
            image: {
              src: '/eid/qc-batch-to-batch.jpg',
              alt: t(locale, 'Side-by-side scanning electron micrographs of two production lots of the same diamond grade, showing matching crystal size and octahedral morphology, each panel with a 1 micrometre scale bar'),
            },
          },
          {
            meta: t(locale, 'Breadth'),
            title: t(locale, 'The full range, one relationship.'),
            href: '/#products',
            image: {
              src: '/eid/qc-samples.jpg',
              alt: t(locale, 'A laboratory shelf of sample jars, each holding a different grade of grey and translucent diamond material, coarse through to fine'),
            },
          },
        ]}
      />

      {/* APPLICATIONS. The same card as the range above, in every respect —
          same shape, same treatment, same grid.

          Uri's V1 note asks for this section to sit below the products in
          weight ("even smaller than products ... because it's not so
          important"), and a landscape tile did exactly that: six of them came
          out shorter than the eight product tiles. But it also made the two
          rows read as two different components on one page, which is the fault
          Marc called. One card, used twice, wins.

          The weight difference now has to come from somewhere else — three
          columns against four already makes these the bigger tiles, so if the
          hierarchy matters it needs a lighter ground or tighter padding rather
          than a different card. */}
      <section data-note="applications" className="py-20 lg:py-30">
        <div className="container">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="border-default-300 inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
                <span className="bg-primary size-2"></span>
                <span className="text-default-900 text-sm">{t(locale, 'Applications')}</span>
              </div>
              <h2 className="mt-4 text-[28px] font-bold md:text-[36px] lg:text-[42px]">{t(locale, 'Diamond and CBN for the work your tools do.')}</h2>
            </div>
            <p className="text-default-600 lg:col-span-5">{t(locale, 'We supply the material; you build the tools that serve these applications.')}</p>
          </div>

          <div className="mt-14 lg:mt-18">
            <CurtainGrid items={hubTiles} revealed />
          </div>

          <div className="mt-12">
            <ArrowButton href="/applications" label={t(locale, 'View all applications')} variant="dark" />
          </div>
        </div>
      </section>

      {/* QUALITY, as a band. The long-form version of this block still runs on
          /quality, where the sentences belong. */}
      <QcBanner
        eyebrow={t(locale, 'Quality')}
        title={t(locale, 'Every production run is tested before it leaves.')}
        desc={t(locale, 'Consistency is a process, and ours runs on measurement. We test the run and record the result rather than sampling and assuming — ISO 9001 certified, with full traceability from incoming raw material to shipped lot.')}
        checks={[t(locale, 'Particle size distribution'), t(locale, 'Crystal morphology'), t(locale, 'Coating weight & coverage'), t(locale, 'ISO 9001 & traceability')]}
        ctaLabel={t(locale, 'See how our QC works')}
        ctaHref="/quality"
      />

      {/* Material vocabulary rather than a logo wall — the deck names customers
          only as buyer types, so a wall of client logos would claim
          endorsements EID has not given us. */}
      <Marquee
        items={[
          t(locale, 'Natural Diamond Grit'),
          t(locale, 'Micron Powder'),
          t(locale, 'CBN'),
          t(locale, 'PCBN'),
          t(locale, 'CVD Single Crystal'),
          t(locale, 'MCD'),
          t(locale, 'PCD Blanks'),
          t(locale, 'Metal Bond'),
          t(locale, 'Resin Bond'),
        ]}
        /* The second row is what EID says about itself, and every line of it is
           already published elsewhere on the site — these four are the footer's
           own badges. Nothing new is claimed by putting them in bigger type. */
        secondary={[
          t(locale, 'Coated in-house'),
          t(locale, 'Made in London'),
          t(locale, 'ISO 9001 certified'),
          t(locale, 'In-house QC laboratory'),
          t(locale, "50+ years' experience"),
        ]}
      />

      {/* REACH — the one-facility-worldwide story made visible. */}
      <GlobeSection />

      {/* The ask, and the two direct channels. The form itself lives on
          /contact rather than being rendered a second time here. */}
      <ContactStrip title={t(locale, 'Tell us what you need')} desc={t(locale, 'Request a quote, order a sample, or ask a technical question. One form, routed to someone who works with the material.')} />

      {/* FAQ sits below the conversion block, per the deck: it is written for AI
          search and rich results rather than to be read on the way down. */}
      <Faq
        /* The plate is /eid/qc-lab.jpg, which had been orphaned since the
           curtain tiles took over — so half this section is a picture at no
           cost in new assets. It suits the block: the lede promises that
           someone who works with the material will answer, and the frame shows
           somebody doing exactly that.
        
           The caption is not a restatement of the lede. It names the document
           set, which is what a buyer scanning an FAQ about ISO 9001 and
           certificates of analysis is actually looking for, and every item on
           it is already stated in the second answer below. */
        plate={{
          src: '/eid/qc-lab.jpg',
          alt: t(locale, 'A technician at an optical inspection system in a quality laboratory, examining a diamond crystal shown magnified on the instrument screen'),
          caption: t(locale, 'ISO 9001 certificate, certificate of analysis per lot, retention samples, safety data sheets and Kimberley Process compliance — all available on request.'),
        }}
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
