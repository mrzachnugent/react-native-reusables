import { Data, Effect } from "effect"
import { createMatchPath, loadConfig as loadTypscriptConfig, type ConfigLoaderSuccessResult } from "tsconfig-paths"

class ParseJsonError extends Data.TaggedError("ParseJsonError")<{
  cause?: unknown
  message?: string
}> {}

class FileNotFoundError extends Data.TaggedError("FileNotFoundError")<{
  file: string
  message?: string
}> {}

class InvalidConfigError extends Data.TaggedError("InvalidConfigError")<{
  config: string
  message?: string
}> {}

const supportedExtensions = [".ts", ".tsx", ".jsx", ".js", ".css"]

const loadTsConfig = (cwd: string) =>
  Effect.try({
    try: () => {
      const configResult = loadTypscriptConfig(cwd)
      if (configResult.resultType === "failed") {
        throw new Error("Error loading tsconfig.json", { cause: configResult.message })
      }
      return configResult
    },
    catch: (error) => new InvalidConfigError({ config: "tsconfig.json", message: String(error) })
  })

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
    catch: (error) => new FileNotFoundError({ file: aliasPath, message: String(error) })
  })

const parseJson = (content: string) =>
  Effect.try({
    try: () => JSON.parse(content) as unknown,
    catch: (error) => new ParseJsonError({ message: "Error parsing JSON", cause: error })
  })

const retryWith = <A, R, E, B>(
  fn: (input: A) => Effect.Effect<R, E, B>,
  inputs: readonly [A, ...Array<A>]
): Effect.Effect<R, E, B> =>
  inputs.slice(1).reduce((acc, input) => acc.pipe(Effect.orElse(() => fn(input))), fn(inputs[0]))

export {
  FileNotFoundError,
  InvalidConfigError,
  loadTsConfig,
  parseJson,
  ParseJsonError,
  resolvePathFromAlias,
  retryWith
}
