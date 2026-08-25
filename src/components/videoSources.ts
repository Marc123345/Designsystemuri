/**
 * Turns an ImageKit MP4 into the responsive source ladder a <video> should
 * offer, plus its poster.
 *
 * ── Everything here was measured, not assumed ───────────────────────────────
 *
 * Fetched every variant and compared bytes. WebM at q-30, against the
 * untransformed masters (hero 1333 KB, intro 930 KB):
 *
 *              hero      intro
 *   w-720      170 KB    232 KB
 *   w-960      254 KB    270 KB
 *   full       439 KB    333 KB
 *
 * A phone that used to pull 1333 KB of hero now pulls 170 KB — an 87%
 * reduction on the connection least able to afford it. A 1080p laptop takes
 * the 960 rung at 254 KB.
 *
 * ── Quality: q-30, and a correction to what this file used to say ───────────
 *
 * ⚠ This block previously said quality transforms were useless, on the
 * evidence that `q-60` returned 1.5 MB — larger than the original. That
 * observation was right and the conclusion drawn from it was wrong. ImageKit's
 * default is about q-50, so q-60 asked for MORE quality than the source was
 * already carrying and re-encoded it upward. The mistake was testing in one
 * direction and generalising from it.
 *
 * Measured downward, on the hero clip in WebM:
 *
 *   q-60   1415 KB     ← above the default; inflates
 *   q-50    892 KB     ← the default, whether or not you ask for it
 *   q-40    629 KB
 *   q-30    439 KB     ← what we serve
 *   q-20    283 KB
 *
 * q-30 is chosen after looking, not after reading the byte counts. Frames from
 * q-50, q-30 and q-20 were pulled at the same timestamp and compared 1:1 with
 * no scaling, on the out-of-focus background and the smooth bench reflection —
 * where WebM blocking shows before it shows on a sharp subject. Nothing was
 * visible at any of the three. Mean absolute error against the default is 2.37
 * of 255 per channel at q-30, under 1%.
 *
 * q-20 also looked clean and would save another 150 KB, but it is not worth
 * the headroom: this ladder is applied to whatever clip is passed to it, and a
 * future clip with fine detail or a hard-edged graphic would show artefacts at
 * q-20 sooner than at q-30. If a new clip ever does look soft, raise q before
 * suspecting anything else.
 *
 * ── One transform deliberately NOT used ─────────────────────────────────────
 *
 * `w-1280` does nothing, since both masters are already 1280 wide. It would
 * have read as an optimisation in a diff while doing nothing at all.
 *
 * ── Codec is content-dependent, and WebM still wins overall ─────────────────
 *
 * At q-30, MP4 is actually SMALLER than WebM on the hero (409 vs 439 KB full,
 * 160 vs 170 at w-720) because that clip is live action, which H.264 handles
 * well. On the intro — an animated wireframe on flat colour — WebM wins
 * clearly: 333 vs 395 KB, a 16% gap.
 *
 * WebM stays first. The intro is the latency-critical clip, its margin is the
 * larger of the two, and per-clip codec ordering would be two code paths for a
 * 7% difference on the one that is already behind a poster.
 *
 * ── `media` on <source> is honoured, and that was checked ───────────────────
 *
 * Support for the media attribute inside <video> is historically unreliable —
 * it was cut from some spec revisions and browsers have ignored it. Rather
 * than trust it, a probe was run in the browser: a 640px source behind
 * `(max-width: 500px)` at a 1512px viewport, and the browser correctly skipped
 * it for the full-size one.
 *
 * That matters because getting it wrong is silent and backwards: a browser
 * ignoring `media` would take the FIRST source it can decode, which is the
 * smallest — so every desktop would quietly serve a 720px clip upscaled to
 * full bleed, and it would just look a bit soft rather than obviously broken.
 *
 * ⚠ `media` is evaluated when the element loads and is NOT re-evaluated on
 * resize or rotate. Fine for a decorative background: a visitor who rotates a
 * phone keeps the rendition they started with, which nobody can perceive on
 * out-of-focus footage. Do not reuse this ladder for anything where the
 * detail matters at the new size.
 *
 * ── The ladder is width-based, not DPR-based, on purpose ────────────────────
 *
 * A 3x phone at 390 CSS px has 1170 physical pixels and gets the 720 rendition,
 * so the film is upscaled. That is deliberate: adding `resolution` queries
 * would push retina phones onto the 960 or full rung and hand back most of the
 * saving, on exactly the connections the saving is for. This is out-of-focus
 * background footage behind a scrim and large type — upscaling costs nothing
 * anyone can see. Do not "fix" it without re-measuring what it costs.
 *
 * ── Order is load-bearing ───────────────────────────────────────────────────
 *
 * A browser takes the first source whose type it can decode AND whose media
 * matches. So: narrowest first, webm before mp4. Reordering these silently
 * ships the wrong file to everyone.
 */
