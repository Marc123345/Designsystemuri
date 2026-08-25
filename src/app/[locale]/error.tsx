'use client'

/* eslint-disable @next/next/no-html-link-for-pages --
 * Plain anchors here on purpose. The rule wants next/link for internal routes so
 * navigation stays client-side, which is right everywhere except an error
 * boundary: the tree has already thrown, and a client-side transition out of a
 * broken tree keeps the broken tree. A full document load is the recovery.
 *
 * It also avoids importing the i18n navigation helpers. If the failure was in
 * the i18n layer, pulling it back in here is how an error page becomes a second
 * error. The unprefixed paths are still locale-correct in practice — next-intl's
 * middleware reads the NEXT_LOCALE cookie and redirects a German visitor from
 * /contact to /de/contact.
 */

import { ArrowButton } from '@/components/ui'
import { useEffect } from 'react'

/**
 * Error boundary for everything under the locale segment.
 *
 * Without one of these, an unhandled throw in any of the twenty client
 * components on this site drops the visitor onto Next's built-in screen:
 * unstyled, unbranded, "Application error: a client-side exception has
 * occurred", and no way back other than the browser's back button. For a buyer
 * evaluating a supplier, that is the worst possible page to land on.
 *
 * This sits inside the locale layout, so the navbar and footer stay rendered
 * around it. Someone who hits it can carry on to the products, the datasheets or
 * the contact form without reaching for the back button — which is the point:
 * an error state is still a page, and it should still offer a way forward.
 *
 * `reset` re-renders the segment. Worth offering first because a good share of
 * client-side throws are transient — a chunk that failed to fetch, a WebGL
 * context that could not be created on a loaded machine — and retrying costs
 * the visitor nothing.
 *
 * Deliberately not localised through t(). If the failure is in the i18n layer
 * itself, calling into it here is how an error boundary becomes an error loop.
 * English, hardcoded, no imports beyond a button.
 */
export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Nothing is wired up to receive this yet — see docs/qa-open-items.md, the
    // site has no analytics or error reporting at all. Until it does, the
    // console is the only record that this happened, and a digest with no
    // matching log entry is not much of a trail.
    console.error('Page error:', error.digest ?? error.message)
  }, [error])

  return (
    <section className="border-default-200 border-b pt-35 pb-14 lg:pt-50 lg:pb-20">
      <div className="container">
        <div className="max-w-2xl">
          <div className="text-default-500 text-sm tracking-[0.2em] uppercase">Something went wrong</div>
          <h1 className="mt-4 text-[34px] font-bold md:text-[48px] lg:text-6xl">This page did not load properly.</h1>
          <p className="text-default-600 mt-5 text-base">The fault is ours, not yours, and it is usually temporary. Try again first — if it keeps happening, the products and datasheets below are unaffected, and a person will answer if you contact us directly.</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button type="button" onClick={reset} className="bg-primary hover:bg-primary-1 inline-flex items-center px-6 py-3.75 text-[0.9rem] leading-none font-semibold text-white transition-colors">
              Try again
            </button>
            <ArrowButton href="/" label="Back to home" variant="light" />
          </div>

          <p className="text-default-600 mt-8 text-sm">
            Or go straight to{' '}
            <a href="/#products" className="text-primary underline underline-offset-2">
              the product range
            </a>
            ,{' '}
            <a href="/resources/datasheets" className="text-primary underline underline-offset-2">
              the datasheets
            </a>{' '}
            or{' '}
            <a href="/contact" className="text-primary underline underline-offset-2">
              contact us
            </a>
            .
          </p>

          {error.digest && <p className="text-default-400 mt-10 font-mono text-xs">Reference: {error.digest}</p>}
        </div>
      </div>
    </section>
  )
}
