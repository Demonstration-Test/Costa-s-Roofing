import {
  buildAssetPath,
  buildInternalPath,
  buildPublicUrl,
  parsePublicOrigin,
  validateBasePath,
} from "./site-url";

describe("site URL configuration", () => {
  it("accepts empty or one-segment base paths", () => {
    expect(validateBasePath(undefined)).toBe("");
    expect(validateBasePath("")).toBe("");
    expect(validateBasePath("/costas-roofing")).toBe("/costas-roofing");
  });

  it.each(["costas-roofing", "/a/b", "/trailing/", "/bad?query", "/bad#hash"])(
    "rejects malformed base path %s",
    (value) => {
      expect(() => validateBasePath(value)).toThrow("Invalid PUBLISH_BASE_PATH");
    },
  );

  it("accepts an HTTPS scheme-and-host production origin", () => {
    expect(parsePublicOrigin("https://costasroofing.example")).toBe(
      "https://costasroofing.example",
    );
    expect(parsePublicOrigin(undefined)).toBeUndefined();
  });

  it.each([
    "http://costasroofing.example",
    "https://user@costasroofing.example",
    "https://costasroofing.example/",
    "https://costasroofing.example/path",
    "https://costasroofing.example?query=1",
  ])("rejects malformed public origin %s", (value) => {
    expect(() => parsePublicOrigin(value)).toThrow("Invalid PUBLIC_SITE_ORIGIN");
  });

  it("builds folder-style internal and asset paths exactly once", () => {
    expect(buildInternalPath("/", "/costas-roofing")).toBe(
      "/costas-roofing/",
    );
    expect(buildInternalPath("/reviews", "/costas-roofing")).toBe(
      "/costas-roofing/reviews/",
    );
    expect(buildAssetPath("/media/logo.webp", "/costas-roofing")).toBe(
      "/costas-roofing/media/logo.webp",
    );
  });

  it("builds absolute production URLs from origin, base path, and route", () => {
    expect(
      buildPublicUrl(
        "/reviews",
        "https://costasroofing.example",
        "/costas-roofing",
      ),
    ).toBe("https://costasroofing.example/costas-roofing/reviews/");
  });
});
