import '@/assets/css/style.css'
import { DEFAULT_PAGE_TITLE } from '@/config/constants'
import type { Metadata } from 'next'
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
            <Link href="/" className="bg-primary px-6 py-3.75 font-medium text-white">
              Back to home
            </Link>
            <Link href="/#products" className="border-default-200 border px-6 py-3.75 font-medium">
              Browse products
            </Link>
          </div>

          {/* Products and applications are the site's two entry axes, and
              someone who landed here from a stale link may simply want to
              reach a person. A 404 that only offers "home" makes the visitor
              start their search over. */}
          <p className="text-default-600 mt-7 text-sm">
            Or go to{' '}
            <Link href="/applications" className="text-primary underline underline-offset-2">
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
