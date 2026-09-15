/**
 * Shared surface treatment for light/white sections.
 *
 * The sieve mesh and grain stay restrained and live behind the content. The EID
 * mark is now part of the canvas itself: the supplied mark is rendered as a
 * large, low-opacity blue watermark and is ON by default. Individual sections
 * can still move it to the opposite edge, centre it, or disable it explicitly.
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

type MarkPosition = false | 'start' | 'end' | 'center'

const CanvasField = ({
  density = 'medium',
  grain = true,
  mark = 'end',
  className = '',
}: {
  density?: 'coarse' | 'medium' | 'fine'
  grain?: boolean
  mark?: MarkPosition
  className?: string
}) => {
  const cell = CELL[density]

  const markPosition =
    mark === 'start'
      ? '-start-24 md:-start-28 lg:-start-32'
      : mark === 'center'
        ? 'left-1/2 -translate-x-1/2'
        : '-end-24 md:-end-28 lg:-end-32'

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

      {mark && (
        <div
          className={`absolute top-1/2 aspect-square w-[22rem] -translate-y-1/2 opacity-[0.055] md:w-[32rem] lg:w-[40rem] xl:w-[48rem] ${markPosition}`}
          style={{
            backgroundImage: "url('/eid/eid-mark.svg')",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        />
      )}
    </div>
  )
}

export default CanvasField
