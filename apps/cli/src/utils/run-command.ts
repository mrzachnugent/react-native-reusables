import { Effect } from "effect"
import { execa } from "execa"

const runCommand = (file: string, args: Array<string>, options: Parameters<typeof execa>[1]) =>
  Effect.tryPromise({
    try: () => execa(file, args, options),
    catch: (error) => new Error(`Failed to run command: ${file} ${args.join(" ")}`, { cause: String(error) })
  })

export { runCommand }
