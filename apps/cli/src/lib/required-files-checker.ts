import { CliOptions } from "@cli/cli-options.js"
import { ProjectConfig } from "@cli/lib/project-config.js"
import { NATIVEWIND_ENV_FILE } from "@cli/project-manifest.js"
import { FileSystem, Path } from "@effect/platform"
import { Data, Effect } from "effect"
import type { CustomFileCheck, FileCheck, FileWithContent, MissingInclude } from "../project-manifest.js"
import { resolvePathFromAlias, retryWith } from "../utils.js"
import logSymbols from "log-symbols"

class RequiredFileError extends Data.TaggedError("RequiredFileError")<{
  file: string
  message?: string
}> {}

class RequiredFilesChecker extends Effect.Service<RequiredFilesChecker>()("RequiredFilesChecker", {
  dependencies: [ProjectConfig.Default],
  effect: Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path
    const options = yield* CliOptions
    const projectConfig = yield* ProjectConfig
    const tsConfig = yield* projectConfig.getTsConfig()

    const checkFiles = (fileChecks: Array<FileCheck>) =>
      Effect.gen(function* () {
        const missingFiles: Array<FileCheck> = []
        const missingIncludes: Array<MissingInclude> = []

        const filesWithContent = yield* Effect.forEach(
          fileChecks,
          (file) =>
            retryWith(
              (filePath: string) =>
                Effect.gen(function* () {
                  const fileContents = yield* fs.readFileString(filePath)
                  yield* Effect.logDebug(`${logSymbols.success} ${file.name} found`)
                  return { ...file, content: fileContents } as FileWithContent
                }),
              file.fileNames.map((p) => path.join(options.cwd, p)) as [string, ...Array<string>]
            ).pipe(
              Effect.catchAll(() => {
                missingFiles.push(file)
                return Effect.succeed(null)
              })
            ),
          { concurrency: "unbounded" }
        ).pipe(Effect.map((files) => files.filter((file): file is FileWithContent => file !== null)))

        yield* Effect.forEach(filesWithContent, (file) =>
          Effect.gen(function* () {
            const { content, includes, name } = file
            for (const include of includes) {
              if (include.content.every((str) => content.includes(str))) {
                yield* Effect.logDebug(`${logSymbols.success} ${name} has ${include.content.join(", ")}`)
                continue
              }
              missingIncludes.push({ ...include, fileName: name })
            }
          })
        )

        return { missingFiles, missingIncludes }
      })

    const checkDeprecatedFiles = (deprecatedFromLib: Array<string>) =>
      Effect.gen(function* () {
        const componentJson = yield* projectConfig.getComponentJson()
        const aliasForLib = componentJson.aliases.lib ?? `${componentJson.aliases.utils}/lib`

        const existingDeprecatedFromLibs = yield* Effect.forEach(
          deprecatedFromLib,
          (filePath) =>
            resolvePathFromAlias(`${aliasForLib}/${filePath}`, tsConfig).pipe(
              Effect.flatMap((fullPath) =>
                Effect.gen(function* () {
                  const exists = yield* fs.exists(fullPath)
                  if (!exists) {
                    yield* Effect.logDebug(`${logSymbols.success} deprecated lib/${filePath} not found`)
                  }
                  return { file: `${aliasForLib}/${filePath}`, exists }
                })
              )
            ),
          { concurrency: "unbounded" }
        ).pipe(Effect.map((results) => results.filter((result) => result.exists)))

        return existingDeprecatedFromLibs
      })

    const checkCustomFiles = (customFileChecks: Record<string, CustomFileCheck>) =>
      Effect.gen(function* () {
        const componentJson = yield* projectConfig.getComponentJson()
        const aliasForLib = componentJson.aliases.lib ?? `${componentJson.aliases.utils}/lib`
        const missingFiles: Array<CustomFileCheck> = []
        const missingIncludes: Array<MissingInclude> = []

        // Check CSS files
        const cssPaths = [componentJson.tailwind.css, "global.css", "src/global.css"].filter((p) => p != null)
        const cssContent = yield* retryWith(
          (filePath: string) =>
            Effect.gen(function* () {
              const content = yield* fs.readFileString(filePath)
              yield* Effect.logDebug(`${logSymbols.success} ${customFileChecks.css.name} found`)
              return content
            }),
          cssPaths.map((p) => path.join(options.cwd, p)) as [string, ...Array<string>]
        ).pipe(
          Effect.catchAll(() => Effect.fail(new RequiredFileError({ file: "CSS", message: "CSS file not found" })))
        )

        for (const include of customFileChecks.css.includes) {
          if (include.content.every((str) => cssContent.includes(str))) {
            yield* Effect.logDebug(
              `${logSymbols.success} ${customFileChecks.css.name} has ${include.content.join(", ")}`
            )
            continue
          }
          missingIncludes.push({ ...include, fileName: customFileChecks.css.name })
        }

        // Check NativeWind env file
        if (componentJson.tsx !== false) {
          const nativewindEnvContent = yield* fs.readFileString(path.join(options.cwd, NATIVEWIND_ENV_FILE)).pipe(
            Effect.catchAll(() => {
              missingFiles.push(customFileChecks.nativewindEnv)
              return Effect.succeed(null)
            })
          )

          if (nativewindEnvContent) {
            for (const include of customFileChecks.nativewindEnv.includes) {
              if (include.content.every((str) => nativewindEnvContent.includes(str))) {
                yield* Effect.logDebug(
                  `${logSymbols.success} ${customFileChecks.nativewindEnv.name} has ${include.content.join(", ")}`
                )
                continue
              }
              missingIncludes.push({ ...include, fileName: customFileChecks.nativewindEnv.name })
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
              yield* Effect.logDebug(`${logSymbols.success} ${customFileChecks.tailwindConfig.name} found`)
              return content
            }),
          tailwindConfigPaths.map((p) => path.join(options.cwd, p)) as [string, ...Array<string>]
        ).pipe(
          Effect.catchAll(() =>
            Effect.fail(new RequiredFileError({ file: "Tailwind config", message: "Tailwind config not found" }))
          )
        )

        for (const include of customFileChecks.tailwindConfig.includes) {
          if (include.content.every((str) => tailwindConfigContent.includes(str))) {
            yield* Effect.logDebug(
              `${logSymbols.success} ${customFileChecks.tailwindConfig.name} has ${include.content.join(", ")}`
            )
            continue
          }
          missingIncludes.push({ ...include, fileName: customFileChecks.tailwindConfig.name })
        }

        // Check theme file
        const themeAliasPath = yield* resolvePathFromAlias(`${aliasForLib}/theme.ts`, tsConfig)
        const themeContent = yield* fs.readFileString(themeAliasPath).pipe(
          Effect.catchAll(() => {
            missingFiles.push(customFileChecks.theme)
            return Effect.succeed(null)
          })
        )

        if (themeContent) {
          for (const include of customFileChecks.theme.includes) {
            if (include.content.every((str) => themeContent.includes(str))) {
              yield* Effect.logDebug(
                `${logSymbols.success} ${customFileChecks.theme.name} has ${include.content.join(", ")}`
              )
              continue
            }
            missingIncludes.push({ ...include, fileName: customFileChecks.theme.name })
          }
        }

        // Check utils file
        const utilsPath = yield* resolvePathFromAlias(`${aliasForLib}/utils.ts`, tsConfig)
        const utilsContent = yield* fs.readFileString(utilsPath).pipe(
          Effect.catchAll(() => {
            missingFiles.push(customFileChecks.utils)
            return Effect.succeed(null)
          })
        )

        if (utilsContent) {
          for (const include of customFileChecks.utils.includes) {
            if (include.content.every((str) => utilsContent.includes(str))) {
              yield* Effect.logDebug(
                `${logSymbols.success} ${customFileChecks.utils.name} has ${include.content.join(", ")}`
              )
              continue
            }
            missingIncludes.push({ ...include, fileName: customFileChecks.utils.name })
          }
        }

        return { missingFiles, missingIncludes }
      })

    return {
      run: ({
        customFileChecks,
        deprecatedFromLib,
        fileChecks
      }: {
        fileChecks: Array<FileCheck>
        customFileChecks: Record<string, CustomFileCheck>
        deprecatedFromLib: Array<string>
      }) =>
        Effect.gen(function* () {
          const [fileResults, customFileResults, deprecatedFileResults] = yield* Effect.all([
            checkFiles(fileChecks),
            checkCustomFiles(customFileChecks),
            checkDeprecatedFiles(deprecatedFromLib)
          ])

          return { fileResults, customFileResults, deprecatedFileResults }
        })
    }
  })
}) {}

export { RequiredFilesChecker }
