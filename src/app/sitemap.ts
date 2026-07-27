import { routing, type Locale } from '@/i18n/routing'
import { applications } from '@/lib/applications'
import { products } from '@/lib/products'
import type { MetadataRoute } from 'next'

/**
 * Canonical serving origin — the single source of truth for the whole SEO
 * surface. Imported by robots.ts and by the hreflang helper (which stamps the
 * <canonical> and hreflang tags on every page), so setting it correctly here
 * fixes canonicals, alternates, robots, and this sitemap in one move.
 *
 * Resolved in priority order:
 *  1. NEXT_PUBLIC_SITE_URL — set to https://www.eid-ltd.com when the custom
 * domain is attached, and the entire site follows.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — the project's production domain on
 *     Vercel. Stable across preview builds, so a preview still emits the
 * production canonical rather than its own deployment URL.
 *  3. The current production domain — for local dev / non-Vercel builds.
 */
export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://designsystemuri.vercel.app')).replace(/\/+$/, '')

const localeUrl = (locale: Locale, path: string) => {
  const norm = path === '/' ? '' : path
  return locale === routing.defaultLocale ? `${SITE_ORIGIN}${norm || '/'}` : `${SITE_ORIGIN}/${locale}${norm}`
}

type Meta = { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }

// Every real, indexable route, locale-agnostic, with its SEO weighting. The
// per-slug product and application pages are generated from the data so the
// sitemap can never drift out of sync with the routes that actually exist.
//
// Deliberately absent: /products (Products Overview was removed — /products
// 301s to /#products, so listing it would advertise a redirect).
const paths: Record<string, Meta> = {
  '/': { priority: 1.0, changeFrequency: 'weekly' },
  '/applications': { priority: 0.9, changeFrequency: 'weekly' },
  ...Object.fromEntries(products.map((p) => [`/products/${p.slug}`, { priority: 0.8, changeFrequency: 'monthly' } as Meta])),
  ...Object.fromEntries(applications.map((a) => [`/applications/${a.slug}`, { priority: 0.8, changeFrequency: 'monthly' } as Meta])),
  '/quality': { priority: 0.7, changeFrequency: 'monthly' },
  '/mesh-qc': { priority: 0.5, changeFrequency: 'monthly' },
  '/micron-qc': { priority: 0.5, changeFrequency: 'monthly' },
  '/about': { priority: 0.6, changeFrequency: 'monthly' },
  '/contact': { priority: 0.7, changeFrequency: 'monthly' },
  '/resources': { priority: 0.6, changeFrequency: 'monthly' },
  '/resources/datasheets': { priority: 0.6, changeFrequency: 'monthly' },
  '/resources/msds': { priority: 0.6, changeFrequency: 'monthly' },
  '/resources/blog': { priority: 0.5, changeFrequency: 'weekly' },
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return Object.entries(paths).flatMap(([path, meta]) => {
    // Each URL lists every language alternate plus x-default (Google's
    // recommended reciprocal form), matching the <head> hreflang tags.
    const languages: Record<string, string> = {
      'x-default': localeUrl(routing.defaultLocale, path),
    }
    for (const l of routing.locales) languages[l] = localeUrl(l, path)

    return routing.locales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
      alternates: { languages },
    }))
  })
}
