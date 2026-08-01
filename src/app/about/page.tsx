import type { Metadata } from "next";

import { PageCall } from "@/components/pages/page-call";
import { PageHero } from "@/components/pages/page-hero";
import { buildRouteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildRouteMetadata(
  "/about",
  process.env.PUBLIC_SITE_ORIGIN,
  process.env.PUBLISH_BASE_PATH,
);

const themes = [
  {
    title: "Communication",
    body: "Reviewers repeatedly describe clear, responsive communication from the first conversation through the work.",
  },
  {
    title: "Workmanship",
    body: "Customers call out professional, organized, and high-quality work across roofing and exterior projects.",
  },
  {
    title: "Cleanup",
    body: "More than one review remembers the care taken to leave the property clean after the work.",
  },
  {
    title: "Responsiveness",
    body: "Supplied reviews describe fast replies and an accommodating approach to customer needs.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="route-page">
      <PageHero
        index="Costa’s Roofing"
        intro="A Harrison-area roofing company presented through the qualities customers repeatedly mention—not through invented milestones."
        media={{
          assetId: "FB-PROJECT-03",
          desktopPosition: "50% 48%",
          mobilePosition: "52% 50%",
        }}
        title="Built around the work"
      />
      <section className="about-themes">
        <header>
          <p className="section-kicker">What reviews reveal</p>
          <h2>Four themes, repeated.</h2>
        </header>
        <div>
          {themes.map((theme, index) => (
            <article key={theme.title}>
              <span>0{index + 1}</span>
              <h3>{theme.title}</h3>
              <p>{theme.body}</p>
            </article>
          ))}
        </div>
      </section>
      <PageCall label="Call Costa’s Roofing" />
    </main>
  );
}
