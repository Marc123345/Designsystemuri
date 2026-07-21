import { QuoteSection, CardGrid, DarkFeatureList, PageHero, StatsBar } from '@/components/sections'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { getApplications } from '@/lib/i18n-content'
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
        eyebrow="We supply the material · you build the tools"
        title="Diamond and CBN for the work your tools do"
        desc="EID supplies industrial diamond and CBN to tool makers across dental, semiconductor and advanced electronics, automotive and aerospace, tool and die, grinding and cutting, and polishing and lapping."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Applications' }]}
        secondaryCta={{ label: 'View Products', href: '/#products' }}
      />

      <StatsBar
        items={[
          { value: '6', label: 'Application hubs' },
          { value: '12', label: 'Product lines' },
          { value: '8', label: 'Product groups' },
          { value: '100%', label: 'Batches QC-tested' },
        ]}
      />

      <CardGrid
        eyebrow="By the job the tool has to do"
        title="Six application hubs, one material supplier behind them."
        desc="Our customers convert raw diamond and CBN into finished tools. Start from your application to see the exact grades EID supplies and why tool makers in your field choose us."
        items={items}
        ctaHref="/contact"
        ctaLabel="Request a Quote"
        columns={3}
      />
      <div className="pt-14">
        <DarkFeatureList
          bgLabel="Background image — tool maker at work"
          eyebrow="One standard behind every hub"
          title="Consistency your production line can rely on."
          desc="Whatever the application, tool performance depends on predictable crystal strength and size distribution, and that is exactly what our QC process delivers."
          ctaLabel="See how our QC works"
          ctaHref="/quality"
          features={[
            {
              title: 'We supply the tool maker',
              desc: 'We supply manufacturers who build the tools that serve each application.',
            },
            {
              title: 'Matched to your process',
              desc: 'Grades and support matched to the material you work and the finish you need.',
            },
            {
              title: 'One relationship',
              desc: 'Every grade from one supplier, one quality standard, one delivery to reconcile.',
            },
            {
              title: 'Tested every batch',
              desc: 'In-house QC and full traceability on every production run.',
            },
          ]}
        />
      </div>

      <div className="pt-20">
        <QuoteSection
          eyebrow="Not sure which grade fits?"
          title="Tell us your application and we will recommend the right material."
          desc="A real person replies within one business day, with the grade, size, and lead time you need."
        />
      </div>
    </>
  )
}

export default ApplicationsOverview
