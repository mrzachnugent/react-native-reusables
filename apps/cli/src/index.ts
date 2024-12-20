#!/usr/bin/env node
import { add } from '@/src/commands/add';
import { init } from '@/src/commands/init';

import { Command } from 'commander';

import { getPackageInfo } from './utils/get-package-info';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name('rnr-cli')
    .description('add components and dependencies to your project')
    .version(packageInfo.version || '0.0.0-rc.0', '-v, --version', 'display the version number');

  program.addCommand(add);
  program.addCommand(init);

  program.parse();
}

main();
