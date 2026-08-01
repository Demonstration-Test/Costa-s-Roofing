import { RooflineMark } from "@/components/ui/roofline-mark";

export function PageHero({
  title,
  intro,
  index,
}: {
  title: string;
  intro: string;
  index: string;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero__content">
        <span className="page-hero__index">{index}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <RooflineMark className="page-hero__roofline" />
    </section>
  );
}
