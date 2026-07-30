import Image from 'next/image'

/**
 * Full-screen loader — the EID logo inside a rotating glow ring.
 *
 * Built rather than dropped in from the reference component, because that one
 * would not work here: it puts its keyframes in a `<style jsx>` block, and
 * styled-jsx is not installed in this project. On App Router with Turbopack that
 * renders an invalid `jsx` prop on a <style> tag and the CSS never scopes. The
 * keyframes therefore live in assets/css/_general.css alongside the site's
 * others, and the classes here are plain. Its `dark:` variants and `font-inter`
 * were dropped too — there is no dark mode configured and the type stack is
 * Mona Sans and Geist.
 *
 * The panel is the site's signature dark band rather than a generic gradient, so
 * a slow route still looks like EID rather than like a spinner someone bolted on.
 *
 * Accessibility: the ring and the animated letters are decoration. The status is
 * announced once via a visually hidden label, so a screen reader hears "Loading"
 * rather than each letter as a separate element.
 */
const Loader = ({ size = 200, text = 'Loading' }: { size?: number; text?: string }) => (
  <div role="status" aria-live="polite" className="fixed inset-0 z-200 flex flex-col items-center justify-center overflow-hidden">
    <div className="from-default-950 via-default-950 to-primary-3 absolute inset-0 bg-linear-to-br" />
    <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-position-[50%] bg-repeat opacity-6" />

    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div aria-hidden="true" className="eid-loader-ring absolute inset-0 rounded-full" />
      <Image src="/eid/logo-white.png" alt="" width={650} height={221} priority className="relative w-[52%]" />
    </div>

    {/* Delay is set in integer milliseconds, not fractional seconds: i * 0.09
        puts "0.44999999999999996s" in the DOM by the fifth letter. */}
    <p aria-hidden="true" className="relative mt-12 flex text-[11px] tracking-[0.32em] text-white uppercase">
      {text.split('').map((char, i) => (
        <span key={i} className="eid-loader-letter" style={{ animationDelay: `${i * 90}ms` }}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </p>

    <span className="sr-only">{text}</span>
  </div>
)

export default Loader
