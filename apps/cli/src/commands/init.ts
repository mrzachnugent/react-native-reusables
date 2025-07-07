import { Effect, Console } from "effect"
import { Command } from "@effect/cli"

export const InitCommand = Command.make("init")
  .pipe(Command.withDescription("Initialize a new React Native project with reusables"))
  .pipe(Command.withHandler(initHandler))

function initHandler() {
  return Effect.gen(function* () {
    yield* Console.log("🚀 Initializing project...")
    yield* Console.log("✅ Project initialized!")
  })
}
