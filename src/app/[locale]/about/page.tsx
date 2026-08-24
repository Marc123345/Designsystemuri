import GlobeSection from '@/components/GlobeSection'
import CurtainGrid from '@/components/CurtainGrid'
import { PageHero } from '@/components/sections'
import TeamGrid from '@/components/TeamGrid'
import { SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import Image from 'next/image'
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
const aboutPillars = [
  {
    meta: 'Manufacturer, not distributor',
    title: 'We control the production and the quality decision.',
    href: '/quality',
    image: { src: '/eid/qc-inspection.jpg', alt: 'A gloved hand at the control of a digital measuring microscope, a dish of diamond grit on its stage and the crystals shown magnified and being measured on the screen above' },
  },
  {
    meta: 'Full range, one facility',
    title: 'Grit, powder and crystal, quality-controlled in-house.',
    href: '/#products',
    image: { src: '/eid/qc-samples.jpg', alt: 'A laboratory rack of sample jars receding down a shelf, the nearest holding coarse grey diamond stock and the furthest holding fine powder' },
  },
  {
    meta: 'Over 50 years',
    title: 'Half a century supplying the same kinds of tool makers.',
    href: '/about',
    image: { src: '/eid/qc-micron-sem.jpg', alt: 'Scanning electron micrograph of polycrystalline diamond micron powder at 4000x magnification, the particles uniform across the field, with the instrument’s 20 micrometre scale bar, date and lot reference along the bottom edge', position: 'object-bottom' },
  },
]

/**
 * The in-house operations, standing in for dawork's percentage skill bars.
 *
 * Every one of these is stated somewhere else on the site already — the home
 * FAQ, /quality and the product pages — so nothing here is a new claim.
 */
const facilityOperations = [
  'Crushing, shaping and sizing',
  'Sieve grading against calibrated references',
  'Electroless nickel and copper coating',
  'Metallic PVD coating',
  'Polishing, etching and CRT rounding',
  'Incoming and outgoing QC inspection',
]

/**
 * ⚠ PLACEHOLDER. Four functional roles so the layout can be reviewed — not
 * EID's org chart, and the names are deliberately absent. See the note at the
 * top of components/TeamGrid.
 */
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
      <PageHero
        eyebrow={t(locale, 'Over 50 years · the full range · made and graded in-house')}
        title={t(locale, 'About EID — Industrial Diamond Manufacturer')}
        desc={t(locale, 'EID has manufactured and quality-controlled the full industrial diamond and CBN range from London for over 50 years, supplying tool makers worldwide.')}
        crumbs={[{ label: t(locale, 'Home'), href: '/' }, { label: t(locale, 'About') }]}
        // ⚠ PLACEHOLDER. Openly-licensed stock, wide and short per Uri's note
        // that the top of this page wants a generic background picture. Swap the
        // file, not the code, when EID supplies its own.
        bgImage="/eid/home/about-hero.jpg"
      />

      {/* THE COMPANY, as one band.

          This was a four-frame pinned scroll run (ChapterRun) with a full
          duplicate of its content below it as the mobile and reduced-motion
          fallback, then a swipeable three-card production model, then a
          full-bleed dark QC block, then a wireframe photograph of the QC lab.
          About six screens, all of it before the reader reached who EID
          actually serves.

          Uri's note was that the page should be "shorter with less congestion,
          simpler and more to the point of who we are and our advantages,
          removing the qc or production steps", and that this run in particular
          should keep frames one and three, drop frame two, and merge what is
          left into one thin banner with no scrolling. That is this block.

          What came out, and why it stays out:
           - The production model cards. They set out which parts of the range
             are made from raw in London and which are made to EID's
             specification elsewhere — the same thing that came out of the home
             FAQ, and dangerous for the same reason.
           - The QC section and the QC laboratory photograph. Both belong on
             /quality, which is linked from here, the header and the footer.

          The global-reach wording Uri asked to bring across from the previous
          site now sits on the reach band at the foot of the page. */}
      {/* MANUFACTURER, NOT DISTRIBUTOR — the same shape as the three pillars
          on the home page, and the same component behind it.

          It was a pale banner with two paragraphs beside a rule-separated list
          of three. The three points are exactly the kind of parallel claim the
          curtain tiles were built for, so they use them: one card, three
          places on the site, and About stops being the page with its own
          layout vocabulary.

          No lede paragraph. The one that ran beside the heading opened "EID
          Ltd is a London-based manufacturer and finisher of industrial diamond
          and superabrasives" and closed on the distributor line — both of
          which are already said on this page: the first by the hero's own
          standfirst directly above, the second by these three cards, which is
          the whole point of them. Printing it a third time in the middle was
          the congestion Uri asked to take off this page. */}
      <section data-note="about-pillars" className="bg-default-50 py-20 lg:py-30">
        <div className="container">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="border-default-300 inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
                <span className="bg-primary size-2"></span>
                <span className="text-default-900 text-sm">{t(locale, 'Manufacturer, not distributor')}</span>
              </div>
              <h2 className="mt-4 text-[28px] font-bold md:text-[36px] lg:text-[42px]">{t(locale, 'We make the material inside the tools, not the finished tools.')}</h2>
            </div>
          </div>

          <div className="mt-14 lg:mt-18">
            <CurtainGrid items={aboutPillars.map((p) => ({ ...p, title: t(locale, p.title), meta: t(locale, p.meta), image: { ...p.image, alt: t(locale, p.image.alt) } }))} numbered />
          </div>
        </div>
      </section>

      {/* WHO WE SERVE — real buyer types and regions, no unverified figures */}
      {/* WHO WE SERVE.

          This was the heading and a single ninety-word paragraph that named
          four kinds of customer, five regions and six application areas in one
          breath. Everything in it was worth saying and none of it was findable:
          a buyer scanning for their own trade had to read the whole block to
          learn whether they were in it.

          Same words, given the structure they already had. The four customer
          types were a list inside a sentence, so they are a list now — one
          hairline grid, the idiom the team grid and the facility bento already
          use, with the geography left as the closing line because it applies to
          all four rather than to any one of them.

          Hairlines are gaps: a `gap-px` grid over a rule-coloured ground draws
          one uniform 1px line between cells, where per-cell borders double up
          on the shared edges. */}
      <section className="py-20 pt-14 lg:py-30">
        <div className="container">
          <SectionHeading eyebrow={t(locale, 'Who we serve')} title={t(locale, 'Trusted by tool makers across industries and continents.')} />

          <p className="text-default-600 mt-8 max-w-[860px] text-base">
            {t(locale, 'Our customers convert raw diamond and CBN into finished tools.')}
          </p>

          <div className="bg-default-200 mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Diamond and CBN grinding and dressing tool makers',
              'Dental bur and rotary instrument producers',
              'Ultra-precision tool makers for optics and watch components',
              'Flexible-abrasive manufacturers for glass and stone',
            ].map((who, i) => (
              <div key={who} className="flex flex-col bg-white p-7 lg:p-8">
                <span className="text-default-400 text-xs tracking-[0.2em] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-default-900 mt-4 text-[1.05rem] leading-snug">{t(locale, who)}</p>
              </div>
            ))}
          </div>

          <p className="text-default-600 mt-10 max-w-[860px] text-base">
            {t(
              locale,
              'We supply them across Europe, the Middle East, Asia, the Americas, and beyond, with the material behind dental, optics and precision components, automotive and aerospace, tool and die, stone and glass, and electronics applications.'
            )}
          </p>
        </div>
      </section>

      {/* INSIDE THE FACILITY — a bento grid.

          It was dawork's `skill-area`: a media panel on one side, a heading, a
          paragraph and a list of six on the other. Two columns, and the six
          operations reading as a bulleted afterthought beside the picture.
          They are the substance of the section — they are what "everything
          happens here" actually means — so they now get a tile each, at the
          same weight as the copy and the photography.

          The tile sizes come from what each thing needs rather than from a
          pattern: the copy block is the widest, the two portrait slots are one
          column by two rows because both images are portrait, the six
          operations are single squares because each is four words, and the
          micrograph runs as a wide band because it is a repeating field and
          crops to any strip without losing what it shows.

          Hairlines are gaps, not borders. `p-px gap-px` over a translucent
          white ground paints one uniform 1px line around and between every
          tile whatever it spans — which a per-tile border cannot do on a grid
          where cells span different numbers of tracks without doubling up on
          some edges and missing others.

          The percentage skill bars from the reference are still deliberately
          absent. They are decoration there and nobody checks them; on a page
          whose argument is that EID's figures are real and documented, an
          invented competence score is exactly what a quality department pulls
          on. These are the operations EID actually performs in-house. */}
      <section data-note="facility" className="bg-primary-3 relative isolate overflow-hidden py-20 text-white lg:py-30">
        <div className="container">
          <div className="grid auto-rows-[minmax(8rem,auto)] grid-cols-2 gap-px bg-white/12 p-px lg:auto-rows-[minmax(11.5rem,auto)] lg:grid-cols-4">
            {/* Copy — two columns wide, two rows deep. */}
            <div className="bg-primary-3 col-span-2 row-span-3 flex flex-col justify-center p-7 lg:row-span-2 lg:p-9">
              <div className="inline-flex w-fit items-center gap-1.5 border border-white/20 px-3.5 py-1.25">
                <span className="bg-primary-1 size-2"></span>
                <span className="text-sm text-white">{t(locale, 'Inside the facility')}</span>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white md:text-[28px] lg:text-[32px]">{t(locale, 'Everything that happens to the material happens here.')}</h2>

              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/70">
                {t(
                  locale,
                  'Raw material comes in, finished grades go out, and every step between them is under one roof and one quality system. That is what lets us answer a question about a lot shipped months ago.'
                )}
              </p>
            </div>

            {/* Grading in progress. The one frame we hold of a facility
                operation being carried out that is not already on this page. */}
            <div className="bg-primary-3 relative row-span-2 overflow-hidden">
              <Image
                src="/eid/qc-sieve.jpg"
                alt={t(locale, 'A technician operating a stack of laboratory test sieves beside a tray of graded grey diamond grit')}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover object-center"
              />
              <span aria-hidden className="from-primary-3/60 absolute inset-0 bg-linear-to-t to-transparent to-55%" />
            </div>

            {/* ⚠ PLACEHOLDER. The production floor itself, which EID has not
                supplied. Swap this tile for an <Image> when footage or a
                photograph lands; the cell already has its shape. */}
            <div className="bg-primary-3 relative row-span-2 overflow-hidden">
              {/* Was a wireframe waiting on production-floor footage. The
                  retention-sample shelf is the better tile anyway: it is the
                  one operation in the list you cannot photograph as an action,
                  and it is what makes the paragraph beside it — answering a
                  question about a lot shipped months ago — actually true. */}
              <Image
                src="/eid/qc-samples.jpg"
                alt={t(locale, 'A shelf of labelled retention sample jars holding graded diamond grit, kept from every batch')}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <span aria-hidden className="from-primary-3/60 absolute inset-0 bg-linear-to-t to-transparent to-55%" />
            </div>

            {/* `contents` keeps these six as one list to a screen reader while
                letting each <li> be a grid cell in its own right. A wrapping
                <ul> would otherwise take a single cell and put the six back
                inside it, which is the layout this section came from. */}
            <ul className="contents">
              {facilityOperations.map((op) => (
                <li key={op} className="bg-primary-3 flex flex-col justify-end p-5 lg:p-6">
                  <span aria-hidden className="bg-primary-1 mb-4 size-2 shrink-0" />
                  <span className="text-[0.95rem] leading-snug text-white/85">{t(locale, op)}</span>
                </li>
              ))}
            </ul>

            {/* The material itself, closing the row: coated and CRT-rounded
                crystal, which is two of the six operations above in one frame.
                A repeating field, so the wide crop costs nothing. */}
            <div className="bg-primary-3 relative col-span-2 overflow-hidden">
              <Image
                src="/eid/surface-enhancements.jpg"
                alt={t(locale, 'Scanning electron micrograph of surface-enhanced diamond crystal, coated and CRT-rounded, at 33x magnification')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* THE TEAM — dawork's `team-area`. Placeholder portraits and placeholder
          roles; see the note in components/TeamGrid before this ships. */}
      <section data-note="team" className="py-20 lg:py-30">
        <div className="container">
          <SectionHeading
            eyebrow={t(locale, 'The people')}
            title={t(locale, 'You will be dealing with someone who works with the material.')}
            desc={t(locale, 'A small team, reachable directly. The person who answers your specification question is the person who grades against it.')}
          />

          <div className="mt-14">
            <TeamGrid members={team} />
          </div>
        </div>
      </section>

      {/* REACH — the regions named above, made visible: London hub with arcs
          out to the continents EID ships to.

          The closing quote block that used to follow this is gone. There is
          already a Contact button in the "Trusted by tool makers" section a
          screen above, and a second ask below the globe was the third
          conversion prompt on one page. */}
      <GlobeSection
        eyebrow={t(locale, 'Where our material ships')}
        title={t(locale, 'From one London facility to five continents.')}
        desc={t(locale, 'With its headquarters in London, England, and worldwide marketing partners, E.I.D has established a global reputation for quality, consistency and superior service. Today E.I.D has customers on every continent. Our sales team speaks more than ten dialects, but we all speak the same language — the right product at the right price, when and where you require it.')}
      />
    </>
  )
}

export default AboutPage
