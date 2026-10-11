import CanvasField from '@/components/CanvasField'
import PhotoCard from '@/components/PhotoCard'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

const VISION =
  'To be the supplier tool makers can rely on for the same diamond and CBN specification every time, across the full range.'

const MISSION =
  'To manufacture, grade and quality-control superabrasives to documented standards, with every batch measured and every lot traceable.'

const STORY_ITEMS = [
  {
    n: '01',
    title: 'Quality & consistency',
    body: 'Manufacturing, grading and QC run through our own facilities to one specification.',
    image: '/eid/qc-batch-to-batch.jpg',
    alt: 'Side-by-side production lots showing EID batch-to-batch consistency',
  },
  {
    n: '02',
    title: 'Global service',
    body: 'Sales and technical support run from London, with processing and logistics supporting toolmakers worldwide.',
    image: '/images/earth-night.jpg',
    alt: 'Global supply network representing EID service worldwide',
  },
  {
    n: '03',
    title: 'Our vision',
    body: VISION,
    image: '/eid/qc-samples.jpg',
    alt: 'EID laboratory sample range representing the full diamond and CBN offering',
  },
  {
    n: '04',
    title: 'Our mission',
    body: MISSION,
    image: '/eid/qc-sieve.jpg',
    alt: 'Laboratory sieve testing representing EID manufacturing and quality control',
  },
] as const

const STATS = [
  { value: '80', title: 'Countries supplied' },
  { value: '100%', title: 'Batches tested' },
  { value: '8', title: 'Product groups' },
  { value: '55+', title: 'Years manufacturing' },
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

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {STORY_ITEMS.map((item) => (
            <PhotoCard
              key={item.title}
              image={item.image}
              alt={t(locale, item.alt)}
              eyebrow={item.n}
              title={t(locale, item.title)}
              body={t(locale, item.body)}
              minHeight="min-h-[260px] lg:min-h-[285px]"
            />
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 lg:gap-4">
          {STATS.map((item) => (
            <article key={item.title} className="rounded-card border-default-200 bg-white p-5 shadow-[0_18px_50px_-42px_rgba(2,6,23,0.28)] lg:p-5.5">
              <p className="text-primary text-[34px] leading-none font-bold tracking-[-0.045em] lg:text-[40px]">{item.value}</p>
              <h2 className="text-primary-3 mt-2.5 text-[18px] leading-tight font-semibold lg:text-[20px]">{t(locale, item.title)}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutMosaic
