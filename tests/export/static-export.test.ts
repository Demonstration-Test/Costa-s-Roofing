import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { routes } from "@/content/routes";
import { createNextConfig } from "../../next.config";

const outputDirectory = join(process.cwd(), "out");
const hasExport = existsSync(outputDirectory);

describe("static export configuration", () => {
  it("keeps root builds unprefixed", () => {
    const config = createNextConfig(undefined);
    expect(config.basePath).toBeUndefined();
  });

  it("configures an approved one-segment publish base path", () => {
    const config = createNextConfig("/costas-roofing");
    expect(config.basePath).toBe("/costas-roofing");
  });

  it.each(["costas-roofing", "/a/b", "/trailing/"])(
    "rejects invalid publish base path %s during configuration",
    (basePath) => {
      expect(() => createNextConfig(basePath)).toThrow("Invalid PUBLISH_BASE_PATH");
    },
  );
});

describe.runIf(hasExport)("generated static export", () => {
  it("contains folder-style HTML for every approved route", () => {
    for (const route of routes) {
      const htmlPath =
        route.path === "/"
          ? join(outputDirectory, "index.html")
          : join(outputDirectory, route.path.slice(1), "index.html");
      expect(existsSync(htmlPath), htmlPath).toBe(true);
    }
  });

  it("keeps preview HTML non-indexable and phone-only", () => {
    const html = readFileSync(join(outputDirectory, "index.html"), "utf8");

    expect(html).toContain('name="robots" content="noindex, nofollow"');
    expect(html).toContain('href="tel:+19735172952"');
    expect(html).not.toContain('href="mailto:');
    expect(html).not.toContain("602 William");
  });

  it("ships the deferred motion script without unnecessary Next hydration", () => {
    const html = readFileSync(join(outputDirectory, "index.html"), "utf8");

    expect(html).toContain('src="/site-motion.js"');
    expect(html).not.toMatch(/<script[^>]+src="\/_next\/static\/chunks\//);
    expect(html).not.toContain("self.__next_f.push");
  });

  it("emits a crawler-blocking preview robots file and an empty sitemap", () => {
    const robots = readFileSync(join(outputDirectory, "robots.txt"), "utf8");
    const sitemap = readFileSync(join(outputDirectory, "sitemap.xml"), "utf8");

    expect(robots).toContain("User-Agent: *");
    expect(robots).toContain("Disallow: /");
    expect(sitemap).not.toContain("<url>");
  });
});
