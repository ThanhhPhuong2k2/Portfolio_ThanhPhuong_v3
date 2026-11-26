import { projects, type Project } from "@/content/site";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): { slug: string }[] {
  return projects.map((project) => ({ slug: project.slug }));
}

/** The four the owner leads with, in the owner's order (the projects page and the project pages). */
export const LEAD_SLUGS = ["risegate-asset-tokenization-platform", "on-toeic", "tokenmall", "thuc-pham-quang-da"];

/** Every project in the site's order: the four the owner leads with, then the rest as in the data. */
export function orderedProjects(list: readonly Project[] = projects): Project[] {
  const lead = LEAD_SLUGS.map((slug) => list.find((p) => p.slug === slug)).filter((p): p is Project => Boolean(p));
  return [...lead, ...list.filter((p) => !LEAD_SLUGS.includes(p.slug))];
}

/**
 * Every project but one, in the site's order starting just after it and wrapping round: the build's
 * fixed pick for "more projects" is its first few (the page then shuffles them in the browser).
 * An unknown slug gives every project in the site's order.
 */
export function otherProjects(slug: string, list: readonly Project[] = projects): Project[] {
  const order = orderedProjects(list);
  const i = order.findIndex((p) => p.slug === slug);
  if (i < 0) return order;
  return [...order.slice(i + 1), ...order.slice(0, i)];
}

/**
 * A shuffled copy (Fisher-Yates); the input is left as it is. `random` returns a number in [0, 1)
 * and is injectable for tests.
 */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/** A link's host for the visit button ("https://www.lanivn.com/vi" -> "lanivn.com"); null if it is no URL. */
export function linkHost(link: string): string | null {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * A project's screens for its product tour: the cover first, then the gallery, each once. The tour
 * shows when there are two or more.
 */
export function galleryScreens(project: Pick<Project, "cover" | "gallery">): string[] {
  return [...new Set([project.cover, ...project.gallery])];
}
