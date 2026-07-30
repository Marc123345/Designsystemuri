import Image from 'next/image'

/**
 * Full-screen loader — the EID logo inside a rotating glow ring, over the site's
 * signature dark band, with a 0–100 readout.
 *
 * Built rather than dropped in from the reference component, which would not
 * work here: it puts its keyframes in a `<style jsx>` block and styled-jsx is
 * not installed, so on App Router with Turbopack that renders an invalid `jsx`
 * prop and the CSS never scopes. The keyframes live in assets/css/_general.css
 * alongside the site's others. Its `dark:` variants and `font-inter` went too —
 * no dark mode is configured and the stack is Mona Sans and Geist.
 *
 * Presentational only. SiteLoader owns the count and decides when this unmounts.
 *
 * Accessibility: the ring and the animated letters are decoration, so they are
 * aria-hidden and the status is announced once through a visually hidden label —
 * otherwise a screen reader reads each letter as its own element. The percentage
 * is exposed as a progressbar so assistive tech gets the value rather than a
 * stream of changing digits.
 */
const Loader = ({ size = 200, text = 'Loading', progress }: { size?: number; text?: string; progress?: number }) => {
  const pct = progress === undefined ? undefined : Math.max(0, Math.min(100, Math.round(progress)))

  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-200 flex flex-col items-center justify-center overflow-hidden">
      <div className="from-default-950 via-default-950 to-primary-3 absolute inset-0 bg-linear-to-br" />
      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-position-[50%] bg-repeat opacity-6" />

      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <div aria-hidden="true" className="eid-loader-ring absolute inset-0 rounded-full" />
        <Image src="/eid/logo-white.png" alt="" width={650} height={221} priority className="relative w-[52%]" />
      </div>

      {pct !== undefined && (
        <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={text} className="relative mt-11 flex w-56 flex-col items-center">
          {/* Tabular figures so the number does not jitter as digit widths
              change, and a fixed min-width so 7 → 100 does not shift the row. */}
          <div className="font-heading flex min-w-[5.5rem] items-baseline justify-center gap-1 text-4xl font-bold text-white tabular-nums">
            {pct}
            <span className="text-primary-1 text-lg font-bold">%</span>
          </div>

          <div className="mt-5 h-px w-full overflow-hidden bg-white/12">
            <div className="bg-primary-1 h-full origin-left transition-transform duration-200 ease-out" style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
        </div>
      )}

      {/* Delay in integer milliseconds, not fractional seconds: i * 0.09 puts
          "0.44999999999999996s" in the DOM by the fifth letter. */}
      <p aria-hidden="true" className="relative mt-7 flex text-[11px] tracking-[0.32em] text-white uppercase">
        {text.split('').map((char, i) => (
          <span key={i} className="eid-loader-letter" style={{ animationDelay: `${i * 90}ms` }}>
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </p>

      <span className="sr-only">{text}</span>
    </div>
  )
}

export default Loader
