/**
 * One place that maps a product group or an application hub to its card
 * photograph.
 *
 * Product cards use the approved AI catalogue imagery. Product-page detail
 * imagery is mapped separately in product-images.ts against the legacy EID
 * product-page taxonomy.
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
