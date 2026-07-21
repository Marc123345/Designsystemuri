import { defineRouting } from "next-intl/routing";

// The eight parallel trees named in architecture §11. EN is the default and
// stays unprefixed (/products); the rest are prefixed (/de/products …).
// Content uses a fallback-merge model, so a locale with no override table
// renders EN until its translation batch lands. FR, KO and ZH are in that state.
export const routing = defineRouting({
  locales: ["en", "de", "es", "it", "ja", "fr", "ko", "zh"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
