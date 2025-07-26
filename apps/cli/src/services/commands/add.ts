import { Effect, Layer, pipe, Schema } from "effect"
import { CliOptions } from "@cli/contexts/cli-options.js"
import { Doctor } from "@cli/services/commands/doctor.js"
import { ProjectConfig } from "../project-config.js"
import { Prompt } from "@effect/cli"
import { PROJECT_MANIFEST } from "@cli/project-manifest.js"
import { runCommand } from "@cli/utils/run-command.js"

type AddOptions = {
  cwd: string
  args: { components: Array<string> }
  yes: boolean
  overwrite: boolean
  all: boolean
  path: string
}

class Add extends Effect.Service<Add>()("Add", {
  effect: Effect.gen(function* () {
    const doctor = yield* Doctor
    const projectConfig = yield* ProjectConfig

    return {
      run: (options: AddOptions) =>
        Effect.gen(function* () {
          yield* Effect.logDebug(`Add options: ${JSON.stringify(options, null, 2)}`)

          const componentJson = yield* projectConfig.getComponentJson()
          const style = yield* pipe(
            componentJson.style,
            Schema.decodeUnknown(Schema.Union(Schema.Literal("default"), Schema.Literal("new-york")))
          )

          const components = options.all ? PROJECT_MANIFEST.components : (options.args?.components ?? [])

          if (components.length === 0) {
            const selectedComponents = yield* Prompt.multiSelect({
              message: "Select components to add",
              choices: PROJECT_MANIFEST.components.map((component) => ({
                title: component,
                value: component
              }))
            })
            for (const component of selectedComponents) {
              components.push(component)
            }
          }

          if (components.length === 0) {
            yield* Effect.fail(new Error("No components selected."))
          }

          yield* Effect.logDebug(`Selected components: ${components.join(", ")}`)

          const baseUrl =
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/local/r"
              : "https://reactnativereusables.com/r"

          const componentUrls = components.map((component) => `${baseUrl}/${style}/${component}.json`)

          const shadcnOptions = toShadcnOptions(options)

          const commandArgs = ["shadcn@latest", "add", ...shadcnOptions, ...componentUrls]

          yield* Effect.logDebug(`Running command: npx ${commandArgs.join(" ")}`)

          yield* runCommand("npx", commandArgs, {
            cwd: options.cwd,
            stdio: "inherit"
          })

          yield* doctor.run({ ...options, summary: true })
        })
    }
  })
}) {}

function make(options: AddOptions) {
  const optionsLayer = Layer.succeed(CliOptions, { ...options, yes: true }) // For the project config
  return Effect.gen(function* () {
    const add = yield* Add

    return yield* add.run(options)
  }).pipe(
    Effect.provide(Add.Default),
    Effect.provide(Doctor.Default),
    Effect.provide(ProjectConfig.Default),
    Effect.provide(optionsLayer)
  )
}

export { make }

function toShadcnOptions(options: AddOptions) {
  const shadcnOptions = []

  if (options.overwrite) {
    shadcnOptions.push("--overwrite")
  }

  if (options.yes) {
    shadcnOptions.push("--yes")
  }

  if (options.path) {
    shadcnOptions.push("--path")
    shadcnOptions.push(options.path)
  }

  return shadcnOptions
}
