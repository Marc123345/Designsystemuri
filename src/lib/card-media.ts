/**
 * One place that maps a product group or an application hub to its card
 * photograph.
 *
 * It exists because the same eight product cards and the same six application
 * cards are built independently in four places — the home range grid, the home
 * applications band, /applications, and the related-products carousel on each
 * application page. Wiring the photography into one of those and not the others
 * is how a site ends up with a photographed grid on the homepage and a grid of
 * grey placeholders one click later, which reads as broken rather than as
 * pending.
 *
 * A missing key is not an error: `ImageCard` falls back to the labelled
 * Wireframe, so a group added tomorrow degrades to the placeholder rather than
 * to an empty tile.
 */

/**
 * Product group imagery, supplied 23 Aug 2026 and installed over the eight
 * slots below.
 *
 * ⚠ Read this before treating these as evidence anywhere. What they replaced
 * was EID's own material photography carried over from the previous site —
 * microscope and SEM plates of the actual grades. The supplied set is rendered
 * imagery rather than photographs of EID's material, so it belongs in the
 * catalogue where its job is to identify a group at a glance, and nowhere that
 * argues a claim. The proof panel on the home page deliberately does not draw
 * from here: it points at /eid/surface-enhancements.jpg and
 * /eid/qc-batch-to-batch.jpg, both electron micrographs carrying their own
 * scale bars.
 *
 * Two things to fix when there is a chance:
 *  - Resolution. Every file is 512x279. The cards crop to 4:5 portrait, so
 *    about 43% of the width survives and is then scaled up roughly 3x. Larger
 *    renders drop in with no code change.
 *  - The resin bond frame carries an overlaid spec panel reading "SKU:
 *    RBDA-450 / Grit: 120/140 / Bond Type: R Standard / Concentration: 100".
 *    Those are not EID part numbers. A buyer can quote a SKU back at you, and
 *    this is the one site whose whole argument is that its numbers are real.
 */
const PRODUCT_IMAGES: Record<string, string> = {
  'natural-grit-powder': '/eid/natural-grit.jpg',
  'metal-bond': '/eid/metal-bond.jpg',
  'resin-bond': '/eid/resin-bond.jpg',
  cbn: '/eid/cbn.jpg',
  'single-crystal': '/eid/cvd-single-crystal.jpg',
  'polycrystalline-diamond': '/eid/cvd-polycrystalline.jpg',
  'tool-stones': '/eid/tool-stones.jpg',
  'polycrystalline-powder': '/eid/polycrystalline-micron.jpg',
}

/**
 * ⚠ PLACEHOLDER PHOTOGRAPHY. Openly-licensed stock, one per hub, standing in
 * until EID supplies application imagery. Each file is named for its hub, so
 * the swap is a file replace under /public/eid/home/ with no code change.
 * Nothing here depicts EID's own premises, staff or customers.
 */
const APPLICATION_IMAGES: Record<string, string> = {
  dental: '/eid/home/app-dental.jpg',
  'semiconductor-electronics': '/eid/home/app-semiconductor-electronics.jpg',
  'automotive-aerospace': '/eid/home/app-automotive-aerospace.jpg',
  'tool-and-die': '/eid/home/app-tool-and-die.jpg',
  'grinding-cutting-sawing-drilling': '/eid/home/app-grinding-cutting-sawing-drilling.jpg',
  'polishing-lapping': '/eid/home/app-polishing-lapping.jpg',
}

export const productImage = (slug?: string) => (slug ? PRODUCT_IMAGES[slug] : undefined)
export const applicationImage = (slug?: string) => (slug ? APPLICATION_IMAGES[slug] : undefined)
