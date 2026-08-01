import { business } from "@/content/business";

type PhoneCtaProps = {
  label?: string;
  className?: string;
  showNumber?: boolean;
};

export function PhoneCta({
  label = `Call ${business.phone.display}`,
  className = "",
  showNumber = false,
}: PhoneCtaProps) {
  return (
    <a className={`phone-cta ${className}`.trim()} href={business.phone.uri}>
      <span>{label}</span>
      {showNumber ? <strong>{business.phone.display}</strong> : null}
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <path d="M4 10h11M11 5l5 5-5 5" />
      </svg>
    </a>
  );
}
