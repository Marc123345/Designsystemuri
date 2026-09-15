/**
 * Shared hero headline.
 *
 * Keep the explicit two-beat break where the copy includes an em dash, but use
 * one Crimson Text treatment throughout. Hierarchy now comes from composition,
 * not from variable-font tricks or mixed weights.
 */
const HeroTitle = ({ title, className = '' }: { title: string; className?: string }) => {
  const beats = title.split('—')
  const twoBeat = beats.length === 2

  return (
    <h1 className={`display text-white ${className}`}>
      {twoBeat ? (
        <>
          <span className="block font-semibold">{beats[0].trim()}</span>{' '}
          <strong className="block font-semibold">{beats[1].trim()}</strong>
        </>
      ) : (
        <span className="block font-semibold text-balance">{title}</span>
      )}
    </h1>
  )
}

export default HeroTitle
