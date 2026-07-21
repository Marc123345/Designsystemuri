import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on everything except API, Next internals, and files with an extension
  // (so /sitemap.xml, /robots.txt and static assets are left untouched).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
