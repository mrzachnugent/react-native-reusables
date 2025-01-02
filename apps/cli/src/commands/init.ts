import { existsSync } from 'fs';
import { promises as fs } from 'fs';
import { Command } from 'commander';
import { execa } from 'execa';
import ora, { Ora } from 'ora';
import path from 'path';
import { z } from 'zod';
import { handleError } from '@/src/utils/handle-error';
import { logger } from '@/src/utils/logger';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import prompts from 'prompts';
import glob from 'fast-glob';
import { createRequire } from 'module';
import { execSync } from 'child_process';
import {
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
  DEFAULT_COMPONENTS,
  DEFAULT_LIB,
} from '@/src/utils/get-config';

const filePath = fileURLToPath(import.meta.url);
const fileDir = path.dirname(filePath);

const initOptionsSchema = z.object({
  cwd: z.string(),
  overwrite: z.boolean(),
});

const REQUIRED_DEPENDENCIES = [
  'nativewind',
  'expo-navigation-bar',
  'tailwindcss-animate',
  '@react-native-async-storage/async-storage',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'react-native-svg',
  'lucide-react-native',
  '@rn-primitives/portal',
] as const;

const TEMPLATE_FILES = [
  'tailwind.config.js',
  'nativewind-env.d.ts',
  'global.css',
  'babel.config.js',
  'metro.config.js',
  'lib/utils.ts',
  'lib/useColorScheme.tsx',
  'lib/constants.ts',
  'lib/android-navigation-bar.ts',
  'lib/icons/iconWithClassName.ts',
] as const;

async function installDependencies(cwd: string, spinner: Ora) {
  try {
    spinner.text = 'Installing dependencies...';
    await execa('npx', ['expo', 'install', ...REQUIRED_DEPENDENCIES], {
      cwd,
      stdio: 'inherit',
    });
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    handleError(error);
  }
}

async function promptForConfig(cwd: string) {
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
      lib: options.lib,
      components: options.components,
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

async function updateTsConfig(cwd: string, config: any, spinner: Ora) {
  try {
    spinner.text = 'Configuring path aliases...';
    const tsconfigPath = path.join(cwd, 'tsconfig.json');
    const tsconfig = existsSync(tsconfigPath)
      ? JSON.parse(await fs.readFile(tsconfigPath, 'utf8'))
      : {};

    const componentBase = config.aliases.components.split('/')[0];
    const libBase = config.aliases.lib.split('/')[0];
    const basePath = componentBase === libBase ? componentBase : '@';

    tsconfig.compilerOptions = {
      ...tsconfig.compilerOptions,
      baseUrl: '.',
      paths: {
        [`${basePath}/*`]: ['*'],
        ...tsconfig.compilerOptions?.paths,
      },
    };

    await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  } catch (error) {
    spinner.fail('Failed to update tsconfig.json');
    handleError(error);
  }
}

async function copyTemplateFile(
  file: string,
  templatesDir: string,
  targetDir: string,
  spinner: Ora,
  overwriteFlag: boolean
) {
  const targetPath = path.join(targetDir, file);
  spinner.stop();

  if (existsSync(targetPath)) {
    if (!overwriteFlag) {
      logger.info(
        `File already exists: ${chalk.bgCyan(
          file
        )} was skipped. To overwrite, run with the ${chalk.green('--overwrite')} flag.`
      );
      return;
    }

    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `File already exists: ${chalk.yellow(file)}. Would you like to overwrite?`,
      initial: false,
    });

    if (!overwrite) {
      logger.info(`Skipped`);
      return;
    }
  }

  spinner.start(`Installing ${file}...`);
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(path.join(templatesDir, file), targetPath);
}

async function updateLayoutFile(cwd: string, spinner: Ora) {
  try {
    spinner.text = 'Updating layout file...';
    const layoutFiles = await glob(
      ['app/_layout.{ts,tsx,js,jsx}', '(app)/_layout.{ts,tsx,js,jsx}'],
      {
        cwd,
        ignore: ['node_modules/**'],
      }
    );

    if (!layoutFiles.length) {
      spinner.warn('No _layout file found in app directory');
      return;
    }

    const layoutPath = path.join(cwd, layoutFiles[0]);
    const content = await fs.readFile(layoutPath, 'utf8');

    if (!content.includes('import "../global.css"')) {
      await fs.writeFile(layoutPath, `import "../global.css";\n${content}`);
      spinner.succeed(`Updated ${layoutFiles[0]} with global CSS import`);
    }
  } catch (error) {
    spinner.fail('Failed to update layout file');
    handleError(error);
  }
}

async function shouldPromptGitWarning(cwd: string): Promise<boolean> {
  try {
    execSync('git rev-parse --is-inside-work-tree', { cwd });
    const status = execSync('git status --porcelain', { cwd }).toString();
    return !!status;
  } catch (error) {
    return false;
  }
}

async function validateProjectDirectory(cwd: string) {
  if (!existsSync(cwd)) {
    logger.error(`The path ${cwd} does not exist. Please try again.`);
    process.exit(1);
  }

  if (!existsSync(path.join(cwd, 'package.json'))) {
    logger.error(
      'No package.json found. Please run this command in a React Native project directory.'
    );
    process.exit(1);
  }
}

async function checkGitStatus(cwd: string) {
  if (await shouldPromptGitWarning(cwd)) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message:
        'The Git repository is dirty (uncommitted changes). It is recommended to commit your changes before proceeding. Do you want to continue?',
      initial: false,
    });

    if (!proceed) {
      logger.info('Installation cancelled.');
      process.exit(0);
    }
  }
}

async function initializeProject(cwd: string, overwrite: boolean) {
  const spinner = ora(`Initializing project...`).start();

  let config = await getConfig(cwd);

  if (!config) {
    config = await promptForConfig(cwd);
  }

  const templatesDir = path.dirname(createRequire(import.meta.url).resolve('@rnr/starter-base'));

  await installDependencies(cwd, spinner);
  await updateTsConfig(cwd, config, spinner);

  spinner.text = 'Copying template files...';
  for (const file of TEMPLATE_FILES) {
    await copyTemplateFile(file, templatesDir, cwd, spinner, overwrite);
  }

  await updateLayoutFile(cwd, spinner);

  spinner.succeed('Initialization completed successfully!');
}

export const init = new Command()
  .name('init')
  .description('Initialize the React Native project with required configuration')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
  )
  .option('-o, --overwrite', 'overwrite existing files', false)
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts);
      const cwd = path.resolve(options.cwd);

      await validateProjectDirectory(cwd);
      await checkGitStatus(cwd);
      await initializeProject(cwd, options.overwrite);
    } catch (error) {
      handleError(error);
    }
  });
