import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCompress from '@fastify/compress';
import { createBareServer } from '@tomphttp/bare-server-node';
import { createServer } from 'http';
import chalk from 'chalk';
import open from 'open';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import fs from 'fs/promises'; // Import the fs/promises module for reading files asynchronously

const require = createRequire(import.meta.url);
const gitCommitInfo = require('git-commit-info');

if (!existsSync("./dist")) await import("./esbuild.prod.js");

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 6969;
const _v = process.env.npm_package_version;
const info = {
  hashShort: `${JSON.stringify(gitCommitInfo().shortHash).replace('"', "").replace("/", "").replace('\"', "")}`,
  hash: `${JSON.stringify(gitCommitInfo().hash).replace('"', "").replace("/", "").replace('\"', "")}`,
  version: _v,
}

const bare = createBareServer('/bare/');
const serverFactory = (handler, opts) => {
  return createServer()
    .on("request", (req, res) => {
      if (req.url === "/info") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(info));
      } else if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
      } else {
        handler(req, res)
      }
    }).on("upgrade", (req, socket, head) => {
      if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
      } else {
        socket.end();
      }
    });
}
const fastify = Fastify({ serverFactory });
fastify.register(fastifyStatic, {
  root: join(__dirname, "./static"),
  decorateReply: false
});
fastify.register(fastifyStatic, {
  root: join(__dirname, "./dist"),
  prefix: "/dynamic/",
  decorateReply: false
});
fastify.register(fastifyCompress, {
  encodings: ["br"]
});

fastify.get('/~', async (request, reply) => {
  const loaderHtmlPath = join(__dirname, "./static/loader.html");

  if (existsSync(loaderHtmlPath)) {
    const loaderHtmlContent = await fs.readFile(loaderHtmlPath, 'utf-8');
    reply.header('Content-Type', 'text/html').send(loaderHtmlContent);
  } else {
    reply.code(404).send('Loader HTML file not found');
  }
});
fastify.get('/app', async (request, reply) => {
  const loaderHtmlPath = join(__dirname, "./static/app.html");

  if (existsSync(loaderHtmlPath)) {
    const loaderHtmlContent = await fs.readFile(loaderHtmlPath, 'utf-8');
    reply.header('Content-Type', 'text/html').send(loaderHtmlContent);
  } else {
    reply.code(404).send('Loader HTML file not found');
  }
});
fastify.get('/apps', async (request, reply) => {
  const loaderHtmlPath = join(__dirname, "./static/apps/apps.html");

  if (existsSync(loaderHtmlPath)) {
    const loaderHtmlContent = await fs.readFile(loaderHtmlPath, 'utf-8');
    reply.header('Content-Type', 'text/html').send(loaderHtmlContent);
  } else {
    reply.code(404).send('Loader HTML file not found');
  }
});
fastify.get('/gms', async (request, reply) => {
  const loaderHtmlPath = join(__dirname, "./static/gms/index.html");

  if (existsSync(loaderHtmlPath)) {
    const loaderHtmlContent = await fs.readFile(loaderHtmlPath, 'utf-8');
    reply.header('Content-Type', 'text/html').send(loaderHtmlContent);
  } else {
    reply.code(404).send('Loader HTML file not found');
  }
});
const URL = `http://localhost:${port}/`;
fastify.listen({ port }, async (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.log(chalk.red.bold(`[Dynamic ${_v}] `) + "Port is already in use! Please close any apps using port " + chalk.bold.underline.red(port) + " and try again.");
    process.exit(1);
  } else if (err) {
    console.log(chalk.bold.red(`[Dynamic ${_v}] `) + "An error occurred while starting the server! \n" + err);
    process.exit(1);
  }
  console.log(chalk.bold('Thanks for using Dynamic!'), chalk.red(`Please notice that ${chalk.red.bold('dynamic is currently in public BETA')}. please report all issues to the GitHub page. `))
  console.log(chalk.green.bold(`Dynamic ${_v} `) + "live at port " + chalk.bold.green(port));
  try {
    await open(URL);
  } catch (ERR) {
    console.error(ERR);
  }
});
