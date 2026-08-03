/**
 * The dark surface every full-bleed band on the site sits on.
 *
 * Defined once because it was previously three different things: a flat
 * `bg-primary` panel in the footer, a flat `bg-default-950` block in the grade
 * selector, and a hand-rolled gradient in the globe section. Flat blue is what
 * made the panels read as printed colour rather than as depth.
 *
 * Four layers, in order:
 *  1. the diagonal ramp from near-black into the deep blue — the base tone;
 *  2. two blooms at different scales and opposite corners, which is what stops
 *     a two-stop ramp reading as a flat sheet;
 *  3. a vignette, so the centre sits forward of the edges;
 *  4. grain, to break up the banding a wide soft gradient shows on a large
 *     screen.
 *
 * The grain is an inline SVG rather than the site's `bg-noice.gif`: that file is
 * a 43-byte stub on main, so every band that referenced it was compositing
 * nothing. This version carries its own pixels and needs no asset.
 */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")"

const Backdrop = ({ className = '' }: { className?: string }) => (
  <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    <div className="from-default-950 via-default-950 to-primary-3 absolute inset-0 bg-linear-to-br" />

    <div className="bg-primary-1/18 absolute -top-1/4 right-0 size-[46rem] translate-x-1/4 rounded-full blur-[170px]" />
    <div className="bg-primary-3/35 absolute -bottom-1/3 -left-1/4 size-[38rem] rounded-full blur-[190px]" />

    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.5) 100%)' }} />

    <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
  </div>
)

export default Backdrop
