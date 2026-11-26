import { describe, expect, it } from "vitest";
import { canonicalTech, projectTechs, techKey } from "./project-filters";

describe("tech names", () => {
  it("reads the data's two spellings as one", () => {
    expect(canonicalTech("Tailwind")).toBe("Tailwind CSS");
    expect(canonicalTech("VNPAY")).toBe("VNPay");
    expect(canonicalTech("NestJS")).toBe("NestJS");
  });

  it("makes a key safe in a CSS attribute value", () => {
    expect(techKey("Tailwind CSS")).toBe("tailwind-css");
    expect(techKey("React.js")).toBe("react-js");
    expect(techKey("VNPAY")).toBe("vnpay");
  });

  it("lists a project's tools once each", () => {
    expect(projectTechs({ tags: ["Tailwind", "Tailwind CSS", "Next.js"] })).toEqual(["Tailwind CSS", "Next.js"]);
  });
});
