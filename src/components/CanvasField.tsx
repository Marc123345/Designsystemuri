/**
 * Shared surface treatment for light/white sections.
 *
 * The mesh and grain stay restrained behind the content. A large EID logo
 * lockup remains the primary watermark, while the uploaded EID outline mark is
 * repeated as a low-contrast edge pattern so white canvases feel branded
 * without becoming wallpaper.
 */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")"

const CELL: Record<'coarse' | 'medium' | 'fine', number> = {
  coarse: 32,
  medium: 20,
  fine: 12,
}

const V_MASK = 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)'
const H_MASK = 'linear-gradient(to right, black 0%, black 12%, transparent 26%, transparent 74%, black 88%, black 100%)'

const LOGO_MASK = {
  maskImage: "url('/eid/logo-white.png')",
  WebkitMaskImage: "url('/eid/logo-white.png')",
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
} as const

const OUTLINE_PATTERN_MASK = {
  maskImage: "url('/eid/brand/eid-logo-outline.svg')",
  WebkitMaskImage: "url('/eid/brand/eid-logo-outline.svg')",
  maskRepeat: 'repeat',
  WebkitMaskRepeat: 'repeat',
  maskSize: '72px 72px',
  WebkitMaskSize: '72px 72px',
} as const

type MarkPosition = false | 'start' | 'end' | 'center'

const CanvasField = ({
  density = 'medium',
  grain = true,
  mark = 'end',
  pattern = true,
  className = '',
}: {
  density?: 'coarse' | 'medium' | 'fine'
  grain?: boolean
  mark?: MarkPosition
  pattern?: boolean
  className?: string
}) => {
  const cell = CELL[density]

  const logoPosition =
    mark === 'start'
      ? '-start-36 md:-start-48 lg:-start-56'
      : mark === 'center'
        ? 'left-1/2 -translate-x-1/2'
        : '-end-36 md:-end-48 lg:-end-56'

  const patternEdge = mark === 'start' ? '-end-6' : '-start-6'
  const patternInnerEdge = mark === 'start' ? 'end-24' : 'start-24'

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {grain && (
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: GRAIN, maskImage: V_MASK, WebkitMaskImage: V_MASK }}
        />
      )}

      <div style={{ maskImage: V_MASK, WebkitMaskImage: V_MASK }} className="absolute inset-0">
        <div
          className="text-default-300 absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: `${cell}px ${cell}px`,
            maskImage: H_MASK,
            WebkitMaskImage: H_MASK,
          }}
        />
      </div>

      {pattern && (
        <>
          <div
            className={`bg-primary absolute inset-y-[9%] w-40 opacity-[0.052] sm:w-48 lg:w-56 ${patternEdge}`}
            style={{ ...OUTLINE_PATTERN_MASK, maskPosition: '0 0', WebkitMaskPosition: '0 0' }}
          />
          <div
            className={`bg-primary absolute inset-y-[18%] hidden w-24 opacity-[0.032] md:block lg:w-28 ${patternInnerEdge}`}
            style={{ ...OUTLINE_PATTERN_MASK, maskPosition: '36px 36px', WebkitMaskPosition: '36px 36px' }}
          />
        </>
      )}

      {mark && (
        <div
          className={`bg-primary absolute top-1/2 aspect-[650/221] w-[34rem] -translate-y-1/2 opacity-[0.045] md:w-[48rem] lg:w-[62rem] xl:w-[72rem] ${logoPosition}`}
          style={LOGO_MASK}
        />
      )}
    </div>
  )
}

export default CanvasField
