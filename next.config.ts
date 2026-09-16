import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        {
          key: 'Permissions-Policy',
          value: 'geolocation=(), microphone=(), payment=(), usb=(), magnetometer=(), camera=(self "https://form.jotform.com")',
        },
      ],
    },
  ],
  images: {
    // Still required for the London HQ photograph used on Contact. Product
    // imagery itself is back on the local AI catalogue set.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        pathname: '/media/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  redirects: async () => [
    { source: "/products", destination: "/#products", permanent: true },
    { source: "/:locale(de|es|it|ja|fr|ko|zh)/products", destination: "/:locale#products", permanent: true },
    { source: "/applications", destination: "/#applications", permanent: true },
    { source: "/:locale(de|es|it|ja|fr|ko|zh)/applications", destination: "/:locale#applications", permanent: true },
    { source: "/mesh-qc", destination: "/quality", permanent: true },
    { source: "/:locale(de|es|it|ja|fr|ko|zh)/mesh-qc", destination: "/:locale/quality", permanent: true },
    { source: "/micron-qc", destination: "/quality", permanent: true },
    { source: "/:locale(de|es|it|ja|fr|ko|zh)/micron-qc", destination: "/:locale/quality", permanent: true },

    // Legacy eid-ltd.com catalogue -> redesigned eight-page catalogue.
    // Mesh products.
    { source: "/resin-bond-mesh", destination: "/products/resin-bond#mesh", permanent: true },
    { source: "/metal-bond-mesh", destination: "/products/metal-bond#mesh", permanent: true },
    { source: "/natural-mesh", destination: "/products/natural-grit-powder#grit", permanent: true },
    { source: "/ebn-mesh", destination: "/products/cbn#mesh", permanent: true },

    // Micron products.
    { source: "/resin-bond-micron", destination: "/products/resin-bond#micron", permanent: true },
    { source: "/metal-bond-micron", destination: "/products/metal-bond#micron", permanent: true },
    { source: "/natural-micron", destination: "/products/natural-grit-powder#micron", permanent: true },
    { source: "/polycrystalline-micron", destination: "/products/polycrystalline-powder#polycrystalline-powder", permanent: true },
    { source: "/ebn-micron", destination: "/products/cbn#micron", permanent: true },

    // CVD / monocrystalline / polycrystalline products.
    { source: "/cvd-single-crystal", destination: "/products/single-crystal#cvd", permanent: true },
    { source: "/cvd-polycrystalline", destination: "/products/polycrystalline-diamond#dressing-logs", permanent: true },
    { source: "/mcd", destination: "/products/single-crystal#mcd", permanent: true },
    { source: "/pcd", destination: "/products/polycrystalline-diamond#pcd-blanks", permanent: true },
    { source: "/pcbn", destination: "/products/cbn#pcbn", permanent: true },

    // Natural speciality products and surface-enhancement services.
    { source: "/natural-rotarydiamond", destination: "/products/natural-grit-powder#rotary", permanent: true },
    { source: "/toolstones", destination: "/products/tool-stones#tool-stones", permanent: true },
    { source: "/surface-enhancement-coatings", destination: "/surface-enhancements#coatings", permanent: true },
    { source: "/surface-enhancement-polish-etch", destination: "/surface-enhancements#polish-etch", permanent: true },

    // Wix duplicate pages should consolidate into the canonical destinations.
    { source: "/copy-of-cvd-single-crystal", destination: "/products/single-crystal#cvd", permanent: true },
    { source: "/copy-of-home", destination: "/", permanent: true },
  ],
};

export default withNextIntl(nextConfig);
