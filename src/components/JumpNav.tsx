'use client'

import { useEffect, useRef, useState } from 'react'

import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * ⚠ THIS FILE EXISTS SO sections.tsx DOES NOT HAVE TO BE A CLIENT COMPONENT.
 *
 * JumpNav was the only thing in the section kit that needed the browser: a
 * scroll spy with useState, useRef, two useEffects, matchMedia, a resize
 * listener and getElementById. Every other export in that file — eighteen of
 * them, including PageHero, ImageCard, CardGrid, Faq, SpecTable, CrossLinks
 * and BannerCTA — uses nothing but `useLocale()`, which next-intl serves in
 * server components too.
 *
 * Because `'use client'` is a module-level boundary, that one component was
 * pulling the whole 1,200-line kit into the client bundle of every page on the
 * site. A site audit flagged JavaScript as the main mobile cost — 15 chunks,
 * 294 KB brotli, 939 KB raw — and asked which components actually need
 * hydration. This was the answer: one out of nineteen.
 *
 * JumpNav itself is used on exactly one route (/products/[slug]), so it is now
 * loaded there and nowhere else. If anything in sections.tsx ever needs a hook
 * again, move it HERE rather than putting the directive back.
 */

/**
 * Sticky section nav with scrollspy. On a long product page this keeps the
 * section anchors pinned through the vertical (F-pattern) scan and marks the
 * section currently in view (Nielsen: visibility of system status, recognition
 * over recall). Sticks below the fixed header (top-0, ~84px) and reuses the
 * header's own translucent-blur treatment so the two bars read as one system.
 */
export const JumpNav = ({ items }: { items: { id: string; label: string }[] }) => {
  const locale = useLocale() as Locale
  const [active, setActive] = useState(items[0]?.id ?? '')
  const navRef = useRef<HTMLElement>(null)

  // This bar sticks below the fixed header, so on the pages that carry it there
  // are two layers of chrome for an anchor or a focused element to land behind.
  // The base offset in _general.css only accounts for the header, so JumpNav
  // adds its own measured height to it while mounted and puts it back on the
  // way out. Measured rather than hardcoded: the bar wraps to two rows on
  // narrow screens and on the products with the most sections.
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
        // The section whose top is highest within the detection band wins, so
        // the active pill tracks the one currently under the sticky nav.
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      // Detection band: a thin strip just below the header + this nav, down to
      // 30% of the viewport — a section goes active as its top passes under.
      { rootMargin: '-150px 0px -70% 0px', threshold: 0 }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [items])

  return (
    <nav ref={navRef} data-note="jump-nav" aria-label={t(locale, 'On this page')} className="border-default-200 bg-body-bg/95 sticky top-[84px] z-40 border-b backdrop-blur-md">
      <div className="container flex flex-wrap items-center gap-3 py-4">
        {/* The site's eyebrow: 11px mono at 0.22em. It was 14px sans at 0.2em,
            which read as a label competing with the pills rather than as the
            caption on a rule. */}
        <span className="text-default-500 font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'On this page')}</span>
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`rounded-control border px-3.5 py-1.5 text-sm transition-colors ${isActive ? 'border-primary bg-primary text-white' : 'border-default-300 text-default-800 hover:border-primary hover:text-primary'}`}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

