import type { Metadata } from "next";

import { CallProcess } from "@/components/home/call-process";
import { CinematicHero } from "@/components/home/cinematic-hero";
import { FinalCall } from "@/components/home/final-call";
import { IntentPathways } from "@/components/home/intent-pathways";
import { ProjectSequence } from "@/components/home/project-sequence";
import { ReviewProof } from "@/components/home/review-proof";
import { ServiceAreaBand } from "@/components/home/service-area-band";
import { ServiceIndex } from "@/components/home/service-index";
import { buildRouteMetadata } from "@/lib/site-metadata";

const basePath = process.env.PUBLISH_BASE_PATH ?? "";

export const metadata: Metadata = buildRouteMetadata(
  "/",
  process.env.PUBLIC_SITE_ORIGIN,
  basePath,
);

export default function HomePage() {
  return (
    <main>
      <CinematicHero basePath={basePath} />
      <IntentPathways basePath={basePath} />
      <ServiceIndex basePath={basePath} />
      <ProjectSequence basePath={basePath} />
      <ReviewProof basePath={basePath} />
      <CallProcess />
      <ServiceAreaBand />
      <FinalCall />
    </main>
  );
}
