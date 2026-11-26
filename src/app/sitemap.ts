import type { MetadataRoute } from "next";
import { seo } from "@/content/site";
import { localePath } from "@/lib/i18n";
import { getProjectSlugs } from "@/lib/projects";

export const dynamic = "force-static";

function entry(path: string): MetadataRoute.Sitemap[number] {
  const abs = (p: string) => new URL(p, seo.siteUrl).toString();
  return {
    url: abs(localePath("vi", path)),
    alternates: {
      languages: {
        vi: abs(localePath("vi", path)),
        en: abs(localePath("en", path)),
      },
    },
  };
}

/** One entry per page (home, all projects, each project) with vi/en hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [entry("/"), entry("/projects"), ...getProjectSlugs().map(({ slug }) => entry(`/project/${slug}`))];
}
