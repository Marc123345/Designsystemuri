'use client'

import { useEffect, useRef } from 'react'

/**
 * A figure that counts up when it scrolls into view.
 *
 * Ported from the Saleschannel `PanAfricaProofBar` ticker, which runs
 * framer-motion's `animate(0, n, { duration: 2.5, ease: [0.16, 1, 0.3, 1] })`
 * and writes the rounded value straight to `textContent`. Same duration, same
 * curve, evaluated by hand on a rAF loop — framer-motion is in package.json and
 * used nowhere in this project, and a four-figure stat bar is not the reason to
 * start shipping it.
 *
 * Three things it does that the reference does not:
 *
 *  - It waits. The reference animates on mount, and its stat bar sits well below
 *    the fold, so on any real page load the count is finished before anyone
 *    sees it. This starts when the figure is actually in view.
 *
 *  - The final value is what the server renders. The element's text is the real
 *    number in the HTML, and the client only replaces it once the animation is
 *    about to run. A crawler, a reader with JavaScript off, and anyone whose
 *    animation never fires all see "50", not "0".
 *
 *  - `prefers-reduced-motion` skips it outright, leaving the value in place.
 *
 * The suffix is split off rather than parsed away, so "50+", "100%" and "12"
 * all keep whatever trails the digits.
 */

/** Matches the reference's ease — a fast start settling long, like easeOutExpo. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
const DURATION = 2500

const Counter = ({ value, className = '' }: { value: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null)

  /* Split "50+" into 50 and "+", "100%" into 100 and "%". A value with no
     digits at all falls through untouched and never animates. */
  const digits = value.match(/[\d.]+/)?.[0] ?? ''
  const target = Number.parseFloat(digits)
  const suffix = digits ? value.slice(value.indexOf(digits) + digits.length) : ''
  const prefix = digits ? value.slice(0, value.indexOf(digits)) : value

  useEffect(() => {
    const node = ref.current
    if (!node || !Number.isFinite(target)) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    let raf = 0
    let start = 0

    const run = () => {
      const step = (now: number) => {
        if (!start) start = now
        const p = Math.min(1, (now - start) / DURATION)
        node.textContent = String(Math.round(easeOutExpo(p) * target))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        run()
      },
      { rootMargin: '0px 0px -15% 0px' }
    )
    io.observe(node)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target])

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>{digits || value}</span>
      {suffix}
    </span>
  )
}

export default Counter
