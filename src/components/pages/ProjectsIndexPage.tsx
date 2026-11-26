import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { sectionTitles, ui, type Locale, type Project } from "@/content/site";
import { localePath, otherLocale, projectPath, projectsIndexPath, t } from "@/lib/i18n";
import { projectTechs } from "@/lib/project-filters";
import { orderedProjects } from "@/lib/projects";
import { HeroLogoField } from "@/components/sections/hero-logos/HeroLogoField";
import { PROJECTS_HEAD_LOGOS } from "@/components/sections/hero-logos/logos";
import { TechMark } from "./TechMark";
import "./projects-index.css";

interface ProjectsIndexPageProps {
  locale: Locale;
}

const ordered = orderedProjects();

/** How many tool marks a card shows before "+N". */
const MARKS = 6;

const copy = {
  tech: { vi: "Công nghệ", en: "Tech stack" },
  more: { vi: "công nghệ khác", en: "more" },
} as const;

/**
 * One project (owner's redesign): its screen fills the card; on hover (or keyboard focus) the screen
 * dims and blurs and a band rises from the foot with its name, what it is and its tools (their real
 * marks). On a screen with no hover (a phone, a tablet) the band always shows. The name is the card's
 * link (its ::after covers the card).
 */
function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const id = `pi-${project.slug}`;
  const techs = projectTechs(project);
  const shown = techs.slice(0, MARKS);
  const rest = techs.length - shown.length;
  return (
    <li className="pi-card">
      <article aria-labelledby={id}>
        <Image
          className="pi-card__img"
          src={project.thumb ?? project.cover}
          alt=""
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 640px"
        />
        <div className="pi-card__band">
          <h2 className="pi-card__title" id={id}>
            <Link className="pi-card__link" href={projectPath(locale, project.slug)}>
              {project.title}
            </Link>
          </h2>
          <p className="pi-card__sub">{t(project.subtitle, locale)}</p>
          {shown.length > 0 ? (
            <ul className="pi-card__stack" aria-label={t(copy.tech, locale)}>
              {shown.map((name) => (
                <li key={name} title={name}>
                  <TechMark name={name} className="pi-mark" />
                  <span className="sr-only">{name}</span>
                </li>
              ))}
              {rest > 0 ? (
                <li className="pi-card__more">
                  <span aria-hidden="true">+{rest}</span>
                  <span className="sr-only">
                    {rest} {t(copy.more, locale)}: {techs.slice(MARKS).join(", ")}
                  </span>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>
      </article>
    </li>
  );
}

/**
 * The page of all projects (owner's redesign): the h1 over the home hero's floating logos (the
 * page's one effect, a desktop only), then one even grid, two cards a row (one on a phone), the four
 * the owner leads with first. Static data; with no projects the list is not drawn.
 */
export function ProjectsIndexPage({ locale }: ProjectsIndexPageProps) {
  return (
    <PageShell locale={locale} alternateHref={projectsIndexPath(otherLocale(locale))}>
      <section className="section projects-index" aria-labelledby="projects-index-h">
        {/* the page's one effect (owner's ask): the home hero's floating logos behind the head, a desktop only */}
        <HeroLogoField logos={PROJECTS_HEAD_LOGOS} className="pi-logos" />
        <div className="wrap">
          <p className="projects-index__back">
            <Link className="link" href={localePath(locale)}>
              {t(ui.backHome, locale)}
            </Link>
          </p>
          <div className="section-head">
            <h1 id="projects-index-h">{t(sectionTitles.allProjects, locale)}.</h1>
          </div>

          {ordered.length === 0 ? null : (
            <ul className="pi-list">
              {ordered.map((project) => (
                <ProjectCard key={project.slug} project={project} locale={locale} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageShell>
  );
}
