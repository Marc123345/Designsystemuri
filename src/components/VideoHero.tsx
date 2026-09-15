import { preload } from 'react-dom'

import HeroMark from '@/components/HeroMark'
import HeroTitle from '@/components/HeroTitle'
import ScrollCue from '@/components/ScrollCue'
import { videoSources, videoPoster, posterSrcSet } from '@/components/videoSources'

/**
 * Shared full-bleed video hero.
 *
 * Every video hero now uses the same geometry as the homepage: the same
 * responsive height, centred lockup, title measure, vignette and vertical
 * rhythm. `minHeight` remains accepted temporarily so older call sites do not
 * break, but the component deliberately ignores it — hero height is a system
 * decision now, not a per-page option.
 */
const VideoHero = ({
  title,
  desc,
  video,
  posterAt = 3,
  objectPosition = 'object-[50%_45%]',
  scrollCue = false,
}: {
  title: string
  desc?: string
  video: string
  posterAt?: number
  /** @deprecated Hero height is shared site-wide. */
  minHeight?: string
  objectPosition?: string
  scrollCue?: boolean
}) => {
  const sources = videoSources(video)
  const poster = videoPoster(video, posterAt)

  preload(poster, { as: 'image', fetchPriority: 'high' })

  return (
    <section
      data-note="hero"
      className="eid-hero-shell bg-primary-3 rounded-b-card relative isolate flex w-full items-center overflow-hidden pt-19 lg:pt-24"
    >
      <video
        className={`absolute inset-0 -z-20 size-full object-cover ${objectPosition} motion-reduce:hidden`}
        poster={poster}
        data-hero-video
        loop
        muted
        playsInline
        preload="none"
        disableRemotePlayback
        disablePictureInPicture
        aria-hidden
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} media={s.media} />
        ))}
      </video>

      {/* Reduced-motion users keep the same poster/crop without a layout shift. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`absolute inset-0 -z-20 hidden size-full object-cover ${objectPosition} motion-reduce:block`}
        src={poster}
        srcSet={posterSrcSet(video, posterAt)}
        sizes="100vw"
        alt=""
        aria-hidden
      />

      {/* One shared legibility treatment for every video hero. */}
      <div
        aria-hidden
        className="from-primary-3/90 via-primary-3/34 absolute inset-0 -z-10 bg-linear-to-t via-44% to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 56%, rgba(28, 39, 73, 0.30) 0%, rgba(28, 39, 73, 0.14) 40%, rgba(28, 39, 73, 0) 72%)',
        }}
      />

      <div className="relative z-10 w-full py-12 sm:py-14 lg:-translate-y-1 lg:py-16">
        <div className="container flex flex-col items-center text-center">
          <HeroMark blend={false} />

          <HeroTitle
            title={title}
            className="display mt-3 max-w-[22ch] drop-shadow-[0_2px_18px_rgba(12,18,38,0.24)]"
          />

          {desc && (
            <p className="lead mt-5 max-w-[58ch] text-pretty text-white/82">
              {desc}
            </p>
          )}

          {scrollCue && <ScrollCue className="mt-7 opacity-75 sm:mt-8" />}
        </div>
      </div>
    </section>
  )
}

export default VideoHero
