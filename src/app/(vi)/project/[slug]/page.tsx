import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/pages/ProjectPage";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

const LOCALE = "vi";

interface Props {
  params: Promise<{ slug: string }>;
}

// Only the 12 known slugs exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    locale: LOCALE,
    path: `/project/${project.slug}`,
    title: project.title,
    description: t(project.subtitle, LOCALE),
    image: project.cover,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectPage locale={LOCALE} project={project} />;
}
