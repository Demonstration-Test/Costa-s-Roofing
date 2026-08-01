import type { Metadata } from "next";

import { PageHero } from "@/components/pages/page-hero";
import { PhoneCta } from "@/components/ui/phone-cta";
import { business } from "@/content/business";
import { facebookUrl, buildRouteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildRouteMetadata(
  "/contact",
  process.env.PUBLIC_SITE_ORIGIN,
  process.env.PUBLISH_BASE_PATH,
);

export default function ContactPage() {
  return (
    <main className="route-page contact-page">
      <PageHero
        index="Phone only"
        intro="Describe the roof or exterior concern, ask a question, and discuss the next available step directly."
        title="Start with a call"
      />
      <section className="contact-ledger">
        <div className="contact-ledger__phone">
          <span>Call</span>
          <strong>{business.phone.display}</strong>
          <PhoneCta label="Call Costa’s Roofing" />
        </div>
        <dl>
          <div>
            <dt>Call availability</dt>
            <dd>{business.hours.publicLabel}</dd>
          </div>
          <div>
            <dt>Service area</dt>
            <dd>{business.serviceArea}</dd>
          </div>
          <div>
            <dt>Social</dt>
            <dd>
              <a href={facebookUrl} rel="noreferrer" target="_blank">
                Facebook
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
