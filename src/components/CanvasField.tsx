/**
 * Surface for the light sections — a sieve mesh and a grain, under the content.
 *
 * ── The problem this exists for ─────────────────────────────────────────────
 *
 * The dark sections of this site have a full texture stack in Backdrop.tsx: a
 * diagonal gradient, two blurred colour fields, a vignette and an SVG grain.
 * The light sections had nothing at all. That asymmetry is why the white
 * stretches read as flat next to the navy ones, and it got more obvious the
 * day real photography landed — the cards and the bands gained depth and the
 * space between them did not.
 *
 * This is Backdrop's opposite number. Same shape (an `absolute inset-0` layer
 * dropped into a `relative isolate` section, pointer-events off, aria-hidden),
 * same grain source, tuned for a light ground.
 *
 * ── Why a mesh, and not a grid ──────────────────────────────────────────────
 *
 * A square grid on a white page is graph paper, and graph paper is what every
 * template does. This one is a TEST SIEVE, drawn at the aperture of a real mesh
 * count — which on this site is not decoration, it is the instrument the
 * product is graded on. `/mesh-qc` is a whole page about it.
 *
 * That is also why `density` exists rather than one fixed cell. A page about
 * coarse natural grit gets a coarse screen; `/micron-qc` gets a fine one. The
 * ornament then carries a fact, and a reader who knows the trade will notice
 * the pages are screened differently before they work out why.
 *
 *   density   cell    stands for            where it runs
 *   coarse    32px    ~60 mesh, 250µm       home range band, /mesh-qc
 *   medium    20px    ~120 mesh, 125µm      the default; applications
 *   fine      12px    ~325 mesh, 45µm       /micron-qc
 *
 * The px figures are a legible scale, not a literal one. Drawing 45µm to true
 * scale against 250µm would put the fine mesh at sub-pixel spacing, where it
 * stops being a mesh and starts being moiré. The RATIO between the three is
 * what reads, and it is close enough to the real one to be honest.
 *
 * ── ⚠ THE CONTRAST BUDGET, WHICH IS TIGHTER THAN IT LOOKS ───────────────────
 *
 * `text-default-500` is the smallest grey this site puts on a light ground, and
 * it is 4.759:1 on white — a quarter of a point over the 4.5 floor. Everything
 * layered under it spends that quarter point, and both QC pages put it directly
 * over this field, so none of this is hypothetical.
 *
 * Measured as the effective background under a glyph — coverage (2c−1)/c² for
 * 1px lines on a c-pixel cell, so 6.2% coarse, 9.8% medium, 16% fine. AS FIRST
 * WRITTEN, with the grain at 2.5%:
 *
 *                          on white          on canvas (2% tint)
 *   coarse mesh + grain     4.592               4.449  ← under the floor
 *   medium mesh + grain     4.570               4.429  ← under the floor
 *   fine mesh + grain       4.530               4.394  ← under the floor
 *
 * and as it ships, with the grain at 1.5% and the tint kept off any section
 * carrying that grey:
 *
 *                          on white          on canvas (2% tint)
 *   coarse mesh + grain     4.642               —  not used
 *   medium mesh + grain     4.618               —  not used
 *   fine mesh + grain       4.577               —  not used
 *
 * Two things fall out of that, and both are rules rather than preferences:
 *
 * 1. THE GRAIN IS THE EXPENSIVE LAYER, not the mesh. At 2.5% it costs 0.127 on
 *    its own; the fine mesh costs 0.111 and the coarse one 0.043. It is dropped
 *    to 1.5% here, which buys the margin back at a cost nobody can see, because
 *    grain is felt rather than read.
 *
 * 2. ⚠ NEVER PUT `bg-canvas` UNDER A SECTION CONTAINING `text-default-500`.
 *    The tint alone leaves 4.603, and no grain or mesh setting recovers a real
 *    margin on top of it — at 1% grain the stack is still only 4.46 to 4.52.
 *    Tint OR texture where that grey appears, not both. The applications band
 *    is tinted because it has no `text-default-*` at all; the range band and
 *    both QC pages stay white because they do. Check before tinting a section.
 *
 * An earlier draft of this comment claimed a glyph stroke landing on a hairline
 * drops the ratio to 4.09 and used that to justify the layout. That number is
 * real but it is not the right test — it assumes the whole glyph sits on the
 * line, which a 1px rule every 20px cannot do. The coverage figures above are
 * the honest ones. The mask below stayed anyway, for the reason in the next
 * block, which is design rather than arithmetic.
 *
 * ── The mask, which is a composition decision ───────────────────────────────
 *
 * The field is masked twice and lives in the MARGINS: faded top and bottom over
 * the first and last sixth, and faded out across the middle where the copy
 * sits. Not because it has to be — the numbers above say a full-bleed mesh
 * would pass on white — but because a grid behind body copy is busy, and a
 * screen that lives in the margins reads as the surface the page is printed on
 * rather than as something laid over the words.
 *
 * Two nested elements rather than one with `mask-composite: intersect`, because
 * where compositing is unsupported only the FIRST mask applies, and the failure
 * mode would be the mesh flooding back across the page. Nesting cannot fail
 * that way.
 *
 * Below `lg` the container is the full viewport, so the horizontal mask removes
 * almost all of the mesh. That is the correct outcome: there are no margins on
 * a phone to put a surface in.
 */

/* The same turbulence Backdrop uses on the dark sections. Duplicated as a
   constant here rather than imported, because importing it would pull a client
   component's module into every server-rendered light section for one string;
   if a third caller ever appears, hoist it to lib/ then. */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")"

const CELL: Record<'coarse' | 'medium' | 'fine', number> = {
  coarse: 32,
  medium: 20,
  fine: 12,
}

/** Fades the field in and out at the top and bottom of the section. */
const V_MASK = 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)'

/** Clears the middle, where `.container` puts the content. */
const H_MASK = 'linear-gradient(to right, black 0%, black 12%, transparent 26%, transparent 74%, black 88%, black 100%)'

const CanvasField = ({
  density = 'medium',
  grain = true,
  className = '',
}: {
  /** Sieve aperture. See the table above — it is meant to match the page. */
  density?: 'coarse' | 'medium' | 'fine'
  /** The grain covers the whole section; only the mesh is confined to the margins. */
  grain?: boolean
  className?: string
}) => {
  const cell = CELL[density]

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* THE GRAIN, full width — and the most expensive layer in the budget
          above, which is the opposite of what it looks like. 1.5% against the
          dark sections' 6%: a light ground shows noise far more readily, and
          the extra point of contrast it buys back is worth more than the
          difference anyone can see between 1.5 and 2.5. */}
      {grain && <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: GRAIN, maskImage: V_MASK, WebkitMaskImage: V_MASK }} />}

      {/* THE SIEVE, margins only. Two one-pixel gradients rather than an SVG
          pattern: the browser tiles them on the compositor, there is no extra
          request, and the cell size is a single number to change. */}
      <div style={{ maskImage: V_MASK, WebkitMaskImage: V_MASK }} className="absolute inset-0">
        <div
          className="text-default-300 absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: `${cell}px ${cell}px`,
            maskImage: H_MASK,
            WebkitMaskImage: H_MASK,
          }}
        />
      </div>
    </div>
  )
}

export default CanvasField
