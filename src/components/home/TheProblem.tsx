import Wireframe from '@/components/Wireframe'
import { ArrowButton } from '@/components/ui'

/**
 * The problem section, written for a tool maker qualifying a supplier.
 *
 * Three things make it land with that reader rather than a general one:
 *
 * 1. The cost is stated in their process parameters — what drifts, and what
 *    moves on their line as a result — not as "rejects and re-set machines".
 *    A technical buyer discounts prose about quality; they read the table.
 * 2. The image slot is a certificate of analysis rather than a factory shot.
 *    It is the document they would ask for anyway, so it is evidence where a
 *    production-floor photograph is only atmosphere.
 * 3. The resolution leads with the graduated production model. Overclaiming is
 *    exactly what this reader is scanning for, so saying plainly what EID does
 *    and does not make buys more trust than another "we control quality" —
 *    which the trust bar, the pillars and the QC band already say three times.
 */
const TheProblem = ({
  eyebrow,
  title,
  lede,
  drivers,
  driversNote,
  imageLabel,
  resolutionTitle,
  production,
  resolutionClosing,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string
  title: string
  lede: string
  drivers: { variable: string; effect: string }[]
  driversNote: string
  imageLabel: string
  resolutionTitle: string
  production: { title: string; body: string }[]
  resolutionClosing: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}) => (
  <section className="relative size-full overflow-hidden bg-default-900">
    <div className="absolute inset-0 z-1 flex items-stretch justify-between md:justify-center gap-0 md:gap-45 lg:gap-75 xl:gap-80.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="h-full w-0.5 border border-dashed border-default-100 opacity-7"></div>
      ))}
    </div>

    <div className="container relative z-10 lg:py-25 py-20">
      <div className="mb-16 flex lg:flex-row flex-col items-start justify-between gap-12.5 xl:gap-20">
        <div className="inline-flex items-center gap-7.5 rounded-2xl border border-default-800 bg-default-950 px-3.5 py-1.25">
          <span className="size-2 bg-primary"></span>
          <span className="text-sm text-default-100">{eyebrow}</span>
        </div>

        <div className="lg:ms-auto lg:max-w-2xl">
          <h2 className="mb-5 lg:text-[52px] md:text-[40px] text-[30px] font-bold leading-tight text-white">
            {title}
          </h2>
          <p className="text-default-400">{lede}</p>
        </div>
      </div>

      {/* The cost, in the buyer's own process parameters. */}
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-start">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 pe-6 text-start text-xs uppercase tracking-[0.15em] text-default-400">
                    What drifts
                  </th>
                  <th className="py-3 text-start text-xs uppercase tracking-[0.15em] text-default-400">
                    What moves on your line
                  </th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((d) => (
                  <tr key={d.variable} className="border-b border-white/10 align-top">
                    <td className="py-4 pe-6 text-base font-semibold text-white">{d.variable}</td>
                    <td className="py-4 text-base text-default-400">{d.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 font-mono text-sm text-white/40">{driversNote}</p>
        </div>

        <div className="lg:col-span-5">
          <Wireframe label={imageLabel} ratio="portrait" tone="dark" />
        </div>
      </div>
    </div>

    {/* The resolution: what EID will and will not claim to make. */}
    <div className="container relative z-10 md:pb-25 pb-20">
      <div className="border-t border-white/10 pt-14">
        <h3 className="mb-10 lg:text-[32px] md:text-[28px] text-2xl font-semibold text-white lg:max-w-3xl">
          {resolutionTitle}
        </h3>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          {production.map((block) => (
            <div key={block.title} className="border-t-2 border-primary pt-5">
              <h4 className="mb-3 text-lg text-white">{block.title}</h4>
              <p className="text-base text-default-400">{block.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex lg:flex-row flex-col lg:items-center items-start gap-7.5">
          <p className="text-lg text-white lg:max-w-2xl">{resolutionClosing}</p>

          {/* The secondary is `light`, not `dark`: a dark shell on this dark band
              renders as an invisible button with a floating arrow badge. */}
          <div className="flex grow flex-wrap gap-4 lg:justify-end">
            <ArrowButton href={primaryCta.href} label={primaryCta.label} />
            <ArrowButton href={secondaryCta.href} label={secondaryCta.label} variant="light" />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default TheProblem
