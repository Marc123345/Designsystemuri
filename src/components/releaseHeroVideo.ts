/**
 * Start the hero film once whatever is covering it has gone.
 *
 * The hero <video> deliberately has no `autoPlay`: with it, the clip begins
 * the moment the browser can play it, which on a first visit is behind a
 * full-screen intro. Several seconds of a short loop get spent where nobody
 * can see them, so the first thing a visitor actually sees is the middle of a
 * shot rather than its opening.
 *
 * The hero carries `data-hero-video` and starts paused. This rewinds and plays
 * it, and is called from exactly two places in SiteIntro: after the swoosh
 * finishes, and on the early-return path where no intro runs at all (second
 * visit this session, or reduced motion). That second call matters as much as
 * the first — without it a returning visitor gets a hero frozen on its poster.
 *
 * Deliberately forgiving. `play()` rejects when a browser refuses autoplay,
 * and that is expected rather than exceptional: muted inline video is normally
 * allowed, but policy varies and iOS Low Power Mode blocks it outright.
 * Swallowing it is correct — the poster is a real frame of the real film, so a
 * hero that never plays still looks finished.
 *
 * Its own module rather than an export from SiteIntro, so importing it does
 * not drag a client component into a server one.
 */
function playAll(rewind: boolean) {
  document.querySelectorAll<HTMLVideoElement>('video[data-hero-video]').forEach((v) => {
    if (rewind) {
      try {
        v.currentTime = 0
      } catch {
        /* Seeking before metadata arrives throws; it will start from wherever
           it is, which is still the right side of the intro. */
      }
    }
    void v.play().catch(() => {})
  })
}

/**
 * Resume after a background tab.
 *
 * Found while testing: a tab that goes to the background has its video paused
 * by the browser, and a clip started by a `play()` call does not reliably
 * resume when the tab comes forward again — unlike one with the `autoPlay`
 * attribute, which the browser owns. Open the site in a background tab, come
 * back a minute later, and the hero is frozen mid-frame.
 *
 * One listener, registered once, for the life of the page. It does NOT rewind:
 * someone returning to a tab wants the film to carry on, not restart.
 */
let resumeBound = false

function bindResume() {
  if (resumeBound) return
  resumeBound = true
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) playAll(false)
  })
}

export function releaseHeroVideo() {
  bindResume()
  playAll(true)
}
