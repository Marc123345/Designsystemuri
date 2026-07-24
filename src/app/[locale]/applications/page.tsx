import { QuoteSection, CardGrid, DarkFeatureList, PageHero, StatsBar } from '@/components/sections'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { getApplications, t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Applications | Diamond & CBN by the Work Your Tools Do | EID Ltd' },
    description:
      'EID supplies industrial diamond and CBN to tool makers across dental, semiconductor and advanced electronics, automotive and aerospace, tool and die, grinding and cutting, and polishing and lapping.',
    alternates: localeAlternates(locale, '/applications'),
  }
}

// The six application hubs.
const hubIcon: Record<string, string> = {
  dental: 'tabler:dental',
  'semiconductor-electronics': 'tabler:cpu',
  'automotive-aerospace': 'tabler:engine',
  'tool-and-die': 'tabler:tools',
  'grinding-cutting-sawing-drilling': 'tabler:blade',
  'polishing-lapping': 'tabler:lens',
}

const ApplicationsOverview = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  const items = getApplications(locale).map((a) => ({
    icon: hubIcon[a.slug] || 'tabler:diamond',
    title: a.name,
    desc: a.cardDesc,
    href: `/applications/${a.slug}`,
  }))

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'We supply the material · you build the tools')}
        title={t(locale, 'Diamond and CBN for the work your tools do')}
        desc={t(locale, 'EID supplies industrial diamond and CBN to tool makers across dental, semiconductor and advanced electronics, automotive and aerospace, tool and die, grinding and cutting, and polishing and lapping.')}
        crumbs={[{ label: t(locale, 'Home'), href: '/' }, { label: t(locale, 'Applications') }]}
        secondaryCta={{ label: t(locale, 'View Products'), href: '/#products' }}
      />

      <StatsBar
        items={[
          { value: '6', label: t(locale, 'Application hubs') },
          { value: '12', label: t(locale, 'Product lines') },
          { value: '8', label: t(locale, 'Product groups') },
          { value: '100%', label: t(locale, 'Batches QC-tested') },
        ]}
      />

      <CardGrid
        eyebrow={t(locale, 'By the job the tool has to do')}
        title={t(locale, 'Six application hubs, one material supplier behind them.')}
        desc={t(locale, 'Our customers convert raw diamond and CBN into finished tools. Start from your application to see the exact grades EID supplies and why tool makers in your field choose us.')}
        items={items}
        ctaHref="/contact"
        ctaLabel={t(locale, 'Request a Quote')}
        columns={3}
      />
      <div className="pt-14">
        <DarkFeatureList
          bgLabel="Background image — tool maker at work"
          eyebrow={t(locale, 'One standard behind every hub')}
          title={t(locale, 'Consistency your production line can rely on.')}
          desc={t(locale, 'Whatever the application, tool performance depends on predictable crystal strength and size distribution, and that is exactly what our QC process delivers.')}
          ctaLabel={t(locale, 'See how our QC works')}
          ctaHref="/quality"
          features={[
            {
              title: t(locale, 'We supply the tool maker'),
              desc: t(locale, 'We supply manufacturers who build the tools that serve each application.'),
            },
            {
              title: t(locale, 'Matched to your process'),
              desc: t(locale, 'Grades and support matched to the material you work and the finish you need.'),
            },
            {
              title: t(locale, 'One relationship'),
              desc: t(locale, 'Every grade from one supplier, one quality standard, one delivery to reconcile.'),
            },
            {
              title: t(locale, 'Tested every batch'),
              desc: t(locale, 'In-house QC and full traceability on every production run.'),
            },
          ]}
        />
      </div>

      <div className="pt-20">
        <QuoteSection
          eyebrow={t(locale, 'Not sure which grade fits?')}
          title={t(locale, 'Tell us your application and we will recommend the right material.')}
          desc={t(locale, 'A real person replies within one business day, with the grade, size, and lead time you need.')}
        />
      </div>
    </>
  )
}

export default ApplicationsOverview
