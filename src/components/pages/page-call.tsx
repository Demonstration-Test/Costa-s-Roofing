import { PhoneCta } from "@/components/ui/phone-cta";
import { business } from "@/content/business";

export function PageCall({ label }: { label: string }) {
  return (
    <section className="page-call">
      <div>
        <p className="section-kicker">Talk through the property</p>
        <h2>Start with a direct call.</h2>
      </div>
      <p>
        Serving {business.serviceArea.toLowerCase()}. {business.hours.publicLabel}.
      </p>
      <PhoneCta label={label} />
    </section>
  );
}
