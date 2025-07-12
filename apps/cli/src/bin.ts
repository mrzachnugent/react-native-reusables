#!/usr/bin/env node

import * as NodeContext from "@effect/platform-node/NodeContext"
import * as NodeRuntime from "@effect/platform-node/NodeRuntime"
import * as Effect from "effect/Effect"
import { run } from "./main.js"

Effect.suspend(() => run(process.argv)).pipe(
  Effect.provide(NodeContext.layer),
  Effect.catchAll((error) => Effect.logError(error)),
  NodeRuntime.runMain({ disableErrorReporting: true })
)
