import EvidencePanel from '@/components/EvidencePanel'
import PhotoCard from '@/components/PhotoCard'
import ScrollReveal from '@/components/ScrollReveal'
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

const COUNT_LABEL = ['', '', 'Two checks', 'Three checks', 'Four checks']
const LEFT = [0, 2] as const
const RIGHT = [1, 3] as const

const TheControls = () => {
  const locale = useLocale() as Locale

  const card = (index: 0 | 1 | 2 | 3) => {
    const control = CONTROLS[index]
    return (
      <PhotoCard
        className="ring-2 ring-white/85 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.7)]"
        minHeight={index === 3 ? 'min-h-[320px] lg:min-h-[390px]' : 'min-h-[350px] lg:min-h-[430px]'}
        weight="heavy"
        collapsible
        disclosureLabel={t(locale, COUNT_LABEL[control.points.length])}
        eyebrow={control.n}
        title={t(locale, control.title)}
        points={control.points.map(([label, body]) => [t(locale, label), t(locale, body)] as const)}
        note={'note' in control && control.note ? t(locale, control.note) : undefined}
        image={control.image}
        alt={t(locale, control.alt)}
      />
    )
  }

  return (
    <section data-note="qc-controls" className="py-16 lg:py-24">
      <div className="container">
        <EvidencePanel className="px-5 py-9 sm:px-7 sm:py-11 lg:px-8 lg:py-10 xl:px-10">
          {/* Mobile/tablet: straightforward reading order. */}
          <div className="lg:hidden">
            <h2 className="mx-auto max-w-3xl text-center text-[28px] font-bold text-white text-balance md:text-[34px]">
              {t(locale, 'The four controls')}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {CONTROLS.map((_, index) => (
                <ScrollReveal key={CONTROLS[index].n} delay={index * 0.04}>
                  {card(index as 0 | 1 | 2 | 3)}
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Desktop: two moving evidence columns orbit a pinned centre spine,
              borrowing the 4/4/4 sticky gallery from the supplied reference. */}
          <div className="hidden items-start gap-6 lg:grid lg:grid-cols-12">
            <div className="col-span-4 space-y-[28vh] pb-[22vh]">
              {LEFT.map((index) => (
                <ScrollReveal key={CONTROLS[index].n}>{card(index)}</ScrollReveal>
              ))}
            </div>

            <div className="eid-sticky-viewport col-span-4 flex items-center justify-center px-2">
              <div className="rounded-card w-full border border-white/18 bg-white/[0.07] px-7 py-10 text-center shadow-[0_24px_80px_-38px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                <p className="font-mono text-[10px] tracking-[0.24em] text-white/55 uppercase">{t(locale, 'Quality control')}</p>
                <h2 className="mt-4 text-[38px] leading-[0.98] font-bold tracking-[-0.035em] text-white text-balance xl:text-[46px]">
                  {t(locale, 'The four controls')}
                </h2>

                <div aria-hidden className="mx-auto mt-9 flex max-w-[220px] items-center justify-between">
                  {CONTROLS.map((control, index) => (
                    <div key={control.n} className="flex items-center">
                      <span className="rounded-control flex size-9 items-center justify-center border border-white/25 bg-white/8 font-mono text-[10px] font-semibold text-white/82">
                        {control.n}
                      </span>
                      {index < CONTROLS.length - 1 && <span className="mx-1 h-px w-4 bg-white/20 xl:w-6" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-4 space-y-[28vh] pt-[24vh] pb-[22vh]">
              {RIGHT.map((index) => (
                <ScrollReveal key={CONTROLS[index].n}>{card(index)}</ScrollReveal>
              ))}
            </div>
          </div>
        </EvidencePanel>
      </div>
    </section>
  )
}

export default TheControls
