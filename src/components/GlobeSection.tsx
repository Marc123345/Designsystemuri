'use client'

import Backdrop from '@/components/Backdrop'
import Globe from '@/components/Globe'
import Image from 'next/image'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

// Globe renders only two <div>s on the server; all WebGL/three.js work runs
// lazily inside its useEffect (client-only), so a plain static import hydrates
// cleanly — no next/dynamic bailout needed.

/**
 * Where EID is, and where EID supplies — two different claims, told apart.
 *
 * This grid used to name twelve cities as EID's markets. Uri's note on it was
 * blunt: "the countries are wrong", and "we supply 5 continents". A named city
 * reads as a claim about where EID has customers, and a wrong one is a claim a
 * buyer can catch.
 *
 * His F1/F2 note then corrected the other half of it, which is the more
 * important correction: London is the *sales headquarters*, not a
 * manufacturing site. "Manufacturing in UK, London" is wrong wherever it
 * appears. The approved formulation is:
 *
 *   London — Headquarters
 *   Middle East — Manufacturing facility   (the country is deliberately not named)
 *
 * So the section now separates the two claims rather than flattening them into
 * one row of six equivalent tiles: two facility tiles, then the five supplied
 * continents as plain chips. The chips are text because a continent is not a
 * place you can photograph, and because the whole section had to get shorter.
 *
 * ⚠ Which five continents needs Uri's confirmation before launch. The list
 * below is the common reading of "five continents" for a supplier with no
 * stated Oceania presence; if Australia is in and one of these is out, it is a
 * one-line change here.
 *
 * x / y place the tile's background crop:
 *   x = (lon + 180) / 360      y = (90 - lat) / 180
 */
const FACILITIES: { city: string; region: string; x: number; y: number }[] = [
  { city: 'London', region: 'Headquarters', x: 50.0, y: 21.4 },
  { city: 'Middle East', region: 'Manufacturing facility', x: 59.7, y: 32.5 },
]

/** The five continents EID supplies. Text only — see the note above. */
const CONTINENTS = ['Europe', 'Asia', 'Africa', 'North America', 'South America']

/** Background zoom on the world texture — roughly 36° of longitude per tile. */
const TILE_ZOOM = '1000%'

