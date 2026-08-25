'use client'

import { useEffect, useRef, useState } from 'react'
import { releaseHeroVideo } from '@/components/releaseHeroVideo'
import { videoSources, videoPoster } from '@/components/videoSources'

/**
 * The brand intro: the EID film, then a swoosh into the page.
 *
 * ── Why this replaced the loader rather than sitting next to it ────────────
 *
 * SiteLoader's own docblock left instructions for this request:
 *
 *   "because the site is prerendered, the honest behaviour is that this rarely
 *    shows. If the branded intro is wanted as a deliberate brand moment rather
 *    than as a progress indicator, that is a product decision to take
 *    explicitly — show it once per session on first visit, say — not something
 *    to get back by reinstating a fixed delay on every page load."
 *
 * That is exactly what this is, so it is built the way that note prescribes.
 * The loader is gone: it was measuring a wait that mostly does not exist on a
 * prerendered site, and keeping both would mean two full-screen overlays
 * competing to be first.
 *
 * ── ONCE PER SESSION, and why that is not optional ─────────────────────────
 *
 * A three-second film in front of every page load is a tax on the visitor who
 * is coming back to check a datasheet. `sessionStorage` means it plays on
 * arrival and never again until they close the tab — the brand moment stays a
 * moment.
 *
 * It also plays on whichever page they land on, not just home. Someone
 * arriving on /quality from a search result is having their first visit too.
 *
 * ── Always escapable ───────────────────────────────────────────────────────
 *
 * Click, any key, scroll, or touch dismisses it immediately, and there is a
 * visible Skip control. Scroll is locked while it is up, so an intro that
 * could not be dismissed would be a trap — and the one thing worse than a
 * splash screen is a splash screen you have to wait out.
 *
 * ── Timers, not frame callbacks ────────────────────────────────────────────
 *
 * Inherited from the loader, and the reason is worth keeping: rAF does not run
 * in a background tab. A link opened into one, or a tab switched away from
 * mid-load, would leave a full-screen panel with the page scroll locked behind
 * it for as long as it stayed unfocused. Timers are throttled in background
 * tabs but they do fire.
 *
 * ── Reduced motion skips it entirely ───────────────────────────────────────
 *
 * A full-screen film that wipes away is precisely the kind of unrequested
 * motion `prefers-reduced-motion` exists to prevent. There is no reduced
 * variant: the intro simply does not run, and the session flag is set so
 * nothing re-triggers.
 */

const VIDEO = 'https://ik.imagekit.io/qcvroy8xpd/EID%20NEW.mp4'
const SOURCES = videoSources(VIDEO)
const POSTER = videoPoster(VIDEO, 2)

/**
 * How long the film holds ONCE IT IS ACTUALLY PLAYING.
 *
 * Previously this ran from mount, which meant the intro's length had nothing
 * to do with whether anyone saw any film. On a slow connection the panel sat
 * on the poster frame for three seconds and then swooshed away having played
 * nothing — a splash screen with no splash. The timer now starts on the
 * video's `playing` event.
 */
const HOLD = 3000
/**
 * Hard ceiling from mount, whatever the video does.
 *
 * The counterpart to starting HOLD late: a clip that never plays — blocked
 * autoplay, a failed fetch, a codec nothing on the device supports — must not
 * be able to hold the page. Whichever of the two fires first wins, and
 * finish() is idempotent.
 */
const MAX_TOTAL = 4200
/** The swoosh itself. Matches the duration in the CSS transition below. */
const SWOOSH = 820
/** Session key. Bump it if the intro changes enough to be worth showing again. */
const SEEN = 'eid-intro-seen-v1'

