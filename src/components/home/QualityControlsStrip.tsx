import { ArrowButton, Eyebrow } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import Image from 'next/image'

/**
 * The four QC controls, now back on photography.
 *
 * The outer shell stays properly rounded with the site's 24px card radius.
 * Inside it, the navy title panel keeps the distinctive diagonal cut from the
 * reference treatment. That lets the card feel specific without making the
 * whole image silhouette look accidentally clipped.
 */
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
    <section data-note="qc-strip" className="relative isolate py-14 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{t(locale, 'Quality control')}</Eyebrow>
          <h2 className="mt-4 text-[24px] font-bold text-balance md:text-[30px] lg:text-[34px]">{t(locale, 'Every lot is tested four ways before it ships.')}</h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {CONTROLS.map((control) => (
            <div
              key={control.n}
              className="group rounded-card border-default-200 relative isolate aspect-[4/5] overflow-hidden border bg-default-900 shadow-[0_1px_2px_rgba(2,6,23,0.05),0_22px_44px_-30px_rgba(2,6,23,0.35)]"
            >
              <Image
                src={control.image}
                alt={t(locale, control.alt)}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/46 via-black/4 to-black/0" />

              {/* Rounded parent, cut inner panel. The card corners remain clean;
                  only this content plate carries the diagonal signature. */}
              <div
                className="bg-primary-3 absolute inset-x-4 bottom-4 overflow-hidden rounded-[18px] px-5 py-5 text-white shadow-[0_16px_36px_-20px_rgba(2,6,23,0.7)] lg:inset-x-5 lg:bottom-5 lg:px-6 lg:py-6"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 76%, 88% 100%, 0 100%)' }}
              >
                <span className="font-mono text-[10px] tracking-[0.22em] text-white/58 uppercase">{control.n}</span>
                <h3 className="mt-2 max-w-[16ch] text-[18px] leading-[1.08] font-semibold tracking-[-0.02em] text-white text-balance lg:text-[20px]">
                  {t(locale, control.label)}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center lg:mt-10">
          <ArrowButton href="/quality" label={t(locale, 'Explore our QC')} />
        </div>
      </div>
    </section>
  )
}
