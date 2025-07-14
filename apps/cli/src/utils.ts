import { Effect } from "effect"
import { execa } from "execa"
import { createMatchPath, type ConfigLoaderSuccessResult } from "tsconfig-paths"

const supportedExtensions = [".ts", ".tsx", ".jsx", ".js", ".css"]

const resolvePathFromAlias = (
  aliasPath: string,
  config: Pick<ConfigLoaderSuccessResult, "absoluteBaseUrl" | "paths">
) =>
  Effect.try({
    try: () => {
      const matchPath = createMatchPath(config.absoluteBaseUrl, config.paths)(
        aliasPath,
        undefined,
        () => true,
        supportedExtensions
      )
      if (!matchPath) {
        throw new Error("Path not found", { cause: aliasPath })
      }
      return matchPath
    },
    catch: (error) => new Error("Path not found", { cause: String(error) })
  })

const retryWith = <A, R, E, B>(
  fn: (input: A) => Effect.Effect<R, E, B>,
  inputs: readonly [A, ...Array<A>]
): Effect.Effect<R, E, B> =>
  inputs.slice(1).reduce((acc, input) => acc.pipe(Effect.orElse(() => fn(input))), fn(inputs[0]))

const runCommand = (file: string, args: Array<string>, options: Parameters<typeof execa>[1]) =>
  Effect.tryPromise({
    try: () => execa(file, args, options),
    catch: (error) => new Error(`Failed to run command: ${file} ${args.join(" ")}`, { cause: String(error) })
  })

export { resolvePathFromAlias, retryWith, runCommand }
