import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

// The message catalog is intentionally empty (content lives in lib/i18n-content),
// but the plugin still has to know where the request config sits under src/.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
