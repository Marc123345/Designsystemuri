'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useMemo, useState } from 'react'

export type UriGradeOption = {
  id: string
  label: string
  detail?: string
  title: string
  subtitle?: string
  description: string
  image: string
  sizes?: string[]
  sizeLabel?: string
  /** Several labelled chip rows (NS / MB series, drilling / mesh) in place of `sizes`. */
  sizeSeries?: { label: string; sizes: string[] }[]
  specs?: { label: string; value: string }[]
  note?: { lead: string; text: string }
}

export type UriGradeGroup = {
  label?: string
  options: UriGradeOption[]
}

type Props = {
  selectorTitle?: string
  groups: UriGradeGroup[]
  variant?: 'tiles' | 'grouped-tiles' | 'rows' | 'buttons' | 'none'
  axis?: { from: string; to: string }
  /** A one-line explanation printed under the selector. */
  selectorNote?: { lead: string; text: string }
  ctaLead?: string
}

const UriGradeModule = ({
  selectorTitle = 'SELECT GRADE',
  groups,
  variant = 'buttons',
  axis,
  selectorNote,
  ctaLead = 'Need a size or format not listed?',
}: Props) => {
  const all = useMemo(() => groups.flatMap((group) => group.options), [groups])
  const [activeId, setActiveId] = useState(all[0]?.id ?? '')
  const active = all.find((option) => option.id === activeId) ?? all[0]

  if (!active) return null

  const selector = variant !== 'none' && all.length > 1

  return (
    <div className="border-default-200 overflow-hidden rounded-card border bg-white shadow-[0_5px_18px_rgba(20,36,50,0.05)]">
      {selector ? (
        <div className="border-default-200 bg-default-50 border-b p-5 lg:p-6">
          <div className="text-default-500 mb-3 text-center font-mono text-[9px] font-bold tracking-[0.2em] uppercase">{selectorTitle}</div>

          {axis ? (
            <div className="text-default-500 mb-2 flex justify-between gap-5 text-[9px] font-semibold tracking-[0.06em] uppercase">
              <span>{axis.from}</span>
              <span className="text-right">{axis.to}</span>
            </div>
          ) : null}

          {variant === 'tiles' ? (
            <div className="grid gap-2 sm:grid-cols-3">
              {all.map((option) => {
                const on = option.id === active.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveId(option.id)}
                    aria-pressed={on}
                    className={`min-h-[66px] rounded-[4px] border px-3 py-2 text-center transition-colors ${
                      on ? 'border-primary bg-primary/[0.07] text-primary border-2' : 'border-default-200 hover:border-[#9b8f7c] text-default-900 bg-white'
                    }`}
                  >
                    <span className="block text-[13px] font-bold">{option.label}</span>
                    {option.detail ? <span className="text-default-500 mt-1.5 block text-[9px] font-normal">{option.detail}</span> : null}
                  </button>
                )
              })}
            </div>
          ) : variant === 'grouped-tiles' ? (
            <div>
              {groups.map((group, index) => (
                <div key={group.label ?? index} className="border-default-200 [&+&]:mt-5 [&+&]:border-t [&+&]:pt-5">
                  {group.label ? <div className="text-primary-3 mb-2.5 text-[10px] font-bold tracking-[0.11em] uppercase">{group.label}</div> : null}
                  <div className="grid gap-2 sm:grid-cols-3">
                    {group.options.map((option) => {
                      const on = option.id === active.id
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setActiveId(option.id)}
                          aria-pressed={on}
                          className={`min-h-[66px] rounded-[4px] border px-3 py-2 text-center text-[13px] font-bold transition-colors ${
                            on ? 'border-primary bg-primary/[0.07] text-primary border-2' : 'border-default-200 hover:border-[#9b8f7c] text-default-900 bg-white'
                          }`}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : variant === 'rows' ? (
            <div className="border-default-200 overflow-hidden rounded-[4px] border bg-white">
              {groups.map((group, index) => (
                <div key={group.label ?? index} className="border-default-200 grid border-b last:border-b-0 md:grid-cols-[145px_1fr]">
                  <div className="text-primary flex items-center px-3 py-3 text-[11px] font-bold">{group.label}</div>
                  <div className="flex flex-wrap gap-1.5 px-3 py-2.5">
                    {group.options.map((option) => {
                      const on = option.id === active.id
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setActiveId(option.id)}
                          aria-pressed={on}
                          className={`min-h-10 rounded-[4px] border px-3 py-2 text-[10px] font-bold transition-colors ${
                            on ? 'border-primary bg-primary text-white shadow-[inset_0_-3px_0_#d8d1c3]' : 'border-default-200 text-default-700 hover:border-[#9b8f7c] bg-white'
                          }`}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2">
              {all.map((option) => {
                const on = option.id === active.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveId(option.id)}
                    aria-pressed={on}
                    className={`rounded-[4px] border px-3.5 py-2.5 text-[11px] font-bold transition-colors ${
                      on ? 'border-primary bg-primary text-white shadow-[inset_0_-3px_0_#d8d1c3]' : 'border-default-200 text-default-700 hover:border-[#9b8f7c] bg-white'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          )}

          {selectorNote ? (
            <p className="text-default-500 mx-auto mt-4 max-w-3xl text-center text-[11px] leading-relaxed">
              <strong className="text-default-700">{selectorNote.lead}</strong> {selectorNote.text}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid md:grid-cols-[42%_58%]">
        <div className="border-default-200 bg-default-100 relative min-h-[230px] overflow-hidden border-b md:min-h-[310px] md:border-r md:border-b-0">
          <Image
            key={active.id}
            src={active.image}
            alt={`${active.title} — EID`}
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="p-6 lg:p-8">
          <h3 className="text-primary-3 text-[24px] leading-tight font-bold tracking-[-0.025em] lg:text-[27px]">{active.title}</h3>
          {active.subtitle ? <div className="mt-1.5 text-[10px] font-bold tracking-[0.14em] text-[#9b8f7c] uppercase">{active.subtitle}</div> : null}

          <p className="text-default-600 mt-4 text-[14px] leading-relaxed">{active.description}</p>

          {active.sizes?.length ? (
            <div className="border-default-200 mt-5 border-t pt-4">
              <div className="text-default-500 text-[9px] font-bold tracking-[0.08em] uppercase">{active.sizeLabel ?? 'AVAILABLE SIZES'}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {active.sizes.map((size) => (
                  <span key={size} className="border-default-200 text-default-700 rounded-[4px] border bg-white px-2.5 py-1.5 text-[10px]">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {active.sizeSeries?.length ? (
            <div className="border-default-200 mt-5 border-t pt-4">
              {active.sizeLabel ? <div className="text-default-500 mb-2.5 text-[9px] font-bold tracking-[0.08em] uppercase">{active.sizeLabel}</div> : null}
              {active.sizeSeries.map((series) => (
                <div key={series.label} className="mt-3 first:mt-0">
                  <div className="text-default-500 mb-2 text-[9px] font-bold tracking-[0.08em] uppercase">{series.label}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {series.sizes.map((size) => (
                      <span key={size} className="border-default-200 text-default-700 rounded-[4px] border bg-white px-2.5 py-1.5 text-[10px]">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {active.note ? (
            <p className="text-default-500 mt-3 text-[11px] leading-relaxed">
              <strong className="text-default-700">{active.note.lead}</strong> {active.note.text}
            </p>
          ) : null}

          {active.specs?.length ? (
            <dl className="border-default-200 mt-5 border-t pt-4 text-[11px]">
              {active.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-[78px_1fr] gap-3 py-1">
                  <dt className="text-default-500 text-[9px] font-bold tracking-[0.08em] uppercase">{spec.label}</dt>
                  <dd className="text-default-700">{spec.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="border-default-200 mt-6 border-t pt-4 text-[11px]">
            <strong className="text-default-900">{ctaLead}</strong>{' '}
            <Link href="/contact" className="text-primary font-bold hover:underline">Ask our technical team →</Link>
            <Link href="/contact" className="mt-1.5 block font-bold tracking-[0.04em] text-[#9b8f7c] uppercase">Request a quote →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UriGradeModule
