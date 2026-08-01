import { business } from "./business";
import { reviews } from "./reviews";
import { routes } from "./routes";
import { services } from "./services";

describe("approved Costa's Roofing content", () => {
  it("centralizes the exact public identity and phone-only contact", () => {
    expect(business.publicName).toBe("Costa’s Roofing");
    expect(business.phone.display).toBe("(973) 517-2952");
    expect(business.phone.uri).toBe("tel:+19735172952");
    expect(business.serviceArea).toBe("Harrison and surrounding cities");
    expect(business.hours.publicLabel).toBe("Open 24 hours for calls");
    expect(business.rating).toEqual({
      score: 5,
      count: 37,
      source: "Google",
      lastReviewed: "2026-08-01",
    });
  });

  it("does not expose unapproved identity or contact fields", () => {
    expect(business).not.toHaveProperty("legalName");
    expect(business).not.toHaveProperty("email");
    expect(business).not.toHaveProperty("address");
  });

  it("contains only the eight approved service families", () => {
    expect(services.map((service) => service.name)).toEqual([
      "Roof Repair",
      "Roof Replacement",
      "Roof Installation",
      "Roof Inspection",
      "Storm and Wind-Damage Repair",
      "Gutters",
      "Siding",
      "Skylights and Ventilation",
    ]);
  });

  it("contains the six approved attributed review excerpts", () => {
    expect(reviews).toHaveLength(6);
    expect(reviews[0]).toEqual({
      reviewer: "Carlos Rivas",
      excerpt:
        "The crew was extremely efficient and professional from start to finish.",
      source: "Google",
    });
    expect(reviews.at(-1)?.reviewer).toBe("Stephen O'Brien");
  });

  it("defines the twelve approved routes and no city pages", () => {
    expect(routes.map((route) => route.path)).toEqual([
      "/",
      "/services",
      "/roof-repair",
      "/roof-replacement",
      "/roof-inspection",
      "/storm-damage",
      "/exterior-services",
      "/projects",
      "/reviews",
      "/about",
      "/contact",
      "/privacy",
    ]);
  });
});
