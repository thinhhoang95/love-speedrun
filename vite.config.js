import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { readFile } from 'node:fs/promises';
import { generateWish } from './server/generateWish.js';
import { getWishStats } from './server/wishStats.js';

const HTML_PAGES = new Set([
  '/',
  '/index.html',
  '/invitation.html',
  '/seating-plan.html',
  '/404.html',
]);

function isUnknownPageRequest(req) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;
  if (!req.headers.accept?.includes('text/html')) return false;

  const pathname = new URL(req.url || '/', 'http://localhost').pathname;
  return !pathname.startsWith('/api/') && !HTML_PAGES.has(pathname);
}

function serveNotFound(readHtml, transformHtml = (_url, html) => html) {
  return async (req, res, next) => {
    if (!isUnknownPageRequest(req)) {
      next();
      return;
    }

    try {
      const source = await readHtml();
      const html = await transformHtml('/404.html', source);
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(req.method === 'HEAD' ? undefined : html);
    } catch (error) {
      next(error);
    }
  };
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
  // This is a multi-page site. SPA mode rewrites missing URLs to index.html,
  // which would incorrectly show the game instead of the not-found page.
  appType: 'mpa',
  // Expose NEXT_PUBLIC_* vars (alongside the default VITE_* prefix)
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  plugins: [{
    name: 'local-openrouter-wish-api',
    configureServer(server) {
      server.middlewares.use('/api/wish-stats', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        try {
          const result = await getWishStats();
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } catch (err) {
          console.error('wish-stats failed:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Could not load wish stats.' }));
        }
      });

      server.middlewares.use('/api/generate-wish', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          const body = await readJsonBody(req);
          const result = await generateWish(body);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } catch (err) {
          console.error('generate-wish failed:', err);
          res.statusCode = err.status || 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            error: err.status && err.status < 500 ? err.message : 'Không tạo được lời chúc lúc này.',
          }));
        }
      });

      server.middlewares.use(serveNotFound(
        () => readFile(resolve(__dirname, '404.html'), 'utf8'),
        server.transformIndexHtml,
      ));
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveNotFound(
        () => readFile(resolve(server.config.root, server.config.build.outDir, '404.html'), 'utf8'),
      ));
    },
  }],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        invitation: resolve(__dirname, 'invitation.html'),
        seatingPlan: resolve(__dirname, 'seating-plan.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
  };
});
