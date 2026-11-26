import { describe, expect, it } from "vitest";
import { projects } from "@/content/site";
import { galleryScreens, LEAD_SLUGS, linkHost, orderedProjects, otherProjects, shuffle } from "./projects";

describe("order", () => {
  it("leads with the owner's four, then every other project once", () => {
    const order = orderedProjects();
    expect(order.slice(0, 4).map((p) => p.slug)).toEqual(LEAD_SLUGS);
    expect(order).toHaveLength(projects.length);
    expect(new Set(order.map((p) => p.slug)).size).toBe(projects.length);
  });

  it("lists every other project once, starting after the one shown and wrapping round", () => {
    const order = orderedProjects();
    const last = order.at(-1)!;
    const others = otherProjects(last.slug);
    expect(others).toHaveLength(projects.length - 1);
    expect(others.map((p) => p.slug)).not.toContain(last.slug);
    expect(others[0]!.slug).toBe(order[0]!.slug);
    expect(new Set(others.map((p) => p.slug)).size).toBe(others.length);
    expect(otherProjects("no-such-project")).toHaveLength(projects.length);
  });
});

describe("shuffle", () => {
  it("keeps every item and leaves the input as it was", () => {
    const input = [1, 2, 3, 4, 5] as const;
    const out = shuffle(input);
    expect([...out].sort()).toEqual([1, 2, 3, 4, 5]);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  it("follows the random source it is given", () => {
    // always 0: each step swaps with the first item
    expect(shuffle(["a", "b", "c"], () => 0)).toEqual(["b", "c", "a"]);
    expect(shuffle([], () => 0)).toEqual([]);
  });
});

describe("links", () => {
  it("reads a link's host without www", () => {
    expect(linkHost("https://www.lanivn.com/vi")).toBe("lanivn.com");
    expect(linkHost("https://www.facebook.com/photo.php?fbid=1")).toBe("facebook.com");
    expect(linkHost("not a url")).toBeNull();
  });
});

describe("gallery", () => {
  it("starts with the cover and lists each screen once", () => {
    expect(galleryScreens({ cover: "a", gallery: ["a", "b", "b", "c"] })).toEqual(["a", "b", "c"]);
    expect(galleryScreens({ cover: "x", gallery: ["b"] })).toEqual(["x", "b"]);
  });
});
