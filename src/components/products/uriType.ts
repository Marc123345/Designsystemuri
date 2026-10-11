// Shared typography for the Uri product layouts (Natural Grit, Metal Bond, Resin Bond).
// These values deliberately mirror the live EID primitives rather than the original
// HTML mockups: Mona Sans is inherited by headings, Geist by body copy, and the
// eyebrow exactly matches <Eyebrow> in ui.tsx.
//
// Keep all product-page typography on this scale. Do not introduce one-off font
// sizes in individual product layouts unless the density of a data visualisation
// genuinely requires it.
//
// ⚠ `label` deliberately has no `uppercase`: CSS uppercasing turns µ into M,
// so labels that may contain a unit are written in caps in the data itself.
export const T = {
  // Exact match to the site's Eyebrow component.
  eyebrow: 'font-mono text-[11px] font-normal tracking-[0.22em] uppercase',

  // Exact responsive size progression used by EID SectionHeading.
  h2: 'text-[28px] leading-[1.08] font-bold tracking-[-0.03em] md:text-[36px] lg:text-[42px]',

  // One step below h2 for product/grade names.
  h3: 'text-[22px] leading-[1.12] font-bold tracking-[-0.025em] md:text-[24px] lg:text-[28px]',

  // EID body rhythm.
  body: 'text-base leading-relaxed',
  small: 'text-sm leading-relaxed',

  // Technical metadata sits below body copy in hierarchy, with the same
  // restrained tracking used elsewhere on the site.
  label: 'text-[11px] font-semibold tracking-[0.16em]',
  control: 'text-sm font-semibold',
  chip: 'text-xs leading-[1.3]',
} as const
