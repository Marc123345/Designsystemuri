/**
 * One place that turns an ImageKit MP4 into the sources a <video> should offer.
 *
 * ── Measured, not assumed ───────────────────────────────────────────────────
 *
 * ImageKit will transcode on the fly via `?tr=`. Fetching each variant and
 * comparing bytes:
 *
 *   intro  EID NEW.mp4          952 KB  →  f-webm  473 KB   (-50%)
 *   hero   EID VIDEO HERO.mp4  1367 KB  →  f-webm  913 KB   (-33%)
 *
 * That is ~930 KB off a first visit, which loads both.
 *
 * Two transforms that looked promising and are deliberately NOT used:
 * `q-60` came back at 1.5 MB — LARGER than the source, because re-encoding an
 * already-compressed clip at a quality target can inflate it. And `w-1280`
 * changed nothing, since both sources are already 1280 wide. Neither was worth
 * shipping; both would have looked like optimisations in a diff.
 *
 * ── Why both formats ────────────────────────────────────────────────────────
 *
 * WebM/VP9 is not universal. Safari only decodes it from Big Sur / iOS 15, and
 * support on older iPads is patchy. A <video> with ordered <source> children
 * picks the first type it can play and never downloads the others, so the MP4
 * costs nothing to the browsers that take the WebM.
 *
 * Order matters: WebM first, or every browser takes the larger MP4.
 */
export type VideoSource = { src: string; type: string }

export function videoSources(mp4Url: string): VideoSource[] {
  return [
    { src: `${mp4Url}?tr=f-webm`, type: 'video/webm' },
    { src: mp4Url, type: 'video/mp4' },
  ]
}

/** Poster frame from the same file, so it can never drift from the clip. */
export function videoPoster(mp4Url: string, atSeconds = 3) {
  return `${mp4Url}/ik-thumbnail.jpg?tr=so-${atSeconds}`
}
