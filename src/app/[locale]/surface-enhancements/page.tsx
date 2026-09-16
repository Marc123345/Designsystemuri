import { PageHero } from '@/components/sections'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Surface Enhancements | Diamond & CBN Coatings | EID' },
    description: 'EID surface enhancements for industrial diamond and CBN, including nickel and copper electroless coatings, metallic PVD coatings, polishing, etching and crystal rounding.',
    alternates: localeAlternates(locale, '/surface-enhancements'),
  }
}

const SurfaceEnhancementsPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'Surface Enhancements')}
        title={t(locale, 'Coatings, polishing, etching and crystal rounding.')}
        desc={t(locale, 'Surface treatments for diamond and CBN where bond retention, heat transfer or engineered surface characteristics matter.')}
        variant="band"
      />

      <section id="coatings" className="py-16 lg:py-22">
        <div className="container grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-default-500 uppercase">{t(locale, 'Coatings')}</p>
            <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.035em] text-default-950 md:text-[38px]">{t(locale, 'Electroless and metallic coatings.')}</h2>
          </div>
          <div className="space-y-7 text-[16px] leading-7 text-default-650">
            <p>{t(locale, 'Nickel and copper coatings improve bond retention and assist heat transfer away from the grinding area, helping minimise localised overheating and thermal degradation of the diamond and bond.')}</p>
            <p>{t(locale, 'Standard electroless coating levels are 30%, 56% and 60%, with custom coating percentages available to specification.')}</p>
            <div className="border-t border-default-200 pt-6">
              <h3 className="text-lg font-semibold text-default-950">{t(locale, 'Metallic PVD options')}</h3>
              <p className="mt-2">{t(locale, 'Available coatings include titanium, titanium carbide, titanium nitride, titanium carbonitride, silicon carbide, copper, chrome nickel, chromium carbide, zirconium, aluminium and aluminium nitride.')}</p>
            </div>
            <div className="border-t border-default-200 pt-6">
              <h3 className="text-lg font-semibold text-default-950">{t(locale, 'Smooth nickel')}</h3>
              <p className="mt-2">{t(locale, 'For wire slicing applications requiring smooth nickel, EID controls iron and phosphorus levels. Smooth nickel is available across mesh sizes from 20/25 to 400/500 and micron sizes from 40/60 µm to 4/6 µm.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="polish-etch" className="bg-canvas py-16 lg:py-22">
        <div className="container">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] tracking-[0.22em] text-default-500 uppercase">{t(locale, 'Polish / Etch / CRT')}</p>
            <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.035em] text-default-950 md:text-[38px]">{t(locale, 'Engineered diamond surfaces.')}</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Polish',
                body: 'Chemical polishing can transform a matt, dull diamond surface into a high-gloss, shiny surface.',
              },
              {
                title: 'Etch',
                body: 'Special surface etching is available for micro-engineering electroplating applications to support strong nickel-to-diamond clamping characteristics.',
              },
              {
                title: 'Crystal rounding',
                body: 'EID has developed specialised technology for rounding octahedral crystals for customised engineering applications.',
              },
            ].map((item) => (
              <article key={item.title} className="border-default-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-default-950">{t(locale, item.title)}</h3>
                <p className="mt-3 text-[15px] leading-6 text-default-600">{t(locale, item.body)}</p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/contact" className="text-primary inline-flex items-center gap-2 text-sm font-semibold">
              {t(locale, 'Discuss a surface-enhancement specification')} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default SurfaceEnhancementsPage
