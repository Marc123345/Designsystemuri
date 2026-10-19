import PhotoCard from '@/components/PhotoCard'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'

const CONTROLS = [
  {
    n: '01',
    label: 'Mesh Grading & Morphology Control',
    image: 'https://ik.imagekit.io/qcvroy8xpd/eid-qc-mesh-size-morphology.png',
    alt: 'Mesh diamond size and morphology quality-control imagery',
  },
  {
    n: '02',
    label: 'Micron Grading & Morphology Control',
    image: '/eid/quality/malvern-mastersizer-3000.webp',
    alt: 'Malvern Mastersizer 3000 particle-size analyser used for micron grading',
  },
  {
    n: '03',
    label: 'Advanced Chemical Cleaning',
    image: 'https://ik.imagekit.io/qcvroy8xpd/eid-qc-advanced-chemical-cleaning.png',
    alt: 'Advanced chemical cleaning quality-control imagery',
  },
  {
    n: '04',
    label: 'Toughness (TI / TTI)',
    image: 'https://ik.imagekit.io/qcvroy8xpd/eid-qc-toughness.png',
    alt: 'Diamond toughness testing quality-control imagery',
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
            {t(locale, 'At E.I.D, quality control is integrated throughout our manufacturing processes. Through precision grading, advanced laboratory testing and rigorous batch inspection, we maintain consistent product specifications and reliable abrasive performance, lot after lot.')}
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
