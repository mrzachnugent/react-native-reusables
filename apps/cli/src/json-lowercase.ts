import { Effect } from "effect"

class Json extends Effect.Service<Json>()("Json", {
  succeed: {
    parse: (content: string) =>
      Effect.try({
        try: () => JSON.parse(content) as unknown,
        catch: (error) => new Error("Error parsing JSON", { cause: String(error) })
      })
  }
}) {}

export { Json }
