import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { applications } from "@/lib/applications";
import { routing, type Locale } from "@/i18n/routing";

// Canonical serving origin. Update to https://www.eid-ltd.com once the custom
// domain is attached (also update layout orgSchema and robots.ts).
export const SITE_ORIGIN = "https://eid-nextjs.vercel.app";

const localeUrl = (locale: Locale, path: string) => {
  const norm = path === "/" ? "" : path;
  return locale === routing.defaultLocale
    ? `${SITE_ORIGIN}${norm || "/"}`
    : `${SITE_ORIGIN}/${locale}${norm}`;
};

type Meta = { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] };

// Locale-agnostic paths with their SEO weighting.
const paths: Record<string, Meta> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/applications": { priority: 0.9, changeFrequency: "weekly" },
  "/about": { priority: 0.6, changeFrequency: "monthly" },
  "/contact": { priority: 0.7, changeFrequency: "monthly" },
  ...Object.fromEntries(
    products.map((p) => [`/products/${p.slug}`, { priority: 0.8, changeFrequency: "monthly" } as Meta]),
  ),
  ...Object.fromEntries(
    applications.map((a) => [`/applications/${a.slug}`, { priority: 0.8, changeFrequency: "monthly" } as Meta]),
  ),
  "/quality": { priority: 0.7, changeFrequency: "monthly" },
  "/mesh-qc": { priority: 0.5, changeFrequency: "monthly" },
  "/micron-qc": { priority: 0.5, changeFrequency: "monthly" },
  "/resources": { priority: 0.6, changeFrequency: "monthly" },
  "/resources/datasheets": { priority: 0.6, changeFrequency: "monthly" },
  "/resources/msds": { priority: 0.6, changeFrequency: "monthly" },
  "/resources/blog": { priority: 0.5, changeFrequency: "weekly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.entries(paths).flatMap(([path, meta]) => {
    // Every URL lists all language alternates (Google's recommended form).
    const languages: Record<string, string> = {};
    for (const l of routing.locales) languages[l] = localeUrl(l, path);

    return routing.locales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
      alternates: { languages },
    }));
  });
}
