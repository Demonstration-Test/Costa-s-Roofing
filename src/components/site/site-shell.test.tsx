// @vitest-environment jsdom

import { render, screen, within } from "@testing-library/react";

import { PhoneCta } from "@/components/ui/phone-cta";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const basePath = "/costas-roofing";

describe("shared site shell", () => {
  it("keeps the approved phone action visible in the desktop header", () => {
    render(<SiteHeader basePath={basePath} />);

    const desktopNavigation = screen.getByLabelText("Primary navigation");
    const callLink = within(desktopNavigation).getByRole("link", {
      name: /call \(973\) 517-2952/i,
    });

    expect(callLink).toHaveAttribute("href", "tel:+19735172952");
    expect(
      within(desktopNavigation).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/costas-roofing/contact/");
  });

  it("provides a native details and summary mobile navigation baseline", () => {
    const { container } = render(<SiteHeader basePath={basePath} />);
    const details = container.querySelector("details");
    const summary = container.querySelector("summary");

    expect(details).toBeInTheDocument();
    expect(summary).toHaveTextContent("Menu");

    const mobileNavigation = screen.getByLabelText("Mobile navigation");
    expect(
      within(mobileNavigation).getByRole("link", { name: "Services" }),
    ).toHaveAttribute("href", "/costas-roofing/services/");
    expect(
      within(mobileNavigation).getByRole("link", { name: "Projects" }),
    ).toHaveAttribute("href", "/costas-roofing/projects/");
    expect(
      within(mobileNavigation).getByRole("link", { name: "Reviews" }),
    ).toHaveAttribute("href", "/costas-roofing/reviews/");
    expect(
      within(mobileNavigation).getByRole("link", { name: "About" }),
    ).toHaveAttribute("href", "/costas-roofing/about/");
    expect(
      within(mobileNavigation).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/costas-roofing/contact/");
  });

  it("provides a persistent mobile call control outside the menu", () => {
    render(<SiteHeader basePath={basePath} />);

    expect(
      screen.getByRole("link", { name: "Call Costa’s Roofing" }),
    ).toHaveAttribute("href", "tel:+19735172952");
  });

  it("renders the approved phone CTA without implying a form workflow", () => {
    render(<PhoneCta label="Call about your roof" />);

    expect(
      screen.getByRole("link", { name: "Call about your roof" }),
    ).toHaveAttribute("href", "tel:+19735172952");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("renders an address-free and email-free footer with approved links", () => {
    render(<SiteFooter basePath={basePath} />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent("Harrison and surrounding cities");
    expect(footer).toHaveTextContent("Open 24 hours for calls");
    expect(
      within(footer).getByRole("link", { name: /call \(973\) 517-2952/i }),
    ).toHaveAttribute("href", "tel:+19735172952");
    expect(
      within(footer).getByRole("link", { name: "Privacy" }),
    ).toHaveAttribute("href", "/costas-roofing/privacy/");
    expect(
      within(footer).getByRole("link", { name: "Facebook" }),
    ).toHaveAttribute(
      "href",
      "https://www.facebook.com/p/Costas-Roofing-61551744815173/",
    );
    expect(footer).not.toHaveTextContent(/@/);
    expect(footer).not.toHaveTextContent(/\d+\s+\w+\s+(street|st|avenue|ave)/i);
  });
});
