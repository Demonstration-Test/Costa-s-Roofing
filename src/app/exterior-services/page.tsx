import type { Metadata } from "next";

import { PageCall } from "@/components/pages/page-call";
import { PageHero } from "@/components/pages/page-hero";
import { exteriorServiceContent } from "@/content/pages";
import { buildRouteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildRouteMetadata(
  "/exterior-services",
  process.env.PUBLIC_SITE_ORIGIN,
  process.env.PUBLISH_BASE_PATH,
);

export default function ExteriorServicesPage() {
  return (
    <main className="route-page">
      <PageHero
        index="05—08"
        intro="The roof works as part of a larger exterior. These four approved service areas stay together on one focused page."
        title="Exterior services"
      />
      <section className="exterior-grid">
        {exteriorServiceContent.map((service, index) => (
          <article id={service.id} key={service.id}>
            <span>0{index + 5}</span>
            <h2>{service.title}</h2>
            <p>{service.body}</p>
          </article>
        ))}
      </section>
      <PageCall label="Call about exterior work" />
    </main>
  );
}
