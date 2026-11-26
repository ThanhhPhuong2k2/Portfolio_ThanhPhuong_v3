import type { Project } from "@/content/site";

/**
 * A project's tools for the projects page's cards: plain functions, kept apart from the markup so
 * they can be tested. The data writes a few tools two ways; they are read as one. (The page's
 * technology filter was taken out at the owner's ask; its chips and rules went with it.)
 */

/** One spelling per tool: the data's variants mapped to the name the page shows. */
const ALIASES: Readonly<Record<string, string>> = {
  Tailwind: "Tailwind CSS",
  VNPAY: "VNPay",
};

export function canonicalTech(name: string): string {
  return ALIASES[name] ?? name;
}

/** A tool's key, safe in a CSS attribute value and an id: "Tailwind CSS" -> "tailwind-css". */
export function techKey(name: string): string {
  return canonicalTech(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** A project's tools, each once, in the data's order, with one spelling each. */
export function projectTechs(project: Pick<Project, "tags">): string[] {
  return [...new Set(project.tags.map(canonicalTech))];
}
