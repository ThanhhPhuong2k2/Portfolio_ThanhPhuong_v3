import type { Metadata, Viewport } from "next";
import { seo, type Locale } from "@/content/site";
import { localePath } from "@/lib/i18n";

interface PageMetaInput {
  locale: Locale;
  /** Locale-free path, e.g. "/" or "/project/lani". */
  path: string;
  title?: string;
  description?: string;
  image?: string;
}

/** Bilingual metadata: canonical, hreflang alternates, Open Graph and Twitter. */
export function buildMetadata({ locale, path, title, description, image }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} | ${seo.title[locale]}` : seo.title[locale];
  const desc = description ?? seo.description[locale];
  const url = localePath(locale, path);
  const ogImage = image
    ? { url: image }
    : { url: seo.ogImage.url, width: seo.ogImage.width, height: seo.ogImage.height };

  return {
    metadataBase: new URL(seo.siteUrl),
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        [seo.hreflang.vi]: localePath("vi", path),
        [seo.hreflang.en]: localePath("en", path),
        "x-default": localePath("vi", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: seo.title[locale],
      title: fullTitle,
      description: desc,
      url,
      locale: seo.ogLocale[locale],
      alternateLocale: [seo.ogLocale[locale === "vi" ? "en" : "vi"]],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage.url],
    },
    // taste-skill page kind metas (SKILL.md section 1).
    other: {
      "page-type": "software",
      "site-kind": "software",
    },
  };
}

/** viewport-fit=cover (system.md, Base) and theme-color per grade (system.md, Head). */
export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Dark only: the page ground (tokens.css evening grade).
  themeColor: "#060912",
  colorScheme: "dark",
};
