'use client'

import Backdrop from '@/components/Backdrop'
import Globe from '@/components/Globe'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import Image from 'next/image'
import { useLocale } from 'next-intl'

const PRODUCTION = [
  {
    label: 'Global Headquarters',
    value: 'London, United Kingdom',
  },
  {
    label: 'Primary Processing Plant',
    value: 'Middle East Hub',
  },
  {
    label: 'Secondary Processing Facility',
    value: 'United States',
  },
] as const

const LOGISTICS = [
  {
    label: 'Local Agent Network',
    value: 'On-the-ground technical representatives spanning 7 major industrial countries.',
  },
  {
    label: 'Unlimited Global Fulfillment',
    value: 'Established, secure trade routes to toolmakers anywhere in the world.',
  },
] as const

/**
 * Uri's supplied two-column structure, kept deliberately literal:
 * Production Infrastructure on one side, Global Logistics Reach on the other.
 * The globe stays as supporting evidence, but it no longer replaces the actual
 * facility and logistics facts with generic continent chips.
 */
const GlobeSection = ({
  eyebrow,
  title,
  desc,
  ctaLabel,
  ctaHref = '/contact',
}: {
  eyebrow?: string
  title?: string
  desc?: string
  ctaLabel?: string
  ctaHref?: string
}) => {
  const locale = useLocale() as Locale

  return (
    <section data-note="reach" className="rounded-card relative isolate size-full overflow-hidden py-14 text-white lg:py-20">
      <Backdrop />

      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        <Image src="/images/earth-night.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_38%] opacity-50 mix-blend-screen" />
        <div className="from-default-950 via-default-950/76 absolute inset-0 bg-linear-to-r via-38% to-transparent to-78%" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--color-default-950) 0%, transparent 38%, transparent 62%, var(--color-default-950) 100%)' }}
        />
      </div>

      <div className="relative z-10 container">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="rounded-control inline-flex items-center gap-1.5 border border-white/15 px-3.5 py-1.25">
              <span className="bg-primary-1 size-2" />
              <span className="text-sm text-white">{eyebrow ?? t(locale, 'Global logistics reach')}</span>
            </div>

            <h2 className="mt-4 max-w-[19ch] text-2xl font-bold text-white md:text-[28px] lg:text-[32px]">
              {title ?? t(locale, 'Production infrastructure. Global logistics reach.')}
            </h2>

            {desc && <p className="text-default-200 mt-5 max-w-2xl leading-relaxed">{desc}</p>}

            <div className="mt-8 grid overflow-hidden rounded-card border border-white/12 bg-default-950/28 backdrop-blur-sm lg:grid-cols-2">
              <div className="p-5 lg:border-r lg:border-white/12 lg:p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/55 uppercase">{t(locale, 'Column 1 · Production infrastructure')}</p>
                <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em] text-white">{t(locale, 'Manufacturing & Processing')}</h3>

                <dl className="mt-5 space-y-5">
                  {PRODUCTION.map((item) => (
                    <div key={item.label} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                      <dt className="text-[14px] font-semibold text-white">{t(locale, item.label)}</dt>
                      <dd className="mt-1 text-[13px] leading-relaxed text-white/68">{t(locale, item.value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="border-t border-white/12 p-5 lg:border-t-0 lg:p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/55 uppercase">{t(locale, 'Column 2 · Global logistics reach')}</p>
                <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em] text-white">{t(locale, 'Supply Chain & Market Access')}</h3>

                <dl className="mt-5 space-y-5">
                  {LOGISTICS.map((item) => (
                    <div key={item.label} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                      <dt className="text-[14px] font-semibold text-white">{t(locale, item.label)}</dt>
                      <dd className="mt-1 text-[13px] leading-relaxed text-white/68">{t(locale, item.value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-8">
              <ArrowButton href={ctaHref} label={ctaLabel ?? t(locale, 'Talk to us about supply')} variant="primary" />
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <Globe size={520} />
            <p className="mt-3 text-center font-mono text-[10px] tracking-[0.28em] text-white/40 uppercase">{t(locale, 'Drag to explore')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlobeSection
