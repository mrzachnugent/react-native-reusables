import { all, cwd, overwrite, path, summary, yes } from "@cli/contexts/cli-options.js"
import * as Add from "@cli/services/commands/add.js"
import * as Doctor from "@cli/services/commands/doctor.js"
import * as Init from "@cli/services/commands/init.js"
import { Args, Command } from "@effect/cli"
import { Console, Effect, pipe } from "effect"

const addArgs = Args.all({
  components: Args.text({ name: "components" }).pipe(Args.repeated)
})

const AddCommand = Command.make("add", { args: addArgs, cwd, yes, overwrite, all, path })
  .pipe(Command.withDescription("Add React Native components to your project"))
  .pipe(Command.withHandler(Add.make))

const DoctorCommand = Command.make("doctor", { cwd, summary, yes })
  .pipe(Command.withDescription("Check your project setup and diagnose issues"))
  .pipe(Command.withHandler(Doctor.make))

const InitCommand = Command.make("init", { cwd })
  .pipe(Command.withDescription("Initialize a new React Native project with reusables"))
  .pipe(Command.withHandler(Init.make))

const Cli = Command.make("react-native-reusables/cli")
  .pipe(Command.withDescription("React Native Reusables CLI - A powerful toolkit for React Native development"))
  .pipe(
    Command.withHandler(() =>
      Effect.gen(function* () {
        yield* Console.log("🎯 Welcome to React Native Reusables CLI!")
        yield* Console.log("")
      })
    )
  )
  .pipe(Command.withSubcommands([AddCommand, DoctorCommand, InitCommand]))

export const run = () =>
  pipe(
    process.argv,
    Command.run(Cli, {
      name: "@react-native-reusables/cli",
      version: "1.0.0"
    })
  )
