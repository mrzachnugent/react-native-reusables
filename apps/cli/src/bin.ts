#!/usr/bin/env node

import * as NodeContext from "@effect/platform-node/NodeContext"
import * as NodeRuntime from "@effect/platform-node/NodeRuntime"
import * as Effect from "effect/Effect"
import * as Cli from "./cli.js"

Effect.suspend(Cli.run).pipe(
  Effect.provide(NodeContext.layer),
  Effect.catchAll((error) => {
    if (error instanceof Error) {
      Effect.logDebug(error)
      return Effect.logError(error.message)
    }
    return Effect.logError(error)
  }),
  NodeRuntime.runMain({ disableErrorReporting: true })
)
