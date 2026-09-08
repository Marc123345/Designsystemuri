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

const ProofPanel = ({ title, desc, pillars, ghost, aspect = 'portrait' }: { /** Retained for call-site compatibility; the band above carries it now. */ eyebrow?: string; title: string; desc?: string; pillars: Pillar[]; ghost?: string; /** 'landscape' (4:3) is shorter than the default portrait (3:4). */ aspect?: 'portrait' | 'landscape' }) => (
  /* Halved, per Uri's V1 note: "the whole section about half a screen, the
     wording is what matters, not the image."

     Three things came out rather than one, because padding alone would not
     have got there: py-20/30 → py-14/20, the eyebrow chip (the band directly
     above now carries the same words), and the lede paragraph. What is left is
     a heading and three tiles, which is the shape he approved on Strauss. */
  <section data-note="core-values" className="bg-default-50 relative overflow-hidden py-14 lg:py-20">
    <div className="container">
      {/* Centred and full width, matching the other index blocks on this page.
          It was a 7/12 column beside a 5/12 paragraph — but no caller passes
          `desc` any more, so the heading was being squeezed into 58% of the
          container for a paragraph that is not there, which is what wrapped
          "One accountable manufacturer, spec to delivery." onto two lines.
          `text-balance` keeps it from breaking badly if a longer title is ever
          passed, or on a narrow window where one line genuinely will not fit. */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-[24px] font-bold text-balance md:text-[30px] lg:text-[34px]">{title}</h2>
        {desc && <p className="text-default-600 mt-4">{desc}</p>}
      </div>

      <div className="mt-10 lg:mt-12">
        <CurtainGrid items={pillars} numbered aspect={aspect} />
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
