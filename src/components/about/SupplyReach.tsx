import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

const PRODUCTION = [
  ['Global Headquarters', 'London, United Kingdom'],
  ['Primary Processing Plant', 'Middle East Hub'],
  ['Secondary Processing Facility', 'Boca Raton, Florida, USA'],
] as const

const AGENT_COUNTRIES = ['Germany', 'Italy', 'Japan', 'South Korea', 'Switzerland', 'Ireland', 'Israel', 'Brazil', 'China', 'Taiwan', 'South Africa', 'India', 'Poland'] as const

/** Uri's supplied replacement for the globe: two clear columns, all visible. */
const SupplyReach = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="supply-reach" className="py-10 lg:py-12">
      <div className="container">
        <div className="bg-primary-3 rounded-card overflow-hidden text-white shadow-[0_28px_80px_-48px_rgba(2,6,23,0.7)]">
          <div className="grid lg:grid-cols-2">
            <div className="border-white/10 p-6 lg:border-r lg:p-8 xl:p-9">
              <h2 className="text-[24px] leading-tight font-semibold tracking-[-0.025em] text-white lg:text-[28px]">
                {t(locale, 'Production Infrastructure')}
              </h2>
              <p className="mt-2 text-[13px] font-mono tracking-[0.16em] text-white/50 uppercase">{t(locale, 'Manufacturing & Processing')}</p>

              <dl className="mt-6 grid gap-4">
                {PRODUCTION.map(([label, value]) => (
                  <div key={label} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                    <dt className="text-[15px] font-semibold text-white">{t(locale, label)}</dt>
                    <dd className="mt-1 text-[14px] leading-relaxed text-white/68">{t(locale, value)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t border-white/10 p-6 lg:border-t-0 lg:p-8 xl:p-9">
              <h2 className="text-[24px] leading-tight font-semibold tracking-[-0.025em] text-white lg:text-[28px]">
                {t(locale, 'Global Logistics Reach')}
              </h2>
              <p className="mt-2 text-[13px] font-mono tracking-[0.16em] text-white/50 uppercase">{t(locale, 'Supply Chain & Market Access')}</p>

              <div className="mt-6">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-white">{t(locale, 'Local Agent Network')}</h3>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-white/48 uppercase">13 {t(locale, 'countries')}</span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/68">{t(locale, 'On-the-ground technical representatives in:')}</p>
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                    {AGENT_COUNTRIES.map((country) => (
                      <div key={country} className="flex items-center gap-2 text-[12px] text-white/78">
                        <span className="bg-primary-1 size-1.5 shrink-0" aria-hidden />
                        <span>{t(locale, country)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <h3 className="text-[15px] font-semibold text-white">{t(locale, 'Unlimited Global Fulfillment')}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-white/68">{t(locale, 'Established, secure trade routes to toolmakers anywhere in the world.')}</p>
                </div>
              </div>

              <div className="mt-7">
                <ArrowButton href="/contact" label={t(locale, 'Talk to us about supply')} variant="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupplyReach
