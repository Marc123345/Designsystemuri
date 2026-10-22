'use client'

import { useArmedReveal } from '@/components/about/useArmedReveal'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'

const VALUES = [
  {
    name: 'Precision & Quality',
    body: 'Carefully controlled manufacturing, grading and quality assurance to deliver consistent product specifications and performance.',
    icon: 'tabler:target-arrow',
  },
  {
    name: 'Innovation',
    body: 'Continuously advancing our products, processing technologies and manufacturing capabilities.',
    icon: 'tabler:bulb',
  },
  {
    name: 'Reliability',
    body: 'Dependable supply and long-term customer relationships built on trust.',
    icon: 'tabler:shield-check',
  },
  {
    name: 'Service',
    body: 'Responsive, personal support with direct access to experienced technical specialists worldwide.',
    icon: 'tabler:headset',
  },
] as const

/**
 * Depth and motion (Marc, Oct 2026): each value is a raised card with its icon
 * on a navy tile. On desktop the four rise in left to right as the row scrolls
 * in, and a card lifts and draws its top accent on hover. The reveal sits on a
 * wrapper so its stagger delay never slows the hover.
 */
const CoreValues = () => {
  const locale = useLocale() as Locale
  const [ref, state] = useArmedReveal<HTMLDivElement>(0.3)

  return (
    <section data-note="core-values" className="bg-white py-14 lg:py-18">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'Our core values')}</p>
        </div>

        <div ref={ref} data-state={state} className="group/rv mt-9 grid gap-4 sm:grid-cols-2 lg:mt-11 lg:grid-cols-4 lg:gap-5">
          {VALUES.map((value, i) => (
            <div
              key={value.name}
              className="transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,0.7,0.3,1)] group-data-[state=armed]/rv:translate-y-8 group-data-[state=armed]/rv:opacity-0"
              style={{ transitionDelay: state === 'in' ? `${i * 120}ms` : undefined }}
            >
              <article className="group rounded-card border-default-200 relative h-full overflow-hidden border bg-white px-6 pt-8 pb-7 text-center shadow-[0_24px_56px_-40px_rgba(28,38,80,0.45)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_64px_-36px_rgba(28,38,80,0.6)]">
                <span aria-hidden className="bg-primary absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                <span className="from-primary to-primary-3 rounded-control mx-auto flex size-14 items-center justify-center bg-linear-to-br text-white shadow-[0_14px_28px_-14px_rgba(28,38,80,0.8)] transition-transform duration-300 group-hover:scale-105">
                  <Icon icon={value.icon} className="size-7" aria-hidden />
                </span>
                <h3 className="text-primary-3 mt-5 text-[18px] font-semibold tracking-[-0.02em]">{t(locale, value.name)}</h3>
                <p className="text-default-600 mx-auto mt-3 max-w-[29ch] text-[13.5px] leading-relaxed">{t(locale, value.body)}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues
