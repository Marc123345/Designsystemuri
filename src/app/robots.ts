import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "./sitemap";

// Origin comes from sitemap.ts so robots, canonicals, and the sitemap all
// resolve to the same host. `host` is intentionally omitted — it is a legacy
// Yandex-only directive that Google and Bing ignore.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
