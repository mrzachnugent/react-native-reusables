import { Config, getConfig } from '@/src/utils/get-config';
import { getPackageManager } from '@/src/utils/get-package-manager';
import { handleError } from '@/src/utils/handle-error';
import { logger } from '@/src/utils/logger';
import { promptForConfig } from '@/src/utils/prompt-for-config';
import chalk from 'chalk';
import { Command } from 'commander';
import { execa } from 'execa';
import { existsSync, promises as fs } from 'fs';
import ora, { Ora } from 'ora';
import path from 'path';
import prompts from 'prompts';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { Component, INVALID_COMPONENT_ERROR, getAllComponentsToWrite } from '../items';
import { COMPONENTS } from '../items/components';

const filePath = fileURLToPath(import.meta.url);
const fileDir = path.dirname(filePath);

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  overwrite: z.boolean(),
  cwd: z.string(),
  path: z.string().optional(),
});

export const add = new Command()
  .name('add')
  .description('add components to your project')
  .argument('[components...]', 'the components to add')
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
  )
  .action(async (components, opts) => {
    try {
      const options = addOptionsSchema.parse({
        components,
        ...opts,
      });

      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      let config = await getConfig(cwd);

      if (!config) {
        config = await promptForConfig(cwd);
      }

      let selectedComponents: Array<string> = options.components ?? [];
      if (!selectedComponents?.length) {
        const { components } = await prompts({
          type: 'multiselect',
          name: 'components',
          message: 'Which components would you like to add?',
          hint: 'Space to select. A to toggle all. Enter to submit.',
          instructions: false,
          choices: COMPONENTS.map((entry) => ({
            title: entry.name,
            value: entry.name,
            selected: false,
          })),
        });
        selectedComponents = components;
      }

      if (!selectedComponents?.length) {
        logger.warn('No components selected. Exiting.');
        process.exit(0);
      }

      const spinner = ora(`Installing components...`).start();

      let componentsToWrite: Array<Component> = [];
      try {
        componentsToWrite = getAllComponentsToWrite(selectedComponents);
      } catch (err) {
        if (err instanceof Error && err.message === INVALID_COMPONENT_ERROR) {
          logger.error(
            `Invalid component(s): ${selectedComponents
              .filter((component) => !COMPONENTS.find((entry) => entry.name === component))
              .join(', ')}`
          );
          process.exit(1);
        }
        logger.error(err);
      }

      const npmPackages: Array<string> = [];

      for (const comp of componentsToWrite) {
        spinner.text = `Installing ${comp.name}...`;

        await writeFiles(comp, comp.paths, config, spinner, options.overwrite);

        npmPackages.push(...comp.npmPackages);
      }

      const packageManager = await getPackageManager(cwd);

      const uniqueNpmPackages = Array.from(new Set(npmPackages));

      if (uniqueNpmPackages.length) {
        spinner.text = `Installing ${uniqueNpmPackages.join(', ')}...`;
        await execa(
          packageManager,
          [packageManager === 'npm' ? 'install' : 'add', ...uniqueNpmPackages],
          {
            cwd,
          }
        );
      }
      spinner.succeed(`Done.`);
    } catch (error) {
      handleError(error);
    }
  });

async function writeFiles(
  comp: Component,
  paths: Array<{ from: string; distFrom?: string; to: { folder: string; file: string } }>,
  config: Config,
  spinner: Ora,
  overwriteFlag: boolean
) {
  for (const compPath of paths) {
    const targetDir = path.join(config.resolvedPaths.components, compPath.to.folder);
    if (!existsSync(targetDir)) {
      await fs.mkdir(targetDir, { recursive: true });
    }

    spinner.stop();

    if (existsSync(path.join(targetDir, compPath.to.file))) {
      const filePath = [compPath.to.folder, compPath.to.file].join('/');
      if (!overwriteFlag) {
        logger.info(
          `File already exists: ${chalk.bgCyan(
            filePath
          )} was skipped. To overwrite, run with the ${chalk.green('--overwrite')} flag.`
        );
        continue;
      }

      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `File already exists: ${chalk.yellow(filePath)}. Would you like to overwrite?`,
        initial: false,
      });

      if (!overwrite) {
        logger.info(`Skipped`);
        continue;
      }
    }

    spinner.start(`Installing ${comp.name}...`);
    const readFromPath = compPath.distFrom
      ? path.join(fileDir, '../__generated/components', compPath.distFrom)
      : path.join(fileDir, '../__generated/components', compPath.to.folder, compPath.to.file);
    try {
      const content = await fs.readFile(path.resolve(readFromPath), 'utf8');
      await fs.writeFile(
        path.join(targetDir, compPath.to.file),
        fixImports(content, config.aliases.components, config.aliases.lib)
      );
    } catch (error) {
      handleError(error);
    }
  }

  for (const icon of comp.icons ?? []) {
    const targetDir = path.resolve(config.resolvedPaths.lib, 'icons');
    if (!existsSync(targetDir)) {
      await fs.mkdir(targetDir, { recursive: true });
      try {
        await fs.writeFile(
          path.join(targetDir, `iconWithClassName.ts`),
          `import type { LucideIcon } from 'lucide-react-native';\nimport { cssInterop } from 'nativewind';\n\nexport function iconWithClassName(icon: LucideIcon) {\ncssInterop(icon, {\n  className: {\n    target: 'style',\n    nativeStyleToProp: {\n      color: true,\n      opacity: true,\n    },\n  },\n});\n}`
        );
      } catch (error) {
        handleError(error);
      }
    }

    if (existsSync(path.join(targetDir, `${icon}.tsx`))) {
      const filePath = path.join(targetDir, `${icon}.tsx`);
      if (!overwriteFlag) {
        logger.info(
          `File already exists: ${chalk.bgCyan(
            `${icon}.tsx`
          )} was skipped. To overwrite, run with the ${chalk.green('--overwrite')} flag.`
        );
        continue;
      }

      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `File already exists: ${chalk.yellow(filePath)}. Would you like to overwrite?`,
        initial: false,
      });

      if (!overwrite) {
        logger.info(`Skipped ${icon}.tsx`);
        continue;
      }
    }

    spinner.start(`Adding the ${icon} icon...`);

    try {
      await fs.writeFile(
        path.join(targetDir, `${icon}.tsx`),
        `import { ${icon} } from 'lucide-react-native';\nimport { iconWithClassName } from './iconWithClassName';\niconWithClassName(${icon});\nexport { ${icon} };`
      );
    } catch (error) {
      handleError(error);
    }
  }
}

function fixImports(rawfile: string, componentsAlias: string, libAlias: string) {
  return rawfile
    .replace('./typography', `${componentsAlias}/ui/typography`)
    .replace('./text', `${componentsAlias}/ui/text`)
    .replaceAll('../../components', componentsAlias)
    .replaceAll('../../lib', libAlias);
}
