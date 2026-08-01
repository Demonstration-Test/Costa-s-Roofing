(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  if (reducedMotion.matches) {
    document.documentElement.dataset.motion = "reduced";
    return;
  }

  document.documentElement.dataset.motion = "enhanced";

  const animate = (element, keyframes, options) => {
    if (!(element instanceof HTMLElement || element instanceof SVGElement)) {
      return;
    }

    element.animate(keyframes, {
      duration: 720,
      easing: "cubic-bezier(.2,.8,.2,1)",
      fill: "both",
      ...options,
    });
  };

  document
    .querySelectorAll(".hero h1, .hero__intro, .hero__actions, .hero__proof")
    .forEach((element, index) => {
      animate(
        element,
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { delay: 90 + index * 90 },
      );
    });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animate(
          entry.target,
          [
            { opacity: 0.01, transform: "translateY(32px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {},
        );
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.06 },
  );

  document.querySelectorAll("main > section:not(.hero)").forEach((section) => {
    observer.observe(section);
  });

  const rooflineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !(entry.target instanceof SVGPathElement)) {
          return;
        }

        const length = entry.target.getTotalLength();
        entry.target.style.strokeDasharray = `${length}`;
        animate(
          entry.target,
          [
            { strokeDashoffset: length, opacity: 0.2 },
            { strokeDashoffset: 0, opacity: 1 },
          ],
          { duration: 900 },
        );
        rooflineObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "120px" },
  );

  document.querySelectorAll(".roofline-mark path").forEach((path) => {
    rooflineObserver.observe(path);
  });

  const syncVisibility = () => {
    document.documentElement.dataset.visibility = document.hidden
      ? "hidden"
      : "visible";
  };

  document.addEventListener("visibilitychange", syncVisibility);
  syncVisibility();
})();
