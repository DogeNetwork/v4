import express from "express";
import http from "node:http";
import path from "node:path";
import { createBareServer } from "@tomphttp/bare-server-node";
import request from "@cypress/request";

const __dirname = path.resolve();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "static")));
app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});
app.get('/student', (req, res) => {
  res.sendFile(path.join(__dirname, './static/loader.html'));
});
app.get('/apps', (req, res) => {
  res.sendFile(path.join(__dirname, './static/apps.html'));
});
app.get('/gms', (req, res) => {
  res.sendFile(path.join(__dirname, './static/gms.html'));
});
app.get('/lessons', (req, res) => {
  res.sendFile(path.join(__dirname, './static/agloader.html'));
});
app.get('/credits', (req, res) => {
  res.sendFile(path.join(__dirname, './static/credits.html'));
});
app.get('/partners', (req, res) => {
  res.sendFile(path.join(__dirname, './static/partners.html'));
});
app.get("/worker.js", (req, res) => {
  request("https://cdn.surfdoge.pro/worker.js", (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.setHeader("Content-Type", "text/javascript");
      res.send(body);
    } else {
      res.status(500).send("Error fetching worker script");
    }
  });
});
app.use((req, res) => {
  res.statusCode = 404;
  res.sendFile(path.join(__dirname, './static/404.html'))
});

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Doge Unblocker @ Port 8000`);
});

server.listen({
  port: 8000,
});
