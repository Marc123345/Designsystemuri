import CurtainGrid from '@/components/CurtainGrid'
import PhotoCard from '@/components/PhotoCard'
import { RichParagraphs } from '@/components/RichText'
import { CrossLinks, PageHero } from '@/components/sections'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { applications } from '@/lib/applications'
import { applicationImage, productImage } from '@/lib/card-media'
import { catalog, getSectionCatalog } from '@/lib/product-catalog'
import { getProductImage } from '@/lib/product-images'
import { localeAlternates } from '@/lib/hreflang'
import { getApplication, getApplications, t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return applications.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const a = getApplication(locale, slug)
  if (!a) return {}
  return {
    title: { absolute: a.metaTitle },
    description: a.metaDesc,
    alternates: localeAlternates(locale, `/applications/${slug}`),
  }
}

/**
 * The six application hubs, rebuilt in the language the rest of the site now
 * speaks — the pass that produced Home, About, Quality, Contact and Resources.
 *
 * These pages were the last on the site still built out of the template's
 * section kit, and that showed in three specific ways rather than as a vague
 * "looks different":
 *
 *   1. THE ARGUMENT WAS IN BODY TYPE. The outcome block — the one paragraph on
 *      the page that says why any of this is worth money — was a heading and a
 *      paragraph under a hairline rule. Everywhere else on the site, the claim
 *      a page is making sits on a photographic tile with the words on it. It
 *      does that here now.
 *   2. A DASHED GREY BOX WHERE THE PHOTOGRAPHS SHOULD BE. The WHY EID band was
 *      DarkFeatureList with no `bgImage`, so all six hubs shipped a wireframe
 *      placeholder with a crossed-out rectangle. See the section below.
 *   3. A FIVE-PRODUCT HUB CAME OUT THREE THEN TWO, with the second row half
 *      empty. Three of the six carry five products. See BENTO below.
 *
 * ── The sequence, and what it maps to ───────────────────────────────────────
 *
 *   PageHero band      the hub's own photograph                    (unchanged)
 *   INTRO              TheCompany's ruled statement + the outcome on its photo
 *   PRODUCTS           the home page's curtain grid, bento at five
 *   WHY EID            CoreValues / TheControls — four PhotoCards, 7/5 - 5/7
 *   QUOTE              the band that closes every other page       (unchanged)
 *   CROSS-LINKS        the hub's link floor                        (unchanged)
 *
 * ── ⚠ NO SECTIONBANNER CUTS, AND THAT IS DELIBERATE ────────────────────────
 *
 * This page ran three of them for a while — the thin coloured rules walking
 * shade 1 → 2 → 3 that every other page on the site uses between sections, off
 * Uri's V1 note ("a very, very thin banner with a bit of wording, prepping for
 * the products — and then the products").
 *
 * Marc had them off these six pages. The strongest case for the call is the
 * first one: a hub's PageHero already carries an eyebrow, an h1 and a lede, so
 * a cut immediately under it saying "TOOL & DIE / Single crystal, MCD, and
 * PCD/PCBN blanks…" was restating the hero one line after the reader had read
 * it. What a cut buys elsewhere is a beat between sections of equal weight, and
 * this page does not have that problem — the intro is a photographic tile, the
 * products are a bento of photographs, and WHY EID is four more. The sections
 * are already told apart by what is in them.
 *
 * If any of the three ever comes back, it is one `<SectionBanner>` line and the
 * import. Bring back the PRODUCTS one before the other two: that is the
 * position Uri's note actually describes.
 *
 * ── Not one word of hub copy changed ────────────────────────────────────────
 *
 * Every string that is Uri's is still Uri's, in the same place in the reading
 * order: the intro headline and its paragraphs, the outcome, the products
 * title, the per-hub WHY heading and paragraph, the CTA and its description.
 * What changed is what carries them. The one deletion is the eyebrow chip that
 * repeated `productsTitle` four lines above the heading that also said it —
 * `productsTitle` is now the heading itself, which is what it reads like.
 */