const GlobeSection = ({ eyebrow, title, desc, ctaLabel, ctaHref = '/contact' }: { eyebrow?: string; title?: string; desc?: string; ctaLabel?: string; ctaHref?: string }) => {
  const locale = useLocale() as Locale

  return (
    /* `rounded-card` on all four corners, and this is the one full-bleed band
       on the site that needs them.
    
       Everywhere else a dark band is followed by white, so the footer's own
       `rounded-t-card` has a pale ground to curve against. This section is the
       last thing on /about before the footer — two dark blocks meeting — and a
       rounded corner over another dark block does not read as a corner. It
       reads as two small white notches punched out of the join, because that is
       literally what it is: the page background showing through the radius.
    
       Rounding this one too, and putting white between the two, turns the same
       pixels into what they are meant to be — two dark slabs on a light page,
       each with the site's corner. `overflow-hidden` was already here for the
       globe and the night-lights crop, so the radius clips them for free. */
    <section data-note="reach" className="rounded-card relative isolate size-full overflow-hidden py-20 text-white lg:py-37.5">
      <Backdrop />

      {/* The world at night, behind the whole band.
          
          Not a new asset: this is the same night-lights texture the globe is
          wrapped in and the six market tiles are each cropped from, now shown at
          map scale behind all of it. Nothing extra is downloaded — the tiles
          already pull this file — and the three treatments stop reading as three
          separate devices that happen to share a section.

          `mix-blend-screen` rather than a plain opacity fade, which is why the
          section keeps `isolate`: screen only ever lightens, so the ocean
          contributes almost nothing and it is the city lights and coastlines
          that come up out of Backdrop's gradient. A flat opacity would have
          greyed the whole band toward the map's mid-tone and flattened the
          gradient underneath it. `isolate` confines the blend to this section;
          without it the image would blend against whatever is painted behind
          the section too.

          Two scrims over the top, each with one job. The horizontal one keeps
          the copy column dark enough for white text over the bright European
          and Asian light clusters. The vertical one feathers the band into the
          sections above and below, so a full-bleed map does not read as a
          rectangle pasted onto the page. */}
      {/* Desktop only. `mix-blend-screen` on a full-bleed layer forces its own
          compositing layer, which is a real cost on a phone for a texture that
          is mostly invisible at that width anyway — Backdrop underneath already
          carries the dark ground. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        <Image src="/images/earth-night.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_38%] opacity-60 mix-blend-screen" />
        <div className="from-default-950 via-default-950/72 absolute inset-0 bg-linear-to-r via-34% to-transparent to-72%" />
        {/* Four stops rather than Tailwind's from/via/to, because the middle
            needs a transparent plateau and not a transparent point: the copy and
            the globe both sit in that band, and a single mid-point stop starts
            darkening the map again immediately either side of it. Inline for the
            same reason Backdrop's vignette is inline — Tailwind has no syntax
            for it, and faking it with two stacked half-height scrims is more
            elements to keep in step, not fewer. */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--color-default-950) 0%, transparent 42%, transparent 58%, var(--color-default-950) 100%)' }}
        />
      </div>

      <div className="relative z-10 container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <div className="rounded-control inline-flex items-center gap-1.5 border border-white/15 px-3.5 py-1.25">
              <span className="bg-primary-1 size-2"></span>
              <span className="text-sm text-white">{eyebrow ?? t(locale, 'Reach · supplied worldwide')}</span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white md:text-[28px] lg:text-[32px]">{title ?? t(locale, 'London headquarters. Supplied across five continents.')}</h2>

            <p className="text-default-200 mt-5 max-w-xl">
              {desc ?? t(locale, 'Sales and technical support run from London. Manufacturing, grading and QC run through our own facilities to one specification — so the grade you qualify is the grade you reorder, wherever you are.')}
            </p>

            {/* Two facility tiles, then the continents as chips.

                They are not the same kind of claim and they no longer share a
                treatment. A facility is a place EID occupies, so it keeps the
                photographic tile; a continent is a place EID ships to, so it is
                a word. Flattening both into one six-tile grid was what let
                "Manufacturing · UK" sit on London unchallenged. */}
            <ul className="mt-8 grid max-w-xl grid-cols-2 gap-3 border-t border-white/10 pt-8">
              {FACILITIES.map((m) => (
                <li
                  key={m.city}
                  /* `max-md:!bg-none` drops the crop below md, and it is not a
                     cosmetic saving. Each tile paints the 2048×1024 texture at
                     `background-size: 1000%` — a 20480px-wide raster — to show a
                     patch of night lights behind a 72% scrim, which is barely
                     visible even on desktop. Below md the scrim colour stands
                     alone and the tiles look near enough identical. The `!` is
                     needed because the crop is an inline style, which a class
                     cannot otherwise beat. */
                  className="rounded-card group relative isolate overflow-hidden max-md:!bg-none"
                  style={{
                    backgroundImage: 'url(/images/earth-night.jpg)',
                    backgroundSize: TILE_ZOOM,
                    backgroundPosition: `${m.x}% ${m.y}%`,
                  }}
                >
                  {/* Scrim: heavy enough that 10px mono clears contrast over the
                      brightest lights, lifting on hover to let the city through. */}
                  <span aria-hidden className="bg-primary-3/72 group-hover:bg-primary-3/45 absolute inset-0 transition-colors" />
                  <div className="relative z-10 px-3 py-2.5">
                    <div className="text-base leading-tight text-white">{t(locale, m.city)}</div>
                    <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-white/60 uppercase">{t(locale, m.region)}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex max-w-xl flex-wrap items-center gap-x-2 gap-y-2">
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">{t(locale, 'Supplied')}</span>
              {CONTINENTS.map((c) => (
                <span key={c} className="rounded-control border border-white/15 px-2.5 py-1 text-[13px] text-white/85">
                  {t(locale, c)}
                </span>
              ))}
            </div>

            <div className="mt-9">
              <ArrowButton href={ctaHref} label={ctaLabel ?? t(locale, 'Talk to us about supply')} variant="primary" />
            </div>
          </div>

          {/* Globe */}
          <div className="relative">
            <Globe size={600} />
            <p className="mt-6 text-center font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">{t(locale, 'Spins on its own · drag to explore')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlobeSection
