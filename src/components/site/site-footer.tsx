/* eslint-disable @next/next/no-img-element -- Approved assets are pre-optimized for the static export. */
import { business } from "@/content/business";
import { facebookUrl } from "@/lib/site-metadata";
import { buildAssetPath, buildInternalPath } from "@/lib/site-url";

const footerLinks = [
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Reviews", path: "/reviews" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy", path: "/privacy" },
] as const;

export function SiteFooter({ basePath = "" }: { basePath?: string }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <a
          aria-label={`${business.publicName} home`}
          href={buildInternalPath("/", basePath)}
        >
          <img
            alt=""
            aria-hidden="true"
            decoding="async"
            height={72}
            loading="lazy"
            src={buildAssetPath(
              "/media/optimized/costas-roofing-logo.webp",
              basePath,
            )}
            width={72}
          />
          <span>{business.publicName}</span>
        </a>
        <p>{business.serviceArea}</p>
        <p>{business.hours.publicLabel}</p>
      </div>

      <nav aria-label="Footer navigation" className="site-footer__nav">
        {footerLinks.map((link) => (
          <a href={buildInternalPath(link.path, basePath)} key={link.path}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="site-footer__contact">
        <a href={business.phone.uri}>Call {business.phone.display}</a>
        <a href={facebookUrl} rel="noreferrer" target="_blank">
          Facebook
        </a>
      </div>

      <div className="site-footer__legal">
        <span>© {new Date().getFullYear()} {business.publicName}</span>
        <span>Roofing and exterior services</span>
      </div>
    </footer>
  );
}
