/** Shared hero headline. Two-beat titles keep the intentional line break, while
 * every hero now uses the same Inter 700 treatment from the global type scale. */
const HeroTitle = ({ title, className = '' }: { title: string; className?: string }) => {
  const beats = title.split('—')
  const twoBeat = beats.length === 2

  return (
    <h1 className={`display text-white ${className}`}>
      {twoBeat ? (
        <>
          <span className="block">{beats[0].trim()}</span>{' '}
          <strong className="block">{beats[1].trim()}</strong>
        </>
      ) : (
        <span className="block text-balance">{title}</span>
      )}
    </h1>
  )
}

export default HeroTitle
