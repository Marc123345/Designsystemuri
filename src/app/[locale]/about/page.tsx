import GlobeSection from '@/components/GlobeSection'
import AboutMosaic from '@/components/about/AboutMosaic'
import CoreValues from '@/components/about/CoreValues'
import TheCompany from '@/components/about/TheCompany'
import VideoHero from '@/components/VideoHero'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'About EID | Industrial Diamond Manufacturer, London' },
    description: 'EID has manufactured and quality-controlled the full industrial diamond and CBN range since 1970, supplying tool makers on five continents from its London headquarters.',
    alternates: localeAlternates(locale, '/about'),
  }
}

/**
 * The three points that separate EID from a distributor, as curtain tiles.
 *
 * Each picture has to be the thing its card claims, and two of the three were
 * not:
 *
 *  - 01 carried the wide shot of the metrology room. That frame is measurement
 *    benches, which is neither production nor a decision, and it is already the
 *    plate beside the home-page FAQ. It is now the instrument with EID material
 *    on the stage and a hand on the control — the quality decision being taken,
 *    which is what the card says.
 *  - 02 carried a single micrograph of one coated crystal to illustrate "grit,
 *    powder and crystal". One of three is not a range. The sample rack is the
 *    only frame in the library that shows one: coarse stock at the front
 *    graduating to fine powder down the shelf, on one set of shelves.
 *
 * ⚠ 03 is the one that cannot be made accurate from what we hold. Nothing here
 * depicts fifty years — no photograph does. It keeps a genuine EID micrograph
 * with the instrument's own stamp in it (magnification, scale bar, date and lot
 * reference), which is at least the kind of record half a century of the same
 * practice leaves behind, and the alt text describes the picture rather than
 * the claim. What would actually fix it is an archive frame: the London
 * building, an early grading ledger, or a part from a customer who has been
 * buying since the seventies.
 *
 * /eid/surface-enhancements.jpg is no longer used anywhere after this change.
 * It is a real EID SEM and worth keeping on disk for /quality.
 */
