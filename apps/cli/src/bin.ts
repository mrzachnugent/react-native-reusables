#!/usr/bin/env node

import * as NodeContext from "@effect/platform-node/NodeContext"
import * as NodeRuntime from "@effect/platform-node/NodeRuntime"
import { Layer } from "effect"
import * as Effect from "effect/Effect"
import { run } from "./main.js"
import { Git } from "./services/Git.js"

const MainLayer = Layer.mergeAll(NodeContext.layer, Git.Default)

Effect.suspend(() => run(process.argv)).pipe(
  Effect.provide(MainLayer),
  NodeRuntime.runMain({ disableErrorReporting: true })
)
