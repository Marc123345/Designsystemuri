'use client'

import { Link } from '@/i18n/navigation'
import { Icon } from '@iconify/react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

export type ProofArcItem = {
  meta: string
  title: string
  href: string
  image: { src: string; alt: string; position?: string }
}

type ProofArcProps = {
  items: ProofArcItem[]
  aspect?: 'portrait' | 'landscape'
}

/**
 * Half-height EID proof carousel. The 3D arc, drag, keyboard and pointer tilt
 * stay intact, but navigation now lives inside the stage and adds no vertical
 * chrome below the cards.
 */
const ProofArc = ({ items, aspect = 'portrait' }: ProofArcProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const dragRef = useRef({ startX: 0, hasMoved: false, isDragging: false })

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const smoothTiltX = useSpring(tiltX, { stiffness: 150, damping: 20, mass: 0.4 })
  const smoothTiltY = useSpring(tiltY, { stiffness: 150, damping: 20, mass: 0.4 })
  const rotateX = useTransform(smoothTiltY, [-1, 1], [3, -3])
  const rotateY = useTransform(smoothTiltX, [-1, 1], [-4, 4])

  const navigateTo = useCallback(
    (next: number) => {
      setActiveIndex(Math.max(0, Math.min(items.length - 1, next)))
    },
    [items.length],
  )

  useEffect(() => {
    tiltX.set(0)
    tiltY.set(0)
  }, [activeIndex, tiltX, tiltY])

  if (!items.length) return null

  const desktopHeight = aspect === 'landscape' ? 245 : 275

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { startX: event.clientX, hasMoved: false, isDragging: true }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return
    if (Math.abs(event.clientX - dragRef.current.startX) > 12) dragRef.current.hasMoved = true
  }

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return
    const delta = event.clientX - dragRef.current.startX
    dragRef.current.isDragging = false

    if (Math.abs(delta) > 46) {
      navigateTo(activeIndex + (delta < 0 ? 1 : -1))
    }

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture?.(event.pointerId)
    }
  }

  return (
    <div className="relative w-full" aria-roledescription="carousel" aria-label="Why tool makers qualify EID">
      <div className="-mx-4 overflow-x-auto px-4 pb-1 md:hidden">
        <div className="flex snap-x snap-mandatory gap-3">
          {items.map((item, index) => (
            <Link
              key={`${item.meta}-${item.href}`}
              href={item.href}
              className="group rounded-card border-primary-1/30 bg-primary-3 relative aspect-video w-[76vw] max-w-[320px] shrink-0 snap-center overflow-hidden border focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="76vw"
                draggable={false}
                className={`object-cover transition-transform duration-700 group-hover:scale-[1.025] ${item.image.position ?? 'object-center'}`}
              />
              <div aria-hidden className="from-primary-3 via-primary-3/34 absolute inset-0 bg-linear-to-t to-transparent" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="font-mono text-[8px] tracking-[0.2em] text-white/85 uppercase">
                  {String(index + 1).padStart(2, '0')} · {item.meta}
                </span>
                <span className="font-mono text-[8px] tracking-[0.18em] text-white/42 uppercase">Proof</span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="max-w-[16ch] text-[20px] leading-[1] font-semibold tracking-[-0.025em] text-white">{item.title}</h3>
                <span className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-white/90">
                  View proof
                  <Icon icon="tabler:arrow-up-right" className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div
        className="relative hidden w-full select-none md:block"
        style={{ perspective: '1500px', height: desktopHeight, touchAction: 'pan-y' }}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') navigateTo(activeIndex - 1)
          if (event.key === 'ArrowRight') navigateTo(activeIndex + 1)
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        aria-label="Proof carousel. Use left and right arrow keys or drag horizontally."
      >
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {items.map((item, index) => {
            const offset = index - activeIndex
            const distance = Math.abs(offset)
            const isActive = distance === 0
            const translate = offset * 66
            const pitch = offset < 0 ? 29 : -29
            const transform = `translate(-50%, -50%) translateX(${translate}%) rotateY(${isActive ? 0 : pitch}deg) translateZ(${isActive ? 0 : -115}px) scale(${isActive ? 1 : 0.86})`

            return (
              <Link
                key={`${item.meta}-${item.href}`}
                href={item.href}
                onClick={(event) => {
                  if (dragRef.current.hasMoved) {
                    event.preventDefault()
                    return
                  }
                  if (!isActive) {
                    event.preventDefault()
                    navigateTo(index)
                  }
                }}
                className="rounded-card absolute left-1/2 top-1/2 overflow-hidden border border-white/15 bg-primary-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                style={{
                  width: 'min(320px, 32vw)',
                  height: desktopHeight,
                  transform,
                  transformStyle: 'preserve-3d',
                  opacity: isActive ? 1 : 0.42,
                  zIndex: isActive ? 20 : 10 - distance,
                  transition: reducedMotion
                    ? 'none'
                    : 'transform 760ms cubic-bezier(0.16,1,0.3,1), opacity 520ms ease, box-shadow 520ms ease, filter 520ms ease',
                  boxShadow: isActive ? '0 22px 52px -26px rgba(0,0,0,.74), 0 0 0 1px rgba(255,255,255,.05)' : '0 8px 24px -22px rgba(0,0,0,.68)',
                  filter: isActive ? 'none' : 'saturate(.72) brightness(.78)',
                }}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`${String(index + 1).padStart(2, '0')} ${item.meta}: ${item.title}`}
              >
                <motion.div
                  className="group relative h-full w-full"
                  style={isActive && !reducedMotion ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
                  onPointerMove={(event) => {
                    if (!isActive || reducedMotion) return
                    const rect = event.currentTarget.getBoundingClientRect()
                    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
                    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2
                    tiltX.set(Math.max(-1, Math.min(1, nx)))
                    tiltY.set(Math.max(-1, Math.min(1, ny)))
                  }}
                  onPointerLeave={() => {
                    tiltX.set(0)
                    tiltY.set(0)
                  }}
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, 32vw"
                    draggable={false}
                    className={`object-cover transition-transform duration-700 group-hover:scale-[1.016] ${item.image.position ?? 'object-center'}`}
                  />

                  <div aria-hidden className="from-primary-3 via-primary-3/24 absolute inset-0 bg-linear-to-t to-transparent" />
                  <div aria-hidden className="from-primary-3/48 absolute inset-0 bg-linear-to-b via-transparent to-transparent" />
                  <div
                    aria-hidden
                    className="bg-primary-1 absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-500"
                    style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                  />

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4.5">
                    <span className="font-mono text-[8px] tracking-[0.21em] text-white/86 uppercase">
                      {String(index + 1).padStart(2, '0')} · {item.meta}
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.18em] text-white/42 uppercase">Proof</span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4.5">
                    <h3 className="max-w-[14ch] text-[clamp(1.28rem,2vw,1.7rem)] leading-[1] font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                    <span className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-white/90 transition-colors group-hover:text-white">
                      View proof
                      <Icon icon="tabler:arrow-up-right" className="size-3" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => navigateTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous proof point"
          className="rounded-control absolute left-1 top-1/2 z-30 flex size-9 -translate-y-1/2 items-center justify-center border border-white/15 bg-primary-3/75 text-white backdrop-blur-md transition-colors hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-25 lg:left-5"
        >
          <Icon icon="tabler:chevron-left" className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => navigateTo(activeIndex + 1)}
          disabled={activeIndex === items.length - 1}
          aria-label="Next proof point"
          className="rounded-control absolute right-1 top-1/2 z-30 flex size-9 -translate-y-1/2 items-center justify-center border border-white/15 bg-primary-3/75 text-white backdrop-blur-md transition-colors hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-25 lg:right-5"
        >
          <Icon icon="tabler:chevron-right" className="size-4" />
        </button>

        <div className="absolute bottom-2 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-primary-3/65 px-2.5 py-1 backdrop-blur-md" aria-label="Choose proof point">
          {items.map((item, index) => (
            <button
              key={item.meta}
              type="button"
              onClick={() => navigateTo(index)}
              aria-label={`Show ${item.meta}`}
              aria-pressed={index === activeIndex}
              className={`h-1 rounded-full transition-all ${index === activeIndex ? 'bg-primary-1 w-5' : 'w-1.5 bg-white/25 hover:bg-white/45'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProofArc
