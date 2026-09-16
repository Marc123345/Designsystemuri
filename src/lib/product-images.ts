import type { StaticImageData } from 'next/image'

import naturalToolStones from '@/assets/images/products/photo/natural-tool-stones-hero.png'
import naturalDiamond from '@/assets/images/products/photo/natural-diamond-grit-powder-hero.png'
import metalBondSaw from '@/assets/images/products/photo/metal-bond-diamond-grit-hero.png'
import metalBondWheel from '@/assets/images/products/photo/metal-bond-diamond-crystal-closeup-alt.png'
import resinBondMesh from '@/assets/images/products/photo/resin-bond-diamond-uncoated-nickel-coated-hero.png'
import resinBondMicron from '@/assets/images/products/photo/resin-bond-diamond-uncoated-nickel-coated-alt-square.png'
import cbnMesh from '@/assets/images/products/photo/cbn-amber-and-black-grit-hero.png'
import cbnBlack from '@/assets/images/products/photo/cbn-amber-and-black-grit-alt-warm.png'
import pcd from '@/assets/images/products/photo/pcd-blanks-discs-inserts-hero.png'
import formedBlanks from '@/assets/images/products/photo/pcd-blanks-discs-segments-alt.png'
import polyMicron from '@/assets/images/products/photo/polycrystalline-diamond-powder-hero.png'
import singleCrystal from '@/assets/images/products/photo/single-crystal-diamond-plates-hero.png'
import mcdPlates from '@/assets/images/products/photo/single-crystal-diamond-plates-alt-tray.png'

/**
 * AI catalogue photography, mapped to the source EID product taxonomy.
 *
 * Legacy source pages:
 * - natural-mesh / natural-micron / natural-rotarydiamond
 * - metal-bond-mesh / metal-bond-micron
 * - resin-bond-mesh / resin-bond-micron
 * - ebn-mesh / ebn-micron / pcbn
 * - cvd-single-crystal / mcd
 * - pcd / cvd-polycrystalline
 * - polycrystalline-micron / toolstones
 *
 * The redesigned site consolidates those legacy URLs into eight product pages,
 * so this registry maps section/grade keys rather than route names.
 */
export const SHOW_PHOTOS = true

export const productImages: Record<string, StaticImageData> = {
  // NATURAL TOOL STONES + NATURAL ROTARY DIAMOND.
  'toolstone-1': naturalToolStones,
  'toolstone-2': naturalToolStones,
  'toolstone-3': naturalToolStones,
  'toolstone-4': naturalToolStones,
  'toolstone-5': naturalToolStones,
  'toolstone-6': naturalToolStones,
  'toolstone-7': naturalToolStones,
  'toolstone-8': naturalToolStones,
  'toolstone-9': naturalToolStones,
  'toolstone-10': naturalToolStones,
  'toolstone-11': naturalToolStones,
  'toolstone-12': naturalToolStones,
  'toolstone-13': naturalToolStones,
  'toolstone-14': naturalToolStones,
  'toolstone-15': naturalToolStones,
  'toolstone-16': naturalToolStones,
  'wd-a': naturalToolStones,
  'wd-aa': naturalToolStones,
  'wd-aaa': naturalToolStones,
  rd10: naturalToolStones,
  rd90: naturalToolStones,
  'congo-rd': naturalToolStones,

  // NATURAL MESH + NATURAL MICRON.
  // Keep natural material visually separate from the synthetic metal-bond set.
  'ns-100-p': naturalDiamond,
  'mb-100-p': naturalDiamond,
  'mb1um-2-4': naturalDiamond,
  'mb1um-12-22': naturalDiamond,
  'mb1um-30-40': naturalDiamond,

  // METAL BOND MESH + MICRON.
  'esn-770': metalBondSaw,
  'eda-2395': metalBondWheel,
  'metal-bond-micron': metalBondWheel,

  // RESIN BOND MESH + MICRON + COATED MATERIAL.
  'resin-bond-mesh': resinBondMesh,
  'nickel-coated': resinBondMesh,
  'erd-um': resinBondMicron,

  // CBN MESH + MICRON.
  'ebn-aa': cbnMesh,
  'cbn-a-micron': cbnMesh,
  'cbn-b-micron': cbnBlack,

  // PCD + PCBN + CVD POLYCRYSTALLINE FORMS.
  pcd,
  pcbn: formedBlanks,
  'cvd-polycrystalline': formedBlanks,

  // POLYCRYSTALLINE MICRON POWDER.
  'poly-micron': polyMicron,

  // SINGLE-CRYSTAL CVD + MCD.
  'cvd-single-crystal': singleCrystal,
  mcd: mcdPlates,
}

export const getProductImage = (key?: string): StaticImageData | undefined =>
  key ? productImages[key] : undefined
