import ScrambleHeading from '@/components/ScrambleHeading'
import ProofArc, { type ProofArcItem } from '@/components/home/ProofArc'

/**
 * Compact proof section: the arc remains the interaction, but the surrounding
 * chrome is deliberately compressed so three proof points do not read like a
 * full-page feature.
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
  <section data-note="core-values" className="bg-primary-3 relative isolate overflow-hidden py-12 text-white lg:py-16">
    <div aria-hidden className="bg-primary-1/8 pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]" />

    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-[8%] -left-7 -z-10 w-36 bg-white opacity-[0.035] lg:w-44"
      style={{ ...EDGE_PATTERN, maskPosition: '0 0', WebkitMaskPosition: '0 0' }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-[18%] -right-8 -z-10 hidden w-28 bg-white opacity-[0.025] md:block lg:w-36"
      style={{ ...EDGE_PATTERN, maskPosition: '39px 39px', WebkitMaskPosition: '39px 39px' }}
    />

    <div className="container text-white">
      <div className="flex items-center gap-3 text-white">
        {eyebrow && <span className="font-mono text-[10px] tracking-[0.22em] text-white/68 uppercase">{eyebrow}</span>}
        <span aria-hidden className="h-px w-9 bg-white/18" />
        <span className="font-mono text-[10px] tracking-[0.22em] text-white/42 uppercase">03 proof points</span>
      </div>

      <div className="mt-4 grid items-end gap-4 md:grid-cols-[1.25fr_.75fr] lg:gap-8">
        <ScrambleHeading
          text={title}
          className="max-w-[17ch] text-[36px] leading-[0.98] font-semibold tracking-[-0.04em] text-white text-balance md:text-[46px] lg:text-[54px]"
        />
        <div className="max-w-[38ch] md:justify-self-end md:text-right">
          {desc && <p className="mb-1.5 text-sm leading-relaxed text-white/72">{desc}</p>}
          <p className="text-[13px] leading-relaxed text-white/52">Use arrows, dots, or drag.</p>
        </div>
      </div>

      <div className="mt-5 text-white lg:mt-6">
        <ProofArc items={pillars} aspect={aspect} />
      </div>
    </div>

    {ghost && (
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[-0.12em] -z-10 overflow-hidden select-none">
        <span className="block whitespace-nowrap text-center text-[72px] leading-none font-bold tracking-[-0.06em] text-white/[0.02] uppercase lg:text-[118px]">{ghost}</span>
      </div>
    )}
  </section>
)

export default ProofPanel
