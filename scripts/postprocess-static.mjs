import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "out");

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findHtmlFiles(path)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(path);
    }
  }

  return files;
}

function removeHydrationRuntime(html) {
  return html
    .replace(
      /<link\s+rel="preload"\s+as="script"[^>]*href="[^"]*\/_next\/static\/chunks\/[^"]+"[^>]*\/>/g,
      "",
    )
    .replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/g, (script) => {
      if (/type="application\/ld\+json"/.test(script)) {
        return script;
      }

      if (/src="[^"]*\/_next\/static\/chunks\//.test(script)) {
        return "";
      }

      if (/self\.__next_f/.test(script)) {
        return "";
      }

      return script;
    });
}

const htmlFiles = await findHtmlFiles(outputDirectory);

if (htmlFiles.length === 0) {
  throw new Error(`No HTML files found in ${outputDirectory}.`);
}

for (const path of htmlFiles) {
  const html = await readFile(path, "utf8");
  const optimizedHtml = removeHydrationRuntime(html);
  await writeFile(path, optimizedHtml, "utf8");
}

console.log(
  `Removed unused Next hydration scripts from ${htmlFiles.length} static HTML files.`,
);
