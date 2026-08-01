import type { Metadata } from "next";

import { PageCall } from "@/components/pages/page-call";
import { PageHero } from "@/components/pages/page-hero";
import { services } from "@/content/services";
import { buildRouteMetadata } from "@/lib/site-metadata";
import { buildInternalPath } from "@/lib/site-url";

const basePath = process.env.PUBLISH_BASE_PATH ?? "";

export const metadata: Metadata = buildRouteMetadata(
  "/services",
  process.env.PUBLIC_SITE_ORIGIN,
  basePath,
);

const descriptions = [
  "Repair conversations for leaks and visible roof damage.",
  "Planning for replacement around the needs of the property.",
  "Roof installation discussed in the context of the property.",
  "An on-site look when a roof concern needs clarification.",
  "Repair conversations after wind or storm conditions.",
  "Gutter work within the home’s exterior drainage path.",
  "Siding work across the visible exterior.",
  "Skylight and ventilation work where those elements meet the roof.",
] as const;

function serviceHref(path: string) {
  const [route, hash] = path.split("#");
  const internalPath = buildInternalPath(route, basePath);
  return hash ? `${internalPath}#${hash}` : internalPath;
}

export default function ServicesPage() {
  return (
    <main className="route-page">
      <PageHero
        index="01—08"
        intro="A focused set of roofing and exterior services, built from work repeatedly described in customer reviews."
        media={{
          assetId: "FB-PROJECT-04",
          desktopPosition: "50% 50%",
          mobilePosition: "58% 52%",
        }}
        title="Roofing and exterior services"
      />
      <section className="route-service-list">
        {services.map((service, index) => (
          <a
            href={serviceHref(service.path)}
            id={service.name === "Roof Installation" ? "roof-installation" : undefined}
            key={service.name}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{service.name}</h2>
            <p>{descriptions[index]}</p>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </section>
      <PageCall label="Call about your roof" />
    </main>
  );
}
