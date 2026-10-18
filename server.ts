import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Disable etag caching quirks on Cloud Run
app.set('etag', false);

// Global Security & Cross-Origin Headers to ensure images and audio render in iframes on Cloud Run
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// Candidate asset directories on disk
const assetDirs = [
  path.join(__dirname, 'dist', 'assets'),
  path.join(__dirname, 'dist', 'images'),
  path.join(__dirname, 'dist', 'assets', 'images'),
  path.join(__dirname, 'dist', 'src', 'assets', 'images'),
  path.join(__dirname, 'public', 'images'),
  path.join(__dirname, 'public', 'assets', 'images'),
  path.join(__dirname, 'public', 'assets'),
  path.join(__dirname, 'src', 'assets', 'images'),
  path.join(__dirname, 'dist')
];

// 1. Smart dynamic image resolver middleware
// Intercepts ANY image request regardless of route prefix (/images/, /assets/, /assets/images/, /src/assets/images/, or root /)
app.use((req, res, next) => {
  if (!/\.(jpg|jpeg|png|webp|svg|ico)$/i.test(req.path)) {
    return next();
  }

  res.setHeader('Cache-Control', 'public, max-age=86400');
  const requestedFile = path.basename(req.path);

  // Exact file search across all candidate directories
  for (const dir of assetDirs) {
    const fullPath = path.join(dir, requestedFile);
    if (fs.existsSync(fullPath)) {
      return res.sendFile(fullPath);
    }
  }

  // Fallback matching by keyword for Coway appliances & health specialist
  const lower = requestedFile.toLowerCase();
  const keywordMappings = [
    { keys: ['neo_kitchen', 'kitchen_neo'], target: 'coway_neo_kitchen.jpg' },
    { keys: ['dispense_pour', 'pour', 'dispense'], target: 'coway_dispense_pour.jpg' },
    { keys: ['kitchen_life', 'lifestyle'], target: 'coway_kitchen_life.jpg' },
    { keys: ['man_planner', 'specialist', 'cody', 'planner', 'moniko'], target: 'coway_man_planner.jpg' },
    { keys: ['mattress', 'prime'], target: 'coway_prime_mattress.jpg' },
    { keys: ['air', 'storm', 'noble', 'breeze'], target: 'coway_air_purifier.jpg' },
    { keys: ['hero', 'purifier', 'neo', 'ombak', 'villaem', 'water'], target: 'coway_hero_purifier.jpg' }
  ];

  for (const item of keywordMappings) {
    if (item.keys.some(k => lower.includes(k))) {
      for (const dir of assetDirs) {
        const fullPath = path.join(dir, item.target);
        if (fs.existsSync(fullPath)) {
          return res.sendFile(fullPath);
        }
      }
    }
  }

  // Universal fallback image
  for (const dir of assetDirs) {
    const defaultImg = path.join(dir, 'coway_hero_purifier.jpg');
    if (fs.existsSync(defaultImg)) {
      return res.sendFile(defaultImg);
    }
  }

  next();
});

// 2. Primary static handler: dist directory contains bundled React code & assets (both for root / and /store subpath)
const staticOptions = {
  maxAge: '1d',
  setHeaders: (res: express.Response, filePath: string) => {
    if (/\.(jpg|jpeg|png|webp|svg|gif|ico|woff2?|ttf)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }
  }
};

app.use('/store', express.static(path.join(__dirname, 'dist'), staticOptions));
app.use(express.static(path.join(__dirname, 'dist'), staticOptions));

// 3. Static image and asset subdirectories for both root and /store
app.use(['/store/images', '/images'], express.static(path.join(__dirname, 'dist/images'), staticOptions));
app.use(['/store/images', '/images'], express.static(path.join(__dirname, 'public/images'), staticOptions));
app.use(['/store/assets', '/assets'], express.static(path.join(__dirname, 'dist/assets'), staticOptions));
app.use(['/store/assets/images', '/assets/images'], express.static(path.join(__dirname, 'dist/assets/images'), staticOptions));
app.use(['/store/assets/images', '/assets/images'], express.static(path.join(__dirname, 'public/assets/images'), staticOptions));
app.use(['/store/assets/images', '/assets/images'], express.static(path.join(__dirname, 'public/images'), staticOptions));
app.use(['/store/src/assets/images', '/src/assets/images'], express.static(path.join(__dirname, 'src/assets/images'), staticOptions));
app.use(['/store/src/assets/images', '/src/assets/images'], express.static(path.join(__dirname, 'dist/images'), staticOptions));

// Health check endpoint for Google Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', app: 'coway-health-app', domain: 'www.captainactservices.my.id/store' });
});

// Single Page Application (SPA) fallback for /store and root routes
app.get(['/store', '/store/*', '*'], (req, res) => {
  // If static asset was not found, return 404 rather than HTML
  if (/\.(css|js|json|woff2?|ttf|map)$/i.test(req.path)) {
    res.status(404).send('Asset not found');
    return;
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Explicitly bind to 0.0.0.0 for Google Cloud Run container networking
app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Coway Health App running on http://0.0.0.0:${port}`);
});