/**
 * SHELVED, NOT DELETED. Uri's F2 note on the people section is "remove it for
 * now, but shelve the design — it may come back". So the table stays and the
 * section that consumed it does not; putting it back is one JSX block plus the
 * TeamGrid import, both of which still resolve.
 *
 * Delete this only if he decides against it outright.
 *
 * ⚠ PLACEHOLDER contents. Four functional roles so the layout can be reviewed
 * — not EID's org chart, and the names are deliberately absent. See the note
 * at the top of components/TeamGrid.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const team = [
  { role: 'Managing Director', photoLabel: 'Portrait — Managing Director' },
  { role: 'Technical Sales', photoLabel: 'Portrait — Technical Sales' },
  { role: 'Quality Manager', photoLabel: 'Portrait — Quality Manager' },
  { role: 'Production Manager', photoLabel: 'Portrait — Production Manager' },
]

const AboutPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      {/* The same hero system as the home page, one step shorter.

          It was a PageHero: a photographic band with the type laid over it,
          which is the arrangement the home page moved away from. Two heroes
          built on two different systems is how the interior pages drifted
          before the V1 pass, so About now runs the shared VideoHero and the
          two can only change together.

          ── The film ──
          A different clip from the home page — an animated wireframe diamond
          on brand blue rather than the laboratory footage. It suits About for
          a reason beyond variety: this page is about the company rather than
          the work, so an abstract mark is honest where a photograph of a
          process would be borrowed.

          ── Shorter, and no supporting line ──
          48svh against the home page's 60. About's job is to reach The Company
          block quickly, and the heading carries the page on its own — the
          paragraph that used to sit here ("EID has manufactured and
          quality-controlled the full range since 1970...") restated in the
          hero what The Company block says properly two sections later.

          `object-center` rather than the home page's upward bias, because this
          composition is centred by construction.

          ── Two corrections carried over from the old hero copy ──
          The eyebrow said "made and graded in-house" and the lede said the
          range is manufactured "from London". Uri's F1/F2 note is explicit
          that London is the sales headquarters and that "manufacturing in UK,
          London" is wrong wherever it appears, so the sentence no longer
          places manufacture anywhere. "Over 50 years" became "Since 1970",
          which is the anniversary his approved home-page hero copy uses. */}
      <VideoHero
        title={t(locale, 'About EID — Industrial Diamond Manufacturer')}
        video="https://ik.imagekit.io/qcvroy8xpd/EID%20NEW.mp4"
        poster="https://ik.imagekit.io/qcvroy8xpd/EID%20NEW.mp4/ik-thumbnail.jpg?tr=so-3"
        minHeight="min-h-[48svh]"
        objectPosition="object-center"
      />

      {/* ── WHAT CAME OUT OF THIS PAGE, AND WHY ─────────────────────────
          Three whole sections stood between the hero and the reach block. All
          three are gone on Uri's F1/F2 note, whose one-line summary of this
          page was "shorter, less congestion, simpler, more to the point of who
          we are and our advantages".

           · WHO WE SERVE — six industry hub cards under a ninety-word customer
             sentence. His words: "very vague … doesn't give much". The same six
             hubs are on the home page and in the mega-menu, so nothing became
             unreachable.

           · INSIDE THE FACILITY — a four-slide run through sieving, Malvern
             PSD, microscope checks and SEM morphology. That is the Quality
             page, made twice; his note is that QC and production-step content
             belongs there and only there. /quality is linked from the header,
             the footer and the reach block below.

           · THE PEOPLE — the team grid. "Remove for now, but shelve it": he is
             undecided rather than against. TeamGrid and the `team` table are
             left in the tree intact so putting it back is one JSX block, not a
             rebuild.

          What replaces them is what he asked for by name off Strauss: a
          numbers strip lengthways under the intro, then core values. The
          heritage wording from the old site stays where it already is, on the
          reach block — merging it there is the "one thin banner, no scrolling"
          he asked for, and it lands directly above the closing CTA. */}
      {/* Strauss's About, in their order: the company statement, the numbers,
          vision and mission, then the values. Uri asked for the numbers strip
          and the values off their page by name; these are the two blocks
          between them that make the sequence work — a page that opens on four
          figures is a page that has asserted before it has said anything. */}
      <TheCompany />

      {/* The numbers, the photographs and the two statements are ONE block, not
          three stacked rows — which is the thing that is easy to get wrong
          about Strauss's page. See the diagram at the top of AboutMosaic. */}
      <AboutMosaic />

      <CoreValues />

      {/* REACH — the regions named above, made visible: London hub with arcs
          out to the continents EID ships to.

          The closing quote block that used to follow this is gone. There is
          already a Contact button in the "Trusted by tool makers" section a
          screen above, and a second ask below the globe was the third
          conversion prompt on one page. */}
      <GlobeSection
        eyebrow={t(locale, 'Where our material ships')}
        title={t(locale, 'From our own facilities to five continents.')}
        /* The heritage wording that used to sit here has moved to TheCompany
           at the top of the page, which is where a company statement belongs.
           Repeating it at the foot would have been the same paragraph twice on
           one screen of scrolling. What is left is the sentence this section
           actually needs: where the material goes. */
        desc={t(locale, 'Sales and technical support run from London. Manufacturing, grading and QC run through our own facilities to one specification, and the material ships to tool makers on five continents.')}
      />

      {/* White between the reach band and the footer.

          Without it the two rounded edges meet with nothing between them, and a
          24px curve against another dark block at zero distance still reads as
          a notch rather than as a corner — the radius needs some of the page's
          own ground visible to be legible as a radius.

          This is a spacer rather than padding on either neighbour on purpose:
          GlobeSection does not know what follows it, and the footer is on every
          page, most of which end on white and need nothing. */}
      <div aria-hidden className="h-16 lg:h-24" />
    </>
  )
}

export default AboutPage
