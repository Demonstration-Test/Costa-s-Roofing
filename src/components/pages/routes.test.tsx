// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import type { ComponentType } from "react";

import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import ExteriorServicesPage from "@/app/exterior-services/page";
import PrivacyPage from "@/app/privacy/page";
import ProjectsPage from "@/app/projects/page";
import ReviewsPage from "@/app/reviews/page";
import RoofInspectionPage from "@/app/roof-inspection/page";
import RoofRepairPage from "@/app/roof-repair/page";
import RoofReplacementPage from "@/app/roof-replacement/page";
import ServicesPage from "@/app/services/page";
import StormDamagePage from "@/app/storm-damage/page";
import { business } from "@/content/business";
import { mediaAssets } from "@/content/media";
import { reviews } from "@/content/reviews";
import { findUnsupportedContent } from "@/lib/content-guard";
import { facebookUrl } from "@/lib/site-metadata";

const routePages: Array<[string, ComponentType, string]> = [
  ["services", ServicesPage, "Roofing and exterior services"],
  ["roof repair", RoofRepairPage, "Roof repair"],
  ["roof replacement", RoofReplacementPage, "Roof replacement"],
  ["roof inspection", RoofInspectionPage, "Roof inspection"],
  ["storm damage", StormDamagePage, "Storm and wind-damage repair"],
  ["exterior services", ExteriorServicesPage, "Exterior services"],
  ["projects", ProjectsPage, "One project, documented"],
  ["reviews", ReviewsPage, "Customer reviews"],
  ["about", AboutPage, "Built around the work"],
  ["contact", ContactPage, "Start with a call"],
  ["privacy", PrivacyPage, "Website privacy notice"],
];

describe("secondary route contracts", () => {
  it.each(routePages)("renders the %s route with a unique heading", (_, Page, heading) => {
    render(<Page />);
    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it("keeps every service-detail route contextual and phone-only", () => {
    for (const Page of [
      RoofRepairPage,
      RoofReplacementPage,
      RoofInspectionPage,
      StormDamagePage,
    ]) {
      const { container, unmount } = render(<Page />);
      expect(container.querySelector('a[href="tel:+19735172952"]')).toBeInTheDocument();
      expect(container.querySelector("form")).not.toBeInTheDocument();
      expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
      unmount();
    }
  });

  it("states the inspection and storm-safety boundaries without promises", () => {
    render(<RoofInspectionPage />);
    expect(screen.getByText("Calling does not confirm an appointment.")).toBeInTheDocument();
    cleanup();

    render(<StormDamagePage />);
    expect(
      screen.getByText(/do not climb onto the roof to inspect damage/i),
    ).toBeInTheDocument();
  });

  it("groups the four approved exterior services on one route", () => {
    render(<ExteriorServicesPage />);
    for (const heading of ["Gutters", "Siding", "Skylights", "Ventilation"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
  });

  it("keeps every authentic project photograph in one neutral narrative", () => {
    const { container } = render(<ProjectsPage />);
    for (const asset of mediaAssets.filter((entry) => entry.documentary)) {
      const variant = asset.variants.find((entry) => entry.role === "project");
      expect(container.querySelector(`img[src="${variant?.path}"]`)).toBeInTheDocument();
    }
    expect(container.textContent).not.toMatch(/before and after/i);
    expect(container.textContent).not.toMatch(/project location/i);
  });

  it("renders all six review excerpts and the supplied rating snapshot", () => {
    render(<ReviewsPage />);
    expect(screen.getByText("5.0")).toBeInTheDocument();
    expect(screen.getByText("37 Google reviews")).toBeInTheDocument();
    expect(screen.getByText("Individual experiences vary.")).toBeInTheDocument();
    for (const review of reviews) {
      expect(screen.getByText(review.excerpt)).toBeInTheDocument();
      expect(screen.getByText(review.reviewer)).toBeInTheDocument();
    }
  });

  it("keeps about content evidence-led and omits unapproved company facts", () => {
    const { container } = render(<AboutPage />);
    expect(container).toHaveTextContent("Communication");
    expect(container).toHaveTextContent("Workmanship");
    expect(container).toHaveTextContent("Cleanup");
    expect(container).toHaveTextContent("Responsiveness");
    expect(container.textContent).not.toMatch(/founded|years in business|owner biography|team size/i);
  });

  it("keeps contact to phone, hours, service area, and Facebook", () => {
    const { container } = render(<ContactPage />);
    expect(screen.getByText(business.phone.display)).toBeInTheDocument();
    expect(screen.getByText(business.hours.publicLabel)).toBeInTheDocument();
    expect(screen.getByText(business.serviceArea)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      facebookUrl,
    );
    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/602 William|map/i);
  });

  it("renders the fixed five-part factual privacy notice", () => {
    const { container } = render(<PrivacyPage />);
    const text = container.textContent ?? "";

    expect(text).toContain("2026-08-01");
    expect(text).toContain(
      "no contact form, customer account, file upload, analytics provider, advertising pixel, chat, scheduling widget, or online payment",
    );
    expect(text).toContain(
      "does not intentionally collect or transmit personal information through its own interface",
    );
    expect(text).toContain("handled through your telephone provider");
    expect(text).toContain("Facebook’s own privacy practices");
    expect(text).toContain(business.phone.display);
    expect(text).not.toMatch(/cookie|retention|deletion|regulatory|data controller/i);
  });

  it.each(routePages)("keeps the %s route free of unsupported public claims", (_, Page) => {
    const { container } = render(<Page />);
    expect(findUnsupportedContent(container.textContent ?? "")).toEqual([]);
  });
});
