import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import wisp from "wisp-server-node";
import request from '@cypress/request';
import chalk from 'chalk';
import packageJson from './package.json' with { type: 'json' };

const __dirname = path.resolve();
const server = http.createServer();
const app = express();

// Create bare server with fallback to HTTP
const bareServer = createBareServer('/bare/', {
  maintainer: {
    email: 'tomphttp@sys32.dev',
    website: 'https://github.com/tomphttp/',
  },
  logErrors: false,
  httpFallback: true,
  followRedirects: true,
});

const version = packageJson.version;
const discord = 'https://discord.gg/unblocking';

const routes = [
  { route: '/mastery', file: './static/loader.html' },
  { route: '/apps', file: './static/apps.html' },
  { route: '/gms', file: './static/gms.html' },
  { route: '/lessons', file: './static/agloader.html' },
  { route: '/info', file: './static/info.html' },
  { route: '/mycourses', file: './static/loading.html' }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use(express.static(path.join(__dirname, 'static')));
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

// Route handlers
routes.forEach(({ route, file }) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

app.get('/student', (req, res) => {
  res.redirect('/portal');
});

// Worker script with fallback
app.get('/worker.js', async (req, res) => {
  try {
    const response = await fetch('https://cdn.surfdoge.pro/worker.js');
    if (response.ok) {
      const text = await response.text();
      res.setHeader('Content-Type', 'text/javascript');
      res.send(text);
    } else {
      throw new Error('Failed to fetch worker script');
    }
  } catch (error) {
    console.error('Worker script fetch error:', error);
    // Serve local fallback
    res.sendFile(path.join(__dirname, 'static/assets/js/worker-fallback.js'));
  }
});

// Handle bare server requests
server.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

// Handle WebSocket connections with fallback
server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else if (req.url.startsWith('/bare/')) {
    // Fallback for bare server WebSocket
    try {
      bareServer.routeRequest(req, {
        setHeader: () => {},
        writeHead: (status, headers) => {
          socket.write(`HTTP/1.1 ${status} ${http.STATUS_CODES[status]}\r\n`);
          for (const [key, value] of Object.entries(headers)) {
            socket.write(`${key}: ${value}\r\n`);
          }
          socket.write('\r\n');
        },
        end: (data) => {
          if (data) socket.write(data);
          socket.end();
        }
      });
    } catch (error) {
      console.error('Bare server WebSocket fallback error:', error);
      socket.end();
    }
  } else {
    socket.end();
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, './static/404.html'));
});

server.on('listening', () => {
  console.log(chalk.bgBlue.white.bold(`  Welcome to ir V4, user!  `) + '\n');
  console.log(chalk.cyan('-----------------------------------------------'));
  console.log(chalk.green('  🌟 Status: ') + chalk.bold('Active'));
  console.log(chalk.green('  🌍 Port: ') + chalk.bold(chalk.yellow(server.address().port)));
  console.log(chalk.green('  🕒 Time: ') + chalk.bold(new Date().toLocaleTimeString()));
  console.log(chalk.cyan('-----------------------------------------------'));
  console.log(chalk.magenta('📦 Version: ') + chalk.bold(version));
  console.log(chalk.magenta('🔗 URL: ') + chalk.underline('http://localhost:' + server.address().port));
  console.log(chalk.cyan('-----------------------------------------------'));
  console.log(chalk.blue('💬 Discord: ') + chalk.underline(discord));
  console.log(chalk.cyan('-----------------------------------------------'));
});

function shutdown(signal) {
  console.log(chalk.bgRed.white.bold(`  Shutting Down (Signal: ${signal})  `) + '\n');
  console.log(chalk.red('-----------------------------------------------'));
  console.log(chalk.yellow('  🛑 Status: ') + chalk.bold('Shutting Down'));
  console.log(chalk.yellow('  🕒 Time: ') + chalk.bold(new Date().toLocaleTimeString()));
  console.log(chalk.red('-----------------------------------------------'));
  console.log(chalk.blue('  Performing graceful exit...'));
  server.close(() => {
    console.log(chalk.blue('  ir has been closed.'));
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

server.listen({
  port: 8000,
});