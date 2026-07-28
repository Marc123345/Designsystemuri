'use client'

import { annotations } from '@/lib/annotations'
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

type Pin = { key: string; n: number; top: number; left: number }

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
      if (!key || !annotations[key]) return
      // A shared block can appear more than once on a page; pin the first.
      if (seen.has(key)) return
      seen.add(key)
      const r = el.getBoundingClientRect()
      next.push({
        key,
        n: next.length + 1,
        top: r.top + window.scrollY + 12,
        left: Math.min(r.right + window.scrollX - 44, document.documentElement.clientWidth - 52),
      })
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
    const t = setTimeout(measure, 800)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
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

  const note = active ? annotations[active] : null
  const activePin = pins.find((p) => p.key === active)

  return (
    <>
      {/* Pins. aria-hidden as a set: this is reviewer chrome, not page content,
          and a screen-reader user should not have to walk through it. */}
      {on && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[90]" style={{ height: 0 }}>
          {pins.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setActive(p.key)}
              style={{ top: p.top, left: p.left }}
              className={`pointer-events-auto absolute flex size-8 items-center justify-center text-xs font-bold shadow-[0_4px_14px_rgba(2,6,23,0.35)] transition-transform hover:scale-110 ${active === p.key ? 'bg-default-900 text-white' : 'bg-primary text-white'}`}
              title={annotations[p.key]?.title}
            >
              {p.n}
            </button>
          ))}
        </div>
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

          <div className="space-y-3 px-5 pt-5 pb-28 sm:pb-5">
            {note.body.map((para, i) => (
              <p key={i} className="text-default-600 text-sm leading-relaxed">
                {para}
              </p>
            ))}
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
