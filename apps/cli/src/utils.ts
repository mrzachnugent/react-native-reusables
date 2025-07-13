import { Effect } from "effect"
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

export { resolvePathFromAlias, retryWith }
