'use client'

import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/** Sticky product-section navigation with scrollspy. */
export const JumpNav = ({ items }: { items: { id: string; label: string }[] }) => {
  const locale = useLocale() as Locale
  const [active, setActive] = useState(items[0]?.id ?? '')
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const base = window.matchMedia('(min-width: 1024px)').matches ? 112 : 92

    const apply = () => {
      const h = navRef.current?.offsetHeight ?? 0
      root.style.setProperty('--eid-scroll-offset', `${base + h}px`)
    }

    apply()
    const ro = new ResizeObserver(apply)
    if (navRef.current) ro.observe(navRef.current)
    window.addEventListener('resize', apply)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', apply)
      root.style.removeProperty('--eid-scroll-offset')
    }
  }, [])

  useEffect(() => {
    const sections = items.map((it) => document.getElementById(it.id)).filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-150px 0px -70% 0px', threshold: 0 }
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [items])

  return (
    <nav ref={navRef} data-note="jump-nav" aria-label={t(locale, 'On this page')} className="border-default-200 bg-white/92 sticky top-[84px] z-40 border-b shadow-[0_1px_0_rgb(15_23_42/0.02)] backdrop-blur-xl">
      <div className="container flex flex-wrap items-center gap-2.5 py-3.5">
        <span className="label text-default-500 me-1">{t(locale, 'On this page')}</span>
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`small eid-motion-base rounded-control border px-3.5 py-1.5 font-medium transition-[background-color,border-color,color,box-shadow] ${isActive ? 'border-primary bg-primary text-white shadow-sm' : 'border-default-200 bg-white text-default-700 hover:border-primary/40 hover:text-primary'}`}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
