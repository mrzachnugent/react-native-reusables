import { CliOptions } from "@cli/cli-options.js"
import { PROJECT_MANIFEST } from "@cli/project-manifest.js"
import { RequiredFilesChecker } from "@cli/lib/required-files-checker.js"
import { Prompt } from "@effect/cli"
import { FileSystem, Path } from "@effect/platform"
import { Data, Effect, Layer, Schema } from "effect"

const packageJsonSchema = Schema.Struct({
  dependencies: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
  devDependencies: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String }))
})

class PackageJsonError extends Data.TaggedError("PackageJsonError")<{
  cause?: unknown
  message?: string
}> {}

type DoctorOptions = {
  cwd: string
  quiet: boolean
  essentials: boolean
  fix: boolean
}

class Doctor extends Effect.Service<Doctor>()("Doctor", {
  dependencies: [RequiredFilesChecker.Default],
  effect: Effect.gen(function* () {
    const options = yield* CliOptions
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path
    const requiredFileChecker = yield* RequiredFilesChecker

    const getPackageJson = () =>
      Effect.gen(function* () {
        const packageJsonExists = yield* fs.exists(path.join(options.cwd, "package.json"))
        if (!packageJsonExists) {
          return yield* Effect.fail(new PackageJsonError({ message: "A package.json was not found and is required." }))
        }

        return yield* fs.readFileString(path.join(options.cwd, "package.json")).pipe(
          Effect.flatMap(Schema.decodeUnknown(Schema.parseJson())),
          Effect.flatMap(Schema.decodeUnknown(packageJsonSchema)),
          Effect.catchTags({
            ParseError: () => Effect.fail(new PackageJsonError({ message: "Failed to parse package.json" }))
          })
        )
      })

    const checkRequiredDependencies = ({
      dependencies,
      devDependencies
    }: {
      dependencies: Array<string>
      devDependencies: Array<string>
    }) =>
      Effect.gen(function* () {
        const packageJson = yield* getPackageJson()
        const uninstalledDependencies: Array<string> = []
        const uninstalledDevDependencies: Array<string> = []

        for (const dependency of dependencies) {
          if (!packageJson.dependencies?.[dependency]) {
            uninstalledDependencies.push(dependency)
            continue
          }
          yield* Effect.logDebug(`✅ ${dependency}@${packageJson.dependencies[dependency]} is installed`)
        }

        for (const devDependency of devDependencies) {
          if (!packageJson.devDependencies?.[devDependency] && !packageJson.dependencies?.[devDependency]) {
            uninstalledDevDependencies.push(devDependency)
            continue
          }
          yield* Effect.logDebug(`✅ ${devDependency}@${packageJson.devDependencies?.[devDependency]} is installed`)
        }

        return { uninstalledDependencies, uninstalledDevDependencies }
      })

    return {
      run: (options: DoctorOptions) =>
        Effect.gen(function* () {
          const { uninstalledDependencies, uninstalledDevDependencies } = yield* checkRequiredDependencies({
            dependencies: PROJECT_MANIFEST.dependencies,
            devDependencies: PROJECT_MANIFEST.devDependencies
          })

          if (uninstalledDependencies.includes("expo")) {
            return yield* Effect.fail(new Error("Expo is not installed and is required for the CLI to work."))
          }

          const { customFileResults, deprecatedFileResults, fileResults } = yield* requiredFileChecker.run({
            customFileChecks: PROJECT_MANIFEST.customFileChecks,
            deprecatedFromLib: PROJECT_MANIFEST.deprecatedFromLib,
            fileChecks: PROJECT_MANIFEST.fileChecks
          })

          // Parse the results

          const result = {
            missingFiles: [...fileResults.missingFiles, ...customFileResults.missingFiles],
            uninstalledDependencies,
            uninstalledDevDependencies,
            missingIncludes: [...fileResults.missingIncludes, ...customFileResults.missingIncludes],
            deprecatedFileResults
          }

          yield* Effect.logDebug("Doctor Results:", JSON.stringify(result, null, 2))

          const counts = {
            missingFiles: result.missingFiles.length,
            missingIncludes: result.missingIncludes.length,
            deprecatedFileResults: result.deprecatedFileResults.length,
            uninstalledDependencies: result.uninstalledDependencies.length,
            uninstalledDevDependencies: result.uninstalledDevDependencies.length
          }

          const totalCount = Object.values(counts).reduce((acc, count) => acc + count, 0)

          if (totalCount === 0) {
            yield* Effect.log("Everything looks good!")
            return yield* Effect.succeed(true)
          }

          let createdFiles = 0
          for (const missingFile of result.missingFiles) {
            const prompt = options.fix
              ? true
              : yield* Prompt.confirm({
                  message: `The ${missingFile.name} file is missing. Do you want to create it?`,
                  initial: true
                })

            if (prompt) {
              createdFiles++
              yield* Effect.logDebug(`Creating ${missingFile.name} file`)
            }
          }

          if (options.quiet) {
            const thing = [
              counts.missingFiles > 0
                ? `Missing ${counts.missingFiles} file${counts.missingFiles > 1 ? "s" : ""} (${result.missingFiles
                    .map((f) => f.name)
                    .join(", ")})`
                : "",
              counts.missingIncludes > 0
                ? `Missing ${counts.missingIncludes} include${counts.missingIncludes > 1 ? "s" : ""}`
                : "",
              counts.deprecatedFileResults > 0
                ? `Existing ${counts.deprecatedFileResults} deprecated file${
                    counts.deprecatedFileResults > 1 ? "s" : ""
                  }`
                : "",
              counts.uninstalledDependencies > 0
                ? `Uninstalled ${counts.uninstalledDependencies} dependency${
                    counts.uninstalledDependencies > 1 ? "s" : ""
                  }`
                : "",
              counts.uninstalledDevDependencies > 0
                ? `Uninstalled ${counts.uninstalledDevDependencies} dev dependency${
                    counts.uninstalledDevDependencies > 1 ? "s" : ""
                  }`
                : ""
            ].filter(Boolean)
            yield* Effect.logWarning(`${thing.join(", ")}`)
            return yield* Effect.succeed(true)
          }
          //TODO: detailed output
          if (counts.missingFiles - createdFiles > 0) {
            yield* Effect.forEach(result.missingFiles, (file) =>
              Effect.gen(function* () {
                yield* Effect.logWarning(`⚠️ ${file.name} file is missing. You should create it.`)
                yield* Effect.log(`For more information, see ${file.docs}`)
              })
            )
          }
          if (counts.missingIncludes > 0) {
            yield* Effect.forEach(result.missingIncludes, (include) =>
              Effect.gen(function* () {
                yield* Effect.logWarning(`⚠️ ${include.fileName} include is missing. You should create it.`)
                yield* Effect.log(`For more information, see ${include.docs}`)
              })
            )
          }
          if (counts.deprecatedFileResults > 0) {
            yield* Effect.forEach(result.deprecatedFileResults, (file) =>
              Effect.gen(function* () {
                yield* Effect.logWarning(`⚠️ ${file.file} is deprecated. You should remove it.`)
              })
            )
          }
          if (counts.uninstalledDependencies > 0) {
            yield* Effect.forEach(result.uninstalledDependencies, (dependency) =>
              Effect.gen(function* () {
                yield* Effect.logWarning(`⚠️ ${dependency} dependency is uninstalled. You should install it.`)
              })
            )
          }
          if (counts.uninstalledDevDependencies > 0) {
            yield* Effect.forEach(result.uninstalledDevDependencies, (dependency) =>
              Effect.gen(function* () {
                yield* Effect.logWarning(`⚠️ ${dependency} dev dependency is uninstalled. You should install it.`)
              })
            )
          }
        })
    }
  })
}) {}

function make(options: DoctorOptions) {
  const optionsLayer = Layer.succeed(CliOptions, options)
  return Effect.gen(function* () {
    const doctor = yield* Doctor
    return yield* doctor.run(options)
  }).pipe(Effect.provide(Doctor.Default), Effect.provide(optionsLayer))
}

export { Doctor, make }
