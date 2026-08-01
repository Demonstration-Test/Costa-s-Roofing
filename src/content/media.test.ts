import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

import { mediaAssets } from "./media";

const root = process.cwd();

const pageHeroAssignments = [
  ["FB-PROJECT-04", "services-hero"],
  ["FB-PROJECT-02", "projects-hero"],
  ["FB-PROJECT-01", "reviews-hero"],
  ["FB-PROJECT-03", "about-hero"],
  ["FB-PROJECT-05", "contact-hero"],
] as const;

const pageHeroDerivatives = pageHeroAssignments.flatMap(([, stem]) => [
  {
    file: `${stem}-desktop.webp`,
    width: 1440,
    height: 900,
    maxBytes: 350 * 1024,
  },
  {
    file: `${stem}-mobile.avif`,
    width: 780,
    height: 1040,
    maxBytes: 220 * 1024,
  },
  {
    file: `${stem}-mobile.webp`,
    width: 780,
    height: 1040,
    maxBytes: 220 * 1024,
  },
]);

describe("approved media registry", () => {
  it("contains the mandatory logo and five project images", () => {
    expect(mediaAssets.map((asset) => asset.id)).toEqual([
      "FB-LOGO-01",
      "FB-PROJECT-01",
      "FB-PROJECT-02",
      "FB-PROJECT-03",
      "FB-PROJECT-04",
      "FB-PROJECT-05",
    ]);
  });

  it("keeps source acquisitions outside the public export", () => {
    for (const asset of mediaAssets) {
      expect(asset.sourcePath).toMatch(/^assets\/source\/facebook\//);
      expect(fs.existsSync(path.join(root, asset.sourcePath))).toBe(true);
    }
  });

  it("maps every asset to existing optimized derivatives and descriptive alt text", () => {
    for (const asset of mediaAssets) {
      expect(asset.alt.trim().length).toBeGreaterThan(12);
      expect(asset.variants.length).toBeGreaterThan(0);

      for (const variant of asset.variants) {
        expect(variant.path).toMatch(/^\/media\/optimized\//);
        expect(fs.existsSync(path.join(root, "public", variant.path))).toBe(true);
        expect(variant.width).toBeGreaterThan(0);
        expect(variant.height).toBeGreaterThan(0);
      }
    }
  });

  it("provides dedicated desktop and mobile hero derivatives", () => {
    const roofDetail = mediaAssets.find((asset) => asset.id === "FB-PROJECT-04");

    expect(roofDetail?.variants.map((variant) => variant.role)).toEqual(
      expect.arrayContaining(["hero-desktop", "hero-mobile", "project"]),
    );
  });

  it("keeps hero derivatives inside the approved transfer budgets", () => {
    const desktopSize = fs.statSync(
      path.join(root, "public/media/optimized/hero-roof-desktop.webp"),
    ).size;
    const mobileSize = fs.statSync(
      path.join(root, "public/media/optimized/hero-roof-mobile.webp"),
    ).size;

    expect(desktopSize).toBeLessThanOrEqual(350 * 1024);
    expect(mobileSize).toBeLessThanOrEqual(220 * 1024);
  });

  it("assigns three responsive page-hero variants to each approved route image", () => {
    for (const [assetId, stem] of pageHeroAssignments) {
      const asset = mediaAssets.find((entry) => entry.id === assetId);
      const variants = asset?.variants.filter((variant) =>
        variant.role.startsWith("page-hero-"),
      );

      expect(variants).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            role: "page-hero-desktop",
            path: `/media/optimized/${stem}-desktop.webp`,
          }),
          expect.objectContaining({
            role: "page-hero-mobile-avif",
            path: `/media/optimized/${stem}-mobile.avif`,
          }),
          expect.objectContaining({
            role: "page-hero-mobile",
            path: `/media/optimized/${stem}-mobile.webp`,
          }),
        ]),
      );
    }
  });

  it.each(pageHeroDerivatives)(
    "keeps $file at its exact dimensions and transfer budget",
    async ({ file, width, height, maxBytes }) => {
      const filePath = path.join(root, "public", "media", "optimized", file);

      expect(fs.existsSync(filePath)).toBe(true);
      const metadata = await sharp(filePath).metadata();
      const bytes = fs.statSync(filePath).size;

      expect(metadata.width).toBe(width);
      expect(metadata.height).toBe(height);
      expect(bytes).toBeLessThanOrEqual(maxBytes);
    },
  );
});
