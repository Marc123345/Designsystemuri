import CurtainGrid from '@/components/CurtainGrid'
import ApplicationIndex from '@/components/home/ApplicationIndex'
import QualityControlsStrip from '@/components/home/QualityControlsStrip'
import { Eyebrow } from '@/components/ui'
import ProofPanel from '@/components/home/ProofPanel'
import { Faq } from '@/components/sections'
import CanvasField from '@/components/CanvasField'
import VideoHero from '@/components/VideoHero'
import type { Locale } from '@/i18n/routing'
import { productImage } from '@/lib/card-media'
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
/* ⚠ THE LEDE IS GONE, ON MARC'S INSTRUCTION. It read "The complete range of
   diamond and CBN products, precision engineered and QC-controlled to your
   specification." The headline carries the hero on its own now, which is what
   /about already did — VideoHero's `desc` has always been optional and
   documents that page as the precedent.

   Removed rather than emptied: `desc: ''` would leave a key that renders
   nothing and reads like a value someone forgot to fill in. The prop is
   dropped from the call below to match, so there is no dead field here and no
   argument passing an undefined through `t()`.

   This is the SECOND sentence to come out of this hero — see point 2 above for
   the first, and the same rule applies: do not reintroduce it as a shorter
   variant or a paraphrase. New wording would need to come from Uri. */
const hero = {
  title: 'Industrial Diamond — Manufactured In-House Since 1970',
}

/**
 * FAQ — supplied by Marc on 16 September 2026.
 *
 * Keep this copy aligned with the approved FAQ document. The same array powers
 * both the visible accordion and FAQPage structured data below.
 */
