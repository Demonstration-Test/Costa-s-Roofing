/* eslint-disable @next/next/no-img-element -- Approved assets are pre-optimized for the static export. */
import { business } from "@/content/business";
import { buildAssetPath, buildInternalPath } from "@/lib/site-url";
import { MobileNavigation } from "./mobile-navigation";

const primaryLinks = [
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Reviews", path: "/reviews" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
] as const;

export function SiteHeader({ basePath = "" }: { basePath?: string }) {
  return (
    <header className="site-header">
      <a
        aria-label={`${business.publicName} home`}
        className="site-header__brand"
        href={buildInternalPath("/", basePath)}
      >
        <img
          alt=""
          aria-hidden="true"
          decoding="async"
          height={84}
          src={buildAssetPath(
            "/media/optimized/costas-roofing-logo.webp",
            basePath,
          )}
          width={84}
        />
      </a>

      <nav aria-label="Primary navigation" className="site-header__nav">
        {primaryLinks.map((link) => (
          <a href={buildInternalPath(link.path, basePath)} key={link.path}>
            {link.label}
          </a>
        ))}
        <a className="site-header__call" href={business.phone.uri}>
          Call {business.phone.display}
        </a>
      </nav>

      <MobileNavigation basePath={basePath} />
      <a
        aria-label="Call Costa’s Roofing"
        className="mobile-call-dock"
        href={business.phone.uri}
      >
        <span>Call now</span>
        <strong>{business.phone.display}</strong>
        <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
