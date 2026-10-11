import CanvasField from '@/components/CanvasField'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import Image from 'next/image'
import { useLocale } from 'next-intl'

const VISION =
  'To be the supplier tool makers can rely on for the same diamond and CBN specification every time, across the full range.'

const MISSION =
  'To manufacture, grade and quality-control superabrasives to documented standards, with every batch measured and every lot traceable.'

const ITEMS = [
  {
    title: 'Quality & consistency',
    body: 'Manufacturing, grading and QC run through our own facilities to one specification.',
    image: '/eid/qc-batch-to-batch.jpg',
  },
  {
    title: 'Global service',
    body: 'Sales and technical support run from London, with processing and logistics supporting toolmakers worldwide.',
    image: '/images/earth-night.jpg',
  },
  {
    title: 'Our vision',
    body: VISION,
    image: '/eid/qc-samples.jpg',
  },
  {
    title: 'Our mission',
    body: MISSION,
    image: '/eid/qc-sieve.jpg',
  },
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
    <section data-note="about-mosaic" className="bg-default-50 relative isolate overflow-hidden py-10 lg:py-12">
      <CanvasField grain={false} mark="end" />

      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'About EID')}</p>
          <h1 className="text-primary-3 mx-auto mt-3 max-w-[24ch] text-[34px] leading-[1.02] font-bold tracking-[-0.04em] text-balance md:text-[44px] lg:text-[52px]">
            {t(locale, 'Headquartered in London, EID is trusted worldwide for quality, consistency and service.')}
          </h1>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4 lg:gap-4">
          {ITEMS.map((item) => {
            const hasImage = 'image' in item && item.image
            const hasValue = 'value' in item && item.value

            return (
              <article
                key={item.title}
                className={`rounded-card relative isolate overflow-hidden border p-5 shadow-[0_18px_50px_-42px_rgba(2,6,23,0.28)] lg:p-5.5 ${hasImage ? 'min-h-[190px] border-white/10 text-white' : 'border-default-200 bg-white'}`}
              >
                {hasImage ? (
                  <>
                    <Image src={item.image} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="-z-30 object-cover object-center" />
                    <span aria-hidden className="bg-primary-3/72 absolute inset-0 -z-20" />
                    <span aria-hidden className="from-primary-3/96 via-primary-3/70 absolute inset-0 -z-10 bg-linear-to-t to-primary/42" />
                    <span aria-hidden className="bg-champagne absolute inset-y-0 left-0 w-1.5" />
                  </>
                ) : null}

                {hasValue ? (
                  <p className="text-primary text-[34px] leading-none font-bold tracking-[-0.045em] lg:text-[40px]">{item.value}</p>
                ) : null}

                <h2 className={`${hasValue ? 'mt-2.5' : ''} text-[18px] leading-tight font-semibold lg:text-[20px] ${hasImage ? 'text-white' : 'text-primary-3'}`}>
                  {t(locale, item.title)}
                </h2>

                {'body' in item && item.body ? (
                  <p className={`mt-2.5 text-[13.5px] leading-relaxed lg:text-[14px] ${hasImage ? 'text-white/82' : 'text-default-600'}`}>
                    {t(locale, item.body)}
                  </p>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutMosaic
