import { REQUIREMENTS, type CustomFileCheck, type MissingInclude } from "@cli/doctor/requirements.js"
import { FileNotFoundError, resolvePathFromAlias, retryWith } from "@cli/doctor/utils.js"
import type { componentJsonSchema } from "@cli/schemas/component-json-schema.js"
import { FileSystem, Path } from "@effect/platform"
import { Effect } from "effect"
import { type ConfigLoaderSuccessResult } from "tsconfig-paths"

const NATIVEWIND_ENV_FILE = "nativewind-env.d.ts"

const checkCustomFiles = (
  cwd: string,
  componentJson: typeof componentJsonSchema.Type,
  tsConfig: ConfigLoaderSuccessResult
) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path

    const aliasForLib = componentJson.aliases.lib ?? `${componentJson.aliases.utils}/lib`
    const missingFiles: Array<CustomFileCheck> = []
    const missingIncludes: Array<MissingInclude> = []

    // Check CSS files
    const cssPaths = [componentJson.tailwind.css, "global.css", "src/global.css"].filter((p) => p != null)
    const cssContent = yield* retryWith(
      (filePath: string) =>
        Effect.gen(function* () {
          const content = yield* fs.readFileString(filePath)
          yield* Effect.logDebug(`✅ ${REQUIREMENTS.customFileChecks.css.name} found`)
          return content
        }),
      cssPaths.map((p) => path.join(cwd, p)) as [string, ...Array<string>]
    ).pipe(Effect.catchAll(() => Effect.fail(new FileNotFoundError({ file: "CSS", message: "CSS file not found" }))))

    for (const include of REQUIREMENTS.customFileChecks.css.includes) {
      if (include.content.every((str) => cssContent.includes(str))) {
        yield* Effect.logDebug(`✅ ${REQUIREMENTS.customFileChecks.css.name} has ${include.content.join(", ")}`)
        continue
      }
      missingIncludes.push({ ...include, fileName: REQUIREMENTS.customFileChecks.css.name })
    }

    // Check NativeWind env file
    if (componentJson.tsx !== false) {
      const nativewindEnvContent = yield* fs.readFileString(path.join(cwd, NATIVEWIND_ENV_FILE)).pipe(
        Effect.catchAll(() => {
          missingFiles.push(REQUIREMENTS.customFileChecks.nativewindEnv)
          return Effect.succeed(null)
        })
      )

      if (nativewindEnvContent) {
        for (const include of REQUIREMENTS.customFileChecks.nativewindEnv.includes) {
          if (include.content.every((str) => nativewindEnvContent.includes(str))) {
            yield* Effect.logDebug(
              `✅ ${REQUIREMENTS.customFileChecks.nativewindEnv.name} has ${include.content.join(", ")}`
            )
            continue
          }
          missingIncludes.push({ ...include, fileName: REQUIREMENTS.customFileChecks.nativewindEnv.name })
        }
      }
    }

    // Check Tailwind config
    const tailwindConfigPaths = [componentJson.tailwind.config, "tailwind.config.js", "tailwind.config.ts"].filter(
      (p) => p != null
    )
    const tailwindConfigContent = yield* retryWith(
      (filePath: string) =>
        Effect.gen(function* () {
          const content = yield* fs.readFileString(filePath)
          yield* Effect.logDebug(`✅ ${REQUIREMENTS.customFileChecks.tailwindConfig.name} found`)
          return content
        }),
      tailwindConfigPaths.map((p) => path.join(cwd, p)) as [string, ...Array<string>]
    ).pipe(
      Effect.catchAll(() =>
        Effect.fail(new FileNotFoundError({ file: "Tailwind config", message: "Tailwind config not found" }))
      )
    )

    for (const include of REQUIREMENTS.customFileChecks.tailwindConfig.includes) {
      if (include.content.every((str) => tailwindConfigContent.includes(str))) {
        yield* Effect.logDebug(
          `✅ ${REQUIREMENTS.customFileChecks.tailwindConfig.name} has ${include.content.join(", ")}`
        )
        continue
      }
      missingIncludes.push({ ...include, fileName: REQUIREMENTS.customFileChecks.tailwindConfig.name })
    }

    // Check theme file
    const themeAliasPath = yield* resolvePathFromAlias(`${aliasForLib}/theme.ts`, tsConfig)
    const themeContent = yield* fs.readFileString(themeAliasPath).pipe(
      Effect.catchAll(() => {
        missingFiles.push(REQUIREMENTS.customFileChecks.theme)
        return Effect.succeed(null)
      })
    )

    if (themeContent) {
      for (const include of REQUIREMENTS.customFileChecks.theme.includes) {
        if (include.content.every((str) => themeContent.includes(str))) {
          yield* Effect.logDebug(`✅ ${REQUIREMENTS.customFileChecks.theme.name} has ${include.content.join(", ")}`)
          continue
        }
        missingIncludes.push({ ...include, fileName: REQUIREMENTS.customFileChecks.theme.name })
      }
    }

    // Check utils file
    const utilsPath = yield* resolvePathFromAlias(`${aliasForLib}/utils.ts`, tsConfig)
    const utilsContent = yield* fs.readFileString(utilsPath).pipe(
      Effect.catchAll(() => {
        missingFiles.push(REQUIREMENTS.customFileChecks.utils)
        return Effect.succeed(null)
      })
    )

    if (utilsContent) {
      for (const include of REQUIREMENTS.customFileChecks.utils.includes) {
        if (include.content.every((str) => utilsContent.includes(str))) {
          yield* Effect.logDebug(`✅ ${REQUIREMENTS.customFileChecks.utils.name} has ${include.content.join(", ")}`)
          continue
        }
        missingIncludes.push({ ...include, fileName: REQUIREMENTS.customFileChecks.utils.name })
      }
    }

    return { missingFiles, missingIncludes }
  })

export { checkCustomFiles }
