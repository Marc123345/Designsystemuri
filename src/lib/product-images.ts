import type { StaticImageData } from 'next/image'

import naturalToolStones from '@/assets/images/products/photo/natural-tool-stones-hero.png'
import naturalMicron from '@/assets/images/products/photo/natural-diamond-grit-powder-hero.png'
import sawGrit from '@/assets/images/products/photo/metal-bond-diamond-grit-hero.png'
import metalBond from '@/assets/images/products/photo/metal-bond-diamond-crystal-closeup-alt.png'
import resinBondMesh from '@/assets/images/products/photo/resin-bond-diamond-uncoated-nickel-coated-hero.png'
import resinBondMicron from '@/assets/images/products/photo/resin-bond-diamond-uncoated-nickel-coated-alt-square.png'
import cbnMesh from '@/assets/images/products/photo/cbn-amber-and-black-grit-hero.png'
import cbnBlack from '@/assets/images/products/photo/cbn-amber-and-black-grit-alt-warm.png'
import pcd from '@/assets/images/products/photo/pcd-blanks-discs-inserts-hero.png'
import pcbnBlanks from '@/assets/images/products/photo/pcd-blanks-discs-segments-alt.png'
import polyMicron from '@/assets/images/products/photo/polycrystalline-diamond-powder-hero.png'
import singleCrystal from '@/assets/images/products/photo/single-crystal-diamond-plates-hero.png'
import mcdPlates from '@/assets/images/products/photo/single-crystal-diamond-plates-alt-tray.png'

/**
 * Master switch for product photography.
 *
 * Thirteen photographs cover forty-one grade keys, because the photography is
 * of materials rather than of individual grades: an EBN AA and an EBN-A micron
 * powder are the same amber CBN in two sizes, and no camera distinguishes
 * WD-AAA from WD-AA on a bench. The grade explorer already assumes this — it
 * keys its crossfade on the resolved image so the fade does not restart when a
 * grade shares its series shot.
 *
 * Where a family has two frames, the second is used for the variant that reads
 * differently: black CBN against amber, the closeup against the loose pile.
 *
 * This is the one place the on/off decision lives. It used to be duplicated as
 * a local const in both ProductPhoto and the grade explorer, where flipping one
 * and missing the other would have shipped a half-illustrated page.
 */
export const SHOW_PHOTOS = true

export const productImages: Record<string, StaticImageData> = {
  // natural-tool-stones-hero
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
  'rd10': naturalToolStones,
  'rd90': naturalToolStones,
  'congo-rd': naturalToolStones,

  // natural-diamond-grit-powder-hero
  'mb1um-2-4': naturalMicron,
  'mb1um-12-22': naturalMicron,
  'mb1um-30-40': naturalMicron,

  // metal-bond-diamond-grit-hero
  'ns-100-p': sawGrit,
  'esn-770': sawGrit,

  // metal-bond-diamond-crystal-closeup-alt
  'mb-100-p': metalBond,
  'eda-2395': metalBond,
  'metal-bond-micron': metalBond,

  // resin-bond-diamond-uncoated-nickel-coated-hero
  'resin-bond-mesh': resinBondMesh,

  /* THE COATING, rather than a product. This frame is a pile of uncoated
     diamond beside the same grit nickel-coated, on one dish — it is the only
     photograph on the site whose subject is the coating and not the grade
     underneath it, which is why every `coated` section across metal bond,
     resin bond and CBN points at it.

     Reusing the resin-bond frame for metal bond and CBN is deliberate and it
     is the file's own rule applied to a fourth axis: the photography is of
     MATERIALS, not of grades, and nickel plating on 40/50 grit looks the same
     whichever bond it is destined for. What the buyer needs to see is the
     silver against the dark, and that is what this shows.

     ⚠ Before this existed, a `coated` section fell through to its parent
     product's shot, so "Coated metal bond diamond" on the dental hub was
     showing UNCOATED metal bond — the one thing the card exists to
     distinguish. */
  'nickel-coated': resinBondMesh,

  // resin-bond-diamond-uncoated-nickel-coated-alt-square
  'erd-um': resinBondMicron,

  // cbn-amber-and-black-grit-hero
  'ebn-aa': cbnMesh,
  'cbn-a-micron': cbnMesh,

  // cbn-amber-and-black-grit-alt-warm
  'cbn-b-micron': cbnBlack,

  // pcd-blanks-discs-inserts-hero
  'pcd': pcd,

  // pcd-blanks-discs-segments-alt
  'pcbn': pcbnBlanks,
  'cvd-polycrystalline': pcbnBlanks,

  // polycrystalline-diamond-powder-hero
  'poly-micron': polyMicron,

  // single-crystal-diamond-plates-hero
  'cvd-single-crystal': singleCrystal,

  // single-crystal-diamond-plates-alt-tray
  'mcd': mcdPlates,
}

export const getProductImage = (key?: string): StaticImageData | undefined =>
  key ? productImages[key] : undefined
