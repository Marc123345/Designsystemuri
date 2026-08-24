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
 * that drops it — falls through as a single bold line and wraps however it
 * likes. That is deliberate: half these headings are two words and splitting
 * them would invent an emphasis the copy does not have.
 */
const HeroTitle = ({ title, className = '' }: { title: string; className?: string }) => {
  const beats = title.split('—')
  const twoBeat = beats.length === 2

  return (
    <h1 className={`leading-[1.1] tracking-tight text-white ${className}`}>
      {twoBeat ? (
        <>
          <span className="block font-extralight">{beats[0].trim()}</span>
          <strong className="block font-bold">{beats[1].trim()}</strong>
        </>
      ) : (
        <span className="block font-bold">{title}</span>
      )}
    </h1>
  )
}

export default HeroTitle
