import json
import os
from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("QA_BASE_URL", "http://127.0.0.1:4175/Costa-s-Roofing").rstrip("/")
OUTPUT_DIRECTORY = Path(
    os.environ.get("QA_OUTPUT_DIRECTORY", "docs/qa/secondary-heroes")
)
ROUTES = {
    "services": "/services/",
    "projects": "/projects/",
    "reviews": "/reviews/",
    "about": "/about/",
    "contact": "/contact/",
}
VIEWPORTS = [
    (360, 800),
    (390, 844),
    (768, 1024),
    (1024, 768),
    (1440, 900),
    (1920, 1080),
]


def main():
    OUTPUT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    issues = []
    results = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

        for route_name, route in ROUTES.items():
            for width, height in VIEWPORTS:
                page = browser.new_page(viewport={"width": width, "height": height})
                console_errors = []
                page_errors = []
                failed_requests = []
                page.on(
                    "console",
                    lambda message, bucket=console_errors: bucket.append(message.text)
                    if message.type == "error"
                    else None,
                )
                page.on(
                    "pageerror",
                    lambda error, bucket=page_errors: bucket.append(str(error)),
                )
                page.on(
                    "requestfailed",
                    lambda request, bucket=failed_requests: bucket.append(
                        f"{request.method} {request.url}: {request.failure}"
                    ),
                )

                response = page.goto(f"{BASE_URL}{route}", wait_until="networkidle")
                page.wait_for_timeout(300)
                hero = page.locator(".page-hero--media")
                image = hero.locator(".page-hero__media img")
                metrics = page.evaluate(
                    """
                    () => {
                      const hero = document.querySelector('.page-hero--media');
                      const image = hero?.querySelector('.page-hero__media img');
                      const heading = hero?.querySelector('h1');
                      const headingRange = document.createRange();
                      if (heading) headingRange.selectNodeContents(heading);
                      const headingRect = heading ? headingRange.getBoundingClientRect() : null;
                      const sources = [...(hero?.querySelectorAll('source') ?? [])];
                      return {
                        h1: heading?.textContent?.trim() ?? '',
                        h1Rect: headingRect ? {
                          left: headingRect.left,
                          right: headingRect.right,
                        } : null,
                        scrollWidth: document.documentElement.scrollWidth,
                        clientWidth: document.documentElement.clientWidth,
                        image: image ? {
                          alt: image.getAttribute('alt'),
                          complete: image.complete,
                          currentSrc: image.currentSrc,
                          naturalWidth: image.naturalWidth,
                          objectPosition: getComputedStyle(image).objectPosition,
                        } : null,
                        sources: sources.map((source) => ({
                          media: source.getAttribute('media'),
                          srcset: source.getAttribute('srcset'),
                          type: source.getAttribute('type'),
                        })),
                      };
                    }
                    """
                )
                overflow = metrics["scrollWidth"] - metrics["clientWidth"]
                expected_suffix = (
                    f"/{route_name}-hero-mobile.avif"
                    if width <= 767
                    else f"/{route_name}-hero-desktop.webp"
                )

                if response is None or response.status != 200:
                    issues.append(f"{route_name} returned non-200 at {width}px")
                if hero.count() != 1 or not metrics["h1"]:
                    issues.append(f"{route_name} lacked one complete image hero at {width}px")
                if overflow > 1:
                    issues.append(f"{route_name} overflowed by {overflow}px at {width}px")
                if metrics["h1Rect"] and (
                    metrics["h1Rect"]["left"] < -1
                    or metrics["h1Rect"]["right"] > metrics["clientWidth"] + 1
                ):
                    issues.append(f"{route_name} heading was clipped at {width}px")
                if not metrics["image"] or not metrics["image"]["complete"]:
                    issues.append(f"{route_name} hero did not finish loading at {width}px")
                elif metrics["image"]["naturalWidth"] == 0:
                    issues.append(f"{route_name} hero was broken at {width}px")
                elif not metrics["image"]["currentSrc"].endswith(expected_suffix):
                    issues.append(
                        f"{route_name} selected {metrics['image']['currentSrc']} at {width}px"
                    )
                if metrics["image"] and metrics["image"]["alt"] != "":
                    issues.append(f"{route_name} decorative hero had non-empty alt text")
                if len(metrics["sources"]) != 2:
                    issues.append(f"{route_name} lacked both mobile sources at {width}px")
                if console_errors or page_errors or failed_requests:
                    issues.append(
                        f"{route_name} browser errors at {width}px: "
                        + " | ".join(console_errors + page_errors + failed_requests)
                    )

                if width in (390, 1440):
                    page.screenshot(
                        path=OUTPUT_DIRECTORY / f"{route_name}-{width}.png",
                        full_page=False,
                    )

                results.append(
                    {
                        "route": route,
                        "width": width,
                        "status": response.status if response else None,
                        "h1": metrics["h1"],
                        "currentSrc": metrics["image"]["currentSrc"]
                        if metrics["image"]
                        else None,
                        "objectPosition": metrics["image"]["objectPosition"]
                        if metrics["image"]
                        else None,
                        "overflow": overflow,
                    }
                )
                page.close()

        browser.close()

    summary = {"issues": issues, "results": results}
    (OUTPUT_DIRECTORY / "browser-summary.json").write_text(
        json.dumps(summary, indent=2), encoding="utf-8"
    )
    print(json.dumps(summary, indent=2))
    if issues:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
