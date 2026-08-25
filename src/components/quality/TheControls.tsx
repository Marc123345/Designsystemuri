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
 *   01 → the sieve stack. What the control is.
 *   02 → micron SEM with the distribution visible. What the control produces.
 *   03 → see the warning below.
 *   04 → no photograph, deliberately.
 *
 * ⚠ 03 is the one that is approximate, and it is worth knowing why rather than
 * discovering it later. The control is chemical cleaning, and no before/after
 * cleaning frame exists in the library. It previously carried
 * /eid/qc-batch-to-batch.jpg under alt text reading "cleaned diamond crystals
 * against a 1 micron scale bar" — but that file is a two-panel comparison of
 * two production lots, so the alt described a picture that was not there, and
 * the frame is now doing its proper job in the mosaic. What is here instead is
 * a genuine EID micrograph of crystal surfaces at X33 with the instrument's
 * own data bar in it. It is a picture of surfaces being examined, which is
 * nearer to the control than a lot comparison was, and the alt text describes
 * the photograph rather than the claim. A real fix is one frame: the same
 * material before and after the wash.
 *
 * ⚠ 04 has no photograph because the T.I. milling and crush chamber shot does
 * not exist. PhotoCard fills it with brand navy, which reads as the deliberate
 * odd tile rather than as a missing asset — and it happens to land on the one
 * control that is optional rather than run on every batch. Drop a file in and
 * it becomes a photograph with no other change.
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
    image: '/eid/qc-sieve.jpg',
    alt: 'A technician operating a stack of laboratory test sieves beside a tray of graded diamond grit',
  },
  {
    n: '02',
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
    title: 'Advanced Chemical Cleaning',
    points: [
      ['Targeted impurity removal', 'Chemical washing strips surface impurities, processing dust and metallic residues where high purity is required.'],
      ['Surface purity control', 'The treatment clears crystal surfaces, allowing better bond adhesion during tool manufacturing.'],
      ['Visual purity inspection', 'Optical checks under the microscope confirm the cleaned material is consistent.'],
    ],
    image: '/eid/surface-enhancements.jpg',
    alt: 'Scanning electron micrograph of diamond crystal surfaces at 33x magnification, the instrument data bar showing a 100 micron scale',
  },
  {
    n: '04',
    title: 'Toughness (TI / TTI)',
    note: 'Optional — the three controls above run on every batch; this one is by request.',
    points: [
      ['Toughness Index (TI)', 'A room-temperature milling test that measures how the crystal breaks down under impact. For high-impact work where size and shape alone do not predict tool life.'],
      ['Thermal Toughness Index (TTI)', 'The same measurement after a heat cycle, for crystals that have to survive the temperatures of tool manufacturing.'],
    ],
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
