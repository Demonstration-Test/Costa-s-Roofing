import json
import os
from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("QA_BASE_URL", "http://127.0.0.1:4173").rstrip("/")
ROUTES = [
    "/",
    "/services/",
    "/roof-repair/",
    "/roof-replacement/",
    "/roof-inspection/",
    "/storm-damage/",
    "/exterior-services/",
    "/projects/",
    "/reviews/",
    "/about/",
    "/contact/",
    "/privacy/",
]
VIEWPORTS = [
    (360, 800),
    (390, 844),
    (768, 1024),
    (1024, 768),
    (1440, 900),
    (1920, 1080),
]
QA_DIRECTORY = Path("docs/qa/screenshots")


def wait_for_settled_media(page):
    height = page.evaluate("document.documentElement.scrollHeight")
    step = max(page.viewport_size["height"] - 120, 300)
    for top in range(0, height, step):
        page.evaluate("top => window.scrollTo(0, top)", top)
        page.wait_for_timeout(60)
    page.evaluate("window.scrollTo(0, document.documentElement.scrollHeight)")
    page.wait_for_timeout(300)


def page_metrics(page):
    return page.evaluate(
        """
        () => ({
          viewport: { width: innerWidth, height: innerHeight },
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          h1: document.querySelector('h1')?.textContent?.trim() ?? '',
          phoneLinks: [...document.querySelectorAll('a[href^="tel:"]')]
            .map((link) => link.getAttribute('href')),
          images: [...document.images].map((image) => ({
            src: image.currentSrc || image.src,
            complete: image.complete,
            naturalWidth: image.naturalWidth,
          })),
        })
        """
    )


