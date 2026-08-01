"use client";

import {
  Component,
  type ComponentType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { useDocumentVisibility } from "@/components/motion/use-document-visibility";
import {
  canUseWebgl,
  decideWebglEnhancement,
  type WebglDecision,
} from "@/lib/webgl-capability";

class WebglErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // The authentic static hero remains visible beneath this enhancement.
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroWebglBoundary({
  detectWebgl = canUseWebgl,
}: {
  detectWebgl?: () => boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  const documentVisible = useDocumentVisibility();
  const [inView, setInView] = useState(true);
  const [decision, setDecision] = useState<WebglDecision | null>(null);
  const [HeroWebgl, setHeroWebgl] = useState<ComponentType<{
    active: boolean;
  }> | null>(null);

  useEffect(() => {
    let cancelled = false;
    let loadTimer: number | undefined;
    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      const reducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches ?? false;
      const compactViewport = window.matchMedia?.(
        "(max-width: 767px)",
      ).matches ?? false;
      const nextDecision = decideWebglEnhancement({
        compactViewport,
        reducedMotion,
        webglAvailable: detectWebgl(),
      });
      setDecision(nextDecision);

      if (nextDecision.enabled) {
        loadTimer = window.setTimeout(() => {
          void import("./hero-webgl").then((module) => {
            if (!cancelled) {
              setHeroWebgl(() => module.HeroWebgl);
            }
          });
        }, 300);
      }
    });

    return () => {
      cancelled = true;
      if (loadTimer !== undefined) {
        window.clearTimeout(loadTimer);
      }
    };
  }, [detectWebgl]);

  useEffect(() => {
    if (!container.current || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  const enhancementState = decision?.enabled ? "active" : decision ? "fallback" : "checking";

  return (
    <div
      aria-hidden="true"
      className="hero-webgl-boundary"
      data-enhancement={enhancementState}
      data-testid="hero-webgl-boundary"
      ref={container}
    >
      {decision?.enabled && HeroWebgl ? (
        <WebglErrorBoundary>
          <HeroWebgl active={documentVisible && inView} />
        </WebglErrorBoundary>
      ) : null}
    </div>
  );
}
