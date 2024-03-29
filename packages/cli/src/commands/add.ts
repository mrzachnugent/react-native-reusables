import { existsSync, promises as fs } from 'fs';
import path from 'path';
import {
  Config,
  DEFAULT_COMPONENTS,
  DEFAULT_PLATFORMS,
  DEFAULT_UTILS,
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
} from '@/src/utils/get-config';
import { getPackageManager } from '@/src/utils/get-package-manager';
import { handleError } from '@/src/utils/handle-error';
import { logger } from '@/src/utils/logger';
import {
  fetchTree,
  getItemTargetPath,
  getRegistryBaseColor,
  getRegistryIndex,
  resolveTree,
} from '@/src/utils/registry';
import { transform } from '@/src/utils/transformers';
import chalk from 'chalk';
import { Command } from 'commander';
import { execa } from 'execa';
import ora from 'ora';
import prompts from 'prompts';
import { z } from 'zod';
import { COMPONENTS } from '../items/components';

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  overwrite: z.boolean(),
  cwd: z.string(),
  path: z.string().optional(),
});

export const add = new Command()
  .name('add')
  .description('add components/utils to your project')
  .argument('[components/utils...]', 'the components to add')
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
  )
  .option('-p, --path <path>', 'the path to add the component to.')
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

      let selectedComponents = options.components ?? [];
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

      if (
        !selectedComponents.every((component) =>
          COMPONENTS.find((entry) => entry.name === component)
        )
      ) {
        logger.error(
          `Invalid component(s): ${selectedComponents
            .filter((component) => !COMPONENTS.find((entry) => entry.name === component))
            .join(', ')}`
        );
        process.exit(1);
      }

      const spinner = ora(`Installing components...`).start();

      for (const comp of COMPONENTS) {
        if (Array.isArray(comp.paths)) {
          const file = await fs.readFile(path.resolve(comp.paths[0].from), 'utf8');
          console.log(file);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      spinner.succeed(`Done.`);
      // for (const item of payload) {
      //   spinner.text = `Installing ${item.name}...`
      //   const targetDir = await getItemTargetPath(
      //     config,
      //     item,
      //     options.path ? path.resolve(cwd, options.path) : undefined
      //   )

      //   if (!targetDir) {
      //     continue
      //   }

      //   if (!existsSync(targetDir)) {
      //     await fs.mkdir(targetDir, { recursive: true })
      //   }

      //   const existingComponent = item.files.filter((file) =>
      //     existsSync(path.resolve(targetDir, file.name))
      //   )

      //   if (existingComponent.length && !options.overwrite) {
      //     if (selectedComponents.includes(item.name)) {
      //       spinner.stop()
      //       const { overwrite } = await prompts({
      //         type: "confirm",
      //         name: "overwrite",
      //         message: `Component ${item.name} already exists. Would you like to overwrite?`,
      //         initial: false,
      //       })

      //       if (!overwrite) {
      //         logger.info(
      //           `Skipped ${item.name}. To overwrite, run with the ${chalk.green(
      //             "--overwrite"
      //           )} flag.`
      //         )
      //         continue
      //       }

      //       spinner.start(`Installing ${item.name}...`)
      //     } else {
      //       continue
      //     }
      //   }

      //   for (const file of item.files) {
      //     let filePath = path.resolve(targetDir, file.name)

      //     // Run transformers.
      //     const content = await transform({
      //       filename: file.name,
      //       raw: file.content,
      //       config,
      //       baseColor,
      //     })

      //     await fs.writeFile(filePath, content)
      //   }

      //   const packageManager = await getPackageManager(cwd)

      //   // Install dependencies.
      //   if (item.dependencies?.length) {
      //     await execa(
      //       packageManager,
      //       [
      //         packageManager === "npm" ? "install" : "add",
      //         ...item.dependencies,
      //       ],
      //       {
      //         cwd,
      //       }
      //     )
      //   }

      //   // Install devDependencies.
      //   if (item.devDependencies?.length) {
      //     await execa(
      //       packageManager,
      //       [
      //         packageManager === "npm" ? "install" : "add",
      //         "-D",
      //         ...item.devDependencies,
      //       ],
      //       {
      //         cwd,
      //       }
      //     )
      //   }
      // }
      // spinner.succeed(`Done.`)
    } catch (error) {
      handleError(error);
    }
  });

async function promptForConfig(cwd: string) {
  const highlight = (text: string) => chalk.cyan(text);

  const options = await prompts([
    {
      type: 'select',
      name: 'platforms',
      message: `Which ${highlight('platforms')} do you support?`,
      choices: [
        { title: 'Universal (Web, iOS, and Android)', value: 'universal' },
        { title: 'Native Only (iOS and Android)', value: 'native-only' },
      ],
    },
    {
      type: 'text',
      name: 'components',
      message: `Configure the import alias for ${highlight('components')}:`,
      initial: DEFAULT_COMPONENTS,
    },
    {
      type: 'text',
      name: 'utils',
      message: `Configure the import alias for ${highlight('utils')}:`,
      initial: DEFAULT_UTILS,
    },
  ]);

  const config = rawConfigSchema.parse({
    platforms: options.platforms,
    aliases: {
      utils: options.utils,
      components: options.components,
    },
  });

  const { proceed } = await prompts({
    type: 'confirm',
    name: 'proceed',
    message: `Write configuration to ${highlight('components.json')}. Proceed?`,
    initial: true,
  });

  if (!proceed) {
    process.exit(0);
  }

  // Write to file.
  logger.info('');
  const spinner = ora(`Writing components.json...`).start();
  const targetPath = path.resolve(cwd, 'components.json');
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf8');
  spinner.succeed();

  return await resolveConfigPaths(cwd, config);
}
