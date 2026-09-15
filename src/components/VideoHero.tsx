import { preload } from 'react-dom'

import HeroMark from '@/components/HeroMark'
import HeroTitle from '@/components/HeroTitle'
import ScrollCue from '@/components/ScrollCue'
import { videoSources, videoPoster, posterSrcSet } from '@/components/videoSources'

/**
 * Shared full-bleed video hero.
 *
 * Home is the only hero that carries the scroll cue, so that flag also gives us
 * a safe way to tune the homepage composition without changing the shorter
 * interior heroes. The home version gets a little more breathing room, a
 * narrower optical text measure, and a softer layered vignette behind the
 * lockup. The result stays centred, but no longer feels like every element is
 * competing for the exact middle of the frame.
 */
const VideoHero = ({
  title,
  desc,
  video,
  posterAt = 3,
  minHeight = 'min-h-[60svh]',
  objectPosition = 'object-[50%_45%]',
  scrollCue = false,
}: {
  title: string
  desc?: string
  video: string
  posterAt?: number
  minHeight?: string
  objectPosition?: string
  scrollCue?: boolean
}) => {
  const sources = videoSources(video)
  const poster = videoPoster(video, posterAt)
  const isHomeHero = scrollCue

  /* The poster is the hero's LCP element. A video poster is normally fetched
     at low priority, so preload it as an image and let the film remain idle
     until SiteIntro/releaseHeroVideo releases it. */
  preload(poster, { as: 'image', fetchPriority: 'high' })

  const heroHeight = isHomeHero
    ? `${minHeight} md:min-h-[64svh] xl:min-h-[66svh]`
    : minHeight

  return (
    <section
      data-note="hero"
      className={`bg-primary-3 rounded-b-card relative isolate flex w-full items-center overflow-hidden pt-19 lg:pt-24 ${heroHeight}`}
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

      {/* Vertical legibility gradient. It is intentionally darkest only where
          the copy lives, leaving the upper film largely untouched. */}
      <div
        aria-hidden
        className="from-primary-3/92 via-primary-3/38 absolute inset-0 -z-10 bg-linear-to-t via-42% to-transparent"
      />

      {/* Home gets a very soft centred vignette rather than a rectangular wash.
          This gives the title a stable visual ground as the laboratory footage
          changes while keeping the edges of the film open and cinematic. */}
      {isHomeHero && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 50% 58%, rgba(28, 39, 73, 0.34) 0%, rgba(28, 39, 73, 0.16) 38%, rgba(28, 39, 73, 0) 72%)',
          }}
        />
      )}

      <div
        className={`relative z-10 w-full ${
          isHomeHero ? 'py-12 sm:py-14 lg:-translate-y-1 lg:py-16' : 'py-14'
        }`}
      >
        <div className="container flex flex-col items-center text-center">
          <HeroMark blend={false} />

          <HeroTitle
            title={title}
            className={`mt-2 drop-shadow-[0_2px_18px_rgba(12,18,38,0.28)] ${
              isHomeHero
                ? 'max-w-[24ch] text-[clamp(2rem,4.6vw,3.75rem)]'
                : 'text-[clamp(1.9rem,4.4vw,3.5rem)]'
            }`}
          />

          {desc && (
            <p className="mt-6 max-w-[64ch] text-[0.95rem] leading-relaxed text-pretty text-white/85 md:text-base">
              {desc}
            </p>
          )}

          {scrollCue && <ScrollCue className="mt-8 opacity-80 sm:mt-9" />}
        </div>
      </div>
    </section>
  )
}

export default VideoHero
