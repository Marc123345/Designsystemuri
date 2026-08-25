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
/**
 * Hard ceiling on how long the panel can stay up.
 *
 * This started at 8000, which was a mistake: it was reasoned about as a safety
 * valve against a hung asset rather than as what a real visitor might sit
 * through. Watching an actual load showed the contact page holding for most of
 * it, because `window.load` waits on the Jotform embed — so the worst case of
 * the honest loader was nearly three times the fixed 3s delay it replaced.
 *
 * 2200ms instead. The content is prerendered and already painted underneath, so
 * nothing is gained by holding longer; past this point the overlay is not
 * covering a wait, it is being one.
 */
const MAX_WAIT = 2200
const LOADING_CEILING = 92
/** How long the opacity transition on the wrapper runs, in ms. */
const FADE = 520

/**
 * Start the hero film once the loader is out of the way.
 *
 * `autoPlay` on the <video> means the clip begins the moment the browser can
 * play it — which is *behind* a full-screen loading panel. On a 15-second loop
 * that is several seconds of the film spent where nobody can see it, so the
 * first thing a visitor actually sees is the middle of a shot rather than its
 * opening. It also spends bandwidth competing with the load the panel is
 * waiting on.
 *
 * So the hero now carries `data-hero-video` and starts paused, and this runs
 * when the panel finishes fading: rewind to zero, then play.
 *
 * Deliberately forgiving. `play()` returns a promise that rejects when a
 * browser refuses autoplay, and that rejection is expected rather than
 * exceptional — a muted inline video is normally allowed, but policy varies
 * and Low Power Mode on iOS blocks it outright. Swallowing it is correct: the
 * poster frame is a real frame of the real video, so a hero that never plays
 * still looks finished.
 *
 * Exported so the same handoff can be reused if another route ever needs it.
 */
export function releaseHeroVideo() {
  document.querySelectorAll<HTMLVideoElement>('video[data-hero-video]').forEach((v) => {
    try {
      v.currentTime = 0
    } catch {
      /* Seeking before metadata has arrived throws; the clip will start from
         wherever it is, which is still the right side of the loader. */
    }
    void v.play().catch(() => {})
  })
}

const SiteLoader = ({ text = 'Loading' }: { text?: string }) => {
  // Starts false so nothing renders on the server or on the first client
  // render. The effect below is the only thing that can turn it on, and it
  // only does so when the page is genuinely still loading.
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Already done: the content is on screen and ready. No panel — but the
    // hero is still paused waiting for one, so release it before returning.
    if (document.readyState === 'complete') {
      releaseHeroVideo()
      return
    }

    setVisible(true)

    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const start = performance.now()
    let loaded = false
    let raf = 0
    let fadeTimer = 0
    let minTimer = 0
    let finished = false

    /** Release the page. Idempotent — the deadline and a real load can both fire. */
    const finish = () => {
      if (finished) return
      finished = true
      window.clearTimeout(deadline)
      window.clearTimeout(minTimer)
      cancelAnimationFrame(raf)
      setProgress(100)
      setFading(true)
      fadeTimer = window.setTimeout(() => {
        root.style.overflow = prevOverflow
        setVisible(false)
        releaseHeroVideo()
      }, FADE)
    }

    /**
     * The deadline is a timer, not a frame callback.
     *
     * Both the dismissal and the scroll unlock used to live inside the
     * requestAnimationFrame loop below, and rAF does not run while a tab is in
     * the background. Open the site in a background tab — a link opened into
     * one, or switching away while it loads — and rAF pauses, so nothing ever
     * reached the code that takes the panel down. Coming back meant finding a
     * full-screen overlay with the page scroll still locked behind it, for as
     * long as the tab stayed unfocused. Caught by watching the DOM six seconds
     * into a load that should have released at 2.2.
     *
     * Timers are throttled in background tabs but they do fire, so the panel
     * always comes down. rAF now only animates the number, which is the one
     * thing that genuinely does not matter when nobody is looking.
     */
    const deadline = window.setTimeout(finish, MAX_WAIT)

    const onLoad = () => {
      loaded = true
      const elapsed = performance.now() - start
      // MIN_VISIBLE stops a loader that did appear from strobing, but it must
      // not be enforced by the frame loop either.
      if (elapsed >= MIN_VISIBLE) finish()
      else minTimer = window.setTimeout(finish, MIN_VISIBLE - elapsed)
    }
    window.addEventListener('load', onLoad, { once: true })

    const tick = (now: number) => {
      const elapsed = now - start
      if (finished) return

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
      window.clearTimeout(deadline)
      window.clearTimeout(minTimer)
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