const faqs = [
  {
    q: 'Can you customize products for us?',
    a: 'Yes. Standard grades ship from stock, while custom specifications — including bespoke mesh/micron sizing, specific shape factors, custom CVD single crystal in all orientations — 100, 110, 111 — and specialized metallic PVD/electroless coatings — are made to order.',
  },
  {
    q: 'Do you offer diamond and CBN grades suitable for electroplated or vitrified tools?',
    a: 'Yes. We engineer and supply Diamond and CBN grits specifically optimized for both electroplated and vitrified bond manufacturing.',
  },
  {
    q: 'Can I download product specifications as a PDF?',
    a: 'Yes. All 18 technical datasheets and MSDS documents are completely ungated — no forms, logins, or email addresses required. You can download them directly from our Resources page or individual product pages. If you need a custom specification not listed, contact us and we will send it directly.',
  },
  {
    q: 'Are you ISO-registered, and can you supply COAs, retention samples, and references?',
    a: 'Yes. EID’s quality management system is ISO 9001 certified, covering everything from raw material inspection to final delivery. We routinely provide full documentation packs for supplier approval, including: ISO 9001 Certification and full lot-level traceability; Certificates of Analysis (COAs) available per lot on request; retention samples kept from every batch to check against future quality queries; and Kimberley Process compliance for all natural rough diamonds.',
  },
  {
    q: 'Do your raw diamond and CBN materials have a shelf life or specific storage requirements?',
    a: 'No, our raw diamond and CBN materials do not degrade and have an indefinite shelf life when stored correctly. To maintain optimal purity and performance, we recommend storing the materials in their original sealed containers in a dry, climate-controlled environment to prevent moisture contamination or ambient oxidation.',
  },
  {
    q: 'What are your standard lead times, and do you ship internationally?',
    a: 'Yes, we supply tool makers globally from our HQ in London (or from our Dublin facility, if EU exports are an advantage). Standard catalog grades ship directly from stock usually within 24 to 48 hours, while custom specifications, rounding, or specialized PVD/electroless coatings are made to order with lead times tailored to your project timeline.',
  },
  {
    q: 'Do you offer consignment stock options?',
    a: 'Yes, we provide tailored consignment inventory programs to support our partners’ supply chain security. However, these programs are restricted to high-volume enterprise accounts with stable, recurring production runs and are subject to minimum annual volume commitments.',
  },
  {
    q: "Why aren't prices listed on your website, and what do you need to provide a quote?",
    a: 'Pricing varies depending on your chosen material type, custom dimensions, or specialized requirements. To get a fast quotation, please contact us with your required product specifications, dimensions, and your target industry application.',
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
    /* alt="" — the card's own <h3> already says the product name, so an alt
       repeating it made a screen reader announce "Metal Bond Diamond" twice in
       a row. Fourteen instances on this page alone (axe: image-redundant-alt).
       The photograph adds nothing the heading has not said. */
    image: { src: productImage(p.slug) ?? '', alt: '' },
  }))

  // The same six hubs, now as an icon index rather than photo cards — slug and
  // name are all ApplicationIndex needs. See the note on that component for why
  // the photographs went.
  const hubEntries = HOME_HUB_ORDER.map((slug) => apps.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .map((a) => ({ slug: a.slug, name: a.name }))

  return (
    <>
      <VideoHero title={t(locale, hero.title)} video="https://ik.imagekit.io/qcvroy8xpd/EID%20VIDEO%20HERO.mp4" minHeight="min-h-[60svh]" scrollCue />

      {/* The two doors, 50/50, still on the hero's navy ground so they read as
          the foot of the hero rather than as the page's first section — which
          is exactly where Strauss puts theirs. They peek above the fold, and
          that is the point: you see the hero end and the next thing begin in
          the same view, which is what lets a short hero feel deliberate rather
          than truncated. */}
      {/* ── ENTRY CARDS: REMOVED ────────────────────────────────────────
          Marc's call. Two half-width cards under the hero — "Explore our
          Products / Eight groups" and "Explore our Applications / Six hubs" —
          each a photograph with a line of copy.

          Both destinations are still one scroll away and now named on the page
          itself: the range section, and the applications index directly below
          it. The cards were a signpost to two things already visible from the
          same screen. */}

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

      {/* White ground, coarse screen. This section is the whole catalogue from
          natural grit down to micron powder, so it takes the top of the range;
          the fine screen is unused now that the QC pages are gone. See
          CanvasField. */}
      <section id="products" data-note="range" className="relative isolate py-20 lg:py-30">
        <CanvasField density="coarse" mark="end" />
        <div className="container">
          <div>
            {/* Centred and on its own, matching the applications and QC blocks
                below. Was "Eight groups, from natural grit to single crystal."
                beside a paragraph naming what each group covered — Marc's call
                to drop the count and the list and carry the one claim instead.
                This line was the Products divider strip's before the strips
                came off; it says the same thing in fewer words than the
                paragraph did. */}
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>{t(locale, 'The range')}</Eyebrow>
              <h2 className="mt-4 text-[24px] font-bold text-balance md:text-[30px] lg:text-[34px]">{t(locale, 'Every industrial diamond and CBN product, from one source.')}</h2>
            </div>
          </div>

          {/* Four across, revealed. The eight groups are a catalogue — the
              thing a buyer scans to find their material — so every photograph
              shows at rest — as it now does on the three pillars below, which
              were the last grid holding a curtain. */}
          <div className="mt-14 lg:mt-18">
            <CurtainGrid items={groupTiles} columns={4} revealed />
          </div>
        </div>
      </section>

      {/* ── BAND 2 ─────────────────────────────────────────────────────── */}

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

           This grid was the last one keeping the curtain, and it is revealed
           now too: the three photographs are the evidence for the three claims,
           and a desktop reader was getting white panels until they hovered. See
           the note in ProofPanel. */
        /* Landscape rather than the default portrait: 4:3 instead of 3:4
           takes roughly a quarter off the height of the three numbered tiles. */
        aspect="landscape"
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
          {/* Centred, and named for what the grid below actually is. The old
              line ("Diamond and CBN for the work your tools do.") described the
              material; the reader arriving here is looking for their industry. */}
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{t(locale, 'Applications')}</Eyebrow>
            {/* ── ⚠ THIS HEADING MUST NOT CLAIM TO BE THE WHOLE LIST ────────
                "Applications and industries we supply." read as a complete
                inventory of who EID sells to. It is not: these are the six
                hubs that have pages behind them, and EID supplies well beyond
                them — Marc's correction.

                The fix is in the verb, not a qualifier. "Where our diamond and
                CBN go to work" describes what the six tiles are — places the
                material is used — without implying they are the only ones, so
                nothing has to be walked back when a seventh hub is added.

                ⚠ Do not "tighten" this back to a count. "Six industries…" is
                the same trap the products heading was pulled out of, where
                "Eight groups, from natural grit to single crystal" had to be
                dropped because the number goes stale the moment the range
                changes. */}
            <h2 className="mt-4 text-[24px] font-bold text-balance md:text-[30px] lg:text-[34px]">{t(locale, 'Where our diamond and CBN go to work.')}</h2>
          </div>

          <div className="mt-8 lg:mt-10">
            <ApplicationIndex hubs={hubEntries} locale={locale} />
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

      {/* QUALITY + THE ASK, combined.

          Was two consecutive sections: QcBanner and ContactStrip. Marc's call
          is one bento, and they belong together — the QC block was the last
          proof on the page and the ask sat immediately under it. Run as two
          sections they read as the page ending twice.

          The long-form quality content still lives on /quality, which this
          links to; nothing was lost in the merge. See the component for the
          bento's shape and why the QC heading moved up into the section. */}
      {/* Sits where the Quality divider strip used to, so quality is still
          announced before the bento — as one line rather than a band. */}
      <QualityControlsStrip locale={locale} />

      {/* ── THE CONTACT BENTO IS GONE FROM THIS PAGE ──────────────────────
          Marc's call. It was "Tell us what you need" over a Contact button,
          beside a plate carrying the email and phone rows.

          Nothing about reaching EID is lost with it: Contact is the one
          persistent button in the header on every page, the footer carries the
          same email and phone, and the floating WhatsApp control sits over all
          of it. This was the fourth copy of that on a single scroll.

          It was rendered here and nowhere else, so components/home/
          QualityContactBento.tsx went with it rather than being left as an
          unreferenced file. It is in this commit's history if it is wanted
          back. */}

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
