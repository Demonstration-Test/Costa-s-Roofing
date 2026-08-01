import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const workflowPath = join(
  process.cwd(),
  ".github",
  "workflows",
  "pages.yml",
);
const packagePath = join(process.cwd(), "package.json");

describe("GitHub Pages deployment", () => {
  it("builds and publishes the exact repository-scoped public export", () => {
    const workflow = existsSync(workflowPath)
      ? readFileSync(workflowPath, "utf8")
      : "";

    expect(workflow).toContain("PUBLISH_BASE_PATH: /Costa-s-Roofing");
    expect(workflow).toContain(
      "PUBLIC_SITE_ORIGIN: https://demonstration-test.github.io",
    );
    expect(workflow).toContain("pages: write");
    expect(workflow).toContain("id-token: write");
    expect(workflow).toContain("path: ./out");
    expect(workflow).toContain("actions/deploy-pages@v4");

    const packageJson = JSON.parse(readFileSync(packagePath, "utf8")) as {
      scripts: Record<string, string>;
    };
    expect(packageJson.scripts["build:prefixed"]).toContain(
      "PUBLISH_BASE_PATH=/Costa-s-Roofing",
    );
  });
});
