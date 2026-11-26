import localFont from "next/font/local";

/*
  Self-hosted, subset fonts (performance audit, phone pass). From Google Fonts each face came in three
  files (latin, vietnamese and latin-ext); latin-ext was downloaded too, since its range overlaps the
  Vietnamese letters (ă, đ, ơ, ư), about 412 KB in all. Here each face is ONE variable WOFF2 holding
  Google's latin + vietnamese characters (and the arrows the page sets), its weight axis trimmed to
  what the page uses: about 274 KB in all.

  Made from the official variable fonts (github.com/google/fonts, OFL) with fontTools
  (instancer to trim the axes, pyftsubset to keep the characters); licences beside them in src/fonts.
  Remake them after adding text in another script or new symbols.

  next/font/local still preloads each file, sets font-display: swap and builds a metric-matched
  fallback (no layout shift while the face loads).
*/

/**
 * Bricolage Grotesque: the display face for the large type (owner's choice, Phase 4): optical size
 * 12-96, width 75-100 (font-stretch), weight 400-700.
 */
export const bricolage = localFont({
  src: "../fonts/bricolage-grotesque.woff2",
  variable: "--font-bricolage",
  display: "swap",
  weight: "400 700",
  style: "normal",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
  adjustFontFallback: "Arial",
});

/** Mona Sans: the text face, width 100-125 (font-stretch), weight 400-700. */
export const monaSans = localFont({
  src: "../fonts/mona-sans.woff2",
  variable: "--font-mona",
  display: "swap",
  weight: "400 700",
  style: "normal",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
  adjustFontFallback: "Arial",
});

/** Geist Mono: labels, code, small technical text, weight 400-600. */
export const geistMono = localFont({
  src: "../fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "400 600",
  style: "normal",
  adjustFontFallback: false,
});
