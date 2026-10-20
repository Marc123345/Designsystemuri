import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'
import Image from 'next/image'

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

      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'About EID')}</p>
          <h2 className="text-primary-3 mx-auto mt-3 max-w-[24ch] text-[clamp(2.125rem,1.2rem+3.2vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.025em] text-balance hyphens-auto break-words md:tracking-[-0.04em]">
            {t(locale, 'Industrial diamond and CBN for toolmakers since 1970.')}
          </h2>
          <p className="text-default-600 mx-auto mt-4 max-w-[68ch] text-[15px] leading-relaxed md:text-base">
            {t(locale, 'Headquartered in London, EID manufactures, grades and quality-controls superabrasives supplied to toolmakers in 80 countries.')}
          </p>
        </div>

        <article className="border-primary/10 rounded-card mt-7 grid gap-6 border bg-white p-6 shadow-[0_18px_50px_-42px_rgba(2,6,23,0.28)] sm:grid-cols-[200px_minmax(0,1fr)] sm:items-start sm:gap-9 sm:p-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-11 lg:p-10">
          <div className="bg-default-100 relative mx-auto aspect-[4/5] w-44 overflow-hidden rounded-control sm:mx-0 sm:w-full">
            <Image
              src="/eid/grandfather-lewis-edel.webp"
              alt={t(locale, 'Mr. Lewis Edel, founder of E.I.D.')}
              fill
              sizes="(min-width: 1024px) 250px, 200px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="text-primary font-mono text-[12px] tracking-[0.22em] uppercase">{t(locale, 'Our Heritage — Since 1948')}</p>
            <div className="text-default-600 mt-4 grid gap-4 text-[15px] leading-relaxed lg:text-[16.5px]">
              <p>{t(locale, 'E.I.D was founded in London in 1948 by Mr. Lewis Edel, initially specialising in the trading of natural industrial diamonds. Through his expertise and dedication, the company established a strong reputation within the industrial diamond industry.')}</p>
              <p>{t(locale, 'In 1970, his son, Mr. David Edel, joined the business and played a pivotal role in its development. Under his leadership, E.I.D expanded to offer the full range of industrial diamond products, introduced new technologies and developed advanced processing capabilities, transforming the company into a one-stop manufacturer and supplier of industrial diamond products.')}</p>
              <p>{t(locale, "Today, with David Edel's three sons representing the third generation of the family in the business, E.I.D continues to build on more than 75 years of experience, combining longstanding industry knowledge with modern technology to serve the evolving needs of the global industrial diamond market.")}</p>
            </div>
          </div>
        </article>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 lg:gap-4">
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
