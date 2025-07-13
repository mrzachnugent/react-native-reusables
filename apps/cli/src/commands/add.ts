import { Console, Effect } from "effect"

function make({ args }: { args: { components: Array<string> } }) {
  return Effect.gen(function* () {
    yield* Console.log("➕ Adding components...")
    yield* Console.log("Components to add:", args.components)
    yield* Console.log("✅ Components added successfully!")
  })
}

export { make }
