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

// TODO: make better objects for nativewind, rnr, etc
const NATIVEWIND = {
  dependencies: ["nativewind", "react-native-reanimated", "react-native-safe-area-context"], //
  devDependencies: [
    "tailwindcss" // check dependencies if not found in devDependencies
  ],
  tailwindConfigIncludes: ["nativewind/preset"],
  babelConfigIncludes: ["nativewind/babel", "jsxImportSource"],
  metroConfigIncludes: ["withNativeWind"],
  envTypesIncludes: ["nativewind/types"],
  _layoutIncludes: ["global.css"],
  cssIncludes: ["@tailwind base", "@tailwind components", "@tailwind utilities"]
}

const RNR = {
  dependencies: ["tailwindcss-animate", "class-variance-authority", "clsx", "tailwind-merge"], //
  utilsFileIncludes: ["function cn("],
  _layoutIncludes: ["<PortalHost"],
  deprecatedLibs: ["icons", "constants.ts", "useColorScheme.tsx"],
  themeIncludes: ["primary", "secondary", "destructive"]
}

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
  },
  {
    name: "CSS",
    fileNames: ["globals.css", "src/global.css"],
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
]

const CUSTOM_FILE_CHECKS = {
  tailwindConfig: {
    name: "Tailwind Config",
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
    includes: [
      {
        content: ["function cn("],
        message: "The cn function is missing",
        docs: "https://google.com"
      }
    ]
  }
}

const RULES = {
  dependencies: DEPENDENCIES,
  devDependencies: DEV_DEPENDENCIES,
  files: FILE_CHECKS,
  custom: CUSTOM_FILE_CHECKS
} as const

const configFilesToCheck = [
  ["babel.config.js", "babel.config.ts"],
  ["metro.config.js"],
  ["nativewind-env.d.ts"],
  ["app/_layout.tsx", "src/app/_layout.tsx"]
]

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

    const missingDeps = []
    const missingDevDeps = []

    for (const dep of NATIVEWIND.dependencies) {
      const versionInstalled = packageJson.dependencies?.[dep]
      yield* Effect.logDebug(`${dep}@${versionInstalled}`)
      if (!packageJson.dependencies?.[dep]) {
        missingDeps.push(dep)
      }
    }

    for (const dep of NATIVEWIND.devDependencies) {
      const versionInstalled = packageJson.devDependencies?.[dep]
      yield* Effect.logDebug(`${dep}@${versionInstalled}`)
      if (!packageJson.devDependencies?.[dep]) {
        missingDevDeps.push(dep)
      }
    }

    for (const dep of RNR.dependencies) {
      const versionInstalled = packageJson.dependencies?.[dep]
      yield* Effect.logDebug(`${dep}@${versionInstalled}`)
      if (!packageJson.dependencies?.[dep]) {
        missingDeps.push(dep)
      }
    }

    const tailwindConfigPaths = [componentJson.tailwind.config, "tailwind.config.js", "tailwind.config.ts"].filter(
      (path) => path != null
    )
    configFilesToCheck.push(tailwindConfigPaths)

    const cssPaths = [componentJson.tailwind.css, "global.css", "src/global.css"]
    configFilesToCheck.push(cssPaths)

    const firstTsPathKey = Object.keys(tsConfig.paths)[0].replace("*", "")

    const aliasForLib = componentJson.aliases.lib ? `${componentJson.aliases.lib}` : `${firstTsPathKey}lib`

    const themePath =
      firstTsPathKey.length > 0
        ? yield* resolvePathFromAlias(`${aliasForLib}/theme.ts`, tsConfig)
        : path.join(options.cwd, "lib/theme.ts")
    configFilesToCheck.push([themePath])

    const [babelConfig, metroConfig, nativewindEnv, rootLayout, tailwindConfig, css, theme] = yield* Effect.forEach(
      configFilesToCheck,
      (paths) =>
        retryWith(fs.readFileString, paths.map((p) => path.join(options.cwd, p)) as [string, ...Array<string>]).pipe(
          Effect.catchAll(() => Effect.succeed(null))
        ),
      { concurrency: "unbounded" }
    )

    const missingFiles = []
    const incorrectFiles = new Set<string>([])

    if (tailwindConfig) {
      yield* Effect.log("tailwindConfig found")
      if (NATIVEWIND.tailwindConfigIncludes.some((str) => !tailwindConfig.includes(str))) {
        yield* Effect.log("tailwindConfig is missing some includes")
        incorrectFiles.add("tailwindConfig-nativewind")
      } else {
        yield* Effect.log("tailwindConfig is correct")
      }
      // TODO: better check
      ;["primary", "secondary", "destructive"].forEach((color) => {
        if (!tailwindConfig.includes(`--${color}`)) {
          incorrectFiles.add("tailwindConfig-rnr-colors")
        }
        // TODO: more checks
      })
    } else {
      missingFiles.push("tailwind.config.js")
    }

    if (babelConfig) {
      yield* Effect.log("babelConfig found")
      if (NATIVEWIND.babelConfigIncludes.some((str) => !babelConfig.includes(str))) {
        yield* Effect.log("babelConfig is missing some includes")
        incorrectFiles.add("babelConfig-nativewind")
      } else {
        yield* Effect.log("babelConfig is correct")
      }
    } else {
      missingFiles.push("babel.config.js")
    }

    if (metroConfig) {
      yield* Effect.log("metroConfig found")
      if (NATIVEWIND.metroConfigIncludes.some((str) => !metroConfig.includes(str))) {
        yield* Effect.log("metroConfig is missing some includes")
        incorrectFiles.add("metroConfig-nativewind")
      } else {
        yield* Effect.log("metroConfig is correct")
      }
    } else {
      missingFiles.push("metro.config.js")
    }

    if (nativewindEnv) {
      yield* Effect.log("nativewindEnv found")
      if (NATIVEWIND.envTypesIncludes.some((str) => !nativewindEnv.includes(str))) {
        yield* Effect.log("nativewindEnv is missing some includes")
        incorrectFiles.add("nativewindEnv-nativewind")
      } else {
        yield* Effect.log("nativewindEnv is correct")
      }
    } else {
      missingFiles.push("nativewind-env.d.ts")
    }

    if (rootLayout) {
      yield* Effect.log("rootLayout found")
      if (NATIVEWIND._layoutIncludes.some((str) => !rootLayout.includes(str))) {
        yield* Effect.log("rootLayout is missing some includes")
        incorrectFiles.add("rootLayout-nativewind")
      } else {
        yield* Effect.log("rootLayout is correct")
      }

      if (RNR._layoutIncludes.some((str) => !rootLayout.includes(str))) {
        yield* Effect.log("rootLayout is missing some includes")
        incorrectFiles.add("rootLayout-rnr")
      } else {
        yield* Effect.log("rootLayout is correct")
      }
    } else {
      missingFiles.push("app/_layout.tsx")
    }

    if (css) {
      yield* Effect.log("css found")
      if (NATIVEWIND.cssIncludes.some((str) => !css.includes(str))) {
        yield* Effect.log("css is missing some includes")
        incorrectFiles.add("css-nativewind")
      } else {
        yield* Effect.log("css is correct")
      }
      // TODO: check variables
    } else {
      missingFiles.push("globals.css")
    }

    if (theme) {
      yield* Effect.log("theme found")
      if (RNR.themeIncludes.some((str) => !theme.includes(str))) {
        yield* Effect.log("theme is missing some includes")
        incorrectFiles.add("theme-rnr")
      } else {
        yield* Effect.log("theme is correct")
      }
    } else {
      missingFiles.push("lib/theme.ts")
    }

    yield* Effect.logDebug({ missingFiles, missingDeps, missingDevDeps, incorrectFiles: [...incorrectFiles] })

    const [icons, constants, useColorScheme] = yield* Effect.forEach(
      RNR.deprecatedLibs,
      (path) =>
        resolvePathFromAlias(
          componentJson.aliases.lib
            ? `${componentJson.aliases.lib}/${path}`
            : `${Object.keys(tsConfig.paths)[0].replace("*", "")}lib/${path}`,
          tsConfig
        ).pipe(
          Effect.flatMap((path) => {
            console.log({ path })
            return fs.exists(path)
          }),
          Effect.catchAll(() => Effect.succeed(null))
        ),
      { concurrency: "unbounded" }
    )

    if (icons) {
      yield* Effect.log("icons found and is deprecated")
    } else {
      yield* Effect.logDebug("icons not found - GOOD")
    }

    if (constants) {
      yield* Effect.log("constants found and is deprecated")
    } else {
      yield* Effect.logDebug("constants not found - GOOD")
    }

    if (useColorScheme) {
      yield* Effect.log("useColorScheme found and is deprecated")
    } else {
      yield* Effect.logDebug("useColorScheme not found - GOOD")
    }

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
