import http from 'node:http';
import { generateWish } from './generateWish.js';
import { getWishStats } from './wishStats.js';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number.parseInt(process.env.PORT || '8787', 10);
const MAX_BODY_BYTES = 16 * 1024;

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    ...extraHeaders,
  });
  res.end(body);
}

async function readJsonBody(req) {
  let size = 0;
  const chunks = [];

  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error('Request body is too large');
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  if (chunks.length === 0) return {};

  try {
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw new Error('JSON body must be an object');
    }
    return body;
  } catch (cause) {
    const error = new Error('Invalid JSON body', { cause });
    error.status = 400;
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url || '/', 'http://localhost').pathname;

  try {
    if (pathname === '/healthz') {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        sendJson(res, 405, { error: 'Method not allowed' }, { Allow: 'GET, HEAD' });
        return;
      }
      sendJson(res, 200, { status: 'ok' });
      return;
    }

    if (pathname === '/api/wish-stats') {
      if (req.method !== 'GET') {
        sendJson(res, 405, { error: 'Method not allowed' }, { Allow: 'GET' });
        return;
      }
      sendJson(res, 200, await getWishStats());
      return;
    }

    if (pathname === '/api/generate-wish') {
      if (req.method !== 'POST') {
        sendJson(res, 405, { error: 'Method not allowed' }, { Allow: 'POST' });
        return;
      }
      sendJson(res, 200, await generateWish(await readJsonBody(req)));
      return;
    }

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(`${req.method} ${pathname} failed:`, error);
    const status = Number.isInteger(error.status) ? error.status : 500;
    sendJson(res, status, {
      error: status < 500 ? error.message : 'Internal server error',
    });
  }
});

server.requestTimeout = 15_000;
server.headersTimeout = 10_000;
server.keepAliveTimeout = 5_000;

server.listen(PORT, HOST, () => {
  console.log(`Wedding API listening on http://${HOST}:${PORT}`);
});

function shutdown(signal) {
  console.log(`${signal} received; shutting down`);
  server.close((error) => {
    process.exit(error ? 1 : 0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