const SiteIntro = () => {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const done = useRef(false)
  /** The dismissal, hoisted so the Skip button can call it directly. */
  const finishRef = useRef<() => void>(() => {})
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Second visit this session, or someone who does not want motion.
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN) === '1'
    } catch {
      /* Private mode can throw on access. Treat it as "not seen" and let the
         intro run; a visitor with storage disabled sees it once per page,
         which is a far better failure than never releasing the page. */
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (seen || reduced) {
      releaseHeroVideo()
      return
    }

    setVisible(true)

    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    let holdTimer = 0
    let ceilingTimer = 0
    let swooshTimer = 0

    /** Take the panel down. Idempotent — every dismissal path lands here. */
    const finish = () => {
      if (done.current) return
      done.current = true
      window.clearTimeout(holdTimer)
      window.clearTimeout(ceilingTimer)
      setLeaving(true)

      swooshTimer = window.setTimeout(() => {
        root.style.overflow = prevOverflow
        setVisible(false)
        // The hero film starts here rather than behind the panel, so the first
        // thing seen is its opening frame rather than its middle.
        releaseHeroVideo()
      }, SWOOSH)
    }

    finishRef.current = finish

    // The ceiling runs from now; the hold runs from first frame.
    ceilingTimer = window.setTimeout(finish, MAX_TOTAL)

    const video = videoRef.current
    const onPlaying = () => {
      window.clearTimeout(holdTimer)
      holdTimer = window.setTimeout(finish, HOLD)
    }
    video?.addEventListener('playing', onPlaying, { once: true })

    // Any intent to interact ends it. `once` on each, and all removed below.
    const opts = { once: true, passive: true } as const
    window.addEventListener('pointerdown', finish, opts)
    window.addEventListener('keydown', finish, opts)
    window.addEventListener('wheel', finish, opts)
    window.addEventListener('touchstart', finish, opts)

    try {
      sessionStorage.setItem(SEEN, '1')
    } catch {
      /* See above — not being able to record it is not a reason to block. */
    }

    return () => {
      window.clearTimeout(holdTimer)
      window.clearTimeout(ceilingTimer)
      window.clearTimeout(swooshTimer)
      video?.removeEventListener('playing', onPlaying)
      window.removeEventListener('pointerdown', finish)
      window.removeEventListener('keydown', finish)
      window.removeEventListener('wheel', finish)
      window.removeEventListener('touchstart', finish)
      // Never leave the page locked behind an unmounted overlay.
      root.style.overflow = prevOverflow
    }
  }, [])

  if (!visible) return null

  return (
    <div
      // Not a dialog: it traps nothing, announces nothing, and any key ends it.
      // `aria-hidden` keeps it out of the accessibility tree entirely, so a
      // screen-reader user is reading the page while this plays over it.
      aria-hidden
      className="bg-primary-3 fixed inset-0 z-[300] overflow-hidden"
      style={{
        // THE SWOOSH — transform only.
        //
        // ⚠ CORRECTION. The first version animated `border-radius` alongside
        // the transform and the comment claimed both were "compositor
        // friendly". That is wrong: transform is, border-radius is not. A
        // transitioning radius forces a repaint of the element every frame,
        // and this element is the full viewport with a playing video inside
        // it — the single most expensive thing on the page to repaint, for
        // 820ms, during the one animation a first-time visitor will judge the
        // site on.
        //
        // The rounded corner is kept, because it is a nice detail: it is just
        // applied in one step as the leave begins rather than interpolated.
        // At this speed nobody can tell the difference, and the animation runs
        // entirely on the compositor.
        //
        // `will-change` only while leaving. Declaring it permanently would
        // hold a composited layer for the whole visit to pay for one 820ms
        // move.
        transform: leaving ? 'translateY(-100%)' : 'translateY(0)',
        borderBottomLeftRadius: leaving ? 'var(--radius-card)' : '0px',
        borderBottomRightRadius: leaving ? 'var(--radius-card)' : '0px',
        transition: `transform ${SWOOSH}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        willChange: leaving ? 'transform' : undefined,
      }}
    >
      {/* `preload="auto"` is right here and wrong on the hero: this clip has
          to be playing within a second of arrival or the intro is a static
          poster, whereas the hero has time. WebM first — 473 KB against the
          MP4's 952 KB; see components/videoSources. */}
      <video
        ref={videoRef}
        className="size-full object-cover"
        poster={POSTER}
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        {SOURCES.map((s) => (
          <source key={s.type} src={s.src} type={s.type} />
        ))}
      </video>

      {/* A visible way out, for anyone who does not know the whole screen is
          clickable. Bottom-right so it is nowhere near the film's subject. */}
      <button
        type="button"
        // Calls the dismissal directly rather than relying on the window
        // listener catching the bubbled pointerdown. A button whose handler is
        // empty because "something else will notice the click" is the kind of
        // thing that breaks silently the first time event handling changes.
        onClick={() => finishRef.current()}
        className="absolute right-5 bottom-5 rounded-control border border-white/25 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-white/60 hover:text-white"
      >
        Skip
      </button>
    </div>
  )
}

export default SiteIntro
