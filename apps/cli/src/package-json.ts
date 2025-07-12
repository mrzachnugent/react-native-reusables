import { Data, Effect, Schema } from "effect"
import { Json } from "./json.js"
import { Path, FileSystem } from "@effect/platform"

const packageJsonSchema = Schema.Struct({
  dependencies: Schema.Record({ key: Schema.String, value: Schema.String }),
  devDependencies: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String }))
})

class PackageJsonError extends Data.TaggedError("PackageJsonError")<{
  cause?: unknown
  message?: string
}> {}

class PackageJson extends Effect.Service<PackageJson>()("PackageJson", {
  dependencies: [Json.Default],
  effect: Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path
    const json = yield* Json

    const cwd = "../showcase" // TODO

    const getPackageJson = () =>
      Effect.gen(function* () {
        const packageJsonExists = yield* fs.exists(path.join(cwd, "package.json"))
        if (!packageJsonExists) {
          return yield* Effect.fail(new PackageJsonError({ message: "package.json not found" }))
        }

        return yield* fs.readFileString(path.join(cwd, "package.json")).pipe(
          Effect.flatMap(json.parse),
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
      getPackageJson,
      checkRequiredDependencies
    } as const
  })
}) {}

export { PackageJson }
