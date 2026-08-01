import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/content/business";
import { reviews } from "@/content/reviews";
import { buildInternalPath } from "@/lib/site-url";

export function ReviewProof({ basePath = "" }: { basePath?: string }) {
  return (
    <section className="review-proof" data-home-section="reviews">
      <div className="review-proof__summary">
        <span className="review-proof__score">{business.rating.score.toFixed(1)}</span>
        <span aria-label="5 out of 5 stars" className="review-proof__stars">
          ★★★★★
        </span>
        <p>
          {business.rating.source} rating · {business.rating.count} reviews
        </p>
      </div>
      <SectionHeading
        index="04"
        intro="Selected excerpts from the supplied Google reviews. Individual experiences vary."
        title="The details people remember."
      />
      <div className="review-proof__quotes">
        {reviews.slice(0, 3).map((review, index) => (
          <figure className="review-quote" key={review.reviewer}>
            <span aria-hidden="true" className="review-quote__mark">
              “
            </span>
            <blockquote>{review.excerpt}</blockquote>
            <figcaption>
              <span>{review.reviewer}</span>
              <span>{review.source} review</span>
            </figcaption>
            <span className="review-quote__index">0{index + 1}</span>
          </figure>
        ))}
      </div>
      <a
        className="review-proof__link"
        href={buildInternalPath("/reviews", basePath)}
      >
        Read more reviews <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
