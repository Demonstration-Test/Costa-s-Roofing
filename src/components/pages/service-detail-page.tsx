import { PageCall } from "@/components/pages/page-call";
import { PageHero } from "@/components/pages/page-hero";
import { reviews } from "@/content/reviews";
import type { servicePageContent } from "@/content/pages";
import { buildInternalPath } from "@/lib/site-url";

type ServiceDetail = (typeof servicePageContent)[keyof typeof servicePageContent];

export function ServiceDetailPage({
  content,
  index,
  basePath = "",
}: {
  content: ServiceDetail;
  index: string;
  basePath?: string;
}) {
  const review = reviews[content.reviewIndex];

  return (
    <main className="route-page">
      <PageHero index={index} intro={content.intro} title={content.title} />

      <section className="detail-scope">
        <div className="detail-scope__heading">
          <p className="section-kicker">Reasons to call</p>
          <h2>Bring the visible concern into focus.</h2>
        </div>
        <ol className="detail-scope__list">
          {content.concerns.map((concern, concernIndex) => (
            <li key={concern}>
              <span>{String(concernIndex + 1).padStart(2, "0")}</span>
              <p>{concern}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="detail-boundary">
        <span>What a call means</span>
        <p>
          {"boundaryLead" in content ? <strong>{content.boundaryLead}</strong> : null}
          {"boundaryLead" in content ? " " : null}
          {content.boundary}
        </p>
      </section>

      <section className="route-review">
        <span aria-hidden="true">“</span>
        <blockquote>{review.excerpt}</blockquote>
        <p>{review.reviewer} · {review.source} review</p>
      </section>

      <nav aria-label="Related services" className="related-routes">
        <span>Related</span>
        {content.related.map((link) => (
          <a href={buildInternalPath(link.path, basePath)} key={link.path}>
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>

      <PageCall label={content.cta} />
    </main>
  );
}
