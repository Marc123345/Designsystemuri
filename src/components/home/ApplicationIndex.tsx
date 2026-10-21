import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { applicationImage } from '@/lib/card-media'
import { t } from '@/lib/i18n-content'
import Image from 'next/image'

/**
 * The six application hubs as photographed cards.
 *
 * The icon index was intentionally compact, but Marc's direction for this band
 * is visual again: the existing application photography is the subject, with
 * the label acting as navigation rather than replacing the image.
 *
 * Keep the geometry simple here. The applications section sits directly above
 * the more expressive QC treatment, so these cards use the site's normal 24px
 * rounded-card shell and a restrained text scrim rather than introducing a
 * second special silhouette.
 */
export interface HubEntry {
  slug: string
  name: string
}

export default function ApplicationIndex({ hubs, locale }: { hubs: HubEntry[]; locale: Locale }) {
  return (
    <>
      {/* ApplicationIndex only renders on the homepage. Keep Marc's range
          statement blue without changing every h2 in the shared heading
          system or coupling colour to translated copy text. */}
      <style>{'[data-note="range"] h2 { color: var(--color-primary); }'}</style>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
        {hubs.map((hub, index) => {
          const image = applicationImage(hub.slug)

          return (
            <Link
              key={hub.slug}
              href={`/applications/${hub.slug}`}
              className="group rounded-card border-default-200 relative isolate aspect-[4/3] overflow-hidden xl:aspect-[4/5] border bg-default-900 shadow-[0_1px_2px_rgba(2,6,23,0.05),0_22px_44px_-30px_rgba(2,6,23,0.35)] focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {image && (
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 17vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                />
              )}

              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/76 via-black/18 to-black/0" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 lg:p-5">
                <div className="min-w-0">
                  <span className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-white/75 uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[15px] leading-[1.15] font-semibold tracking-[-0.01em] text-white text-balance sm:text-[17px]">
                    {t(locale, hub.name)}
                  </h3>
                </div>

                <span className="rounded-control hidden size-8 shrink-0 sm:flex items-center justify-center border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-default-900 group-focus-visible:-translate-y-1 group-focus-visible:bg-white group-focus-visible:text-default-900">
                  <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
