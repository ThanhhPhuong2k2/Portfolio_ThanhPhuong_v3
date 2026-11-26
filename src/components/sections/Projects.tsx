import Image from "next/image";
import Link from "next/link";
import { ctas, projects, sectionTitles, type Locale } from "@/content/site";
import { projectPath, projectsIndexPath, t } from "@/lib/i18n";
import { PauseWhenHidden } from "@/components/effects/PauseWhenHidden";
import "./projects.css";

interface ProjectsProps {
  locale: Locale;
}

/** Every project, featured first, dealt into three columns (four each). */
const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
const COLUMNS = 3;
const columns = Array.from({ length: COLUMNS }, (_, c) => ordered.filter((_, i) => i % COLUMNS === c));

const copy = {
  count: { vi: "dự án, từ 2022 đến nay.", en: "projects, 2022 to today." },
} as const;

/**
 * Projects on the landing page (owner's reference picture and asks, Phase 5): one screen, the h2
 * and one lit frame in which three columns of the projects' own screens run up and down without
 * end (the first and third up, the second down), pausing under the pointer and the keyboard focus (no pause disc: owner's decision, Phase 5),
 * still under reduced motion. Each screen opens its project; the pill opens the page of all projects.
 * No caption on any picture (house rule 1): each link is named by its project.
 */
export function Projects({ locale }: ProjectsProps) {
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-h">
      {/* the wall runs only while the section is in view (performance audit) */}
      <PauseWhenHidden />
      <div className="wrap">
        <div className="section-head">
          <h2 id="projects-h">
            {t(sectionTitles.projects, locale)}.{" "}
            <span className="muted projects__count">
              {projects.length} {copy.count[locale]}
            </span>
          </h2>
        </div>

        <div className="frame projects__wall" data-visual>
          {/* .stage: the kit's layer inside a frame whose children are placed absolutely (cards.css) */}
          <div className="stage projects__stage">
            <div className="projects__cols">
              {columns.map((column, c) => (
                <div className="projects__col" key={c}>
                  {/* the track holds the column twice, so moving it by half loops without a seam;
                      the second copy is hidden from assistive tech and the tab order */}
                  <ul className="projects__track">
                    {[0, 1].map((copyIndex) =>
                      column.map((project) => (
                        <li key={`${copyIndex}-${project.slug}`} aria-hidden={copyIndex === 1 ? true : undefined}>
                          <Link
                            className="projects__shot"
                            href={projectPath(locale, project.slug)}
                            aria-label={`${project.title}: ${t(project.subtitle, locale)}`}
                            tabIndex={copyIndex === 1 ? -1 : undefined}
                            // no prefetch (performance audit): 24 links in view at once, and the static
                            // export's segment files are not served under the names the prefetch asks for
                            prefetch={false}
                          >
                            <Image
                              src={project.thumb ?? project.cover}
                              alt=""
                              fill
                              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 420px"
                            />
                          </Link>
                        </li>
                      )),
                    )}
                  </ul>
                </div>
              ))}
            </div>

            {/* the page's secondary button (one button pair a page), floating over the wall */}
            <Link className="btn btn--secondary projects__pill" href={projectsIndexPath(locale)}>
              {t(ctas.viewAllProjects, locale)}
              <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                <path
                  d="M1.5 6h8M6 2.5 9.5 6 6 9.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
