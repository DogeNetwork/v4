// routes.js
import express from 'express';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

const router = express.Router();
const __dirname = path.resolve();

const routes = [
  { route: '/app', file: './static/index.html' },
  { route: '/portal', file: './static/loader.html' },
  { route: '/apps', file: './static/apps.html' },
  { route: '/gms', file: './static/gms.html' },
  { route: '/lessons', file: './static/agloader.html' },
  { route: '/info', file: './static/info.html' },
  { route: '/edu', file: './static/loading.html' }
];

// Serve static routes using worker threads for concurrency
routes.forEach(({ route, file }) => {
  router.get(route, (req, res) => {
    if (isMainThread) {
      const worker = new Worker(__filename, { workerData: { file } });
      worker.on('message', (data) => {
        res.sendFile(data.filePath);
      });
    }
  });
});

router.get('/student', (req, res) => {
  res.redirect('/portal');
});

export default router;

// Worker thread logic
if (!isMainThread) {
  const { workerData } = require('node:worker_threads');
  const filePath = path.join(__dirname, workerData.file);
  parentPort.postMessage({ filePath });
}
