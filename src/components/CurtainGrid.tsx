import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export type CurtainItem = {
  meta?: string
  title: string
  href: string
  image: { src: string; alt: string; position?: string }
}

const CURTAIN = 'cubic-bezier(0.24,0.74,0.58,1)'

/**
 * Outer silhouette of Marc's uploaded 113 × 151 crystal vector, with the
 * corners rounded (r = 7 units). Same path as the outline in
 * public/eid/product-crystal-frame.svg — change both together.
 *
 * Applied as a mask rather than clip-path: polygon() can't curve, and
 * clip-path: path() is in pixels so it wouldn't scale with the tile. A mask
 * image stretched to 100% 100% scales with it.
 */
const PRODUCT_CRYSTAL_PATH =
  'M0.25 32.258 L0.25 124.258 Q0.25 131.258 5.2 136.208 L14.8 145.809 Q19.75 150.758 26.75 150.758 L85.75 150.758 Q92.75 150.758 97.7 145.809 L107.3 136.208 Q112.25 131.258 112.25 124.258 L112.25 32.258 Q112.25 25.259 106.955 20.679 L99.045 13.838 Q93.75 9.258 86.943 7.625 L63.057 1.892 Q56.25 0.259 49.527 2.207 L28.473 8.31 Q21.75 10.258 16.009 14.264 L5.991 21.253 Q0.25 25.259 0.25 32.258 Z'

const PRODUCT_CRYSTAL_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 113 151' preserveAspectRatio='none'><path d='${PRODUCT_CRYSTAL_PATH}'/></svg>`
)}")`

const CRYSTAL_MASK_STYLE = {
  maskImage: PRODUCT_CRYSTAL_MASK,
  WebkitMaskImage: PRODUCT_CRYSTAL_MASK,
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
} as const

const ProductTile = ({ item, sizes }: { item: CurtainItem; sizes: string }) => {
  return (
    <Link
      href={item.href}
      className="group focus-visible:outline-primary block focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <div className="relative mx-auto aspect-[113/151] w-full">
        <div
          className="absolute inset-0 overflow-hidden"
          style={CRYSTAL_MASK_STYLE}
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={sizes}
            className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015] group-focus-visible:scale-[1.015] ${item.image.position ?? 'object-center'}`}
          />

          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[38%] bg-linear-to-t from-black/22 via-black/5 to-transparent"
          />
        </div>

        {/* Exact uploaded crystal vector remains the visible frame. */}
        <Image
          src="/eid/product-crystal-frame.svg"
          alt=""
          fill
          sizes={sizes}
          unoptimized
          aria-hidden
          className="pointer-events-none object-contain"
        />

        {/* Permanent product identity. There is no opacity/hover reveal here:
            every product name and arrow are visible at every breakpoint. */}
        <div className="absolute inset-x-[7.5%] bottom-[7.5%] z-10">
          <div className="bg-primary-3 flex min-h-[92px] items-center justify-between gap-3 rounded-[16px] border border-white/20 px-4 py-4 text-white shadow-[0_12px_30px_rgba(15,24,52,0.22)] transition-transform duration-300 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 sm:min-h-[98px] sm:px-5">
            <div className="min-w-0 flex-1">
              {item.meta && (
                <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.18em] text-white/68 uppercase sm:text-[11px]">
                  {item.meta}
                </span>
              )}
              <h3 className="flex min-h-[3.45em] items-center text-[16px] leading-[1.15] font-semibold text-white sm:text-[18px]">
                {item.title}
              </h3>
            </div>

            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full border border-white/30 text-white transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-4 4l4-4m-4-4l4 4" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const Tile = ({
  item,
  index,
  open,
  sizes,
  revealed,
  numbered,
  aspect,
  cell = '',
}: {
  item: CurtainItem
  index: number
  open: boolean
  sizes: string
  revealed: boolean
  numbered: boolean
  aspect: string
  cell?: string
}) => {
  const n = String(index + 1).padStart(2, '0')
  const ink = revealed
    ? 'text-white'
    : 'text-white lg:text-default-900 lg:group-hover:text-white lg:group-focus-visible:text-white'
  const inkDim = revealed
    ? 'text-white/70'
    : 'text-white/70 lg:text-default-500 lg:group-hover:text-white/70 lg:group-focus-visible:text-white/70'
  const shown = revealed
    ? 'opacity-100'
    : 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100'

  return (
    <Link
      href={item.href}
      data-open={!revealed && open ? true : undefined}
      className={`group focus-visible:outline-primary rounded-card relative block ${aspect} ${cell} overflow-hidden bg-white focus-visible:outline-2 focus-visible:outline-offset-2`}
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes={sizes}
        className={`object-cover ${item.image.position ?? 'object-center'}`}
      />

      <span
        aria-hidden
        className="from-default-950/90 via-default-950/35 absolute inset-0 bg-linear-to-t to-transparent to-70%"
      />

      {numbered && (
        <span aria-hidden className="from-default-950/70 absolute inset-0 bg-linear-to-b to-transparent to-45%" />
      )}

      {!revealed && (
        <span
          aria-hidden
          className="eid-curtain absolute inset-0 origin-center scale-y-0 bg-white transition-transform duration-500 lg:scale-y-100 lg:group-hover:scale-y-0 lg:group-focus-visible:scale-y-0"
          style={{ transitionTimingFunction: CURTAIN }}
        />
      )}

      <div className="absolute inset-0 flex flex-col justify-end p-7 lg:p-8">
        {numbered && !revealed && (
          <span
            aria-hidden
            className="eid-num-rest absolute end-6 top-6 hidden text-[92px] leading-none font-bold text-transparent transition-opacity duration-500 lg:end-8 lg:top-7 lg:block lg:text-[118px]"
            style={{ WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'rgba(44,60,108,0.22)' }}
          >
            {n}
          </span>
        )}

        {numbered && (
          <span
            aria-hidden
            className={`eid-num-over absolute end-6 top-6 text-[92px] leading-none font-bold text-transparent transition-opacity duration-500 lg:end-8 lg:top-7 lg:text-[118px] ${shown}`}
            style={{ WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'rgba(255,255,255,0.9)' }}
          >
            {n}
          </span>
        )}

        {item.meta && (
          <span className={`eid-ink-dim relative text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${inkDim}`}>
            {item.meta}
          </span>
        )}

        <h3
          className={`eid-ink relative text-2xl leading-[1.15] transition-colors duration-500 lg:text-[30px] ${ink} ${item.meta ? 'mt-3' : ''}`}
        >
          {item.title}
        </h3>

        <span
          aria-hidden
          className={`eid-arrow relative mt-6 inline-flex items-center gap-3 text-white transition-opacity duration-500 ${shown}`}
        >
          <span className="h-px w-8 bg-white/60" />
          <svg
            viewBox="0 0 24 24"
            className="size-5 transition-transform duration-500 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14m-4 4l4-4m-4-4l4 4" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

const CurtainGrid = ({
  items,
  columns = 3,
  revealed = false,
  numbered = false,
  aspect = 'portrait',
  bento,
  sizes,
}: {
  items: CurtainItem[]
  columns?: 3 | 4
  revealed?: boolean
  numbered?: boolean
  aspect?: 'portrait' | 'landscape'
  bento?: { span: string; minHeight: string }[]
  sizes?: string
}) => {
  const isProductGrid = items.length > 0 && items.every((item) => item.href.startsWith('/products/'))

  if (isProductGrid) {
    const productGrid =
      items.length === 5
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
        : columns === 4
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

    const productSizes =
      sizes ??
      (items.length === 5
        ? '(min-width: 1280px) 19vw, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw'
        : columns === 4
          ? '(min-width: 1024px) 23vw, (min-width: 640px) 48vw, 100vw'
          : '(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw')

    return (
      <div className={`grid items-start gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-16 ${productGrid}`}>
        {items.map((item) => (
          <ProductTile key={item.href} item={item} sizes={productSizes} />
        ))}
      </div>
    )
  }

  const auto =
    columns === 4
      ? '(min-width: 1024px) 23vw, (min-width: 768px) 50vw, 100vw'
      : '(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw'
  const ratio = aspect === 'landscape' ? 'aspect-4/3' : 'aspect-3/4'
  const cellFor = (i: number) => (bento?.[i] ? `${bento[i].span} ${bento[i].minHeight} lg:aspect-auto` : '')

  const sizeFor = (i: number) => {
    if (sizes) return sizes
    if (!bento?.[i]) return auto
    const n = Number(bento[i].span.match(/(\d+)$/)?.[1] ?? 4)
    const px = Math.round(n * 86.33 + (n - 1) * 24)
    return `(min-width: 1420px) ${px}px, (min-width: 1024px) ${Math.round((95 * n) / 12)}vw, (min-width: 768px) 50vw, 100vw`
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${revealed ? '' : 'eid-tiles'} ${bento ? 'lg:grid-cols-12' : columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}
    >
      {items.map((item, i) => (
        <Tile
          key={item.href}
          item={item}
          index={i}
          open={i === 0}
          sizes={sizeFor(i)}
          revealed={revealed}
          numbered={numbered}
          aspect={ratio}
          cell={cellFor(i)}
        />
      ))}
    </div>
  )
}

export default CurtainGrid
