import express from "express";
import http from "node:http";
import path from "node:path";
import { createBareServer } from "@tomphttp/bare-server-node";

const __dirname = process.cwd();
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
  res.sendFile(path.join(process.cwd(), './static/index.html'));
});
app.get('/student', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/loader.html'));
});
app.get('/apps', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/apps.html'));
});
app.get('/gms', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/gms.html'));
});
app.get('/lessons', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/agloader.html'));
});
app.get('/credits', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/credits.html'));
});
app.get('/partners', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/partners.html'));
});
app.use((req, res) => {
  res.statusCode = 404;
  res.sendFile(path.join(process.cwd(), './static/404.html'))
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
  console.log(`Doge Unblocker has sucessfully started!\nListening on localhost (Port 8000).`);
});

server.listen({
  port: 8000,
});
