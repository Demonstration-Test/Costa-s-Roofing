import type { Metadata } from "next";

import { PageCall } from "@/components/pages/page-call";
import { PageHero } from "@/components/pages/page-hero";
import { business } from "@/content/business";
import { reviews } from "@/content/reviews";
import { buildRouteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildRouteMetadata(
  "/reviews",
  process.env.PUBLIC_SITE_ORIGIN,
  process.env.PUBLISH_BASE_PATH,
);

export default function ReviewsPage() {
  return (
    <main className="route-page reviews-page">
      <PageHero
        index="37 voices"
        intro="A supplied Google rating snapshot and six selected excerpts, kept in the customers’ own words."
        title="Customer reviews"
      />
      <section className="reviews-ledger">
        <header>
          <strong>{business.rating.score.toFixed(1)}</strong>
          <span aria-label="5 out of 5 stars">★★★★★</span>
          <p>{business.rating.count} Google reviews</p>
          <small>Individual experiences vary.</small>
        </header>
        <div>
          {reviews.map((review, index) => (
            <figure key={review.reviewer}>
              <span>0{index + 1}</span>
              <blockquote>{review.excerpt}</blockquote>
              <figcaption>
                <span>{review.reviewer}</span>
                <span>· {review.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <PageCall label="Call Costa’s Roofing" />
    </main>
  );
}
