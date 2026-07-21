import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// The message catalog is intentionally empty (content lives in lib/i18n-content),
// but the plugin still has to know where the request config sits under src/.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
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
