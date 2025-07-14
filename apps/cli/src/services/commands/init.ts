import { Effect, Console } from "effect"

function make() {
  return Effect.gen(function* () {
    yield* Console.log("🚀 Initializing project...")
    yield* Console.log("✅ Project initialized!")
  })
}

export { make }
