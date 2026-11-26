import Image from "next/image";
import type { CSSProperties } from "react";
import { presentLabel, sectionTitles, ui, type Locale } from "@/content/site";
import { t } from "@/lib/i18n";
import { journeyEntries, journeyCopy as copy, lanes, scale, toIso, type Entry } from "@/lib/journey";
import { TECH_ICONS, WIDE_ICONS, initials } from "@/lib/tech-icons";
import { JourneyMore } from "./JourneyMore";
import "./journey.css";

interface JourneyProps {
  locale: Locale;
}

function Period({ start, end, locale }: { start: string; end: string; locale: Locale }) {
  return (
    <span className="journey__when">
      <time dateTime={toIso(start)}>{start}</time>
      {" – "}
      {end === "present" ? t(presentLabel, locale) : <time dateTime={toIso(end)}>{end}</time>}
    </span>
  );
}

/**
 * The ruler: years along the top, one lane per school or employer, a bar per period; a running
 * job's bar is open at the right end, the chapter in hand's bar lit. Part of the chapter's visual,
 * which repeats what the chapter's words say, so it is hidden from assistive tech with it.
 */
function Ruler({ entries, active }: { entries: Entry[]; active: string }) {
  const { start, years, pos } = scale(entries);

  return (
    <span className="journey__ruler">
      <span className="journey__lane journey__lane--axis">
        <span className="journey__lane-label" />
        <span className="journey__track">
          {years.map((y) => (
            <span key={y} className="journey__tick" style={{ "--x": pos(y) } as CSSProperties}>
              {y}
            </span>
          ))}
        </span>
      </span>
      {lanes(entries).map((lane) => (
        <span
          className="journey__lane"
          key={lane.key}
          data-active={lane.bars.some((b) => b.key === active) || undefined}
        >
          <span className="journey__lane-label">{lane.label}</span>
          <span className="journey__track">
            {lane.bars.map((bar) => (
              <span
                key={bar.key}
                className="journey__bar"
                data-active={bar.key === active || undefined}
                data-open={bar.span.open || undefined}
                style={{ "--x": pos(bar.span.from), "--w": pos(start + (bar.span.to - bar.span.from)) } as CSSProperties}
              />
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

/** A tool's real mark on a light tile (black marks read at evening too), else its initials. */
function TechMark({ name }: { name: string }) {
  const icon = TECH_ICONS[name];
  return (
    <span className="journey__mark" aria-hidden="true">
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element -- tiny logo files, no resizing to do
        <img
          className={WIDE_ICONS.has(name) ? "is-wide" : undefined}
          src={icon}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="journey__initials">{initials(name)}</span>
      )}
    </span>
  );
}

interface StepProps {
  entry: Entry;
  index: number;
  total: number;
  entries: Entry[];
  locale: Locale;
}

/**
 * One chapter: its words (period and count, title, role or school, then the job's achievements and
 * tech, or the study chapter's paragraph) and its visual (the years set large, the job's marks or
 * the school, the ruler with this chapter lit). The kit's pinned-chapters moves the visual into the
 * shared frame when live and back under the words at rest.
 */
function Step({ entry, index, total, entries, locale }: StepProps) {
  const count = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const marks = entry.kind === "work" ? entry.tech.filter((name) => TECH_ICONS[name]) : [];
  return (
    <li className="mo-pc__step journey__step" data-kind={entry.kind} data-running={entry.span.open || undefined}>
      <h3>
        <span className="journey__period">
          <Period start={entry.period.start} end={entry.period.end} locale={locale} />
          <span className="journey__count" aria-hidden="true">
            {count}
          </span>
        </span>
        <span className="journey__title">{entry.title}</span>
      </h3>
      <p>
        <span className="journey__meta">
          {entry.meta}
          {entry.kind === "work" && entry.parallel ? (
            <span className="pill journey__badge">{t(copy.parallel, locale)}</span>
          ) : null}
        </span>
        {entry.kind === "study" ? <span className="journey__text">{entry.text}</span> : null}
      </p>

      {/* a phone only (owner's ask): the chapter's one line and its picture, the longer text folded */}
      <p className="journey__summary">{entry.summary}</p>
      <figure className="journey__photo" data-fit={entry.photo?.fit}>
        {entry.photo ? (
          <Image
            src={entry.photo.src}
            alt={entry.photo.alt}
            width={entry.photo.width}
            height={entry.photo.height}
            sizes="(max-width: 639px) 100vw, 1px"
          />
        ) : (
          <span className="journey__photo-icon" aria-hidden="true">
            {/* the school years: no picture of their own yet (Lucide graduation-cap, ISC) */}
            <svg viewBox="0 0 24 24">
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0zM22 10v6" />
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
          </span>
        )}
      </figure>

      {entry.kind === "work" ? (
        <div className="journey__body">
          <ul className="journey__achievements">
            {entry.achievements.map((a) => (
              <li key={a.full}>
                <details>
                  <summary>{a.short}</summary>
                  <p>{a.full}</p>
                </details>
              </li>
            ))}
          </ul>
          <ul className="journey__tech" aria-label={t(copy.tech, locale)}>
            {entry.tech.map((name) => (
              <li key={name}>
                <TechMark name={name} />
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <JourneyMore moreLabel={t(ui.seeMore, locale)} lessLabel={t(ui.seeLess, locale)} />

      <figure className="mo-pc__visual mo-pc__visual--lit journey__visual" aria-hidden="true">
        <span className="journey__big">
          {entry.period.start.slice(-4)}
          <span className="journey__big-arrow">→</span>
          {entry.period.end === "present" ? t(presentLabel, locale) : entry.period.end.slice(-4)}
        </span>
        {marks.length > 0 ? (
          <span className="journey__marks">
            {marks.map((name) => (
              <TechMark key={name} name={name} />
            ))}
          </span>
        ) : (
          <span className="journey__school">{entry.meta}</span>
        )}
        <Ruler entries={entries} active={entry.key} />
      </figure>
    </li>
  );
}

/**
 * Journey (owner's redesign): slides on the kit's pinned-chapters moment (moments.md, the page's
 * dealt scroll moment). From 1024px on a screen 640px or taller the section holds for a screen of
 * scroll while its chapters take the stage one at a time at the left, like slides; the frame at the
 * right crossfades to each chapter's visual, its year ruler lighting that chapter's bar. At rest
 * (phones, tablets, reduced motion, no script) each chapter stands with its visual beside or under
 * it. A job shows each achievement as a short phrase; the full sentence opens under it (native
 * details/summary). Static data: nothing to load; with no chapters the section is not drawn.
 */
export function Journey({ locale }: JourneyProps) {
  // static export: "now" is the day the page was built
  const entries = journeyEntries(locale);
  if (entries.length === 0) return null;

  return (
    <section
      className="section journey"
      id="journey"
      style={{ "--h": 2 } as CSSProperties}
      data-moment="pinned-chapters"
      aria-labelledby="journey-h"
    >
      <div className="wrap mo-pc__grid">
        <div className="mo-pc__text">
          <h2 id="journey-h">
            {t(sectionTitles.journey, locale)}. <span className="muted">{t(copy.lead, locale)}</span>
          </h2>
          <ol className="mo-pc__steps">
            {entries.map((entry, i) => (
              <Step key={entry.key} entry={entry} index={i} total={entries.length} entries={entries} locale={locale} />
            ))}
          </ol>
        </div>
        <div className="mo-pc__visuals frame" />
      </div>
    </section>
  );
}
