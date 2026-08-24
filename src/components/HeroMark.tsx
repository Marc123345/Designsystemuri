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
 */
const HeroMark = ({ size = 'lg' }: { size?: 'lg' | 'sm' }) => (
  <span
    aria-hidden
    className={`block shrink-0 overflow-hidden opacity-95 mix-blend-overlay ${size === 'lg' ? 'w-16 lg:w-24' : 'w-11 lg:w-14'}`}
    style={{ aspectRatio: '232 / 221' }}
  >
    <Image src="/eid/logo-white.png" alt="" width={650} height={221} priority className="h-full w-auto max-w-none" />
  </span>
)

export default HeroMark