/**
 * WHY EID — the four claims, and the photographs that had to arrive with them.
 *
 * The four titles and descriptions are unchanged from the DarkFeatureList this
 * replaces. What they never had is pictures: that band renders a dashed
 * wireframe when no `bgImage` is passed, and no hub passed one, so six pages
 * shipped a placeholder in the position where the site's own laboratory
 * evidence belongs.
 *
 * Each frame is the thing its claim asserts, and each is used once on this page
 * — the hub photograph is in the hero, the product renders are in the grid, and
 * these four are the only laboratory frames here:
 *
 *   01 consistency  → two lots of one grade at matching magnification
 *   02 full range   → the sample shelf, coarse at the front through to fine
 *   03 in-house QC  → the laboratory the other three claims depend on
 *   04 traceability → the labelled retention cabinet a lot is recalled from
 *
 * ⚠ `heavy`, for the same reason About and Quality set it: these are bright
 * frames — a white lab bench, a lit cabinet, two high-key micrographs — and the
 * 11px eyebrow numeral does not clear 4.5:1 on the light scrim over any of
 * them. If a photograph here is swapped, re-measure before assuming the scrim
 * still covers it.
 */
/**
 * The four claims. Same four on every hub, in the same order — they are what
 * EID sells, not what the industry does, so varying them would be varying the
 * argument rather than the page.
 */
const WHY_CARDS = [
  { title: 'Batch-to-batch consistency', desc: 'Re-order and get the same material, tested on every production run.' },
  { title: 'Full range, one supplier', desc: 'Everything this application needs from a single relationship and standard.' },
  { title: 'In-house QC laboratory', desc: 'Size distribution, crystal strength, morphology, and coating coverage.' },
  { title: 'ISO 9001 & traceability', desc: 'Certificate of analysis and retention samples available on request.' },
] as const

/**
 * The photographs behind those claims, PER HUB.
 *
 * ⚠ The four images used to be hardcoded into WHY_CARDS, so all six hubs ran
 * the identical set. Combined with the outcome tile — which ran one micrometer
 * shot on all six — a buyer moving between two hubs saw five of the same
 * pictures twice and had no way to tell the pages apart below the fold.
 *
 * Each set is drawn from EID's own QC and laboratory photography, and every
 * alt below is the description already on record against that file elsewhere in
 * this codebase, copied verbatim. That is deliberate: an alt is a claim about
 * what a photograph contains, and the way to get one wrong is to write a fresh
 * one for a file you have not opened.
 *
 * ── What varies and what cannot ─────────────────────────────────────────────
 *
 * Cards 01 and 03 vary freely — there is a lot of measurement and laboratory
 * photography, and each hub gets a frame that leans toward how ITS material is
 * checked: impact testing for grinding, laser diffraction for polishing, the
 * micrometer for semiconductor.
 *
 * Cards 02 and 04 have a thin bench. Only three frames genuinely show a full
 * range (the jar shelf, the sixteen dishes, the graded grit), and only two say
 * traceability at all (the retention cabinet and the labelled jars). They are
 * split three and three across the hubs rather than pretending otherwise. If
 * more range-and-records photography ever arrives, this is where it goes.
 *
 * No image repeats WITHIN a hub. Repeats across hubs are fine and expected.
 */
type WhyMedia = { image: string; alt: string }

