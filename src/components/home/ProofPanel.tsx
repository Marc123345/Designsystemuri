import CurtainGrid, { type CurtainItem } from '@/components/CurtainGrid'

/**
 * The three pillars as curtain tiles.
 *
 * Built to the `s-single-services` block in the dawork template. Each tile is a
 * photograph with a white panel over it; the panel retracts on hover and the
 * photograph is underneath. The reference does it with `transform: scaleY(0)`
 * from a centre origin, so the panel splits and pulls away from the middle
 * rather than sliding — that easing curve and that origin are the whole effect
 * and both are kept.
 *
 * The tile itself lives in components/CurtainGrid, because the reference uses
 * the same card twice — three across on its home page, six across its services
 * page — and so do we: three pillars here, six application hubs on the home
 * band and again on /applications.
 *
 * ── Why the paragraphs are gone ─────────────────────────────────────────────
 *
 * This is the seventh arrangement for this slot and the first that does not try
 * to carry a paragraph per claim. Six layouts failed the same way: three claims
 * of three-to-four sentences each is a wall in any shape. The reference gives
 * each card a kicker and a headline and nothing else, and that is the point of
 * it — the tile is a door, not a summary.
 *
 * Nothing is lost that the site does not still say: each tile links to the page
 * where its claim is made in full, and the section's own lede above still
 * frames all three. Uri's ruling is intact — all three claims fully readable at
 * rest, nothing behind the hover but a photograph.
 *
 * No JavaScript. The reference has none for this either; its `.active` class is
 * hardcoded on the first card so one tile shows its hover state at rest, which
 * is a decision this one does not copy — on a three-up row it reads as a bug.
 */

export type Pillar = CurtainItem & { meta: string }

/* ══════════════════════════ THE SECTION ══════════════════════════ */

const ProofPanel = ({ eyebrow, title, desc, pillars, ghost }: { eyebrow: string; title: string; desc?: string; pillars: Pillar[]; ghost?: string }) => (
  <section data-note="core-values" className="bg-default-50 relative overflow-hidden py-20 lg:py-30">
    <div className="container">
      <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="border-default-300 inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
            <span className="bg-primary size-2"></span>
            <span className="text-default-900 text-sm">{eyebrow}</span>
          </div>
          <h2 className="mt-4 text-[28px] font-bold md:text-[36px] lg:text-[42px]">{title}</h2>
        </div>
        {desc && <p className="text-default-600 lg:col-span-5">{desc}</p>}
      </div>

      <div className="mt-14 lg:mt-18">
        <CurtainGrid items={pillars} numbered />
      </div>
    </div>

    {/* The reference's `.section-t h2` — an oversized word behind the row,
        filled with a gradient that fades it into the section's own ground
        through `background-clip: text`. */}
    {ghost && (
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 overflow-hidden select-none">
        <span
          className="block text-center text-[90px] leading-[0.9] font-bold tracking-tight text-transparent uppercase lg:text-[160px]"
          style={{ backgroundImage: 'linear-gradient(to bottom, rgba(248,250,252,0) 0%, #ffffff 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}
        >
          {ghost}
        </span>
      </div>
    )}
  </section>
)

export default ProofPanel
