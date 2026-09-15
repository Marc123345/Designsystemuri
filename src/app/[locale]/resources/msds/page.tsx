import DocList from '@/components/resources/DocList'
import { RichText } from '@/components/RichText'
import { PageHero } from '@/components/sections'
import type { Locale } from '@/i18n/routing'
import { safetySheets } from '@/lib/documents'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Diamond & CBN Safety Data Sheets (MSDS) | EID' },
    description: "Download safety data sheets for EID's industrial diamond and CBN products. Handling, storage, disposal, and regulatory information. Free, no login.",
    alternates: localeAlternates(locale, '/resources/msds'),
  }
}

// Keep this registry-driven. If a current regional safety document does not
// exist in lib/documents.ts, it does not appear here.
const MsdsPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'Handling, storage & regulatory information')}
        title={t(locale, 'Material Safety Data Sheets (MSDS)')}
        desc={t(locale, "Download safety data sheets for EID's industrial diamond and CBN products. Handling, storage, disposal, and regulatory information. Free, no login.")}
        bgImage="/eid/qc-batch-to-batch.jpg"
        variant="band"
      />

      <section data-note="downloads" className="py-16 lg:py-24">
        <div className="container">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            <div className="lg:col-span-5">
              <div className="eid-sticky-copy rounded-card bg-primary-3 relative overflow-hidden p-7 text-white shadow-[0_28px_90px_-48px_rgba(2,6,23,0.55)] lg:p-9 xl:p-10">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.22]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)',
                    backgroundSize: '54px 54px',
                    maskImage: 'radial-gradient(ellipse 80% 62% at 50% 0%, black 55%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 62% at 50% 0%, black 55%, transparent 100%)',
                  }}
                />

                <div className="relative z-10">
                  <div className="rounded-control inline-flex w-fit items-center gap-1.5 border border-white/25 px-3.5 py-1.25">
                    <span className="bg-primary-1 size-2" />
                    <span className="text-sm text-white">{t(locale, 'No form, no login')}</span>
                  </div>

                  <h2 className="mt-5 text-2xl leading-tight font-bold text-white md:text-[30px] lg:text-[34px]">
                    {t(locale, 'Safety data sheets, free to download.')}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-white/82">
                    <span className="[&_a]:text-white [&_a]:decoration-white/60">
                      <RichText>
                        {t(locale, "Safety data sheets for EID's diamond and CBN products, covering handling, storage, disposal, and regulatory information. No form, no login. If you need a document that isn't listed, or a specific regional format, [ask us](/contact).")}
                      </RichText>
                    </span>
                  </p>

                  <div className="mt-9 border-t border-white/15 pt-6">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/52 uppercase">
                      {t(locale, 'Handling, storage & regulatory information')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pb-[8vh]">
              <DocList groups={[{ sheets: safetySheets }]} icon="tabler:shield" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MsdsPage
