import { Schema } from "effect"

const componentJsonSchema = Schema.Struct({
  $schema: Schema.optional(Schema.String),
  style: Schema.String,
  rsc: Schema.Boolean,
  tsx: Schema.Boolean,
  tailwind: Schema.Struct({
    config: Schema.optional(Schema.String),
    css: Schema.String,
    baseColor: Schema.String,
    cssVariables: Schema.Boolean,
    prefix: Schema.optional(Schema.String)
  }),
  aliases: Schema.Struct({
    components: Schema.String,
    utils: Schema.String,
    ui: Schema.optional(Schema.String),
    lib: Schema.optional(Schema.String),
    hooks: Schema.optional(Schema.String)
  }),
  iconLibrary: Schema.optional(Schema.String)
})
export { componentJsonSchema }
