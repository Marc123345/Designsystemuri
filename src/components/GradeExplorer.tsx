'use client'

import Wireframe from '@/components/Wireframe'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import type { GradeSeries } from '@/lib/product-catalog'
import { getProductImage } from '@/lib/product-images'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Grade explorer for one series, in two views over the same data.
 *
 * Explore is the default: EID's own microscope photography at full size, with
 * the grades laid out on the trade-off they actually encode (blocky and tough
 * at one end, sharp and free-cutting at the other). The legacy eid-ltd.com page
 * shows the same photos and descriptions but never says that the code is a
 * choice along an axis, so a first-time visitor cannot tell why they would pick
 * one over another.
 *
 * Compare is the escape hatch for someone who already knows the range: every
 * grade side by side in a plain table, no clicking, copyable and printable.
 * The chosen view persists, so a returning engineer lands back in Compare.
 */

type ViewMode = 'explore' | 'compare'

const STORAGE_KEY = 'eid:grade-view'
/** Prefixed so a grade deep link can never collide with a section anchor. */
const HASH_PREFIX = '#g='

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const GradeExplorer = ({ series, fallbackImage }: { series: GradeSeries; fallbackImage?: string }) => {
  const locale = useLocale() as Locale
  const [active, setActive] = useState(0)
  const [mode, setMode] = useState<ViewMode>('explore')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const grades = series.grades
  const grade = grades[active] ?? grades[0]
  const heading = series.range ?? series.title

  // Restore the reader's view preference, and honour a deep link into one
  // grade (#g=ns-1-s) so a sales engineer can send a customer straight to it.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'explore' || saved === 'compare') setMode(saved)
    } catch {
      // Private browsing or storage disabled: the default view is fine.
    }

    const hash = window.location.hash
    if (!hash.startsWith(HASH_PREFIX)) return
    const wanted = hash.slice(HASH_PREFIX.length)
    const i = grades.findIndex((g) => slugify(g.code) === wanted)
    if (i >= 0) setActive(i)
  }, [grades])

  const select = useCallback(
    (i: number) => {
      setActive(i)
      const code = grades[i]?.code
      if (!code) return
      // replaceState, not a hash assignment: updating location.hash would jump
      // the viewport to the top of the block on every grade change.
      window.history.replaceState(null, '', HASH_PREFIX + slugify(code))
    },
    [grades]
  )

  const chooseMode = (next: ViewMode) => {
    setMode(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not worth surfacing — the view still switches for this visit.
    }
  }

  // Arrow keys walk the rail, as a tablist should; only the selected tab is in
  // the tab order, so the keyboard does not have to step through every grade.
  const onRailKeyDown = (e: React.KeyboardEvent) => {
    const last = grades.length - 1
    let next = active
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    select(next)
    tabRefs.current[next]?.focus()
  }

  const railId = slugify(series.title) + '-rail'

  return (
    <section aria-labelledby={railId + '-heading'}>
      <div className="bg-default-950 overflow-hidden text-white shadow-xl ring-1 ring-white/10">
        {/* Header: what this series is, and the view switch. */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
          <div>
            <h4 id={railId + '-heading'} className="text-xl font-semibold text-white">
              {heading}
            </h4>
            {series.range && <div className="mt-1 text-sm tracking-wider text-white/50 uppercase">{series.title}</div>}
          </div>

          <div role="group" aria-label={t(locale, 'View')} className="flex shrink-0 border border-white/15 p-1">
            {(['explore', 'compare'] as ViewMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => chooseMode(m)}
                aria-pressed={mode === m}
                className={['flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium capitalize transition-colors', mode === m ? 'text-default-950 bg-white' : 'text-white/70 hover:text-white'].join(' ')}
              >
                <Icon icon={m === 'explore' ? 'tabler:photo' : 'tabler:table'} className="size-4" aria-hidden />
                {t(locale, m === 'explore' ? 'Explore' : 'Compare')}
              </button>
            ))}
          </div>
        </div>

        {mode === 'explore' ? (
          <>
            <div className="grid lg:grid-cols-12">
              <div className="relative aspect-square lg:col-span-6">
                <GradePhoto imageKey={grade?.image ?? series.image ?? fallbackImage} alt={`${grade?.code ?? series.title} — EID`} />
                <div className="from-default-950/80 pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-6">
                  <span className="font-mono text-sm text-white/80">{grade?.code}</span>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5 p-8 lg:col-span-6 lg:p-12">
                {grade?.tag && <span className="border-primary/40 bg-primary/15 inline-flex w-fit items-center border px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">{grade.tag}</span>}
                <h5 className="font-mono text-3xl font-semibold text-white lg:text-4xl">{grade?.code}</h5>
                <p className="max-w-prose text-base leading-relaxed text-white/70">{grade?.desc ?? series.note ?? t(locale, 'Available across the full range — enquire for the complete specification.')}</p>

                {series.sizes?.length ? (
                  <div className="mt-1">
                    <div className="text-xs tracking-wider text-white/40 uppercase">{series.sizesLabel ?? t(locale, 'Available sizes')}</div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {series.sizes.map((s) => (
                        <span key={s} className="border border-white/15 px-2 py-0.5 font-mono text-xs text-white/70">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* The rail: the selector, and the one place the trade-off is stated. */}
            <div className="border-t border-white/10 px-6 py-8 sm:px-8">
              {series.axis && (
                <div className="mb-5 flex items-center justify-between gap-4 text-[11px] tracking-wider text-white/40 uppercase">
                  <span>{series.axis.from}</span>
                  <span className="text-right">{series.axis.to}</span>
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-x-0 top-[7px] h-px bg-white/15" aria-hidden />
                <div role="tablist" aria-label={`${heading} ${t(locale, 'grades')}`} onKeyDown={onRailKeyDown} className="relative grid gap-2" style={{ gridTemplateColumns: `repeat(${grades.length}, minmax(0, 1fr))` }}>
                  {grades.map((g, i) => {
                    const on = i === active
                    return (
                      <button
                        key={g.code + i}
                        type="button"
                        role="tab"
                        aria-selected={on}
                        tabIndex={on ? 0 : -1}
                        ref={(el) => {
                          tabRefs.current[i] = el
                        }}
                        onClick={() => select(i)}
                        className="group flex flex-col items-center gap-2.5 pt-0 text-center outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <span aria-hidden className={['size-3.5 rounded-full border-2 transition-transform motion-safe:duration-200', on ? 'scale-125 border-white bg-white' : 'bg-default-950 border-white/40 group-hover:border-white'].join(' ')} />
                        <span className={['font-mono text-sm transition-colors', on ? 'font-semibold text-white' : 'text-white/60 group-hover:text-white'].join(' ')}>{g.code}</span>
                        {g.tag && <span className={['text-xs transition-colors', on ? 'text-white/70' : 'text-white/40'].join(' ')}>{g.tag}</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <CompareTable series={series} fallbackImage={fallbackImage} />
        )}
      </div>
    </section>
  )
}

/**
 * One grade photo slot.
 *
 * Currently held on the wireframe placeholder while the product imagery is
 * being reconsidered. The real photo path below is intact and one line from
 * live: restore the <Image> return and every grade picks its shot back up from
 * product-images.ts, since the catalogue already carries an image key per grade.
 */
const GradePhoto = ({ imageKey, alt }: { imageKey?: string; alt: string }) => {
  const src = getProductImage(imageKey)
  const SHOW_PHOTOS = false

  if (!SHOW_PHOTOS || !src) return <Wireframe label={alt} ratio="square" tone="dark" />
  return (
    <Image
      // Keying on the resolved image restarts the fade only when the photo
      // actually changes, not when a grade shares its series shot.
      key={imageKey}
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="motion-safe:animate-grade-fade object-cover"
      placeholder="blur"
    />
  )
}

/** Every grade in the series side by side — the dense view. */
const CompareTable = ({ series, fallbackImage }: { series: GradeSeries; fallbackImage?: string }) => {
  const locale = useLocale() as Locale
  const grades = series.grades
  const hasTags = grades.some((g) => g.tag)
  const hasDescs = grades.some((g) => g.desc)

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[42rem] border-collapse text-left align-top">
        <caption className="sr-only">
          {series.title} — {t(locale, 'grade comparison')}
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-40 border-b border-white/10 p-4 sm:p-6" />
            {grades.map((g, i) => (
              <th key={g.code + i} scope="col" className="border-b border-l border-white/10 p-4 align-bottom sm:p-6">
                <div className="relative mb-4 aspect-square w-full overflow-hidden">
                  <GradePhoto imageKey={g.image ?? series.image ?? fallbackImage} alt={`${g.code} — EID`} />
                </div>
                <div className="font-mono text-base font-semibold text-white">{g.code}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hasTags && (
            <tr>
              <th scope="row" className="border-b border-white/10 p-4 text-xs tracking-wider text-white/40 uppercase sm:p-6">
                {t(locale, 'Type')}
              </th>
              {grades.map((g, i) => (
                <td key={g.code + i} className="border-b border-l border-white/10 p-4 text-sm text-white sm:p-6">
                  {g.tag ?? '—'}
                </td>
              ))}
            </tr>
          )}
          {hasDescs && (
            <tr>
              <th scope="row" className="border-b border-white/10 p-4 text-xs tracking-wider text-white/40 uppercase sm:p-6">
                {t(locale, 'Description')}
              </th>
              {grades.map((g, i) => (
                <td key={g.code + i} className="border-b border-l border-white/10 p-4 text-sm leading-relaxed text-white/70 sm:p-6">
                  {g.desc ?? series.note ?? '—'}
                </td>
              ))}
            </tr>
          )}
          {series.sizes?.length ? (
            <tr>
              <th scope="row" className="p-4 text-xs tracking-wider text-white/40 uppercase sm:p-6">
                {series.sizesLabel ?? t(locale, 'Available sizes')}
              </th>
              <td colSpan={grades.length} className="border-l border-white/10 p-4 font-mono text-sm text-white/70 sm:p-6">
                {series.sizes.join('·')}
                <div className="mt-2 font-sans text-xs text-white/40">{t(locale, 'Common to every grade in this series.')}</div>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}

export default GradeExplorer
