'use client'

import { useEffect, useRef, useState } from 'react'
import { releaseHeroVideo } from '@/components/releaseHeroVideo'

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
const POSTER = 'https://ik.imagekit.io/qcvroy8xpd/EID%20NEW.mp4/ik-thumbnail.jpg?tr=so-2'

/** How long the film holds before the swoosh begins. */
const HOLD = 3000
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
    let swooshTimer = 0

    /** Take the panel down. Idempotent — every dismissal path lands here. */
    const finish = () => {
      if (done.current) return
      done.current = true
      window.clearTimeout(holdTimer)
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
    holdTimer = window.setTimeout(finish, HOLD)

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
      window.clearTimeout(swooshTimer)
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
        // THE SWOOSH. The panel lifts and its bottom corners round to the
        // site's 24px as it goes, so the intro leaves in the shape the hero
        // arrives in. `transform` and `border-radius` only — both compositor
        // friendly, and nothing under here reflows.
        transform: leaving ? 'translateY(-100%)' : 'translateY(0)',
        borderBottomLeftRadius: leaving ? 'var(--radius-card)' : '0px',
        borderBottomRightRadius: leaving ? 'var(--radius-card)' : '0px',
        transition: `transform ${SWOOSH}ms cubic-bezier(0.76, 0, 0.24, 1), border-radius ${SWOOSH}ms ease-out`,
      }}
    >
      <video
        className="size-full object-cover"
        src={VIDEO}
        poster={POSTER}
        autoPlay
        muted
        playsInline
        preload="auto"
      />

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
