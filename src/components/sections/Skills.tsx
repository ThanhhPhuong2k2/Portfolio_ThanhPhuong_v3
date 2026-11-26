import type { CSSProperties } from "react";
import {
  sectionTitles,
  skillCategoryLabels,
  skills,
  type Locale,
  type Skill,
  type SkillCategory,
} from "@/content/site";
import { t } from "@/lib/i18n";
import { PauseWhenHidden } from "@/components/effects/PauseWhenHidden";
import { TECH_ICONS, WIDE_ICONS, initials } from "@/lib/tech-icons";
import "./skills.css";

interface SkillsProps {
  locale: Locale;
}


/** Three rings, inside out (owner's choice): Frontend; Backend + Database; DevOps + Payments + Web3. */
const RINGS: readonly (readonly SkillCategory[])[] = [
  ["Frontend"],
  ["Backend", "Database"],
  ["DevOps", "Payments", "Web3"],
];

const copy = {
  count: { vi: "công nghệ, 6 nhóm.", en: "technologies in 6 groups." },
  core: { vi: "Fullstack", en: "Fullstack" },
  rings: {
    vi: ["Vòng trong", "Vòng giữa", "Vòng ngoài"],
    en: ["Inner ring", "Middle ring", "Outer ring"],
  },
} as const;


function OrbitTile({ skill }: { skill: Skill }) {
  const icon = TECH_ICONS[skill.name];
  return (
    <span className="orbit__tile" data-name={skill.name}>
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element -- tiny logo files, no resizing to do
        <img
          className={WIDE_ICONS.has(skill.name) ? "orbit__logo is-wide" : "orbit__logo"}
          src={icon}
          alt=""
          width={24}
          height={24}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="orbit__initials" aria-hidden="true">
          {initials(skill.name)}
        </span>
      )}
      {/* read out always (kit .sr-only); the visible label is drawn on hover only (CSS ::after) */}
      <span className="sr-only">{skill.name}</span>
    </span>
  );
}

/**
 * Skills (owner's choice, Phase 5): a split, the words on the left (the h2 and the three rings
 * named), the orbit on the right: a lit core with three rings of the tools' real marks turning
 * slowly, each ring the other way, the marks staying upright. The pointer on the orbit holds it;
 * a mark under the pointer shows its name (every name is also read out). Still under reduced motion.
 */
export function Skills({ locale }: SkillsProps) {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-h">
      {/* the orbit turns only while the section is in view (performance audit) */}
      <PauseWhenHidden />
      <div className="wrap">
        <div className="grid skills__split">
          <div className="span-5 skills__text">
            <div className="section-head">
              <h2 id="skills-h">
                {t(sectionTitles.skills, locale)}.{" "}
                <span className="muted skills__count">
                  {skills.length} {copy.count[locale]}
                </span>
              </h2>
            </div>
            <ol className="skills__legend">
              {RINGS.map((ring, i) => (
                <li key={i}>
                  <span className="skills__ring-dot" data-ring={i} aria-hidden="true" />
                  <span className="skills__ring-name">{copy.rings[locale][i]}</span>
                  <span className="skills__ring-groups">
                    {ring.map((c) => t(skillCategoryLabels[c], locale)).join(", ")}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="span-6 start-7 skills__orbit" data-visual>
            <div className="orbit">
              <div className="orbit__core" aria-hidden="true">
                <span>{copy.core[locale]}</span>
              </div>
              {RINGS.map((ring, r) => {
                const items = skills.filter((s) => ring.includes(s.category));
                return (
                  <ul className="orbit__ring" data-ring={r} key={r} aria-label={copy.rings[locale][r]}>
                    {items.map((skill, i) => (
                      <li
                        className="orbit__item"
                        key={skill.name}
                        style={{ "--a": `${(360 / items.length) * i + r * 17}deg` } as CSSProperties}
                      >
                        <OrbitTile skill={skill} />
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
