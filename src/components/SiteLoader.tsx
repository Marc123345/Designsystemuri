'use client'

import Loader from '@/components/Loader'
import { useEffect, useRef, useState } from 'react'

/**
 * Owns the loader's lifetime and its 0–100 count.
 *
 * This replaces the [locale]/loading.tsx boundary it used to live in. A Suspense
 * boundary lasts exactly as long as the server render, and nearly every route
 * here is prerendered, so it flashed for a few milliseconds and was effectively
 * invisible. Holding the screen for a readable beat has to be owned by the
 * client, which is what this does.
 *
 * The count is honest at both ends and eased in between. It climbs on a curve
 * toward a ceiling of 92 while the page is still loading, then runs to 100 once
 * `window.load` has actually fired — so it never claims 100 before the page is
 * ready, and it never stalls at 99 waiting for a slow asset either. On a warm
 * cache load fires almost immediately and the count simply runs its full
 * duration; on a cold or throttled connection the ceiling is what holds it back.
 *
 * DURATION is the whole point: it guarantees the panel is on screen long enough
 * to read rather than strobing. The count is driven across exactly that window,
 * so 100 lands at the moment the panel starts to leave — an earlier version held
 * a separate minimum-visible timer, which meant the number sat at 100 for half a
 * second looking stalled before anything happened.
 */
const DURATION = 3000
const LOADING_CEILING = 92

const SiteLoader = ({ text = 'Loading' }: { text?: string }) => {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [gone, setGone] = useState(false)
  const startRef = useRef<number>(0)

  useEffect(() => {
    // Anything already loaded before hydration counts as loaded.
    let loaded = document.readyState === 'complete'
    const onLoad = () => {
      loaded = true
    }
    if (!loaded) window.addEventListener('load', onLoad, { once: true })

    // Scroll is locked while the panel covers the page, or the page behind it
    // scrolls under a fixed overlay and lands somewhere unexpected.
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    startRef.current = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const t = Math.min(1, elapsed / DURATION)
      // easeOutCubic: quick off the mark, settles as it arrives.
      const eased = 1 - Math.pow(1 - t, 3)
      // The ceiling is what holds the count back on a cold connection; once load
      // has fired the curve is free to arrive, and it arrives at DURATION.
      const target = loaded ? 100 : LOADING_CEILING
      const next = Math.min(target, eased * 100)

      setProgress(next)

      if (next >= 100) {
        setHidden(true)
        // Unmount only after the fade, so it does not pop off screen.
        window.setTimeout(() => {
          root.style.overflow = prevOverflow
          setGone(true)
        }, 520)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
      root.style.overflow = prevOverflow
    }
  }, [])

  if (gone) return null

  return (
    <div className={`site-loader fixed inset-0 z-200 transition-opacity duration-500 ${hidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
      <Loader text={text} progress={progress} />
    </div>
  )
}

export default SiteLoader
