/**
 * Shared hero headline.
 *
 * Juturu's variable weight axis is the expressive device here. Two-beat titles
 * use a lighter subject line and a stronger claim line without changing family
 * or size, so the lockup feels dynamic but remains one typographic system.
 * Single-beat titles use a controlled semibold weight and balanced wrapping.
 */
const HeroTitle = ({ title, className = '' }: { title: string; className?: string }) => {
  const beats = title.split('—')
  const twoBeat = beats.length === 2

  return (
    <h1 className={`display text-white ${className}`}>
      {twoBeat ? (
        <>
          <span className="hero-title-soft block">{beats[0].trim()}</span>{' '}
          <strong className="hero-title-strong block">{beats[1].trim()}</strong>
        </>
      ) : (
        <span className="hero-title-single block text-balance">{title}</span>
      )}
    </h1>
  )
}

export default HeroTitle
