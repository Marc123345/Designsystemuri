import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Translatable content lives in per-locale data modules (lib/content/*), so the
// message catalog is intentionally empty. It stays here so useTranslations can
// be adopted later for any incidental UI strings without reworking the setup.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return { locale, messages: {} };
});
