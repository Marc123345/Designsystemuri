import { applications } from './applications'
import { products } from './products'

export const site = {
  name: 'EID Ltd',
  tagline: 'Industrial Diamond & CBN Manufacturer',
  location: 'London, UK',
  email: 'info@eid-ltd.com',
  phone: '+44 (0) 207 405 6594',
  phoneHref: 'tel:+442074056594',
  fax: '+44 (0) 207 831 0372',
  // Punctuated exactly as the Vol 03 deck writes it, so the address reads
  // identically wherever it appears (footer, About, Contact).
  address: 'EID House, 12 St. Cross Street, London, EC1N 8UB, England',
  // Persistent WhatsApp Business channel: one tap opens a chat to the London
  // landline, shared across three to five team members so replies are not
  // blocked on one person. Sits alongside Contact on every page.
  whatsapp: '+44 20 7405 6594',
  whatsappHref: 'https://wa.me/442074056594',
}

// Verified trust signals only. The "30+ countries" figure is unconfirmed, so the
// trust bar leads with the verified 50-year record and ISO 9001 instead.
/* "Manufacturing Since 1970", not "50+ Years' Experience".
   
   Uri's approved home-page hero copy anchors on 1970, and the About numbers
   strip reads 55+. Three different ways of saying one thing was one of the
   inconsistencies flagged against the V1 feedback; 1970 is now the single
   anchor, and it is the one that never needs editing. The old string is still
   translated in i18n-content for the seven non-English locales — that table
   will pick up the new key on the next `npm run translate`, and falls back to
   English until it does. */
export const trustPoints = ['ISO 9001 Certified', 'In-House QC Laboratory', 'Complete Superabrasive Range', 'Manufacturing Since 1970']

/**
 * Products mega-menu: the eight pages exposed directly, laid out as a 2-2-2-2
 * grid. Nothing sits below them. Mesh and micron splits, rotary diamonds,
 * coatings, PCBN, and PCD blanks are sections inside their parent page,
 * reachable by anchor from the page and from the footer index, never from here.
 */
/**
 * The eight product pages as one vertical list, matching the Applications and
 * Resources menus. Ordered by the locked product sequence rather than the
 * 2-2-2-2 grid reading order, which only made sense across four columns.
 */
export const productMenu = products.map((p) => ({
  label: p.name,
  href: `/products/${p.slug}`,
}))

export const applicationMenu = applications.map((a) => ({
  label: a.name,
  href: `/applications/${a.slug}`,
}))

export const resourceMenu = [
  { label: 'Datasheets', href: '/resources/datasheets' },
  { label: 'MSDS', href: '/resources/msds' },
  { label: 'Blog', href: '/resources/blog' },
]

// Primary header navigation. Order is the buyer's journey: catalogue first, the
// second entry axis next, Quality standalone (never buried in a menu, it is the
// differentiator), then research, then company, then the conversion endpoint.
export const primaryNav = [
  { label: 'Home', href: '/' },
  // There is no standalone products page. Hovering reveals the eight product
  // pages in the mega-menu; clicking goes to the range section on the homepage.
  { label: 'Products', href: '/#products', menu: 'products' as const },
  // Same shape as Products directly above: there is no standalone applications
  // page any more. Hovering reveals the six hubs in the mega-menu; clicking
  // goes to the applications section on the homepage.
  { label: 'Applications', href: '/#applications', menu: 'applications' as const },
  { label: 'Quality', href: '/quality' },
  // href here is the active-state prefix only — a menu entry renders as a
  // dropdown button, never a link, so it does not point at the removed index.
  { label: 'Resources', href: '/resources', menu: 'resources' as const },
  { label: 'About', href: '/about' },
  // The conversion endpoint. Rendered as a visually distinct button at the far
  // right, never as just another link.
  { label: 'Contact', href: '/contact', cta: true as const },
]

// Footer index: Products, Applications, and Company & Resources.
//
// There used to be a fourth column, "Sections", listing the eleven in-page
// anchors — Diamond Grit (Mesh), Micron Powder, Coated CBN, PCD Discs & Blanks
// and so on. It came out on Uri's pass, and it should have: to a visitor those
// eleven entries look like eleven more pages, and clicking one lands them
// part-way down a product page they have not seen the top of. The anchors are
// still reachable from the product pages themselves and from the cross-link
// blocks, which is where they read as sections rather than as destinations.
export const footerColumns = [
  {
    title: 'Products',
    links: products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
  },
  {
    title: 'Applications',
    links: applications.map((a) => ({ label: a.name, href: `/applications/${a.slug}` })),
  },
  {
    title: 'Company & Resources',
    links: [
      { label: 'Products Overview', href: '/#products' },
      { label: 'Quality, QC & ISO 9001', href: '/quality' },
      { label: 'Mesh QC', href: '/mesh-qc' },
      { label: 'Micron QC', href: '/micron-qc' },
      { label: 'Blog', href: '/resources/blog' },
      { label: 'Datasheets', href: '/resources/datasheets' },
      { label: 'MSDS', href: '/resources/msds' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

// Legal links live in the footer bottom bar per the architecture doc §10.
// Terms and Privacy need real content from Uri before launch; until then they
// are not linked to placeholder pages that would rank or mislead.
export const legalLinks = [
  { label: 'Sitemap', href: '/sitemap.xml', ready: true },
  { label: 'Terms', href: '/terms', ready: false },
  { label: 'Privacy', href: '/privacy', ready: false },
]
