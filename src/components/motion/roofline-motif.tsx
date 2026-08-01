"use client";

import { useEffect } from "react";

export function RooflineMotif() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          document.querySelectorAll<SVGPathElement>(".roofline-mark path").forEach(
            (path) => {
              const length = path.getTotalLength();
              gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
              });
              gsap.to(path, {
                strokeDashoffset: 0,
                duration: 1.4,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: path.closest("section") ?? path,
                  start: "top 82%",
                  once: true,
                },
              });
            },
          );
        });

        cleanup = () => context.revert();
      },
    );

    return () => cleanup();
  }, []);

  return null;
}
