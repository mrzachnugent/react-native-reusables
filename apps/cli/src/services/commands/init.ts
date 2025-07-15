import { CliOptions } from "@cli/contexts/cli-options.js"
import { Doctor } from "@cli/services/commands/doctor.js"
import { Template } from "@cli/services/template.js"
import { Prompt } from "@effect/cli"
import { FileSystem, Path } from "@effect/platform"
import { Effect, Layer } from "effect"
import { ProjectConfig } from "../project-config.js"

type InitOptions = {
  cwd: string
}

class Init extends Effect.Service<Init>()("Init", {
  dependencies: [Template.Default],
  effect: Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path
    const doctor = yield* Doctor
    const template = yield* Template

    return {
      run: (options: InitOptions) =>
        Effect.gen(function* () {
          yield* Effect.logDebug(`Init options: ${JSON.stringify(options, null, 2)}`)

          const packageJsonExists = yield* fs.exists(path.join(options.cwd, "package.json"))

          yield* Effect.logDebug(`Does package.json exist: ${packageJsonExists ? "yes" : "no"}`)

          if (packageJsonExists) {
            const choice = yield* Prompt.select({
              message: "A project already exists in this directory. What would you like to do?",
              choices: [
                { title: "Start fresh by initializing a new project", value: "init-new" },
                { title: "Run the doctor command to inspect and fix setup issues", value: "doctor" },
                { title: "Cancel and exit", value: "cancel" }
              ]
            })
            yield* Effect.logDebug(`Init choice: ${choice}`)
            if (choice === "cancel") {
              return Effect.succeed(true)
            }
            if (choice === "doctor") {
              return yield* doctor.run({ ...options, summary: true, yes: false })
            }
          }

          const projectName = yield* Prompt.text({
            message: "What is the name of your project? (e.g. my-app)",
            default: "my-app"
          })

          yield* template.clone({
            cwd: options.cwd,
            name: projectName,
            repo: {
              url: "https://github.com/mrzachnugent/react-native-reusables.git",
              subPath: "packages/templates/starter-base"
            }
          })
        })
    }
  })
}) {}

function make(options: InitOptions) {
  const optionsLayer = Layer.succeed(CliOptions, { ...options, yes: true })
  return Effect.gen(function* () {
    const init = yield* Init

    return yield* init.run(options)
  }).pipe(
    Effect.provide(Init.Default),
    Effect.provide(Doctor.Default),
    Effect.provide(ProjectConfig.Default),
    Effect.provide(optionsLayer)
  )
}

export { make }
