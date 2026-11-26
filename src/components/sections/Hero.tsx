import Image from "next/image";
import { ctas, hero, person, type Locale } from "@/content/site";
import { localePath, t } from "@/lib/i18n";
import { HeroLogoField } from "./hero-logos/HeroLogoField";
import "./hero.css";

interface HeroProps {
  locale: Locale;
}

/**
 * Hero, laid out after the owner's reference picture (Phase 4, second round): the greeting set
 * wide above, the cut-out portrait in the middle standing on the hero's foot, the availability
 * pill on the left and the speciality line on the right at mid height, "I am Thanh Phuong" (h1)
 * bottom left and the role with the two actions bottom right. Mona Sans carries both voices
 * through its width axis: the greeting wide (125%), the name and role condensed (75%), all at 500.
 * Behind it: the logo field (the page's one effect, a canvas layer) on the dealt bg-topglow.
 */
export function Hero({ locale }: HeroProps) {
  const portrait = hero.portrait;

  return (
    <section className="hero hero--portrait bg-topglow" data-enter aria-labelledby="hero-h" id="home">
      <HeroLogoField />

      <div className="wrap">
        <div className="hero-text hero-portrait">
          <p className="hero-portrait__greeting">{t(hero.greeting, locale)}</p>

          <div className="hero-portrait__figure">
            <Image
              src={portrait.src}
              alt={t(portrait.alt, locale)}
              width={portrait.width}
              height={portrait.height}
              sizes="(max-width: 639px) 300px, (max-width: 1023px) 480px, 640px"
              priority
            />
          </div>

          <p className="pill hero-portrait__pill">
            <span className="status-dot" aria-hidden="true" />
            {t(hero.available, locale)}
          </p>

          <p className="hero__lead hero-portrait__speciality">{t(hero.speciality, locale)}</p>

          <h1 id="hero-h" className="hero-portrait__title">
            {t(hero.title, locale)[0]}
            <br />
            {t(hero.title, locale)[1]}
          </h1>

          <div className="hero-portrait__role">
            <p className="hero-portrait__role-text">{t(person.role, locale)}</p>
            <div className="btn-row">
              <a className="btn btn--primary" href={person.cvUrl} target="_blank" rel="noopener noreferrer">
                {t(ctas.downloadCv, locale)}
                <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path className="m-arrow__stem" d="M1 6h8" />
                  <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              </a>
              <a className="btn btn--secondary" href={`${localePath(locale)}#projects`}>
                {t(ctas.viewProjects, locale)}
              </a>
            </div>
            <p className="hero__proof">
              {/* one fact a line, so neither breaks in the middle */}
              {hero.proof.map((fact) => (
                <span key={fact.en}>{t(fact, locale)}</span>
              ))}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
