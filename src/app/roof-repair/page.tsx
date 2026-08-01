import type { Metadata } from "next";

import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import { servicePageContent } from "@/content/pages";
import { buildRouteMetadata } from "@/lib/site-metadata";

const basePath = process.env.PUBLISH_BASE_PATH ?? "";

export const metadata: Metadata = buildRouteMetadata(
  "/roof-repair",
  process.env.PUBLIC_SITE_ORIGIN,
  basePath,
);

export default function RoofRepairPage() {
  return (
    <ServiceDetailPage
      basePath={basePath}
      content={servicePageContent["/roof-repair"]}
      index="01"
    />
  );
}
