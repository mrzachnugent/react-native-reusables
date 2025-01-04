import { existsSync, promises as fs } from 'fs';
import path from 'path';

export async function copyFolder(src: string, dest: string) {
  if (!existsSync(src)) {
    throw new Error(`Source folder does not exist: ${src}`);
  }

  if (!existsSync(dest)) {
    await fs.mkdir(dest, { recursive: true });
  }

  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      await copyFolder(srcPath, destPath);
    } else if (entry.isFile()) {
      // Copy files
      await fs.copyFile(srcPath, destPath);
    }
  }
}
