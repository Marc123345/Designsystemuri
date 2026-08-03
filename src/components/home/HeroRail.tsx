'use client'

import Wireframe from '@/components/Wireframe'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

export type RailItem = { slug: string; name: string }

/**
 * The product rail that sits in the bottom-right of the hero.
 *
 * Scroll-snap rather than index maths: the arrows call `scrollBy`, and the
 * counter reads back from `scrollLeft`. That gets touch swipe, trackpad swipe
 * and keyboard scrolling for free, and it stays correct at every breakpoint
 * without having to know how many cards are visible — which a translate-based
 * carousel would have to be told, and would get wrong the moment the card width
 * changed.
 *
 * The reference this layout comes from rounds its cards to 24px and rings them
 * in a translucent outline. Neither is borrowed: everything in this system is
 * hard-cornered, so a rounded card here would be the only curve on the page.
 */
const HeroRail = ({ items, prevLabel, nextLabel, railLabel }: { items: RailItem[]; prevLabel: string; nextLabel: string; railLabel: string }) => {
  const railRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  // Card width plus the gap between two cards. Measured rather than hard-coded
  // so one arrow press always advances exactly one card at every breakpoint.
  const step = () => {
    const rail = railRef.current
    if (!rail) return 0
    const [a, b] = Array.from(rail.children) as HTMLElement[]
    if (!a) return 0
    return b ? b.offsetLeft - a.offsetLeft : a.offsetWidth
  }

  const sync = useCallback(() => {
    const rail = railRef.current
    const width = step()
    if (!rail || !width) return
    setIndex(Math.round(rail.scrollLeft / width))
  }, [])

  // Card widths are in rem, so a breakpoint change moves the snap points
  // without firing a scroll event. Re-read on resize or the counter drifts.
  useEffect(() => {
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  const scroll = (direction: -1 | 1) => railRef.current?.scrollBy({ left: direction * step(), behavior: 'smooth' })

  const atStart = index <= 0
  const atEnd = index >= items.length - 1

  return (
    <div className="w-full">
      <div
        ref={railRef}
        onScroll={sync}
        aria-label={railLabel}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={`/products/${item.slug}`}
            className="group focus-visible:outline-primary relative flex h-64 w-[13rem] shrink-0 snap-start flex-col justify-end overflow-hidden border border-white/25 p-5 transition-colors duration-300 hover:border-white/60 focus-visible:outline-2 focus-visible:-outline-offset-2"
          >
            <Wireframe label={item.name} ratio="portrait" tone="dark" hideLabel className="absolute inset-0 !aspect-auto size-full !border-0" />
            {/* Bottom-weighted, matching ImageCard elsewhere in the system, so
                the name reads against the dark end of the photograph. */}
            <div className="from-default-950 via-default-950/70 absolute inset-0 bg-linear-to-t to-transparent" />

            <h3 className="relative text-lg leading-tight font-semibold text-white">{item.name}</h3>

            <span className="sr-only">{`${i + 1} of ${items.length}`}</span>
          </Link>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-6">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={atStart}
            aria-label={prevLabel}
            className="focus-visible:outline-primary flex size-11 items-center justify-center border border-white/30 text-white transition disabled:opacity-30 enabled:hover:bg-white enabled:hover:text-default-950 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Icon icon="tabler:arrow-narrow-left" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label={nextLabel}
            className="focus-visible:outline-primary flex size-11 items-center justify-center border border-white/30 text-white transition disabled:opacity-30 enabled:hover:bg-white enabled:hover:text-default-950 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Icon icon="tabler:arrow-narrow-right" className="size-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 text-white tabular-nums" aria-hidden="true">
          <span className="text-lg">{String(Math.min(index + 1, items.length)).padStart(2, '0')}</span>
          <span className="h-px w-10 bg-white/40" />
          <span className="text-default-300 text-lg">{String(items.length).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  )
}

export default HeroRail
