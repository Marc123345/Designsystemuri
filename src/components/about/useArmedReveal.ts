'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Desktop-only scroll reveal for the About page (Marc, Oct 2026).
 *
 * Nothing is hidden by the server render. After mount, a block is "armed"
 * (put into its pre-animation state) only when all of these hold:
 *  - the viewport is desktop width (lg) and the visitor allows motion;
 *  - the block starts below the fold, so arming it never makes visible
 *    content blink out.
 * It then plays once when it scrolls in. Phones, reduced motion, no JS and
 * blocks already on screen all simply show the finished state.
 *
 * Style the children off the container's `data-state` with a named group:
 *   <div ref={ref} data-state={state} className="group/rv">
 *     <p className="transition duration-700 group-data-[state=armed]/rv:opacity-0" />
 */
export function useArmedReveal<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null)
  const [state, setState] = useState<'static' | 'armed' | 'in'>('static')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (!window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return

    setState('armed')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setState('in')
        io.disconnect()
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return [ref, state] as const
}
