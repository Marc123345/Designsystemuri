'use client'

/**
 * Infinite horizontal keyword strip.
 *
 * Uses the template's `.infinite-scroll` / `.infinite-scroll-inverse` keyframes
 * from assets/css/_general.css. Two identical lists sit side by side; each
 * translates a full width, so the seam is invisible and the loop never gaps.
 *
 * Deliberately keywords rather than client logos — EID's customers are named
 * only as buyer types in the copy deck, and inventing a logo wall would claim
 * endorsements that do not exist.
 */
const Marquee = ({ items, inverse = false }: { items: string[]; inverse?: boolean }) => {
  const track = inverse ? 'infinite-scroll-inverse' : 'infinite-scroll'

  return (
    <section className="border-default-200 relative size-full overflow-hidden border-y py-6">
      <div className="relative z-10 flex w-full flex-nowrap gap-5 overflow-hidden">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className={`${track} flex shrink-0 items-center justify-start gap-5`}>
            {items.map((item, i) => (
              <li key={`${copy}-${i}`} className="text-default-500 flex shrink-0 items-center gap-5 text-lg whitespace-nowrap">
                <span className="bg-primary size-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}

export default Marquee
