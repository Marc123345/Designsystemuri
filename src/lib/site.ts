import { products, MEGA_MENU_COLUMNS, getProduct } from "./products";
import { applications } from "./applications";

export const site = {
  name: "EID Ltd",
  tagline: "Industrial Diamond & CBN Manufacturer",
  location: "London, UK",
  email: "info@eid-ltd.com",
  phone: "+44 (0) 207 405 6594",
  phoneHref: "tel:+442074056594",
  fax: "+44 (0) 207 831 0372",
  // Punctuated exactly as the Vol 03 deck writes it, so the address reads
  // identically wherever it appears (footer, About, Contact).
  address: "EID House, 12 St. Cross Street, London, EC1N 8UB, England",
  // Persistent WhatsApp Business channel: one tap opens a chat to the London
  // landline, shared across three to five team members so replies are not
  // blocked on one person. Sits alongside Contact on every page.
  whatsapp: "+44 20 7405 6594",
  whatsappHref: "https://wa.me/442074056594",
};

// Verified trust signals only. The "30+ countries" figure is unconfirmed, so the
// trust bar leads with the verified 50-year record and ISO 9001 instead.
export const trustPoints = [
  "ISO 9001 Certified",
  "In-House QC Laboratory",
  "Complete Superabrasive Range",
  "50+ Years' Experience",
];

/**
 * Products mega-menu: the eight pages exposed directly, laid out as a 2-2-2-2
 * grid. Nothing sits below them. Mesh and micron splits, rotary diamonds,
 * coatings, PCBN, and PCD blanks are sections inside their parent page,
 * reachable by anchor from the page and from the footer index, never from here.
 */
export const productMenuColumns = MEGA_MENU_COLUMNS.map((column) =>
  column
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({ slug: p.slug, label: p.name, href: `/products/${p.slug}` })),
);

export const applicationMenu = applications.map((a) => ({
  label: a.name,
  href: `/applications/${a.slug}`,
}));

export const resourceMenu = [
  { label: "Resources & Guides", href: "/resources" },
  { label: "Blog", href: "/resources/blog" },
  { label: "Datasheets", href: "/resources/datasheets" },
  { label: "MSDS", href: "/resources/msds" },
];

// Primary header navigation. Order is the buyer's journey: catalogue first, the
// second entry axis next, Quality standalone (never buried in a menu, it is the
// differentiator), then research, then company, then the conversion endpoint.
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", menu: "products" as const },
  { label: "Applications", href: "/applications", menu: "applications" as const },
  { label: "Quality", href: "/quality" },
  { label: "Resources", href: "/resources", menu: "resources" as const },
  { label: "About", href: "/about" },
  // The conversion endpoint. Rendered as a visually distinct button at the far
  // right, never as just another link.
  { label: "Contact", href: "/contact", cta: true as const },
];

// Footer = the complete index. A mega-menu cannot expose every page and section
// without clutter, so the footer carries the full link set for power users and
// gives crawlers a complete internal-link map from every page.
export const footerColumns = [
  {
    title: "Products",
    links: products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
  },
  {
    title: "Applications",
    links: applications.map((a) => ({ label: a.name, href: `/applications/${a.slug}` })),
  },
  {
    title: "Sections",
    links: [
      { label: "Diamond Grit (Mesh)", href: "/products/natural-grit-powder#grit" },
      { label: "Micron Powder", href: "/products/natural-grit-powder#micron" },
      { label: "Rotary Diamonds", href: "/products/natural-grit-powder#rotary" },
      { label: "Coated Metal Bond", href: "/products/metal-bond#coated" },
      { label: "Coated Resin Bond", href: "/products/resin-bond#coated" },
      { label: "Coated CBN", href: "/products/cbn#coated" },
      { label: "PCBN Discs & Blanks", href: "/products/cbn#pcbn" },
      { label: "CVD Single Crystal", href: "/products/single-crystal#cvd" },
      { label: "MCD", href: "/products/single-crystal#mcd" },
      { label: "PCD Discs & Blanks", href: "/products/polycrystalline-diamond#pcd-blanks" },
      { label: "CVD Dressing Logs", href: "/products/polycrystalline-diamond#dressing-logs" },
    ],
  },
  {
    title: "Company & Resources",
    links: [
      { label: "Products Overview", href: "/products" },
      { label: "Quality, QC & ISO 9001", href: "/quality" },
      { label: "Mesh QC", href: "/mesh-qc" },
      { label: "Micron QC", href: "/micron-qc" },
      { label: "Resources & Guides", href: "/resources" },
      { label: "Blog", href: "/resources/blog" },
      { label: "Datasheets", href: "/resources/datasheets" },
      { label: "MSDS", href: "/resources/msds" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// Legal links live in the footer bottom bar per the architecture doc §10.
// Terms and Privacy need real content from Uri before launch; until then they
// are not linked to placeholder pages that would rank or mislead.
export const legalLinks = [
  { label: "Sitemap", href: "/sitemap.xml", ready: true },
  { label: "Terms", href: "/terms", ready: false },
  { label: "Privacy", href: "/privacy", ready: false },
];
