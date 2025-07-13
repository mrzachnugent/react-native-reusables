import { CliOptions } from "@cli/cli-options.js"
import { Prompt } from "@effect/cli"
import { FileSystem, Path } from "@effect/platform"
import { Data, Effect, Schema } from "effect"
import { loadConfig as loadTypscriptConfig } from "tsconfig-paths"

export const componentJsonSchema = Schema.Struct({
  $schema: Schema.optional(Schema.String),
  style: Schema.String,
  rsc: Schema.Boolean,
  tsx: Schema.Boolean,
  tailwind: Schema.Struct({
    config: Schema.optional(Schema.String),
    css: Schema.String,
    baseColor: Schema.String,
    cssVariables: Schema.Boolean,
    prefix: Schema.optional(Schema.String)
  }),
  aliases: Schema.Struct({
    components: Schema.String,
    utils: Schema.String,
    ui: Schema.optional(Schema.String),
    lib: Schema.optional(Schema.String),
    hooks: Schema.optional(Schema.String)
  }),
  iconLibrary: Schema.optional(Schema.String)
})

class TsConfigError extends Data.TaggedError("TsConfigError")<{
  cause?: string
  message?: string
}> {}

class ProjectConfig extends Effect.Service<ProjectConfig>()("ProjectConfig", {
  effect: Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path
    const options = yield* CliOptions

    const handleInvalidComponentJson = () =>
      Effect.gen(function* () {
        const componentJsonExists = yield* fs.exists(path.join(options.cwd, "components.json"))
        yield* Effect.log("An invalid components.json file was found.")

        const shouldCreateComponentJson = options.fix
          ? true
          : yield* Prompt.confirm({
              message: `${
                componentJsonExists ? "Do you want to fix it?" : "Do you want to create a components.json file?"
              } It is required for the CLI to work.`,
              label: { confirm: "y", deny: "n" },
              initial: true,
              placeholder: { defaultConfirm: "y/n" }
            })

        if (!shouldCreateComponentJson) {
          return yield* Effect.fail(new Error("A components.json file is required for the CLI to work."))
        }

        yield* Effect.log("Creating components.json file...")
        return yield* Schema.encode(componentJsonSchema)({
          $schema: "https://raw.githubusercontent.com/shadcn/ui/main/components.json",
          style: "default",
          aliases: {
            components: "@showcase/components",
            utils: "@showcase/utils",
            lib: "@showcase/lib"
          },
          rsc: false,
          tsx: true,
          tailwind: {
            css: "globals.css",
            baseColor: "slate",
            cssVariables: true,
            config: "tailwind.config.js"
          }
        })
      })

    return {
      getComponentJson: () =>
        Effect.gen(function* () {
          const componentJsonExists = yield* fs.exists(path.join(options.cwd, "components.json"))
          if (!componentJsonExists) {
            return yield* handleInvalidComponentJson()
          }
          return yield* fs.readFileString(path.join(options.cwd, "components.json")).pipe(
            Effect.flatMap(Schema.decodeUnknown(Schema.parseJson())),
            Effect.flatMap(Schema.decodeUnknown(componentJsonSchema)),
            Effect.catchTags({
              ParseError: handleInvalidComponentJson
            })
          )
        }),
      getTsConfig: () =>
        Effect.try({
          try: () => {
            const configResult = loadTypscriptConfig(options.cwd)
            if (configResult.resultType === "failed") {
              throw new Error("Error loading tsconfig.json", { cause: configResult.message })
            }
            return configResult
          },
          catch: (error) => new TsConfigError({ message: "Error loading {ts,js}config.json", cause: String(error) })
        })
    }
  })
}) {}

export { ProjectConfig }
