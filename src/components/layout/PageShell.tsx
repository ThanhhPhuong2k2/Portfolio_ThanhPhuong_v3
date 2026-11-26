import type { ReactNode } from "react";
import type { Locale } from "@/content/site";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

interface PageShellProps {
  locale: Locale;
  alternateHref: string;
  children: ReactNode;
}

/**
 * The page shell (layout-v4.md, The shell): body renders only header.nav, main and footer.closing.
 * `main#top` is the skip link's target and the logo's "top".
 */
export function PageShell({ locale, alternateHref, children }: PageShellProps) {
  return (
    <>
      <SiteHeader locale={locale} alternateHref={alternateHref} />
      <main id="top">{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
