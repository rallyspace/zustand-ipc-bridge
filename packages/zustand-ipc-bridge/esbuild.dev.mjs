import { createRequire } from "module";
import esbuild from "esbuild";

const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

const { log } = console;

const config = {
  entryPoints: ["./src/index.ts"],
  loader: {
    ".ts": "ts",
    ".tsx": "tsx",
    ".png": "dataurl",
  },
  outbase: "./src",
  bundle: true,
  jsxFactory: "createElement",
  jsxFragment: "Fragment",
  target: ["esnext"],
  logLevel: "debug",
  sourcemap: true,
  external: [
    "require",
    "fs",
    "path",
    "electron",
    ...Object.keys(packageJson.dependencies),
    ...Object.keys(packageJson.peerDependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
  ],
};

const cjsContext = await esbuild.context({
  ...config,
  outdir: "dist/cjs",
  format: "cjs",
});

const esmContext = await esbuild.context({
  ...config,
  outdir: "dist/esm",
  format: "esm",
});

log("Watching cjs...");
await cjsContext.watch();
log("Watching esm...");
await esmContext.watch();
