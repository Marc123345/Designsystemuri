'use client'

import CountUp from '@/components/CountUp'
import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export type ArcStoryItem = {
  kicker?: string
  value?: string
  title: string
  body?: string
  image?: { src: string; alt: string; position?: string }
  tone?: 'navy' | 'blue' | 'light'
  panel?: 'overlay' | 'cut'
}

type ArcStoryProps = {
  items: ArcStoryItem[]
  ariaLabel: string
  cardHeight?: number
}

const toneClasses: Record<NonNullable<ArcStoryItem['tone']>, string> = {
  navy: 'bg-primary-3 text-white',
  blue: 'bg-primary text-white',
  light: 'bg-white text-default-900',
}

/**
 * Shared arc/depth interaction for editorial story cards.
 *
 * It deliberately mirrors the homepage proof carousel: one dominant card,
 * neighbouring cards pitched backwards in perspective, drag + arrow controls,
 * and a native snap rail on touch screens. The content can be photographic,
 * numeric or manifesto-like, so the same motion language can carry both the
 * QC sequence and the About evidence/story sequence without duplicating the
 * interaction code.
 */
const ArcStory = ({ items, ariaLabel, cardHeight = 470 }: ArcStoryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const dragRef = useRef({ startX: 0, hasMoved: false, isDragging: false })

  const navigateTo = useCallback(
    (next: number) => setActiveIndex(Math.max(0, Math.min(items.length - 1, next))),
    [items.length],
  )

  if (!items.length) return null

  const renderCardContent = (item: ArcStoryItem, index: number, mobile = false) => {
    const tone = item.tone ?? (item.image ? 'navy' : 'light')
    const hasImage = Boolean(item.image)
    const isCut = item.panel === 'cut'

    return (
      <div className={`group relative h-full w-full overflow-hidden ${toneClasses[tone]}`}>
        {item.image && (
          <>
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes={mobile ? '82vw' : '(min-width: 1024px) 430px, 44vw'}
              draggable={false}
              className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] ${item.image.position ?? 'object-center'}`}
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-primary-3/82 via-primary-3/16 to-primary-3/8" />
          </>
        )}

        {isCut && hasImage ? (
          <div
            className="bg-primary-3 absolute inset-x-4 bottom-4 overflow-hidden rounded-[18px] px-5 py-5 text-left text-white shadow-[0_18px_38px_-20px_rgba(2,6,23,0.72)] transition-transform duration-500 group-hover:-translate-y-1 md:inset-x-5 md:bottom-5 md:px-6 md:py-6"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 76%, 88% 100%, 0 100%)' }}
          >
            <span className="font-mono text-[10px] tracking-[0.22em] text-white/64 uppercase">
              {item.kicker ?? String(index + 1).padStart(2, '0')}
            </span>
            {item.value && <div className="mt-2 text-[42px] leading-none font-bold tracking-[-0.05em] text-white"><CountUp value={item.value} /></div>}
            <h3 className="mt-2 max-w-[18ch] text-[20px] leading-[1.06] font-semibold tracking-[-0.025em] text-white text-balance md:text-[23px]">{item.title}</h3>
            {item.body && <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-white/78">{item.body}</p>}
          </div>
        ) : (
          <div className={`absolute inset-0 flex flex-col ${hasImage ? 'justify-end p-7 md:p-8' : 'justify-center p-8 md:p-10'}`}>
            <span className={`font-mono text-[10px] tracking-[0.24em] uppercase ${tone === 'light' ? 'text-primary' : 'text-white/62'}`}>
              {item.kicker ?? String(index + 1).padStart(2, '0')}
            </span>
            {item.value && (
              <div className={`mt-4 text-[64px] leading-none font-bold tracking-[-0.065em] md:text-[78px] ${tone === 'light' ? 'text-primary' : 'text-white'}`}>
                <CountUp value={item.value} />
              </div>
            )}
            <h3 className={`mt-3 max-w-[17ch] text-[24px] leading-[1.04] font-semibold tracking-[-0.03em] text-balance md:text-[30px] ${tone === 'light' ? 'text-default-900' : 'text-white'}`}>
              {item.title}
            </h3>
            {item.body && (
              <p className={`mt-5 max-w-[38ch] text-[15px] leading-relaxed md:text-base ${tone === 'light' ? 'text-default-600' : 'text-white/78'}`}>
                {item.body}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // A pointerdown from a nested arrow/card bubbles here. Capturing at this
    // point steals the later pointerup/click from that control, so only record
    // the possible drag until the pointer actually moves horizontally.
    dragRef.current = { startX: event.clientX, hasMoved: false, isDragging: true }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return

    if (Math.abs(event.clientX - dragRef.current.startX) > 12) {
      if (!dragRef.current.hasMoved) {
        dragRef.current.hasMoved = true
        if (!event.currentTarget.hasPointerCapture?.(event.pointerId)) {
          event.currentTarget.setPointerCapture?.(event.pointerId)
        }
      }
    }
  }

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return
    const delta = event.clientX - dragRef.current.startX
    dragRef.current.isDragging = false

    if (Math.abs(delta) > 52) navigateTo(activeIndex + (delta < 0 ? 1 : -1))

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture?.(event.pointerId)
    }
  }

  return (
    <div className="relative w-full" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div className="-mx-4 overflow-x-auto px-4 pb-3 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4">
          {items.map((item, index) => (
            <div
              key={`${item.kicker ?? index}-${item.title}`}
              className="rounded-card relative aspect-[4/5] w-[82vw] max-w-[360px] shrink-0 snap-center overflow-hidden border border-default-200 shadow-[0_20px_42px_-28px_rgba(2,6,23,0.38)]"
            >
              {renderCardContent(item, index, true)}
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative hidden w-full select-none md:block"
        style={{ perspective: '1600px', height: cardHeight + 78, touchAction: 'pan-y' }}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') navigateTo(activeIndex - 1)
          if (event.key === 'ArrowRight') navigateTo(activeIndex + 1)
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        aria-label={`${ariaLabel}. Use left and right arrow keys or drag horizontally.`}
      >
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {items.map((item, index) => {
            const offset = index - activeIndex
            const distance = Math.abs(offset)
            const isActive = distance === 0
            const translate = offset * 76
            const pitch = offset < 0 ? 33 : -33
            const transform = `translate(-50%, -50%) translateX(${translate}%) rotateY(${isActive ? 0 : pitch}deg) translateZ(${isActive ? 0 : -160}px) scale(${isActive ? 1 : 0.82})`

            return (
              <button
                key={`${item.kicker ?? index}-${item.title}`}
                type="button"
                onClick={(event) => {
                  if (dragRef.current.hasMoved) {
                    event.preventDefault()
                    return
                  }
                  navigateTo(index)
                }}
                className="rounded-card absolute left-1/2 top-1/2 overflow-hidden border border-white/12 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                style={{
                  width: 'min(430px, 44vw)',
                  height: cardHeight,
                  transform,
                  transformStyle: 'preserve-3d',
                  opacity: distance > 2 ? 0 : isActive ? 1 : 0.46,
                  zIndex: isActive ? 30 : 20 - distance,
                  pointerEvents: distance > 1 ? 'none' : 'auto',
                  transition: reducedMotion
                    ? 'none'
                    : 'transform 800ms cubic-bezier(0.16,1,0.3,1), opacity 560ms ease, box-shadow 560ms ease, filter 560ms ease',
                  boxShadow: isActive ? '0 32px 84px -30px rgba(2,6,23,.58), 0 0 0 1px rgba(255,255,255,.05)' : '0 12px 34px -25px rgba(2,6,23,.44)',
                  filter: isActive ? 'none' : 'saturate(.72) brightness(.82)',
                }}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Show ${item.title}`}
              >
                {renderCardContent(item, index)}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => navigateTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous card"
          className="rounded-control bg-primary-3/82 absolute left-2 top-1/2 z-40 flex size-11 -translate-y-1/2 items-center justify-center border border-white/15 text-white backdrop-blur-md transition-colors hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-25 lg:left-7"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => navigateTo(activeIndex + 1)}
          disabled={activeIndex === items.length - 1}
          aria-label="Next card"
          className="rounded-control bg-primary-3/82 absolute right-2 top-1/2 z-40 flex size-11 -translate-y-1/2 items-center justify-center border border-white/15 text-white backdrop-blur-md transition-colors hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-25 lg:right-7"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-5 hidden flex-col items-center gap-4 md:flex" aria-live="polite">
        <p className="font-mono text-[10px] tracking-[0.24em] text-default-500 uppercase">
          {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} · {items[activeIndex].title}
        </p>
        <div className="flex items-center gap-2" aria-label="Choose card">
          {items.map((item, index) => (
            <button
              key={`${item.kicker ?? index}-dot`}
              type="button"
              onClick={() => navigateTo(index)}
              aria-label={`Show ${item.title}`}
              aria-pressed={index === activeIndex}
              className={`h-0.5 transition-all ${index === activeIndex ? 'w-8 bg-primary' : 'w-4 bg-default-300 hover:bg-default-500'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArcStory
