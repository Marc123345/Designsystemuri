import PhotoCard from '@/components/PhotoCard'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'

const CONTROLS = [
  {
    n: '01',
    label: 'Size & Morphology: Mesh',
    image: '/eid/qc-sieve.jpg',
    alt: 'A technician operating a stack of laboratory test sieves beside a tray of graded grey diamond grit',
  },
  {
    n: '02',
    label: 'Size & Morphology: Micron',
    image: '/eid/quality/03-sample-preparation-pipette.png',
    alt: 'A gloved hand pipetting into a test tube of micron diamond powder, a centrifuge on the bench behind',
  },
  {
    n: '03',
    label: 'Advanced Chemical Cleaning',
    image: '/eid/surface-enhancements.jpg',
    alt: 'Electron micrograph showing treated diamond surface morphology',
  },
  {
    n: '04',
    label: 'Toughness (TI / TTI)',
    image: '/eid/quality/01-automated-hardness-test-station.png',
    alt: 'An automated impact test station with its indenter lowered over the guarded sample stage',
  },
] as const

export default function QualityControlsStrip({ locale }: { locale: Locale }) {
  return (
    <section data-note="qc-strip" className="relative isolate overflow-hidden bg-default-50 py-12 lg:py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-primary-3 text-[34px] leading-none font-bold tracking-[-0.035em] md:text-[44px] lg:text-[52px]">
            {t(locale, 'Quality Control')}
          </h2>
          <p className="text-default-600 mx-auto mt-3 max-w-3xl text-[15px] leading-relaxed md:text-base">
            {t(locale, 'At E.I.D, every single batch of diamond and CBN powder undergoes strict laboratory validation to guarantee total product consistency, lot after lot.')}
          </p>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {CONTROLS.map((control) => (
            <PhotoCard
              key={control.n}
              image={control.image}
              alt={t(locale, control.alt)}
              eyebrow={control.n}
              title={t(locale, control.label)}
              minHeight="min-h-[220px] lg:min-h-[245px]"
            />
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <ArrowButton href="/quality" label={t(locale, 'Explore our QC')} />
        </div>
      </div>
    </section>
  )
}
