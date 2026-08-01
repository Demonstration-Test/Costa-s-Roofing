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
    output: "hero-roof-mobile.webp",
    width: 780,
    height: 1040,
    fit: "cover",
    quality: 75,
  },
];

for (const job of jobs) {
  await sharp(path.join(sourceDirectory, job.source))
    .rotate()
    .resize({
      width: job.width,
      height: job.height,
      fit: job.fit,
      position: "centre",
      withoutEnlargement: false,
    })
    .webp({ quality: job.quality, effort: 6 })
    .toFile(path.join(outputDirectory, job.output));
}

console.log(`Created ${jobs.length} optimized media files.`);
