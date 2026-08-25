/**
 * The scroll indicator: a mouse outline with a wheel dot that drifts down.
 *
 * ── Why a mouse and not a chevron ───────────────────────────────────────────
 *
 * A chevron says "there is more"; a mouse says "scroll". On a hero whose whole
 * job is to be short enough that the reader keeps going, the second is the
 * useful message — and it is the shape Strauss uses under their own hero.
 *
 * ── It is decoration, and it is marked as such ──────────────────────────────
 *
 * `aria-hidden` on the whole thing. It duplicates no information: the page
 * continues whether or not this is announced, and a screen reader user gets
 * nothing from "mouse with a dot in it". It is also not a control — there is
 * no click target here, because a scroll hint that scrolls for you takes the
 * page away from someone who was still reading.
 *
 * ── Motion ──────────────────────────────────────────────────────────────────
 *
 * The dot drifts 6px and fades, on a 1.8s loop. Two guards:
 *
 *  · `motion-reduce:animate-none` — the dot holds still at the top of the
 *    wheel, and the cue still reads as a mouse pointing down.
 *  · The site-wide mobile rule in _general.css already disables decorative
 *    animation on touch, where a scroll hint is least useful anyway.
 *
 * The keyframes live in _general.css next to the site's other motion rather
 * than as a one-off inline style, so the reduced-motion block catches them
 * the same way it catches everything else.
 */
const ScrollCue = ({ className = '' }: { className?: string }) => (
  <span aria-hidden className={`flex flex-col items-center gap-2.5 ${className}`}>
    <span className="relative block h-9 w-[22px] rounded-full border border-white/35">
      <span className="scroll-cue-dot absolute left-1/2 top-2 block size-1 -translate-x-1/2 rounded-full bg-white/80 motion-reduce:animate-none" />
    </span>
    <span className="font-mono text-[10px] tracking-[0.2em] text-white/45 uppercase">Scroll</span>
  </span>
)

export default ScrollCue
