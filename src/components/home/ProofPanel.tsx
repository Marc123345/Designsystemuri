import ScrambleHeading from '@/components/ScrambleHeading'
import ProofArc, { type ProofArcItem } from '@/components/home/ProofArc'

/**
 * Deliberately compact proof section. The evidence arc is the feature; the
 * surrounding copy must never make three proof points feel like a second hero.
 */
export type Pillar = ProofArcItem

const EDGE_PATTERN = {
  maskImage: "url('/eid/brand/eid-logo-outline.svg')",
  WebkitMaskImage: "url('/eid/brand/eid-logo-outline.svg')",
  maskRepeat: 'repeat',
  WebkitMaskRepeat: 'repeat',
  maskSize: '78px 78px',
  WebkitMaskSize: '78px 78px',
} as const

const ProofPanel = ({
  eyebrow,
  title,
  desc,
  pillars,
  ghost,
  aspect = 'portrait',
}: {
  eyebrow?: string
  title: string
  desc?: string
  pillars: Pillar[]
  ghost?: string
  aspect?: 'portrait' | 'landscape'
}) => (
  <section data-note="core-values" className="bg-primary-3 relative isolate overflow-hidden py-7 text-white lg:py-8">
    <div aria-hidden className="bg-primary-1/7 pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[300px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[115px]" />

    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-[8%] -left-7 -z-10 w-28 bg-white opacity-[0.03] lg:w-36"
      style={{ ...EDGE_PATTERN, maskPosition: '0 0', WebkitMaskPosition: '0 0' }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-[18%] -right-8 -z-10 hidden w-24 bg-white opacity-[0.02] md:block lg:w-28"
      style={{ ...EDGE_PATTERN, maskPosition: '39px 39px', WebkitMaskPosition: '39px 39px' }}
    />

    <div className="container text-white">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
        {eyebrow && <span className="font-mono text-[9px] tracking-[0.22em] text-white/65 uppercase">{eyebrow}</span>}
        <span aria-hidden className="h-px w-7 bg-white/18" />
        <span className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase">03 proof points</span>
      </div>

      <div className="mt-2.5 max-w-[21ch]">
        <ScrambleHeading
          text={title}
          className="text-[32px] leading-[0.96] font-semibold tracking-[-0.04em] text-white text-balance md:text-[40px] lg:text-[48px]"
        />
        {desc && <p className="sr-only">{desc}</p>}
      </div>

      <div className="mt-3 text-white lg:mt-4">
        <ProofArc items={pillars} aspect={aspect} />
      </div>
    </div>

    {ghost && (
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[-0.12em] -z-10 overflow-hidden select-none">
        <span className="block whitespace-nowrap text-center text-[56px] leading-none font-bold tracking-[-0.06em] text-white/[0.018] uppercase lg:text-[90px]">{ghost}</span>
      </div>
    )}
  </section>
)

export default ProofPanel
