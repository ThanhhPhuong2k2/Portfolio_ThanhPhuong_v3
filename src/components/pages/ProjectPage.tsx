import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { sectionTitles, ui, type Locale, type Project } from "@/content/site";
import { otherLocale, projectPath, projectsIndexPath, t } from "@/lib/i18n";
import { projectTechs } from "@/lib/project-filters";
import { galleryScreens, linkHost, otherProjects } from "@/lib/projects";
import { HeroLogoField } from "@/components/sections/hero-logos/HeroLogoField";
import type { FieldLogo } from "@/components/sections/hero-logos/logos";
import { TECH_ICONS } from "@/lib/tech-icons";
import { FeatureList } from "./FeatureList";
import { MoreProjects, type MoreProjectCard } from "./MoreProjects";
import { ProjectGallery } from "./ProjectGallery";
import { TechMark } from "./TechMark";
import "./project-page.css";

interface ProjectPageProps {
  locale: Locale;
  project: Project;
}

/** The head's logo field: eight places at the right of the name; the project's own tools fill them. */
const SLOTS: readonly Omit<FieldLogo, "file" | "ink">[] = [
  { x: 60, y: 22, s: 40, p: 0 },
  { x: 74, y: 10, s: 32, p: 0.35 },
  { x: 88, y: 26, s: 44, p: 0.7 },
  { x: 67, y: 46, s: 30, p: 0.15 },
  { x: 81, y: 52, s: 36, p: 0.5 },
  { x: 95, y: 58, s: 28, p: 0.85 },
  { x: 54, y: 60, s: 26, p: 0.62 },
  { x: 92, y: 8, s: 24, p: 0.25 },
];
/** Marks drawn in black: shown white on the dark page. */
const INK = new Set(["nextjs.svg", "express.svg", "prisma.svg", "kafka.svg", "socket.io.svg", "openai.svg", "github.svg"]);

/** The project's tools that have a local mark, placed in the head's slots. */
function headLogos(techs: readonly string[]): FieldLogo[] {
  const files = techs
    .map((name) => TECH_ICONS[name] ?? TECH_ICONS[name.replace(/\.js$/, "JS")])
    .filter((src): src is string => Boolean(src?.startsWith("/assets/icons/")))
    .map((src) => src.replace("/assets/icons/", ""));
  return [...new Set(files)].slice(0, SLOTS.length).map((file, i) => ({ file, ink: INK.has(file), ...SLOTS[i]! }));
}

