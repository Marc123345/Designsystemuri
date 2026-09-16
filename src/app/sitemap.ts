import { routing, type Locale } from '@/i18n/routing'
import { applications } from '@/lib/applications'
import { posts } from '@/lib/blog'
import { products } from '@/lib/products'
import type { MetadataRoute } from 'next'

/**
 * Canonical serving origin — the single source of truth for the whole SEO
 * surface. Imported by robots.ts and by the hreflang helper (which stamps the
 * <canonical> and hreflang tags on every page), so setting it correctly here
 * fixes canonicals, alternates, robots, and this sitemap in one move.
 */
export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://designsystemuri.vercel.app')).replace(/\/+$/, '')

const localeUrl = (locale: Locale, path: string) => {
  const norm = path === '/' ? '' : path
  return locale === routing.defaultLocale ? `${SITE_ORIGIN}${norm || '/'}` : `${SITE_ORIGIN}/${locale}${norm}`
}

type Meta = { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }

const paths: Record<string, Meta> = {
  '/': { priority: 1.0, changeFrequency: 'weekly' },
  ...Object.fromEntries(products.map((p) => [`/products/${p.slug}`, { priority: 0.8, changeFrequency: 'monthly' } as Meta])),
  ...Object.fromEntries(applications.map((a) => [`/applications/${a.slug}`, { priority: 0.8, changeFrequency: 'monthly' } as Meta])),
  ...Object.fromEntries(posts.map((b) => [`/resources/blog/${b.slug}`, { priority: 0.6, changeFrequency: 'yearly' } as Meta])),
  '/surface-enhancements': { priority: 0.7, changeFrequency: 'monthly' },
  '/quality': { priority: 0.7, changeFrequency: 'monthly' },
  '/about': { priority: 0.6, changeFrequency: 'monthly' },
  '/contact': { priority: 0.7, changeFrequency: 'monthly' },
  '/resources/datasheets': { priority: 0.6, changeFrequency: 'monthly' },
  '/resources/msds': { priority: 0.6, changeFrequency: 'monthly' },
  '/resources/blog': { priority: 0.5, changeFrequency: 'weekly' },
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return Object.entries(paths).flatMap(([path, meta]) => {
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
