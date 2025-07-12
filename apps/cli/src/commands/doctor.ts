import { PROJECT_MANIFEST } from "@cli/project-manifest.js"
import { PackageJson } from "@cli/package-json.js"
import { ProjectConfig } from "@cli/project-config.js"
import { RequiredFilesChecker } from "@cli/required-file-checker.js"
import { Command, Options, Prompt } from "@effect/cli"
import { Effect } from "effect"

type DoctorOptions = {
  cwd: string
  quiet: boolean
  essentials: boolean
  fix: boolean
}

const { dependencies, devDependencies } = PROJECT_MANIFEST

class Doctor extends Effect.Service<Doctor>()("Doctor", {
  dependencies: [ProjectConfig.Default, PackageJson.Default, RequiredFilesChecker.Default],
  effect: Effect.gen(function* () {
    const projectConfig = yield* ProjectConfig
    const packageJson = yield* PackageJson
    const requiredFileChecker = yield* RequiredFilesChecker

    return {
      run: (options: DoctorOptions) =>
        Effect.gen(function* () {
          yield* projectConfig.checkComponentJson()

          const { uninstalledDependencies, uninstalledDevDependencies } = yield* packageJson.checkRequiredDependencies({
            dependencies,
            devDependencies
          })

          if (uninstalledDependencies.includes("expo")) {
            return yield* Effect.fail(new Error("Expo is not installed"))
          }

          const { customFileResults, deprecatedFileResults, fileResults } = yield* requiredFileChecker.run()

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

function doctorCommandHandler(options: DoctorOptions) {
  return Effect.gen(function* () {
    const doctor = yield* Doctor
    return yield* doctor.run(options)
  }).pipe(Effect.provide(Doctor.Default))
}

const cwd = Options.directory("cwd", { exists: "yes" }).pipe(Options.withDefault("."), Options.withAlias("c"))
const quiet = Options.boolean("quiet", { aliases: ["q"] })
const essentials = Options.boolean("essentials", { aliases: ["e"] })
const fix = Options.boolean("fix", { aliases: ["f"] })

const DoctorCommand = Command.make("doctor", { cwd, quiet, essentials, fix })
  .pipe(Command.withDescription("Check your project setup and diagnose issues"))
  .pipe(Command.withHandler(doctorCommandHandler))

export { DoctorCommand, doctorCommandHandler, Doctor }
