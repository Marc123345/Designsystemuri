'use client'

import { useEffect, useRef, useState } from 'react'

type Item = { id: string; label: string; num?: string; el: HTMLElement }

/**
 * Sticky section bar for the product pages (Marc, Oct 2026): visibility of
 * system status. Once the visitor scrolls into the first chapter, a slim bar
 * slides down under the fixed header showing the product name, the chapters
 * ("01 Mesh · 02 Micron · Coatings") with the current one highlighted, and a
 * thin line that fills as they read through the chapters. Tapping a chapter
 * scrolls to it.
 *
 * It finds its chapters in the page itself: every element carrying
 * `data-nav-label` (set by Chapter and Coatings in UriProductLayout), in
 * document order. Fewer than two chapters and it does not render.
 */
const SectionBar = ({ product }: { product: string }) => {
  const [items, setItems] = useState<Item[]>([])
  const [active, setActive] = useState('')
  const [shown, setShown] = useState(false)
  const [progress, setProgress] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  // Read the chapters off the rendered page once it has painted.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const els = [...document.querySelectorAll<HTMLElement>('[data-nav-label]')].filter((el) => el.id)
      setItems(els.map((el) => ({ id: el.id, label: el.dataset.navLabel ?? '', num: el.dataset.navNum, el })))
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (items.length < 2) return
    let frame = 0
    const update = () => {
      frame = 0
      // The reading line sits just under the header + this bar.
      const line = (window.matchMedia('(min-width: 1024px)').matches ? 96 : 76) + 64
      const first = items[0].el.getBoundingClientRect().top
      setShown(first <= line + 40)

      let current = items[0].id
      // A chapter becomes current once its top passes the upper quarter of
      // the screen, so the highlight changes as its heading arrives.
      const trigger = line + window.innerHeight * 0.25
      for (const item of items) if (item.el.getBoundingClientRect().top <= trigger) current = item.id
      setActive(current)

      // Progress through the chapters: from the first chapter's top to the
      // bottom of the page's chapter run (the last chapter plus its modules).
      const start = window.scrollY + first - line
      const lastBlock = items[items.length - 1].el.parentElement ?? items[items.length - 1].el
      const end = window.scrollY + lastBlock.getBoundingClientRect().bottom - window.innerHeight
      setProgress(Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start))))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items])

  // Links that arrive on a section (#coated from an application page) clear
  // the bar as well as the header while the bar exists.
  useEffect(() => {
    if (items.length < 2) return
    const root = document.documentElement
    root.style.setProperty('scroll-padding-top', '52px')
    return () => {
      root.style.removeProperty('scroll-padding-top')
    }
  }, [items])

  // Phones: keep the current chapter in view in the sideways-scrolling list.
  useEffect(() => {
    const list = listRef.current
    const pill = list?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (!list || !pill) return
    const left = pill.offsetLeft - list.clientWidth / 2 + pill.clientWidth / 2
    list.scrollTo({ left, behavior: 'smooth' })
  }, [active])

  if (items.length < 2) return null

  const go = (item: Item) => (event: React.MouseEvent) => {
    event.preventDefault()
    const line = (window.matchMedia('(min-width: 1024px)').matches ? 96 : 76) + 60
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: window.scrollY + item.el.getBoundingClientRect().top - line, behavior: reduce ? 'auto' : 'smooth' })
    history.replaceState(null, '', `#${item.id}`)
  }

  return (
    <nav
      aria-label="Sections on this page"
      data-note="section-bar"
      className={`border-default-200 fixed inset-x-0 top-[76px] z-[110] border-b bg-white/95 shadow-[0_10px_30px_-24px_rgba(28,38,80,0.6)] backdrop-blur-md transition-[translate,opacity] duration-300 lg:top-[96px] ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
      }`}
      aria-hidden={!shown}
    >
      <div className="container flex h-[52px] items-center gap-4">
        <span className="text-primary-3 hidden shrink-0 text-[14px] font-semibold sm:block">{product}</span>
        <span aria-hidden className="bg-default-200 hidden h-5 w-px shrink-0 sm:block" />
        <div ref={listRef} className="-mx-1 flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const on = item.id === active
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-id={item.id}
                onClick={go(item)}
                tabIndex={shown ? 0 : -1}
                aria-current={on ? 'location' : undefined}
                className={`rounded-control inline-flex shrink-0 items-center gap-2 px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  on ? 'bg-primary text-white' : 'text-default-600 hover:bg-default-100 hover:text-primary-3'
                }`}
              >
                {item.num ? <span className={`font-mono text-[11px] ${on ? 'text-white/75' : 'text-default-400'}`}>{item.num}</span> : null}
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
      {/* Reading progress through the chapters. */}
      <span aria-hidden className="bg-primary absolute bottom-[-1px] left-0 h-[2px] origin-left" style={{ width: '100%', transform: `scaleX(${progress})` }} />
    </nav>
  )
}

export default SectionBar
