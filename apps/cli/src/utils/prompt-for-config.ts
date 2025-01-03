import {
  DEFAULT_COMPONENTS,
  DEFAULT_LIB,
  rawConfigSchema,
  resolveConfigPaths,
} from '@/src/utils/get-config';
import { logger } from '@/src/utils/logger';
import chalk from 'chalk';
import { promises as fs } from 'fs';
import ora from 'ora';
import path from 'path';
import prompts from 'prompts';

export async function promptForConfig(cwd: string) {
  const highlight = (text: string) => chalk.cyan(text);

  const options = await prompts([
    {
      type: 'text',
      name: 'components',
      message: `Configure the import alias for ${highlight('components')}:`,
      initial: DEFAULT_COMPONENTS,
    },
    {
      type: 'text',
      name: 'lib',
      message: `Configure the import alias for ${highlight('lib')}:`,
      initial: DEFAULT_LIB,
    },
  ]);

  const config = rawConfigSchema.parse({
    aliases: {
      lib: options.lib || DEFAULT_COMPONENTS,
      components: options.components || DEFAULT_LIB,
    },
  });

  const { proceed } = await prompts({
    type: 'confirm',
    name: 'proceed',
    message: `Write configuration to ${highlight('components.json')}. Proceed?`,
    initial: true,
  });

  if (proceed) {
    logger.info('');
    const spinner = ora(`Writing components.json...`).start();
    const targetPath = path.resolve(cwd, 'components.json');
    await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf8');
    spinner.succeed();
  }

  return await resolveConfigPaths(cwd, config);
}
