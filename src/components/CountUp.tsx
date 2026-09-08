'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * A figure that counts up to its value when it scrolls into view.
 *
 * ── It renders the real number first, then animates on top of it ────────────
 *
 * `useState(target)` rather than `useState(0)`. The figure is server-rendered
 * as its final value and is correct before any JavaScript runs, so a reader on
 * a slow connection, with JS blocked, or on a page whose observer never fires
 * sees "100%" rather than "0%" or an empty span. The animation only ever
 * replaces a correct number with the same correct number.
 *
 * That matters more here than it looks: these figures are claims about the QC
 * process. A stat that reads 0 because a script did not run is worse than a
 * stat that never moved.
 *
 * ── Reduced motion is honoured, not approximated ────────────────────────────
 *
 * Under `prefers-reduced-motion: reduce` it does not animate at all — no
 * shortened duration, no fade. The value is simply there.
 *
 * ── Parsing ─────────────────────────────────────────────────────────────────
 *
 * Values arrive as display strings: "100%", "4", "9001". Anything non-numeric
 * around the digits is kept and reattached, so the suffix does not disappear
 * mid-count and the layout does not shift as digits are added.
 */
export default function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const match = /^(\D*)([\d,]+)(.*)$/.exec(value)
  const target = match ? Number(match[2].replace(/,/g, '')) : NaN
  const prefix = match?.[1] ?? ''
  const suffix = match?.[3] ?? ''

  const [shown, setShown] = useState(target)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!Number.isFinite(target)) return
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)

          const start = performance.now()
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            // ease-out cubic: quick off the mark, settles onto the real figure
            setShown(Math.round(target * (1 - Math.pow(1 - p, 3))))
            if (p < 1) frame = requestAnimationFrame(step)
          }
          setShown(0)
          frame = requestAnimationFrame(step)
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [target, duration])

  // Not a number we can count (or a malformed value): render it as given.
  if (!Number.isFinite(target)) return <span>{value}</span>

  return (
    <span ref={ref}>
      {prefix}
      {shown.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