function Arrow({ dir }: { dir: "out" | "left" }) {
  const d = dir === "out" ? "M3 9 9 3M4.5 3H9v4.5" : "M7.5 3 4.5 6l3 3M4.5 6H10";
  return (
    <svg className="pd-arrow" viewBox="0 0 12 12" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/**
 * A project's page as a case study (owner's reference layout): the name, the visit button and the
 * screens all on the first screen.
 *  1. the head: back to all projects; the name set large and what it is, as a tag; under them two
 *     columns on the 12-column grid (owner's ask): on seven, the screens as one large slide with
 *     arrows, a count, "view all" and a row of thumbnails (ProjectGallery: one screen shows alone);
 *     on five, the overview, the facts (year, role, tools as real marks) and the visit button
 *     (naming where it leads, its host);
 *  2. the key features: the heading held at the left, a numbered list parted by hairlines at the
 *     right (FeatureList);
 *  3. more projects: four others, a new random four on every page load (MoreProjects).
 * A link marked expired shows no visit button.
 */
/** How many other projects the page's foot shows (owner's ask). */
const MORE_COUNT = 4;

export function ProjectPage({ locale, project }: ProjectPageProps) {
  const live = project.link && !project.linkExpired ? project.link : null;
  const host = live ? linkHost(live) : null;
  const techs = projectTechs(project);
  const features = t(project.features, locale);
  const screens = galleryScreens(project).map((src, i) => ({ src, alt: `${project.title}, ${i + 1}` }));
  const logos = headLogos(techs);
  // every other project as plain, localised card data: the client component shuffles them per load
  const more: MoreProjectCard[] = otherProjects(project.slug).map((p) => ({
    slug: p.slug,
    href: projectPath(locale, p.slug),
    title: p.title,
    subtitle: t(p.subtitle, locale),
    image: p.thumb ?? p.cover,
  }));

  return (
    <PageShell locale={locale} alternateHref={projectPath(otherLocale(locale), project.slug)}>
      {/* 1. the head, the screens and the facts; it enters once on load (the kit's motion layer, data-enter) */}
      <section className="section hero pd-hero" data-enter aria-labelledby="pd-title">
        {/* the page's one effect (owner's ask): the project's own tools floating behind its head, a desktop only */}
        {logos.length > 0 ? <HeroLogoField logos={logos} className="pd-logos" /> : null}
        <div className="wrap">
          <p className="pd-back">
            <Link className="link" href={projectsIndexPath(locale)}>
              <Arrow dir="left" />
              {t(sectionTitles.allProjects, locale)}
            </Link>
          </p>
          <div className="pd-head">
            <h1 id="pd-title">{project.title}</h1>
            <p className="pd-tag">{t(project.subtitle, locale)}</p>
          </div>
          {/* the screens on seven of the grid's twelve columns, the overview, the facts and the visit
              button on the other five (owner's ask); stacked, the screens first, under 1024px */}
          <div className="pd-split">
            <ProjectGallery
              screens={screens}
              labels={{
                open: t(ui.openScreen, locale),
                close: t(ui.closeViewer, locale),
                prev: t(ui.prevScreen, locale),
                next: t(ui.nextScreen, locale),
                viewAll: t(ui.viewAllScreens, locale),
                all: t(ui.screens, locale),
              }}
            />
            <div className="pd-aside">
              <h2 id="pd-overview">{t(ui.overview, locale)}</h2>
              <p className="pd-overview">{t(project.description, locale)}</p>
              <dl className="pd-facts">
                <div>
                  <dt>{t(ui.year, locale)}</dt>
                  <dd>{project.year}</dd>
                </div>
                <div>
                  <dt>{t(ui.role, locale)}</dt>
                  <dd>{t(project.role, locale)}</dd>
                </div>
                <div className="pd-facts__stack">
                  <dt>{t(ui.stack, locale)}</dt>
                  <dd>
                    <ul>
                      {techs.map((name) => (
                        <li key={name}>
                          <TechMark name={name} className="pd-mark" />
                          {name}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
              {live ? (
                <a className="btn btn--primary pd-visit" href={live} target="_blank" rel="noopener noreferrer">
                  {t(ui.visitProject, locale)}
                  <Arrow dir="out" />
                  {/* where the button leads (owner's ask: a link may be a post, not the product's site) */}
                  {host ? <span className="pd-visit__host">{host}</span> : null}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 2. the key features (when the project lists any): the heading held at the left, the list at
          the right (owner's choice) */}
      {features.length > 0 ? (
        <section className="section bg-dusk pd-body" aria-labelledby="pd-features">
          <div className="wrap">
            <FeatureList title={t(ui.keyFeatures, locale)} headingId="pd-features" features={features} />
          </div>
        </section>
      ) : null}


      {/* 3. more projects: four others, shuffled per page load (owner's ask); left out when there are none */}
      {more.length > 0 ? (
        <section className="section bg-band pd-near" aria-labelledby="pd-more">
          <div className="wrap">
            <MoreProjects
              currentSlug={project.slug}
              candidates={more}
              count={MORE_COUNT}
              labels={{ title: t(ui.moreProjectsNav, locale), all: t(sectionTitles.allProjects, locale) }}
              allHref={projectsIndexPath(locale)}
              headingId="pd-more"
            />
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
