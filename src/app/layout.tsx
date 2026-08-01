import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { bodyFont, displayFont } from "@/lib/fonts";
import { buildAssetPath } from "@/lib/site-url";
import "./globals.css";

const basePath = process.env.PUBLISH_BASE_PATH ?? "";

export const metadata: Metadata = {
  applicationName: "Costa’s Roofing",
  icons: {
    icon: [
      {
        type: "image/webp",
        url: buildAssetPath(
          "/media/optimized/costas-roofing-logo.webp",
          basePath,
        ),
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070708",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${displayFont.variable} ${bodyFont.variable}`} lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader basePath={basePath} />
        <div id="main-content">{children}</div>
        <SiteFooter basePath={basePath} />
        <OrganizationJsonLd />
        <script
          defer
          src={buildAssetPath("/site-motion.js", basePath)}
        />
      </body>
    </html>
  );
}
