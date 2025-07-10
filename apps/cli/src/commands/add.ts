import { Args, Command, Options } from "@effect/cli"
import { Console, Effect } from "effect"

const args = Args.all({
  components: Args.text({ name: "components" }).pipe(Args.repeated)
})

const test = Options.boolean("test", { aliases: ["t"] })

const AddCommand = Command.make("add", { args, test })
  .pipe(Command.withDescription("Add React Native components to your project"))
  .pipe(Command.withHandler(addHandler))

function addHandler({ args, test }: { args: { components: Array<string> }; test: boolean }) {
  return Effect.gen(function* () {
    yield* Console.log("➕ Adding components...")
    yield* Console.log("Components to add:", args.components)
    yield* Console.log("Test option:", test)
    yield* Console.log("✅ Components added successfully!")
  })
}

export { AddCommand, addHandler }