def main():
    QA_DIRECTORY.mkdir(parents=True, exist_ok=True)
    issues = []
    results = {"viewports": [], "routes": [], "interactions": {}}

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

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
            page.on("pageerror", lambda error, bucket=page_errors: bucket.append(str(error)))
            page.on(
                "requestfailed",
                lambda request, bucket=failed_requests: bucket.append(
                    f"{request.method} {request.url}: {request.failure}"
                ),
            )

            response = page.goto(f"{BASE_URL}/", wait_until="networkidle")
            page.wait_for_timeout(500)
            wait_for_settled_media(page)
            metrics = page_metrics(page)
            overflow = metrics["scrollWidth"] - metrics["clientWidth"]
            broken_images = [image for image in metrics["images"] if not image["complete"] or image["naturalWidth"] == 0]

            if response is None or response.status != 200:
                issues.append(f"home returned non-200 at {width}px")
            if overflow > 1:
                issues.append(f"home overflowed by {overflow}px at {width}px")
            if broken_images:
                issues.append(f"home had {len(broken_images)} broken images at {width}px")
            if set(metrics["phoneLinks"]) != {"tel:+19735172952"}:
                issues.append(f"home had an incorrect phone URI at {width}px")
            if console_errors or page_errors or failed_requests:
                issues.append(
                    f"home browser errors at {width}px: "
                    + " | ".join(console_errors + page_errors + failed_requests)
                )

            if width == 390:
                page.evaluate("window.scrollTo(0, 0)")
                summary = page.locator(".mobile-menu summary")
                dock = page.locator(".mobile-call-dock")
                if not summary.is_visible():
                    issues.append("mobile menu summary was not visible at 390px")
                if not dock.is_visible():
                    issues.append("persistent mobile call control was not visible at 390px")
                summary.click()
                if not page.locator(".mobile-menu").evaluate("element => element.open"):
                    issues.append("mobile details menu did not open")
                if not page.get_by_role("navigation", name="Mobile navigation").get_by_role(
                    "link", name="Services"
                ).is_visible():
                    issues.append("mobile Services link was not visible after opening the menu")
                page.locator(".mobile-menu").evaluate("element => { element.open = false }")
                page.screenshot(path=QA_DIRECTORY / "homepage-mobile-390.png")

            if width == 1440:
                page.evaluate("window.scrollTo(0, 0)")
                page.screenshot(path=QA_DIRECTORY / "homepage-desktop-1440.png")
                page.screenshot(path=QA_DIRECTORY / "homepage-desktop-1440-full.png", full_page=True)

            results["viewports"].append(
                {
                    "width": width,
                    "height": height,
                    "overflow": overflow,
                    "images": len(metrics["images"]),
                    "brokenImages": len(broken_images),
                }
            )
            page.close()

        for width, height in [(390, 844), (1440, 900)]:
            for route in ROUTES:
                page = browser.new_page(viewport={"width": width, "height": height})
                route_console_errors = []
                route_page_errors = []
                route_failed_requests = []
                page.on(
                    "console",
                    lambda message, bucket=route_console_errors: bucket.append(message.text)
                    if message.type == "error"
                    else None,
                )
                page.on(
                    "pageerror",
                    lambda error, bucket=route_page_errors: bucket.append(str(error)),
                )
                page.on(
                    "requestfailed",
                    lambda request, bucket=route_failed_requests: bucket.append(
                        f"{request.method} {request.url}: {request.failure}"
                    ),
                )

                response = page.goto(f"{BASE_URL}{route}", wait_until="networkidle")
                page.wait_for_timeout(250)
                wait_for_settled_media(page)
                metrics = page_metrics(page)
                overflow = metrics["scrollWidth"] - metrics["clientWidth"]
                broken_images = [
                    image
                    for image in metrics["images"]
                    if not image["complete"] or image["naturalWidth"] == 0
                ]

                if response is None or response.status != 200:
                    issues.append(f"{route} returned non-200 at {width}px")
                if not metrics["h1"]:
                    issues.append(f"{route} had no h1 at {width}px")
                if overflow > 1:
                    issues.append(f"{route} overflowed by {overflow}px at {width}px")
                if broken_images:
                    issues.append(f"{route} had {len(broken_images)} broken images at {width}px")
                if set(metrics["phoneLinks"]) != {"tel:+19735172952"}:
                    issues.append(f"{route} had an incorrect phone URI at {width}px")
                if route_console_errors or route_page_errors or route_failed_requests:
                    issues.append(
                        f"{route} browser errors at {width}px: "
                        + " | ".join(
                            route_console_errors + route_page_errors + route_failed_requests
                        )
                    )

                results["routes"].append(
                    {
                        "route": route,
                        "width": width,
                        "status": response.status if response else None,
                        "h1": metrics["h1"],
                        "overflow": overflow,
                    }
                )
                page.close()

        reduced_page = browser.new_page(
            viewport={"width": 390, "height": 844},
            reduced_motion="reduce",
        )
        reduced_page.goto(f"{BASE_URL}/", wait_until="networkidle")
        reduced_page.wait_for_timeout(500)
        reduced_state = reduced_page.locator('[data-testid="hero-webgl-boundary"]').get_attribute(
            "data-enhancement"
        )
        reduced_canvas_count = reduced_page.locator(".hero-webgl-boundary canvas").count()
        rain_duration = reduced_page.locator(".hero__weather").evaluate(
            "element => getComputedStyle(element).animationDuration"
        )
        if reduced_state != "fallback" or reduced_canvas_count != 0:
            issues.append("reduced-motion mode did not retain the static WebGL fallback")
        results["interactions"]["reducedMotion"] = {
            "enhancement": reduced_state,
            "canvasCount": reduced_canvas_count,
            "rainAnimationDuration": rain_duration,
        }
        reduced_page.close()

        keyboard_page = browser.new_page(viewport={"width": 1440, "height": 900})
        keyboard_page.goto(f"{BASE_URL}/", wait_until="networkidle")
        keyboard_page.keyboard.press("Tab")
        focused = keyboard_page.evaluate(
            "() => ({ text: document.activeElement?.textContent?.trim(), href: document.activeElement?.getAttribute('href') })"
        )
        if focused.get("href") != "#main-content":
            issues.append("the first keyboard focus target was not the skip link")
        results["interactions"]["firstFocus"] = focused
        keyboard_page.close()

        browser.close()

    print(json.dumps({"issues": issues, "results": results}, indent=2))
    if issues:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
