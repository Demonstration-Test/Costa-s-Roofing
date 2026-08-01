import { business } from "@/content/business";
import { buildInternalPath } from "@/lib/site-url";

const mobileLinks = [
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Reviews", path: "/reviews" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
] as const;

export function MobileNavigation({ basePath = "" }: { basePath?: string }) {
  return (
    <details className="mobile-menu">
      <summary>
        <span>Menu</span>
        <span aria-hidden="true" className="mobile-menu__icon" />
      </summary>
      <nav aria-label="Mobile navigation" className="mobile-menu__panel">
        {mobileLinks.map((link, index) => (
          <a href={buildInternalPath(link.path, basePath)} key={link.path}>
            <span aria-hidden="true">0{index + 1}</span>
            {link.label}
          </a>
        ))}
        <a className="mobile-menu__call" href={business.phone.uri}>
          Call {business.phone.display}
        </a>
      </nav>
    </details>
  );
}
