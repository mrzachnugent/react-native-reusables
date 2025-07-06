import { existsSync, promises as fs } from 'fs';
import path from 'path';

export async function copyFolder(
  src: string,
  dest: string,
  options: { ignore: string[]; renameTemplateFiles: boolean } = {
    ignore: [],
    renameTemplateFiles: false,
  }
) {
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

    if (options.ignore.includes(entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      await copyFolder(srcPath, destPath, options);
    } else if (entry.isFile()) {
      if (options.renameTemplateFiles && entry.name === 'gitignore-template') {
        await fs.copyFile(srcPath, path.join(dest, '.gitignore'));
      } else if (options.renameTemplateFiles && entry.name === 'npmrc-template') {
        await fs.copyFile(srcPath, path.join(dest, '.npmrc'));
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }
}
