import { Link } from '@/i18n/navigation'
import Image from 'next/image'

/**
 * Curtain tiles — one row of photographs behind retracting white panels.
 *
 * Built to the `s-single-services` block in the dawork template, and shared
 * because that template uses the same card twice: three across on its home page
 * and six across its services page. EID has the same two jobs — three pillars
 * on the home page, six application hubs on the home band and again on
 * /applications — so the card lives here rather than three times over.
 *
 * ── The mechanic ────────────────────────────────────────────────────────────
 *
 * Each tile is a photograph with a white panel over it. On hover the panel gets
 * `transform: scaleY(0)` from a CENTRE origin, so it splits and retracts from
 * the middle rather than sliding. That origin and the reference's easing curve
 * are the whole effect; both are kept.
 *
 * Two departures from the reference, both deliberate:
 *
 *  - It renders its copy ONCE. The reference writes every title twice — once on
 *    the panel, once underneath in white — so each card announces itself twice
 *    to a screen reader and copy-pastes double. Here the copy sits above the
 *    curtain in the stack, so the curtain retracts behind it and the type just
 *    changes colour.
 *
 *  - Below lg the curtain starts retracted and stays there. There is no hover
 *    on a touch screen, so the reference's cards are three blank white panels
 *    on a phone. Here the photograph is simply always showing and the type is
 *    white to suit.
 *
 * `.eid-tiles` in _general.css keeps exactly one tile open at a time — the one
 * being hovered, falling back to the first. See the note there; it is `:has()`,
 * not JavaScript.
 */

export type CurtainItem = {
  /** Small kicker above the title. Omit where the group has no useful one. */
  meta?: string
  title: string
  href: string
  image: { src: string; alt: string; position?: string }
}

/* The reference's cubic-bezier, kept — a standard ease makes the curtain look
   like it is fading rather than retracting. */
const CURTAIN = 'cubic-bezier(0.24,0.74,0.58,1)'

