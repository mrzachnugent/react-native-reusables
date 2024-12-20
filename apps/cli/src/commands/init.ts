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

async function updateTsConfig(cwd: string, spinner: Ora) {
  try {
    spinner.text = 'Configuring path aliases...';
    const tsconfigPath = path.join(cwd, 'tsconfig.json');
    const tsconfig = existsSync(tsconfigPath)
      ? JSON.parse(await fs.readFile(tsconfigPath, 'utf8'))
      : {};

    tsconfig.compilerOptions = {
      ...tsconfig.compilerOptions,
      baseUrl: '.',
      paths: {
        '~/*': ['*'],
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

async function updateImportPaths(cwd: string, spinner: Ora) {
  try {
    spinner.text = 'Updating import paths...';
    const files = await glob(['**/*.{ts,tsx,js,jsx}'], {
      cwd,
      ignore: ['node_modules/**', 'dist/**', 'build/**', '.expo/**'],
    });

    for (const file of files) {
      const filePath = path.join(cwd, file);
      const content = await fs.readFile(filePath, 'utf8');
      const updatedContent = content
        .replace(/(from\s+['"])@\/(.*?['"])/g, '$1~/$2')
        .replace(/(import\s+['"])@\/(.*?['"])/g, '$1~/$2');

      if (content !== updatedContent) {
        await fs.writeFile(filePath, updatedContent);
        spinner.text = `Updated imports in ${file}`;
      }
    }
  } catch (error) {
    spinner.fail('Failed to update import paths');
    handleError(error);
  }
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

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      const spinner = ora(`Initializing project...`).start();
      const templatesDir = path.dirname(
        createRequire(import.meta.url).resolve('@rnr/starter-base/package.json')
      );

      await installDependencies(cwd, spinner);
      await updateTsConfig(cwd, spinner);

      spinner.text = 'Copying template files...';
      for (const file of TEMPLATE_FILES) {
        await copyTemplateFile(file, templatesDir, cwd, spinner, options.overwrite);
      }

      await updateImportPaths(cwd, spinner);
      await updateLayoutFile(cwd, spinner);

      spinner.succeed('Initialization completed successfully!');
    } catch (error) {
      handleError(error);
    }
  });
