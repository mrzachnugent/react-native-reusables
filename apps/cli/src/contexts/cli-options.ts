import { Options } from "@effect/cli"
import { Context } from "effect"

class CliOptions extends Context.Tag("CommandOptions")<
  CliOptions,
  Readonly<{
    cwd: string
    yes: boolean
  }>
>() {}

const cwd = Options.directory("cwd", { exists: "yes" }).pipe(Options.withDefault("."), Options.withAlias("c"))
const yes = Options.boolean("yes", { aliases: ["y"] })
const summary = Options.boolean("summary")

export { CliOptions, cwd, summary, yes }
