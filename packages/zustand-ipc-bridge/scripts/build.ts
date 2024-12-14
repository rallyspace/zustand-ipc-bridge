// Build script for the project
// Usage: tsx scripts/build.ts
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import shell from "shelljs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, "..", "src");
const srcFiles = fs.readdirSync(srcDir);

// compile and bundle
shell.exec("pwd");

shell.exec("./node_modules/.bin/tsc --project tsconfig.json");
shell.exec("./node_modules/.bin/rollup --config rollup.config.js");

// ensure dist dir exists
if (!fs.existsSync("dist")) {
  shell.mkdir("dist");
}

// create CTS versions of the typedefs for CJS
for (const fileName of srcFiles) {
  const stem = fileName.split(".")[0];
  shell.cp([`dist/${stem}.d.ts`], `dist/${stem}.d.cts`);
}

// create CJS versions of the types
shell.cp(["dist/types.js"], "dist/types.cjs");

// point the export in the CJS index typedefs at the CJS types
shell.sed("-i", "types.js", "types.cjs", "dist/index.d.cts");

// copy the README from the root for the published npm module
shell.cp(["../../README.md"], "README.md");
