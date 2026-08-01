import type { ReactNode } from "react";

type SectionHeadingProps = {
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  inverted?: boolean;
};

export function SectionHeading({
  index,
  title,
  intro,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <header
      className={`section-heading${inverted ? " section-heading--inverted" : ""}`}
    >
      {index ? <span className="section-heading__index">{index}</span> : null}
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}
