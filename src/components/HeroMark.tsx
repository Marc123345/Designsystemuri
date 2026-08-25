import Image from 'next/image'

/**
 * The star, blended into whatever photograph is behind it.
 *
 * Taken from Marc's Strauss & Co reference, where a monogram sits above the
 * statement with `mix-blend-mode: overlay` so the footage reads through the
 * letterforms and the mark belongs to the image rather than sitting on top of
 * it.
 *
 * The mark only, never the lockup. Our logo file is the full lockup, and the
 * identical wordmark is already the first link in the header a couple of
 * hundred pixels above — showing it whole would be the same words twice on one
 * screen. Measured off the file's alpha channel: the star occupies x 0-221 of
 * the 650px file and the wordmark starts at 250, so a 232px-wide window clips
 * cleanly between them. The image is sized to the box height and allowed to
 * overflow to the right; the box does the cropping.
 *
 * Hidden from assistive technology and from search. It is texture — the h1
 * directly beneath it already carries the name, and on interior pages so does
 * the breadcrumb above it.
 *
 * ── `blend` ─────────────────────────────────────────────────────────────────
 *
 * The overlay is the point of this component, but only over a photograph. The
 * home hero now stacks its copy UNDER the film rather than on it, so the mark
 * sits on flat brand navy — and `mix-blend-mode: overlay` against a dark flat
 * ground does not let anything read through, it just renders the star muddy.
 * `blend={false}` drops the blend and the 95% and paints it plainly.
 *
 * Every hero that still puts type on an image leaves it on, which is all of
 * them except the home page.
 *
 * ── Sizing is a ratio, not a number ─────────────────────────────────────────
 *
 * Both steps came down when the home hero was rebuilt to Strauss's type scale.
 * Their rendered monogram is about 72px over a 48px headline — roughly 1.5 to
 * 1. Ours was `w-16 lg:w-24`, which was tuned against a headline that capped at
 * 56px; once the headline dropped to their 36-48px the same mark was running
 * 2.4 to 1 and reading as a logo parked above some type rather than as the top
 * line of one lockup.
 *
 * So the mark is measured against the headline, not against the frame. If the
 * type scale moves again, this moves with it.
 */
const HeroMark = ({ size = 'lg', blend = true }: { size?: 'lg' | 'sm'; blend?: boolean }) => (
  <span
    aria-hidden
    className={`block shrink-0 overflow-hidden ${blend ? 'opacity-95 mix-blend-overlay' : ''} ${size === 'lg' ? 'w-11 lg:w-14' : 'w-9 lg:w-11'}`}
    style={{ aspectRatio: '232 / 221' }}
  >
    <Image src="/eid/logo-white.png" alt="" width={650} height={221} priority className="h-full w-auto max-w-none" />
  </span>
)

export default HeroMark
