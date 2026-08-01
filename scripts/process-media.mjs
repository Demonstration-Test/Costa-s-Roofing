import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const sourceDirectory = path.resolve("assets/source/facebook");
const outputDirectory = path.resolve("public/media/optimized");

await mkdir(outputDirectory, { recursive: true });

const jobs = [
  {
    source: "FB-LOGO-01.jpg",
    output: "costas-roofing-logo.webp",
    width: 512,
    height: 512,
    fit: "cover",
    quality: 90,
  },
  ...[1, 2, 3, 4, 5].map((number) => ({
    source: `FB-PROJECT-0${number}.jpg`,
    output: `project-0${number}.webp`,
    width: 960,
    height: 1280,
    fit: "cover",
    quality: 80,
  })),
  {
    source: "FB-PROJECT-04.jpg",
    output: "hero-roof-desktop.webp",
    width: 1440,
    height: 960,
    fit: "cover",
    quality: 77,
  },
  {
    source: "FB-PROJECT-04.jpg",
    output: "hero-roof-mobile.avif",
    width: 780,
    height: 1040,
    fit: "cover",
    format: "avif",
    quality: 54,
  },
  {
    source: "FB-PROJECT-04.jpg",
    output: "hero-roof-mobile.webp",
    width: 780,
    height: 1040,
    fit: "cover",
    quality: 68,
  },
  ...[
    {
      source: "FB-PROJECT-04.jpg",
      stem: "services-hero",
      desktopFocal: { x: 0.5, y: 0.5 },
      mobileFocal: { x: 0.58, y: 0.52 },
    },
    {
      source: "FB-PROJECT-02.jpg",
      stem: "projects-hero",
      desktopFocal: { x: 0.5, y: 0.52 },
      mobileFocal: { x: 0.55, y: 0.55 },
      mobileAvifQuality: 34,
    },
    {
      source: "FB-PROJECT-01.jpg",
      stem: "reviews-hero",
      desktopFocal: { x: 0.5, y: 0.56 },
      mobileFocal: { x: 0.56, y: 0.58 },
    },
    {
      source: "FB-PROJECT-03.jpg",
      stem: "about-hero",
      desktopFocal: { x: 0.5, y: 0.48 },
      mobileFocal: { x: 0.52, y: 0.5 },
    },
    {
      source: "FB-PROJECT-05.jpg",
      stem: "contact-hero",
      desktopFocal: { x: 0.5, y: 0.5 },
      mobileFocal: { x: 0.55, y: 0.52 },
    },
  ].flatMap(
    ({
      source,
      stem,
      desktopFocal,
      mobileFocal,
      mobileAvifQuality = 50,
    }) => [
    {
      source,
      output: `${stem}-desktop.webp`,
      width: 1440,
      height: 900,
      fit: "cover",
      focal: desktopFocal,
      quality: 68,
    },
    {
      source,
      output: `${stem}-mobile.avif`,
      width: 780,
      height: 1040,
      fit: "cover",
      focal: mobileFocal,
      format: "avif",
      quality: mobileAvifQuality,
    },
    {
      source,
      output: `${stem}-mobile.webp`,
      width: 780,
      height: 1040,
      fit: "cover",
      focal: mobileFocal,
      quality: 62,
    },
    ],
  ),
];

function focalExtract(width, height, targetWidth, targetHeight, focal) {
  const targetRatio = targetWidth / targetHeight;
  const sourceRatio = width / height;
  const cropWidth =
    sourceRatio > targetRatio ? Math.round(height * targetRatio) : width;
  const cropHeight =
    sourceRatio > targetRatio ? height : Math.round(width / targetRatio);
  const left = Math.max(
    0,
    Math.min(width - cropWidth, Math.round(focal.x * width - cropWidth / 2)),
  );
  const top = Math.max(
    0,
    Math.min(height - cropHeight, Math.round(focal.y * height - cropHeight / 2)),
  );

  return { left, top, width: cropWidth, height: cropHeight };
}

for (const job of jobs) {
  const sourcePath = path.join(sourceDirectory, job.source);
  let image = sharp(sourcePath).rotate();

  if (job.focal) {
    const metadata = await sharp(sourcePath).metadata();
    const swapsAxes = [5, 6, 7, 8].includes(metadata.orientation ?? 0);
    const orientedWidth = swapsAxes ? metadata.height : metadata.width;
    const orientedHeight = swapsAxes ? metadata.width : metadata.height;

    if (!orientedWidth || !orientedHeight) {
      throw new Error(`Could not read dimensions for ${job.source}`);
    }

    image = image
      .extract(
        focalExtract(
          orientedWidth,
          orientedHeight,
          job.width,
          job.height,
          job.focal,
        ),
      )
      .resize({ width: job.width, height: job.height, fit: "fill" });
  } else {
    image = image.resize({
      width: job.width,
      height: job.height,
      fit: job.fit,
      position: "centre",
      withoutEnlargement: false,
    });
  }

  if (job.format === "avif") {
    await image
      .avif({ quality: job.quality, effort: 6 })
      .toFile(path.join(outputDirectory, job.output));
  } else {
    await image
      .webp({ quality: job.quality, effort: 6 })
      .toFile(path.join(outputDirectory, job.output));
  }
}

console.log(`Created ${jobs.length} optimized media files.`);
