// One type scale for the Uri product layouts (Natural Grit, Metal Bond, Resin Bond),
// taken from the site's own primitives so these pages read like the rest of it:
// `eyebrow` is ui.tsx <Eyebrow>, `h2` is the first two steps of <SectionHeading>,
// `body` is the 16px paragraph the other product pages use. Fonts come from the
// base layer (Mona Sans on h1–h6, Geist everywhere else), so none is set here.
//
// ⚠ `label` deliberately has no `uppercase`: CSS uppercasing turns µ into M, so
// any label that can carry a unit is written in caps in the data instead. Add
// `uppercase` at the call site only where the text can never contain µ.
export const T = {
  eyebrow: 'font-mono text-[11px] tracking-[0.22em] uppercase',
  h2: 'text-[28px] leading-[1.1] font-bold tracking-[-0.03em] md:text-[36px]',
  h3: 'text-[24px] leading-tight font-bold tracking-[-0.025em] lg:text-[28px]',
  body: 'text-base leading-relaxed',
  small: 'text-sm leading-relaxed',
  label: 'text-[11px] font-bold tracking-[0.1em]',
  control: 'text-sm font-bold',
  chip: 'text-xs',
} as const
