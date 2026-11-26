import {
  education,
  experiences,
  journey,
  projects,
  type Education,
  type Experience,
  type JourneyStep,
  type Localized,
  type Locale,
} from "@/content/site";
import { t } from "@/lib/i18n";

/**
 * The Journey section's logic, kept apart from its markup so it can be tested as plain functions
 * (nextjs-testing: extract logic, keep Server Components thin). "Now" and the data are arguments
 * with the real ones as defaults, so a test can freeze the date and feed edge cases.
 */

/** A period in fractional years: "2020" -> 2020, "03/2024" -> 2024.17, "present" -> now. */
export interface Span {
  from: number;
  to: number;
  /** still running ("present"): the bar runs to the ruler's end, open */
  open: boolean;
}

/** A chapter's picture on a phone: the work of that time (a project's cover or screen). */
export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** "cover" fills the square (a screenshot or photograph); "contain" sits inside it (a logo) */
  fit: "cover" | "contain";
}

export interface Achievement {
  short: string;
  full: string;
}

/** What every chapter has: its lane's label, its period as written and as a span, its lines. */
interface EntryBase {
  key: string;
  label: string;
  period: { start: string; end: string };
  span: Span;
  title: string;
  meta: string;
  /** one short line, shown on a phone in place of the longer text; the meta line when the data has none */
  summary: string;
  /** the chapter's picture on a phone; none for a chapter with no picture of its own (the school) */
  photo: Photo | null;
}

export type StudyEntry = EntryBase & { kind: "study"; text: string };
export type WorkEntry = EntryBase & {
  kind: "work";
  achievements: Achievement[];
  tech: string[];
  parallel: boolean;
};
/** A chapter: a study one (one paragraph) or a job (achievements + tech). */
export type Entry = StudyEntry | WorkEntry;

export interface Lane {
  key: string;
  label: string;
  bars: { key: string; span: Span }[];
}

export interface Scale {
  start: number;
  end: number;
  /** each whole year from the first chapter's start to now */
  years: number[];
  /** a year as a share of the ruler, "0.000%" to "100.000%" */
  pos: (years: number) => string;
}

export const journeyCopy = {
  lead: { vi: "Từ 2020 đến nay.", en: "2020 to today." },
  graduated: { vi: "Tốt nghiệp năm", en: "Graduated in" },
  parallel: { vi: "Song song", en: "In parallel" },
  tech: { vi: "Công nghệ", en: "Tech stack" },
} satisfies Record<string, Localized>;

/** A date in fractional years (months count from 0, so 1 March is 2024 + 2/12). */
export function yearsOf(date: Date): number {
  return date.getFullYear() + date.getMonth() / 12;
}

/** "MM/YYYY", "YYYY" or "present" in fractional years. */
export function toYears(value: string, now: number): number {
  if (value === "present") return now;
  const [a, b] = value.split("/");
  return b ? Number(b) + (Number(a) - 1) / 12 : Number(a);
}

/** "03/2024" -> "2024-03", "2020" -> "2020" (a valid <time dateTime>). */
export function toIso(value: string): string {
  const [a, b] = value.split("/");
  return b ? `${b}-${a}` : value;
}

export function toSpan(start: string, end: string, now: number): Span {
  return { from: toYears(start, now), to: toYears(end, now), open: end === "present" };
}

/** "Ôn TOEIC (Freelance Project)" -> "on-toeic-freelance-project" (keys). */
export function slug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Each chapter's picture on a phone (owner's choice): the pivot years show VIDE (2022), METADAP the
 * company's own logo (from metadap.io: its CDN refuses scripted downloads, so it is linked, not kept
 * in the repo), Ôn TOEIC its mascot (public/assets/img_ontoeic.png, cropped to a 160px square at
 * public/site/journey-ontoeic.webp). The school years have no picture yet: the school's icon.
 */
const VIDE = "vide";
const ONTOEIC_ALT: Localized = { vi: "Linh vật Ôn TOEIC dưới mưa", en: "The Ôn TOEIC mascot in the rain" };

