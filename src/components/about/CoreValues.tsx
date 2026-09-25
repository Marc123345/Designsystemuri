import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'

const VALUES = [
  {
    name: 'Innovation',
    body: 'New coatings, tighter classifications and crystal orientations shaped around tool-maker requirements.',
    icon: 'tabler:bulb',
  },
  {
    name: 'Family',
    body: 'A long-standing team with direct access to the people who work with the material.',
    icon: 'tabler:heart-handshake',
  },
  {
    name: 'Excellence',
    body: 'ISO 9001, lot traceability, certificates of analysis and retained batch samples.',
    icon: 'tabler:award',
  },
  {
    name: 'Precision',
    body: 'Measured and graded so repeat orders arrive to the same specification.',
    icon: 'tabler:target-arrow',
  },
] as const

const CoreValues = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="core-values" className="bg-white py-14 lg:py-18">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary font-mono text-[10px] tracking-[0.22em] uppercase">{t(locale, 'Our core values')}</p>
          <h2 className="text-primary-3 mt-3 text-[28px] leading-tight font-bold tracking-[-0.035em] md:text-[36px]">
            {t(locale, 'Driving technological excellence to deliver superior products')}
          </h2>
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
