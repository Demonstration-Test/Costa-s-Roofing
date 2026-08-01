import { PhoneCta } from "@/components/ui/phone-cta";
import { business } from "@/content/business";

export function CallProcess() {
  return (
    <section className="call-process" data-home-section="call-process">
      <span className="call-process__line" aria-hidden="true" />
      <p className="section-kicker">A direct next step</p>
      <h2>Start with a conversation.</h2>
      <p>
        Tell Costa’s Roofing what you are seeing and what you are considering for
        the property. A call starts the discussion; it does not confirm an
        appointment.
      </p>
      <PhoneCta label={`Call ${business.phone.display}`} />
    </section>
  );
}
