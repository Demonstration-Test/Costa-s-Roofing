import type { MetadataRoute } from "next";

import { buildSitemap } from "@/lib/site-metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(
    process.env.PUBLIC_SITE_ORIGIN,
    process.env.PUBLISH_BASE_PATH,
  );
}
