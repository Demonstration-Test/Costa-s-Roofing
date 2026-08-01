import { PageCall } from "@/components/pages/page-call";
import { PageHero } from "@/components/pages/page-hero";
import { buildInternalPath } from "@/lib/site-url";

export default function NotFound() {
  const basePath = process.env.PUBLISH_BASE_PATH ?? "";

  return (
    <main className="route-page">
      <PageHero
        index="404"
        intro="The page you requested is not part of this website."
        title="Page not found"
      />
      <nav aria-label="Page recovery" className="related-routes">
        <a href={buildInternalPath("/", basePath)}>Return home</a>
        <a href={buildInternalPath("/services", basePath)}>Explore services</a>
      </nav>
      <PageCall label="Call Costa’s Roofing" />
    </main>
  );
}
