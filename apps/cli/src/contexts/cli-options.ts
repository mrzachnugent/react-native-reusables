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
const summary = Options.boolean("summary").pipe(Options.withAlias("s"))
const overwrite = Options.boolean("overwrite", { aliases: ["o"] })
const all = Options.boolean("all", { aliases: ["a"] })
const path = Options.text("path").pipe(Options.withDefault(""), Options.withAlias("p"))
const template = Options.text("template").pipe(Options.withAlias("t"), Options.withDefault(""))

export { CliOptions, cwd, summary, yes, overwrite, all, path, template }
