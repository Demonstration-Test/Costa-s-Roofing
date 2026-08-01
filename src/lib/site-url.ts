export function validateBasePath(value?: string): string {
  if (!value) {
    return "";
  }

  if (!/^\/[A-Za-z0-9][A-Za-z0-9._-]*$/.test(value)) {
    throw new Error(`Invalid PUBLISH_BASE_PATH: ${value}`);
  }

  return value;
}

export function parsePublicOrigin(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const origin = new URL(value);
    const isValid =
      origin.protocol === "https:" &&
      !origin.username &&
      !origin.password &&
      origin.pathname === "/" &&
      !origin.search &&
      !origin.hash &&
      value === origin.origin;

    if (!isValid) {
      throw new Error();
    }

    return origin.origin;
  } catch {
    throw new Error(`Invalid PUBLIC_SITE_ORIGIN: ${value}`);
  }
}

function normalizeRoute(route: string): string {
  if (!route.startsWith("/")) {
    throw new Error(`Internal routes must start with "/": ${route}`);
  }

  return route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}/`;
}

export function buildInternalPath(route: string, basePath = ""): string {
  return `${validateBasePath(basePath)}${normalizeRoute(route)}` || "/";
}

export function buildAssetPath(asset: string, basePath = ""): string {
  if (!asset.startsWith("/")) {
    throw new Error(`Asset paths must start with "/": ${asset}`);
  }

  return `${validateBasePath(basePath)}/${asset.replace(/^\/+/, "")}`;
}

export function buildPublicUrl(
  route: string,
  origin: string,
  basePath = "",
): string {
  const publicOrigin = parsePublicOrigin(origin);

  if (!publicOrigin) {
    throw new Error("PUBLIC_SITE_ORIGIN is required");
  }

  return `${publicOrigin}${buildInternalPath(route, basePath)}`;
}
