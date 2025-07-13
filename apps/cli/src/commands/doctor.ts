import { CliOptions } from "@cli/cli-options.js"
import { PROJECT_MANIFEST } from "@cli/project-manifest.js"
import { RequiredFilesChecker } from "@cli/lib/required-files-checker.js"
import { Prompt } from "@effect/cli"
import { FileSystem, Path } from "@effect/platform"
import { Data, Effect, Layer, Schema } from "effect"

const packageJsonSchema = Schema.Struct({
  dependencies: Schema.Record({ key: Schema.String, value: Schema.String }),
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
          return yield* Effect.fail(new PackageJsonError({ message: "package.json not found" }))
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
            return yield* Effect.fail(new Error("Expo is not installed"))
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

          const sallgoodman =
            result.missingFiles.length +
              result.missingIncludes.length +
              result.deprecatedFileResults.length +
              uninstalledDependencies.length +
              uninstalledDevDependencies.length ===
            0

          if (sallgoodman) {
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

          const numOfMissingFiles = result.missingFiles.length
          const numOfMissingIncludes = result.missingIncludes.length
          const numOfExistingDeprecatedFromLibs = result.deprecatedFileResults.length
          const numOfUninstalledDependencies = result.uninstalledDependencies.length
          const numOfUninstalledDevDependencies = result.uninstalledDevDependencies.length

          if (options.quiet) {
            const thing = [
              numOfMissingFiles > 0 ? `Missing ${numOfMissingFiles} file${numOfMissingFiles > 1 ? "s" : ""}` : "",
              numOfMissingIncludes > 0
                ? `Missing ${numOfMissingIncludes} include${numOfMissingIncludes > 1 ? "s" : ""}`
                : "",
              numOfExistingDeprecatedFromLibs > 0
                ? `Existing ${numOfExistingDeprecatedFromLibs} deprecated file${
                    numOfExistingDeprecatedFromLibs > 1 ? "s" : ""
                  }`
                : "",
              numOfUninstalledDependencies > 0
                ? `Uninstalled ${numOfUninstalledDependencies} dependency${numOfUninstalledDependencies > 1 ? "s" : ""}`
                : "",
              numOfUninstalledDevDependencies > 0
                ? `Uninstalled ${numOfUninstalledDevDependencies} dev dependency${
                    numOfUninstalledDevDependencies > 1 ? "s" : ""
                  }`
                : ""
            ].filter(Boolean)
            yield* Effect.logWarning(`${thing.join(", ")}`)
            return yield* Effect.succeed(true)
          }
          //TODO: detailed output
          if (numOfMissingFiles - createdFiles > 0) {
            yield* Effect.forEach(result.missingFiles, (file) =>
              Effect.gen(function* () {
                yield* Effect.logWarning(`⚠️ ${file.name} file is missing. You should create it.`)
                yield* Effect.log(`For more information, see ${file.docs}`)
              })
            )
          }
          if (numOfMissingIncludes > 0) {
            yield* Effect.forEach(result.missingIncludes, (include) =>
              Effect.gen(function* () {
                yield* Effect.logWarning(`⚠️ ${include.fileName} include is missing. You should create it.`)
                yield* Effect.log(`For more information, see ${include.docs}`)
              })
            )
          }
          if (numOfExistingDeprecatedFromLibs > 0) {
            yield* Effect.forEach(result.deprecatedFileResults, (file) =>
              Effect.gen(function* () {
                yield* Effect.logWarning(`⚠️ ${file.file} is deprecated. You should remove it.`)
              })
            )
          }
          if (numOfUninstalledDependencies > 0) {
            yield* Effect.forEach(result.uninstalledDependencies, (dependency) =>
              Effect.gen(function* () {
                yield* Effect.logWarning(`⚠️ ${dependency} dependency is uninstalled. You should install it.`)
              })
            )
          }
          if (numOfUninstalledDevDependencies > 0) {
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
