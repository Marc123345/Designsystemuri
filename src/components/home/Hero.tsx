import Wireframe from '@/components/Wireframe'
import { ArrowButton } from '@/components/ui'
import { site } from '@/lib/site'

/**
 * One hero, one message. The Vol 03 deck replaced the rotating three-slide
 * version with a single block: the positioning has to land in one read, and a
 * technical buyer scanning for credentials should not have to wait for a slide.
 */
const Hero = ({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string
  title: string
  desc: string
}) => {
  return (
    <section className="relative size-full overflow-hidden lg:pt-50 pt-35">
      <div className="container-full relative z-10">
        <div className="grid xl:grid-cols-4 items-end xl:gap-20 gap-12.5">
          <div className="xl:col-span-3">
            <div className="inline-flex items-center gap-1.5 rounded-2xl border border-default-300 bg-white px-3.5 py-1.25">
              <span className="size-2 bg-primary"></span>
              <span className="text-sm text-default-900">{eyebrow}</span>
            </div>

            <h1 className="mt-4 font-bold lg:text-6xl md:text-[48px] text-[34px]">{title}</h1>
          </div>

          <div>
            <p className="mb-7.5 text-base">{desc}</p>
            <div className="flex flex-wrap gap-4">
              <ArrowButton href="/contact" label="Request a Quote" />
              <ArrowButton href="#products" label="Browse the Full Range" variant="dark" external />
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
        <div className="mb-10 mt-16 flex items-center justify-between border-t border-default-200 pt-6">
          <div className="text-sm text-default-900">Based in: {site.location}</div>
          <a
            href="#products"
            className="text-center text-sm uppercase transition-colors hover:text-primary"
          >
            Scroll Down
          </a>
        </div>
      </div>

      <div className="absolute inset-0 flex items-stretch justify-between md:justify-center gap-0 md:gap-45 lg:gap-75 xl:gap-80.5">
        <div className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
        <div className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
        <div className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
        <div className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
        <div className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
      </div>

      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-repeat bg-position-[50%] object-cover opacity-4"></div>
    </section>
  )
}

export default Hero
