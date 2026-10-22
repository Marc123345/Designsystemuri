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

const CoreValues = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="core-values" className="bg-white py-14 lg:py-18">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'Our core values')}</p>
        </div>

        <div className="mt-11 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-13 lg:grid-cols-4">
          {VALUES.map((value) => (
            <article key={value.name} className="px-3 text-center">
              <Icon icon={value.icon} className="text-primary mx-auto size-12" aria-hidden />
              <h3 className="text-primary-3 mt-5 text-[18px] font-semibold tracking-[-0.02em]">{t(locale, value.name)}</h3>
              <p className="text-default-600 mx-auto mt-3 max-w-[29ch] text-[13.5px] leading-relaxed">{t(locale, value.body)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues
