import { Command, Options, Prompt } from "@effect/cli"
import { Data, Effect, Schema } from "effect"
// import { Git } from "../services/git.js"
import { Path, FileSystem } from "@effect/platform"
import { loadConfig as loadTypscriptConfig, createMatchPath, type ConfigLoaderSuccessResult } from "tsconfig-paths"
import { packageJsonSchema } from "@cli/schemas/package-schema.js"
import { componentJsonSchema } from "@cli/schemas/component-json-schema.js"

const loadTsConfig = (cwd: string) =>
  Effect.try({
    try: () => {
      const configResult = loadTypscriptConfig(cwd)
      if (configResult.resultType === "failed") {
        throw new Error("Error loading tsconfig.json", { cause: configResult.message })
      }
      return configResult
    },
    catch: (error) => new Error("Error loading tsconfig.json", { cause: String(error) })
  })

const supportedExtensions = [".ts", ".tsx", ".jsx", ".js", ".css"]

function returnTrue() {
  return true
}

const resolvePathFromAlias = (
  aliasPath: string,
  config: Pick<ConfigLoaderSuccessResult, "absoluteBaseUrl" | "paths">
) =>
  Effect.try({
    try: () => {
      const matchPath = createMatchPath(config.absoluteBaseUrl, config.paths)(
        aliasPath,
        undefined,
        returnTrue,
        supportedExtensions
      )
      if (!matchPath) {
        throw new Error("Path not found", { cause: aliasPath })
      }
      return matchPath
    },
    catch: (error) => new Error(`Error resolving alias "${aliasPath}": ${String(error)}`)
  })

class ParseJsonError extends Data.TaggedError("ParseJsonError")<{
  cause?: unknown
  message?: string
}> {}

const parseJson = (content: string) =>
  Effect.try({
    try: () => JSON.parse(content) as unknown,
    catch: (error) => new ParseJsonError({ message: "Error parsing JSON", cause: error })
  })

function retryWith<A, R, E, B>(
  fn: (input: A) => Effect.Effect<R, E, B>,
  inputs: readonly [A, ...Array<A>]
): Effect.Effect<R, E, B> {
  return inputs.slice(1).reduce((acc, input) => acc.pipe(Effect.orElse(() => fn(input))), fn(inputs[0]))
}

// USER EXPERIENCE:

// Running the doctor command
// 1. It checks for everything set up correctly first
// 2. If there's a problem, it prompts the user to fix it
// 2.1 If its a missing dependency or file, and they accept, it will install or add the file otherwise it will keep the suggestion for the end
// 2.2 If its a incorrect file content, it will keep the suggestion for the end
// 2.3 If its a deprecated file, it will keep the suggestion for the end
// 3. Show suggestions with links to more info if there are any
// 4. If there are no suggestions, it will show a message saying that the project seems to be setup correctly

// --quiet
// Running the doctor command without prompts/just suggestions

// --essentials
// Running the doctor command for shadcn cli essentials and showing a warning message count with the suggestion to run the doctor command (before adding a component, for the CLI mostly)

// Concurrently do as much as possible
// Find all files
// For all that exist, check if they are correct

// Pre-flight
// components.json
// package.json

const DEPENDENCIES = [
  "nativewind",
  "react-native-reanimated",
  "react-native-safe-area-context",
  "tailwindcss-animate",
  "class-variance-authority",
  "clsx",
  "tailwind-merge"
]

const DEV_DEPENDENCIES = ["tailwindcss"]

const FILE_CHECKS = [
  {
    name: "Babel Config",
    fileNames: ["babel.config.js", "babel.config.ts"],
    includes: [
      {
        content: ["nativewind/babel", "jsxImportSource"],
        message: "jsxImportSource or nativewind/babel is missing",
        docs: "https://google.com"
      }
    ]
  },
  {
    name: "Metro Config",
    fileNames: ["metro.config.js", "metro.config.ts"],
    includes: [
      {
        content: ["withNativeWind("],
        message: "The withNativeWind function is missing",
        docs: "https://google.com"
      },
      {
        content: ["inlineRem", "16"],
        message: "The inlineRem is missing",
        docs: "https://google.com"
      }
    ]
  },
  {
    name: "Root Layout",
    fileNames: ["app/_layout.tsx", "src/app/_layout.tsx"],
    includes: [
      {
        content: [".css"],
        message: "The css file import is missing",
        docs: "https://google.com"
      },
      {
        content: ["<PortalHost"],
        message: "The PortalHost component is missing",
        docs: "https://google.com"
      }
    ]
  }
]

const DEPRECATED_FROM_LIB = ["icons", "constants.ts", "useColorScheme.tsx"]

const CUSTOM_FILE_CHECKS = {
  tailwindConfig: {
    name: "Tailwind Config",
    defaultFileNames: ["tailwind.config.js", "tailwind.config.ts"],
    includes: [
      {
        content: ["nativewind/preset"],
        message: "The nativewind preset is missing",
        docs: "https://google.com"
      },
      {
        content: ["primary", "secondary", "destructive"], // TODO: do better
        message: "At least one of the color css variables is missing",
        docs: "https://google.com"
      }
    ]
  },
  theme: {
    name: "Theme",
    defaultFileNames: ["lib/theme.ts"],
    includes: [
      {
        content: ["primary", "secondary", "destructive"],
        message: "At least one of the color variables is missing",
        docs: "https://google.com"
      },
      {
        content: ["NAV_THEME"],
        message: "The NAV_THEME is missing",
        docs: "https://google.com"
      }
    ]
  },
  nativewindEnv: {
    name: "Nativewind Env",
    includes: [
      {
        content: ["nativewind/types"],
        message: "The nativewind types are missing",
        docs: "https://google.com"
      }
    ]
  },
  utils: {
    name: "Utils",
    defaultFileNames: ["lib/utils.ts"],
    includes: [
      {
        content: ["function cn("],
        message: "The cn function is missing",
        docs: "https://google.com"
      }
    ]
  },
  css: {
    name: "CSS",
    defaultFileNames: ["globals.css", "src/global.css"],
    includes: [
      {
        content: ["@tailwind base", "@tailwind components", "@tailwind utilities"],
        message: "The tailwind layer directives are missing",
        docs: "https://google.com"
      },
      {
        content: ["primary", "secondary", "destructive"], // TODO: do better
        message: "At least one of the color css variables is missing",
        docs: "https://google.com"
      }
    ]
  }
}

const NATIVEWIND_ENV_FILE = "nativewind-env.d.ts"

const RULES = {
  dependencies: DEPENDENCIES,
  devDependencies: DEV_DEPENDENCIES,
  files: FILE_CHECKS,
  custom: CUSTOM_FILE_CHECKS,
  deprecated: {
    lib: DEPRECATED_FROM_LIB
  }
} as const

const checkDependencies = (packageJson: typeof packageJsonSchema.Type) =>
  Effect.gen(function* () {
    const uninstalledDependencies = []
    const uninstalledDevDependencies = []

    for (const dependency of RULES.dependencies) {
      if (!packageJson.dependencies?.[dependency]) {
        uninstalledDependencies.push(dependency)
        continue
      }
      yield* Effect.logDebug(`✅ ${dependency}@${packageJson.dependencies?.[dependency]} is installed`)
    }
    for (const devDependency of RULES.devDependencies) {
      if (!packageJson.devDependencies?.[devDependency] && !packageJson.dependencies?.[devDependency]) {
        uninstalledDevDependencies.push(devDependency)
        continue
      }
      yield* Effect.logDebug(`✅ ${devDependency}@${packageJson.devDependencies?.[devDependency]} is installed`)
    }
    return { uninstalledDependencies, uninstalledDevDependencies }
  })

const cwd = Options.directory("cwd", { exists: "yes" }).pipe(Options.withDefault("."), Options.withAlias("c"))

const quiet = Options.boolean("quiet", { aliases: ["q"] })
const essentials = Options.boolean("essentials", { aliases: ["e"] })

const DoctorCommand = Command.make("doctor", { cwd, quiet, essentials })
  .pipe(Command.withDescription("Check your project setup and diagnose issues"))
  .pipe(Command.withHandler(doctorHandler))

function doctorHandler(options: { cwd: string; quiet: boolean; essentials: boolean }) {
  return Effect.gen(function* () {
    // const git = yield* Git
    const path = yield* Path.Path
    const fs = yield* FileSystem.FileSystem

    const [componentJson, packageJson, tsConfig] = yield* Effect.all(
      [
        fs.readFileString(path.join(options.cwd, "components.json")).pipe(
          Effect.flatMap(parseJson),
          Effect.flatMap(Schema.decodeUnknown(componentJsonSchema)),
          Effect.catchTags({
            ParseJsonError: (error) => {
              return Effect.fail(error)
            },
            ParseError: () =>
              Effect.gen(function* () {
                const componentJsonExists = yield* fs.exists(path.join(options.cwd, "components.json"))
                yield* Effect.log("An invalid components.json file was found.")
                const shouldCreateComponentJson = yield* Prompt.confirm({
                  message: `${
                    componentJsonExists ? "Do you want to fix it?" : "Do you want to create a components.json file?"
                  } It is required for the CLI to work.`,
                  label: { confirm: "y", deny: "n" },
                  initial: true,
                  placeholder: { defaultConfirm: "y/n" }
                })

                if (!shouldCreateComponentJson) {
                  return yield* Effect.fail("components.json not found")
                }

                yield* Effect.log("Creating components.json file...")
                return yield* Schema.encode(componentJsonSchema)({
                  $schema: "https://raw.githubusercontent.com/shadcn/ui/main/components.json",
                  style: "default",
                  aliases: {
                    components: "@showcase/components",
                    utils: "@showcase/utils",
                    lib: "@showcase/lib"
                  },
                  rsc: false,
                  tsx: true,
                  tailwind: {
                    css: "globals.css",
                    baseColor: "slate",
                    cssVariables: true,
                    config: "tailwind.config.js"
                  }
                })
              })
          })
        ),
        fs.readFileString(path.join(options.cwd, "package.json")).pipe(
          Effect.flatMap(parseJson),
          Effect.flatMap(Schema.decodeUnknown(packageJsonSchema)),
          Effect.catchAll((error) => Effect.fail(new Error("Package.json not found", { cause: error })))
        ),
        loadTsConfig(options.cwd)
      ],
      { concurrency: "unbounded" }
    )

    const { uninstalledDependencies, uninstalledDevDependencies } = yield* checkDependencies(packageJson)

    const aliasForLib = componentJson.aliases.lib ?? `${componentJson.aliases.utils}/lib`

    const missingFiles: Array<(typeof RULES.files)[number] | (typeof RULES.custom)[keyof typeof RULES.custom]> = []

    const filesWithContent = yield* Effect.forEach(
      RULES.files,
      (file) =>
        retryWith(
          (cwd: string) =>
            Effect.gen(function* () {
              const fileContents = yield* fs.readFileString(cwd)
              yield* Effect.logDebug(`✅ ${file.name} found`)
              return { ...file, content: fileContents }
            }),
          file.fileNames.map((p) => path.join(options.cwd, p)) as [string, ...Array<string>]
        ).pipe(
          Effect.catchAll(() => {
            missingFiles.push(file)
            return Effect.succeed(null)
          })
        ),
      { concurrency: "unbounded" }
    ).pipe(Effect.map((files) => files.filter((file) => file !== null)))

    const missingIncludes: Array<(typeof RULES.files)[number]["includes"][number] & { fileName: string }> = []

    yield* Effect.forEach(filesWithContent, (file) =>
      Effect.gen(function* () {
        const { content, includes, name } = file
        for (const include of includes) {
          if (include.content.every((str) => content.includes(str))) {
            yield* Effect.logDebug(`✅ ${name} has ${include.content.join(", ")}`)
            continue
          }
          missingIncludes.push({ ...include, fileName: name })
        }
      })
    )

    const { css, nativewindEnv, tailwindConfig, theme, utils } = RULES.custom

    const cssPaths = [componentJson.tailwind.css, "global.css", "src/global.css"].filter((path) => path != null)

    const cssContent = yield* retryWith(
      (cwd: string) =>
        Effect.gen(function* () {
          const content = yield* fs.readFileString(cwd)
          yield* Effect.logDebug(`✅ ${css.name} found`)
          return content
        }),
      cssPaths.map((p) => path.join(options.cwd, p)) as [string, ...Array<string>]
    ).pipe(Effect.catchAll(() => Effect.fail(() => new Error("CSS not found")))) // TODO: tagged error

    for (const include of css.includes) {
      if (include.content.every((str) => cssContent.includes(str))) {
        yield* Effect.logDebug(`✅ ${css.name} has ${include.content.join(", ")}`)
        continue
      }
      missingIncludes.push({ ...include, fileName: css.name })
    }

    if (componentJson.tsx !== false) {
      const nativewindEnvContent = yield* fs.readFileString(path.join(options.cwd, NATIVEWIND_ENV_FILE)).pipe(
        Effect.catchAll(() => {
          missingFiles.push(nativewindEnv)
          return Effect.succeed(null)
        })
      )

      for (const include of nativewindEnv.includes) {
        if (!nativewindEnvContent) {
          continue
        }
        if (include.content.every((str) => nativewindEnvContent.includes(str))) {
          yield* Effect.logDebug(`✅ ${nativewindEnv.name} has ${include.content.join(", ")}`)
          continue
        }
        missingIncludes.push({ ...include, fileName: nativewindEnv.name })
      }
    }

    const tailwindConfigPaths = [componentJson.tailwind.config, "tailwind.config.js", "tailwind.config.ts"].filter(
      (path) => path != null
    )
    const tailwindConfigContent = yield* retryWith(
      (cwd: string) =>
        Effect.gen(function* () {
          const content = yield* fs.readFileString(cwd)
          yield* Effect.logDebug(`✅ ${tailwindConfig.name} found`)
          return content
        }),
      tailwindConfigPaths.map((p) => path.join(options.cwd, p)) as [string, ...Array<string>]
    ).pipe(Effect.catchAll(() => Effect.fail(() => new Error("Tailwind config not found")))) // TODO: tagged error

    for (const include of tailwindConfig.includes) {
      if (include.content.every((str) => tailwindConfigContent.includes(str))) {
        yield* Effect.logDebug(`✅ ${tailwindConfig.name} has ${include.content.join(", ")}`)
        continue
      }
      missingIncludes.push({ ...include, fileName: tailwindConfig.name })
    }

    const themeAliasPath = yield* resolvePathFromAlias(`${aliasForLib}/theme.ts`, tsConfig)

    const themeContent = yield* Effect.gen(function* () {
      const content = yield* fs.readFileString(themeAliasPath)
      yield* Effect.logDebug(`✅ ${theme.name} found`)
      return content
    }).pipe(
      Effect.catchAll(() => {
        missingFiles.push(theme)
        return Effect.succeed(null)
      })
    )

    for (const include of theme.includes) {
      if (!themeContent) {
        continue
      }
      if (include.content.every((str) => themeContent.includes(str))) {
        yield* Effect.logDebug(`✅ ${theme.name} has ${include.content.join(", ")}`)
        continue
      }
      missingIncludes.push({ ...include, fileName: theme.name })
    }

    const utilsPath = yield* resolvePathFromAlias(`${aliasForLib}/utils.ts`, tsConfig)

    const utilsContent = yield* Effect.gen(function* () {
      const content = yield* fs.readFileString(utilsPath)
      yield* Effect.logDebug(`✅ ${utils.name} found`)
      return content
    }).pipe(
      Effect.catchAll(() => {
        missingFiles.push(utils)
        return Effect.succeed(null)
      })
    )

    for (const include of utils.includes) {
      if (utilsContent && include.content.every((str) => utilsContent.includes(str))) {
        yield* Effect.logDebug(`✅ ${utils.name} has ${include.content.join(", ")}`)
        continue
      }
      missingIncludes.push({ ...include, fileName: utils.name })
    }

    const existingDeprecatedFromLibs = yield* Effect.forEach(
      RULES.deprecated.lib,
      (path) =>
        resolvePathFromAlias(`${aliasForLib}/${path}`, tsConfig).pipe(
          Effect.flatMap((fullPath) =>
            Effect.gen(function* () {
              const exists = yield* fs.exists(fullPath)
              if (!exists) {
                yield* Effect.logDebug(`✅ deprecated lib/${path} not found`)
              }
              return { file: `${aliasForLib}/${path}`, exists }
            })
          )
        ),
      { concurrency: "unbounded" }
    ).pipe(Effect.map((results) => results.filter((result) => result.exists)))

    yield* Effect.logError({
      missingFiles,
      uninstalledDependencies,
      uninstalledDevDependencies,
      missingIncludes,
      existingDeprecatedFromLibs
    })

    const prompt = yield* Prompt.confirm({
      message: "Does this work?",
      initial: true
    })

    yield* Effect.log(`Answered: ${prompt}`)

    const prompt2 = yield* Prompt.select({
      choices: [
        { title: "Red pill", value: "red" },
        { title: "Blue pill", value: "blue", disabled: true, description: "You have already chosen." }
      ],
      message: "Does this work?"
    })

    yield* Effect.log(`Answered 2: ${prompt2}`)
  })
}

export { DoctorCommand, doctorHandler }
