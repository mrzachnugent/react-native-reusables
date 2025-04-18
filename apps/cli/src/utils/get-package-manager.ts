import { detect } from '@antfu/ni';

export async function getPackageManager(
  targetDir: string
): Promise<'yarn' | 'pnpm' | 'bun' | 'npm' | 'deno'> {
  const packageManager = await detect({ programmatic: true, cwd: targetDir });

  if (packageManager === 'yarn@berry') {
    return 'yarn';
  }
  if (packageManager === 'pnpm@6') {
    return 'pnpm';
  }

  return packageManager ?? 'npm';
}
