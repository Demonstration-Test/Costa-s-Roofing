import type { NextConfig } from "next";
import { validateBasePath } from "./src/lib/site-url";

export function createNextConfig(basePathValue?: string): NextConfig {
  const basePath = validateBasePath(basePathValue);

  return {
    output: "export",
    trailingSlash: true,
    ...(basePath ? { basePath } : {}),
    images: {
      unoptimized: true,
    },
  };
}

const nextConfig = createNextConfig(process.env.PUBLISH_BASE_PATH);

export default nextConfig;
