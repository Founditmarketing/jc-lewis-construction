import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contactHandler from './api/contact.js';

// Load .env.local first, fall back to .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();

// Allow requests from any localhost port (Vite picks dynamic ports) + Vercel
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    const isLocalhost = /^http:\/\/localhost(:\d+)?$/.test(origin);
    const isVercel = /^https:\/\/.*\.vercel\.app$/.test(origin);
    if (isLocalhost || isVercel) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Mount routes
app.post('/api/contact', contactHandler as any);

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`[server] API running on http://localhost:${PORT}`);
});
