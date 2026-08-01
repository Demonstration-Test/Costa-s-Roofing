// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";
import { business } from "@/content/business";
import { mediaAssets } from "@/content/media";
import { reviews } from "@/content/reviews";
import { findUnsupportedContent } from "@/lib/content-guard";

vi.mock("@/components/hero/hero-webgl-boundary", () => ({
  HeroWebglBoundary: () => (
    <div data-enhancement="fallback" data-testid="hero-webgl-boundary" />
  ),
}));

describe("homepage static composition", () => {
  it("renders the approved hero copy and call-first actions", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Protection, restored." }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(business.serviceArea, { exact: false }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByText("5.0 Google rating · 37 reviews · Open 24 hours for calls"),
    ).toBeInTheDocument();
    for (const callLink of screen.getAllByRole("link", {
      name: `Call ${business.phone.display}`,
    })) {
      expect(callLink).toHaveAttribute("href", business.phone.uri);
    }
    expect(
      screen.getByRole("link", { name: "Explore services" }),
    ).toHaveAttribute("href", "/services/");
  });

  it("renders the approved homepage sequence in order", () => {
    const { container } = render(<HomePage />);
    const sectionNames = Array.from(
      container.querySelectorAll<HTMLElement>("[data-home-section]"),
    ).map((section) => section.dataset.homeSection);

    expect(sectionNames).toEqual([
      "hero",
      "pathways",
      "services",
      "project",
      "reviews",
      "call-process",
      "service-area",
      "final-call",
    ]);
  });

  it("uses only the approved service families and links to real destinations", () => {
    render(<HomePage />);

    expect(screen.getByText("Roof Repair")).toBeInTheDocument();
    expect(screen.getByText("Roof Replacement")).toBeInTheDocument();
    expect(screen.getByText("Roof Installation")).toBeInTheDocument();
    expect(screen.getByText("Roof Inspection")).toBeInTheDocument();
    expect(screen.getByText("Storm and Wind-Damage Repair")).toBeInTheDocument();
    expect(screen.getByText("Gutters")).toBeInTheDocument();
    expect(screen.getByText("Siding")).toBeInTheDocument();
    expect(screen.getByText("Skylights and Ventilation")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View all services" }),
    ).toHaveAttribute("href", "/services/");
  });

  it("presents the authentic media set as one project sequence", () => {
    const { container } = render(<HomePage />);
    const projectAssets = mediaAssets.filter((asset) => asset.documentary);

    expect(screen.getByText("One documented exterior project")).toBeInTheDocument();
    expect(screen.queryByText(/before and after/i)).not.toBeInTheDocument();

    for (const asset of projectAssets) {
      const projectVariant = asset.variants.find(
        (variant) => variant.role === "project",
      );
      expect(
        container.querySelector(`img[src="${projectVariant?.path}"]`),
      ).toBeInTheDocument();
    }
  });

  it("offers the approved mobile hero derivative to narrow browsers", () => {
    const { container } = render(<HomePage />);
    expect(
      container.querySelector(
        'source[media="(max-width: 767px)"][srcset="/media/optimized/hero-roof-mobile.webp"]',
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        'source[type="image/avif"][media="(max-width: 767px)"][srcset="/media/optimized/hero-roof-mobile.avif"]',
      ),
    ).toBeInTheDocument();
  });

  it("preserves approved review excerpts and attribution", () => {
    render(<HomePage />);

    for (const review of reviews.slice(0, 3)) {
      expect(screen.getByText(review.excerpt)).toBeInTheDocument();
      expect(screen.getByText(review.reviewer)).toBeInTheDocument();
    }
  });

  it("contains no unapproved conversion mechanism or unsupported public claim", () => {
    const { container } = render(<HomePage />);
    const text = container.textContent ?? "";

    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
    expect(text).not.toMatch(/602 William/i);
    expect(text).not.toMatch(/years in business/i);
    expect(findUnsupportedContent(text)).toEqual([]);

    for (const anchor of container.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]')) {
      expect(anchor).toHaveAttribute("href", business.phone.uri);
    }
  });
});
