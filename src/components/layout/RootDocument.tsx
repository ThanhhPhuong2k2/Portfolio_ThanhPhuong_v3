import Script from "next/script";
import type { ReactNode } from "react";
import type { Locale } from "@/content/site";
import { bricolage, geistMono, monaSans } from "@/lib/fonts";

interface RootDocumentProps {
  locale: Locale;
  children: ReactNode;
}

/**
 * Before the first paint: the kit's hero-entrance head line (motion.md) and the moments' guard
 * (starter.html: mo-js now, mo-safe after 2.5 s so nothing a moment hides stays hidden if it fails).
 */
const HEAD_SCRIPT = `(function(){var d=document.documentElement;d.classList.add("m-enter","mo-js");setTimeout(function(){d.classList.add("m-enter-done")},700);setTimeout(function(){d.classList.add("mo-safe")},2500)})();`;

/** Kit stylesheets, in the order layout-v4.md asks; the page tokens come last. */
const KIT_STYLES = [
  "/assets/system.css",
  "/assets/ui/cards.css",
  "/assets/motion/motion.css",
  "/assets/backgrounds/backgrounds.css",
  "/assets/layout/layout.css",
  "/assets/icons/icon.css",
  // the dealt moment's own styles (the journey section, moments.md)
  "/assets/moments/pinned-chapters/moment.css",
  "/site/tokens.css",
] as const;

/** Kit scripts, loaded once after hydration so they never race React for the DOM. */
const KIT_SCRIPTS = ["/assets/system.js", "/assets/motion/motion.js", "/assets/layout/layout.js"] as const;

/**
 * Shared <html>/<body> for both root layouts, so each locale gets its own `lang`.
 * The data-* attributes are the taste-skill deal (.taste-skill/plan.md).
 * suppressHydrationWarning: the head script and the kit set attributes on <html> before hydration.
 */
export function RootDocument({ locale, children }: RootDocumentProps) {
  return (
    <html
      lang={locale}
      data-type="software"
      data-radius="soft"
      data-buttons="solid"
      data-ground="sky"
      // Dark only (owner's decision, Phase 4): the evening grade in tokens.css, from the first byte.
      data-theme="dark"
      data-tone="dark"
      className={`${bricolage.variable} ${monaSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      {/* App Router root layout: a plain <head> is the supported way (next/head is Pages Router only). */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
        {KIT_STYLES.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {/* The grounds' page tokens before the first paint: plain, not deferred (starter.html, backgrounds.md). */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/assets/backgrounds/backgrounds.js" />
      </head>
      <body suppressHydrationWarning>
        {children}
        {KIT_SCRIPTS.map((src) => (
          <Script key={src} src={src} type="module" strategy="afterInteractive" />
        ))}
      </body>
    </html>
  );
}
