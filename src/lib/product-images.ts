import type { StaticImageData } from 'next/image'

/**
 * Master switch for product photography.
 *
 * The per-grade image keys in product-catalog.ts and the imagery itself are
 * being reconsidered, so every slot across the products area renders the
 * labelled wireframe instead. This is the one place that decision lives — it
 * used to be duplicated as a local const in both ProductPhoto and the grade
 * explorer, where flipping one and missing the other would have shipped a
 * half-illustrated page.
 *
 * When real photography is ready, repopulate `productImages` below with the
 * imported assets and flip SHOW_PHOTOS to true.
 */
export const SHOW_PHOTOS = false

export const productImages: Record<string, StaticImageData> = {}

export const getProductImage = (key?: string): StaticImageData | undefined =>
  key ? productImages[key] : undefined
