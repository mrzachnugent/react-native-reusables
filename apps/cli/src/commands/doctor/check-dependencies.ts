import { REQUIREMENTS } from "@cli/commands/doctor/requirements.js"
import type { packageJsonSchema } from "@cli/schemas/package-schema.js"
import { Effect } from "effect"

const checkDependencies = (packageJson: typeof packageJsonSchema.Type) =>
  Effect.gen(function* () {
    const uninstalledDependencies: Array<string> = []
    const uninstalledDevDependencies: Array<string> = []

    for (const dependency of REQUIREMENTS.dependencies) {
      if (!packageJson.dependencies?.[dependency]) {
        uninstalledDependencies.push(dependency)
        continue
      }
      yield* Effect.logDebug(`✅ ${dependency}@${packageJson.dependencies[dependency]} is installed`)
    }

    for (const devDependency of REQUIREMENTS.devDependencies) {
      if (!packageJson.devDependencies?.[devDependency] && !packageJson.dependencies?.[devDependency]) {
        uninstalledDevDependencies.push(devDependency)
        continue
      }
      yield* Effect.logDebug(`✅ ${devDependency}@${packageJson.devDependencies?.[devDependency]} is installed`)
    }

    return { uninstalledDependencies, uninstalledDevDependencies }
  })

export { checkDependencies }
