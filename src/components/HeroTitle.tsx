/**
 * Shared hero title treatment.
 *
 * Two-beat titles use a restrained regular/semibold contrast rather than the
 * old extra-light/bold split. That keeps the hierarchy visible without making
 * the first line feel weak and the second line overly heavy, especially with
 * SF Pro's tighter display proportions.
 */
const HeroTitle = ({ title, className = '' }: { title: string; className?: string }) => {
  const beats = title.split('—')
  const twoBeat = beats.length === 2

  return (
    <h1 className={`text-white ${className}`}>
      {twoBeat ? (
        <>
          <span className="block font-normal">{beats[0].trim()}</span>{' '}
          <strong className="block font-semibold">{beats[1].trim()}</strong>
        </>
      ) : (
        <span className="block font-semibold text-balance">{title}</span>
      )}
    </h1>
  )
}

export default HeroTitle
