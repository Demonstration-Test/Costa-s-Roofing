import type { Metadata, MetadataRoute } from "next";

import { business } from "@/content/business";
import { routes } from "@/content/routes";
import {
  buildPublicUrl,
  parsePublicOrigin,
  validateBasePath,
} from "@/lib/site-url";

export const facebookUrl =
  "https://www.facebook.com/p/Costas-Roofing-61551744815173/";

export const routeSeo = {
  "/": {
    title: "Costa’s Roofing | Roofing Services Near Harrison",
    description:
      "Explore roofing and exterior services from Costa’s Roofing for Harrison and surrounding cities.",
  },
  "/services": {
    title: "Roofing and Exterior Services | Costa’s Roofing",
    description:
      "Review roof repair, replacement, installation, inspection, storm-damage, gutter, siding, skylight, and ventilation services.",
  },
  "/roof-repair": {
    title: "Roof Repair | Costa’s Roofing",
    description:
      "Learn about roof repair from Costa’s Roofing for Harrison and surrounding cities.",
  },
  "/roof-replacement": {
    title: "Roof Replacement | Costa’s Roofing",
    description:
      "Learn about roof replacement from Costa’s Roofing for Harrison and surrounding cities.",
  },
  "/roof-inspection": {
    title: "Roof Inspection | Costa’s Roofing",
    description:
      "Learn about roof inspection from Costa’s Roofing for Harrison and surrounding cities.",
  },
  "/storm-damage": {
    title: "Storm and Wind-Damage Roof Repair | Costa’s Roofing",
    description:
      "Learn about storm and wind-damage roof repair from Costa’s Roofing and call to discuss visible concerns.",
  },
  "/exterior-services": {
    title: "Gutters, Siding, Skylights and Ventilation | Costa’s Roofing",
    description:
      "Explore gutter, siding, skylight, and ventilation services from Costa’s Roofing.",
  },
  "/projects": {
    title: "Roofing Project Gallery | Costa’s Roofing",
    description:
      "View an authentic exterior project photo sequence from Costa’s Roofing.",
  },
  "/reviews": {
    title: "Customer Reviews | Costa’s Roofing",
    description:
      "Read selected Google review excerpts for Costa’s Roofing and see the supplied rating snapshot.",
  },
  "/about": {
    title: "About Costa’s Roofing",
    description:
      "Meet Costa’s Roofing through customer-reported themes of communication, workmanship, cleanup, and responsiveness.",
  },
  "/contact": {
    title: "Call Costa’s Roofing",
    description:
      "Call Costa’s Roofing to discuss roofing or exterior work in Harrison and surrounding cities.",
  },
  "/privacy": {
    title: "Website Privacy Notice | Costa’s Roofing",
    description:
      "Read the factual first-release website privacy notice for Costa’s Roofing.",
  },
} as const satisfies Record<(typeof routes)[number]["path"], {
  title: string;
  description: string;
}>;

export type ApprovedRoute = keyof typeof routeSeo;

export function buildRouteMetadata(
  route: ApprovedRoute,
  origin?: string,
  basePath = "",
): Metadata {
  const seo = routeSeo[route];
  const publicOrigin = parsePublicOrigin(origin);
  const publicUrl = publicOrigin
    ? buildPublicUrl(route, publicOrigin, basePath)
    : undefined;

  return {
    title: seo.title,
    description: seo.description,
    robots: publicOrigin
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: publicUrl ? { canonical: publicUrl } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      siteName: business.publicName,
      type: "website",
      url: publicUrl,
    },
  };
}

export function buildOrganizationJsonLd(
  origin?: string,
  basePath = "",
) {
  const publicOrigin = parsePublicOrigin(origin);
  const publicUrl = publicOrigin
    ? buildPublicUrl("/", publicOrigin, basePath)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.publicName,
    ...(publicUrl ? { url: publicUrl } : {}),
    telephone: business.phone.uri.replace("tel:", ""),
    sameAs: [facebookUrl],
    areaServed: business.serviceArea,
  } as const;
}

export function buildSitemap(
  origin?: string,
  basePath = "",
): MetadataRoute.Sitemap {
  const publicOrigin = parsePublicOrigin(origin);

  if (!publicOrigin) {
    validateBasePath(basePath);
    return [];
  }

  return routes.map(({ path }) => ({
    url: buildPublicUrl(path, publicOrigin, basePath),
  }));
}

export function buildRobots(
  origin?: string,
  basePath = "",
): MetadataRoute.Robots {
  const publicOrigin = parsePublicOrigin(origin);
  const base = validateBasePath(basePath);

  if (!publicOrigin) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: base
      ? { userAgent: "*", disallow: "/", allow: `${base}/` }
      : { userAgent: "*", allow: "/" },
    sitemap: `${publicOrigin}${base}/sitemap.xml`,
  };
}
