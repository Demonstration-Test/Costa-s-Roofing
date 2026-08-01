import { buildOrganizationJsonLd } from "@/lib/site-metadata";

export function OrganizationJsonLd() {
  const jsonLd = buildOrganizationJsonLd(
    process.env.PUBLIC_SITE_ORIGIN,
    process.env.PUBLISH_BASE_PATH,
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
