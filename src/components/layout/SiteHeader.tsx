import Image from "next/image";
import Link from "next/link";
import {
  ctas,
  displayName,
  nav,
  person,
  projects,
  ui,
  type Locale,
} from "@/content/site";
import { localePath, projectPath, t } from "@/lib/i18n";
import { LocaleSwitch } from "./LocaleSwitch";
import "./header.css";

interface SiteHeaderProps {
  locale: Locale;
  /** The same page in the other language (hreflang pair). */
  alternateHref: string;
}

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);
const othersCols = [
  others.slice(0, Math.ceil(others.length / 2)),
  others.slice(Math.ceil(others.length / 2)),
];
/** The menu card shows the most recent featured project. */
const latest = [...featured].sort((a, b) => b.year.localeCompare(a.year))[0];

/**
 * The bar (owner's redesign): a floating rounded bar centred over the page, the owner's logo at
 * its left, the four words and the main action (an outlined button with its icon) at its right. "Projects" opens the full-width panel (system.md: one word opens a panel on hover).
 * The phone sheet, Escape and aria-expanded come from the kit's system.js (no React state).
 */
export function SiteHeader({ locale, alternateHref }: SiteHeaderProps) {
  const home = localePath(locale);
  // "/#projects" and "/en#projects": works from the home page and from a project page.
  const anchor = (id: string) => `${home}#${id}`;

  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">
          {t(ui.skipLink, locale)}
        </a>
        <Link className="nav__logo" href={home}>
          {/* the owner's logo (public/assets/logo_name_v2.png, trimmed and sized 2x for the bar) */}
          <Image
            className="nav__logo-img"
            src="/site/logo.webp"
            alt={t(displayName, locale)}
            width={204}
            height={112}
            sizes="80px"
            priority
            unoptimized
          />
        </Link>

        <nav className="nav__links" aria-label={t(ui.mainNav, locale)}>
          {nav.map((item) =>
            item.id === "projects" ? (
              <div className="nav__item" key={item.id}>
                <Link className="nav__link" href={anchor(item.id)}>
                  {t(item.label, locale)}
                  <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                    <path
                      d="M3 4.5l3 3 3-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <div className="nav__menu">
                  <div className="wrap grid">
                    <div className="menu-col span-3">
                      <p className="t-label">{t(ui.featured, locale)}</p>
                      {featured.map((p) => (
                        <Link key={p.slug} href={projectPath(locale, p.slug)}>
                          {p.title}
                          <span>{t(p.subtitle, locale)}</span>
                        </Link>
                      ))}
                    </div>
                    {othersCols.map((col, i) => (
                      <div className="menu-col span-3" key={i}>
                        <p
                          className="t-label"
                          aria-hidden={i > 0 ? true : undefined}
                        >
                          {i === 0 ? t(ui.moreProjects, locale) : " "}
                        </p>
                        {col.map((p) => (
                          <Link key={p.slug} href={projectPath(locale, p.slug)}>
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                    {latest ? (
                      <Link
                        className="menu-card span-3 start-10"
                        href={projectPath(locale, latest.slug)}
                      >
                        <div className="panel">
                          <Image
                            className="frame__img"
                            src={latest.thumb ?? latest.cover}
                            alt={latest.title}
                            width={640}
                            height={360}
                            sizes="300px"
                          />
                        </div>
                        <span className="t-card">{latest.title}</span>
                        <span className="t-small muted">
                          {t(latest.subtitle, locale)}
                        </span>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="nav__item" key={item.id}>
                <Link className="nav__link" href={anchor(item.id)}>
                  {t(item.label, locale)}
                </Link>
              </div>
            ),
          )}
        </nav>

        <div className="nav__actions">
          {/* the main action as an outlined button with its icon (owner's choice, header redesign) */}
          <a
            className="btn btn--secondary nav__cta"
            href={person.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="nav__cta-icon"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M8 2.5v7.5M4.75 6.75 8 10l3.25-3.25M3 13h10" />
            </svg>
            {t(ctas.downloadCv, locale)}
          </a>
          {/* the locale switch, at the far right as on the owner's old site (owner's ask) */}
          <LocaleSwitch
            locale={locale}
            alternateHref={alternateHref}
            label={t(ui.switchLocale, locale)}
          />
        </div>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded="false"
          aria-label={t(ui.menu, locale)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M2 5h14M2 13h14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
