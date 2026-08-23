'use client'

import { ArrowLink } from '@/components/ui'

/**
 * The thin full-width band that introduces a block, built to the Van Moppes
 * reference Uri marked up: a large label on the left, a short paragraph on the
 * right, one rule of colour running the width of the page, and then the grid
 * immediately underneath.
 *
 * It replaces the tall `SectionHeading` stack the home page used before every
 * grid — eyebrow chip, 42px heading, lede, all left-aligned in a 3xl column,
 * roughly 240px of vertical space each time and three of them on one page. The
 * band says the same thing in about a third of the height, and because the two
 * halves sit on one baseline the page gets a horizontal beat between the
 * full-bleed sections rather than another left-aligned column.
 *
 * Lives outside components/home because About uses it too, for the merged
 * company banner that replaced the pinned scroll run there.
 *
 * `tone` is what keeps them from flattening into each other. Products is the
 * section that matters most, so it takes the solid brand blue; applications
 * takes the pale tint, which is what Uri asked for when he said the
 * applications band should be smaller "because it's not so important".
 */
const SectionBanner = ({
  id,
  label,
  body,
  ctaHref,
  ctaLabel,
  tone = 'dark',
}: {
  id?: string
  label: string
  body: string
  ctaHref?: string
  ctaLabel?: string
  tone?: 'dark' | 'tint'
}) => {
  const dark = tone === 'dark'

  return (
    <section
      id={id}
      data-note={id ? `banner:${id}` : 'banner'}
      className={dark ? 'bg-primary-3 text-white' : 'border-default-200 bg-default-50 border-y'}
    >
      <div className="container">
        {/* items-baseline, not items-center: the label is 40-56px and the body
            is 16px, and centring the two boxes leaves the label's baseline
            floating above the paragraph's first line. On a baseline they read
            as one sentence broken across the page. */}
        <div className={`grid gap-6 lg:grid-cols-12 lg:items-baseline lg:gap-14 ${dark ? 'py-11 lg:py-14' : 'py-9 lg:py-11'}`}>
          <h2 className={`lg:col-span-4 font-bold tracking-tight ${dark ? 'text-[32px] text-white lg:text-[44px]' : 'text-default-900 text-[26px] lg:text-[34px]'}`}>{label}</h2>

          <div className="lg:col-span-8">
            <p className={`max-w-3xl ${dark ? 'text-base leading-relaxed text-white/80 lg:text-lg' : 'text-default-600 text-base'}`}>{body}</p>

            {/* ArrowLink is text-primary, which is the brand navy — on the navy
                band that is 1.6:1 and effectively invisible. Overridden to white
                here rather than given a variant, because this is the only dark
                surface it ever lands on. */}
            {ctaHref && ctaLabel && (
              <div className={`mt-5 ${dark ? '[&_a]:text-white [&_a:hover]:text-white/75' : ''}`}>
                <ArrowLink href={ctaHref} label={ctaLabel} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionBanner
