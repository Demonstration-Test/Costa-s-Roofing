export type WebglDecision =
  | { enabled: true; reason: "available" }
  | {
      enabled: false;
      reason: "compact-viewport" | "reduced-motion" | "unavailable";
    };

export function decideWebglEnhancement({
  compactViewport = false,
  reducedMotion,
  webglAvailable,
}: {
  compactViewport?: boolean;
  reducedMotion: boolean;
  webglAvailable: boolean;
}): WebglDecision {
  if (compactViewport) {
    return { enabled: false, reason: "compact-viewport" };
  }

  if (reducedMotion) {
    return { enabled: false, reason: "reduced-motion" };
  }

  if (!webglAvailable) {
    return { enabled: false, reason: "unavailable" };
  }

  return { enabled: true, reason: "available" };
}

export function canUseWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}