const M = {
  semTwoLots: { image: '/eid/qc-batch-to-batch.jpg', alt: 'Side-by-side scanning electron micrographs of two production lots at the same magnification, each with a 1 micrometre scale bar' },
  micrometer: { image: '/eid/quality/09-digital-micrometer-diamond-measurement.png', alt: 'A digital micrometer closed on a diamond crystal, its display reading 3.000 mm' },
  balance: { image: '/eid/quality/06-precision-scale-diamond-grit.png', alt: 'A dish of diamond grit on a precision balance reading 0.0456 grams, with a microscope on the bench behind' },
  opticalReadout: { image: '/eid/qc-inspection.jpg', alt: 'An optical measurement system with a diamond crystal magnified on screen and its dimensions read out alongside' },
  impactTest: { image: '/eid/quality/01-automated-hardness-test-station.png', alt: 'An automated impact test station, its indenter lowered over the sample stage inside a guarded enclosure' },
  laserDiffraction: { image: '/eid/quality/micron-qc-laser-diffraction.jpg', alt: 'A benchtop laser diffraction particle size analyser mid-measurement, with its wet dispersion unit alongside' },

  jarShelf: { image: '/eid/qc-samples.jpg', alt: 'A laboratory shelf of labelled sample jars, coarse grit at the front graduating to fine powder along the row' },
  sixteenDishes: { image: '/eid/quality/08-micron-powder-grade-comparison.png', alt: 'Sixteen dishes of micron diamond powder laid out in order from finest to coarsest' },
  gradedGrit: { image: '/eid/home/hero-grit.jpg', alt: 'Graded industrial diamond grit, coarse crystals through to fine powder' },

  qcTechnician: { image: '/eid/qc-lab.jpg', alt: 'A technician at an optical measurement system in the EID quality laboratory' },
  metrologyLab: { image: '/eid/facility/hero-metrology-lab.png', alt: 'Two technicians at a measuring microscope in the EID metrology laboratory' },
  microscopeStage: { image: '/eid/home/qc.jpg', alt: 'A gloved hand adjusting the stage of a laboratory microscope with a prepared sample slide under the objective' },
  morphology: { image: '/eid/facility/crystal-microscopy.png', alt: 'Diamond crystals under the microscope during morphology inspection' },
  stereoScope: { image: '/eid/quality/mesh-qc-stereo-microscopy.jpg', alt: 'A technician examining a sample of diamond grit under a binocular stereo microscope' },
  pipette: { image: '/eid/quality/03-sample-preparation-pipette.png', alt: 'A gloved hand pipetting into a test tube of micron diamond powder, a centrifuge on the bench behind' },

  retentionCabinet: { image: '/eid/quality/05-labeled-sample-storage-cabinet.png', alt: 'A storage cabinet of labelled sample containers, one retained from every batch' },
} satisfies Record<string, WhyMedia>

const WHY_MEDIA: Record<string, readonly [WhyMedia, WhyMedia, WhyMedia, WhyMedia]> = {
  dental: [M.semTwoLots, M.jarShelf, M.qcTechnician, M.retentionCabinet],
  'semiconductor-electronics': [M.micrometer, M.sixteenDishes, M.metrologyLab, M.retentionCabinet],
  'automotive-aerospace': [M.balance, M.gradedGrit, M.microscopeStage, M.jarShelf],
  'tool-and-die': [M.opticalReadout, M.jarShelf, M.morphology, M.retentionCabinet],
  'grinding-cutting-sawing-drilling': [M.impactTest, M.sixteenDishes, M.stereoScope, M.jarShelf],
  'polishing-lapping': [M.laserDiffraction, M.gradedGrit, M.pipette, M.jarShelf],
}

/** A hub added later renders the dental set rather than four empty cards. */
const whyMediaFor = (slug: string) => WHY_MEDIA[slug] ?? WHY_MEDIA.dental

