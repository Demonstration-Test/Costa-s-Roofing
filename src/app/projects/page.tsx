/* eslint-disable @next/next/no-img-element -- Approved assets are pre-optimized for the static export. */
import type { Metadata } from "next";

import { PageCall } from "@/components/pages/page-call";
import { PageHero } from "@/components/pages/page-hero";
import { mediaAssets } from "@/content/media";
import { buildRouteMetadata } from "@/lib/site-metadata";
import { buildAssetPath } from "@/lib/site-url";

const basePath = process.env.PUBLISH_BASE_PATH ?? "";

export const metadata: Metadata = buildRouteMetadata(
  "/projects",
  process.env.PUBLIC_SITE_ORIGIN,
  basePath,
);

const captions = [
  "Completed front exterior view",
  "Wider completed exterior view",
  "Rear exterior work in progress",
  "Finished roof ridge detail",
  "Exterior siding work in progress",
] as const;

export default function ProjectsPage() {
  const projectAssets = mediaAssets.filter((asset) => asset.documentary);

  return (
    <main className="route-page projects-page">
      <PageHero
        index="01 project"
        intro="Five authentic photographs from one approved exterior project sequence. The images are presented without inferred dates, materials, or geography."
        title="One project, documented"
      />
      <section aria-label="Documentary project photographs" className="project-gallery">
        {projectAssets.map((asset, index) => {
          const variant = asset.variants.find((entry) => entry.role === "project");
          if (!variant) return null;

          return (
            <figure key={asset.id}>
              <div>
                <img
                  alt={asset.alt}
                  decoding="async"
                  height={1200}
                  loading="lazy"
                  src={buildAssetPath(variant.path, basePath)}
                  style={{
                    height: "100%",
                    inset: 0,
                    objectFit: "cover",
                    position: "absolute",
                    width: "100%",
                  }}
                  width={900}
                />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {captions[index]}
              </figcaption>
            </figure>
          );
        })}
      </section>
      <PageCall label="Call about your property" />
    </main>
  );
}
