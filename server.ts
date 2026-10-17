import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Disable etag caching quirks on Cloud Run
app.set('etag', false);

// 1. Primary static handler: dist directory contains bundled React code & copied assets
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (/\.(jpg|jpeg|png|webp|svg|gif|ico)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

// 2. Comprehensive static image fallbacks for Cloud Run container hosting
app.use('/images', express.static(path.join(__dirname, 'dist/images'), { maxAge: '1d' }));
app.use('/images', express.static(path.join(__dirname, 'public/images'), { maxAge: '1d' }));
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), { maxAge: '1d' }));
app.use('/assets/images', express.static(path.join(__dirname, 'dist/assets/images'), { maxAge: '1d' }));
app.use('/assets/images', express.static(path.join(__dirname, 'public/assets/images'), { maxAge: '1d' }));
app.use('/assets/images', express.static(path.join(__dirname, 'public/images'), { maxAge: '1d' }));
app.use('/src/assets', express.static(path.join(__dirname, 'dist/src/assets'), { maxAge: '1d' }));
app.use('/src/assets/images', express.static(path.join(__dirname, 'dist/src/assets/images'), { maxAge: '1d' }));
app.use('/src/assets/images', express.static(path.join(__dirname, 'dist/assets/images'), { maxAge: '1d' }));
app.use('/src/assets/images', express.static(path.join(__dirname, 'public/src/assets/images'), { maxAge: '1d' }));
app.use('/src/assets/images', express.static(path.join(__dirname, 'src/assets/images'), { maxAge: '1d' }));

// Health check endpoint for Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', app: 'coway-health-app' });
});

// Single Page Application (SPA) fallback (only for non-asset routes)
app.get('*', (req, res) => {
  // If request looks like a static asset/file that was not found, return 404 rather than HTML
  if (/\.(jpg|jpeg|png|webp|svg|ico|css|js|json|woff2?|ttf|map)$/i.test(req.path)) {
    res.status(404).send('Asset not found');
    return;
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Explicitly bind to 0.0.0.0 for Google Cloud Run container networking
app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Coway Health App running on http://0.0.0.0:${port}`);
});
