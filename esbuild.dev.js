import * as esbuild from "esbuild";
import { copyFile } from "fs/promises";

await import("./index.js");

console.time("esbuild");

const worker = await esbuild.context({
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

worker.watch();

const handler = await esbuild.context({
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

handler.watch();

const client = await esbuild.context({
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

client.watch();

const html = await esbuild.context({
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

html.watch();

await copyFile("./lib/dynamic.config.js", "./dist/dynamic.config.js");

console.log(await esbuild.analyzeMetafile((await worker.rebuild()).metafile));

console.timeEnd("esbuild");
