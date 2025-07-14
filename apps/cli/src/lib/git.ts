import { Data, Effect } from "effect"
import { Command } from "@effect/platform"
import { Prompt } from "@effect/cli"
import logSymbols from "log-symbols"

export class GitError extends Data.TaggedError("GitError")<{
  cause?: unknown
  message?: string
}> {}

const COMMANDS = {
  status: Command.make("git", "status", "--porcelain")
} as const

export class Git extends Effect.Service<Git>()("Git", {
  succeed: {
    promptIfDirty: () =>
      Effect.gen(function* () {
        const gitStatus = yield* COMMANDS.status.pipe(
          Command.string,
          Effect.catchAll(() => Effect.succeed("")) // Not a git repository
        )
        const isDirty = gitStatus.trim().length > 0
        if (!isDirty) {
          return false
        }
        const result = yield* Prompt.confirm({
          message: `${logSymbols.warning} The Git repository is dirty (uncommitted changes). Continue anyway?`,
          initial: true
        })

        if (!result) {
          return yield* Effect.fail(new GitError({ message: "Aborted due to uncommitted changes." }))
        }

        return result
      })
  }
}) {}