/**
 * PRODUCT GRID SHAPES, BY COUNT.
 *
 * The six hubs carry three, four or five products, and the count is fixed by
 * what that hub actually uses — five grades on Tool & Die means five cards, not
 * six with one invented.
 *
 * Three and four divide into the even grid and are left on it: four across for
 * four, three across for three. Five divides into neither, and on a 3-column
 * grid it came out three then two, with the second row half empty and the last
 * card stranded beside a gap the width of a whole tile. Three of the six hubs
 * ship five products, so that was half the set.
 *
 * So five gets a bento — Marc's call, and the right one: a lead row of two and
 * a tail row of three, on 12ths.
 *
 *   ┌───────────────┬──────────┐   7 / 5, and taller
 *   │      01       │    02    │
 *   ├──────┬────────┼──────────┤
 *   │  03  │   04   │    05    │   4 / 4 / 4, and shorter
 *   └──────┴────────┴──────────┘
 *
 * ⚠ THE TWO ROWS MUST NOT BE THE SAME HEIGHT. Equal heights with unequal widths
 * is a ragged grid, not a bento — the eye reads five tiles that failed to line
 * up. 460 over 360 is what makes the top row read as the lead and the bottom as
 * the tail. If a hub ever carries six or seven, add the row here rather than
 * falling back to `columns`.
 *
 * Undefined keys fall through to `columns` untouched, which is how three and
 * four keep the layout they already had.
 */
const BENTO: Record<number, { span: string; minHeight: string }[] | undefined> = {
  5: [
    { span: 'lg:col-span-7', minHeight: 'lg:min-h-[460px]' },
    { span: 'lg:col-span-5', minHeight: 'lg:min-h-[460px]' },
    { span: 'lg:col-span-4', minHeight: 'lg:min-h-[360px]' },
    { span: 'lg:col-span-4', minHeight: 'lg:min-h-[360px]' },
    { span: 'lg:col-span-4', minHeight: 'lg:min-h-[360px]' },
  ],
}

/* About's spans exactly: 7/5 alternating, inverted on the second row, so no two
   adjacent tiles share a width and the row break moves. */
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

const parentSlugOf = (href: string) => href.replace('/products/', '').split('#')[0]

