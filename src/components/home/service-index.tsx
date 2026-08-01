import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/content/services";
import { buildInternalPath } from "@/lib/site-url";

const serviceDescriptions = [
  "For leaks, visible wear, and repair concerns.",
  "A direct path for planning a full roof replacement.",
  "Roof installation conversations grounded in the property.",
  "An on-site look when you need a clearer understanding.",
  "Repair conversations after wind or storm-related damage.",
  "Gutter work connected to the home’s exterior drainage.",
  "Siding work for the home’s exterior envelope.",
  "Skylight and roof-ventilation work within the approved scope.",
] as const;

function serviceHref(path: string, basePath: string) {
  const [route, hash] = path.split("#");
  const href = buildInternalPath(route, basePath);
  return hash ? `${href}#${hash}` : href;
}

export function ServiceIndex({ basePath = "" }: { basePath?: string }) {
  return (
    <section className="service-index" data-home-section="services" id="services">
      <SectionHeading
        index="02"
        intro="A focused scope built from services repeatedly described in customer reviews."
        title={<>Roofing, then the exterior around it.</>}
      />

      <div className="service-index__list">
        {services.map((service, index) => (
          <a
            className="service-row"
            href={serviceHref(service.path, basePath)}
            key={service.name}
          >
            <span className="service-row__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{service.name}</h3>
            <p>{serviceDescriptions[index]}</p>
            <span aria-hidden="true" className="service-row__arrow">
              ↗
            </span>
          </a>
        ))}
      </div>

      <a
        className="service-index__all"
        href={buildInternalPath("/services", basePath)}
      >
        View all services
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
