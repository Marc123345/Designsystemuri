import type { StaticImageData } from 'next/image'

/**
 * Product imagery from EID's current public website.
 *
 * Marc asked that the redesign use the real catalogue photography already on
 * eid-ltd.com rather than generated stand-ins. The public Wix source files are
 * registered here as StaticImageData-shaped objects so the existing product
 * page components keep their width/height metadata and blur placeholder
 * behaviour while Next optimises the remote images normally.
 */
const transparentBlur =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

const remoteImage = (src: string, width: number, height: number): StaticImageData => ({
  src,
  width,
  height,
  blurDataURL: transparentBlur,
})

const naturalToolStones = remoteImage('https://static.wixstatic.com/media/10a9d7_57bda81f7bdf4d9ea17e218ce93f6b24~mv2.jpg', 980, 293)
const naturalDiamond = remoteImage('https://static.wixstatic.com/media/10a9d7_1d7ca04453714f74b6acaa20142941a0~mv2.png', 673, 449)
const metalBond = remoteImage('https://static.wixstatic.com/media/10a9d7_f7b89c273cf349aea074ba0084fcd833~mv2.jpg', 621, 414)
const resinBond = remoteImage('https://static.wixstatic.com/media/10a9d7_194945f4691b416eb8e528e4680a8d65~mv2.jpg', 785, 414)
const cbn = remoteImage('https://static.wixstatic.com/media/10a9d7_56f688a006ab4c8191f890ece2373b18~mv2.jpg', 693, 462)
const pcd = remoteImage('https://static.wixstatic.com/media/10a9d7_5cdb96b4f1b34ea9b902a75e726cf273~mv2.png', 709, 726)
const pcbn = remoteImage('https://static.wixstatic.com/media/10a9d7_e24d51869f1c4441b293c5c06ba90f29~mv2.png', 303, 191)
const cvdPoly = remoteImage('https://static.wixstatic.com/media/10a9d7_fafbabff68b04daf92ea5eff5d91ab59~mv2.jpg', 334, 449)
const polyMicron = remoteImage('https://static.wixstatic.com/media/10a9d7_55e960ff79334e40ba45055da6b71364~mv2.jpg', 749, 376)
const monoCrystal = remoteImage('https://static.wixstatic.com/media/43b3e7_f5c1d5cd16d74131a6f5ff74802c1dac~mv2.jpg', 387, 218)

/**
 * Master switch for product photography.
 *
 * The catalogue reuses a family photograph where the current site does not
 * publish a separate shot for every individual grade. That is preferable to
 * inventing grade-specific imagery: the source photograph is EID's own and the
 * copy/specification carries the grade distinction.
 */
export const SHOW_PHOTOS = true

export const productImages: Record<string, StaticImageData> = {
  // Natural tool stones / rotary products.
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

  // Natural diamond grit / micron.
  'mb1um-2-4': naturalDiamond,
  'mb1um-12-22': naturalDiamond,
  'mb1um-30-40': naturalDiamond,
  'ns-100-p': naturalDiamond,
  'mb-100-p': naturalDiamond,

  // Metal bond synthetic diamond.
  'esn-770': metalBond,
  'eda-2395': metalBond,
  'metal-bond-micron': metalBond,

  // Resin bond and coated material.
  'resin-bond-mesh': resinBond,
  'nickel-coated': resinBond,
  'erd-um': resinBond,

  // CBN.
  'ebn-aa': cbn,
  'cbn-a-micron': cbn,
  'cbn-b-micron': cbn,

  // Polycrystalline cutting forms.
  pcd,
  pcbn,
  'cvd-polycrystalline': cvdPoly,

  // Polycrystalline micron powder.
  'poly-micron': polyMicron,

  // The live CVD single-crystal page is brochure-led. EID's live MCD product
  // photograph is therefore used for the combined single-crystal family until
  // a separate current-site CVD still is supplied.
  'cvd-single-crystal': monoCrystal,
  mcd: monoCrystal,
}

export const getProductImage = (key?: string): StaticImageData | undefined =>
  key ? productImages[key] : undefined
