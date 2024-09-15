import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import wisp from "wisp-server-node";
import fetch from 'node-fetch';
import chalk from 'chalk';
import dotenv from 'dotenv';
import routes from './routes.js';
import compression from 'compression';
import helmet from 'helmet';
import { Worker, isMainThread } from 'node:worker_threads';

dotenv.config();

const __dirname = path.resolve();
const server = http.createServer();
const bareServer = createBareServer('/bear/');
const app = express(server);
const version = require('./package.json').version;
const discord = process.env.DISCORD_URL || 'https://discord.gg/unblocking';
const port = process.env.PORT || 8001;

app.use(compression()); // Enable gzip compression
app.use(helmet()); // Security headers

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use("/uv/", express.static(uvPath));
app.use("/libcurl/", express.static(libcurlPath));
app.use("/baremux/", express.static(baremuxPath));

app.use(routes); // Modularized routes

// Fetch worker.js file
app.get('/worker.js', async (req, res) => {
  try {
    const response = await fetch('https://cdn.surfdoge.pro/worker.js');
    if (response.ok) {
      const body = await response.text();
      res.setHeader('Content-Type', 'text/javascript');
      res.send(body);
    } else {
      res.status(500).send('Error fetching worker script');
    }
  } catch (error) {
    res.status(500).send('Error fetching worker script');
  }
});

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, './static/404.html'));
});

// Handle HTTP requests with concurrency
server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    if (isMainThread) {
      const worker = new Worker(__filename, { workerData: { req, res } });
      worker.on('message', () => app(req, res));
    }
  }
});

// Handle WebSocket upgrades
server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else if (req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else socket.end();
});

// Graceful shutdown handling with concurrency
let connections = [];
server.on('connection', (connection) => {
  connections.push(connection);
  connection.on('close', () => {
    connections = connections.filter((curr) => curr !== connection);
  });
});

function shutdown(signal) {
  console.log(chalk.bgRed.white.bold(`  Shutting Down (Signal: ${signal})  `) + '\n');
  server.close(() => {
    console.log(chalk.blue('  Doge has been closed.'));
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    connections.forEach((curr) => curr.destroy());
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

server.listen({ port }, () => {
  console.log(chalk.bgBlue.white.bold(`  Welcome to Doge V4, user!  `));
  console.log(chalk.cyan('-----------------------------------------------'));
  console.log(chalk.green('  🌟 Status: ') + chalk.bold('Active'));
  console.log(chalk.green('  🌍 Port: ') + chalk.bold(chalk.yellow(server.address().port)));
  console.log(chalk.cyan('-----------------------------------------------'));
  console.log(chalk.magenta('📦 Version: ') + chalk.bold(version));
  console.log(chalk.magenta('🔗 URL: ') + chalk.underline(`http://localhost:${server.address().port}`));
  console.log(chalk.blue('💬 Discord: ') + chalk.underline(discord));
});
