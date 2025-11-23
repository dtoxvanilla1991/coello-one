import { describe, it, expect } from "bun:test";
import { footerLinkGroups, routes } from "@config/routes";

const baseUrl = process.env.FOOTER_LINKS_BASE_URL;
const footerPaths = Array.from(
  new Set(footerLinkGroups.flatMap((group) => group.links.map((link) => routes[link.route]))),
);

const describeFooterSmoke = baseUrl ? describe : describe.skip;

describeFooterSmoke("Footer navigation smoke", () => {
  it("returns 200 for each footer link", async () => {
    if (!baseUrl) {
      throw new Error("FOOTER_LINKS_BASE_URL must be defined when running this test.");
    }

    for (const path of footerPaths) {
      const target = new URL(path, baseUrl).toString();
      const response = await fetch(target, { redirect: "manual" });
      expect(response.status).toBe(200);
    }
  });
});
