'use client'

import CarouselCounter from '@/components/CarouselCounter'
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
  const [steps, setSteps] = useState(1)
  /**
   * Card pitch and the number of stops the rail actually has.
   *
   * `steps` is not the card count. With three cards visible out of eight the
   * rail runs out of scroll after six stops, so counting items would promise
   * two more presses than exist and the counter would never reach its own
   * total. Measured from scrollWidth, so it stays right at every breakpoint.
   */
  const measure = () => {
    const rail = railRef.current
    if (!rail) return null
    const [a, b] = Array.from(rail.children) as HTMLElement[]
    if (!a) return null
    const pitch = b ? b.offsetLeft - a.offsetLeft : a.offsetWidth
    if (!pitch) return null
    return { rail, pitch, max: Math.max(0, Math.round((rail.scrollWidth - rail.clientWidth) / pitch)) }
  }

  const sync = useCallback(() => {
    const m = measure()
    if (!m) return
    setIndex(Math.round(m.rail.scrollLeft / m.pitch))
    setSteps(m.max + 1)
  }, [])

  // Card widths are in rem, so a breakpoint change moves the snap points
  // without firing a scroll event. Also runs once on mount, since `steps` is
  // unknown until the rail has been laid out.
  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  // Relative `scrollBy`. An absolute `scrollTo` was tried here to make a burst
  // of presses accumulate exactly, and it stopped the rail moving at all under
  // `scroll-snap-type: x mandatory` — so this stays relative. The cost is that
  // presses landing inside an in-flight smooth scroll can be swallowed; the
  // rail is still swipeable and the counter stays truthful either way.
  const scroll = (direction: -1 | 1) => {
    const m = measure()
    if (!m) return
    m.rail.scrollBy({ left: direction * m.pitch, behavior: 'smooth' })
  }

  const atStart = index <= 0
  const atEnd = index >= steps - 1

  return (
    <div className="w-full">
      <div ref={railRef} onScroll={sync} aria-label={railLabel} className="flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={`/products/${item.slug}`}
            /* 12rem x 16rem — a 3:4 card. The old 13x16 was an arbitrary
               ratio, and at that width three cards plus the gaps left a 32px
               sliver of the fourth, which read as a card clipped by accident
               rather than as more to come. At 3:4 the peek is 80px. */
            className="group focus-visible:outline-primary relative flex h-64 w-48 shrink-0 snap-start flex-col justify-end overflow-hidden border border-white/25 p-5 transition-colors duration-300 hover:border-white/60 focus-visible:outline-2 focus-visible:-outline-offset-2"
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
            className="focus-visible:outline-primary enabled:hover:text-default-950 flex size-11 items-center justify-center border border-white/30 text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 enabled:hover:bg-white disabled:opacity-30"
          >
            <Icon icon="tabler:arrow-narrow-left" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label={nextLabel}
            className="focus-visible:outline-primary enabled:hover:text-default-950 flex size-11 items-center justify-center border border-white/30 text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 enabled:hover:bg-white disabled:opacity-30"
          >
            <Icon icon="tabler:arrow-narrow-right" className="size-5" />
          </button>
        </div>

        <CarouselCounter index={index} total={steps} tone="onDark" />
      </div>
    </div>
  )
}

export default HeroRail
