'use client'

import { useArmedReveal } from '@/components/about/useArmedReveal'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import { useEffect } from 'react'

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
  // Animation lives in _general.css (.cv-*): icons draw in, ring traces, glow.
  const [ref, state] = useArmedReveal<HTMLDivElement>(0.3)

  // Normalise every icon stroke to length 1 so they all draw at one pace.
  // Iconify can paint the icons after mount, so catch late arrivals too.
  useEffect(() => {
    const grid = ref.current
    if (!grid) return
    const tag = () => grid.querySelectorAll('.cv-icon :is(path, line, circle, polyline, rect)').forEach((el) => el.setAttribute('pathLength', '1'))
    tag()
    const mo = new MutationObserver(tag)
    mo.observe(grid, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [ref])

  return (
    <section data-note="core-values" className="bg-white py-14 lg:py-18">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'Our core values')}</p>
        </div>

        <div ref={ref} data-state={state} className="mt-11 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-13 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <article key={value.name} className="cv-value px-3 text-center" style={{ ['--cv-delay' as string]: `${300 + i * 220}ms` }}>
              <div aria-hidden className="relative mx-auto size-[88px]">
                <span className="cv-glow bg-primary/[0.12] absolute inset-3 rounded-full blur-xl" />
                <svg viewBox="0 0 88 88" className="absolute inset-0 size-full -rotate-90">
                  <circle cx="44" cy="44" r="42" fill="none" stroke="currentColor" strokeWidth="1" pathLength={1} className="cv-ring text-primary/25" />
                </svg>
                <span className="cv-orbit absolute inset-0">
                  <span className="bg-primary absolute top-[-3px] left-1/2 size-[7px] -translate-x-1/2 rounded-full shadow-[0_0_10px_2px_rgba(44,60,108,0.45)]" />
                </span>
                <Icon icon={value.icon} className="cv-icon text-primary absolute inset-0 m-auto size-12" />
              </div>
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
