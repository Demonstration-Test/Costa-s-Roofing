export const servicePageContent = {
  "/roof-repair": {
    title: "Roof repair",
    intro:
      "When a leak or visible roof damage changes the way your home feels, start with a direct conversation about what you are seeing.",
    concerns: [
      "Leaks and visible water entry",
      "Missing, shifted, or visibly damaged roofing",
      "Roof concerns noticed from the ground",
    ],
    boundary:
      "A call can help explain the concern, but the condition of a roof cannot be diagnosed remotely.",
    reviewIndex: 0,
    cta: "Call about a roof leak",
    related: [
      { label: "Roof inspection", path: "/roof-inspection" },
      { label: "Storm damage", path: "/storm-damage" },
    ],
  },
  "/roof-replacement": {
    title: "Roof replacement",
    intro:
      "Discuss replacing an existing roof or planning a new roof installation around the needs of the property.",
    concerns: [
      "Planning for a full roof replacement",
      "Roof installation for the property",
      "Questions to bring into an on-site conversation",
    ],
    boundary:
      "The right scope depends on the property. Material selection and project planning begin after an on-site conversation.",
    reviewIndex: 2,
    cta: "Call about roof replacement",
    related: [
      { label: "All services", path: "/services" },
      { label: "Roof inspection", path: "/roof-inspection" },
    ],
  },
  "/roof-inspection": {
    title: "Roof inspection",
    intro:
      "Request an on-site look when a leak, visible change, or future roofing plan calls for a clearer understanding.",
    concerns: [
      "Visible changes noticed from the ground",
      "Questions before repair or replacement",
      "A closer look after wind or storm conditions",
    ],
    boundary:
      "Costa’s Roofing will discuss the property and the next available step by phone.",
    boundaryLead: "Calling does not confirm an appointment.",
    reviewIndex: 4,
    cta: "Call to request a roof inspection",
    related: [
      { label: "Roof repair", path: "/roof-repair" },
      { label: "Roof replacement", path: "/roof-replacement" },
    ],
  },
  "/storm-damage": {
    title: "Storm and wind-damage repair",
    intro:
      "If wind or storm conditions leave visible roof damage, call to describe what you can safely see from the ground.",
    concerns: [
      "Visible changes after wind or storm conditions",
      "Leaks or damage that appeared after severe weather",
      "A request for an on-site inspection",
    ],
    boundary:
      "For your safety, do not climb onto the roof to inspect damage. Keep your distance from loose material and discuss visible concerns by phone.",
    reviewIndex: 1,
    cta: "Call about storm or wind damage",
    related: [
      { label: "Roof repair", path: "/roof-repair" },
      { label: "Roof inspection", path: "/roof-inspection" },
    ],
  },
} as const;

export const exteriorServiceContent = [
  {
    id: "gutters",
    title: "Gutters",
    body: "Discuss gutter work as part of the drainage path around the roof and exterior.",
  },
  {
    id: "siding",
    title: "Siding",
    body: "Discuss siding work for the visible exterior surfaces of the home.",
  },
  {
    id: "skylights",
    title: "Skylights",
    body: "Discuss skylight work where the opening and roof meet.",
  },
  {
    id: "ventilation",
    title: "Ventilation",
    body: "Discuss roof ventilation within the needs and condition of the property.",
  },
] as const;

export const privacyNotice = {
  date: "2026-08-01",
  statements: [
    "This first-release website has no contact form, customer account, file upload, analytics provider, advertising pixel, chat, scheduling widget, or online payment.",
    "This website does not intentionally collect or transmit personal information through its own interface.",
    "Calling Costa’s Roofing is handled through your telephone provider and the business’s normal phone operations.",
    "Following the Facebook link subjects you to Facebook’s own privacy practices.",
    "You may call (973) 517-2952 with questions about this website notice.",
  ],
} as const;
