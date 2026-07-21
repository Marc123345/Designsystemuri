/**
 * Wireframe image placeholder.
 *
 * The copy deck calls for photography EID has not supplied yet (factory floor,
 * QC laboratory, product shots, application imagery). Rather than ship stock
 * images that would misrepresent the business, each slot renders as a labelled
 * wireframe so the layout is reviewable and every outstanding asset is visible
 * at a glance. Swap the component for <Image> as real photography lands.
 */
const Wireframe = ({
  label,
  ratio = 'landscape',
  tone = 'light',
  className = '',
}: {
  label: string
  ratio?: 'landscape' | 'portrait' | 'square' | 'wide' | 'panorama'
  /** `dark` for slots that sit inside a dark band, where the light frame vanishes. */
  tone?: 'light' | 'dark'
  className?: string
}) => {
  const aspect = {
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    wide: 'aspect-[16/9]',
    panorama: 'aspect-[21/9]',
  }[ratio]

  const dark = tone === 'dark'
  const frame = dark ? 'border-white/20 bg-white/5' : 'border-default-300 bg-default-50'
  const diagonals = dark ? 'text-white/10' : 'text-default-200'
  const chip = dark
    ? 'border border-white/15 bg-default-950/70 text-white/50'
    : 'bg-white/90 text-default-500'

  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={`relative w-full overflow-hidden rounded-md border border-dashed ${frame} ${aspect} ${className}`}
    >
      {/* Diagonals mark the slot as deliberately empty rather than a failed load. */}
      <svg
        className={`absolute inset-0 size-full ${diagonals}`}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <span className={`rounded px-3 py-2 text-center text-xs uppercase tracking-[0.15em] ${chip}`}>
          {label}
        </span>
      </div>
    </div>
  )
}

export default Wireframe
