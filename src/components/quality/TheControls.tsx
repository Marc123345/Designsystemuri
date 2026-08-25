import PhotoCard from '@/components/PhotoCard'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * The four controls, in About's core-values layout.
 *
 * Same block as CoreValues: a heading, a one-line subtitle under it, then four
 * PhotoCards on a 7/5 - 5/7 span pattern so no two adjacent tiles share a
 * width and the row break moves. Same tile heights, same eyebrow numerals.
 *
 * ── What is kept from the previous version of this page ─────────────────────
 *
 * The four controls and every bullet in them are Uri's, from §4 of the written
 * spec, and are unchanged. The disclosure is kept too: collapsed, each card is
 * a photograph, a number, a title and a count, which is what lets four cards
 * carrying three and four bullet pairs each sit in the same grid as About's
 * four one-paragraph values. Expanded, the bullets are all still there.
 *
 * ── The subtitle does real work ─────────────────────────────────────────────
 *
 * "Three run on every batch. The fourth is by request." That sentence is the
 * one thing about this section a buyer can get wrong, and it belongs above the
 * grid rather than only inside card 04, because the mosaic a screen up says
 * "4 laboratory controls" and someone skimming will carry that number down
 * here. Card 04 still carries its own note for anyone who lands on it directly.
 *
 * ── The photographs ─────────────────────────────────────────────────────────
 *
 *   01 → grit on a precision balance. See the note below.
 *   02 → sample prep for sedimentation, centrifuge behind.
 *   03 → the chemical rinse itself.
 *   04 → the impact test station.
 *
 * ⚠ 04 FINALLY HAS ONE. This slot has been brand navy since the page was
 * built, because the T.I. milling and crush chamber shot did not exist and a
 * navy tile reads as a deliberate odd card rather than a missing asset. The
 * automated impact station is that shot: an indenter over a guarded stage,
 * which is what a toughness test looks like. The card is no longer the odd one
 * out, so if the grid ever wants a deliberate break again it has to come from
 * somewhere else.
 *
 * ⚠ 01 IS THE APPROXIMATE ONE NOW, and the weak link in the set. This control
 * is mesh sizing — test sieves, shape-sorting tables, Image Pro. A balance
 * weighing grit is not sizing it; it is the nearest of the seven new frames
 * because it at least shows graded grit as the subject. The frame it replaced
 * was a technician actually operating a stack of test sieves, which is the
 * control exactly. That file, /eid/qc-sieve.jpg, is still on disk and still
 * the better picture for this card. Worth putting back if a sieve frame is
 * not commissioned in the new style.
 */
const CONTROLS = [
  {
    n: '01',
    title: 'Size & Morphology: Mesh',
    points: [
      ['Precision size separation', 'Mechanical test sieves separate and sort diamond grit into uniform sizes.'],
      ['Morphological sorting', 'Automated shape-sorting tables separate the different crystal shapes — from sharp, fast-cutting grains to tough, blocky crystals.'],
      ['Visual microscope check', 'Microscope checks run throughout production to monitor batch appearance, colour consistency, crystal structure and general uniformity.'],
      ['Image Pro validation', 'Final batches are processed through image analysis software, documenting size distribution and shape factor together.'],
    ],
    image: '/eid/quality/06-precision-scale-diamond-grit.png',
    alt: 'A dish of diamond grit on a precision balance reading 0.0456 grams, with a microscope on the bench behind',
  },
  {
    n: '02',
    title: 'Size & Morphology: Micron',
    points: [
      ['Advanced particle separation', 'Sedimentation and centrifugation classify micron and sub-micron sizes.'],
      ['Malvern PSD reporting', 'Every lot is measured on Malvern particle size distribution equipment, generating a distribution curve.'],
      ['SEM verification', 'Scanning electron microscopy inspects final grain morphology and confirms the absence of oversized or undersized particles.'],
    ],
    image: '/eid/quality/03-sample-preparation-pipette.png',
    alt: 'A gloved hand pipetting into a test tube of micron diamond powder, a centrifuge on the bench behind',
  },
  {
    n: '03',
    title: 'Advanced Chemical Cleaning',
    points: [
      ['Targeted impurity removal', 'Chemical washing strips surface impurities, processing dust and metallic residues where high purity is required.'],
      ['Surface purity control', 'The treatment clears crystal surfaces, allowing better bond adhesion during tool manufacturing.'],
      ['Visual purity inspection', 'Optical checks under the microscope confirm the cleaned material is consistent.'],
    ],
    image: '/eid/quality/10-chemical-rinse-beaker-diamonds.png',
    alt: 'Diamond crystals suspended in a beaker of clear chemical rinse under a fume hood',
  },
  {
    n: '04',
    title: 'Toughness (TI / TTI)',
    note: 'Optional — the three controls above run on every batch; this one is by request.',
    points: [
      ['Toughness Index (TI)', 'A room-temperature milling test that measures how the crystal breaks down under impact. For high-impact work where size and shape alone do not predict tool life.'],
      ['Thermal Toughness Index (TTI)', 'The same measurement after a heat cycle, for crystals that have to survive the temperatures of tool manufacturing.'],
    ],
    image: '/eid/quality/01-automated-hardness-test-station.png',
    alt: 'An automated impact test station, its indenter lowered over the sample stage inside a guarded enclosure',
  },
] as const

/* About's spans exactly: 7/5 alternating, inverted on the second row. */
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

const COUNT_LABEL = ['', '', 'Two checks', 'Three checks', 'Four checks']

const TheControls = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="qc-controls" className="py-16 lg:py-24">
      <div className="container">
        <h2 className="text-[28px] font-bold md:text-[34px] lg:text-[38px]">{t(locale, 'The four controls')}</h2>
        <p className="text-default-600 mt-3 max-w-2xl text-[17px]">
          {t(locale, 'Three run on every batch. The fourth is by request, for work where size and shape alone do not predict tool life.')}
        </p>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12">
          {CONTROLS.map((c, i) => (
            <PhotoCard
              key={c.n}
              className={SPANS[i]}
              minHeight="min-h-[340px] lg:min-h-[380px]"
              /* ⚠ `heavy`, and it is a legibility fix rather than a look.
                 These cards ran on the light scrim while they carried the old
                 photographs, which were dark: a sieve stack in shadow, two grey
                 micrographs, and a card with no image at all. The new set is
                 bright — a lit balance, a white lab bench, a beaker under a
                 fume hood, a blue-lit test cell — and under the light scrim the
                 11px eyebrow numerals measured 1.87-2.25:1 against the brightest
                 part of each frame, failing 1.4.3 on all four cards at once.

                 Swapping a photograph is never only a content change. If these
                 images are replaced again, re-measure before assuming the scrim
                 still covers. */
              weight="heavy"
              collapsible
              disclosureLabel={t(locale, COUNT_LABEL[c.points.length])}
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
  )
}

export default TheControls
