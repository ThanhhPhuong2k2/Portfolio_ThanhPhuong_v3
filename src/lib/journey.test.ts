import { describe, expect, it } from "vitest";
import { experiences, type Experience } from "@/content/site";
import {
  lanes,
  overlaps,
  scale,
  slug,
  studyEntries,
  toIso,
  toSpan,
  toYears,
  workEntries,
  yearsOf,
  journeyEntries,
} from "./journey";

/** A fixed "now": 22 November 2026, so "present" never moves under the tests. */
const NOW = yearsOf(new Date(2026, 10, 22));

function job(overrides: Partial<Experience>): Experience {
  return {
    company: "Acme",
    role: { vi: "Dev", en: "Dev" },
    period: { start: "01/2021", end: "12/2021" },
    location: { vi: "Đà Nẵng", en: "Da Nang" },
    achievements: { vi: ["Câu một.", "Câu hai."], en: ["One.", "Two."] },
    highlights: { vi: ["Một", "Hai"], en: ["One", "Two"] },
    summary: { vi: "Một dòng.", en: "One line." },
    tech: ["Next.js"],
    ...overrides,
  };
}

describe("periods", () => {
  it("reads a year, a month and year, and present", () => {
    expect(toYears("2020", NOW)).toBe(2020);
    expect(toYears("03/2024", NOW)).toBeCloseTo(2024 + 2 / 12);
    expect(toYears("present", NOW)).toBe(NOW);
  });

  it("writes a valid <time> value", () => {
    expect(toIso("03/2024")).toBe("2024-03");
    expect(toIso("2020")).toBe("2020");
  });

  it("marks a running period as open", () => {
    expect(toSpan("03/2024", "present", NOW).open).toBe(true);
    expect(toSpan("2020", "2022", NOW).open).toBe(false);
  });

  it("counts shared time as overlap, touching ends as not", () => {
    expect(overlaps(toSpan("2020", "2022", NOW), toSpan("2021", "2023", NOW))).toBe(true);
    expect(overlaps(toSpan("2020", "2022", NOW), toSpan("2022", "2024", NOW))).toBe(false);
  });
});

describe("slug", () => {
  it("drops Vietnamese marks and punctuation", () => {
    expect(slug("Ôn TOEIC (Freelance Project)")).toBe("on-toeic-freelance-project");
  });
});

describe("study chapters", () => {
  it("keeps only the steps with a start, and closes the last one with the graduation year", () => {
    const entries = studyEntries("vi", NOW);
    expect(entries.map((e) => e.title)).toEqual(["Nền móng", "Bước ngoặt"]);
    expect(entries.at(-1)?.text).toMatch(/Tốt nghiệp năm 2024\.$/);
    expect(entries[0]?.text).not.toMatch(/Tốt nghiệp/);
  });
});

describe("jobs", () => {
  it("orders the jobs oldest first and marks the two running ones as parallel", () => {
    const entries = workEntries("vi", NOW);
    expect(entries.map((e) => e.title)).toEqual(["METADAP", "Ôn TOEIC (Freelance Project)"]);
    expect(entries.every((e) => e.parallel)).toBe(true);
  });

  it("does not mark a job that shares no time with another", () => {
    const entries = workEntries("vi", NOW, [
      job({ company: "A", period: { start: "01/2020", end: "12/2020" } }),
      job({ company: "B", period: { start: "01/2021", end: "present" } }),
    ]);
    expect(entries.map((e) => e.parallel)).toEqual([false, false]);
  });

  it("pairs each achievement with its short phrase", () => {
    const [metadap] = workEntries("vi", NOW);
    expect(metadap?.achievements).toHaveLength(4);
    expect(metadap?.achievements[2]).toEqual({
      short: "Cổng thanh toán VNPAY, ACB",
      full: "Tích hợp cổng thanh toán (VNPAY, ACB) và các dịch vụ của bên thứ ba.",
    });
  });

  it("shows the full sentence when a short phrase is missing", () => {
    const [entry] = workEntries("en", NOW, [job({ highlights: { vi: ["Một"], en: ["One"] } })]);
    expect(entry?.achievements.map((a) => a.short)).toEqual(["One", "Two."]);
  });

  it("names a job's lane without its bracketed note", () => {
    const entries = workEntries("vi", NOW);
    expect(entries.map((e) => e.label)).toEqual(["METADAP", "Ôn TOEIC"]);
  });

  it("uses every job in the data", () => {
    expect(workEntries("vi", NOW)).toHaveLength(experiences.length);
  });
});

describe("ruler", () => {
  const entries = journeyEntries("vi", NOW);

  it("puts the two study chapters on the school's lane and each job on its own", () => {
    const result = lanes(entries);
    expect(result.map((l) => [l.label, l.bars.length])).toEqual([
      ["Đại học Duy Tân", 2],
      ["METADAP", 1],
      ["Ôn TOEIC", 1],
    ]);
  });

  it("runs from the first start year to now", () => {
    const { start, end, years, pos } = scale(entries);
    expect(start).toBe(2020);
    expect(end).toBe(NOW);
    expect(years).toEqual([2020, 2021, 2022, 2023, 2024, 2025, 2026]);
    expect(pos(start)).toBe("0.000%");
    expect(pos(end)).toBe("100.000%");
  });
});
