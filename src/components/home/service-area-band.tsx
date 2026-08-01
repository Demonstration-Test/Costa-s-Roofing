import { business } from "@/content/business";

export function ServiceAreaBand() {
  return (
    <section className="service-area" data-home-section="service-area">
      <span>Service area</span>
      <h2>{business.serviceArea}</h2>
      <p>Roofing and exterior work begins with a phone conversation.</p>
    </section>
  );
}
