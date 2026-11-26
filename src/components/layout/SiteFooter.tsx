import Image from "next/image";
import Link from "next/link";
import { ctas, footer, hero, nav, person, sectionTitles, socials, ui, type Locale } from "@/content/site";
import { localePath, t } from "@/lib/i18n";
import { ContactChannels } from "./ContactChannels";
import { ContactStats } from "./ContactStats";
import "./contact.css";

interface SiteFooterProps {
  locale: Locale;
}

// Static export: the year is the build year.
const year = new Date().getFullYear();

const linkedin = socials.find((s) => s.id === "linkedin");
const github = socials.find((s) => s.id === "github");

/**
 * footer.closing (layout-v4.md): the page's last screen, id="contact" (owner's redesign: no name
 * set large, no link columns).
 * Row 1, the close: the h2 with the availability line and the main action, then the three contact
 * channels as tall cards filling the rest of the screen.
 * Row 2, a slim bar in the mono face: the status dot and the legal line, the section links, the
 * social marks.
 */
export function SiteFooter({ locale }: SiteFooterProps) {
  const home = localePath(locale);
  const sections = nav.filter((n) => n.id !== "contact");
  const tagline = t(person.tagline, locale);

  return (
    <footer className="footer closing footer--statement contact" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta">
          <div className="section-head--split">
            <div className="contact__head">
              <h2 id="close-h">{t(sectionTitles.contact, locale)}</h2>
              <p className="pill contact__status">
                <span className="status-dot" aria-hidden="true" />
                {t(hero.available, locale)}
              </p>
            </div>
            <a className="btn btn--primary" href={person.cvUrl} target="_blank" rel="noopener noreferrer">
              {t(ctas.downloadCv, locale)}
              <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                <path className="m-arrow__stem" d="M1 6h8" />
                <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
              </svg>
            </a>
          </div>
          <ContactChannels locale={locale} />
          <ContactStats locale={locale} />
          {/* the owner's goal from the old site (person.tagline, owner's choice for the close) */}
          <p className="contact__tagline">
            {tagline.before}
            <span className="contact__tagline-mark">{tagline.highlight}</span>
            {tagline.after}
          </p>
        </div>

        <div className="closing__links footer__bar">
          {/* Kept exactly as the old footer (owner's decision). */}
          <p className="footer__legal-line">
            <span className="status-dot" aria-hidden="true" />
            &copy; {year} {footer.copyrightName} {footer.suffix}
          </p>
          {/* a plain list, not a second <nav> landmark beside the header's */}
          <ul className="footer__sections">
            {sections.map((item) => (
              <li key={item.id}>
                <Link href={`${home}#${item.id}`}>{t(item.label, locale)}</Link>
              </li>
            ))}
          </ul>
          <div className="socials" aria-label={t(ui.socials, locale)}>
            {github ? (
              <a href={github.href} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Image className="ic ic-ink" src="/assets/icons/github.svg" alt="" width={20} height={20} unoptimized />
              </a>
            ) : null}
            {linkedin ? (
              <a href={linkedin.href} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Image src="/assets/icons/linkedin.svg" alt="" width={20} height={20} unoptimized />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
