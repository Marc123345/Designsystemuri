import CurtainGrid, { type CurtainItem } from '@/components/CurtainGrid'
import { Eyebrow } from '@/components/ui'

/**
 * The three pillars as photo tiles.
 *
 * Built to the `s-single-services` block in the dawork template, whose tile is a
 * photograph behind a white panel that retracts on hover.
 *
 * ── The curtain is off, on Marc's instruction ─────────────────────────
 *
 * The photographs ARE the evidence for the three claims — the sieve stack, the
 * two matching micrographs, the shelf of graded jars. Behind a curtain a desktop
 * reader sees three white panels and no evidence, and has to hover each one to
 * find out there was a photograph at all. `revealed` is CurtainGrid's word for
 * the mobile treatment — where there is no hover to wait for — applied at every
 * width, so it is not a second design, just the one the tile already had below
 * lg. The retract mechanic still lives in CurtainGrid; no caller uses it now.
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
 * frames all three. Uri's ruling is more than intact — all three claims are
 * fully readable at rest, and now so is every photograph.
 *
 * No JavaScript, and less of it needed than before: with no curtain to open
 * there is no `.eid-tiles` one-at-a-time rule either, so the row has no state
 * at all. Hover is left doing what it does on every other card here — nudging
 * the arrow.
 */

export type Pillar = CurtainItem & { meta: string }

/* ══════════════════════════ THE SECTION ══════════════════════════ */

const ProofPanel = ({ eyebrow, title, desc, pillars, ghost, aspect = 'portrait' }: { /** Rendered again — see the note on the heading below. */ eyebrow?: string; title: string; desc?: string; pillars: Pillar[]; ghost?: string; /** 'landscape' (4:3) is shorter than the default portrait (3:4). */ aspect?: 'portrait' | 'landscape' }) => (
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
      {/* ⚠ THE EYEBROW IS RENDERED AGAIN, AND WAS NOT FOR A WHILE.
          This component took `eyebrow` and threw it away: the blue SectionBanner
          strip directly above it used to carry the label, so the prop was kept
          only so the call site would not break. Those strips were removed, and
          the prop went on being passed and silently dropped — the home page has
          been sending "Why tool makers qualify EID" into nothing since. It is
          the label this section wants, so it is back on the heading it belongs
          to rather than a band that no longer exists. */}
      <div className="mx-auto max-w-4xl text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className={`text-[24px] font-bold text-balance md:text-[30px] lg:text-[34px] ${eyebrow ? 'mt-4' : ''}`}>{title}</h2>
        {desc && <p className="text-default-600 mt-4">{desc}</p>}
      </div>

      <div className="mt-10 lg:mt-12">
        <CurtainGrid items={pillars} numbered aspect={aspect} revealed />
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
