import { REQUIREMENTS } from "@cli/doctor/requirements.js"
import { resolvePathFromAlias } from "@cli/doctor/utils.js"
import { FileSystem } from "@effect/platform"
import { Effect } from "effect"
import { type ConfigLoaderSuccessResult } from "tsconfig-paths"

const checkDeprecatedFiles = (aliasForLib: string, tsConfig: ConfigLoaderSuccessResult) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem

    const existingDeprecatedFromLibs = yield* Effect.forEach(
      REQUIREMENTS.deprecatedFromLib,
      (filePath) =>
        resolvePathFromAlias(`${aliasForLib}/${filePath}`, tsConfig).pipe(
          Effect.flatMap((fullPath) =>
            Effect.gen(function* () {
              const exists = yield* fs.exists(fullPath)
              if (!exists) {
                yield* Effect.logDebug(`✅ deprecated lib/${filePath} not found`)
              }
              return { file: `${aliasForLib}/${filePath}`, exists }
            })
          )
        ),
      { concurrency: "unbounded" }
    ).pipe(Effect.map((results) => results.filter((result) => result.exists)))

    return existingDeprecatedFromLibs
  })

export { checkDeprecatedFiles }
