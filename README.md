<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Coway Health App Indonesia

Portal resmi Coway Health Planner & Cody Indonesia untuk pemurni air (Water Purifier), pemurni udara (Air Purifier), kalkulator hidrasi harian, simulasi cicilan rental dalam Rupiah (IDR), dan generator surat pemesanan online.

---

## 🚀 Panduan Deployment ke Google Cloud Run

Proyek ini telah dilengkapi dengan **`Dockerfile`**, **`cloudbuild.yaml`**, **`.npmrc`**, dan **`server.ts`** siap pakai untuk Google Cloud Run.

### Solusi untuk Error Status 51 (Universal Builder / Buildpack)
Error `step exited with non-zero status: 51` terjadi ketika Google Cloud Build menjalankan universal buildpack standar yang melewatkan dependensi build (`devDependencies`).

Kami telah memperbaikinya dengan:
1. Memindahkan seluruh dependensi build (`vite`, `tailwindcss`, `typescript`, `@types/*`, `esbuild`) ke dalam `dependencies` utama di `package.json`.
2. Menambahkan konfigurasi `.npmrc` dengan `legacy-peer-deps=true`.
3. Menambahkan `cloudbuild.yaml` agar Cloud Build otomatis menggunakan **`Dockerfile`**, bukan universal buildpack.
4. Menghapus file `bun.lock` yang mengganggu auto-detection Google Cloud.

---

### Cara 1: Deploy Langsung Menggunakan Cloud Build (Paling Direkomendasikan)

Gunakan perintah ini agar Google Cloud Build menggunakan `Dockerfile` yang telah dioptimalkan:

```bash
# Ganti YOUR_PROJECT_ID dengan ID project GCP Anda
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/coway-health-app:latest

# Deploy image hasil build ke Cloud Run
gcloud run deploy coway-health-app \
  --image gcr.io/YOUR_PROJECT_ID/coway-health-app:latest \
  --region asia-southeast2 \
  --platform managed \
  --port 8080 \
  --allow-unauthenticated
```

---

### Cara 2: Deploy dari Source (`gcloud run deploy --source .`)

```bash
gcloud run deploy coway-health-app \
  --source . \
  --region asia-southeast2 \
  --platform managed \
  --allow-unauthenticated
```

---

### Cara 3: Build & Test Lokal dengan Docker

```bash
# 1. Build image lokal
docker build -t coway-app-local .

# 2. Jalankan container
docker run -p 8080:8080 -e PORT=8080 coway-app-local

# 3. Buka browser:
# http://localhost:8080
# http://localhost:8080/health
```

---

## 💻 Menjalankan di Lingkungan Lokal (Dev)

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Aplikasi berjalan di `http://localhost:3000`
