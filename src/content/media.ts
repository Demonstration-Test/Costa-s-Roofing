export type MediaVariantRole =
  | "brand"
  | "hero-desktop"
  | "hero-mobile-avif"
  | "hero-mobile"
  | "page-hero-desktop"
  | "page-hero-mobile-avif"
  | "page-hero-mobile"
  | "project";

export type MediaVariant = {
  role: MediaVariantRole;
  path: string;
  width: number;
  height: number;
};

export type MediaAsset = {
  id: string;
  sourcePath: string;
  sourceUrl: string;
  alt: string;
  documentary: boolean;
  intendedUse: string;
  variants: MediaVariant[];
};

const facebookPage =
  "https://www.facebook.com/p/Costas-Roofing-61551744815173/";

export const mediaAssets: MediaAsset[] = [
  {
    id: "FB-LOGO-01",
    sourcePath: "assets/source/facebook/FB-LOGO-01.jpg",
    sourceUrl: facebookPage,
    alt: "Costa’s Roofing logo with red rooflines on a black background.",
    documentary: false,
    intendedUse: "Header, footer, favicon, and brand identification",
    variants: [
      {
        role: "brand",
        path: "/media/optimized/costas-roofing-logo.webp",
        width: 512,
        height: 512,
      },
    ],
  },
  {
    id: "FB-PROJECT-01",
    sourcePath: "assets/source/facebook/FB-PROJECT-01.jpg",
    sourceUrl: facebookPage,
    alt: "Completed white home exterior with black trim and two garage doors.",
    documentary: true,
    intendedUse:
      "Completed exterior frame in the project sequence and decorative reviews hero",
    variants: [
      {
        role: "project",
        path: "/media/optimized/project-01.webp",
        width: 960,
        height: 1280,
      },
      {
        role: "page-hero-desktop",
        path: "/media/optimized/reviews-hero-desktop.webp",
        width: 1440,
        height: 900,
      },
      {
        role: "page-hero-mobile-avif",
        path: "/media/optimized/reviews-hero-mobile.avif",
        width: 780,
        height: 1040,
      },
      {
        role: "page-hero-mobile",
        path: "/media/optimized/reviews-hero-mobile.webp",
        width: 780,
        height: 1040,
      },
    ],
  },
  {
    id: "FB-PROJECT-02",
    sourcePath: "assets/source/facebook/FB-PROJECT-02.jpg",
    sourceUrl: facebookPage,
    alt: "Wide view of a completed white home exterior with black roofing and trim.",
    documentary: true,
    intendedUse:
      "Wide completed exterior frame in the project sequence and decorative projects hero",
    variants: [
      {
        role: "project",
        path: "/media/optimized/project-02.webp",
        width: 960,
        height: 1280,
      },
      {
        role: "page-hero-desktop",
        path: "/media/optimized/projects-hero-desktop.webp",
        width: 1440,
        height: 900,
      },
      {
        role: "page-hero-mobile-avif",
        path: "/media/optimized/projects-hero-mobile.avif",
        width: 780,
        height: 1040,
      },
      {
        role: "page-hero-mobile",
        path: "/media/optimized/projects-hero-mobile.webp",
        width: 780,
        height: 1040,
      },
    ],
  },
  {
    id: "FB-PROJECT-03",
    sourcePath: "assets/source/facebook/FB-PROJECT-03.jpg",
    sourceUrl: facebookPage,
    alt: "Rear exterior wall during siding installation with house wrap and scaffolding.",
    documentary: true,
    intendedUse:
      "Work-in-progress frame in the project sequence and decorative about hero",
    variants: [
      {
        role: "project",
        path: "/media/optimized/project-03.webp",
        width: 960,
        height: 1280,
      },
      {
        role: "page-hero-desktop",
        path: "/media/optimized/about-hero-desktop.webp",
        width: 1440,
        height: 900,
      },
      {
        role: "page-hero-mobile-avif",
        path: "/media/optimized/about-hero-mobile.avif",
        width: 780,
        height: 1040,
      },
      {
        role: "page-hero-mobile",
        path: "/media/optimized/about-hero-mobile.webp",
        width: 780,
        height: 1040,
      },
    ],
  },
  {
    id: "FB-PROJECT-04",
    sourcePath: "assets/source/facebook/FB-PROJECT-04.jpg",
    sourceUrl: facebookPage,
    alt: "Close view along a finished gray shingle roof ridge.",
    documentary: true,
    intendedUse:
      "Homepage hero fallback, roof detail, project sequence, and decorative services hero",
    variants: [
      {
        role: "hero-desktop",
        path: "/media/optimized/hero-roof-desktop.webp",
        width: 1440,
        height: 960,
      },
      {
        role: "hero-mobile-avif",
        path: "/media/optimized/hero-roof-mobile.avif",
        width: 780,
        height: 1040,
      },
      {
        role: "hero-mobile",
        path: "/media/optimized/hero-roof-mobile.webp",
        width: 780,
        height: 1040,
      },
      {
        role: "project",
        path: "/media/optimized/project-04.webp",
        width: 960,
        height: 1280,
      },
      {
        role: "page-hero-desktop",
        path: "/media/optimized/services-hero-desktop.webp",
        width: 1440,
        height: 900,
      },
      {
        role: "page-hero-mobile-avif",
        path: "/media/optimized/services-hero-mobile.avif",
        width: 780,
        height: 1040,
      },
      {
        role: "page-hero-mobile",
        path: "/media/optimized/services-hero-mobile.webp",
        width: 780,
        height: 1040,
      },
    ],
  },
  {
    id: "FB-PROJECT-05",
    sourcePath: "assets/source/facebook/FB-PROJECT-05.jpg",
    sourceUrl: facebookPage,
    alt: "Exterior siding installation in progress with scaffolding and wrapped walls.",
    documentary: true,
    intendedUse:
      "Alternate work-in-progress frame in the project sequence and decorative contact hero",
    variants: [
      {
        role: "project",
        path: "/media/optimized/project-05.webp",
        width: 960,
        height: 1280,
      },
      {
        role: "page-hero-desktop",
        path: "/media/optimized/contact-hero-desktop.webp",
        width: 1440,
        height: 900,
      },
      {
        role: "page-hero-mobile-avif",
        path: "/media/optimized/contact-hero-mobile.avif",
        width: 780,
        height: 1040,
      },
      {
        role: "page-hero-mobile",
        path: "/media/optimized/contact-hero-mobile.webp",
        width: 780,
        height: 1040,
      },
    ],
  },
];

export function getMediaAsset(id: MediaAsset["id"]) {
  return mediaAssets.find((asset) => asset.id === id);
}