export type VideoSource = { src: string; type: string; media?: string }

/**
 * Quality floor for every rendition. See the note above — this is a measured
 * choice, not a default, and it roughly halves every rung.
 */
const Q = 30

/** Breakpoint / width pairs, narrowest first. */
const LADDER: { media?: string; w: number | null }[] = [
  { media: '(max-width: 768px)', w: 720 },
  { media: '(max-width: 1280px)', w: 960 },
  { w: null },
]

export function videoSources(mp4Url: string): VideoSource[] {
  const at = (w: number | null, webm: boolean) => {
    const tr = [webm ? 'f-webm' : null, w ? `w-${w}` : null, `q-${Q}`].filter(Boolean).join(',')
    return `${mp4Url}?tr=${tr}`
  }

  return [
    // WebM ladder — what almost everything takes.
    ...LADDER.map((r) => ({ src: at(r.w, true), type: 'video/webm', media: r.media })),
    // MP4 fallback for Safari below Big Sur / iOS 15. Two rungs rather than
    // three: the population is small and old, and the phone rung is the one
    // that actually matters for it.
    { src: at(720, false), type: 'video/mp4', media: '(max-width: 768px)' },
    { src: at(null, false), type: 'video/mp4' },
  ]
}

/**
 * Poster frame, pulled from the same file so it can never drift from the clip.
 *
 * WebP at 960: 27 KB against the untransformed default's 50 KB. The poster is
 * only ever seen for the moment before the first frame decodes, or permanently
 * under `prefers-reduced-motion` — at which point it is a still of a
 * background, and 960 upscaled is indistinguishable from 1280.
 *
 * ⚠ `f-webp` IS LOAD-BEARING. DO NOT REMOVE IT OR SWAP IT FOR `f-auto`.
 *
 * Untransformed, ImageKit negotiates on the Accept header and behaves well:
 * 40 KB WebP to a modern browser, 50 KB JPEG to one that cannot take WebP. But
 * the moment ANY transform is added — `w-`, `q-`, or `f-auto` — the non-WebP
 * fallback becomes PNG, and this frame as PNG is 936 KB. Measured:
 *
 *                                  Accept: webp     Accept: image/*
 *   so-3                            40 KB webp        50 KB jpeg
 *   so-3,w-960,q-55                 27 KB webp       936 KB PNG   ← 34x
 *   so-3,f-auto,w-960,q-55          27 KB webp       936 KB PNG   ← 34x
 *   so-3,f-webp,w-960,q-55          27 KB webp        27 KB webp
 *
 * `f-auto` reads like the considerate choice and is the trap: it aims a 936 KB
 * PNG at precisely the oldest and slowest clients, and it does it invisibly,
 * because every browser used to test it supports WebP. Pinning the format is
 * what makes the payload predictable.
 */
export function videoPoster(mp4Url: string, atSeconds = 3) {
  return `${mp4Url}/ik-thumbnail.jpg?tr=so-${atSeconds},f-webp,w-960,q-55`
}
