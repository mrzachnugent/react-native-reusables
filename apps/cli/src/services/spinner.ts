import { Effect } from "effect"
import ora from "ora"

class Spinner extends Effect.Service<Spinner>()("Spinner", {
  effect: Effect.gen(function* () {
    const spinner = yield* Effect.try({
      try: () => ora(),
      catch: () => new Error("Failed to create spinner")
    })

    return spinner
  })
}) {}

export { Spinner }
