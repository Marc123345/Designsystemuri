'use client'

import { useArmedReveal } from '@/components/about/useArmedReveal'
import CountUp from '@/components/CountUp'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import Image from 'next/image'
import { useLocale } from 'next-intl'

// Flags for the UK HQ and the US facility (Uri, 22 Oct 2026). The Middle East
// hub names no country, so it carries none.
const PRODUCTION = [
  ['Global Headquarters', 'London, United Kingdom', 'gb'],
  ['Primary Processing Plant', 'Middle East Hub', null],
  ['Secondary Processing Facility', 'Boca Raton, Florida, USA', 'us'],
] as const

// Flags (Uri, Oct 2026) are local SVGs in public/eid/flags, from the Iconify
// `flag` set (4x3), so nothing is fetched at runtime.
const AGENT_COUNTRIES = [
  ['Germany', 'de'],
  ['Italy', 'it'],
  ['Japan', 'jp'],
  ['South Korea', 'kr'],
  ['Switzerland', 'ch'],
  ['Ireland', 'ie'],
  ['Israel', 'il'],
  ['Brazil', 'br'],
  ['China', 'cn'],
  ['Taiwan', 'tw'],
  ['South Africa', 'za'],
  ['India', 'in'],
  ['Poland', 'pl'],
] as const

// Shared reveal: fade and rise, staggered by inline transition-delay.
const RISE = 'transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,0.7,0.3,1)] group-data-[state=armed]/rv:translate-y-5 group-data-[state=armed]/rv:opacity-0'

/**
 * Uri's supplied replacement for the globe: two clear columns, all visible.
 *
 * Motion (Marc, Oct 2026), desktop only via useArmedReveal: the three sites
 * light up in turn along a supply line that draws down from London, with a
 * signal that keeps running along it; the night-earth photo eases out of a
 * slow zoom; the agent flags pop in as a wave and the country count runs up;
 * a dashed trade route marches under "Unlimited Global Fulfillment".
 */
