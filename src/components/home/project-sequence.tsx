/* eslint-disable @next/next/no-img-element -- Approved assets are pre-optimized for the static export. */
import { SectionHeading } from "@/components/ui/section-heading";
import { mediaAssets } from "@/content/media";
import { buildAssetPath, buildInternalPath } from "@/lib/site-url";

export function ProjectSequence({ basePath = "" }: { basePath?: string }) {
  const projectAssets = mediaAssets.filter((asset) => asset.documentary);

  return (
    <section className="project-sequence" data-home-section="project">
      <SectionHeading
        index="03"
        intro="Authentic photographs from the approved Costa’s Roofing Facebook page, kept together as one project story."
        inverted
        title="One documented exterior project"
      />

      <div className="project-sequence__rail">
        {projectAssets.map((asset, index) => {
          const variant = asset.variants.find(
            (candidate) => candidate.role === "project",
          );

          if (!variant) {
            return null;
          }

          return (
            <figure className="project-frame" key={asset.id}>
              <div className="project-frame__image">
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
                {index < 2
                  ? "Completed exterior view"
                  : index === 3
                    ? "Finished roof detail"
                    : "Exterior work in progress"}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <a
        className="project-sequence__link"
        href={buildInternalPath("/projects", basePath)}
      >
        View the project sequence <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
