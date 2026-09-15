'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'

const CoatingChip = ({ type, label }: { type: 'Ni' | 'Ti' | 'Cu' | 'Uncoated'; label: string }) => {
  const styles = {
    Ni: 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-800 ring-slate-300',
    Ti: 'bg-gradient-to-br from-amber-100 to-amber-300 text-amber-900 ring-amber-200',
    Cu: 'bg-gradient-to-br from-orange-200 to-orange-400 text-orange-950 ring-orange-300',
    Uncoated: 'bg-default-100 text-default-600 ring-default-200',
  }

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-semibold uppercase tracking-widest ring-1 ring-inset ${styles[type]}`}>
      <span className="font-mono">{type}</span>
      <span className="opacity-70">|</span>
      <span>{label}</span>
    </div>
  )
}

const PropertyGauge = ({ label, value, max = 10 }: { label: string; value: number; max?: number }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-end justify-between">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-default-500">{label}</span>
      <span className="font-mono text-sm font-bold text-primary">{value}<span className="font-normal text-default-400">/{max}</span></span>
    </div>
    <div className="h-1.5 w-full overflow-hidden rounded-none bg-default-100">
      <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  </div>
)

const SpecAccordion = ({ title, icon, previewText, defaultOpen = false, children }: { title: string; icon: string; previewText?: string; defaultOpen?: boolean; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="group border-b border-default-200 transition-colors hover:bg-default-50/50">
      <button type="button" onClick={() => setIsOpen((open) => !open)} className="flex w-full items-center justify-between py-6 text-left focus:outline-none lg:py-8" aria-expanded={isOpen}>
        <div className="flex items-center gap-5">
          <div className={`flex size-12 shrink-0 items-center justify-center rounded-none border border-default-200 bg-white transition-colors duration-300 ${isOpen ? 'border-primary text-primary' : 'text-default-400 group-hover:text-primary'}`}>
            <Icon icon={icon} className="size-6" />
          </div>
          <div>
            <h3 className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-default-900'}`}>{title}</h3>
            {previewText && <p className={`mt-1 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 ${isOpen ? 'absolute translate-y-2 opacity-0' : 'text-default-500 opacity-100'}`}>{previewText}</p>}
          </div>
        </div>
        <div className="ml-4 flex size-8 shrink-0 items-center justify-center rounded-none border border-default-200 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-primary" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <Icon icon="tabler:plus" className={`size-4 transition-colors ${isOpen ? 'text-primary' : 'text-default-500 group-hover:text-primary'}`} />
        </div>
      </button>
      <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="pb-8 pl-[68px]">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function EngineeredConsole() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
          <aside className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="border-s-2 border-primary ps-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-default-500">Premium Resin Bond</p>
                <h1 className="mt-4 text-4xl font-bold leading-tight text-default-900">RCBN <br />Series 5000</h1>
              </div>
              <p className="border-s-2 border-transparent pl-6 text-lg leading-relaxed text-default-600">Engineered for high-performance precision grinding. Extreme thermal stability and customized micro-fracturing characteristics for continuous sharp edge regeneration.</p>
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border border-default-100 bg-default-50">
                <Icon icon="tabler:diamond" className="size-32 text-default-200 stroke-[0.5]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-default-200 p-4"><div className="font-mono text-[10px] uppercase tracking-widest text-default-500">Base Hardness</div><div className="mt-1 font-mono text-xl font-bold text-primary">Knoop 4500</div></div>
                <div className="border border-default-200 p-4"><div className="font-mono text-[10px] uppercase tracking-widest text-default-500">Av. Crystal Size</div><div className="mt-1 font-mono text-xl font-bold text-primary">50-100<span className="text-sm font-normal text-default-400">µm</span></div></div>
              </div>
              <button type="button" className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-default-900 hover:bg-default-900">Request Sample <Icon icon="tabler:arrow-right" className="size-4" /></button>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:pt-2">
            <div className="border-t border-default-200">
              <SpecAccordion title="Available Mesh Sizes" icon="tabler:chart-bar" previewText="FEPA & US Mesh Standards • 50/60 to 400/500" defaultOpen>
                <div className="space-y-6">
                  <p className="text-default-600">Our grading facilities ensure extremely tight particle size distribution (PSD) tolerances, exceeding FEPA standards for predictable grinding performance.</p>
                  <div className="overflow-x-auto"><table className="w-full text-left font-mono text-sm"><thead className="border-b border-default-200 text-xs text-default-500"><tr><th className="pb-3 font-normal uppercase tracking-widest">US Mesh</th><th className="pb-3 font-normal uppercase tracking-widest">FEPA (µm)</th><th className="pb-3 font-normal uppercase tracking-widest">Availability</th></tr></thead><tbody className="divide-y divide-default-100 text-default-900"><tr className="transition-colors hover:bg-default-50"><td className="py-3 font-bold">50 / 60</td><td className="py-3">D301</td><td className="py-3"><Icon icon="tabler:circle-check-filled" className="size-5 text-primary" /></td></tr><tr className="transition-colors hover:bg-default-50"><td className="py-3 font-bold">100 / 120</td><td className="py-3">D151</td><td className="py-3"><Icon icon="tabler:circle-check-filled" className="size-5 text-primary" /></td></tr><tr className="transition-colors hover:bg-default-50"><td className="py-3 font-bold">200 / 230</td><td className="py-3">D76</td><td className="py-3"><Icon icon="tabler:circle-check-filled" className="size-5 text-primary" /></td></tr></tbody></table></div>
                </div>
              </SpecAccordion>
              <SpecAccordion title="Surface Coatings" icon="tabler:shield-chevron" previewText="Nickel (30%, 56%) • Titanium (Ti)"><div className="grid gap-8 lg:grid-cols-2"><div className="space-y-4"><CoatingChip type="Ni" label="Nickel 56% wt" /><p className="text-sm text-default-600">Highly spiked nickel coating for phenomenal mechanical retention in resin bonds. Acts as a heat sink, pulling thermal energy away from the diamond crystal during dry grinding.</p></div><div className="space-y-4"><CoatingChip type="Ti" label="Titanium" /><p className="text-sm text-default-600">Micro-thin titanium carbide layer. Protects the core diamond from oxidation at high temperatures and prevents chemical reaction with workpiece materials.</p></div><div className="space-y-4 lg:col-span-2"><CoatingChip type="Uncoated" label="Bare Crystal" /><p className="text-sm text-default-600">Pure graded crystal for vitrified and electroplated applications where maximum protrusion is required.</p></div></div></SpecAccordion>
              <SpecAccordion title="Mechanical Properties" icon="tabler:activity" previewText="Friability • Thermal Stability • Toughness Index"><div className="max-w-lg space-y-8"><PropertyGauge label="Friability (Micro-fracturing)" value={8.5} /><PropertyGauge label="Thermal Stability" value={9} /><PropertyGauge label="Impact Toughness" value={6.5} /><div className="mt-6 border-l-2 border-default-200 pl-4"><p className="text-sm italic text-default-600">Note: High friability in the 5000 series ensures the grain continuously splinters under pressure, constantly exposing fresh, sharp cutting edges rather than glazing over.</p></div></div></SpecAccordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
