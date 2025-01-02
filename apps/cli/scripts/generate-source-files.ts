#!/usr/bin/env node

import { existsSync, promises as fs } from 'fs';
import path from 'path';
import { COMPONENTS } from '../src/items/components';
import { TEMPLATES } from '../src/items/templates';

async function main() {
  for (const template of TEMPLATES) {
    await copyFolder(template.path);
  }
  for (const comp of COMPONENTS) {
    if (Array.isArray(comp.paths)) {
      await writeFiles(comp.paths);
    } else {
      await writeFiles(comp.paths['universal']);
    }
  }
}

main();

async function writeFiles(paths: Array<{ from: string; to: { folder: string; file: string } }>) {
  for (const compPath of paths) {
    const targetDir = path.join('__generated/components', compPath.to.folder);
    if (!existsSync(targetDir)) {
      await fs.mkdir(targetDir, { recursive: true });
    }
    try {
      const content = await fs.readFile(path.resolve(compPath.from), 'utf8');
      await fs.writeFile(path.join(targetDir, compPath.to.file), content);
    } catch (error) {
      console.error(error);
    }
  }
}

async function copyFolder(src: string, destPath?: string) {
  if (!existsSync(src)) {
    throw new Error(`Source folder does not exist: ${src}`);
  }

  const paths = src.split('/');
  const folderName = paths[paths.length - 1];

  const dest = destPath ?? path.join('__generated', folderName);

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
