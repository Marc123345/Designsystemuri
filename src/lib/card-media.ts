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
 * Product group imagery.
 *
 * These are the eight cards on the home range grid, on /applications, and in
 * the related-products carousel on each application page — which is why the
 * map lives here rather than in any one of them.
 *
 * ⚠ Read this before treating them as evidence. They are studio renders of the
 * material types, not photographs of EID's own output, so they belong in the
 * catalogue where the job is to identify a group at a glance, and nowhere that
 * argues a claim. The proof panel on the home page deliberately does not draw
 * from here: it points at /eid/surface-enhancements.jpg and
 * /eid/qc-batch-to-batch.jpg, both electron micrographs carrying their own
 * scale bars.
 *
 * What these replaced, and why it mattered:
 *  - The previous set was 512x279. The cards crop to 4:5 portrait, so roughly
 *    43% of the width survived and was then scaled up about 3x. These are
 *    1264x848 and 1376x768, which is 2.5x the width before the crop.
 *  - The previous resin bond frame carried an overlaid spec panel reading
 *    "SKU: RBDA-450 / Grit: 120/140 / Bond Type: R Standard / Concentration:
 *    100". Those were not EID part numbers, on the one site whose whole
 *    argument is that its numbers are real. It is gone.
 */
const PRODUCT_IMAGES: Record<string, string> = {
  'natural-grit-powder': '/eid/products/natural-grit-powder.png',
  'metal-bond': '/eid/products/metal-bond.png',
  'resin-bond': '/eid/products/resin-bond.png',
  cbn: '/eid/products/cbn.png',
  'single-crystal': '/eid/products/single-crystal.png',
  'polycrystalline-diamond': '/eid/products/polycrystalline-diamond.png',
  'tool-stones': '/eid/products/tool-stones.png',
  'polycrystalline-powder': '/eid/products/polycrystalline-powder.png',
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
