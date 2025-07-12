import { FileNotFoundError, loadTsConfig, parseJson } from "@cli/commands/doctor/utils.js"
import { componentJsonSchema } from "@cli/schemas/component-json-schema.js"
import { packageJsonSchema } from "@cli/schemas/package-schema.js"
import { Prompt } from "@effect/cli"
import { FileSystem, Path } from "@effect/platform"
import { Effect, Schema } from "effect"

const loadProjectConfig = (cwd: string, fix: boolean) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path

    const [componentJson, packageJson, tsConfig] = yield* Effect.all(
      [
        fs.readFileString(path.join(cwd, "components.json")).pipe(
          Effect.flatMap(parseJson),
          Effect.flatMap(Schema.decodeUnknown(componentJsonSchema)),
          Effect.catchTags({
            ParseJsonError: (error) => Effect.fail(error),
            ParseError: () => handleInvalidComponentJson(cwd, fix)
          })
        ),
        fs.readFileString(path.join(cwd, "package.json")).pipe(
          Effect.flatMap(parseJson),
          Effect.flatMap(Schema.decodeUnknown(packageJsonSchema)),
          Effect.catchAll((error) =>
            Effect.fail(new FileNotFoundError({ file: "package.json", message: String(error) }))
          )
        ),
        loadTsConfig(cwd)
      ],
      { concurrency: "unbounded" }
    )

    return { componentJson, packageJson, tsConfig }
  })

export { loadProjectConfig }

const handleInvalidComponentJson = (cwd: string, fix: boolean) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path

    const componentJsonExists = yield* fs.exists(path.join(cwd, "components.json"))
    yield* Effect.log("An invalid components.json file was found.")

    const shouldCreateComponentJson = fix
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
      return yield* Effect.fail(new FileNotFoundError({ file: "components.json" }))
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
