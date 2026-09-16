import naturalDiamond from '@/assets/images/products/photo/natural-diamond-grit-powder-hero.png'
import naturalToolStones from '@/assets/images/products/photo/natural-tool-stones-hero.png'
import metalBond from '@/assets/images/products/photo/metal-bond-diamond-grit-hero.png'
import resinBond from '@/assets/images/products/photo/resin-bond-diamond-uncoated-nickel-coated-hero.png'
import cbn from '@/assets/images/products/photo/cbn-amber-and-black-grit-hero.png'
import singleCrystal from '@/assets/images/products/photo/single-crystal-diamond-plates-hero.png'
import polycrystallineDiamond from '@/assets/images/products/photo/pcd-blanks-discs-inserts-hero.png'
import polycrystallinePowder from '@/assets/images/products/photo/polycrystalline-diamond-powder-hero.png'

/**
 * One place that maps a product group or an application hub to its card
 * photograph.
 *
 * Product groups deliberately use the product-only AI catalogue photography
 * from the same asset set as the detailed product sections. That keeps the home
 * cards and product-page hero bands focused on the material itself rather than
 * machinery, process shots or generic manufacturing scenes.
 */
const PRODUCT_IMAGES: Record<string, string> = {
  'natural-grit-powder': naturalDiamond.src,
  'metal-bond': metalBond.src,
  'resin-bond': resinBond.src,
  cbn: cbn.src,
  'single-crystal': singleCrystal.src,
  'polycrystalline-diamond': polycrystallineDiamond.src,
  'tool-stones': naturalToolStones.src,
  'polycrystalline-powder': polycrystallinePowder.src,
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
