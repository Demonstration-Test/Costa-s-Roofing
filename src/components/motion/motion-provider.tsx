"use client";

import { animate } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { RooflineMotif } from "./roofline-motif";

export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    let disposed = false;
    let destroyLenis = () => {};
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section:not(.hero), .site-footer",
      ),
    );

    const reveal = (element: HTMLElement) => {
      void animate(
        element,
        { opacity: [0, 1], clipPath: ["inset(0 0 7% 0)", "inset(0 0 0% 0)"] },
        { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
      );
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  reveal(entry.target as HTMLElement);
                  observer?.unobserve(entry.target);
                }
              });
            },
            { rootMargin: "0px 0px -8%", threshold: 0.08 },
          );

    revealTargets.forEach((element) => {
      if (observer) {
        element.style.opacity = "0";
        observer.observe(element);
      } else {
        reveal(element);
      }
    });

    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) {
        return;
      }

      const lenis = new Lenis({
        autoRaf: true,
        duration: 1.05,
        smoothWheel: true,
      });
      const updateForVisibility = () =>
        document.visibilityState === "visible" ? lenis.start() : lenis.stop();
      document.addEventListener("visibilitychange", updateForVisibility);
      updateForVisibility();
      destroyLenis = () => {
        document.removeEventListener("visibilitychange", updateForVisibility);
        lenis.destroy();
      };
    });

    return () => {
      disposed = true;
      observer?.disconnect();
      destroyLenis();
    };
  }, []);

  return (
    <>
      {children}
      <RooflineMotif />
    </>
  );
}
