import HeroRail, { type RailItem } from '@/components/home/HeroRail'
import Wireframe from '@/components/Wireframe'
import type { Locale } from '@/i18n/routing'
import { applications } from '@/lib/applications'
import { t } from '@/lib/i18n-content'
import { products } from '@/lib/products'
import { useLocale } from 'next-intl'
import Link from 'next/link'

/**
 * One hero, one message. The Vol 03 deck replaced the rotating three-slide
 * version with a single block: the positioning has to land in one read, and a
 * technical buyer scanning for credentials should not have to wait for a slide.
 *
 * Layout: one full-bleed image with the statement top-left, an industry row on
 * the bottom-left, and a rail of the eight product groups bottom-right. The
 * rail is the reason this shape earns its keep, and the reason the hero needs
 * no buttons: the range used to be a link a buyer had to take on trust, and it
 * is now visible above the fold with each group one click away.
 *
 * What is deliberately not borrowed from the reference:
 *  - Rounded 24px cards and translucent outlines. Everything in this system is
 *    hard-cornered, so a rounded card here would be the only curve on the page.
 *  - The italic serif headline. The site's type is bold sans throughout, and
 *    an editorial serif would reposition an industrial supplier as a lifestyle
 *    brand in the first thing anyone reads.
 *  - The social row. It sits bottom-left in the reference; that slot carries
 *    the six application hubs instead, which is what a technical buyer is
 *    actually scanning for — whether this supplier serves their industry.
 *
 * There is no eyebrow above the headline. The reference has one, but the three
 * label lines that used to sit there were cut deliberately: they diluted the
 * one thing the reader is meant to take away, and the headline carries it.
 */
const Hero = ({ title, desc }: { title: string; desc: string }) => {
  const locale = useLocale() as Locale

  // Only the fields the rail renders cross into the client bundle. Importing
  // `products` there would ship the whole 780-line catalogue to the browser.
  const groups: RailItem[] = products.map((product) => ({ slug: product.slug, name: product.name }))

  return (
    // svh rather than vh: on mobile browsers vh counts the retracting chrome, so
    // a 100vh hero is clipped on first paint and only fits after a scroll.
    // min- rather than fixed, because the rail and the industry row together are
    // taller than a short laptop viewport once they stack.
    <section data-note="hero" className="relative min-h-svh w-full overflow-hidden">
      {/* The image is the hero. Everything else sits on top of it. */}
      <div className="absolute inset-0">
        <Wireframe label="Hero image — diamond grit / production floor, London" ratio="wide" tone="dark" hideLabel className="!aspect-auto size-full !border-0" />
      </div>

      {/* Legibility. Weighted to the bottom and the left, because that is where
          the copy is, and kept off the top so the image still reads as an image. */}
      <div className="from-default-950/95 via-default-950/70 absolute inset-0 bg-linear-to-t to-transparent" />
      <div className="from-default-950/85 absolute inset-0 bg-linear-to-r to-transparent lg:to-60%" />

      {/* Everything sits on the bottom edge of the image, in two columns that
          share one baseline: the statement left, the rail right. The statement
          used to be pinned under the header with the rail far below it, which
          left a dead band across the middle of the screen and made the two
          halves read as two unrelated sections rather than one hero. */}
      {/* `container`, not the hero's own padding. It was on px-6/10/14, which put
          the headline 20px to the left of every other section on the page — the
          one element on the site that did not line up with the rest of it. */}
      <div className="relative z-10 flex min-h-svh flex-col justify-end pt-32 pb-10 md:pt-36 lg:pb-14">
        <div className="container">
          <div className="flex flex-col gap-12 xl:flex-row xl:items-end xl:justify-between xl:gap-16">
            {/* Left — the statement and the industries it serves. The lede used
                to sit here too, which stacked three blocks down one column
                against a single block in the other. It now heads the right
                column, so each side carries two things and the two columns are
                closer in height.

                No buttons. The rail alongside is the "browse the range" action,
                and the header already carries the contact route, so a pair of
                CTAs here was a third copy of the same two destinations. */}
            <div className="max-w-[34rem]">
              <h1 className="text-[32px] leading-[1.05] font-bold tracking-tight text-white md:text-[44px] lg:text-[52px] xl:text-[56px]">{title}</h1>

              <div className="mt-9 border-t border-white/15 pt-6">
                <p className="text-default-400 text-xs tracking-[0.22em] uppercase">{t(locale, 'Industries we supply')}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {applications.map((application) => (
                    <Link
                      key={application.slug}
                      href={`/applications/${application.slug}`}
                      className="text-default-200 focus-visible:outline-primary border-b border-transparent pb-0.5 text-sm transition-colors hover:border-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      {application.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full xl:max-w-[43rem]">
              <p className="text-default-200 mb-8 max-w-[34rem] text-base leading-relaxed md:text-lg">{desc}</p>

              <HeroRail items={groups} prevLabel={t(locale, 'Previous product group')} nextLabel={t(locale, 'Next product group')} railLabel={t(locale, 'Product groups')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
