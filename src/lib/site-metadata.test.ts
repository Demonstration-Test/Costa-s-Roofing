import { routes } from "@/content/routes";
import {
  buildOrganizationJsonLd,
  buildRobots,
  buildRouteMetadata,
  buildSitemap,
  routeSeo,
} from "./site-metadata";

const publicOrigin = "https://costasroofing.example";

describe("site metadata", () => {
  it("defines unique factual SEO copy for every approved route", () => {
    expect(Object.keys(routeSeo)).toHaveLength(routes.length);
    expect(Object.keys(routeSeo).sort()).toEqual(
      routes.map((route) => route.path).sort(),
    );
    expect(new Set(Object.values(routeSeo).map((record) => record.title)).size).toBe(
      routes.length,
    );
    expect(
      Object.values(routeSeo).every(
        (record) => record.title.length > 0 && record.description.length > 0,
      ),
    ).toBe(true);
  });

  it.each(["", "/costas-roofing"])(
    "builds public route metadata for base path %s",
    (basePath) => {
      const metadata = buildRouteMetadata("/reviews", publicOrigin, basePath);
      const expectedUrl = `${publicOrigin}${basePath}/reviews/`;

      expect(metadata.alternates?.canonical).toBe(expectedUrl);
      expect(metadata.openGraph?.url).toBe(expectedUrl);
      expect(metadata.robots).toEqual({ index: true, follow: true });
      expect(metadata.title).toBe(routeSeo["/reviews"].title);
      expect(metadata.description).toBe(routeSeo["/reviews"].description);
    },
  );

  it.each(["", "/costas-roofing"])(
    "keeps preview route metadata non-indexable for base path %s",
    (basePath) => {
      const metadata = buildRouteMetadata("/reviews", undefined, basePath);

      expect(metadata.alternates).toBeUndefined();
      expect(metadata.openGraph?.url).toBeUndefined();
      expect(metadata.robots).toEqual({ index: false, follow: false });
    },
  );

  it("builds the constrained Organization JSON-LD with a public URL", () => {
    const jsonLd = buildOrganizationJsonLd(publicOrigin, "/costas-roofing");

    expect(jsonLd).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Costa’s Roofing",
      url: "https://costasroofing.example/costas-roofing/",
      telephone: "+19735172952",
      sameAs: [
        "https://www.facebook.com/p/Costas-Roofing-61551744815173/",
      ],
      areaServed: "Harrison and surrounding cities",
    });
    expect(jsonLd).not.toHaveProperty("address");
    expect(jsonLd).not.toHaveProperty("openingHours");
    expect(jsonLd).not.toHaveProperty("aggregateRating");
    expect(jsonLd).not.toHaveProperty("review");
    expect(jsonLd).not.toHaveProperty("legalName");
    expect(jsonLd).not.toHaveProperty("license");
  });

  it("omits only the Organization URL when no public origin is configured", () => {
    const jsonLd = buildOrganizationJsonLd(undefined, "/costas-roofing");

    expect(jsonLd).not.toHaveProperty("url");
    expect(jsonLd.name).toBe("Costa’s Roofing");
    expect(jsonLd.telephone).toBe("+19735172952");
  });

  it.each(["", "/costas-roofing"])(
    "builds a complete configured sitemap for base path %s",
    (basePath) => {
      const sitemap = buildSitemap(publicOrigin, basePath);

      expect(sitemap).toHaveLength(routes.length);
      expect(sitemap.map((entry) => entry.url)).toEqual(
        routes.map(
          (route) =>
            `${publicOrigin}${basePath}${route.path === "/" ? "/" : `${route.path}/`}`,
        ),
      );
    },
  );

  it.each(["", "/costas-roofing"])(
    "returns no sitemap URLs in preview mode for base path %s",
    (basePath) => {
      expect(buildSitemap(undefined, basePath)).toEqual([]);
    },
  );

  it("builds origin-level robots rules for a root public site", () => {
    expect(buildRobots(publicOrigin, "")).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://costasroofing.example/sitemap.xml",
    });
  });

  it("builds origin-level robots rules for a prefixed public site", () => {
    expect(buildRobots(publicOrigin, "/costas-roofing")).toEqual({
      rules: {
        userAgent: "*",
        disallow: "/",
        allow: "/costas-roofing/",
      },
      sitemap: "https://costasroofing.example/costas-roofing/sitemap.xml",
    });
  });

  it.each(["", "/costas-roofing"])(
    "disallows every crawler in preview mode for base path %s",
    (basePath) => {
      expect(buildRobots(undefined, basePath)).toEqual({
        rules: { userAgent: "*", disallow: "/" },
      });
    },
  );
});
