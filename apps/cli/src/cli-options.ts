import { Options } from "@effect/cli"
import { Context } from "effect"

class CliOptions extends Context.Tag("CommandOptions")<
  CliOptions,
  Readonly<{
    cwd: string
    fix?: boolean
  }>
>() {}

const cwd = Options.directory("cwd", { exists: "yes" }).pipe(Options.withDefault("."), Options.withAlias("c"))
const fix = Options.boolean("fix", { aliases: ["f"] })

const quiet = Options.boolean("quiet", { aliases: ["q"] })
const essentials = Options.boolean("essentials", { aliases: ["e"] })

export { CliOptions, cwd, fix, quiet, essentials }
