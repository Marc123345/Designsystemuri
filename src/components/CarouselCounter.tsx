/** Shared, decorative position indicator for carousels. */
const CarouselCounter = ({ index, total, tone = 'onLight' }: { index: number; total: number; tone?: 'onDark' | 'onLight' }) => {
  const dark = tone === 'onDark'

  return (
    <div aria-hidden="true" className={`small flex items-center gap-3 font-medium tabular-nums ${dark ? 'text-white' : 'text-default-900'}`}>
      <span>{String(Math.min(index + 1, total)).padStart(2, '0')}</span>
      <span className={`h-px w-10 ${dark ? 'bg-white/35' : 'bg-default-300'}`} />
      <span className={dark ? 'text-white/55' : 'text-default-500'}>{String(total).padStart(2, '0')}</span>
    </div>
  )
}

export default CarouselCounter
