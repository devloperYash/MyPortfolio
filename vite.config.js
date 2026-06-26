import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Vite plugin to simulate Vercel's /api/chat handler locally
const localApiPlugin = () => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      // Intercept calls to /api/chat
      if (req.url?.startsWith('/api/chat')) {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        // Read and parse request body
        let bodyText = '';
        for await (const chunk of req) {
          bodyText += chunk;
        }

        let body = {};
        try {
          if (bodyText) {
            body = JSON.parse(bodyText);
          }
        } catch (e) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Invalid JSON body' }));
          return;
        }

        // Mock req and res objects for Vercel's handler signature
        const mockedReq = {
          method: req.method,
          body,
          headers: req.headers,
        };

        const mockedRes = {
          statusCode: 200,
          status(code) {
            res.statusCode = code;
            return this;
          },
          json(data) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          }
        };

        try {
          // Dynamically import the api handler to avoid caching issues during dev
          const { default: handler } = await import('./api/chat.js');
          await handler(mockedReq, mockedRes);
        } catch (error) {
          console.error('Error in local /api/chat middleware:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal server error in local API mock' }));
        }
        return;
      }
      next();
    });
  }
});

export default defineConfig(({ mode }) => {
  // Load env variables from .env files
  const env = loadEnv(mode, process.cwd(), '');
  
  // Set GEMINI_API_KEY in process.env so it's accessible by the local handler
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }

  return {
    plugins: [react(), localApiPlugin()],
  };
})
