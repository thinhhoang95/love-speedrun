import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { generateWish } from './server/generateWish.js';
import { getWishStats } from './server/wishStats.js';

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
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
    },
  }],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        invitation: resolve(__dirname, 'invitation.html'),
        seatingPlan: resolve(__dirname, 'seating-plan.html'),
      },
    },
  },
  };
});
