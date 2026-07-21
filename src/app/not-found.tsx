import { DEFAULT_PAGE_TITLE } from '@/config/constants'
import type { Metadata } from 'next'
import Link from 'next/link'
import '@/assets/css/style.css'

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
          <div className="text-sm uppercase tracking-[0.2em] text-default-500">Error 404</div>
          <h1 className="mt-4 text-5xl font-bold">This page does not exist.</h1>
          <p className="mt-5 text-base text-default-600">
            The link may be out of date. The full catalogue of diamond and CBN products is one click
            away.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-md bg-primary px-6 py-3.75 font-medium text-white"
            >
              Back to home
            </Link>
            <Link
              href="/#products"
              className="rounded-md border border-default-200 px-6 py-3.75 font-medium"
            >
              Browse products
            </Link>
          </div>
        </div>
      </main>
    </body>
  </html>
)

export default NotFound
