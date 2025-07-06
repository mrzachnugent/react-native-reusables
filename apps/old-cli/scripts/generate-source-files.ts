#!/usr/bin/env node

import { existsSync, promises as fs } from 'fs';
import path from 'path';
import { COMPONENTS } from '../src/items/components';
import { TEMPLATES } from '../src/items/templates';
import { copyFolder } from '../src/utils/copy-folder';

async function main() {
  for (const template of TEMPLATES) {
    await copyFolder(template.path, path.join('__generated', template.name), {
      ignore: ['.expo', 'node_modules'],
      renameTemplateFiles: false,
    });
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
