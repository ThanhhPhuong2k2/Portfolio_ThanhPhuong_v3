import { hero, projects, skills, type Localized, type Locale } from "@/content/site";
import { t } from "@/lib/i18n";

interface ContactStatsProps {
  locale: Locale;
}

const labels = {
  projects: { vi: "dự án", en: "projects" },
  skills: { vi: "công nghệ", en: "technologies" },
} satisfies Record<string, Localized>;

/**
 * The close's stats row (owner's choice): the projects and technologies counted from the data (so
 * they follow it), then the two user counts the hero states. A description list: each label is its
 * term, the figure its value; the figure is drawn first.
 */
export function ContactStats({ locale }: ContactStatsProps) {
  const stats = [
    { key: "projects", value: String(projects.length), label: t(labels.projects, locale) },
    { key: "skills", value: String(skills.length), label: t(labels.skills, locale) },
    ...hero.proofStats.map((s, i) => ({ key: `proof-${i}`, value: s.value, label: t(s.label, locale) })),
  ];

  return (
    <dl className="contact__stats">
      {stats.map((s) => (
        <div key={s.key} className="contact__stat">
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
