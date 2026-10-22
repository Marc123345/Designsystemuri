'use client'

import { useArmedReveal } from '@/components/about/useArmedReveal'
import CountUp from '@/components/CountUp'
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

// The three paragraphs are three generations, so they read as a timeline.
const ERAS = [
  {
    year: '1948',
    label: 'Founded',
    body: 'E.I.D was founded in London in 1948 by Mr. Lewis Edel, initially specialising in the trading of natural industrial diamonds. Through his expertise and dedication, the company established a strong reputation within the industrial diamond industry.',
  },
  {
    year: '1970',
    label: 'Manufacturing',
    body: 'In 1970, his son, Mr. David Edel, joined the business and played a pivotal role in its development. Under his leadership, E.I.D expanded to offer the full range of industrial diamond products, introduced new technologies and developed advanced processing capabilities, transforming the company into a one-stop manufacturer and supplier of industrial diamond products.',
  },
  {
    year: 'Today',
    label: 'Third generation',
    body: "Today, with David Edel's three sons representing the third generation of the family in the business, E.I.D continues to build on more than 75 years of experience, combining longstanding industry knowledge with modern technology to serve the evolving needs of the global industrial diamond market.",
  },
] as const

// Shared reveal: fade and rise, staggered by inline transition-delay.
const RISE = 'transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,0.7,0.3,1)] group-data-[state=armed]/rv:translate-y-6 group-data-[state=armed]/rv:opacity-0'

/**
 * Depth and motion (Marc, Oct 2026). On desktop, as the heritage card scrolls
 * in: the portrait settles onto its offset navy frame, the timeline rail draws
 * down from 1948, and each generation arrives in order. The stat cards rise in
 * sequence and count up. See useArmedReveal for when any of this is skipped.
 */
const AboutMosaic = () => {
  const locale = useLocale() as Locale
  const [heritageRef, heritageState] = useArmedReveal<HTMLElement>(0.2)
  const [statsRef, statsState] = useArmedReveal<HTMLDivElement>(0.3)

  return (
    <section data-note="about-mosaic" className="bg-default-50 relative isolate overflow-hidden py-10 lg:py-14">
      {/* Soft brand glows behind the card give the grey ground some depth. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="bg-primary/[0.07] absolute -top-24 -left-24 size-[420px] rounded-full blur-3xl" />
        <span className="bg-primary/[0.06] absolute -right-32 bottom-0 size-[480px] rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'About EID')}</p>
          <h2 className="text-primary-3 mx-auto mt-3 max-w-[24ch] text-[clamp(2.125rem,1.2rem+3.2vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.025em] text-balance break-words hyphens-auto md:tracking-[-0.04em]">
            {t(locale, 'Industrial diamond and CBN for toolmakers since 1970.')}
          </h2>
          <p className="text-default-600 mx-auto mt-4 max-w-[68ch] text-[15px] leading-relaxed md:text-base">{t(locale, 'Headquartered in London, EID manufactures, grades and quality-controls superabrasives supplied to toolmakers in 80 countries.')}</p>
        </div>

        <article
          ref={heritageRef}
          data-state={heritageState}
          className="group/rv border-primary/10 rounded-card relative mt-8 grid gap-8 border bg-white p-6 shadow-[0_40px_90px_-50px_rgba(28,38,80,0.45)] sm:grid-cols-[200px_minmax(0,1fr)] sm:items-start sm:gap-10 sm:p-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 lg:p-10"
        >
          {/* Portrait on an offset navy frame: the frame sits behind and
              down-right, so the photo reads as lifted off the card. */}
          <figure className="mx-auto w-44 sm:mx-0 sm:w-full lg:sticky lg:top-28">
            <div className="relative">
              <span
                aria-hidden
                className="from-primary to-primary-3 rounded-control absolute inset-0 translate-x-3 translate-y-3 bg-linear-to-br transition-transform delay-200 duration-1000 ease-[cubic-bezier(0.22,0.7,0.3,1)] group-data-[state=armed]/rv:translate-x-0 group-data-[state=armed]/rv:translate-y-0"
              />
              <div className="bg-default-100 rounded-control relative aspect-[4/5] overflow-hidden shadow-[0_24px_48px_-24px_rgba(2,6,23,0.55)] transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,0.7,0.3,1)] group-data-[state=armed]/rv:-translate-x-4 group-data-[state=armed]/rv:opacity-0">
                <Image src="/eid/grandfather-lewis-edel.webp" alt={t(locale, 'Mr. Lewis Edel, founder of E.I.D.')} fill sizes="(min-width: 1024px) 260px, 200px" className="object-cover object-top" />
              </div>
            </div>
            <figcaption className="text-default-500 mt-6 text-center font-mono text-[11px] tracking-[0.16em] uppercase sm:text-left">{t(locale, 'Lewis Edel · Founder, 1948')}</figcaption>
          </figure>

          <div>
            <p className="text-primary font-mono text-[12px] tracking-[0.22em] uppercase">{t(locale, 'Our Heritage — Since 1948')}</p>

            <ol className="relative mt-6">
              {/* The rail draws down from 1948 to today. */}
              <span aria-hidden className="from-primary via-primary/50 to-primary/10 absolute top-2 bottom-2 left-[7px] w-px origin-top bg-linear-to-b transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,0.7,0.3,1)] group-data-[state=armed]/rv:scale-y-0" />
              {ERAS.map((era, i) => (
                <li key={era.year} className="relative pb-7 pl-10 last:pb-0">
                  <span
                    aria-hidden
                    className="border-primary absolute top-1.5 left-0 flex size-[15px] items-center justify-center rounded-full border-2 bg-white transition-transform duration-500 group-data-[state=armed]/rv:scale-0"
                    style={{ transitionDelay: `${250 + i * 380}ms` }}
                  >
                    <span className="bg-primary size-[5px] rounded-full" />
                  </span>
                  <div className={RISE} style={{ transitionDelay: `${300 + i * 380}ms` }}>
                    <p className="flex items-baseline gap-3">
                      <span className="text-primary-3 text-[22px] leading-none font-bold tracking-[-0.03em] lg:text-[26px]">{t(locale, era.year)}</span>
                      <span className="text-primary font-mono text-[11px] tracking-[0.18em] uppercase">{t(locale, era.label)}</span>
                    </p>
                    <p className="text-default-600 mt-2.5 text-[15px] leading-relaxed lg:text-[16px]">{t(locale, era.body)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </article>

        <div ref={statsRef} data-state={statsState} className="group/rv mt-6 grid gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
          {STATS.map((item, i) => (
            <article
              key={item.title}
              className={`rounded-card from-primary to-primary-3 relative isolate overflow-hidden bg-linear-to-br p-5 text-white shadow-[0_24px_48px_-28px_rgba(28,38,80,0.75)] ring-1 ring-white/10 ring-inset lg:p-6 ${RISE}`}
              style={{ transitionDelay: statsState === 'in' ? `${i * 110}ms` : undefined }}
            >
              <span aria-hidden className="pointer-events-none absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-white/45 to-transparent" />
              <span aria-hidden className="pointer-events-none absolute -top-14 -right-10 -z-10 size-36 rounded-full bg-white/12 blur-3xl" />
              <p className="text-[38px] leading-none font-bold tracking-[-0.045em] tabular-nums lg:text-[44px]">
                <CountUp value={item.value} />
              </p>
              <h3 className="mt-3 text-[15px] leading-tight font-semibold text-white/85 lg:text-[16px]">{t(locale, item.title)}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutMosaic
