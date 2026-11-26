import { seo, type Locale, type Localized } from "@/content/site";

export const locales = ["vi", "en"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "vi";

/** Picks the string (or value) for a locale. */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/**
 * Path for a locale, with the trailing slash next.config sets (`trailingSlash: true`):
 * `/` and `/project/x/` for vi, `/en/` and `/en/project/x/` for en.
 */
export function localePath(locale: Locale, path: string = "/"): string {
  const prefix = seo.pathPrefix[locale];
  const joined = path === "/" ? `${prefix}/` : `${prefix}${path}`;
  return joined.endsWith("/") ? joined : `${joined}/`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "vi" ? "en" : "vi";
}

export function projectPath(locale: Locale, slug: string): string {
  return localePath(locale, `/project/${slug}`);
}

/** The page of all projects: /projects/ and /en/projects/ (the old site had /projects too). */
export function projectsIndexPath(locale: Locale): string {
  return localePath(locale, "/projects");
}
