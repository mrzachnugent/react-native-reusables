import { checkCustomFiles } from "@cli/doctor/check-custom-files.js"
import { checkDependencies } from "@cli/doctor/check-dependencies.js"
import { checkDeprecatedFiles } from "@cli/doctor/check-deprecated-files.js"
import { checkFiles } from "@cli/doctor/check-files.js"
import { loadProjectConfig } from "@cli/doctor/load-project-config.js"
import { REQUIREMENTS } from "@cli/doctor/requirements.js"
import { Command, Options, Prompt } from "@effect/cli"
import { Effect } from "effect"

type DoctorOptions = {
  cwd: string
  quiet: boolean
  essentials: boolean
  fix: boolean
}

const doctorHandler = (options: DoctorOptions) =>
  Effect.gen(function* () {
    const { componentJson, packageJson, tsConfig } = yield* loadProjectConfig(options.cwd, options.fix)
    const { uninstalledDependencies, uninstalledDevDependencies } = yield* checkDependencies(packageJson)

    const aliasForLib = componentJson.aliases.lib ?? `${componentJson.aliases.utils}/lib`

    const [fileResults, customFileResults, existingDeprecatedFromLibs] = yield* Effect.all(
      [
        checkFiles(options.cwd, REQUIREMENTS.fileChecks),
        checkCustomFiles(options.cwd, componentJson, tsConfig),
        checkDeprecatedFiles(aliasForLib, tsConfig)
      ],
      { concurrency: "unbounded" }
    )

    const result = {
      missingFiles: [...fileResults.missingFiles, ...customFileResults.missingFiles],
      uninstalledDependencies,
      uninstalledDevDependencies,
      missingIncludes: [...fileResults.missingIncludes, ...customFileResults.missingIncludes],
      existingDeprecatedFromLibs
    }

    yield* Effect.logDebug("Doctor Results:", result)

    const sallgoodman =
      result.missingFiles.length +
        result.missingIncludes.length +
        result.existingDeprecatedFromLibs.length +
        uninstalledDependencies.length +
        uninstalledDevDependencies.length ===
      0

    if (sallgoodman) {
      yield* Effect.log("Everything looks good!")
      return
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
    const numOfExistingDeprecatedFromLibs = result.existingDeprecatedFromLibs.length
    const numOfUninstalledDependencies = result.uninstalledDependencies.length
    const numOfUninstalledDevDependencies = result.uninstalledDevDependencies.length

    if (options.quiet) {
      const thing = [
        numOfMissingFiles > 0 ? `Missing ${numOfMissingFiles} file${numOfMissingFiles > 1 ? "s" : ""}` : "",
        numOfMissingIncludes > 0 ? `Missing ${numOfMissingIncludes} include${numOfMissingIncludes > 1 ? "s" : ""}` : "",
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
      return
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
      yield* Effect.forEach(result.existingDeprecatedFromLibs, (file) =>
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

const cwd = Options.directory("cwd", { exists: "yes" }).pipe(Options.withDefault("."), Options.withAlias("c"))
const quiet = Options.boolean("quiet", { aliases: ["q"] })
const essentials = Options.boolean("essentials", { aliases: ["e"] })
const fix = Options.boolean("fix", { aliases: ["f"] })

const DoctorCommand = Command.make("doctor", { cwd, quiet, essentials, fix })
  .pipe(Command.withDescription("Check your project setup and diagnose issues"))
  .pipe(Command.withHandler(doctorHandler))

export { DoctorCommand, doctorHandler }
