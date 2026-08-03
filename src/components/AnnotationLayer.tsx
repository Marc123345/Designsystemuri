'use client'

import { annotations } from '@/lib/annotations'
import { PRIORITY_LABEL, getImageSpec, type ImageSpec } from '@/lib/image-specs'
import { Icon } from '@iconify/react'
import { useCallback, useEffect, useState } from 'react'

/**
 * Design annotations on the wireframe build — Figma comments, in the page.
 *
 * Any element carrying data-note="<key>" gets a numbered pin at its top-right
 * corner; clicking the pin opens the note in a side panel. Notes live in
 * lib/annotations.ts, so the reasoning is written and edited in one place
 * rather than scattered through components.
 *
 * Pins are absolutely positioned in a full-document overlay and measured from
 * the annotated element, so nothing in the page shifts by a pixel whether the
 * layer is on or off. The overlay is pointer-events-none; only the pins
 * themselves take clicks.
 *
 * REVIEW ONLY. Delete <AnnotationLayer /> from app/[locale]/layout.tsx to
 * remove it entirely — the data-note attributes it reads are inert without it.
 */

type Pin = { key: string; n: number; top: number; left: number; fixed: boolean }

/** Pins must clear the fixed header, which is 76px tall and 96px from lg. */
const HEADER_CLEAR = 108
/** Two pins this close would sit on top of each other. */
const COLLIDE_Y = 40
const COLLIDE_X = 60

const STORAGE_KEY = 'eid:annotations'

