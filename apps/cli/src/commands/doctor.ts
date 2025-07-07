import { Command } from "@effect/cli"
import { Console, Effect } from "effect"
import { Git } from "../services/Git.js"

const DoctorCommand = Command.make("doctor")
  .pipe(Command.withDescription("Check your project setup and diagnose issues"))
  .pipe(Command.withHandler(doctorHandler))

function doctorHandler() {
  return Effect.gen(function* () {
    const git = yield* Git

    yield* Console.log("🏥 Running doctor command...")
    yield* Console.log("🔍 Checking Git repository...")

    const isDirty = yield* git.checkIfDirty
    if (isDirty) {
      yield* Console.log("⚠️  Git repository is dirty")
    } else {
      yield* Console.log("✅ Git repository is clean")
    }
  })
}

export { DoctorCommand, doctorHandler }
