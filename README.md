<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Coway Health App Indonesia

A modern, interactive web portal for Coway Health Planner & Cody services in Indonesia, featuring water and air purifier catalogs, rental calculators in Indonesian Rupiah (IDR), customer registration generator, and direct WhatsApp seller consultation.

---

## 🚀 Deploying to Google Cloud Run

This project includes a production-ready **`Dockerfile`**, **`.dockerignore`**, and **`server.ts`** configured specifically for Google Cloud Run (listening on `PORT=8080`, binding to `0.0.0.0`, with health check `/health` and SPA fallback routing).

### Method 1: Deploy Directly from Source (Recommended)

Run the following command in your terminal using the Google Cloud CLI (`gcloud`):

```bash
gcloud run deploy coway-health-app \
  --source . \
  --region asia-southeast2 \
  --platform managed \
  --allow-unauthenticated
```
*(Note: `asia-southeast2` is the Jakarta, Indonesia region, ideal for Indonesian users)*

### Method 2: Build & Deploy with Docker Image

1. **Build the container image**:
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/coway-health-app:latest .
   ```

2. **Push image to Google Artifact Registry or Container Registry**:
   ```bash
   docker push gcr.io/YOUR_PROJECT_ID/coway-health-app:latest
   ```

3. **Deploy the container to Cloud Run**:
   ```bash
   gcloud run deploy coway-health-app \
     --image gcr.io/YOUR_PROJECT_ID/coway-health-app:latest \
     --region asia-southeast2 \
     --platform managed \
     --port 8080 \
     --allow-unauthenticated
   ```

### Method 3: Test the Docker Container Locally

To test the container on your local machine before deploying:

```bash
# 1. Build local container
docker build -t coway-app-local .

# 2. Run container mapped to port 8080
docker run -p 8080:8080 -e PORT=8080 coway-app-local

# 3. Open in browser
# http://localhost:8080
# http://localhost:8080/health
```

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Run dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`

3. **Build and preview production locally**:
   ```bash
   npm run build
   npm run start
   ```
