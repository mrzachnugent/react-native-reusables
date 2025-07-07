import { AddCommand } from "@cli/commands/add.js"
import { DoctorCommand, doctorHandler } from "@cli/commands/doctor.js"
import { InitCommand } from "@cli/commands/init.js"
import { Command } from "@effect/cli"
import { Console, Effect } from "effect"

const cli = Command.make("react-native-reusables/cli")
  .pipe(Command.withDescription("React Native Reusables CLI - A powerful toolkit for React Native development"))
  .pipe(
    Command.withHandler(() =>
      Effect.gen(function* () {
        yield* Console.log("🎯 Welcome to React Native Reusables CLI!")
        yield* Console.log("")

        yield* doctorHandler()
      })
    )
  )
  .pipe(Command.withSubcommands([AddCommand, DoctorCommand, InitCommand]))

export const run = Command.run(cli, {
  name: "@react-native-reusables/cli",
  version: "1.0.0"
})
