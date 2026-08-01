import type { CSSProperties } from "react";

import { RooflineMark } from "@/components/ui/roofline-mark";
import { getMediaAsset, type MediaAsset } from "@/content/media";
import { buildAssetPath } from "@/lib/site-url";

type PageHeroMedia = {
  assetId: MediaAsset["id"];
  desktopPosition: string;
  mobilePosition: string;
};

export function PageHero({
  title,
  intro,
  index,
  media,
}: {
  title: string;
  intro: string;
  index: string;
  media?: PageHeroMedia;
}) {
  const asset = media ? getMediaAsset(media.assetId) : undefined;
  const desktop = asset?.variants.find(
    (variant) => variant.role === "page-hero-desktop",
  );
  const mobileAvif = asset?.variants.find(
    (variant) => variant.role === "page-hero-mobile-avif",
  );
  const mobile = asset?.variants.find(
    (variant) => variant.role === "page-hero-mobile",
  );

  if (media && (!asset || !desktop || !mobileAvif || !mobile)) {
    throw new Error(
      `PageHero media ${media.assetId} is missing a required responsive derivative.`,
    );
  }

  const basePath = process.env.PUBLISH_BASE_PATH ?? "";
  const style = media
    ? ({
        "--page-hero-desktop-position": media.desktopPosition,
        "--page-hero-mobile-position": media.mobilePosition,
      } as CSSProperties)
    : undefined;

  return (
    <section
      className={`page-hero${media ? " page-hero--media" : ""}`}
      style={style}
    >
      {media && desktop && mobileAvif && mobile ? (
        <div aria-hidden="true" className="page-hero__media">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={buildAssetPath(mobileAvif.path, basePath)}
              type="image/avif"
            />
            <source
              media="(max-width: 767px)"
              srcSet={buildAssetPath(mobile.path, basePath)}
              type="image/webp"
            />
            <img
              alt=""
              decoding="sync"
              fetchPriority="high"
              height={desktop.height}
              loading="eager"
              src={buildAssetPath(desktop.path, basePath)}
              width={desktop.width}
            />
          </picture>
        </div>
      ) : null}
      <div className="page-hero__content">
        <span className="page-hero__index">{index}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <RooflineMark className="page-hero__roofline" />
    </section>
  );
}
