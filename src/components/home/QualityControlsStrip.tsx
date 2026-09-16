import CanvasField from '@/components/CanvasField'
import PhotoCard from '@/components/PhotoCard'
import { ArrowButton, Eyebrow } from '@/components/ui'
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

/**
 * Uri's review is explicit about this block: the four controls are a set, not a
 * sequence. A buyer should be able to see all four without swiping or pressing
 * an arrow, so the homepage now uses the same static scan-first logic as the
 * product and application grids around it.
 */
export default function QualityControlsStrip({ locale }: { locale: Locale }) {
  return (
    <section data-note="qc-strip" className="relative isolate overflow-hidden py-14 lg:py-18">
      <CanvasField density="fine" mark="start" />
      <div aria-hidden className="bg-primary/7 pointer-events-none absolute left-1/2 top-[62%] -z-10 h-[400px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[135px]" />

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{t(locale, 'Quality control')}</Eyebrow>
          <h2 className="mt-4 text-[24px] font-bold text-balance md:text-[30px] lg:text-[34px]">{t(locale, 'Every lot is tested four ways before it ships.')}</h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {CONTROLS.map((control) => (
            <PhotoCard
              key={control.n}
              image={control.image}
              alt={t(locale, control.alt)}
              eyebrow={control.n}
              title={t(locale, control.label)}
              minHeight="min-h-[230px] lg:min-h-[260px]"
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <ArrowButton href="/quality" label={t(locale, 'Explore our QC')} />
        </div>
      </div>
    </section>
  )
}