const Tile = ({ item, index, open, sizes, revealed, numbered, aspect, cell = '' }: { item: CurtainItem; index: number; open: boolean; sizes: string; revealed: boolean; numbered: boolean; aspect: string; cell?: string }) => {
  const n = String(index + 1).padStart(2, '0')

  /* `revealed` is the mobile treatment applied at every width: no curtain, the
     photograph showing, white type over the scrim. It is not a second design —
     it is the one the tile already had below lg, promoted. */
  const ink = revealed ? 'text-white' : 'text-white lg:text-default-900 lg:group-hover:text-white lg:group-focus-visible:text-white'
  const inkDim = revealed ? 'text-white/70' : 'text-white/70 lg:text-default-500 lg:group-hover:text-white/70 lg:group-focus-visible:text-white/70'
  const shown = revealed ? 'opacity-100' : 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100'

  return (
    <Link
      href={item.href}
      data-open={!revealed && open ? true : undefined}
      className={`group focus-visible:outline-primary rounded-card relative block ${aspect} ${cell} overflow-hidden bg-white focus-visible:outline-2 focus-visible:outline-offset-2`}
    >
      <Image src={item.image.src} alt={item.image.alt} fill sizes={sizes} className={`object-cover ${item.image.position ?? 'object-center'}`} />

      {/* The reference's photographs are dark and its white type sits straight
          on them. Several of ours are electron micrographs — light grey, high
          key, and white type on them is unreadable. Same bottom-up scrim
          ImageCard puts under the product cards' copy, so every photographic
          grid on the site treats type the same way. It lives under the curtain,
          so it costs nothing at rest. */}
      <span aria-hidden className="from-default-950/90 via-default-950/35 absolute inset-0 bg-linear-to-t to-transparent to-70%" />

      {!revealed && (
        <span
          aria-hidden
          className="eid-curtain absolute inset-0 origin-center scale-y-0 bg-white transition-transform duration-500 lg:scale-y-100 lg:group-hover:scale-y-0 lg:group-focus-visible:scale-y-0"
          style={{ transitionTimingFunction: CURTAIN }}
        />
      )}

      <div className="absolute inset-0 flex flex-col justify-end p-7 lg:p-8">
        {/* Outlined numeral, as the reference sets it: transparent fill and a
            hairline stroke, which goes white once the photograph is behind it.
            Stroke colour cannot be set by a Tailwind variant, so the two states
            are two copies that cross-fade. Both aria-hidden — the number is
            decoration, the order is already carried by the DOM. */}
        {numbered && !revealed && (
          <span
            aria-hidden
            className="eid-num-rest absolute end-6 top-6 hidden text-[92px] leading-none font-bold text-transparent transition-opacity duration-500 lg:end-8 lg:top-7 lg:block lg:text-[118px]"
            style={{ WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'rgba(44,60,108,0.22)' }}
          >
            {n}
          </span>
        )}
        {numbered && (
          <span
            aria-hidden
            className={`eid-num-over absolute end-6 top-6 text-[92px] leading-none font-bold text-transparent transition-opacity duration-500 lg:end-8 lg:top-7 lg:text-[118px] ${shown}`}
            style={{ WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'rgba(255,255,255,0.9)' }}
          >
            {n}
          </span>
        )}

        {item.meta && (
          <span className={`eid-ink-dim relative text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${inkDim}`}>{item.meta}</span>
        )}

        <h3 className={`eid-ink relative text-2xl leading-[1.15] transition-colors duration-500 lg:text-[30px] ${ink} ${item.meta ? 'mt-3' : ''}`}>{item.title}</h3>

        {/* The site's own arrow rather than the reference's two PNGs, drawn
            inline so this file stays a server component — pulling in Iconify
            for one glyph would ship a client bundle for a decoration. Same path
            as tabler:arrow-narrow-right, which every other link here uses. */}
        <span aria-hidden className={`eid-arrow relative mt-6 inline-flex items-center gap-3 text-white transition-opacity duration-500 ${shown}`}>
          <span className="h-px w-8 bg-white/60" />
          <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14m-4 4l4-4m-4-4l4 4" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

/**
 * Gutterless within the row and framed by one hairline, so the photographs butt
 * against each other and the group reads as one band. Rules rather than boxes,
 * same as every other grid here.
 *
 * Not full-bleed: the reference's `pl-0 pr-0` drops the gutter between cards but
 * its row still sits inside a max-width container, and running the tiles to the
 * viewport edges puts them out of line with the heading above them.
 *
 * ── The hairline grid is gone, and it had to be ─────────────────────────────
 *
 * These tiles used to butt against each other with no gap, separated by shared
 * 1px borders (`not-first:border-t`, `md:not-first:border-s`) inside one
 * outer-bordered box — the same rule-not-box device the whole site uses.
 *
 * Uri's 24px radius is not compatible with that, and not by a little: rounded
 * corners on tiles that share an edge produce four little notches of background
 * at every internal junction, which looks like a rendering fault rather than a
 * decision. A radius needs air around the shape to read as a radius at all.
 *
 * So the tiles are separate cards now, on `gap-6` — 24px, deliberately the same
 * number as the radius, which is the proportion Strauss uses between their card
 * gap and their corner. The outer border and every internal rule came off with
 * it; the gap does that work now.
 *
 * The focus ring moved with them: `-outline-offset-4` drew the ring inside the
 * tile because there was no gap to draw it in. There is one now, so it is
 * `outline-offset-2` and sits outside the card where it belongs.
 */
const CurtainGrid = ({
  items,
  columns = 3,
  revealed = false,
  numbered = false,
  aspect = 'portrait',
  bento,
  sizes,
}: {
  items: CurtainItem[]
  columns?: 3 | 4
  /**
   * Show every photograph at rest instead of behind a curtain.
   *
   * The curtain is a good device for three claims you want read one at a time.
   * For a catalogue it works against you: eight product groups or six
   * application hubs are something you scan, and a row of white panels gives
   * the eye nothing to scan. So those grids run revealed, and the curtain stays
   * where it earns its keep.
   */
  revealed?: boolean
  /**
   * Show the oversized outlined numeral on each tile.
   *
   * Off by default, and on only for the three pillars. A number on a card is a
   * promise that the order means something — first, then second, then third.
   * That is true of three claims read in sequence; it is not true of eight
   * product groups or six application hubs, where numbering a catalogue
   * suggests a ranking nobody intended.
   */
  numbered?: boolean
  /**
   * Tile shape. `portrait` is 3:4 and the default everywhere.
   *
   * `landscape` (4:3) exists for the home page's applications row, and it is
   * the answer to a conflict between two of Uri's notes rather than a style
   * choice. He wants applications below products in weight — "even smaller than
   * products … because it's not so important" — and Marc wants the six hubs on
   * an even three-and-three rather than the ragged four-then-two a 4-column
   * grid gives six items.
   *
   * Both cannot be had from the column count alone: three across makes each
   * tile WIDER than a product tile, and at 3:4 that makes the whole section
   * taller than the range above it — the opposite of the note. Changing the
   * card was tried before and failed, because two different cards on one page
   * read as two different components.
   *
   * Same card, same treatment, shorter crop. Three across at 4:3 comes out
   * around 350px a tile against the range's 466px, so the section lands about a
   * third shorter than products while keeping the even rows.
   */
  aspect?: 'portrait' | 'landscape'
  /**
   * Per-item span and height, in 12ths — the bento layout.
   *
   * ── Why this exists ────────────────────────────────────────────────────────
   *
   * `columns` is 3 or 4, and an odd count divides into neither. Five products —
   * which is what three of the six application hubs carry — comes out three
   * then two on a 3-column grid, and the half-empty second row reads as a page
   * that failed to load rather than as a set of five. Padding it with a sixth
   * card is not available: the five are the five grades that hub uses.
   *
   * So the row shapes change instead of the count. Give it one entry per item:
   *
   *   [{ span: 'lg:col-span-7', minHeight: 'lg:min-h-[460px]' }, ...]
   *
   * ── The two things that have to move together ──────────────────────────────
   *
   * 1. `aspect-3/4` HAS TO COME OFF at lg, and that is not a tidy-up. Two tiles
   *    of different widths at one ratio are two different heights, so a 7/5 row
   *    on a fixed aspect leaves a step at the bottom of the row. The height
   *    comes from `minHeight` and the grid's own stretch instead. Below lg the
   *    ratio still governs, because the grid is one or two even columns there
   *    and the bento does not apply.
   * 2. `sizes` has to follow the span. A tile spanning 7 of 12 is about 55vw at
   *    lg and one spanning 4 is about 30vw; leaving the 3-column default on both
   *    ships the wide tile an image sized for a third of the row.
   *
   * Row heights are per-item on purpose rather than derived. A bento is a
   * composition — the two-up row reads as the lead and the three-up row as the
   * tail, and that only happens if the first row is taller.
   */
  bento?: { span: string; minHeight: string }[]
  sizes?: string
}) => {
  const auto = columns === 4 ? '(min-width: 1024px) 23vw, (min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw'
  const ratio = aspect === 'landscape' ? 'aspect-4/3' : 'aspect-3/4'

  /* A bento entry only ever pairs with its own item, so a short `bento` array
     degrades to the even grid for the items it does not cover rather than
     throwing. */
  const cellFor = (i: number) => (bento?.[i] ? `${bento[i].span} ${bento[i].minHeight} lg:aspect-auto` : '')

  /**
   * `sizes` for a bento cell, derived from its span.
   *
   * A bento cell is not a column, so it cannot inherit `auto` — a 7-span tile
   * is 748px on a desktop and a 4-span is 417px, and shipping both the
   * 3-column default means the wide one is served an image sized for a third
   * of the row and the narrow one is served nearly twice what it needs.
   *
   * `.container` caps at 1360px with 30px of padding, so above about 1420px
   * these tiles stop being a fraction of anything and become fixed widths.
   * Saying so is more accurate than any vw figure:
   *
   *   col  = (1360 - 60 - 11 × 24) / 12  = 86.33px
   *   span = n × col + (n - 1) × 24      → 7 → 748px, 5 → 528px, 4 → 417px
   *
   * Those are measured against the live grid, not estimated. If the container
   * width or the 24px gap changes, they change with it.
   *
   * ⚠ A NOTE FOR WHOEVER SEES A BLANK TILE NEXT. During this build the 7-span
   * came back white — the tile's own `bg-white` under the scrim, with the
   * narrow tiles beside it loading fine, which reads exactly like a bug in the
   * span handling. It was not: `next dev` optimises on first request, the
   * browser had picked the 3840 candidate for a lazy image before layout, and
   * that variant had not been generated yet. Every tile loads on `next start`.
   * Check a production server before changing anything here.
   */
  const sizeFor = (i: number) => {
    if (sizes) return sizes
    if (!bento?.[i]) return auto
    const n = Number(bento[i].span.match(/(\d+)$/)?.[1] ?? 4)
    const px = Math.round(n * 86.33 + (n - 1) * 24)
    return `(min-width: 1420px) ${px}px, (min-width: 1024px) ${Math.round((95 * n) / 12)}vw, (min-width: 768px) 50vw, 100vw`
  }

  return (
    <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${revealed ? '' : 'eid-tiles'} ${bento ? 'lg:grid-cols-12' : columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {items.map((item, i) => (
        <Tile key={item.href} item={item} index={i} open={i === 0} sizes={sizeFor(i)} revealed={revealed} numbered={numbered} aspect={ratio} cell={cellFor(i)} />
      ))}
    </div>
  )
}

export default CurtainGrid
