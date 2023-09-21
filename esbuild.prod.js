import * as esbuild from "esbuild";
import { copyFile } from "fs/promises";

console.time("esbuild");

const worker = await esbuild.build({
  entryPoints: ["lib/worker/index.ts"],
  bundle: true,
  outfile: "dist/dynamic.worker.js",
  format: "iife",
  minify: true,
  platform: "browser",
  sourcemap: true,
  target: ["es2020"],
  plugins: [],
  metafile: true,
});

const handler = await esbuild.build({
  entryPoints: ["lib/handler/index.ts"],
  bundle: true,
  outfile: "dist/dynamic.handler.js",
  format: "iife",
  minify: true,
  platform: "browser",
  sourcemap: true,
  target: ["es2020"],
  plugins: [],
  metafile: true,
});

const client = await esbuild.build({
  entryPoints: ["lib/client/index.ts"],
  bundle: true,
  outfile: "dist/dynamic.client.js",
  format: "iife",
  minify: true,
  platform: "browser",
  sourcemap: true,
  target: ["es2020"],
  plugins: [],
  metafile: true,
});

const html = await esbuild.build({
  entryPoints: ["lib/html/index.ts"],
  bundle: true,
  outfile: "dist/dynamic.html.js",
  format: "iife",
  minify: true,
  platform: "browser",
  sourcemap: true,
  target: ["es2020"],
  plugins: [],
  metafile: true,
});

await copyFile("./lib/dynamic.config.js", "./dist/dynamic.config.js");

console.log(await esbuild.analyzeMetafile((worker.metafile)));

console.timeEnd("esbuild");
