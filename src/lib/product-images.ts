import type { StaticImageData } from 'next/image'

import pcd from '@/assets/images/products/photo/pcd-blanks-discs-inserts-hero.png'
import formedBlanks from '@/assets/images/products/photo/pcd-blanks-discs-segments-alt.png'
import polyMicron from '@/assets/images/products/photo/polycrystalline-diamond-powder-hero.png'
import singleCrystal from '@/assets/images/products/photo/single-crystal-diamond-plates-hero.png'
import mcdPlates from '@/assets/images/products/photo/single-crystal-diamond-plates-alt-tray.png'

export const SHOW_PHOTOS = true

type ProductImage = StaticImageData | string

const NATURAL = 'https://ik.imagekit.io/qcvroy8xpd/eid-product-natural-grit-powder.png'
const TOOL_STONES = 'https://ik.imagekit.io/qcvroy8xpd/eid-product-natural-tool-stones.png'
const METAL_BOND = 'https://ik.imagekit.io/qcvroy8xpd/eid-product-metal-bond-diamond.png'
const RESIN_BOND = 'https://ik.imagekit.io/qcvroy8xpd/eid-product-resin-bond-diamond.png'
const CBN = 'https://ik.imagekit.io/qcvroy8xpd/eid-product-cbn.png'

export const productImages: Record<string, ProductImage> = {
  'toolstone-1': TOOL_STONES,
  'toolstone-2': TOOL_STONES,
  'toolstone-3': TOOL_STONES,
  'toolstone-4': TOOL_STONES,
  'toolstone-5': TOOL_STONES,
  'toolstone-6': TOOL_STONES,
  'toolstone-7': TOOL_STONES,
  'toolstone-8': TOOL_STONES,
  'toolstone-9': TOOL_STONES,
  'toolstone-10': TOOL_STONES,
  'toolstone-11': TOOL_STONES,
  'toolstone-12': TOOL_STONES,
  'toolstone-13': TOOL_STONES,
  'toolstone-14': TOOL_STONES,
  'toolstone-15': TOOL_STONES,
  'toolstone-16': TOOL_STONES,

  'wd-a': NATURAL,
  'wd-aa': NATURAL,
  'wd-aaa': NATURAL,
  rd10: NATURAL,
  rd90: NATURAL,
  'congo-rd': NATURAL,
  'ns-100-p': NATURAL,
  'mb-100-p': NATURAL,
  'mb1um-2-4': NATURAL,
  'mb1um-12-22': NATURAL,
  'mb1um-30-40': NATURAL,

  'esn-770': METAL_BOND,
  'eda-2395': METAL_BOND,
  'metal-bond-micron': METAL_BOND,
  'metal-bond-coated': METAL_BOND,

  'resin-bond-mesh': RESIN_BOND,
  'erd-um': RESIN_BOND,
  'resin-bond-coated': RESIN_BOND,

  'ebn-aa': CBN,
  'cbn-a-micron': CBN,
  'cbn-b-micron': CBN,
  pcbn: CBN,

  pcd,
  'cvd-polycrystalline': formedBlanks,
  'poly-micron': polyMicron,
  'cvd-single-crystal': singleCrystal,
  mcd: mcdPlates,
}

export const getProductImage = (key?: string): ProductImage | undefined =>
  key ? productImages[key] : undefined

export const getProductImageSrc = (key?: string): string | undefined => {
  const image = getProductImage(key)
  return typeof image === 'string' ? image : image?.src
}
