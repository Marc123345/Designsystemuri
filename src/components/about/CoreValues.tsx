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
    icon: 'tabler:users-group',
  },
  {
    name: 'Excellence',
    body: 'ISO 9001, lot traceability, certificates of analysis and retained batch samples.',
    icon: 'tabler:award',
  },
  {
    name: 'Precision',
    body: 'Measured and graded so repeat orders arrive to the same specification.',
    icon: 'tabler:focus-2',
  },
] as const

const CoreValues = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="core-values" className="border-default-200 border-y bg-white py-12 lg:py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary font-mono text-[10px] tracking-[0.22em] uppercase">{t(locale, 'Our core values')}</p>
          <h2 className="text-primary-3 mt-3 text-[28px] leading-tight font-bold tracking-[-0.035em] md:text-[36px]">
            {t(locale, 'Driving technological excellence to deliver superior products')}
          </h2>
        </div>

        <div className="border-default-200 mt-10 grid border-t sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <article
              key={value.name}
              className={`border-default-200 px-5 py-8 text-center lg:px-7 lg:py-9 ${index % 2 === 1 ? 'sm:border-s' : ''} ${index > 1 ? 'sm:border-t lg:border-t-0' : ''} ${index > 0 ? 'lg:border-s' : ''}`}
            >
              <div className="bg-primary/8 text-primary mx-auto flex size-14 items-center justify-center rounded-full">
                <Icon icon={value.icon} className="size-7" aria-hidden />
              </div>
              <h3 className="text-primary-3 mt-5 text-[18px] font-semibold tracking-[-0.02em]">{t(locale, value.name)}</h3>
              <p className="text-default-600 mx-auto mt-3 max-w-[28ch] text-[13.5px] leading-relaxed">{t(locale, value.body)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues
