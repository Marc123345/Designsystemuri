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
 * Exact outer silhouette from Marc's uploaded 113 × 151 vector.
 * These points are the uploaded SVG's outer vertices, normalised to percentages
 * so the photograph crop scales without changing the geometry.
 */
const PRODUCT_CRYSTAL_CLIP =
  'polygon(0.221239% 16.727483%, 0.221239% 86.926490%, 17.477876% 99.840397%, 82.079646% 99.840397%, 99.336283% 86.926490%, 99.336283% 16.727483%, 82.964602% 6.131483%, 49.778761% 0.171222%, 19.247788% 6.793709%)'

const ProductTile = ({ item, sizes }: { item: CurtainItem; sizes: string }) => {
  return (
    <Link
      href={item.href}
      className="group focus-visible:outline-primary block focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <div className="relative mx-auto aspect-[113/151] w-full">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: PRODUCT_CRYSTAL_CLIP, WebkitClipPath: PRODUCT_CRYSTAL_CLIP }}
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={sizes}
            className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015] group-focus-visible:scale-[1.015] ${item.image.position ?? 'object-center'}`}
          />

          {/* Product copy belongs inside the uploaded crystal silhouette.
              It stays visible on touch-sized layouts where hover is unavailable,
              and becomes a hover/focus reveal on desktop. */}
          <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/72 via-black/16 to-transparent px-[10%] pb-[11%] pt-[38%] opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
            <div className="flex w-full items-end justify-between gap-4">
              <div className="min-w-0">
                {item.meta && (
                  <span className="block text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase">
                    {item.meta}
                  </span>
                )}
                <h3 className={`text-[17px] leading-[1.15] font-semibold text-white sm:text-[18px] ${item.meta ? 'mt-2' : ''}`}>
                  {item.title}
                </h3>
              </div>

              <span aria-hidden className="mb-0.5 shrink-0 text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
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

        {/* The uploaded vector itself, unchanged: same 113 × 151 viewBox,
            same path coordinates, same #B3B3B3 stroke and 0.5 stroke width. */}
        <Image
          src="/eid/product-crystal-frame.svg"
          alt=""
          fill
          sizes={sizes}
          unoptimized
          aria-hidden
          className="pointer-events-none object-contain"
        />
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
      <div className={`grid gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-16 ${productGrid}`}>
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
