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
    /* The hero ships with preload="none" so it does not compete with the intro
       for bandwidth while it is hidden behind it — see the note in VideoHero.
       Releasing it is therefore two steps, not one: permit the fetch, then
       start it. Without this line play() still works, because play() forces a
       load on a preload="none" element, but it starts from nothing buffered
       and stalls on a slow connection. Raising preload first lets the browser
       begin buffering in the same tick. */
    if (v.preload !== 'auto') v.preload = 'auto'

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

/**
 * Let the hero start buffering while the intro is still on screen.
 *
 * The hero ships with preload="none" so it does not take bandwidth from the
 * clip the visitor is actually watching. Deferring it entirely to the end of
 * the swoosh overcorrects, though: the intro is ~334 KB and arrives long
 * before its three-second hold is up, so the connection then sits idle for
 * two seconds with a full-screen panel over a hero that has fetched nothing.
 *
 * SiteIntro calls this on the intro's `canplaythrough` — the point at which
 * the browser reckons it can finish the intro without stalling. Spending the
 * idle tail of the hold on the hero costs the intro nothing and means the film
 * behind the swoosh is buffered by the time the swoosh lifts.
 *
 * Raising `preload` only. It deliberately does not call play(), because a hero
 * that starts underneath the panel is the bug the whole no-autoPlay
 * arrangement exists to prevent — see the note at the top of this file.
 */
export function warmHeroVideo() {
  document.querySelectorAll<HTMLVideoElement>('video[data-hero-video]').forEach((v) => {
    if (v.preload !== 'auto') v.preload = 'auto'
  })
}
