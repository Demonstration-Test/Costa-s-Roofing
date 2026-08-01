import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outputDirectory = join(root, "out");
const routePaths = [
  "/",
  "/services",
  "/roof-repair",
  "/roof-replacement",
  "/roof-inspection",
  "/storm-damage",
  "/exterior-services",
  "/projects",
  "/reviews",
  "/about",
  "/contact",
  "/privacy",
];

function validateBasePath(value = "") {
  if (!value) return "";
  if (!/^\/[A-Za-z0-9][A-Za-z0-9._-]*$/.test(value)) {
    throw new Error(`Invalid PUBLISH_BASE_PATH: ${value}`);
  }
  return value;
}

function validateOrigin(value) {
  if (!value) return undefined;
  const origin = new URL(value);
  if (
    origin.protocol !== "https:" ||
    origin.username ||
    origin.password ||
    origin.pathname !== "/" ||
    origin.search ||
    origin.hash ||
    value !== origin.origin
  ) {
    throw new Error(`Invalid PUBLIC_SITE_ORIGIN: ${value}`);
  }
  return origin.origin;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const basePath = validateBasePath(process.env.PUBLISH_BASE_PATH);
const origin = validateOrigin(process.env.PUBLIC_SITE_ORIGIN);

assert(existsSync(outputDirectory), "Missing static export directory: out");

for (const route of routePaths) {
  const relativeHtml = route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
  const htmlPath = join(outputDirectory, relativeHtml);
  assert(existsSync(htmlPath), `Missing exported route: ${relativeHtml}`);

  const html = readFileSync(htmlPath, "utf8");
  assert(html.includes('href="tel:+19735172952"'), `Missing phone URI in ${relativeHtml}`);
  assert(!html.includes('href="mailto:'), `Unexpected email action in ${relativeHtml}`);
  assert(!html.includes("602 William"), `Unexpected street address in ${relativeHtml}`);

  if (origin) {
    const folderRoute = route === "/" ? "/" : `${route}/`;
    const canonical = `${origin}${basePath}${folderRoute}`;
    assert(html.includes(`rel="canonical" href="${canonical}"`), `Missing canonical in ${relativeHtml}`);
    assert(html.includes('name="robots" content="index, follow"'), `Missing public robots metadata in ${relativeHtml}`);
  } else {
    assert(html.includes('name="robots" content="noindex, nofollow"'), `Missing preview robots metadata in ${relativeHtml}`);
  }

  if (basePath) {
    assert(html.includes(`href="${basePath}/services/"`), `Missing prefixed navigation in ${relativeHtml}`);
    assert(html.includes(`${basePath}/media/optimized/`), `Missing prefixed media in ${relativeHtml}`);
    assert(!html.includes(`${basePath}${basePath}`), `Double base path in ${relativeHtml}`);
  }
}

const robots = readFileSync(join(outputDirectory, "robots.txt"), "utf8");
const sitemap = readFileSync(join(outputDirectory, "sitemap.xml"), "utf8");

if (origin) {
  assert(robots.includes(`Sitemap: ${origin}${basePath}/sitemap.xml`), "Robots sitemap URL is incorrect");
  assert(sitemap.includes(`${origin}${basePath}/`), "Public sitemap has no route URLs");
} else {
  assert(robots.includes("Disallow: /"), "Preview robots file does not block crawling");
  assert(!sitemap.includes("<url>"), "Preview sitemap must be empty");
}

console.log(`Verified ${routePaths.length} static routes${basePath ? ` at ${basePath}` : " at the origin"}.`);
