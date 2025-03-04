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
const bareServer = createBareServer('/seal/');
const app = express(server);
const version = packageJson.version;
const discord = 'https://discord.gg/unblocking';

// Message queue for long polling
const messageQueues = new Map();
let messageId = 0;

const routes = [
  { route: '/mastery', file: './static/loader.html' },
  { route: '/apps', file: './static/apps.html' },
  { route: '/gms', file: './static/gms.html' },
  { route: '/lessons', file: './static/agloader.html' },
  { route: '/info', file: './static/info.html' },
  { route: '/mycourses', file: './static/loading.html' }
];

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, 'static')));
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

// Long polling endpoints
app.post('/poll/connect', (req, res) => {
  const clientId = Math.random().toString(36).substring(7);
  messageQueues.set(clientId, []);
  res.json({ clientId, status: 'connected' });
});

app.get('/poll/:clientId', (req, res) => {
  const { clientId } = req.params;
  const { lastEventId = 0 } = req.query;
  
  const queue = messageQueues.get(clientId);
  if (!queue) {
    return res.status(404).json({ error: 'Client not found' });
  }

  // Return any new messages
  const newMessages = queue.filter(msg => msg.id > lastEventId);
  if (newMessages.length > 0) {
    res.json({ messages: newMessages });
  } else {
    // Hold the connection open for 30 seconds
    const timeout = setTimeout(() => {
      res.json({ messages: [] });
    }, 30000);

    // Clean up on client disconnect
    req.on('close', () => {
      clearTimeout(timeout);
    });
  }
});

app.post('/poll/:clientId/message', (req, res) => {
  const { clientId } = req.params;
  const { data } = req.body;
  
  const queue = messageQueues.get(clientId);
  if (!queue) {
    return res.status(404).json({ error: 'Client not found' });
  }

  messageId++;
  queue.push({ id: messageId, data });
  
  // Keep only last 100 messages
  if (queue.length > 100) {
    queue.shift();
  }
  
  res.json({ status: 'message sent', id: messageId });
});

app.post('/poll/:clientId/close', (req, res) => {
  const { clientId } = req.params;
  messageQueues.delete(clientId);
  res.json({ status: 'disconnected' });
});

routes.forEach(({ route, file }) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

app.get('/student', (req, res) => {
  res.redirect('/portal');
});

app.get('/worker.js', (req, res) => {
  request('https://cdn.surfdoge.pro/worker.js', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.setHeader('Content-Type', 'text/javascript');
      res.send(body);
    } else {
      res.status(500).send('Error fetching worker script');
    }
  });
});

app.use((req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    res.statusCode = 404;
    res.sendFile(path.join(__dirname, './static/404.html'));
  }
});

server.on("request", (req, res) => {
  app(req, res);
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