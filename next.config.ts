import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// The message catalog is intentionally empty (content lives in lib/i18n-content),
// but the plugin still has to know where the request config sits under src/.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
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
  ],
};

export default withNextIntl(nextConfig);
