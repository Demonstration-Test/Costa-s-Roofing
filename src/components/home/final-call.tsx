import { PhoneCta } from "@/components/ui/phone-cta";
import { RooflineMark } from "@/components/ui/roofline-mark";
import { business } from "@/content/business";

export function FinalCall() {
  return (
    <section className="final-call" data-home-section="final-call">
      <RooflineMark className="final-call__roofline" />
      <div>
        <p className="section-kicker">Ready when you are</p>
        <h2>Put the next step over your head.</h2>
        <p>{business.hours.publicLabel}. No online form—just a direct call.</p>
      </div>
      <PhoneCta label="Call Costa’s Roofing" showNumber />
    </section>
  );
}
