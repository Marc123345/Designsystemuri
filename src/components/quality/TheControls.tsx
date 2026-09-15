import EvidencePanel from '@/components/EvidencePanel'
import PhotoCard from '@/components/PhotoCard'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

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
    image: '/eid/surface-enhancements.jpg',
    alt: 'Electron micrograph showing treated diamond surface morphology',
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

const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-5']
const COUNT_LABEL = ['', '', 'Two checks', 'Three checks', 'Four checks']

const TheControls = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="qc-controls" className="py-16 lg:py-24">
      <div className="container">
        <EvidencePanel className="px-5 py-9 sm:px-7 sm:py-11 lg:px-10 lg:py-12 xl:px-12">
          <h2 className="mx-auto max-w-3xl text-center text-[28px] font-bold text-white text-balance md:text-[34px] lg:text-[38px]">
            {t(locale, 'The four controls')}
          </h2>

          <div className="mt-10 grid gap-5 sm:gap-6 lg:mt-12 lg:grid-cols-12">
            {CONTROLS.map((c, i) => (
              <PhotoCard
                key={c.n}
                className={`${SPANS[i]} ring-2 ring-white/85`}
                minHeight={i === 3 ? 'min-h-[260px] lg:min-h-[280px]' : 'min-h-[340px] lg:min-h-[380px]'}
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
        </EvidencePanel>
      </div>
    </section>
  )
}

export default TheControls
