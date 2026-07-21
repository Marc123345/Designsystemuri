import type { Metadata } from "next";
import { SITE_ORIGIN } from "@/app/sitemap";
import { routing, type Locale } from "@/i18n/routing";

// Reciprocal hreflang + x-default for a locale-agnostic path.
// path examples: "" or "/" (home), "/products/cbn".
export function localeAlternates(
  locale: Locale,
  path: string,
): NonNullable<Metadata["alternates"]> {
  const norm = path === "/" ? "" : path;
  const url = (l: Locale) =>
    l === routing.defaultLocale ? `${SITE_ORIGIN}${norm || "/"}` : `${SITE_ORIGIN}/${l}${norm}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = url(l);
  languages["x-default"] = url(routing.defaultLocale);

  return { canonical: url(locale), languages };
}
