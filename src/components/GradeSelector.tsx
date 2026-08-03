'use client'

import Backdrop from '@/components/Backdrop'
import Wireframe from '@/components/Wireframe'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import type { GradeSeries } from '@/lib/product-catalog'
import { SHOW_PHOTOS, getProductImage } from '@/lib/product-images'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/**
 * One selector for a whole section — every series it contains, in two views.
 *
 * This replaces a per-series panel. The Natural Grit page used to stack two
 * near-identical dark cards, each about a viewport tall, each with its own view
 * switch and its own selector rail buried at the bottom. A reader had to scroll
 * a full screen to discover that the second card was the same control again.
 *
 * Now: one panel, one view switch, and a series switcher across the top whose
 * segment widths are proportional to the mesh range each series covers, so the
 * control itself shows that MB spans further than NS before you read a word.
 *
 * Explore is the default: the grades laid out on the trade-off their codes
 * actually encode (blocky and tough at one end, sharp and free-cutting at the
 * other). eid-ltd.com shows the same grades and never says that the code is a
 * choice along an axis. Compare is the escape hatch for someone who already
 * knows the range: every grade in the section, flat, in one table.
 */

type ViewMode = 'explore' | 'compare'

const STORAGE_KEY = 'eid:grade-view'
/** Prefixed so a grade deep link can never collide with a section anchor. */
const HASH_PREFIX = '#g='
/** Separates series from grade in the hash: #g=ns--ns-1-s */
const HASH_SEP = '--'

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const seriesSlug = (s: GradeSeries) => slugify(s.short ?? s.title)

/**
 * Segment width. Mesh is a ratio scale, not a linear one — 12→60 and 60→500 are
 * comparable spans of usable grit size, so the log of the ratio is what makes
 * the two segments read fairly against each other. Linear widths would give MB
 * nearly nine tenths of the bar.
 */
const segmentWeight = (s: GradeSeries) => {
  if (!s.meshSpan) return 1
  const [coarsest, finest] = s.meshSpan
  return Math.max(0.5, Math.log(finest / coarsest))
}

const readStoredMode = (): ViewMode => {
  // Guarded for SSR: on the server there is no preference to read, so the
  // markup is always Explore. Reading here rather than in a mount effect means
  // a client-side navigation into the page renders Compare immediately, with no
  // Explore frame in between. On a cold server-rendered load the stored
  // preference can only apply from hydration onward.
  if (typeof window === 'undefined') return 'explore'
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'compare' ? 'compare' : 'explore'
  } catch {
    // Private browsing or storage disabled: the default view is fine.
    return 'explore'
  }
}

const GradeSelector = ({ series, fallbackImage, sectionTitle, productName }: { series: GradeSeries[]; fallbackImage?: string; sectionTitle: string; productName: string }) => {
  const locale = useLocale() as Locale
  const [activeSeries, setActiveSeries] = useState(0)
  const [activeGrade, setActiveGrade] = useState(0)
  const [mode, setMode] = useState<ViewMode>(readStoredMode)
  const [showAllSizes, setShowAllSizes] = useState(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const panelRef = useRef<HTMLElement | null>(null)

  const current = series[activeSeries] ?? series[0]
  const grades = current?.grades ?? []
  const grade = grades[activeGrade] ?? grades[0]

  const baseId = useMemo(() => slugify(sectionTitle) + '-grades', [sectionTitle])
  const tabPanelId = baseId + '-panel'
  const tabId = (si: number, gi: number) => `${baseId}-tab-${si}-${gi}`

  // Proportional segments only when every series declares a span; a mix of
  // proportional and arbitrary widths would imply a scale that is not there.
  const proportional = series.length > 1 && series.every((s) => s.meshSpan)

  const summary = useMemo(() => {
    const gradeCount = series.reduce((n, s) => n + s.grades.length, 0)
    // "series" is already its own plural; only the grade count inflects.
    const parts = [`${series.length} ${t(locale, 'series')}`, `${gradeCount} ${t(locale, gradeCount === 1 ? 'grade' : 'grades')}`]
    const spans = series.map((s) => s.meshSpan).filter((m): m is [number, number] => Boolean(m))
    if (spans.length === series.length && spans.length > 0) {
      const coarsest = Math.min(...spans.map((m) => m[0]))
      const finest = Math.max(...spans.map((m) => m[1]))
      parts.push(`${coarsest}–${finest} ${t(locale, 'mesh')}`)
    }
    return parts.join(' · ')
  }, [series, locale])

  /* ----------------------------- selection ----------------------------- */

  const writeHash = useCallback(
    (si: number, gi: number) => {
      const s = series[si]
      const g = s?.grades[gi]
      if (!s || !g) return
      // replaceState, not a hash assignment: setting location.hash would jump
      // the viewport to the panel on every grade change.
      window.history.replaceState(null, '', `${HASH_PREFIX}${seriesSlug(s)}${HASH_SEP}${slugify(g.code)}`)
    },
    [series]
  )

  const selectGrade = useCallback(
    (gi: number) => {
      setActiveGrade(gi)
      setShowAllSizes(false)
      writeHash(activeSeries, gi)
    },
    [activeSeries, writeHash]
  )

  const selectSeries = useCallback(
    (si: number) => {
      setActiveSeries(si)
      setActiveGrade(0)
      setShowAllSizes(false)
      writeHash(si, 0)
    },
    [writeHash]
  )

  // Honour a deep link into one grade, and bring it into view — a link a sales
  // engineer sends should land on the grade, not at the top of a long page.
  useEffect(() => {
    const hash = window.location.hash
    if (!hash.startsWith(HASH_PREFIX)) return
    const wanted = hash.slice(HASH_PREFIX.length)
    const [a, b] = wanted.includes(HASH_SEP) ? wanted.split(HASH_SEP) : [null, wanted]

    let si = -1
    let gi = -1
    series.forEach((s, i) => {
      if (a !== null && seriesSlug(s) !== a) return
      const j = s.grades.findIndex((g) => slugify(g.code) === b)
      if (j >= 0 && si < 0) {
        si = i
        gi = j
      }
    })
    if (si < 0) return

    setActiveSeries(si)
    setActiveGrade(gi)
    // After paint, so the panel has its final height before we scroll to it.
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }))
  }, [series])

  const chooseMode = (next: ViewMode) => {
    setMode(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not worth surfacing — the view still switches for this visit.
    }
  }

  // Arrow keys walk the rail, as a tablist should; only the selected tab is in
  // the tab order, so the keyboard does not step through every grade.
  const onRailKeyDown = (e: React.KeyboardEvent) => {
    const last = grades.length - 1
    let next = activeGrade
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = activeGrade === last ? 0 : activeGrade + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = activeGrade === 0 ? last : activeGrade - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    selectGrade(next)
    tabRefs.current[next]?.focus()
  }

  if (!current || !grade) return null

  /* ------------------------------- sizes ------------------------------- */

  const sizes = current.sizes ?? []
  // "Available mesh sizes" -> "mesh sizes"; anything else just reads "sizes".
  const sizeNoun = /mesh/i.test(current.sizesLabel ?? '') ? t(locale, 'mesh sizes') : t(locale, 'sizes')

  return (
    <section data-note="grade-selector" ref={panelRef} aria-labelledby={baseId + '-heading'} className="scroll-mt-40">
      <div className="relative isolate overflow-hidden text-white">
        <Backdrop className="-z-10" />
        {/* ---------------------------- 1 · HEADER --------------------------- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
          <div>
            <h4 id={baseId + '-heading'} className="text-lg font-semibold text-white sm:text-xl">
              {sectionTitle}
            </h4>
            <div className="mt-1 text-sm text-white/60">{summary}</div>
          </div>

          <div role="group" aria-label={t(locale, 'View')} className="flex shrink-0 border border-white/15 p-1">
            {(['explore', 'compare'] as ViewMode[]).map((m) => (
              <button key={m} type="button" onClick={() => chooseMode(m)} aria-pressed={mode === m} className={['flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors', mode === m ? 'text-default-950 bg-white' : 'text-white/70 hover:text-white'].join(' ')}>
                <Icon icon={m === 'explore' ? 'tabler:photo' : 'tabler:table'} className="size-4" aria-hidden />
                {t(locale, m === 'explore' ? 'Explore' : 'Compare')}
              </button>
            ))}
          </div>
        </div>

        {/* ----------------------- 2 · SERIES SWITCHER ----------------------- */}
        {series.length > 1 && (
          <div className="border-b border-white/10 px-5 pt-5 pb-4 sm:px-8">
            <div role="group" aria-label={t(locale, 'Series')} className="flex">
              {series.map((s, i) => {
                const on = i === activeSeries
                return (
                  <button
                    key={seriesSlug(s)}
                    type="button"
                    onClick={() => selectSeries(i)}
                    aria-pressed={on}
                    style={{ flexGrow: proportional ? segmentWeight(s) : 1, flexBasis: 0 }}
                    className={['min-w-0 border px-3 py-2.5 text-left transition-colors sm:px-4', on ? 'border-primary-1 bg-primary-1 text-white' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white', i > 0 ? '-ml-px' : ''].join(' ')}
                  >
                    <span className="block truncate text-sm font-semibold">{s.short ? `${s.short} ${t(locale, 'Series')}` : s.title}</span>
                    {s.short && s.range && <span className={['mt-0.5 hidden truncate font-mono text-xs sm:block', on ? 'text-white/75' : 'text-white/45'].join(' ')}>{`${s.short} · ${s.range}`}</span>}
                  </button>
                )
              })}
            </div>

            {/* Caption row: coarsest, each seam, finest — the scale the segment
                widths are drawn from, stated so the proportions are readable. */}
            {proportional && (
              <div aria-hidden className="mt-2 flex font-mono text-[11px] text-white/45">
                {series.map((s, i) => (
                  <div key={seriesSlug(s) + '-cap'} style={{ flexGrow: segmentWeight(s), flexBasis: 0 }} className="relative h-4">
                    <span className="absolute start-0">{s.meshSpan?.[0]}</span>
                    {i === series.length - 1 && <span className="absolute end-0">{s.meshSpan?.[1]}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {mode === 'explore' ? (
          <>
            {/* ------------------------ 3 · GRADE RAIL ----------------------- */}
            <div className="border-b border-white/10 px-5 pt-6 pb-7 sm:px-8">
              {current.axis && (
                <div className="mb-4 flex items-center justify-between gap-4 text-xs tracking-wide text-white/70 uppercase">
                  <span>{current.axis.from}</span>
                  <span className="text-right">{current.axis.to}</span>
                </div>
              )}

              {/* Wide series scroll rather than crush: below ~6 grades the row
                  fits and justify-between spreads it edge to edge. */}
              <div className="overflow-x-auto">
                <div className="relative" style={{ minWidth: grades.length > 5 ? `${grades.length * 5.5}rem` : undefined }}>
                  {/* Track is inset to the dot centres, so its ends sit exactly
                      under the first and last dot and line up with the axis
                      captions above. */}
                  <div aria-hidden className="absolute top-[7px] right-[7px] left-[7px] h-px bg-white/20" />

                  <div role="tablist" aria-label={`${current.short ?? current.title} ${t(locale, 'grades')}`} onKeyDown={onRailKeyDown} className="relative flex justify-between gap-3">
                    {grades.map((g, i) => {
                      const on = i === activeGrade
                      const first = i === 0
                      const last = i === grades.length - 1
                      return (
                        <button
                          key={g.code + i}
                          id={tabId(activeSeries, i)}
                          type="button"
                          role="tab"
                          aria-selected={on}
                          aria-controls={tabPanelId}
                          tabIndex={on ? 0 : -1}
                          ref={(el) => {
                            tabRefs.current[i] = el
                          }}
                          onClick={() => selectGrade(i)}
                          className={['group flex min-w-0 flex-col gap-2 outline-none', first ? 'items-start text-left' : last ? 'items-end text-right' : 'items-center text-center'].join(' ')}
                        >
                          <span
                            aria-hidden
                            className={[
                              'size-3.5 rounded-full border-2 transition-transform motion-safe:duration-200',
                              on ? 'scale-125 border-white bg-white' : 'bg-default-950 border-white/40 group-hover:border-white',
                              'group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-slate-950',
                            ].join(' ')}
                          />
                          <span className={['truncate font-mono text-sm transition-colors', on ? 'font-semibold text-white' : 'text-white/60 group-hover:text-white'].join(' ')}>{g.code}</span>
                          {g.tag && <span className={['truncate text-xs transition-colors', on ? 'text-white/75' : 'text-white/40'].join(' ')}>{g.tag}</span>}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------ 4 · DETAIL --------------------------- */}
            <div role="tabpanel" id={tabPanelId} aria-labelledby={tabId(activeSeries, activeGrade)} className="grid lg:grid-cols-12">
              <div className="border-b border-white/10 p-5 sm:p-8 lg:col-span-5 lg:border-e lg:border-b-0">
                <div className="relative aspect-[4/3]">
                  <GradePhoto imageKey={grade.image ?? current.image ?? fallbackImage} alt={`${grade.code} — EID`} />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3 text-xs">
                  <span className="font-mono text-white/70">
                    {grade.code}
                    {grade.magnification ? ` · ${grade.magnification}` : ''}
                  </span>
                  <span className="shrink-0 text-white/40">
                    {t(locale, 'Grade')} {activeGrade + 1} {t(locale, 'of')} {grades.length}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-5 sm:p-8 lg:col-span-7 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <h5 className="font-mono text-2xl font-semibold text-white lg:text-3xl">{grade.code}</h5>
                  {grade.tag && <span className="border-primary-1/50 bg-primary-1/20 inline-flex items-center border px-2.5 py-1 text-xs font-semibold tracking-wider text-white uppercase">{grade.tag}</span>}
                </div>

                <p className="max-w-prose text-base leading-relaxed text-white/70">{grade.desc ?? current.note ?? t(locale, 'Available across the full range — enquire for the complete specification.')}</p>

                {sizes.length > 0 && (
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-white/70">
                      <span>
                        <span className="font-mono">{sizes.length}</span> {sizeNoun}, <span className="font-mono">{sizes[0]}</span>–<span className="font-mono">{sizes[sizes.length - 1]}</span>
                        {current.short ? ` · ${t(locale, 'all')} ${current.short} ${t(locale, 'grades')}` : ''}
                      </span>
                      <button type="button" onClick={() => setShowAllSizes((v) => !v)} aria-expanded={showAllSizes} className="text-white underline underline-offset-4 hover:text-white/70">
                        {t(locale, showAllSizes ? 'Hide' : 'Show all')}
                      </button>
                    </div>

                    {showAllSizes && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {sizes.map((s) => (
                          <span key={s} className="border border-white/15 px-2 py-0.5 font-mono text-xs text-white/70">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* The CTA carries the selection through to the form, so the
                    reader does not re-enter what they just chose. */}
                <Link
                  href={`/contact?product=${encodeURIComponent(productName)}&grade=${encodeURIComponent(grade.code)}`}
                  className="bg-primary-1 hover:text-default-950 mt-auto inline-flex w-fit items-center gap-2.5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white"
                >
                  {t(locale, 'Request a quote for')} {grade.code}
                  <Icon icon="tabler:arrow-narrow-right" className="size-5" />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <CompareTable series={series} />
        )}
      </div>
    </section>
  )
}

/**
 * One grade photo slot. Held on the wireframe placeholder while the product
 * imagery is reconsidered — see SHOW_PHOTOS in product-images.ts, which is the
 * single switch for the whole products area.
 */
const GradePhoto = ({ imageKey, alt }: { imageKey?: string; alt: string }) => {
  const src = getProductImage(imageKey)
  if (!SHOW_PHOTOS || !src) return <Wireframe label={alt} ratio="landscape" tone="dark" />
  return (
    <Image
      // Keying on the resolved image restarts the fade only when the photo
      // actually changes, not when a grade shares its series shot.
      key={imageKey}
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 40vw, 100vw"
      className="motion-safe:animate-grade-fade object-cover"
      placeholder="blur"
    />
  )
}

/**
 * Every grade in the section, flat. One row per grade across all series, so a
 * reader who already knows the range never has to operate a control to see it.
 */
const CompareTable = ({ series }: { series: GradeSeries[] }) => {
  const locale = useLocale() as Locale
  const rows = useMemo(() => series.flatMap((s) => s.grades.map((g) => ({ s, g }))), [series])
  const hasCharacter = rows.some(({ g }) => g.character)

  const cell = 'border-b border-white/10 px-4 py-3.5 sm:px-6 sm:py-4 align-top'

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">{t(locale, 'All grades in this section')}</caption>
        <thead>
          <tr className="text-xs tracking-wider text-white/45 uppercase">
            <th scope="col" className={cell}>
              {t(locale, 'Grade')}
            </th>
            <th scope="col" className={cell}>
              {t(locale, 'Series')}
            </th>
            <th scope="col" className={cell}>
              {t(locale, 'Shape')}
            </th>
            {hasCharacter && (
              <th scope="col" className={cell}>
                {t(locale, 'Character')}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ s, g }, i) => (
            <tr key={seriesSlug(s) + g.code + i} className="hover:bg-white/[0.03]">
              <th scope="row" className={`${cell} font-mono text-sm font-semibold whitespace-nowrap text-white`}>
                {g.code}
              </th>
              <td className={`${cell} text-sm whitespace-nowrap text-white/60`}>{s.short ?? s.title}</td>
              <td className={`${cell} text-sm text-white/80`}>{g.tag ?? '—'}</td>
              {hasCharacter && <td className={`${cell} text-sm leading-relaxed text-white/70`}>{g.character ?? '—'}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GradeSelector