const AnnotationLayer = () => {
  const [on, setOn] = useState(false)
  const [pins, setPins] = useState<Pin[]>([])
  const [active, setActive] = useState<string | null>(null)

  // Default to on for a first-time reviewer — the layer is the point of this
  // build — then respect whatever they chose after that.
  useEffect(() => {
    try {
      setOn(window.localStorage.getItem(STORAGE_KEY) !== 'off')
    } catch {
      setOn(true)
    }
  }, [])

  const measure = useCallback(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-note]'))
    const seen = new Set<string>()
    const next: Pin[] = []
    els.forEach((el) => {
      const key = el.dataset.note
      // Image slots resolve through image-specs rather than the annotations
      // registry, so they are valid keys even though nothing names them here.
      if (!key || (!annotations[key] && !key.startsWith('image:'))) return
      // A shared block can appear more than once on a page; pin the first.
      if (seen.has(key)) return
      seen.add(key)

      // A fixed element (the header) needs a fixed pin, or the pin scrolls away
      // from the thing it annotates. Everything else is pinned in document
      // coordinates so it scrolls with its section.
      const isFixed = getComputedStyle(el).position === 'fixed'
      const r = el.getBoundingClientRect()

      let top = isFixed ? r.top + 12 : Math.max(r.top + window.scrollY + 12, HEADER_CLEAR)
      const left = Math.min((isFixed ? r.right : r.right + window.scrollX) - 44, document.documentElement.clientWidth - 52)

      // Sections that start at the same place — the hero begins at the top of
      // the document, right under the header — would otherwise stack pins
      // exactly on top of each other. Step each collision down.
      while (next.some((p) => p.fixed === isFixed && Math.abs(p.top - top) < COLLIDE_Y && Math.abs(p.left - left) < COLLIDE_X)) {
        top += COLLIDE_Y
      }

      next.push({ key, n: next.length + 1, top, left, fixed: isFixed })
    })
    setPins(next)
  }, [])

  useEffect(() => {
    if (!on) return
    measure()
    // Sections resize as fonts load, images settle and accordions open.
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })
    const t = setTimeout(measure, 800)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
      clearTimeout(t)
    }
  }, [on, measure])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggle = () => {
    const next = !on
    setOn(next)
    setActive(null)
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
    } catch {
      // Preference is per-visit if storage is unavailable. Not worth surfacing.
    }
  }

  // An image slot's key is `image:<label>`; everything else is a design note.
  // Both end up as { title, body } so the panel does not care which it got.
  const imageLabel = active?.startsWith('image:') ? active.slice('image:'.length) : null
  const spec: ImageSpec | null = imageLabel ? getImageSpec(imageLabel) : null

  const note = spec ? { title: imageLabel!, body: [] as string[] } : active ? annotations[active] : null

  const activePin = pins.find((p) => p.key === active)

  return (
    <>
      {/* Pins. aria-hidden as a set: this is reviewer chrome, not page content,
          and a screen-reader user should not have to walk through it. */}
      {on && (
        <>
          {(['abs', 'fix'] as const).map((space) => (
            <div key={space} aria-hidden className={`pointer-events-none z-[125] ${space === 'fix' ? 'fixed inset-0' : 'absolute inset-0'}`} style={space === 'abs' ? { height: 0 } : undefined}>
              {pins
                .filter((p) => (space === 'fix' ? p.fixed : !p.fixed))
                .map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setActive(p.key)}
                    style={{ top: p.top, left: p.left }}
                    className={`pointer-events-auto absolute flex size-8 items-center justify-center text-xs font-bold shadow-[0_4px_14px_rgba(2,6,23,0.35)] transition-transform hover:scale-110 ${active === p.key ? 'bg-default-900 text-white' : 'bg-primary text-white'}`}
                    title={p.key.startsWith('image:') ? p.key.slice('image:'.length) : annotations[p.key]?.title}
                  >
                    {p.n}
                  </button>
                ))}
            </div>
          ))}
        </>
      )}

      {/* Note panel */}
      {on && note && (
        <div className="border-default-200 fixed inset-x-0 bottom-0 z-[130] max-h-[70vh] overflow-y-auto border-t bg-white shadow-[0_-20px_60px_rgba(2,6,23,0.25)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-h-[70vh] sm:w-[26rem] sm:border">
          <div className="bg-primary flex items-start justify-between gap-4 px-5 py-4 text-white">
            <div className="flex items-start gap-3">
              <span className="text-default-900 mt-0.5 flex size-6 shrink-0 items-center justify-center bg-white text-xs font-bold">{activePin?.n}</span>
              <h3 className="text-base leading-snug font-semibold text-white">{note.title}</h3>
            </div>
            <button type="button" onClick={() => setActive(null)} aria-label="Close note" className="shrink-0 text-white/70 transition-colors hover:text-white">
              <Icon icon="tabler:x" className="size-5" />
            </button>
          </div>

          <div className="space-y-4 px-5 pt-5 pb-28 sm:pb-5">
            {spec ? (
              <>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 text-[11px] font-bold tracking-wide uppercase ${spec.priority === 1 ? 'bg-primary text-white' : spec.priority === 2 ? 'bg-default-200 text-default-900' : 'bg-default-100 text-default-600'}`}>{PRIORITY_LABEL[spec.priority]}</span>
                  <span className="border-default-300 text-default-700 border px-2 py-1 text-[11px] font-bold tracking-wide uppercase">{spec.orientation}</span>
                </div>

                <p className="text-default-900 text-sm leading-relaxed font-semibold">{spec.shot}</p>

                <div>
                  <p className="text-default-500 mb-1.5 text-[11px] font-bold tracking-[0.15em] uppercase">Must be in frame</p>
                  <ul className="space-y-1.5">
                    {spec.inFrame.map((item) => (
                      <li key={item} className="text-default-600 flex gap-2 text-sm leading-relaxed">
                        <span aria-hidden className="bg-primary mt-2 size-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-default-500 mb-1.5 text-[11px] font-bold tracking-[0.15em] uppercase">Avoid</p>
                  <p className="text-default-600 text-sm leading-relaxed">{spec.avoid}</p>
                </div>

                <div className="border-default-200 border-t pt-3">
                  <p className="text-default-500 mb-1.5 text-[11px] font-bold tracking-[0.15em] uppercase">Why it matters</p>
                  <p className="text-default-600 text-sm leading-relaxed">{spec.why}</p>
                </div>

                <p className="text-default-500 border-default-200 border-t pt-3 text-xs leading-relaxed">Send at original resolution, straight off the camera. Shoot wider than the slot looks — this crops to several shapes and a tight frame cannot be widened.</p>
              </>
            ) : (
              note.body.map((para, i) => (
                <p key={i} className="text-default-600 text-sm leading-relaxed">
                  {para}
                </p>
              ))
            )}
          </div>
        </div>
      )}

      {/* Toggle. Stacked directly above the WhatsApp button, which now also
          sits bottom-left so it stops covering the note panel. */}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        className={`fixed bottom-24 left-6 z-[140] inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold shadow-[0_10px_30px_rgba(2,6,23,0.25)] transition-colors md:bottom-27 md:left-8 ${
          on ? 'bg-primary text-white' : 'border-default-300 text-default-700 hover:border-primary border bg-white'
        }`}
      >
        <Icon icon={on ? 'tabler:message-2' : 'tabler:message-2-off'} className="size-5" />
        {on ? `Design notes · ${pins.length}` : 'Design notes'}
      </button>
    </>
  )
}

export default AnnotationLayer
