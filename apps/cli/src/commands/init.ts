import { copyFolder } from '@/src/utils/copy-folder';
import { handleError } from '@/src/utils/handle-error';
import { logger } from '@/src/utils/logger';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { Command } from 'commander';
import { execa } from 'execa';
import { existsSync, promises as fs } from 'fs';
import ora from 'ora';
import path from 'path';
import prompts from 'prompts';
import { fileURLToPath } from 'url';

const filePath = fileURLToPath(import.meta.url);
const fileDir = path.dirname(filePath);

export const init = new Command()
  .name('init')
  .description('Initialize a new React Native Reusables project')
  .action(async () => {
    try {
      const cwd = process.cwd();

      if (existsSync(cwd) && existsSync(path.join(cwd, 'package.json'))) {
        const { option } = await prompts({
          type: 'select',
          name: 'option',
          message: 'Package.json found. How would you like to proceed?',
          choices: [
            { title: 'Initialize a new project', value: 'new-project' },
            { title: 'Cancel', value: 'cancel' },
          ],
          initial: false,
        });

        if (option === 'cancel') {
          logger.info('Installation cancelled.');
          process.exit(0);
        }
      }

      const { projectPath } = await prompts({
        type: 'text',
        name: 'projectPath',
        message: `Enter the project name or relative path (e.g., 'my-app' or './apps/my-app'):`,
        initial: './my-app',
      });

      const { packageManager } = await prompts({
        type: 'select',
        name: 'packageManager',
        message: 'Which package manager would you like the CLI to use?',
        choices: [
          { title: 'npm', value: 'npm' },
          { title: 'yarn', value: 'yarn' },
          { title: 'pnpm', value: 'pnpm' },
          { title: 'bun', value: 'bun' },
          { title: 'None.', value: 'none' },
        ],
      });

      const projectName = path.basename(projectPath);

      const spinner = ora(`Initializing ${projectName}...`).start();

      const fullProjectPath = path.join(cwd, projectPath);
      if (!existsSync(fullProjectPath)) {
        await fs.mkdir(fullProjectPath, { recursive: true });
      }

      const filesToIgnore = [];

      if (packageManager !== 'pnpm') {
        filesToIgnore.push('npmrc-template');
      }

      await copyFolder(path.join(fileDir, '../__generated/starter-base'), fullProjectPath, {
        ignore: filesToIgnore,
        renameTemplateFiles: true,
      });

      await Promise.all([
        replaceAllInJsonFile(path.join(fullProjectPath, 'app.json'), 'starter-base', projectName),
        replaceAllInJsonFile(
          path.join(fullProjectPath, 'package.json'),
          '@rnr/starter-base',
          projectName
        ),
      ]);

      if (packageManager !== 'none') {
        spinner.start(
          `Installing dependencies using ${packageManager} (this may take a few minutes)...`
        );
        await execa(packageManager, ['install'], {
          cwd: fullProjectPath,
        });
        spinner.text = 'Running expo doctor to ensure package compatibility...';
        await execa('npx', ['expo', 'install', '--fix'], {
          cwd: fullProjectPath,
        });
      }

      spinner.stop();
      const { gitInit } = await prompts({
        type: 'confirm',
        name: 'gitInit',
        message: 'Would you like to initialize a Git repository?',
      });

      if (gitInit) {
        spinner.start('Initializing Git repository...');
        try {
          execSync('git init', { stdio: 'inherit', cwd: fullProjectPath });

          execSync('git add -A', { stdio: 'inherit', cwd: fullProjectPath });
          execSync('git commit -m "initialize project with @react-native-reusables/cli"', {
            stdio: 'inherit',
            cwd: fullProjectPath,
          });

          spinner.succeed('Git repository initialized successfully.');
        } catch (error) {
          logger.error('Failed to initialize Git repository:', error);
        }
      }

      spinner.succeed('New project initialized successfully!');
      console.log(`\nTo get started, run the following commands:\n`);
      console.log(chalk.cyan(`cd ${projectPath}`));
      if (packageManager !== 'none') {
        console.log(
          chalk.cyan(
            `${packageManager} ${
              packageManager === 'npm' || packageManager === 'bun' ? 'run ' : ''
            }dev`
          )
        );
      }
      if (packageManager === 'none') {
        console.log('Install the dependencies manually using your package manager of choice.');
        console.log('Then run the dev script.');
      }
      console.log('\nAdditional resources:');
      console.log('- Documentation: https://rnr-docs.vercel.app');
      console.log('- Report issues: https://github.com/mrzachnugent/react-native-reusables/issues');
      process.exit(0);
    } catch (error) {
      handleError(error);
    }
  });

async function replaceAllInJsonFile(path: string, searchValue: string, replaceValue: string) {
  try {
    if (!existsSync(path)) {
      logger.error(`The path ${path} does not exist.`);
      process.exit(1);
    }

    const jsonValue = await fs.readFile(path, 'utf8');
    const replacedValue = jsonValue.replaceAll(searchValue, replaceValue);

    await fs.writeFile(path, replacedValue);
  } catch (error) {
    handleError(error);
  }
}