const SupplyReach = () => {
  const locale = useLocale() as Locale
  const [ref, state] = useArmedReveal<HTMLDivElement>(0.2)

  return (
    <section data-note="supply-reach" className="py-10 lg:py-12">
      <div className="container">
        <div ref={ref} data-state={state} className="group/rv bg-primary-3 rounded-card overflow-hidden text-white shadow-[0_28px_80px_-48px_rgba(2,6,23,0.7)]">
          <div className="grid lg:grid-cols-2">
            <div className="border-white/10 p-6 lg:border-r lg:p-8 xl:p-9">
              <h2 className="text-[24px] leading-tight font-semibold tracking-[-0.025em] text-white lg:text-[28px]">
                {t(locale, 'Production Infrastructure')}
              </h2>
              <p className="mt-2 text-[13px] font-mono tracking-[0.16em] text-white/50 uppercase">{t(locale, 'Manufacturing & Processing')}</p>

              <dl className="relative mt-6 grid gap-4 pl-8">
                {/* Supply line: draws down from HQ, then a signal runs along it. */}
                <span aria-hidden className="absolute top-2 bottom-2 left-[6px] w-px origin-top overflow-hidden bg-linear-to-b from-white/45 via-white/25 to-white/10 transition-transform duration-[1300ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-data-[state=armed]/rv:scale-y-0">
                  <span className="sr-signal absolute inset-x-0 top-0 h-14 bg-linear-to-b from-transparent via-white to-transparent" />
                </span>
                {PRODUCTION.map(([label, value, flag], i) => (
                  <div key={label} className={`relative ${i ? 'border-t border-white/10 pt-4' : ''} ${RISE}`} style={{ transitionDelay: `${200 + i * 380}ms` }}>
                    <span aria-hidden className={`bg-primary-3 absolute -left-8 flex size-[13px] items-center justify-center rounded-full border border-white/60 ${i ? 'top-[calc(1rem+5px)]' : 'top-[5px]'}`}>
                      <span className={`size-[5px] rounded-full bg-white ${i === 0 ? 'sr-ping' : ''}`} />
                    </span>
                    <dt className="text-[15px] font-semibold text-white">{t(locale, label)}</dt>
                    <dd className="mt-1 flex items-center gap-2 text-[14px] leading-relaxed text-white/68">
                      {flag ? (
                        // eslint-disable-next-line @next/next/no-img-element -- 16px static SVG
                        <img src={`/eid/flags/${flag}.svg`} alt="" width={16} height={12} className="h-3 w-4 shrink-0 rounded-[2px] ring-1 ring-white/20" />
                      ) : null}
                      {t(locale, value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative isolate overflow-hidden border-t border-white/10 p-6 lg:border-t-0 lg:p-8 xl:p-9">
              <Image
                src="/images/earth-night.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="-z-30 object-cover object-[58%_42%] transition-transform duration-[2600ms] ease-[cubic-bezier(0.22,0.7,0.3,1)] group-data-[state=armed]/rv:scale-115"
              />
              <span aria-hidden className="bg-primary-3/42 absolute inset-0 -z-20" />
              <span aria-hidden className="from-primary-3/88 via-primary-3/54 absolute inset-0 -z-10 bg-linear-to-r to-primary/18" />

              <div className="relative z-10">
                <h2 className="text-[24px] leading-tight font-semibold tracking-[-0.025em] text-white lg:text-[28px]">
                  {t(locale, 'Global Logistics Reach')}
                </h2>
                <p className="mt-2 text-[13px] font-mono tracking-[0.16em] text-white/72 uppercase">{t(locale, 'Supply Chain & Market Access')}</p>
                <p className="mt-5 max-w-[58ch] text-[14px] leading-relaxed text-white/88">
                  {t(locale, 'With sales and technical support based in London, backed by our international manufacturing and logistics operations, E.I.D serves customers across the globe, ensuring reliable worldwide supply and responsive, personal service.')}
                </p>

                <div className="mt-6">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[15px] font-semibold text-white">{t(locale, 'Local Agent Network')}</h3>
                      <span className="font-mono text-[11px] tracking-[0.16em] text-white/70 uppercase">
                        <CountUp value="13" duration={1400} /> {t(locale, 'countries')}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/80">{t(locale, 'On-the-ground technical representatives in:')}</p>
                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                      {AGENT_COUNTRIES.map(([country, code], i) => (
                        <div
                          key={country}
                          className="group/flag flex items-center gap-2 text-[12px] text-white/88 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[state=armed]/rv:translate-y-2 group-data-[state=armed]/rv:scale-90 group-data-[state=armed]/rv:opacity-0"
                          style={{ transitionDelay: state === 'in' ? `${700 + i * 70}ms` : undefined }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element -- 16px static SVG, nothing for next/image to optimise */}
                          <img src={`/eid/flags/${code}.svg`} alt="" width={16} height={12} className="h-3 w-4 shrink-0 rounded-[2px] ring-1 ring-white/20 transition-transform duration-300 group-hover/flag:-translate-y-0.5 group-hover/flag:scale-125" />
                          <span>{t(locale, country)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-6 pt-5">
                    {/* A dashed trade route that keeps moving. */}
                    <svg aria-hidden className="absolute inset-x-0 top-0 h-px w-full overflow-visible" preserveAspectRatio="none">
                      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="rgba(255,255,255,0.35)" strokeDasharray="6 6" className="sr-route" />
                    </svg>
                    <h3 className="text-[15px] font-semibold text-white">{t(locale, 'Unlimited Global Fulfillment')}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-white/80">{t(locale, 'Established, secure trade routes to toolmakers anywhere in the world.')}</p>
                  </div>
                </div>

                <div className="mt-7">
                  <ArrowButton href="/contact" label={t(locale, 'Talk to us about supply')} variant="primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupplyReach
