import Wireframe from '@/components/Wireframe'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import { useLocale } from 'next-intl'

/**
 * One hero, one message. The Vol 03 deck replaced the rotating three-slide
 * version with a single block: the positioning has to land in one read, and a
 * technical buyer scanning for credentials should not have to wait for a slide.
 */
const Hero = ({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) => {
  const locale = useLocale() as Locale

  return (
    <section className="relative size-full overflow-hidden pt-35 lg:pt-50">
      <div className="relative z-10 container">
        <div className="grid items-end gap-12.5 xl:grid-cols-4 xl:gap-20">
          <div className="xl:col-span-3">
            <div className="border-default-300 inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
              <span className="bg-primary size-2"></span>
              <span className="text-default-900 text-sm">{eyebrow}</span>
            </div>

            <h1 className="mt-4 text-[34px] font-bold md:text-[48px] lg:text-6xl">{title}</h1>
          </div>

          <div>
            <p className="mb-7.5 text-base">{desc}</p>
            <div className="flex flex-wrap gap-4">
              <ArrowButton href="#products" label={t(locale, 'Browse the Full Range')} external />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Wireframe label="Hero image — diamond grit / production floor, London" ratio="wide" />
        </div>

        {/* No stats row and no ISO line here: the trust bar sits immediately
below the hero and already carries ISO 9001, the QC laboratory, the
range and the 50-year record. Repeating them one screen apart made
"ISO 9001 Certified" appear three times before the fold. */}
        <div className="border-default-200 mt-16 mb-10 flex items-center justify-between border-t pt-6">
          <div className="text-default-900 text-sm">
            {t(locale, 'Based in:')} {site.location}
          </div>
          <a href="#products" className="hover:text-primary text-center text-sm uppercase transition-colors">
            {t(locale, 'Scroll Down')}
          </a>
        </div>
      </div>

      <div className="absolute inset-0 flex items-stretch justify-between gap-0 md:justify-center md:gap-45 lg:gap-75 xl:gap-80.5">
        <div className="border-default-900 h-full w-0.5 border border-dashed opacity-7"></div>
        <div className="border-default-900 h-full w-0.5 border border-dashed opacity-7"></div>
        <div className="border-default-900 h-full w-0.5 border border-dashed opacity-7"></div>
        <div className="border-default-900 h-full w-0.5 border border-dashed opacity-7"></div>
        <div className="border-default-900 h-full w-0.5 border border-dashed opacity-7"></div>
      </div>

      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-position-[50%] bg-repeat object-cover opacity-4"></div>
    </section>
  )
}

export default Hero
