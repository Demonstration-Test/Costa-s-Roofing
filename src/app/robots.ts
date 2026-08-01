import type { MetadataRoute } from "next";

import { buildRobots } from "@/lib/site-metadata";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return buildRobots(
    process.env.PUBLIC_SITE_ORIGIN,
    process.env.PUBLISH_BASE_PATH,
  );
}
