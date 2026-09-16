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
 */

/**
 * Product group imagery from EID's current public website.
 *
 * Marc asked that the redesigned catalogue use the real product imagery already
 * published on eid-ltd.com rather than generated stand-ins. These URLs point to
 * the source media behind the current Wix site, while Next still optimises them
 * through the remotePatterns entry in next.config.ts.
 */
const PRODUCT_IMAGES: Record<string, string> = {
  'natural-grit-powder': 'https://static.wixstatic.com/media/10a9d7_1d7ca04453714f74b6acaa20142941a0~mv2.png',
  'metal-bond': 'https://static.wixstatic.com/media/10a9d7_f7b89c273cf349aea074ba0084fcd833~mv2.jpg',
  'resin-bond': 'https://static.wixstatic.com/media/10a9d7_194945f4691b416eb8e528e4680a8d65~mv2.jpg',
  cbn: 'https://static.wixstatic.com/media/10a9d7_56f688a006ab4c8191f890ece2373b18~mv2.jpg',
  // The current CVD-single page is brochure-led; the MCD product photo on the
  // same live catalogue is the cleanest real image for the combined CVD & MCD
  // group used on the redesigned site.
  'single-crystal': 'https://static.wixstatic.com/media/43b3e7_f5c1d5cd16d74131a6f5ff74802c1dac~mv2.jpg',
  // PCD is one half of this combined CVD & PCD family and gives the card a
  // recognisable product form rather than another generic grit photograph.
  'polycrystalline-diamond': 'https://static.wixstatic.com/media/10a9d7_5cdb96b4f1b34ea9b902a75e726cf273~mv2.png',
  'tool-stones': 'https://static.wixstatic.com/media/10a9d7_57bda81f7bdf4d9ea17e218ce93f6b24~mv2.jpg',
  'polycrystalline-powder': 'https://static.wixstatic.com/media/10a9d7_55e960ff79334e40ba45055da6b71364~mv2.jpg',
}

/**
 * Application imagery stays on the redesigned photography set. Uri's request
 * in this review was specifically about replacing the PRODUCT imagery with the
 * real catalogue shots from the current EID website.
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
