import { CliOptions } from "@cli/contexts/cli-options.js"
import { type CustomFileCheck, type FileCheck, type MissingInclude, PROJECT_MANIFEST } from "@cli/project-manifest.js"
import { ProjectConfig } from "@cli/services/project-config.js"
import { RequiredFilesChecker } from "@cli/services/required-files-checker.js"
import { runCommand } from "@cli/utils/run-command.js"
import { Prompt } from "@effect/cli"
import { FileSystem, Path } from "@effect/platform"
import { Data, Effect, Layer, Schema } from "effect"
import logSymbols from "log-symbols"

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

    const checkRequiredDependencies = ({
      dependencies,
      devDependencies
    }: {
      dependencies: Array<string>
      devDependencies: Array<string>
    }) =>
      Effect.gen(function* () {
        const packageJsonExists = yield* fs.exists(path.join(options.cwd, "package.json"))
        if (!packageJsonExists) {
          return yield* Effect.fail(new PackageJsonError({ message: "A package.json was not found and is required." }))
        }

        const packageJson = yield* fs.readFileString(path.join(options.cwd, "package.json")).pipe(
          Effect.flatMap(Schema.decodeUnknown(Schema.parseJson())),
          Effect.flatMap(Schema.decodeUnknown(packageJsonSchema)),
          Effect.catchTags({
            ParseError: () => Effect.fail(new PackageJsonError({ message: "Failed to parse package.json" }))
          })
        )

        const uninstalledDependencies: Array<string> = []
        const uninstalledDevDependencies: Array<string> = []

        for (const dependency of dependencies) {
          if (!packageJson.dependencies?.[dependency]) {
            uninstalledDependencies.push(dependency)
            continue
          }
          yield* Effect.logDebug(
            `${logSymbols.success} ${dependency}@${packageJson.dependencies[dependency]} is installed`
          )
        }

        for (const devDependency of devDependencies) {
          if (!packageJson.devDependencies?.[devDependency] && !packageJson.dependencies?.[devDependency]) {
            uninstalledDevDependencies.push(devDependency)
            continue
          }
          yield* Effect.logDebug(
            `${logSymbols.success} ${devDependency}@${packageJson.devDependencies?.[devDependency]} is installed`
          )
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
            return yield* Effect.fail(new Error("Expo is not installed. This CLI cannot run without it."))
          }

          const { customFileResults, deprecatedFileResults, fileResults } = yield* requiredFileChecker.run({
            customFileChecks: PROJECT_MANIFEST.customFileChecks,
            deprecatedFromLib: PROJECT_MANIFEST.deprecatedFromLib,
            fileChecks: PROJECT_MANIFEST.fileChecks
          })

          const result = {
            missingFiles: [...fileResults.missingFiles, ...customFileResults.missingFiles],
            uninstalledDependencies,
            uninstalledDevDependencies,
            missingIncludes: [...fileResults.missingIncludes, ...customFileResults.missingIncludes],
            deprecatedFileResults
          }

          let total = Object.values(result).reduce((sum, cat) => sum + cat.length, 0)
          if (!options.quiet) {
            for (const missingFile of result.missingFiles) {
              const prompt = options.fix
                ? true
                : yield* Prompt.confirm({
                    message: `${logSymbols.warning} The ${missingFile.name} file is missing. Do you want to create it?`,
                    initial: true
                  })

              if (prompt) {
                total--
                result.missingFiles = result.missingFiles.filter((f) => f.name !== missingFile.name)
                yield* Effect.logDebug(`Creating ${missingFile.name} file`)
              }
            }

            const dependenciesToInstall: Array<string> = []
            for (const dep of result.uninstalledDependencies) {
              const prompt = options.fix
                ? true
                : yield* Prompt.confirm({
                    message: `The ${dep} dependency is missing. Do you want to install it?`,
                    initial: true
                  })
              if (prompt) {
                total--
                yield* Effect.logDebug(`Adding ${dep} to dependencies to install`)
                dependenciesToInstall.push(dep)
                result.uninstalledDependencies = result.uninstalledDependencies.filter((d) => d !== dep)
              }
            }

            if (dependenciesToInstall.length > 0) {
              yield* Effect.logDebug(`Installing ${dependenciesToInstall.join(", ")}`)
              if (process.env.NODE_ENV !== "development") {
                yield* runCommand("npx", ["expo", "install", ...dependenciesToInstall], { cwd: options.cwd })
              }
            }

            const devDependenciesToInstall: Array<string> = []
            for (const dep of result.uninstalledDevDependencies) {
              const prompt = options.fix
                ? true
                : yield* Prompt.confirm({
                    message: `The ${dep} dependency is missing. Do you want to install it?`,
                    initial: true
                  })
              if (prompt) {
                total--
                yield* Effect.logDebug(`Adding ${dep} to devDependencies to install`)
                devDependenciesToInstall.push(dep)
                result.uninstalledDevDependencies = result.uninstalledDevDependencies.filter((d) => d !== dep)
              }
            }

            if (devDependenciesToInstall.length > 0) {
              yield* Effect.logDebug(`Installing ${devDependenciesToInstall.join(", ")}`)
              if (process.env.NODE_ENV !== "development") {
                yield* runCommand("npx", ["expo", "install", ...devDependenciesToInstall], { cwd: options.cwd })
              }
            }

            if (total === 0) {
              yield* Effect.log(`${logSymbols.success} No issues detected.`)
              return yield* Effect.succeed(true)
            }
          }

          const analysis = analyzeResult(result)
          if (options.quiet) {
            console.log(
              `${logSymbols.warning} ${total} Potential issue${
                total > 1 ? "s" : ""
              } found. For more info, run \`npx @react-native-reusables/cli doctor\``
            )
          } else {
            yield* Effect.log("\n\n🔎 Diagnosis")
            for (const item of analysis) {
              console.group(`\n${item.title}`)
              item.logs.forEach((line) => console.log(line))
              console.groupEnd()
            }
            console.log(`\n`)
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
  }).pipe(Effect.provide(Doctor.Default), Effect.provide(ProjectConfig.Default), Effect.provide(optionsLayer))
}

export { Doctor, make }

interface Result {
  missingFiles: Array<FileCheck | CustomFileCheck>
  missingIncludes: Array<MissingInclude>
  uninstalledDependencies: Array<string>
  uninstalledDevDependencies: Array<string>
  deprecatedFileResults: Array<Omit<FileCheck, "docs">>
}

function analyzeResult(result: Result) {
  const categories: Array<{ title: string; logs: Array<string>; count: number }> = []

  if (result.missingFiles.length > 0) {
    categories.push({
      title: `${logSymbols.error} Missing Files (${result.missingFiles.length})`,
      count: result.missingFiles.length,
      logs: result.missingFiles.flatMap((f) => [`• ${f.name}`, `  📘 Docs: ${f.docs}`])
    })
  }

  if (result.missingIncludes.length > 0) {
    categories.push({
      title: `${logSymbols.error} Potentially Misconfigured Files (${result.missingIncludes.length})`,
      count: result.missingIncludes.length,
      logs: result.missingIncludes.flatMap((inc) => [
        `• ${inc.fileName}`,
        `  ↪ ${inc.message}`,
        `  📘 Docs: ${inc.docs}`
      ])
    })
  }

  if (result.uninstalledDependencies.length > 0) {
    categories.push({
      title: `${logSymbols.error} Missing Dependencies (${result.uninstalledDependencies.length})`,
      count: result.uninstalledDependencies.length,
      logs: ["• Install with:", `  ↪ npx expo install ${result.uninstalledDependencies.join(" ")}`]
    })
  }

  if (result.uninstalledDevDependencies.length > 0) {
    categories.push({
      title: `${logSymbols.error} Missing Dev Dependencies (${result.uninstalledDevDependencies.length})`,
      count: result.uninstalledDevDependencies.length,
      logs: ["• Install with:", `  ↪ npx expo install -- -D ${result.uninstalledDevDependencies.join(" ")}`]
    })
  }

  if (result.deprecatedFileResults.length > 0) {
    categories.push({
      title: `${logSymbols.warning} Deprecated (${result.deprecatedFileResults.length})`,
      count: result.deprecatedFileResults.length,
      logs: result.deprecatedFileResults.flatMap((deprecatedFile) => [
        `• ${deprecatedFile.name}`,
        ...deprecatedFile.includes.map((item) => `  ↪ ${item.message}\n  📘 Docs: ${item.docs}`)
      ])
    })
  }

  return categories
}
