import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const srcImagesDir = path.join(rootDir, 'src', 'assets', 'images');
const srcAudioDir = path.join(rootDir, 'src', 'assets', 'audio');

// Target directories where assets might be fetched from in production / Cloud Run
const targetImageDirs = [
  path.join(rootDir, 'public', 'images'),
  path.join(rootDir, 'public', 'assets', 'images'),
  path.join(rootDir, 'public', 'assets'),
  path.join(rootDir, 'public', 'src', 'assets', 'images'),
  path.join(rootDir, 'dist', 'images'),
  path.join(rootDir, 'dist', 'assets', 'images'),
  path.join(rootDir, 'dist', 'assets'),
  path.join(rootDir, 'dist', 'src', 'assets', 'images'),
];

const targetAudioDirs = [
  path.join(rootDir, 'public', 'audio'),
  path.join(rootDir, 'dist', 'audio'),
  path.join(rootDir, 'dist', 'assets')
];

// Ensure all target directories exist
for (const dir of targetImageDirs) {
  fs.mkdirSync(dir, { recursive: true });
}
for (const dir of targetAudioDirs) {
  fs.mkdirSync(dir, { recursive: true });
}

// 1. Sync all images
if (fs.existsSync(srcImagesDir)) {
  const files = fs.readdirSync(srcImagesDir);
  for (const file of files) {
    if (!/\.(jpg|jpeg|png|webp|svg)$/i.test(file)) continue;
    const srcFile = path.join(srcImagesDir, file);

    // Derive canonical simplified name by stripping timestamp (e.g. coway_hero_purifier_1791998277313.jpg -> coway_hero_purifier.jpg)
    const cleanName = file.replace(/_\d{10,15}\./, '.');

    for (const dir of targetImageDirs) {
      // Copy exact name
      fs.copyFileSync(srcFile, path.join(dir, file));
      // Copy clean canonical name
      fs.copyFileSync(srcFile, path.join(dir, cleanName));

      // Special alias: coway_man_planner -> coway_cody_specialist
      if (file.includes('man_planner')) {
        fs.copyFileSync(srcFile, path.join(dir, 'coway_cody_specialist.jpg'));
        fs.copyFileSync(srcFile, path.join(dir, 'coway_cody_specialist_1791998277853.jpg'));
      }
    }
  }
  console.log(`[sync-images] Successfully synced ${files.length} images across all static and dist directories.`);
}

// 2. Sync audio
if (fs.existsSync(srcAudioDir)) {
  const audioFiles = fs.readdirSync(srcAudioDir);
  for (const afile of audioFiles) {
    const srcAudio = path.join(srcAudioDir, afile);
    for (const adir of targetAudioDirs) {
      fs.copyFileSync(srcAudio, path.join(adir, afile));
    }
  }
  console.log(`[sync-images] Successfully synced audio files across public and dist audio directories.`);
}
