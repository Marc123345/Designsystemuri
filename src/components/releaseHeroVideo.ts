/** Every hero film on the page. All three call sites want the same set. */
function eachHero(fn: (v: HTMLVideoElement) => void) {
  document.querySelectorAll<HTMLVideoElement>('video[data-hero-video]').forEach(fn)
}

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
/**
 * Do not fetch the film at all when the visitor has asked us not to.
 *
 * `Save-Data` is an explicit request — Chrome's Lite mode, Android's Data
 * Saver, most carrier-managed handsets — and `effectiveType` of 2g or slow-2g
 * is the browser's own measurement of a connection on which a 117 KB
 * background loop is the wrong thing to spend the visitor's first seconds on.
 * On either, the hero stays at preload="none" and never plays.
 *
 * Nothing looks broken, and that is why this is safe to do silently: `poster`
 * is a 27 KB frame of the same film, it is an image attribute so preload does
 * not gate it, and it is already what fills the hero for the first moments of
 * every visit. The result is the reduced-motion treatment — a still, correctly
 * cropped, with the type over it — reached by a different door.
 *
 * Read at call time rather than cached. A connection can change between
 * arrival and a tab coming back into the foreground, and `saveData` is a
 * setting the visitor can toggle mid-session.
 *
 * Exported because SiteIntro asks the same question about the intro clip, and
 * two copies of a rule like this drift — one of them gets a new effectiveType
 * and the other does not.
 */
type NetworkInformation = { saveData?: boolean; effectiveType?: string }

export function wantsLightMedia() {
  const c = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (!c) return false
  return c.saveData === true || c.effectiveType === '2g' || c.effectiveType === 'slow-2g'
}

function playAll(rewind: boolean) {
  if (wantsLightMedia()) return
  eachHero((v) => {
    /* Scrolled past. The observer below owns this flag; playing here would
       undo it on every tab return and hand the visitor a decoding video
       somewhere above the fold they are not looking at. */
    if (v.dataset.heroOffscreen === '1') return

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

/**
 * Stop decoding once the hero has been scrolled past.
 *
 * A `loop`ing background video runs for as long as the page is open. The hero
 * is one viewport tall and the pages under it are long, so on a normal read
 * the film spends most of its life decoding a frame every 40ms into a box
 * nobody can see — main-thread and GPU work, and on a phone battery and heat,
 * competing with the images and the animations further down that the visitor
 * IS looking at. The browser suspends this for a hidden TAB; it does not do it
 * for an element scrolled out of view.
 *
 * `rootMargin` of 200px so it resumes just before it is back on screen, and no
 * `threshold`, so it is the default: any pixel showing counts as visible.
 * Pausing also stops the buffer filling, which is the second saving on a
 * connection that was going to keep pulling the loop.
 *
 * It never rewinds. Scrolling back up to a film that jump-cuts to its first
 * frame is more noticeable than one that has simply carried on.
 */
let offscreenBound = false

function bindOffscreenPause() {
  if (offscreenBound || typeof IntersectionObserver === 'undefined') return
  offscreenBound = true

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const v = e.target as HTMLVideoElement
        if (e.isIntersecting) {
          delete v.dataset.heroOffscreen
          if (!wantsLightMedia()) void v.play().catch(() => {})
        } else {
          v.dataset.heroOffscreen = '1'
          v.pause()
        }
      })
    },
    { rootMargin: '200px 0px' },
  )

  eachHero((v) => observer.observe(v))
}

export function releaseHeroVideo() {
  bindResume()
  bindOffscreenPause()
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
  if (wantsLightMedia()) return
  eachHero((v) => {
    if (v.preload !== 'auto') v.preload = 'auto'
  })
}
