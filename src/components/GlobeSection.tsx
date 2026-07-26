'use client'

import Globe from '@/components/Globe'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

// Globe renders only two <div>s on the server; all WebGL/three.js work runs
// lazily inside its useEffect (client-only), so a plain static import hydrates
// cleanly — no next/dynamic bailout needed.

// London is the manufacturing hub; the rest are markets EID ships to, grouped by
// the four regions named in the copy deck. Cities, not offices.
const MARKETS: { city: string; region: string }[] = [
  { city: 'London', region: 'Manufacturing · UK' },
  { city: 'Frankfurt', region: 'Europe' },
  { city: 'Milan', region: 'Europe' },
  { city: 'Paris', region: 'Europe' },
  { city: 'Tel Aviv', region: 'Middle East' },
  { city: 'Dubai', region: 'Middle East' },
  { city: 'Shanghai', region: 'Asia' },
  { city: 'Tokyo', region: 'Asia' },
  { city: 'Seoul', region: 'Asia' },
  { city: 'Mumbai', region: 'Asia' },
  { city: 'New York', region: 'Americas' },
  { city: 'Chicago', region: 'Americas' },
]

const GlobeSection = ({
  eyebrow,
  title,
  desc,
  ctaLabel,
  ctaHref = '/contact',
}: {
  eyebrow?: string
  title?: string
  desc?: string
  ctaLabel?: string
  ctaHref?: string
}) => {
  const locale = useLocale() as Locale

  return (
    <section className="relative size-full overflow-hidden lg:py-37.5 py-20 text-white">
      <div className="absolute inset-0 bg-linear-to-br from-default-950 via-default-950 to-primary-3"></div>
      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-repeat bg-position-[50%] opacity-6"></div>
      {/* Soft blue bloom behind the globe. */}
      <div className="pointer-events-none absolute top-1/2 right-0 size-[700px] -translate-y-1/2 translate-x-1/4 rounded-full bg-primary-1/15 blur-[160px]"></div>

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-2xl border border-white/15 px-3.5 py-1.25">
              <span className="size-2 bg-primary-1"></span>
              <span className="text-sm text-white">
                {eyebrow ?? t(locale, 'Reach · supplied worldwide')}
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white md:text-[28px] lg:text-[32px]">
              {title ?? t(locale, 'Made in London, supplied across four continents.')}
            </h2>

            <p className="mt-5 max-w-xl text-default-200">
              {desc ??
                t(
                  locale,
                  'One facility manufactures and quality-controls the full diamond and CBN range, then ships it to tool makers across Europe, the Middle East, Asia, and the Americas. One specification, wherever you are.',
                )}
            </p>

            <ul className="mt-8 grid max-w-xl grid-cols-2 gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
              {MARKETS.map((m) => (
                <li key={m.city} className="border-b border-white/10 pb-3">
                  <div className="text-base leading-tight text-white">{m.city}</div>
                  <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                    {t(locale, m.region)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <ArrowButton
                href={ctaHref}
                label={ctaLabel ?? t(locale, 'Talk to us about supply')}
                variant="primary"
              />
            </div>
          </div>

          {/* Globe */}
          <div className="relative">
            <Globe size={600} />
            <p className="mt-6 text-center text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
              {t(locale, 'Spins on its own · drag to explore')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlobeSection
