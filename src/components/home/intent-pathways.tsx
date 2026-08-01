import { business } from "@/content/business";
import { buildInternalPath } from "@/lib/site-url";

const pathways = [
  {
    index: "01",
    title: "Something changed",
    body: "A leak, visible damage, or recent wind may be telling you the roof needs attention.",
    label: "Explore roof repair",
    path: "/roof-repair",
  },
  {
    index: "02",
    title: "Planning ahead",
    body: "If replacement or installation is on your mind, start with a direct conversation about the property.",
    label: "Explore replacement",
    path: "/roof-replacement",
  },
  {
    index: "03",
    title: "Beyond the roof",
    body: "Discuss gutters, siding, skylights, and ventilation as part of the exterior around your home.",
    label: "Explore exterior services",
    path: "/exterior-services",
  },
] as const;

export function IntentPathways({ basePath = "" }: { basePath?: string }) {
  return (
    <section className="pathways" data-home-section="pathways">
      <div className="pathways__lead">
        <p className="section-kicker">Start where you are</p>
        <h2>What does your roof need today?</h2>
        <p>
          These are conversation starters—not a remote diagnosis. Call
          {` ${business.phone.display}`} to discuss what you are seeing.
        </p>
      </div>
      <div className="pathways__grid">
        {pathways.map((pathway) => (
          <article className="pathway" key={pathway.index}>
            <span className="pathway__index">{pathway.index}</span>
            <h3>{pathway.title}</h3>
            <p>{pathway.body}</p>
            <a href={buildInternalPath(pathway.path, basePath)}>
              {pathway.label}
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
