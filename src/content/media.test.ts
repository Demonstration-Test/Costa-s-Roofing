import fs from "node:fs";
import path from "node:path";

import { mediaAssets } from "./media";

const root = process.cwd();

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
});