const ApplicationPage = async ({ params }: { params: Promise<{ locale: Locale; slug: string }> }) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const app = getApplication(locale, slug)
  if (!app) notFound()

  const [headline, ...bodyParas] = app.intro

  // A hub routes to the exact product page, and often to the exact section
  // anchor within it, so the label and href come from the hub rather than from
  // the product record. The tile only needs a title, a href and a picture; the
  // icon and one-line note this used to build were computed and then dropped on
  // the floor by CurtainGrid, so they are no longer built.
  /* ⚠ THE ANCHOR IS THE POINT, AND IT USED TO BE THROWN AWAY.
     This split the href on '#' and resolved the image from the parent slug
     alone, which meant every grade of a product got the same picture. On the
     dental hub that produced four cards carrying two images, and the worst of
     them was "Coated metal bond diamond" showing UNCOATED metal bond — a card
     whose entire job is to show the grit is plated, contradicted by its own
     photograph.

     ── Every tile here is now EID's own photography ──────────────────────────

     These tiles used to fall back to `productImage(slug)` from card-media.ts,
     which is the studio RENDER set — that file says so itself: "studio renders
     of the material types, not photographs of EID's own output… nowhere that
     argues a claim". An application hub is exactly somewhere that argues a
     claim; it tells a dental buyer which grades go into their burs. So the
     renders are gone from this page and every tile resolves to the catalogue's
     own photography, the frames taken from eid-ltd.com and registered in
     product-images.ts.

     ── Two passes, and the order matters ────────────────────────────────────

     1. A link WITH an anchor takes its section's photograph, always. The
        anchor names the exact thing the card is about, so accuracy wins here
        even where it produces a repeat.
     2. A link with NO anchor points at a whole product, so nothing tells us
        which of its sections to show. It takes the first section photograph
        not already claimed in pass one.

     Running the anchored tiles first is what makes pass two useful rather than
     arbitrary. Done in one pass, Grinding's "Metal Bond Diamond" grabbed the
     mesh frame before "Natural Diamond Grit" could claim it by anchor, and the
     two sat side by side showing the same pile.

     ⚠ ONE DUPLICATE SURVIVES AND IT IS NOT A BUG IN THIS CODE. On Automotive
     & Aerospace, "PCBN Discs & Blanks" and "CVD Polycrystalline Dressing Logs"
     both resolve to the segment tray, because both catalogue keys map to it —
     there are 13 photographs for 41 keys and no frame of a dressing log. The
     fix is a photograph, not a lookup; anything else here would be showing a
     buyer a picture of the wrong product. */
  const productTiles = (() => {
    const claimed = new Set<string>()
    const resolved: (string | undefined)[] = app.products.map((ap) => {
      const [parentSlug, anchor] = ap.href.replace('/products/', '').split('#')
      const key = anchor ? getSectionCatalog(parentSlug, anchor)?.image : undefined
      const src = key ? getProductImage(key)?.src : undefined
      if (src) claimed.add(src)
      return src
    })

    return app.products.map((ap, i) => {
      let src = resolved[i]
      if (!src) {
        const [parentSlug] = ap.href.replace('/products/', '').split('#')
        const options = Object.values(catalog[parentSlug] ?? {})
          .map((section) => (section.image ? getProductImage(section.image)?.src : undefined))
          .filter((u): u is string => Boolean(u))
        src = options.find((u) => !claimed.has(u)) ?? options[0]
        if (src) claimed.add(src)
      }
      return { title: ap.label, href: ap.href, image: { src: src ?? productImage(parentSlugOf(ap.href)) ?? '', alt: ap.label } }
    })
  })()

  const productLinks = app.products.map((ap) => ({ label: ap.label, href: ap.href }))
  const guideLinks = (app.guides ?? []).map((g) => ({ label: g, href: '/resources/blog' }))
  const relatedHubLinks = (app.relatedHubs ?? [])
    .map((h) => getApplication(locale, h))
    .filter(Boolean)
    .map((h) => ({ label: h!.name, href: `/applications/${h!.slug}` }))

  return (
    <>
      <PageHero
        eyebrow={app.eyebrow}
        title={app.h1}
        desc={app.metaDesc}
        /* The hub's own card photograph, so the page a visitor clicks into
           opens on the picture they clicked. A hub with no image in the map
           falls through to the bordered header rather than to an empty band. */
        bgImage={applicationImage(app.slug)}
        variant="band"
      />

      {/* ── INTRO: the statement, and the argument beside it ────────────────

          Left is TheCompany's block from About, exactly: a 2px brand rule down
          the edge, a mono kicker, the heading, and the opening paragraph set at
          18-19px rather than at body size. That size is Uri's F1/F2 note — the
          words at the top of a page are what a reader takes away, so they get
          the weight a heading would normally carry.

          Right is the outcome, and it is on a solid navy tile for the reason
          About's mosaic has one: a page needs somewhere its claim lands. This
          paragraph is the commercial case the whole hub exists to make, and it
          was previously the quietest thing on the page — body type under a
          hairline, below the fold of an F-pattern scan.

          ── The hub's own photograph is back, per Marc ──────────────────────

          ⚠ This comment used to explain why `applicationImage(slug)` had been
          REMOVED from this slot: it is the same frame the hero runs full-bleed,
          so the page opened on a photograph and showed it again a screen later.
          That reasoning was sound and it lost. What replaced it was a single
          hardcoded micrometer shot behind the outcome on ALL SIX hubs — so the
          dental buyer, the aerospace buyer and the semiconductor buyer were all
          reading their own argument over an identical picture, and the panel
          stopped saying anything about the industry it was addressing.

          One frame repeated across six pages is a worse failure than one frame
          repeated twice on a page, and the repeat is softer than it sounds: the
          hero is a 52svh letterbox and this is a portrait tile, so cover takes
          two genuinely different crops of the same source, both under heavy
          primary-3. If it still reads as a double on any hub, the fix is to
          drop `bgImage` from the hero rather than to go back to one shared
          picture.

          The intro CTA stays dropped: the hero one screen up carries it, and
          the navy panel below now carries it too. */}
      <section data-note="hub-intro" className="py-16 lg:py-24">
        <div className="container">
          {/* ── THE ROW IS 6/6, AND THE NUMBERS ARE WHY ────────────────────
              It was 7/5 with the tile on the short side, and measured across
              all six hubs the tile came out 250-370px TALLER than the copy
              beside it — Dental worst at 372px. The statement was floating in
              the vertical middle of a column more than twice its height, which
              is what read as unbalanced.

              Two changes, both measured rather than guessed:

               1. 7/5 → 6/6. The tile gets wider so its 90-120 word outcome
                  wraps into fewer lines; the copy gets narrower so its 60-95
                  words wrap into more. Both columns move toward each other at
                  once. Worst gap 372 → 288.
               2. The CTA moved out of the tile and onto the foot of the copy.
                  ~80px with its margin, so it swings ~160px in one edit — off
                  the tall column, onto the short one. Worst gap 288 → 118.

              Where it lands now: 21-118px apart, four of the six inside 55px.
              At that spread `items-center` is doing almost nothing and the two
              columns simply read as a pair — which is the point. If the copy
              on a hub ever changes materially, re-measure rather than assuming
              this still holds. */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="border-primary border-s-2 ps-7 lg:col-span-6 lg:ps-9">
              {/* ⚠ NOT `app.eyebrow`. The hub's eyebrow — "Application · Tool
                  & Die" — is already the chip in the hero one screen up, and
                  printing it again here put the same five words twice inside a
                  single scroll. A kicker says what KIND of block this is;
                  About's reads "About" over "The Company". Which hub you are on
                  is not in question by this point in the page. */}
              <p className="text-default-500 font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'The application')}</p>
              <h2 className="text-default-900 mt-4 text-[28px] leading-tight font-bold lg:text-[36px]">{headline}</h2>

              <RichParagraphs className="text-default-700 mt-6 text-[18px] leading-relaxed lg:text-[19px]" paragraphs={bodyParas.slice(0, 1)} />
              {bodyParas.length > 1 && <RichParagraphs className="text-default-600 mt-5 text-base leading-relaxed" paragraphs={bodyParas.slice(1)} />}

              {/* ── THE CTA MOVED HERE OUT OF THE TILE, AND IT IS A BALANCE
                      FIX AS MUCH AS A LAYOUT ONE ────────────────────────────
                  Measured across all six hubs, the tile ran 250-370px taller
                  than the copy beside it, so the statement floated in the
                  middle of a column twice its height. Widening the split from
                  7/5 to 6/6 closed most of that; this closes the rest. The
                  button is roughly 80px with its margin, so moving it swings
                  ~160px in a single edit — off the tall column and onto the
                  short one.

                  It reads better here too: the ask now follows the paragraph
                  that makes the case, and the tile is left as one thing — a
                  photograph with the argument on it — rather than a panel with
                  a button stuck to the bottom.

                  `primary` on this white ground, not the `light` variant it
                  wore on the navy tile. */}
              <div className="mt-8">
                <ArrowButton href="/contact" label={app.cta} />
              </div>
            </div>

            {/* ── THE OUTCOME, ON ITS PHOTOGRAPH ───────────────────────────
                Marc's call, and it is the site's own rule rather than an
                exception to it: the photograph IS the tile and the words sit on
                it. This carried the argument on flat brand navy with a picture
                banded across the foot, and he was right about what that reads
                as — an image added to a panel rather than a panel made of an
                image. Every other card on this site works the way this one now
                does.

                ── What makes it survive here, where it nearly did not ───────
                PhotoCard's own `heavy` scrim is built for 20-40 words and this
                panel carries 90-110. Its ramp reaches full strength too late,
                which would leave the middle lines of the outcome paragraph
                sitting in the transition — the exact failure PhotoCard's note
                describes.

                So the ramp is the same idea, moved: near-solid from the foot up
                to 58% of the tile and clearing to 15% above that, so the top of
                the frame is a photograph rather than a wash. `primary-3` and
                not black, for PhotoCard's reason — a black scrim on cool
                blue-grey footage reads as a bar laid over the picture instead
                of as shadow.

                ⚠ `pt-32 lg:pt-40` ON THE COPY IS WHAT MAKES THE PICTURE READ,
                and it is not decorative padding. `justify-end` alone is only a
                floor: these outcome paragraphs run 90-110 words, which at this
                column width is enough to fill the tile top to bottom on its
                own, and the first version did exactly that — the chip landed
                2px under the top edge and the photograph was a texture behind
                the whole block rather than something you could see. Reserving
                the top 128-160px pushes the copy down and lets the frame have a
                band of its own on every hub, whatever its word count. The tile
                grows to suit; it is a bento cell, so that is allowed.

                Contrast: every line of copy sits in the ≥90% band, which is
                effectively #1c2749, so white type measures well past 4.5:1. If
                the copy ever grows past this length, the fix is `justify-end`
                doing its job on a taller tile — not a heavier scrim, which
                would put the picture back where it started.

                ── The crop ──────────────────────────────────────────────────
                The frame is square and the tile is portrait, so cover crops
                horizontally and nothing is lost off the top or bottom.
                `object-[38%_50%]` puts the crystal and the micrometer jaw on
                the tile's centre line; plain `object-center` pushes the crystal
                off the left edge and leaves the barrel alone in the frame. */}
            <div className="rounded-card relative isolate flex min-h-[460px] flex-col justify-end overflow-hidden lg:col-span-6">
              {/* `object-center`, not the micrometer's `object-[38%_50%]`. That
                  offset existed to keep one specific crystal on the tile's
                  centre line; against six different sources it would crop an
                  arbitrary third off each one. Every hub frame is landscape
                  into a portrait tile, so cover trims the sides evenly and the
                  subject — which is centred in all six — survives. */}
              <Image
                src={applicationImage(app.slug) ?? '/eid/quality/09-digital-micrometer-diamond-measurement.png'}
                alt=""
                fill
                sizes="(min-width: 1420px) 638px, (min-width: 1024px) 48vw, 100vw"
                className="-z-20 object-cover object-center"
              />
              <span aria-hidden className="from-primary-3/97 via-primary-3/92 to-primary-3/15 absolute inset-0 -z-10 bg-linear-to-t via-58%" />

              <div className="p-7 pt-28 lg:p-9 lg:pt-32">
                {/* The chip on a dark ground: white hairline border and the
                    lightest blue for the square, which is how every navy panel
                    on this site marks itself. `border-default-300` and
                    `bg-primary` — the white-ground version — would be a grey
                    box with an invisible dot on this tile. */}
                <div className="rounded-control inline-flex w-fit items-center gap-1.5 border border-white/25 px-3.5 py-1.25">
                  <span className="bg-primary-1 size-2" />
                  <span className="text-sm text-white">{t(locale, 'Why it matters')}</span>
                </div>

                <h3 className="mt-5 text-2xl leading-snug font-bold text-white lg:text-[28px]">{app.outcome.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/85">{app.outcome.body}</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS USED ───────────────────────────────────────────────────

          The grid is unchanged — the home page's curtain tiles, revealed,
          columns following the count so a five-product hub does not strand one
          card on its own row. A carousel showed three of five grades and made a
          buyer press an arrow to find the rest, on the page where the whole
          question is "which of these do I need".

          What changed is the head of the section. It carried an eyebrow chip
          reading `productsTitle` and then a generic heading four lines below —
          the hub's own wording in the smallest type on the block, and the
          template's wording in the largest. `productsTitle` is the heading now,
          because it reads like one: "The grades dental makers use" is a
          sentence about this hub, and "The material behind your tools" was a
          sentence about any of them. */}
      <section data-note="hub-products" className="py-16 lg:py-24">
        <div className="container">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h2 className="text-[28px] font-bold md:text-[36px] lg:text-[42px]">{app.productsTitle}</h2>
            </div>
            <p className="text-default-600 lg:col-span-5">{t(locale, 'Every grade quality-controlled through our own laboratory to the same standard, every time. Tell us your application and we will recommend the right product.')}</p>
          </div>

          <div className="mt-12 lg:mt-16">
            <CurtainGrid items={productTiles} columns={productTiles.length % 4 === 0 ? 4 : 3} bento={BENTO[productTiles.length]} revealed />
          </div>

          <div className="mt-12">
            <ArrowButton href="/contact" label={app.cta} variant="dark" />
          </div>
        </div>
      </section>

      {/* ── WHY EID ─────────────────────────────────────────────────────────
          About's core-values block: a heading, a one-line subtitle under it,
          then four PhotoCards on the 7/5 - 5/7 span pattern.

          The heading and subtitle are the hub's own `why` — Uri's per-hub
          wording, which the glass card was already carrying and which keeps its
          place at the top of the section. The four claims underneath are the
          same four, in the same order; they were an accordion inside that card,
          two of them collapsed, which put a proof point behind a click on the
          page whose job is to prove things. Four photographs say them at once.

          The CTA is `whyCta` where the hub sets one — "See how our micron QC
          works" on the two hubs whose argument is micron sizing — and the
          general line where it does not. */}
      <section data-note="hub-why" className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-[28px] font-bold md:text-[34px] lg:text-[38px]">{app.why.title}</h2>
          <p className="text-default-600 mt-3 max-w-3xl text-[17px]">{app.why.body}</p>

          <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12">
            {WHY_CARDS.map((c, i) => (
              <PhotoCard key={c.title} className={SPANS[i]} minHeight="min-h-[320px] lg:min-h-[360px]" weight="heavy" eyebrow={String(i + 1).padStart(2, '0')} title={t(locale, c.title)} body={t(locale, c.desc)} image={whyMediaFor(app.slug)[i].image} alt={t(locale, whyMediaFor(app.slug)[i].alt)} />
            ))}
          </div>

          <div className="mt-12">
            <ArrowButton href="/quality" label={app.whyCta ?? t(locale, 'See how our QC works')} />
          </div>
        </div>
      </section>

      {/* ── ⚠ THE QUOTE BLOCK IS GONE FROM EVERY PAGE BUT /contact ───────
          Marc's call, applied site-wide: the eyebrow, "Request a quote or a
          sample.", the email and phone lines, and the embedded Jotform.

          It was on seven pages — this one, the application hubs, both QC pages
          and all three resources pages — which meant the site shipped the same
          cross-origin form seven times over, each instance a second full copy
          of the contact page pasted onto the foot of something else. /contact
          is the header button on every page, it is in the footer, and the
          floating WhatsApp control sits over all of it.

          Each page's own eyebrow/title/desc strings went with it. They were
          Uri's per-page wording, so if the block ever returns it returns with
          them — check this file's history rather than writing new ones. */}
      {/* CROSS-LINKS */}
      <CrossLinks
        groups={[
          { title: t(locale, 'Products for this application'), links: productLinks },
          {
            title: t(locale, 'Quality & resources'),
            links: [{ label: t(locale, 'Quality, QC & ISO 9001'), href: '/quality' }, { label: t(locale, 'Datasheets'), href: '/resources/datasheets' }, ...guideLinks],
          },
          ...(relatedHubLinks.length ? [{ title: t(locale, 'Related hub'), links: relatedHubLinks }] : []),
          {
            title: t(locale, 'Other applications'),
            links: getApplications(locale)
              .filter((o) => o.slug !== app.slug)
              .map((o) => ({ label: o.name, href: `/applications/${o.slug}` })),
          },
        ]}
      />
    </>
  )
}

export default ApplicationPage
