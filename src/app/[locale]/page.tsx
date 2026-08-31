import CurtainGrid from '@/components/CurtainGrid'
import EntryCards from '@/components/home/EntryCards'
import ProofPanel from '@/components/home/ProofPanel'
import QualityContactBento from '@/components/home/QualityContactBento'
import SectionBanner from '@/components/SectionBanner'
import { Faq } from '@/components/sections'
import CanvasField from '@/components/CanvasField'
import VideoHero from '@/components/VideoHero'
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
 *  2. Who it is for. This point used to argue for a second sentence in the
 *     hero naming who EID sells to, lifted out of the fifth FAQ answer, on the
 *     grounds that it turned away the wrong enquiries in one second.
 *
 *     ⚠ REMOVED ON MARC'S INSTRUCTION, EVERYWHERE ON THE SITE — not just here.
 *     It is gone from this hero, from the FAQ answer it came from, and from
 *     the mission statement on About. Do not reintroduce it as a shorter
 *     variant or a paraphrase; the instruction was the sentence, in all its
 *     placements. If a qualifier is wanted again it needs new wording from
 *     Uri, not this one restored.
 */
const hero = {
  title: 'Industrial Diamond — Manufactured In-House Since 1970',
  desc: 'The complete range of diamond and CBN products, precision engineered and QC-controlled to your specification.',
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
    a: 'The material goes into your product. The main sectors are dental, semiconductor and advanced electronics, automotive and aerospace, tool and die, construction and stone, and optics. By operation, that means grinding, cutting, sawing and drilling; polishing and lapping; dressing and truing; and precision machining with PCD, PCBN, MCD and CVD single crystal. Tell us the material you are working and the finish you need and we will specify the grade.',
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
      <VideoHero title={t(locale, hero.title)} desc={t(locale, hero.desc)} video="https://ik.imagekit.io/qcvroy8xpd/EID%20VIDEO%20HERO.mp4" minHeight="min-h-[60svh]" scrollCue />

      {/* The two doors, 50/50, still on the hero's navy ground so they read as
          the foot of the hero rather than as the page's first section — which
          is exactly where Strauss puts theirs. They peek above the fold, and
          that is the point: you see the hero end and the next thing begin in
          the same view, which is what lets a short hero feel deliberate rather
          than truncated. */}
      <EntryCards />

      {/* ── BAND 1 ─────────────────────────────────────────────────────────
          The rhythm Uri asked for, third attempt, and the difference this time
          is the height. The two earlier versions of this band carried a 44px
          heading at py-14 — a section pretending to be a divider, which is why
          it read as two blocks introducing one idea and why it was pulled.

          This one is a line of type on a rule of colour. It does not repeat the
          section's h2 and it does not try to be the heading; the label is a
          waypoint and the sentence is the prep line from his doc, verbatim. The
          section below keeps its own heading and its own air.

          Shade 1 — the lightest of the three blues. The bands walk darker down
          the page: 1 here, 2 at applications, and the QC block already carries
          the darkest ground of all. */}
      <SectionBanner label={t(locale, 'Our Products')} body={t(locale, 'Every industrial diamond and CBN product, from one source.')} shade={1} />

      {/* White ground, coarse screen. This section is the whole catalogue from
          natural grit down to micron powder, so it takes the top of the range;
          `/micron-qc` runs the fine one, and the two are meant to be noticeably
          different if you ever see them side by side. See CanvasField. */}
      <section id="products" data-note="range" className="relative isolate py-20 lg:py-30">
        <CanvasField density="coarse" mark="end" />
        <div className="container">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
            {/* No eyebrow chip and no restatement of the band's sentence —
                both sat four lines above this heading. What the section needs
                from a heading is the thing the band cannot say in one line:
                which eight groups, and how they divide. */}
            <div className="lg:col-span-7">
              <h2 className="text-[28px] font-bold md:text-[36px] lg:text-[42px]">{t(locale, 'Eight groups, from natural grit to single crystal.')}</h2>
            </div>
            <p className="text-default-600 lg:col-span-5">{t(locale, 'Natural grit and powder made in our own factory, bonded and CBN grades processed, coated and graded to your specification, and single crystal made to your exact orientation.')}</p>
          </div>

          {/* Four across, revealed. The eight groups are a catalogue — the
              thing a buyer scans to find their material — so every photograph
              shows at rest. The curtain stays on the three pillars, where the
              point is to read one claim at a time. */}
          <div className="mt-14 lg:mt-18">
            <CurtainGrid items={groupTiles} columns={4} revealed />
          </div>
        </div>
      </section>

      {/* ── BAND 2 ─────────────────────────────────────────────────────── */}
      <SectionBanner label={t(locale, 'Why EID')} body={t(locale, 'Fifty years of supplying tool makers has narrowed down to three things they buy us for.')} shade={2} />

      <ProofPanel
        eyebrow={t(locale, 'Why tool makers qualify EID')}
        title={t(locale, 'One accountable manufacturer, spec to delivery.')}
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
      {/* ── BAND 3 ─────────────────────────────────────────────────────────
          Darkest of the three, and the last cut before the QC block's own
          dark ground closes the run. */}
      <SectionBanner label={t(locale, 'Applications')} body={t(locale, 'We supply the material; you build the tools that do the work.')} shade={3} />

      {/* APPLICATIONS. Deliberately lighter than the range above it.

          Uri's V1 note puts this section below products in weight — "even
          smaller than products ... because it's not so important" — and is
          candid about why it stays at all: it earns its place for search and
          for lead capture, not because a buyer came looking for it.

          The weight difference is made without changing the card, which is
          what failed before — two cards on one page read as two components.

          Three across, not four: six hubs on a 4-column grid come out four then
          two, and the ragged second row makes the section look unfinished
          rather than minor. Three and three is even.

          What carries the demotion instead is the crop. These run at 4:3 where
          the range runs 3:4, so a hub tile is wider but about 120px shorter
          than a product tile, and the section lands roughly a third shorter
          than the range above it. Plus py-14 against the range's py-20/30, and
          no lede paragraph. */}
      {/* `id="applications"` is the anchor three things now depend on: the
          header's Applications entry, the entry card above, and the 301 from
          the removed /applications index. Renaming it breaks all three
          silently — they are strings, not references.

          The scroll offset comes from html's `scroll-padding-top`, the same way
          #products does, so no `scroll-mt` here or the two would add up. */}
      {/* THE TINTED STEP. Everything light on this page was pure white, which
          left the SectionBanner strips doing all of the separating on their
          own — three navy rules with one continuous white field behind them.
          This band takes `bg-canvas`, the brand navy at 4% over white, so the
          page alternates rather than runs. Medium screen: the hubs are an index
          into the range rather than a point on it. */}
      <section id="applications" data-note="applications" className="bg-canvas relative isolate py-14 lg:py-20">
        <CanvasField density="medium" />
        <div className="container">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h2 className="text-[24px] font-bold md:text-[30px] lg:text-[34px]">{t(locale, 'Diamond and CBN for the work your tools do.')}</h2>
            </div>
          </div>

          <div className="mt-10 lg:mt-12">
            <CurtainGrid items={hubTiles} aspect="landscape" revealed />
          </div>

          {/* "View all applications" is gone with the index page it pointed at.
              All six hubs are in the grid directly above it, so the button was
              offering a longer route to what the reader can already see. */}
        </div>
      </section>

      {/* ── BAND 4 ─────────────────────────────────────────────────────────
          Quality and the ask had no cut above them, so they read as a tail on
          Applications rather than as a section of their own. That was defensible
          while QcBanner was a dark full-bleed band — the note on BAND 1 says so
          in as many words, "the QC block already carries the darkest ground of
          all", and a cut above a dark band is a cut against nothing. It stopped
          being true when that block became two light cards, and it is not true
          at all of the bento that replaced them.

          ⚠ SHADE 3 AGAIN, and that is the least-bad option rather than an
          oversight. There are three blue tokens and four bands now, so one
          value has to repeat somewhere. What the shades are actually for is
          stated on the component: keeping cuts "distinguishable from each other
          when three of them appear on one screen of scrolling". Applications
          and this one are separated by the whole applications grid, so they
          never co-appear — which is the one arrangement where the repeat costs
          nothing. A fourth blue token would fix it properly. */}
      <SectionBanner label={t(locale, 'Quality')} body={t(locale, 'Every run measured, recorded and traceable — and one form to the person who did it.')} shade={3} />

      {/* QUALITY + THE ASK, combined.

          Was two consecutive sections: QcBanner and ContactStrip. Marc's call
          is one bento, and they belong together — the QC block was the last
          proof on the page and the ask sat immediately under it. Run as two
          sections they read as the page ending twice.

          The long-form quality content still lives on /quality, which this
          links to; nothing was lost in the merge. See the component for the
          bento's shape and why the QC heading moved up into the section. */}
      <QualityContactBento />

      {/* REACH lived here as <GlobeSection />. Uri's V1 note moves it: the
          corrected version is canonical on About, and Contact closes with the
          globe instead. */}

      {/* FAQ sits below the conversion block, per the deck: it is written for AI
          search and rich results rather than to be read on the way down. */}
      <Faq
        /* No plate. Uri's V1 note strips the FAQ back to a compact list of
           questions — the picture (a technician at an optical inspection rig)
           was half the block's height and said nothing the answers do not. The
           document set it used to caption is stated in full in the second
           answer below, which is where a buyer looking for it will be. */
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
