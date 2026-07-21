import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation primitives. <Link href="/products" /> automatically
// keeps the active locale prefix; useful for the header, footer and switcher.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
