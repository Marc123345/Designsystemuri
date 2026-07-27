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
//
// x / y place the tile's background crop. The card art is the same
// equirectangular earth-night texture the globe itself is wrapped in, so each
// tile shows the actual patch of night lights at that city:
//   x = (lon + 180) / 360      y = (90 - lat) / 180
// Zoomed to TILE_ZOOM, that reads as a city-lights crop rather than a map.
const MARKETS: { city: string; region: string; x: number; y: number }[] = [
  { city: 'London', region: 'Manufacturing · UK', x: 50.0, y: 21.4 },
  { city: 'Frankfurt', region: 'Europe', x: 52.4, y: 22.2 },
  { city: 'Milan', region: 'Europe', x: 52.6, y: 24.7 },
  { city: 'Paris', region: 'Europe', x: 50.7, y: 22.9 },
  { city: 'Tel Aviv', region: 'Middle East', x: 59.7, y: 32.2 },
  { city: 'Dubai', region: 'Middle East', x: 65.4, y: 36.0 },
  { city: 'Shanghai', region: 'Asia', x: 83.7, y: 32.6 },
  { city: 'Tokyo', region: 'Asia', x: 88.8, y: 30.2 },
  { city: 'Seoul', region: 'Asia', x: 85.3, y: 29.1 },
  { city: 'Mumbai', region: 'Asia', x: 70.2, y: 39.4 },
  { city: 'New York', region: 'Americas', x: 29.4, y: 27.4 },
  { city: 'Chicago', region: 'Americas', x: 25.7, y: 26.7 },
]

/** Background zoom on the world texture — roughly 36° of longitude per tile. */
const TILE_ZOOM = '1000%'

const GlobeSection = ({ eyebrow, title, desc, ctaLabel, ctaHref = '/contact' }: { eyebrow?: string; title?: string; desc?: string; ctaLabel?: string; ctaHref?: string }) => {
  const locale = useLocale() as Locale

  return (
    <section className="section-angled relative size-full overflow-hidden py-20 text-white lg:py-37.5">
      <div className="from-default-950 via-default-950 to-primary-3 absolute inset-0 bg-linear-to-br"></div>
      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-position-[50%] bg-repeat opacity-6"></div>
      {/* Soft blue bloom behind the globe. */}
      <div className="bg-primary-1/15 pointer-events-none absolute top-1/2 right-0 size-[700px] translate-x-1/4 -translate-y-1/2 rounded-full blur-[160px]"></div>

      <div className="relative z-10 container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-1.5 border border-white/15 px-3.5 py-1.25">
              <span className="bg-primary-1 size-2"></span>
              <span className="text-sm text-white">{eyebrow ?? t(locale, 'Reach · supplied worldwide')}</span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white md:text-[28px] lg:text-[32px]">{title ?? t(locale, 'Made in London, supplied across four continents.')}</h2>

            <p className="text-default-200 mt-5 max-w-xl">
              {desc ?? t(locale, 'One facility manufactures and quality-controls the full diamond and CBN range, then ships it to tool makers across Europe, the Middle East, Asia, and the Americas. One specification, wherever you are.')}
            </p>

            {/* Same grid and same type as before — each cell is now an image
                tile with the text over it, cropped to that city's own patch of
                the night-lights texture. */}
            <ul className="mt-8 grid max-w-xl grid-cols-2 gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
              {MARKETS.map((m) => (
                <li
                  key={m.city}
                  className="group relative isolate overflow-hidden"
                  style={{
                    backgroundImage: 'url(/images/earth-night.jpg)',
                    backgroundSize: TILE_ZOOM,
                    backgroundPosition: `${m.x}% ${m.y}%`,
                  }}
                >
                  {/* Scrim: heavy enough that 10px mono clears contrast over the
                      brightest lights, lifting on hover to let the city through. */}
                  <span aria-hidden className="bg-primary-3/72 group-hover:bg-primary-3/45 absolute inset-0 transition-colors duration-500" />
                  <div className="relative z-10 px-3 py-2.5">
                    <div className="text-base leading-tight text-white">{m.city}</div>
                    <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-white/60 uppercase">{t(locale, m.region)}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <ArrowButton href={ctaHref} label={ctaLabel ?? t(locale, 'Talk to us about supply')} variant="primary" />
            </div>
          </div>

          {/* Globe */}
          <div className="relative">
            <Globe size={600} />
            <p className="mt-6 text-center font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">{t(locale, 'Spins on its own · drag to explore')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlobeSection
