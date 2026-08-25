import { PageHero } from '@/components/sections'
import PhotoCard from '@/components/PhotoCard'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Quality Control & Laboratory Standards | EID Ltd' },
    description:
      'Every batch of EID diamond and CBN powder undergoes laboratory validation — sieve and micron sizing, morphology, chemical cleaning and optional toughness testing — against FEPA, ISO 6106 and ANSI standards.',
    alternates: localeAlternates(locale, '/quality'),
  }
}

/**
 * The four controls, as Uri specified them.
 *
 * Two notes on how they are rendered.
 *
 * The spec heads each card with an emoji. The rest of this site has none, and
 * uses Iconify throughout — a line icon carries the same "here is the marker
 * for this card" job in the register the page is already written in. Swap the
 * `icon` values for the emoji if that reads better on review; nothing else
 * changes.
 *
 * Every card names the photograph it wants. Three of the four already exist in
 * the library and are wired in. The fourth — the T.I. milling and crush chamber
 * — does not, so that slot is a labelled Wireframe naming the shot, the same
 * placeholder the rest of the site uses for an outstanding asset.
 */
const controls = [
  {
    n: '01',
    icon: 'tabler:ruler-measure',
    title: 'Size & Morphology: Mesh',
    points: [
      ['Precision size separation', 'Mechanical test sieves separate and sort diamond grit into uniform sizes.'],
      ['Morphological sorting', 'Automated shape-sorting tables separate the different crystal shapes — from sharp, fast-cutting grains to tough, blocky crystals.'],
      ['Visual microscope check', 'Microscope checks run throughout production to monitor batch appearance, colour consistency, crystal structure and general uniformity.'],
      ['Image Pro validation', 'Final batches are processed through image analysis software, documenting size distribution and shape factor together.'],
    ],
    image: '/eid/qc-sieve.jpg',
    alt: 'A technician operating a stack of laboratory test sieves beside a tray of graded diamond grit',
  },
  {
    n: '02',
    icon: 'tabler:microscope',
    title: 'Size & Morphology: Micron',
    points: [
      ['Advanced particle separation', 'Sedimentation and centrifugation classify micron and sub-micron sizes.'],
      ['Malvern PSD reporting', 'Every lot is measured on Malvern particle size distribution equipment, generating a distribution curve.'],
      ['SEM verification', 'Scanning electron microscopy inspects final grain morphology and confirms the absence of oversized or undersized particles.'],
    ],
    image: '/eid/qc-micron-sem.jpg',
    alt: 'Scanning electron micrograph of micron diamond powder with the particle size distribution visible',
  },
  {
    n: '03',
    icon: 'tabler:droplet',
    title: 'Advanced Chemical Cleaning',
    points: [
      ['Targeted impurity removal', 'Chemical washing strips surface impurities, processing dust and metallic residues where high purity is required.'],
      ['Surface purity control', 'The treatment clears crystal surfaces, allowing better bond adhesion during tool manufacturing.'],
      ['Visual purity inspection', 'Optical checks under the microscope confirm the cleaned material is consistent.'],
    ],
    image: '/eid/qc-batch-to-batch.jpg',
    alt: 'Scanning electron micrograph of cleaned diamond crystals against a 1 micron scale bar',
  },
  {
    n: '04',
    icon: 'tabler:hammer',
    title: 'Toughness (TI / TTI)',
    note: 'Optional — the three controls above run on every batch; this one is by request.',
    points: [
      ['Toughness Index (TI)', 'A room-temperature milling test that measures how the crystal breaks down under impact. For high-impact work where size and shape alone do not predict tool life.'],
      ['Thermal Toughness Index (TTI)', 'The same measurement after a heat cycle, for crystals that have to survive the temperatures of tool manufacturing.'],
    ],
  },
] as const

const QualityPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'Quality control')}
        title={t(locale, 'Our Quality Control & Laboratory Standards')}
        desc={t(
          locale,
          'At E.I.D, every single batch of diamond and CBN powder undergoes strict laboratory validation to guarantee total product consistency, lot after lot. Our QC is built into every stage, from raw material selection through grading, crushing, chemical cleaning, coating and final inspection, and the in-house QC laboratory is the backbone of everything we ship.'
        )}
        /* Back to the laboratory, and this time it is the right call for a
           reason that did not exist before: the copy is centred now.

           The loupe photograph is 725x1080. In a landscape frame `object-cover`
           scales it to fill the width, which leaves no horizontal slack at all,
           so `object-position` cannot move it sideways — the grader's face is
           locked to the middle of the frame, which is exactly where the mark
           and the eyebrow badge now sit. It read as a sticker on her face.

           This one is 1376x768 with the technician right of centre, so the
           column lands on the bench rather than on anybody. It was rejected
           earlier for washing out, but that was against a scrim totalling ~70%
           over the middle of the frame; at the current weight it holds. */
        bgImage="/eid/qc-lab.jpg"
      />

      {/* COMPLIANCE — one thin strip, not a section. Both statements are
          credentials rather than an argument, so they sit on a single rule
          under the hero and take a line each on a phone. */}
      <div className="border-default-200 border-b">
        <div className="container flex flex-wrap items-center gap-x-10 gap-y-3 py-5">
          <span className="text-default-600 text-sm">
            {t(locale, 'All laboratory testing is compliant with international FEPA, ISO 6106 and ANSI standards.')}
          </span>
          <span className="border-default-300 text-default-900 rounded-control ms-auto inline-flex items-center gap-2 border px-3 py-1.5 text-xs tracking-[0.18em] uppercase">
            <span className="bg-primary size-2" aria-hidden />
            {t(locale, 'ISO 9001:2015 certified')}
          </span>
        </div>
      </div>

      {/* ── THE FOUR CONTROLS, AS A BENTO ────────────────────────────────────
          This was a SplitSlider: one control at a time, full-width photograph
          on one side, its bullets on the other, advanced by arrows.

          Two problems with that, and the second is the one that matters.

          It hid three quarters of the page. Uri's F3 note is that a buyer has
          to reach the four controls immediately and see them — "if they don't
          see these four buttons, they're going to miss it fully" — and a slider
          answers that by showing exactly one. Everything about this page is
          organised around the four controls being the thing you came for; they
          cannot be behind a control most readers never touch.

          And it broke the rule. Images are full cover with the text over them,
          everywhere on this site. The slider put the photograph beside its copy,
          which made it the one block on the site working the other way round.

          So: four cards, all visible, 7/5 then 5/7. No two adjacent tiles share
          a width and the row break moves, which is what makes it a composition
          rather than a 2x2. `weight="heavy"` on all four because these carry
          three and four bullet pairs each — far more copy than a value card —
          and the scrim has to cover accordingly.

          Card 04 has no photograph: the T.I. milling and crush chamber shot does
          not exist in the library. PhotoCard fills it with brand navy instead,
          which reads as the deliberate odd tile rather than as a missing asset —
          and it happens to suit the one control that is optional rather than run
          on every batch. Drop a file in and it becomes a photograph with no
          other change. */}
      <section data-note="qc-controls" className="py-14 lg:py-20">
        <div className="container">
          {/* Equal 2x2, not a bento. With the checks collapsed every card
              carries the same amount of visible copy — a number, a title and a
              disclosure — so unequal spans would be decoration rather than
              hierarchy. These are four controls of equal standing; three run on
              every batch and one is by request, and that distinction is made in
              the card rather than by making it a different size.

              It also means all four photographs get the same amount of room,
              which they did not when one tile was 7 columns and its neighbour
              5. */}
          <div className="grid gap-6 md:grid-cols-2">
            {controls.map((c) => (
              <PhotoCard
                key={c.n}
                minHeight="min-h-[380px] lg:min-h-[440px]"
                weight="light"
                collapsible
                disclosureLabel={t(locale, c.points.length === 2 ? 'Two checks' : c.points.length === 3 ? 'Three checks' : 'Four checks')}
                eyebrow={c.n}
                title={t(locale, c.title)}
                points={c.points.map(([label, body]) => [t(locale, label), t(locale, body)] as const)}
                note={'note' in c && c.note ? t(locale, c.note) : undefined}
                image={'image' in c ? c.image : undefined}
                alt={'alt' in c ? t(locale, c.alt) : ''}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The "Test our consistency" CTA that closed this page is gone on Marc's
          call. Worth knowing it was in Uri's written spec (§4 of the V1 doc), so
          if it comes back it comes back with his wording.

          Nothing is orphaned by removing it: /contact is the header button on
          every page, it is in the footer, and the floating WhatsApp control sits
          over this page too. */}
    </>
  )
}

export default QualityPage
