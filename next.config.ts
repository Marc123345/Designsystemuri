import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// The message catalog is intentionally empty (content lives in lib/i18n-content),
// but the plugin still has to know where the request config sits under src/.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Next advertises itself in an X-Powered-By header by default. It tells an
  // attacker which framework to look up known issues for and tells a visitor
  // nothing.
  poweredByHeader: false,
  /**
   * Security headers. The site was sending none at all.
   *
   * These are the ones that are safe to set without knowing every asset the
   * site will ever load. Deliberately no Content-Security-Policy: this page
   * loads Jotform's embed script from their CDN and frames form.jotform.com,
   * and a CSP written from a list of what is loaded today is a policy that
   * silently breaks the quote form the first time Jotform changes a hostname.
   * That is worth doing properly, with report-only and a reporting endpoint
   * first, rather than guessed at here.
   *
   * HSTS is not set either — Vercel already sends it on production domains, and
   * a second one from the app would only be a chance to disagree.
   */
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        // Stop the browser second-guessing a declared Content-Type.
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // Send the full URL within the site and only the origin off-site, so
        // internal paths do not leak to third parties through the referer.
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        // Nothing here is meant to be framed by anyone else.
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        // Powerful features this site has no use for, denied to the page and to
        // everything it frames. Camera is the exception and is scoped rather
        // than denied: the Jotform embed may carry a photo or upload widget, and
        // a blanket camera=() here would override the iframe's own allow
        // attribute and break it.
        {
          key: 'Permissions-Policy',
          value: 'geolocation=(), microphone=(), payment=(), usb=(), magnetometer=(), camera=(self "https://form.jotform.com")',
        },
      ],
    },
  ],
  images: {
    // Next serves WebP by default and stops there. AVIF is listed first so it
    // is preferred where the browser accepts it — typically 20-30% smaller than
    // WebP at equivalent quality, and every browser that does not support it
    // falls through to the WebP entry, so there is no fallback to write.
    //
    // This matters more here than the two logos on the page today suggest:
    // every product and process shot is still a Wireframe placeholder
    // (SHOW_PHOTOS is false in lib/product-images.ts), and photography of
    // diamond grit is detailed, high-frequency material that compresses badly.
    // The format list wants to be right before thirty of those land, not after.
    formats: ['image/avif', 'image/webp'],
  },
  // Vol 03 removed the standalone products page: the mega-menu exposes the
  // eight product pages and "Products" goes to the range section on the
  // homepage. /products was already deployed, so it redirects rather than 404s.
  // The locale form is listed separately because these run before the
  // next-intl middleware, which is what would otherwise resolve the prefix.
  redirects: async () => [
    { source: "/products", destination: "/#products", permanent: true },
    { source: "/:locale(de|es|it|ja|fr|ko|zh)/products", destination: "/:locale#products", permanent: true },
    // /applications went the same way as /products, and for the same reason:
    // the home page already lists all six hubs, so an index page that listed
    // them again was a click between the reader and the hub they wanted. Both
    // were deployed, so both redirect rather than 404.
    { source: "/applications", destination: "/#applications", permanent: true },
    { source: "/:locale(de|es|it|ja|fr|ko|zh)/applications", destination: "/:locale#applications", permanent: true },
  ],
};

export default withNextIntl(nextConfig);
