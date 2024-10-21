import { resolveImport } from '@/src/utils/resolve-import';
import { cosmiconfig } from 'cosmiconfig';
import { loadConfig } from 'tsconfig-paths';
import { z } from 'zod';

export const DEFAULT_COMPONENTS = '~/components';
export const DEFAULT_LIB = '~/lib';

const explorer = cosmiconfig('components', {
  searchPlaces: ['components.json'],
});

export const rawConfigSchema = z.object({
  aliases: z.object({
    components: z.string(),
    lib: z.string(),
  }),
});

export type RawConfig = z.infer<typeof rawConfigSchema>;

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    lib: z.string(),
    components: z.string(),
  }),
});

export type Config = z.infer<typeof configSchema>;

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd);

  if (!config) {
    return null;
  }

  return await resolveConfigPaths(cwd, config);
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  // Read tsconfig.json.
  const tsConfig = await loadConfig(cwd);

  if (tsConfig.resultType === 'failed') {
    throw new Error(`Failed to load tsconfig.json. ${tsConfig.message ?? ''}`.trim());
  }

  return configSchema.parse({
    ...config,
    resolvedPaths: {
      lib: await resolveImport(config.aliases['lib'], tsConfig),
      components: await resolveImport(config.aliases['components'], tsConfig),
    },
  });
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd);

    if (!configResult) {
      return null;
    }

    return rawConfigSchema.parse(configResult.config);
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`);
  }
}
