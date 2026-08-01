// @vitest-environment jsdom

import { cleanup, render } from "@testing-library/react";
import type { ComponentType } from "react";
import { afterEach, vi } from "vitest";

import { PageHero } from "./page-hero";

type ImageHeroProps = {
  title: string;
  intro: string;
  index: string;
  media: {
    assetId: string;
    desktopPosition: string;
    mobilePosition: string;
  };
};

const ImagePageHero = PageHero as ComponentType<ImageHeroProps>;

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

describe("PageHero authenticated media", () => {
  it.each([
    ["", "/media/optimized/projects-hero-desktop.webp"],
    [
      "/Costa-s-Roofing",
      "/Costa-s-Roofing/media/optimized/projects-hero-desktop.webp",
    ],
  ])("builds image paths for the %s base path", (basePath, expectedDesktopPath) => {
    vi.stubEnv("PUBLISH_BASE_PATH", basePath);

    const { container } = render(
      <ImagePageHero
        index="01 project"
        intro="Approved project media."
        media={{
          assetId: "FB-PROJECT-02",
          desktopPosition: "50% 52%",
          mobilePosition: "55% 55%",
        }}
        title="One project, documented"
      />,
    );

    const section = container.querySelector(".page-hero");
    const picture = section?.querySelector(".page-hero__media picture");

    expect(section).toHaveClass("page-hero--media");
    expect(section).toHaveStyle({
      "--page-hero-desktop-position": "50% 52%",
      "--page-hero-mobile-position": "55% 55%",
    });
    expect(picture?.querySelector("img")).toHaveAttribute(
      "src",
      expectedDesktopPath,
    );
    expect(picture?.querySelector("img")).toHaveAttribute("decoding", "sync");
    expect(picture?.querySelector('source[type="image/avif"]')).toHaveAttribute(
      "srcset",
      expectedDesktopPath.replace("desktop.webp", "mobile.avif"),
    );
    expect(picture?.querySelector('source[type="image/webp"]')).toHaveAttribute(
      "srcset",
      expectedDesktopPath.replace("desktop.webp", "mobile.webp"),
    );
  });

  it("fails clearly when configured media lacks a required derivative", () => {
    expect(() =>
      render(
        <ImagePageHero
          index="Brand"
          intro="Invalid hero configuration."
          media={{
            assetId: "FB-LOGO-01",
            desktopPosition: "50% 50%",
            mobilePosition: "50% 50%",
          }}
          title="Invalid hero"
        />,
      ),
    ).toThrow(
      "PageHero media FB-LOGO-01 is missing a required responsive derivative.",
    );
  });
});
