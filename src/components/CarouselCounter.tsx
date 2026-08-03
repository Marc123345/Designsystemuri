/**
 * Position indicator for every carousel on the site — "01 —— 08".
 *
 * The prev/next arrows on their own say a row can be moved; they do not say how
 * far it runs or how much is left, so a reader has no way to know whether one
 * more swipe or six is coming. This is the same indicator the home hero rail
 * uses, defined once so a second carousel cannot drift from it.
 *
 * Decorative: `aria-hidden`, because Swiper's a11y module and the rail's own
 * per-slide "N of M" already announce position. A screen reader hearing both
 * would get the count twice.
 */
const CarouselCounter = ({ index, total, tone = 'onLight' }: { index: number; total: number; tone?: 'onDark' | 'onLight' }) => {
  const dark = tone === 'onDark'

  return (
    <div aria-hidden="true" className={`flex items-center gap-3 tabular-nums ${dark ? 'text-white' : 'text-default-900'}`}>
      <span className="text-lg">{String(Math.min(index + 1, total)).padStart(2, '0')}</span>
      <span className={`h-px w-10 ${dark ? 'bg-white/40' : 'bg-default-300'}`} />
      <span className={`text-lg ${dark ? 'text-default-300' : 'text-default-500'}`}>{String(total).padStart(2, '0')}</span>
    </div>
  )
}

export default CarouselCounter
