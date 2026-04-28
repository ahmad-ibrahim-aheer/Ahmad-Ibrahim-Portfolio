import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, ViteDevServer } from 'vite';
import chatHandler from './api/chat';

// Custom Vite plugin to handle Vercel API routes locally
const vercelApiPlugin = () => ({
  name: 'vercel-api-plugin',
  configureServer(server: ViteDevServer) {
    server.middlewares.use('/api/chat', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end('Method Not Allowed');
        return;
      }

      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const webReq = new Request(`http://localhost${req.url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body || null
          });
          
          const webRes = await chatHandler(webReq);
          res.statusCode = webRes.status;
          res.setHeader('Content-Type', 'application/json');
          const text = await webRes.text();
          res.end(text);
        } catch (e: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message || String(e) }));
        }
      });
    });
  }
});

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  
  // Expose the API key to the local Node.js process so the backend handler can read it
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;

  return {
    plugins: [react(), tailwindcss(), vercelApiPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
