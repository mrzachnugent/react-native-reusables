import { Data, Effect } from "effect"
import { Command } from "@effect/platform"

export class GitError extends Data.TaggedError("GitError")<{
  cause?: unknown
  message?: string
}> {}

const COMMANDS = {
  status: Command.make("git", "status", "--porcelain")
} as const

export class Git extends Effect.Service<Git>()("Git", {
  effect: Effect.sync(() => {
    return {
      checkIfDirty: Effect.gen(function* () {
        const result = yield* COMMANDS.status.pipe(Command.string)
        return result.trim().length > 0
      })
    }
  })
}) {}
