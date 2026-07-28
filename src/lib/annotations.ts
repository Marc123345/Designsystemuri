/**
 * Design annotations for the wireframe review build — Figma comments, on the
 * site itself.
 *
 * Every note explains why a block is the way it is, so a stakeholder reading
 * the page can see the reasoning without a separate document, and can argue
 * with it in place. This is a REVIEW LAYER, not page content: it is rendered by
 * AnnotationLayer, hidden behind a toggle, and excluded from the accessibility
 * tree and from any text a crawler reads.
 *
 * To remove the whole thing before launch: delete <AnnotationLayer /> from
 * app/[locale]/layout.tsx. The data-note attributes left on sections are inert.
 *
 * Keyed by the value of `data-note` on a section. One key annotates every
 * instance of a shared block, so a note written once appears on every page that
 * uses it.
 */

export type Annotation = { title: string; body: string[] }

export const annotations: Record<string, Annotation> = {
  /* ------------------------------ GLOBAL ------------------------------ */
  navbar: {
    title: 'Header',
    body: [
      'Six entries, ordered as the buyer’s journey rather than by importance to us: catalogue first, then the second entry axis, then Quality — which is the differentiator and so never buried inside a menu — then research, then company.',
      'The angled brand block behind the logo is the one piece of decoration in the header. Everything else is a link, the language switcher, or the conversion button.',
      'Products, Applications and Resources open dropdowns rather than linking, because each is a set rather than a page.',
    ],
  },
  footer: {
    title: 'Footer — the complete index',
    body: [
      'A menu cannot expose every page and section without becoming clutter, so the footer carries the full link set: all eight products, all six applications, and every in-page section by anchor.',
      'Two audiences: the power user who knows exactly what they want, and crawlers, which get a complete internal-link map from every page on the site.',
      'Split panel — brand left, index right — over a solid brand bar, so the page closes on the same colour it opened with.',
    ],
  },

  /* -------------------------------- HOME ------------------------------- */
  hero: {
    title: 'Hero — one message, no carousel',
    body: [
      'A rotating three-slide hero was replaced with a single block. The positioning has to land in one read, and a technical buyer scanning for credentials should not have to wait for a slide to come round.',
      'No stats and no ISO line here: the trust bar sits immediately below and already carries them. Repeating them one screen apart made “ISO 9001” appear three times before the fold.',
    ],
  },
  'trust-bar': {
    title: 'Trust bar — verified signals only',
    body: [
      'Icon plus label, no sentences: a buyer is scanning at this point, not reading.',
      'A “30+ countries” figure was cut because it could not be confirmed. The bar leads with the two things that can be evidenced — ISO 9001 and the fifty-year record — because this buyer verifies claims, and one overstatement caught by a quality department costs more than every soft claim gains.',
    ],
  },
  problem: {
    title: 'The problem, in the buyer’s own parameters',
    body: [
      'States the cost of inconsistent diamond in process terms — re-work, scrap, re-qualification — rather than in adjectives. The reader should recognise their own week here.',
      'This block earns the right to the range that follows. Without it, the product grid is a catalogue with no argument attached.',
    ],
  },
  range: {
    title: 'The range — eight groups, one grid',
    body: [
      'The eight product groups exactly as the range divides. Four across, two clean rows.',
      'Borderless cards separated by rules rather than boxes, so eight items read as a catalogue instead of clutter. This is the same grid the applications use, at a different column count.',
    ],
  },
  'why-eid': {
    title: 'Why EID — the graduated claim',
    body: [
      'This block carries the honesty that the whole site rests on: natural diamond is manufactured fully in-house; synthetic grades are made to EID’s specification and then finished, graded and released in London.',
      'Saying which is which is the credibility. Flattening it into “we manufacture everything” is the one claim a serious buyer would catch, and losing that argument loses the account.',
    ],
  },
  applications: {
    title: 'Applications — the second entry axis',
    body: [
      'A buyer arrives knowing either the material they want or the job they are doing, almost never both. Products serve the first; these six hubs serve the second.',
      'Six hubs sit three across in two rows with a larger card, because three columns leave room for it and the hubs carry more weight than a product tile.',
    ],
  },
  qc: {
    title: 'QC proof band',
    body: ['Placed immediately after the range and the applications, because “will it be the same next order?” is the question that follows “do you make it?”.', 'Dark, full-bleed, and used sparingly — this treatment appears once per page at most, so it still reads as emphasis.'],
  },
  marquee: {
    title: 'Material vocabulary, not a logo wall',
    body: [
      'The obvious move here is a row of customer logos. EID has not given permission to name customers, so a logo wall would claim endorsements that do not exist.',
      'Instead the strip carries the language of the range — ISO 9001, CBN, PCBN, CVD, MCD, Made in London — which does the same scanning job and claims nothing untrue.',
    ],
  },
  reach: {
    title: 'Reach — one facility, four continents',
    body: [
      'The commercial point is not that EID is everywhere; it is that everything comes from one facility to one specification. The copy says exactly that.',
      'Twelve real cities are listed rather than a vague “worldwide”, grouped by the four regions the copy actually claims.',
    ],
  },
  faq: {
    title: 'FAQ — written for the objections that stall a deal',
    body: [
      'Nine questions taken verbatim from a real sales meeting, not invented for SEO. They are the objections that come up on calls: do you manufacture or resell, where is it made, can you provide COAs and ISO, can you supply into large OEM programmes.',
      'Sits below the conversion block on purpose: a reader who is already convinced should not have to scroll past ten answers to reach the form.',
      'Marked up as FAQ structured data, so the answers can surface directly in search and AI results.',
    ],
  },

  /* ------------------------------ PRODUCT ------------------------------ */
  'page-hero': {
    title: 'Page hero',
    body: [
      'Breadcrumb, H1, one-line summary, two actions. The same opening on every interior page, so depth in the site is always legible.',
      'The eyebrow chip that used to sit above the H1 was removed from product pages: it repeated the product family word for word, so the page said its own name three times before it said anything.',
    ],
  },
  'jump-nav': {
    title: 'Sticky section nav',
    body: [
      'Appears only on products with more than one section. It sticks under the header so the reader can move between forms — mesh, micron, rotary — without scrolling back.',
      'This is why the “In this range” cards that briefly sat below the overview were cut: they restated a control the reader had just passed.',
    ],
  },
  overview: {
    title: 'Overview — lede left, facts right',
    body: [
      'Seven columns of argument, five of evidence. That ratio runs through every section on the page, so the eye learns the grid once.',
      'Every row in the facts panel is computed from the grade catalogue — grade counts, mesh span, micron range, coating options. Nothing here is typed by hand, so it cannot contradict the tables below it or go stale as the range changes.',
      'Rows with no data simply do not render. That is why this page shows four rows and Single Crystal shows two, with no per-page configuration.',
    ],
  },
  'product-section': {
    title: 'Product section',
    body: [
      'Each section is a former standalone page — natural-mesh, natural-micron, natural-rotary — folded into its parent and keeping its own H2, anchor and specs, so the search intent that used to live on a separate URL still has a home.',
      'Mesh and micron are separate sizing systems that do not correlate, so they never share a table.',
      'Backgrounds alternate white and near-white. A long page reads as distinct blocks without adding borders, cards or shadows.',
    ],
  },
  'grade-selector': {
    title: 'Grade selector — the core of the page',
    body: [
      'The old site showed these same photos and descriptions but never said why you would choose NS-100-P over NS-1-S. The code is not a ranking, it is a position on a trade-off, and the axis labels state it: tougher and longer-lasting at one end, free-cutting and faster at the other.',
      'The series segments are drawn to scale — width is proportional to the mesh range each series covers — so the control shows that MB spans further than NS before you read a word.',
      'One panel per section rather than one per series. Two near-identical dark cards a screen apart read as two different controls when they are the same control twice.',
      'Explore and Compare serve two readers: a first-time visitor who needs the guided view, and an engineer who already knows the range and wants a table with no clicking. Same data, one toggle, and the choice is remembered.',
      'Every grade has a deep link, so sales can send a customer to a grade rather than to a page, and the quote button carries the selection into the form so nobody retypes what they just chose.',
    ],
  },
  'cross-links': {
    title: 'Cross links — where the two axes meet',
    body: [
      'The most important structural block on the site. Products link to the applications they serve, to sibling products, and to quality and resources.',
      'It is what stops a buyer bouncing because they landed on the wrong axis, and what gives crawlers a complete internal map from any page.',
    ],
  },

  /* --------------------------- CONVERSION ----------------------------- */
  quote: {
    title: 'Conversion — the form, not a button',
    body: [
      'The block is the form itself rather than a button that defers to another page. Every step between intent and enquiry loses people.',
      'Four channels, deliberately: form, email, phone and WhatsApp. WhatsApp is shared across the sales team, so a reply is not blocked on one person being at their desk — which matters across the time zones EID sells into.',
      'Product and grade prefill when the reader arrives from a grade selector.',
    ],
  },

  /* ----------------------------- RESOURCES ---------------------------- */
  downloads: {
    title: 'Ungated downloads',
    body: [
      'Eighteen datasheets and three safety sheets, hosted here, with no form and no login. Each product section also links straight to its own PDF.',
      'The argument: a spec sheet behind a form loses more qualified engineers than it captures leads, and a buyer who cannot check your sizing will go and check a competitor’s.',
      'Safety sheets are listed only where a current document exists. A stale or invented MSDS is a liability, not a lead magnet.',
    ],
  },

  /* ------------------------------ QUALITY ----------------------------- */
  quality: {
    title: 'Quality — given pages, not a paragraph',
    body: [
      'This is the differentiator, so it gets a page of argument plus two pages of evidence.',
      'Mesh QC and Micron QC are split because the two are measured by genuinely different methods — sieve grading versus particle size distribution — which lets a specialist land directly on the one that governs their material.',
    ],
  },

  /* ------------------------------ IMAGERY ----------------------------- */
  wireframe: {
    title: 'Why the images are boxes',
    body: [
      'Every unshot image is a labelled placeholder rather than stock photography, so nothing ships looking finished when it is not, and every outstanding asset is visible at a glance.',
      'EID’s real catalogue photography is already wired in behind a single switch — one flag turns it on across the whole site.',
    ],
  },
}
