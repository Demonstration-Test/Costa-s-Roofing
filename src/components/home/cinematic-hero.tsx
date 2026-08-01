import { PhoneCta } from "@/components/ui/phone-cta";
import { RooflineMark } from "@/components/ui/roofline-mark";
import { business } from "@/content/business";
import { getMediaAsset } from "@/content/media";
import { buildAssetPath, buildInternalPath } from "@/lib/site-url";

export function CinematicHero({ basePath = "" }: { basePath?: string }) {
  const heroAsset = getMediaAsset("FB-PROJECT-04");
  const desktop = heroAsset?.variants.find(
    (variant) => variant.role === "hero-desktop",
  );
  const mobile = heroAsset?.variants.find(
    (variant) => variant.role === "hero-mobile",
  );
  const mobileAvif = heroAsset?.variants.find(
    (variant) => variant.role === "hero-mobile-avif",
  );

  if (!heroAsset || !desktop || !mobile || !mobileAvif) {
    return null;
  }

  return (
    <section className="hero" data-home-section="hero">
      <div
        aria-hidden="true"
        className="hero-webgl-boundary"
        data-enhancement="fallback"
        data-testid="hero-webgl-boundary"
      />
      <div className="hero__weather" aria-hidden="true" />
      <div className="hero__media">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={buildAssetPath(mobileAvif.path, basePath)}
            type="image/avif"
          />
          <source
            media="(max-width: 767px)"
            srcSet={buildAssetPath(mobile.path, basePath)}
          />
          <img
            alt={heroAsset.alt}
            decoding="async"
            fetchPriority="high"
            height={900}
            loading="eager"
            src={buildAssetPath(desktop.path, basePath)}
            style={{
              height: "100%",
              inset: 0,
              objectFit: "cover",
              position: "absolute",
              width: "100%",
            }}
            width={1440}
          />
        </picture>
        <span aria-hidden="true" className="hero__media-shade" />
      </div>

      <div className="hero__content">
        <h1>
          <span>Protection,</span>
          {" "}
          <span className="hero__headline-accent">restored.</span>
        </h1>
        <p className="hero__intro">
          Roofing and exterior work for {business.serviceArea.toLowerCase()}—built
          around responsive communication, careful workmanship, and thorough
          cleanup.
        </p>
        <div className="hero__actions">
          <PhoneCta />
          <a
            className="text-link"
            href={buildInternalPath("/services", basePath)}
          >
            Explore services
            <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>

      <p className="hero__proof">
        {business.rating.score.toFixed(1)} Google rating · {business.rating.count}{" "}
        reviews · {business.hours.publicLabel}
      </p>

      <RooflineMark className="hero__roofline" />
    </section>
  );
}
