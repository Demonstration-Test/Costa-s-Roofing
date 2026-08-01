// @vitest-environment jsdom

import { render, screen, waitFor } from "@testing-library/react";

import { CinematicHero } from "@/components/home/cinematic-hero";
import { isDocumentVisible } from "./use-document-visibility";
import { decideWebglEnhancement } from "@/lib/webgl-capability";

describe("motion and WebGL progressive enhancement", () => {
  it("disables WebGL when reduced motion is requested", () => {
    expect(
      decideWebglEnhancement({ reducedMotion: true, webglAvailable: true }),
    ).toEqual({ enabled: false, reason: "reduced-motion" });
  });

  it("disables WebGL when no context is available", () => {
    expect(
      decideWebglEnhancement({ reducedMotion: false, webglAvailable: false }),
    ).toEqual({ enabled: false, reason: "unavailable" });
  });

  it("enables WebGL only when capability and motion preference allow it", () => {
    expect(
      decideWebglEnhancement({ reducedMotion: false, webglAvailable: true }),
    ).toEqual({ enabled: true, reason: "available" });
  });

  it("keeps compact viewports on the static hero to protect mobile performance", () => {
    expect(
      decideWebglEnhancement({
        compactViewport: true,
        reducedMotion: false,
        webglAvailable: true,
      }),
    ).toEqual({ enabled: false, reason: "compact-viewport" });
  });

  it("treats hidden and prerender documents as paused", () => {
    expect(isDocumentVisible("visible")).toBe(true);
    expect(isDocumentVisible("hidden")).toBe(false);
    expect(isDocumentVisible("prerender")).toBe(false);
  });

  it("keeps the static hero content when the WebGL context is unavailable", async () => {
    render(<CinematicHero />);

    expect(
      screen.getByRole("heading", { name: "Protection, restored." }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Close view along a finished gray shingle roof ridge."),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("hero-webgl-boundary")).toHaveAttribute(
        "data-enhancement",
        "fallback",
      );
    });
    expect(document.querySelector("canvas")).not.toBeInTheDocument();
  });
});
