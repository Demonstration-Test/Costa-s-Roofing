import type { Metadata } from "next";

import { PageHero } from "@/components/pages/page-hero";
import { privacyNotice } from "@/content/pages";
import { buildRouteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildRouteMetadata(
  "/privacy",
  process.env.PUBLIC_SITE_ORIGIN,
  process.env.PUBLISH_BASE_PATH,
);

export default function PrivacyPage() {
  return (
    <main className="route-page privacy-page">
      <PageHero
        index={privacyNotice.date}
        intro="A factual notice about the first release of this static website."
        title="Website privacy notice"
      />
      <article className="privacy-notice">
        <header>
          <span>Notice date</span>
          <strong>{privacyNotice.date}</strong>
        </header>
        <ol>
          {privacyNotice.statements.map((statement, index) => (
            <li key={statement}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{statement}</p>
            </li>
          ))}
        </ol>
      </article>
    </main>
  );
}
