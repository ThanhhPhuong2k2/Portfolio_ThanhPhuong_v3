import type { Metadata } from "next";
import { ProjectsIndexPage } from "@/components/pages/ProjectsIndexPage";
import { sectionTitles } from "@/content/site";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "vi",
  path: "/projects",
  title: t(sectionTitles.allProjects, "vi"),
});

export default function Page() {
  return <ProjectsIndexPage locale="vi" />;
}
