import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Serve static assets from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', app: 'coway-health-app' });
});

// Single Page Application (SPA) fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Explicitly bind to 0.0.0.0 for Google Cloud Run container networking
app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Coway Health App running on http://0.0.0.0:${port}`);
});
