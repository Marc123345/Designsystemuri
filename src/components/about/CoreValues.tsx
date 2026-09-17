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
    <section data-note="core-values" className="bg-white py-14 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-primary font-mono text-[10px] tracking-[0.24em] uppercase">{t(locale, 'Our core values')}</p>
          <h2 className="text-primary-3 mx-auto mt-3 max-w-3xl text-[30px] leading-[1.08] font-bold tracking-[-0.04em] md:text-[38px] lg:text-[42px]">
            {t(locale, 'Driving technological excellence to deliver superior products')}
          </h2>
        </div>

        <div className="mt-11 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-x-10">
          {VALUES.map((value) => (
            <article key={value.name} className="text-center">
              <div className="text-primary mx-auto flex h-16 items-center justify-center">
                <Icon icon={value.icon} className="size-11 stroke-[1.35]" aria-hidden />
              </div>
              <h3 className="text-primary-3 mt-4 text-[20px] font-semibold tracking-[-0.025em] lg:text-[21px]">{t(locale, value.name)}</h3>
              <p className="text-default-600 mx-auto mt-3 max-w-[30ch] text-[14px] leading-[1.7]">{t(locale, value.body)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues
