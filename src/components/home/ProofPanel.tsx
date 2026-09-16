import ScrambleHeading from '@/components/ScrambleHeading'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export type Pillar = {
  meta: string
  title: string
  href: string
  image: { src: string; alt: string; position?: string }
}

const EDGE_PATTERN = {
  maskImage: "url('/eid/brand/eid-logo-outline.svg')",
  WebkitMaskImage: "url('/eid/brand/eid-logo-outline.svg')",
  maskRepeat: 'repeat',
  WebkitMaskRepeat: 'repeat',
  maskSize: '78px 78px',
  WebkitMaskSize: '78px 78px',
} as const

/**
 * Uri's September review: this is not a carousel. All three proof points need
 * to be visible at once, alongside the statement, with none of the empty stage
 * that the 3D arc needed underneath the heading.
 */
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
}) => {
  const cardHeight = aspect === 'landscape' ? 'min-h-[172px] lg:min-h-[188px]' : 'min-h-[210px] lg:min-h-[230px]'

  return (
    <section data-note="core-values" className="bg-primary-3 relative isolate overflow-hidden py-6 text-white lg:py-7">
      <div aria-hidden className="bg-primary-1/7 pointer-events-none absolute left-[68%] top-1/2 -z-10 h-[260px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]" />

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
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(250px,0.8fr)_minmax(0,1.7fr)] lg:gap-8 xl:gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
              {eyebrow && <span className="font-mono text-[9px] tracking-[0.22em] text-white/65 uppercase">{eyebrow}</span>}
              <span aria-hidden className="h-px w-7 bg-white/18" />
              <span className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase">03 proof points</span>
            </div>

            <div className="mt-3 max-w-[17ch]">
              <ScrambleHeading
                text={title}
                className="text-[30px] leading-[0.96] font-semibold tracking-[-0.04em] text-white text-balance md:text-[36px] lg:text-[42px]"
              />
              {desc && <p className="sr-only">{desc}</p>}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {pillars.map((item, index) => (
              <Link
                key={`${item.meta}-${item.href}`}
                href={item.href}
                className={`group rounded-card border-primary-1/25 bg-primary-3 relative isolate overflow-hidden border focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${cardHeight}`}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 33vw, 100vw"
                  className={`object-cover transition-transform duration-700 group-hover:scale-[1.025] ${item.image.position ?? 'object-center'}`}
                />
                <span aria-hidden className="from-primary-3/95 via-primary-3/40 absolute inset-0 bg-linear-to-t to-primary-3/5" />

                <div className="relative z-10 flex h-full flex-col justify-between p-4 lg:p-4.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-white/80 uppercase">
                      {String(index + 1).padStart(2, '0')} · {item.meta}
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.18em] text-white/45 uppercase">Proof</span>
                  </div>

                  <div className="flex items-end justify-between gap-3">
                    <h3 className="max-w-[14ch] text-[17px] leading-[1.03] font-semibold tracking-[-0.025em] text-white lg:text-[19px]">{item.title}</h3>
                    <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-control border border-white/20 bg-primary-3/45 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-3.5">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {ghost && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[-0.12em] -z-10 overflow-hidden select-none">
          <span className="block whitespace-nowrap text-center text-[56px] leading-none font-bold tracking-[-0.06em] text-white/[0.018] uppercase lg:text-[86px]">{ghost}</span>
        </div>
      )}
    </section>
  )
}

export default ProofPanel
