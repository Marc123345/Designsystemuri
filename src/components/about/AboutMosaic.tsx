import CanvasField from '@/components/CanvasField'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

const VISION =
  'To be the supplier tool makers can rely on for the same diamond and CBN specification every time, across the full range.'

const MISSION =
  'To manufacture, grade and quality-control superabrasives to documented standards, with every batch measured and every lot traceable.'

const FOUNDATIONS = [
  {
    title: 'Quality & consistency',
    body: 'Manufacturing, grading and QC run through our own facilities to one specification.',
  },
  {
    title: 'Global service',
    body: 'Sales and technical support run from London, with processing and logistics supporting toolmakers worldwide.',
  },
] as const

const DIRECTION = [
  {
    title: 'Our vision',
    body: VISION,
  },
  {
    title: 'Our mission',
    body: MISSION,
  },
] as const

const PROOF = [
  {
    value: '80',
    title: 'Countries supplied',
  },
  {
    value: '100%',
    title: 'Batches tested',
  },
  {
    value: '8',
    title: 'Product groups',
  },
  {
    value: '55+',
    title: 'Years manufacturing',
  },
] as const

const AboutMosaic = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="about-mosaic" className="bg-default-50 relative isolate overflow-hidden py-12 lg:py-16">
      <CanvasField grain={false} mark="end" />

      <div className="container relative">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'About EID')}</p>
          <h1 className="text-primary-3 mx-auto mt-3 max-w-[22ch] text-[34px] leading-[1.02] font-bold tracking-[-0.04em] text-balance md:text-[44px] lg:text-[52px]">
            {t(locale, 'Headquartered in London, EID is trusted worldwide for quality, consistency and service.')}
          </h1>
        </div>

        <div className="mt-9 grid gap-4 lg:mt-11 lg:grid-cols-2 lg:gap-5">
          {FOUNDATIONS.map((item) => (
            <article
              key={item.title}
              className="border-primary/15 rounded-card relative overflow-hidden border bg-white p-6 shadow-[0_18px_50px_-42px_rgba(28,39,73,0.30)] lg:p-7"
            >
              <span aria-hidden className="bg-primary absolute inset-y-0 left-0 w-1.5" />
              <h2 className="text-primary-3 text-[20px] leading-tight font-semibold tracking-[-0.02em] lg:text-[22px]">
                {t(locale, item.title)}
              </h2>
              <p className="text-default-600 mt-3 max-w-[58ch] text-[14px] leading-relaxed lg:text-[15px]">
                {t(locale, item.body)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {DIRECTION.map((item) => (
            <article
              key={item.title}
              className="bg-primary-3 rounded-card relative overflow-hidden p-6 text-white shadow-[0_24px_64px_-46px_rgba(28,39,73,0.72)] lg:p-7"
            >
              <span aria-hidden className="bg-champagne absolute inset-y-0 left-0 w-1.5" />
              <p className="text-champagne font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, item.title)}</p>
              <h2 className="mt-3 max-w-[30ch] text-[20px] leading-[1.35] font-semibold tracking-[-0.02em] text-white lg:text-[22px]">
                {t(locale, item.body)}
              </h2>
            </article>
          ))}
        </div>

        <div className="bg-primary mt-5 grid overflow-hidden rounded-card text-white shadow-[0_26px_70px_-48px_rgba(28,39,73,0.65)] sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
          {PROOF.map((item) => (
            <article
              key={item.title}
              className="border-white/12 relative px-6 py-6 sm:border-r sm:[&:nth-child(2)]:border-r-0 lg:border-r lg:[&:nth-child(2)]:border-r lg:last:border-r-0 max-sm:border-b max-sm:last:border-b-0"
            >
              <p className="text-champagne text-[36px] leading-none font-bold tracking-[-0.045em] lg:text-[42px]">{item.value}</p>
              <h2 className="mt-2.5 text-[13px] font-semibold tracking-[0.04em] text-white/88 uppercase">{t(locale, item.title)}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutMosaic
