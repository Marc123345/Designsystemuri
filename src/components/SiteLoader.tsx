'use client'

import Loader from '@/components/Loader'
import { useEffect, useState } from 'react'

/**
 * Owns the loader's lifetime and its 0–100 count.
 *
 * This replaces the [locale]/loading.tsx boundary it used to live in. A Suspense
 * boundary lasts exactly as long as the server render, and nearly every route
 * here is prerendered, so it flashed for a few milliseconds and was effectively
 * invisible.
 *
 * The previous version answered that by holding the screen for a fixed
 * DURATION of 3000ms with scroll locked, and driving the count across that
 * window. That made the number a decoration rather than a measurement: on a
 * warm load the page was ready in a few hundred milliseconds and the overlay
 * sat on top of finished content for the remaining two and a half seconds. On
 * a fully prerendered site the content is in the HTML, so a timed overlay does
 * not cover a wait — it manufactures one.
 *
 * So the rule now is: never cover content that is ready.
 *
 * - If the document has already finished loading by the time this mounts —
 *   the common case here, because the routes are static — the loader never
 *   appears at all. Nothing renders, on the server or the client, so there is
 *   no frame where it flashes into view and back out.
 * - If the document is genuinely still loading, it appears and tracks the real
 *   thing: the count eases toward a ceiling while assets are outstanding and
 *   runs to 100 once `load` actually fires.
 * - MIN_VISIBLE only applies once it has decided to show, so a loader that does
 *   appear is on screen long enough to read instead of strobing.
 * - MAX_WAIT is a safety valve. Scroll is locked while the panel is up, so a
 *   single hanging asset must never be able to trap the page behind it.
 *
 * Note for whoever picks this up: because the site is prerendered, the honest
 * behaviour is that this rarely shows. If the branded intro is wanted as a
 * deliberate brand moment rather than as a progress indicator, that is a
 * product decision to take explicitly — show it once per session on first
 * visit, say — not something to get back by reinstating a fixed delay on every
 * page load.
 */
const MIN_VISIBLE = 450
const MAX_WAIT = 8000
const LOADING_CEILING = 92
/** How long the opacity transition on the wrapper runs, in ms. */
const FADE = 520

const SiteLoader = ({ text = 'Loading' }: { text?: string }) => {
  // Starts false so nothing renders on the server or on the first client
  // render. The effect below is the only thing that can turn it on, and it
  // only does so when the page is genuinely still loading.
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Already done: the content is on screen and ready. Do nothing at all.
    if (document.readyState === 'complete') return

    setVisible(true)

    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const start = performance.now()
    let loaded = false
    let raf = 0
    let fadeTimer = 0
    let finished = false

    const onLoad = () => {
      loaded = true
    }
    window.addEventListener('load', onLoad, { once: true })

    /** Release the page. Idempotent — MAX_WAIT and a real load can both fire. */
    const finish = () => {
      if (finished) return
      finished = true
      setProgress(100)
      setFading(true)
      fadeTimer = window.setTimeout(() => {
        root.style.overflow = prevOverflow
        setVisible(false)
      }, FADE)
    }

    const tick = (now: number) => {
      const elapsed = now - start

      if (elapsed >= MAX_WAIT) {
        finish()
        return
      }

      // While assets are outstanding the count eases toward the ceiling and
      // waits there — it must not claim 100 before the page is ready. Once
      // load has fired it is free to arrive.
      if (loaded && elapsed >= MIN_VISIBLE) {
        finish()
        return
      }

      // easeOutCubic against MAX_WAIT: quick off the mark, settles as it goes.
      const t = Math.min(1, elapsed / MAX_WAIT)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.min(loaded ? 100 : LOADING_CEILING, eased * 100))

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(fadeTimer)
      window.removeEventListener('load', onLoad)
      root.style.overflow = prevOverflow
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`site-loader fixed inset-0 z-200 transition-opacity duration-500 ${fading ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
      <Loader text={text} progress={progress} />
    </div>
  )
}

export default SiteLoader
