export function RooflineMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`roofline-mark ${className}`.trim()}
      preserveAspectRatio="none"
      viewBox="0 0 720 72"
    >
      <path d="M0 70h110L240 4l80 40 44-22 76 48h280" />
    </svg>
  );
}
