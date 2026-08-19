'use client'

/**
 * Last-resort boundary, for a throw in the root layout itself.
 *
 * [locale]/error.tsx handles anything inside the locale tree and keeps the
 * navbar and footer around it. This one catches the case where the layout is
 * what failed — so it has to bring its own <html> and <body>, exactly like
 * not-found.tsx does, and it cannot rely on a single thing the layout would
 * normally provide.
 *
 * That means no shared components, no next-intl, no `t()`, and no stylesheet.
 * If any of those were what threw, importing them here turns the boundary into
 * a second crash. Styles are inline for the same reason: the CSS is imported by
 * the layout, and the layout is what is broken.
 *
 * Realistically nobody should ever see this. It exists so that the one time
 * something does go badly wrong, the page still says EID and still offers a way
 * out, rather than showing Next's default black-and-white error screen.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: '#0f172a', background: '#fff' }}>
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ maxWidth: '34rem' }}>
            <div style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b' }}>EID Ltd</div>
            <h1 style={{ margin: '14px 0 0', fontSize: '2rem', lineHeight: 1.2, fontWeight: 700 }}>Something went wrong.</h1>
            <p style={{ margin: '18px 0 0', fontSize: '1rem', lineHeight: 1.6, color: '#475569' }}>
              The site failed to load. This is our fault and it is usually temporary — try again, and if it persists please email{' '}
              <a href="mailto:info@eid-ltd.com" style={{ color: '#2c3c6c' }}>
                info@eid-ltd.com
              </a>{' '}
              and we will pick it up.
            </p>

            <div style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button type="button" onClick={reset} style={{ background: '#2c3c6c', color: '#fff', border: 'none', padding: '14px 24px', font: 'inherit', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                Try again
              </button>
              <a href="/" style={{ border: '1px solid #e2e8f0', padding: '14px 24px', fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>
                Back to home
              </a>
            </div>

            {error.digest && <p style={{ marginTop: '40px', fontFamily: 'ui-monospace, monospace', fontSize: '12px', color: '#94a3b8' }}>Reference: {error.digest}</p>}
          </div>
        </main>
      </body>
    </html>
  )
}
