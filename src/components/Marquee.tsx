'use client'

/**
 * The material strip.
 *
 * This was a hairline band of 18px grey text with small squares between the
 * words — the vocabulary was right and nothing about it was memorable. It sits
 * between the QC block and the globe, which is the one place on the home page
 * with room for a moment rather than another argument.
 *
 * What it does now, and why each part is there rather than for effect:
 *
 * Two rows running against each other. One row scrolling is wallpaper; two in
 * opposition read as movement, and the eye picks a word out of one row while
 * the other passes behind it. Different durations, not the same speed
 * mirrored — matched speeds look mechanical, a slight difference reads as two
 * separate things happening.
 *
 * The top row is the range and it is solid. The bottom row is what EID says
 * about itself and it is outlined — same size, less weight, so the products
 * stay in front and the credentials sit behind them without a second colour.
 *
 * Diamonds between the words rather than squares. On a site selling industrial
 * diamond that is the shape the section is about, and it costs one rotation.
 *
 * Masked at both edges so words dissolve rather than being guillotined by the
 * band. That is the detail that separates this from a CSS marquee: a hard cut
 * at the edge is what makes an infinite strip look like it is running out of
 * room.
 *
 * The template's `.infinite-scroll` keyframes already pause on hover and on
 * focus-within, so anyone reading a term or tabbing through can hold it, and
 * `motion-reduce` drops the animation to a static, wrapped list.
 */
const Row = ({ items, inverse = false, outlined = false, duration }: { items: string[]; inverse?: boolean; outlined?: boolean; duration: string }) => {
  const track = inverse ? 'infinite-scroll-inverse' : 'infinite-scroll'

  return (
    <div className="relative flex w-full flex-nowrap">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          style={{ animationDuration: duration }}
          className={`${track} flex shrink-0 items-center justify-start gap-8 pe-8 motion-reduce:animate-none motion-reduce:flex-wrap lg:gap-12 lg:pe-12`}
        >
          {items.map((item, i) => (
            <li
              key={`${copy}-${i}`}
              style={{ fontFamily: 'var(--font-heading)' }}
              className="flex shrink-0 items-center gap-8 text-[clamp(1.6rem,3.4vw,2.9rem)] leading-none font-bold whitespace-nowrap uppercase lg:gap-12"
            >
              <span
                className={
                  outlined
                    ? 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]'
                    : 'text-white'
                }
              >
                {item}
              </span>
              <span aria-hidden className="bg-primary-1 size-2 shrink-0 rotate-45" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

const Marquee = ({ items, secondary }: { items: string[]; secondary?: string[] }) => (
  <section
    data-note="marquee"
    className="bg-primary-3 relative isolate size-full overflow-hidden py-12 lg:py-16"
  >
    {/* Both edges dissolved. Without this the first and last word are cut in
        half against the section boundary on every pass. */}
    <div
      className="flex flex-col gap-6 lg:gap-8"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <Row items={items} duration="95s" />
      {secondary && secondary.length > 0 && <Row items={secondary} inverse outlined duration="118s" />}
    </div>
  </section>
)

export default Marquee
