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
 * product is graded on.
 *
 * That is also why `density` exists rather than one fixed cell: a section about
 * coarse grit can carry a coarse screen and one about micron powder a fine one,
 * so the ornament carries a fact rather than just filling space.
 *
 *   density   cell    stands for            where it runs
 *   coarse    32px    ~60 mesh, 250µm       home range band
 *   medium    20px    ~120 mesh, 125µm      the default; applications
 *   fine      12px    ~325 mesh, 45µm       unused since the QC pages went
 *
 * ⚠ `fine` has no caller. It is kept because the whole point of the prop is to
 * match the screen to the page, and the next section that talks about micron
 * powder should take it. Delete it if that never happens.
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
 * over this field on the pages that carry it, so none of this is hypothetical.
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
 *    is tinted because it has no `text-default-*` at all; the range band stays
 *    white because it does. Check before tinting a section.
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

/* THE MARK, as a mask rather than as a picture.
   /eid/logo-white.png is white ink on transparent, so dropped onto a white
   canvas it is invisible. Masking with its alpha instead and filling the shape
   with a colour means the one asset the site already ships works on any ground
   — white here, and it would work just as well on navy without a second file.

   `auto 100%` at `left center` crops the 650x221 lockup to its leftmost 232px,
   which is the mark on its own. That is not a magic number: it is exactly what
   HeroMark does with overflow-hidden and `aspectRatio: 232 / 221`, and the two
   need to stay in step. The wordmark is deliberately left out — "E.I.D. LTD /
   INDUSTRIAL DIAMONDS" ghosted at this scale reads as a stray watermark
   somebody forgot to delete, where the mark alone reads as geometry. */
const MARK = {
  maskImage: 'url(/eid/logo-white.png)',
  WebkitMaskImage: 'url(/eid/logo-white.png)',
  maskSize: 'auto 100%',
  WebkitMaskSize: 'auto 100%',
  maskPosition: 'left center',
  WebkitMaskPosition: 'left center',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
} as const

const CanvasField = ({
  density = 'medium',
  grain = true,
  mark = false,
  className = '',
}: {
  /** Sieve aperture. See the table above — it is meant to match the page. */
  density?: 'coarse' | 'medium' | 'fine'
  /** The grain covers the whole section; only the mesh is confined to the margins. */
  grain?: boolean
  /** Ghost the EID mark off one edge. Off by default — it is a feature spot, not a default. */
  mark?: false | 'start' | 'end'
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

      {/* THE MARK, ghosted off one edge.

          ⚠ 14% IS A MEASURED CEILING, NOT A TASTE SETTING. The mesh gets away
          with more because it is hairlines: at 6-10% area coverage a glyph over
          it mostly sits on plain ground, and the honest cost is about 0.04. The
          mark is a SOLID shape covering 28% of its box, so a glyph landing on
          it sits entirely on that tone and the pessimistic test applies for
          real. `text-default-500` is 4.759:1 on white with a quarter point of
          headroom over the floor. Stacked on the grain already running here:

            default-200/45   #f1f4f7   4.300   FAIL   ← first attempt
            default-200/30   #f5f7f9   4.425   FAIL
            default-200/22   #f7f8fa   4.493   FAIL
            default-200/18   #f8f9fb   4.527   the floor, not a margin
            default-200/14   #f9fafb   4.561   ok     ← what ships

          The first version was 45% and masked out of the copy column to make
          that safe. It did not work: the container leaves roughly 107px of
          margin on a 1512 viewport, so a 480px mark either got clipped to a
          sliver or reached under the first 260px of the text. Taking the tone
          down instead means it can sit wherever it looks best and the contrast
          question stops existing. Five values off white is a shadow, which is
          what was asked for.

          Bled rather than centred. A whole mark floating in a section is a
          watermark; a mark running off the edge is a crop, and a crop is what
          the rest of this site already does — the hero lockup, the tile
          numerals, the photography.

          `lg:block` only: below lg the section is the full viewport and there
          is no margin for it to bleed into. */}
      {mark && (
        <div
          /* One mask, not two. Compositing the section fade over the mark's own
             mask would apply the mark's `mask-size: auto 100%` to the gradient
             as well and break it — and the fade is not needed here anyway: the
             wrapper is `overflow-hidden`, so the section edge already clips it,
             and at five values off white there is no seam to soften. */
          style={MARK}
          className={`bg-default-200/14 absolute top-1/2 hidden aspect-[232/221] w-[30rem] -translate-y-1/2 lg:block xl:w-[38rem] ${mark === 'end' ? '-end-28 xl:-end-24' : '-start-28 xl:-start-24'}`}
        />
      )}
    </div>
  )
}

export default CanvasField
