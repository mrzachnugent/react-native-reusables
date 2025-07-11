import { Schema } from "effect"

const packageJsonSchema = Schema.Struct({
  dependencies: Schema.Record({ key: Schema.String, value: Schema.String }),
  devDependencies: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String }))
})

export { packageJsonSchema }
