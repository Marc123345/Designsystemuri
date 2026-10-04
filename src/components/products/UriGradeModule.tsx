'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { T } from '@/components/products/uriType'

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
  /** Captioned photos stacked in the image column in place of `image`. */
  gallery?: { src: string; alt: string; caption: string; className?: string }[]
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
          <div className={`text-default-500 mb-3 text-center ${T.eyebrow}`}>{selectorTitle}</div>

          {axis ? (
            <div className={`text-default-500 mb-2 flex justify-between gap-5 uppercase ${T.label}`}>
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
                      on ? 'border-primary bg-primary/[0.07] text-primary border-2' : 'border-default-200 hover:border-primary text-default-900 bg-white'
                    }`}
                  >
                    <span className={`block ${T.control}`}>{option.label}</span>
                    {option.detail ? <span className={`text-default-500 mt-1.5 block font-normal ${T.chip}`}>{option.detail}</span> : null}
                  </button>
                )
              })}
            </div>
          ) : variant === 'grouped-tiles' ? (
            <div>
              {groups.map((group, index) => (
                <div key={group.label ?? index} className="border-default-200 [&+&]:mt-5 [&+&]:border-t [&+&]:pt-5">
                  {group.label ? <div className={`text-primary-3 mb-2.5 uppercase ${T.label}`}>{group.label}</div> : null}
                  <div className="grid gap-2 sm:grid-cols-3">
                    {group.options.map((option) => {
                      const on = option.id === active.id
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setActiveId(option.id)}
                          aria-pressed={on}
                          className={`min-h-[66px] rounded-[4px] border px-3 py-2 text-center ${T.control} transition-colors ${
                            on ? 'border-primary bg-primary/[0.07] text-primary border-2' : 'border-default-200 hover:border-primary text-default-900 bg-white'
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
                  <div className={`text-primary flex items-center px-3 py-3 ${T.label}`}>{group.label}</div>
                  <div className="flex flex-wrap gap-1.5 px-3 py-2.5">
                    {group.options.map((option) => {
                      const on = option.id === active.id
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setActiveId(option.id)}
                          aria-pressed={on}
                          className={`min-h-11 rounded-[4px] border px-3 py-2 ${T.control} transition-colors ${
                            on ? 'border-primary bg-primary text-white' : 'border-default-200 text-default-700 hover:border-primary bg-white'
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
                    className={`min-h-11 rounded-[4px] border px-3.5 py-2.5 ${T.control} transition-colors ${
                      on ? 'border-primary bg-primary text-white' : 'border-default-200 text-default-700 hover:border-primary bg-white'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          )}

          {selectorNote ? (
            <p className={`text-default-500 mx-auto mt-4 max-w-3xl text-center ${T.small}`}>
              <strong className="text-default-700">{selectorNote.lead}</strong> {selectorNote.text}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid md:grid-cols-[42%_58%]">
        {active.gallery?.length ? (
          <div className="border-default-200 bg-default-100 flex flex-col justify-center gap-2.5 border-b p-3 md:border-r md:border-b-0">
            {active.gallery.map((photo) => (
              <figure key={photo.src} className="border-default-200 m-0 overflow-hidden rounded-[4px] border bg-white">
                <div className={`relative ${photo.className ?? 'h-[235px]'}`}>
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" />
                </div>
                <figcaption className={`text-default-500 px-2.5 py-2 ${T.label}`}>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
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
        )}

        <div className="p-6 lg:p-8">
          <h3 className={`text-primary-3 ${T.h3}`}>{active.title}</h3>
          {active.subtitle ? <div className={`text-primary mt-2 uppercase ${T.label}`}>{active.subtitle}</div> : null}

          <p className={`text-default-600 mt-4 ${T.body}`}>{active.description}</p>

          {active.sizes?.length ? (
            <div className="border-default-200 mt-5 border-t pt-4">
              {/* No `uppercase`: CSS uppercasing turns µ into M, so labels are written in caps. */}
              <div className={`text-default-500 ${T.label}`}>{active.sizeLabel ?? 'AVAILABLE SIZES'}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {active.sizes.map((size) => (
                  <span key={size} className={`border-default-200 text-default-700 rounded-[4px] border bg-white px-2.5 py-1.5 ${T.chip}`}>
                    {size}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {active.sizeSeries?.length ? (
            <div className="border-default-200 mt-5 border-t pt-4">
              {active.sizeLabel ? <div className={`text-default-500 mb-2.5 ${T.label}`}>{active.sizeLabel}</div> : null}
              {active.sizeSeries.map((series) => (
                <div key={series.label} className="mt-3 first:mt-0">
                  <div className={`text-default-500 mb-2 ${T.label}`}>{series.label}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {series.sizes.map((size) => (
                      <span key={size} className={`border-default-200 text-default-700 rounded-[4px] border bg-white px-2.5 py-1.5 ${T.chip}`}>
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {active.note ? (
            <p className={`text-default-500 mt-3 ${T.small}`}>
              <strong className="text-default-700">{active.note.lead}</strong> {active.note.text}
            </p>
          ) : null}

          {active.specs?.length ? (
            <dl className={`border-default-200 mt-5 border-t pt-4 ${T.small}`}>
              {active.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-[78px_1fr] gap-3 py-1">
                  <dt className={`text-default-500 uppercase ${T.label}`}>{spec.label}</dt>
                  <dd className="text-default-700">{spec.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className={`border-default-200 mt-6 border-t pt-4 ${T.small}`}>
            <strong className="text-default-900">{ctaLead}</strong>{' '}
            <Link href="/contact" className="text-primary inline-flex min-h-11 items-center font-bold hover:underline lg:inline lg:min-h-0">Ask our technical team →</Link>
            <Link href="/contact" className="flex min-h-11 items-center text-primary font-bold tracking-[0.04em] uppercase lg:mt-1.5 lg:block lg:min-h-0">Request a quote →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UriGradeModule
