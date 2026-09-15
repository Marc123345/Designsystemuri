/**
 * The two-beat headline: first beat light, second beat bold.
 *
 * The weight contrast is the part of the Strauss reference worth taking — it
 * separates the subject from the claim without spending a second colour on it.
 *
 * The break is explicit rather than left to CSS, and that predates the
 * restyle. Greedy wrapping fills each line as far as it can, and on the home
 * page the two halves are within one character of each other, so the range of
 * container widths that happens to break correctly is about one character
 * wide — any change to the type scale, the font or the words moves it.
 * `text-balance` was worse again: it evened the line lengths by hyphenating
 * through "In-House".
 *
 * A title with no em-dash — most of the interior pages, and any translation
 * that drops it — falls through as a single bold line rather than being split
 * into beats. That part is deliberate: half these headings are two words and
 * splitting them would invent an emphasis the copy does not have.
 *
 * ── `text-balance`, on the single-beat branch ONLY ──────────────────────────
 *
 * Left to wrap greedily, a long single-beat title fills line one and drops
 * whatever is left onto line two, which on CENTRED type reads as a mistake.
 * Measured on /quality — "Our Quality Control & Laboratory Standards" — the
 * break came out 462px over 148px between about 560 and 700px wide: five words
 * and an orphan. `text-wrap: balance` evens it to 301/309 and leaves every
 * width that already fits on one line untouched.
 *
 * ⚠ NOT ON THE TWO-BEAT BRANCH, and that is the second time this has been
 * decided. Balance was tried across the whole h1 once before and was worse:
 * with each beat its own block it evened the lines by hyphenating through
 * "In-House". The two-beat path already has its break chosen by hand, which is
 * the thing balance would be doing — so there it is redundant at best and a
 * hyphen in a proper noun at worst.
 */
const HeroTitle = ({ title, className = '' }: { title: string; className?: string }) => {
  const beats = title.split('—')
  const twoBeat = beats.length === 2

  return (
    <h1 className={`leading-[1.1] tracking-tight text-white ${className}`}>
      {twoBeat ? (
        <>
          {/* ⚠ THE SPACE BETWEEN THESE TWO IS LOAD-BEARING AND INVISIBLE.
              `block` gives the visual line break, but with the spans adjacent
              in the markup there is no whitespace between them, so the h1's
              text content ran together: "Industrial DiamondManufactured
              In-House Since 1970". That is what a screen reader announces,
              what a copy-paste produces, and what a crawler indexes as the
              page's most important string. `{' '}` costs nothing visually —
              the elements are block, so it collapses — and fixes all three. */}
          <span className="block font-extralight">{beats[0].trim()}</span>{' '}
          <strong className="block font-bold">{beats[1].trim()}</strong>
        </>
      ) : (
        <span className="block font-bold text-balance">{title}</span>
      )}
    </h1>
  )
}

export default HeroTitle
