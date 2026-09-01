import '@/assets/css/style.css'
import { DEFAULT_PAGE_TITLE } from '@/config/constants'
import type { Metadata } from 'next'
import { ArrowButton } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Page not found | ${DEFAULT_PAGE_TITLE}`,
  robots: 'noindex, follow',
}

/**
 * Global 404. It carries its own <html>/<body> because the app has no root
 * layout — the locale segment owns that, and an unmatched URL never reaches it.
 */
const NotFound = () => (
  <html lang="en">
    <body className="antialiased">
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="text-default-500 text-sm tracking-[0.2em] uppercase">Error 404</div>
          <h1 className="mt-4 text-5xl font-bold">This page does not exist.</h1>
          <p className="text-default-600 mt-5 text-base">The link may be out of date. The full catalogue of diamond and CBN products is one click away.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            {/* ⚠ `external` ON TWO INTERNAL LINKS, AND IT IS LOAD-BEARING.
                ArrowButton normally renders next-intl's locale-aware Link,
                which reads the locale from context — and this file sits OUTSIDE
                app/[locale], with its own <html> and no NextIntlClientProvider
                above it. The localised Link would throw here. `external` is the
                switch that renders a plain <a>, which is exactly right for a
                404 that has no locale to preserve.

                They were square solids with no motion: the only two CTAs on the
                site still wearing the pre-ArrowButton shape. */}
            <ArrowButton href="/" label="Back to home" external />
            <ArrowButton href="/#products" label="Browse products" variant="light" external />
          </div>

          {/* Products and applications are the site's two entry axes, and
              someone who landed here from a stale link may simply want to
              reach a person. A 404 that only offers "home" makes the visitor
              start their search over. */}
          <p className="text-default-600 mt-7 text-sm">
            Or go to{' '}
            <Link href="/#applications" className="text-primary underline underline-offset-2">
              applications
            </Link>{' '}
            or{' '}
            <Link href="/contact" className="text-primary underline underline-offset-2">
              contact us
            </Link>
            .
          </p>
        </div>
      </main>
    </body>
  </html>
)

export default NotFound
