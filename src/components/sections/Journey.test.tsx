import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { Journey } from "./Journey";

/** Journey is a synchronous Server Component: it renders like any component (nextjs-testing). */
describe("Journey", () => {
  beforeEach(() => {
    // "present" is the build day: freeze it
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 10, 22));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("shows the four chapters in order as headings of the section", () => {
    render(<Journey locale="vi" />);
    const section = screen.getByRole("region", { name: /Hành trình/ });
    const titles = within(section)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toHaveLength(4);
    expect(titles[0]).toContain("Nền móng");
    expect(titles[1]).toContain("Bước ngoặt");
    expect(titles[2]).toContain("METADAP");
    expect(titles[3]).toContain("Ôn TOEIC (Freelance Project)");
  });

  it("marks both running jobs as in parallel", () => {
    render(<Journey locale="vi" />);
    expect(screen.getAllByText("Song song")).toHaveLength(2);
  });

  it("opens an achievement's full sentence from its short phrase", async () => {
    const user = userEvent.setup();
    render(<Journey locale="vi" />);
    const summary = screen.getByText("Thiết kế RESTful API");
    const details = summary.closest("details");
    expect(details?.open).toBe(false);

    await user.click(summary);

    expect(details?.open).toBe(true);
    expect(within(details as HTMLElement).getByText(/Xây dựng và duy trì RESTful API/)).toBeTruthy();
  });

  it("lists each job's tech by name", () => {
    render(<Journey locale="vi" />);
    const [metadap, onToeic] = screen.getAllByRole("list", { name: "Công nghệ" });
    expect(within(metadap as HTMLElement).getByText("MongoDB")).toBeTruthy();
    expect(within(onToeic as HTMLElement).getAllByRole("listitem")).toHaveLength(12);
  });

  it("keeps the drawn visuals out of the accessibility tree", () => {
    const { container } = render(<Journey locale="vi" />);
    const visuals = container.querySelectorAll("figure.journey__visual");
    expect(visuals).toHaveLength(4);
    visuals.forEach((v) => expect(v.getAttribute("aria-hidden")).toBe("true"));
  });

  it("unfolds a chapter's longer text from its see-more button on a phone", async () => {
    const user = userEvent.setup();
    render(<Journey locale="vi" />);
    const [first] = screen.getAllByRole("button", { name: "Xem thêm" });
    const chapter = first?.closest(".journey__step");
    expect(first?.getAttribute("aria-expanded")).toBe("false");
    expect(chapter?.hasAttribute("data-more")).toBe(false);

    await user.click(first as HTMLElement);

    expect(first?.getAttribute("aria-expanded")).toBe("true");
    expect(first?.textContent).toContain("Thu gọn");
    expect(chapter?.hasAttribute("data-more")).toBe(true);

    await user.click(first as HTMLElement);
    expect(chapter?.hasAttribute("data-more")).toBe(false);
  });

  it("speaks English on the English page", () => {
    render(<Journey locale="en" />);
    expect(screen.getAllByText("In parallel")).toHaveLength(2);
    expect(screen.getAllByRole("list", { name: "Tech stack" })).toHaveLength(2);
  });
});