export function chapterPhoto(key: string, locale: Locale): Photo | null {
  if (key === "metadap") {
    return { src: "https://metadap.io/icons/logo_metadap.svg", width: 160, height: 160, alt: "METADAP", fit: "contain" };
  }
  if (key === "on-toeic-freelance-project") {
    return { src: "/site/journey-ontoeic.webp", width: 160, height: 160, alt: t(ONTOEIC_ALT, locale), fit: "cover" };
  }
  if (key === "passion") {
    const project = projects.find((p) => p.slug === VIDE);
    if (!project) return null;
    return { src: project.cover, width: 1600, height: 1000, alt: `${project.title}: ${t(project.subtitle, locale)}`, fit: "cover" };
  }
  return null;
}

/** Two periods share time (touching ends do not count). */
export function overlaps(a: Span, b: Span): boolean {
  return a.from < b.to && b.from < a.to;
}

/** Study chapters with both ends known (the old site's academic and pivot steps). */
export function studyEntries(
  locale: Locale,
  now: number,
  steps: readonly JourneyStep[] = journey,
  school: Education = education,
): StudyEntry[] {
  const schoolName = t(school.school, locale);
  return steps
    .filter((s): s is JourneyStep & { period: { start: string } } => Boolean(s.period.start))
    .map((step, i, list) => {
      const last = i === list.length - 1;
      return {
        kind: "study",
        key: step.key.toLowerCase(),
        label: schoolName,
        period: { start: step.period.start, end: step.period.end },
        span: toSpan(step.period.start, step.period.end, now),
        title: t(step.title, locale),
        meta: i === 0 ? `${schoolName} · ${school.major}` : step.subtitle,
        summary: step.summary ? t(step.summary, locale) : step.subtitle,
        photo: chapterPhoto(step.key.toLowerCase(), locale),
        // the graduation year closes the last study chapter
        text: last
          ? `${t(step.description, locale)} ${t(journeyCopy.graduated, locale)} ${school.graduationYear}.`
          : t(step.description, locale),
      };
    });
}

/** Jobs, oldest first; a job overlapping another is marked "in parallel". */
export function workEntries(locale: Locale, now: number, jobs: readonly Experience[] = experiences): WorkEntry[] {
  const sorted = [...jobs].sort((a, b) => toYears(a.period.start, now) - toYears(b.period.start, now));
  const spans = sorted.map((e) => toSpan(e.period.start, e.period.end, now));
  return sorted.map((e, i) => {
    const span = toSpan(e.period.start, e.period.end, now);
    const full = t(e.achievements, locale);
    const short = t(e.highlights, locale);
    return {
      kind: "work",
      key: slug(e.company),
      label: e.company.replace(/\s*\(.*\)$/, ""),
      period: e.period,
      span,
      title: e.company,
      meta: `${t(e.role, locale)} · ${t(e.location, locale)}`,
      summary: t(e.summary, locale),
      photo: chapterPhoto(slug(e.company), locale),
      // a missing short phrase falls back to the full sentence
      achievements: full.map((sentence, j) => ({ short: short[j] ?? sentence, full: sentence })),
      tech: e.tech,
      parallel: spans.some((s, j) => j !== i && overlaps(s, span)),
    };
  });
}

/** Every chapter in order: study first, then the jobs. */
export function journeyEntries(locale: Locale, now: number = yearsOf(new Date())): Entry[] {
  return [...studyEntries(locale, now), ...workEntries(locale, now)];
}

/** One lane per school / employer; the study chapters share the school's lane. */
export function lanes(entries: readonly Entry[]): Lane[] {
  const byLabel = new Map<string, Lane>();
  for (const entry of entries) {
    const lane = byLabel.get(entry.label) ?? { key: entry.key, label: entry.label, bars: [] };
    lane.bars.push({ key: entry.key, span: entry.span });
    byLabel.set(entry.label, lane);
  }
  return [...byLabel.values()];
}

/** The ruler's scale: from the first chapter's start year to the latest end (now, when running). */
export function scale(entries: readonly Entry[]): Scale {
  const start = Math.floor(Math.min(...entries.map((e) => e.span.from)));
  const end = Math.max(...entries.map((e) => e.span.to));
  const years: number[] = [];
  for (let y = start; y <= Math.floor(end); y += 1) years.push(y);
  return { start, end, years, pos: (v) => `${(((v - start) / (end - start)) * 100).toFixed(3)}%` };
}
