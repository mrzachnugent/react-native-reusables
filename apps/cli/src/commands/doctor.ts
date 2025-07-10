import { Command, Options, Prompt } from "@effect/cli"
import { Effect } from "effect"
import { Git } from "../services/git.js"
import { Path, FileSystem } from "@effect/platform"

// Suggestion types :
// - Install missing package
// - Add missing file (maybe prompt for file path if exists)
// - Incorrect file content

// Dependencies
// Check if they are all in the package.json
// If some are not, prompt user to install them

// Dev Dependencies
// Check if they are all in the package.json
// If some are not, prompt user to install orElse

// Config files
// Check if they are all there and if they are all correct
// If missing, prompt user to add them
// If incorrect, show link to docs

// Deprecated files
// Check if any are present
// If so, suggest to remove them

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

const NATIVEWIND = {
  dependencies: ["nativewind", "react-native-reanimated", "react-native-safe-area-context"],
  devDependencies: [
    "tailwindcss" // check dependencies if not found in devDependencies
  ],
  tailwindConfigIncludes: ["nativewind/preset"],
  babelConfigIncludes: ["nativewind/babel", "jsxImportSource"],
  metroConfigIncludes: ["withNativeWind"],
  envTypesIncludes: ["nativewind/types"],
  _layoutIncludes: ["global.css"]
}

const RNR = {
  dependencies: ["tailwindcss-animate", "class-variance-authority", "clsx", "tailwind-merge"],
  typescriptConfigIncludes: ["paths"],
  utilsFileIncludes: ["function cn("],
  _layoutIncludes: ["<PortalHost"],
  deprecated: ["/lib/icons", "/lib/constants", "lib/useColorScheme.tsx"]
}

const COMPONENT_JSON = "/components.json"

const FILES_TO_CHECK_FROM_COMPONENT_JSON = {
  check: ["global.css", "/lib/theme.ts", "tailwind.config.js"]
}

const cwd = Options.directory("cwd", { exists: "yes" }).pipe(Options.withDefault("."), Options.withAlias("c"))

const interactive = Options.boolean("interactive", { aliases: ["i"] })
const addMissing = Options.boolean("add-missing", { aliases: ["a"] })

const DoctorCommand = Command.make("doctor", { addMissing, cwd, interactive })
  .pipe(Command.withDescription("Check your project setup and diagnose issues"))
  .pipe(Command.withHandler(doctorHandler))

function doctorHandler(options: { addMissing: boolean; cwd: string; interactive: boolean }) {
  return Effect.gen(function* () {
    const git = yield* Git
    const path = yield* Path.Path
    const fs = yield* FileSystem.FileSystem

    yield* Effect.logDebug("cwd", options.cwd)
    const packageJsonPath = path.join(options.cwd, "package.json")

    yield* Effect.logInfo("🏥 Running doctor command...")

    // Expo check
    const hasPackageJson = yield* fs.exists(packageJsonPath)
    if (!hasPackageJson) {
      yield* Effect.logError("⚠️  Package.json not found")
      return yield* Effect.fail("Package.json not found")
    }

    yield* Effect.logDebug("✅ Package.json found")
    const packageJson = yield* fs.readFileString(packageJsonPath)

    const UNSAFE_PACKAGE_JSON = JSON.parse(packageJson)

    const expoVersion = UNSAFE_PACKAGE_JSON.dependencies?.expo

    if (!expoVersion) {
      yield* Effect.logError("⚠️  Expo not found in package.json")
      return yield* Effect.fail("Expo not found in package.json")
    }

    yield* Effect.logDebug("✅ Expo found in package.json")

    // Deps check

    for (const dep of NATIVEWIND.dependencies) {
      const versionInstalled = UNSAFE_PACKAGE_JSON.dependencies?.[dep]
      yield* Effect.logDebug(`${dep}@${versionInstalled}`)
      if (!UNSAFE_PACKAGE_JSON.dependencies?.[dep]) {
        yield* Effect.logWarning(`⚠️  ${dep} not found in package.json`)
        return yield* Effect.fail(`${dep} not found in package.json`)
      }
    }

    for (const dep of NATIVEWIND.devDependencies) {
      const versionInstalled = UNSAFE_PACKAGE_JSON.devDependencies?.[dep]
      yield* Effect.logDebug(`${dep}@${versionInstalled}`)
      if (!UNSAFE_PACKAGE_JSON.devDependencies?.[dep]) {
        yield* Effect.logWarning(`⚠️  ${dep} not found in package.json`)
        return yield* Effect.fail(`${dep} not found in package.json`)
      }
    }

    for (const dep of RNR.dependencies) {
      const versionInstalled = UNSAFE_PACKAGE_JSON.dependencies?.[dep]
      yield* Effect.logDebug(`${dep}@${versionInstalled}`)
      if (!UNSAFE_PACKAGE_JSON.dependencies?.[dep]) {
        yield* Effect.logWarning(`⚠️  ${dep} not found in package.json`)
        return yield* Effect.fail(`${dep} not found in package.json`)
      }
    }

    // Typescript check
    const hasTsConfig = yield* fs.exists(path.join(options.cwd, "tsconfig.json"))
    if (!hasTsConfig) {
      yield* Effect.logWarning("⚠️  Tsconfig not found")
      return yield* Effect.fail("Tsconfig not found")
    }

    yield* Effect.logDebug("✅ Tsconfig found")

    const tsConfigContent = yield* fs.readFileString(path.join(options.cwd, "tsconfig.json"))

    const hasTsConfigIncludes = RNR.typescriptConfigIncludes.every((include) => tsConfigContent.includes(include))

    if (!hasTsConfigIncludes) {
      yield* Effect.logWarning("⚠️  Tsconfig does not include paths")
      return yield* Effect.fail("Tsconfig does not include paths")
    }

    yield* Effect.logDebug("✅ Tsconfig includes paths")

    // Utils file check
    const hasUtilsFile = yield* fs.exists(path.join(options.cwd, "lib/utils.ts"))

    if (!hasUtilsFile) {
      yield* Effect.logWarning("⚠️  Utils file not found")
      return yield* Effect.fail("Utils file not found")
    }

    yield* Effect.logDebug("✅ Utils file found")

    const utilsFileContent = yield* fs.readFileString(path.join(options.cwd, "lib/utils.ts"))

    const hasUtilsFileIncludes = RNR.utilsFileIncludes.every((include) => utilsFileContent.includes(include))

    if (!hasUtilsFileIncludes) {
      yield* Effect.logWarning("⚠️  Utils file does not include function cn")
      return yield* Effect.fail("Utils file does not include function cn")
    }

    yield* Effect.logDebug("✅ Utils file includes function cn")

    // Tailwind config check - first
    const hasTailwindConfig = yield* fs.exists(path.join(options.cwd, "tailwind.config.js"))
    if (!hasTailwindConfig) {
      yield* Effect.logWarning("⚠️  Tailwind config not found")
      return yield* Effect.fail("Tailwind config not found")
    }

    yield* Effect.logDebug("✅ Tailwind config found")

    const tailwindConfig = yield* fs.readFileString(path.join(options.cwd, "tailwind.config.js"))

    const hasTailwindConfigIncludes = NATIVEWIND.tailwindConfigIncludes.every((include) =>
      tailwindConfig.includes(include)
    )

    if (!hasTailwindConfigIncludes) {
      yield* Effect.logWarning("⚠️  Tailwind config does not include nativewind/preset")
      return yield* Effect.fail("Tailwind config does not include nativewind/preset")
    }

    yield* Effect.logDebug("✅ Tailwind config includes nativewind/preset")

    // Babel config check

    const hasBabelConfig = yield* fs.exists(path.join(options.cwd, "babel.config.js"))
    if (!hasBabelConfig) {
      yield* Effect.logWarning("⚠️  Babel config not found")
      return yield* Effect.fail("Babel config not found")
    }

    yield* Effect.logDebug("✅ Babel config found")

    const babelConfig = yield* fs.readFileString(path.join(options.cwd, "babel.config.js"))

    const hasBabelConfigIncludes = NATIVEWIND.babelConfigIncludes.every((include) => babelConfig.includes(include))

    if (!hasBabelConfigIncludes) {
      yield* Effect.logWarning("⚠️  Babel config does not include nativewind/babel")
      return yield* Effect.fail("Babel config does not include nativewind/babel")
    }

    yield* Effect.logDebug("✅ Babel config includes nativewind/babel")

    // Metro config check

    const hasMetroConfig = yield* fs.exists(path.join(options.cwd, "metro.config.js"))
    if (!hasMetroConfig) {
      yield* Effect.logWarning("⚠️  Metro config not found")
      return yield* Effect.fail("Metro config not found")
    }

    yield* Effect.logDebug("✅ Metro config found")

    const metroConfig = yield* fs.readFileString(path.join(options.cwd, "metro.config.js"))

    yield* Effect.logDebug("✅ Metro config found")

    const hasMetroConfigIncludes = NATIVEWIND.metroConfigIncludes.every((include) => metroConfig.includes(include))

    yield* Effect.logDebug("✅ Metro config includes withNativeWind")

    // Nativewind env types check
    const hasEnvTypes = yield* fs.exists(path.join(options.cwd, "nativewind-env.d.ts"))

    if (!hasEnvTypes) {
      yield* Effect.logWarning("⚠️  Env types not found")
      return yield* Effect.fail("Env types not found")
    }

    yield* Effect.logDebug("✅ Nativewind Env types found")

    if (!hasMetroConfigIncludes) {
      yield* Effect.logWarning("⚠️  Metro config does not include withNativeWind")
      return yield* Effect.fail("Metro config does not include withNativeWind")
    }

    // Root layout check
    const rootLayout = yield* fs.exists(path.join(options.cwd, "app/_layout.tsx"))

    if (!rootLayout) {
      const srcRootLayout = yield* fs.exists(path.join(options.cwd, "src/app/_layout.tsx"))
      if (!srcRootLayout) {
        yield* Effect.logWarning("⚠️  Root layout not found")
        return yield* Effect.fail("Root layout not found")
      }

      yield* Effect.logDebug("✅ Root layout found in src/_layout.tsx")
      const srcRootLayoutContent = yield* fs.readFileString(path.join(options.cwd, "src/app/_layout.tsx"))
      if (!srcRootLayoutContent.includes(".css")) {
        yield* Effect.logWarning("⚠️  CSS import not found in src/app/_layout.tsx")
        return yield* Effect.fail("CSS import not found in src/app/_layout.tsx")
      }

      if (!srcRootLayoutContent.includes("<PortalHost")) {
        yield* Effect.logWarning("⚠️  PortalHost not found in src/app/_layout.tsx")
        return yield* Effect.fail("PortalHost not found in src/app/_layout.tsx")
      }
    }

    const rootLayoutContent = yield* fs.readFileString(path.join(options.cwd, "app/_layout.tsx"))
    if (!rootLayoutContent.includes(".css")) {
      const hasIndexFile = yield* fs.exists(path.join(options.cwd, "index.js"))
      if (!hasIndexFile) {
        yield* Effect.logWarning("⚠️  CSS import not found in app/_layout.tsx")
        return yield* Effect.fail("CSS import not found in app/_layout.tsx")
      }

      const indexFile = yield* fs.readFileString(path.join(options.cwd, "index.js"))
      if (!indexFile.includes(".css")) {
        yield* Effect.logWarning("⚠️  CSS import not found in index.js")
        return yield* Effect.fail("CSS import not found in index.js")
      }
    }

    if (!rootLayoutContent.includes("<PortalHost")) {
      yield* Effect.logWarning("⚠️  PortalHost not found in app/_layout.tsx")
      return yield* Effect.fail("PortalHost not found in app/_layout.tsx")
    }

    yield* Effect.logDebug("✅ CSS import found")
    yield* Effect.logDebug("✅ PortalHost found ")

    // Deprecated files check
    const hasDeprecatedConstants = yield* fs.exists(path.join(options.cwd, "lib/constants.ts"))

    if (hasDeprecatedConstants) {
      yield* Effect.logWarning("⚠️  Deprecated constants found")
    } else {
      yield* Effect.logDebug("✅ No deprecated constants found")
    }

    const hasDeprecatedIcons = yield* fs.exists(path.join(options.cwd, "lib/icons.ts"))

    if (hasDeprecatedIcons) {
      yield* Effect.logWarning("⚠️  Deprecated icons found")
    } else {
      yield* Effect.logDebug("✅ No deprecated icons found")
    }

    const hasDeprecatedUseColorScheme = yield* fs.exists(path.join(options.cwd, "lib/useColorScheme.tsx"))
    if (hasDeprecatedUseColorScheme) {
      yield* Effect.logWarning("⚠️  Deprecated useColorScheme found")
    } else {
      yield* Effect.logDebug("✅ No deprecated useColorScheme found")
    }

    // Component json check
    const hasComponentJson = yield* fs.exists(path.join(options.cwd, COMPONENT_JSON))

    if (hasComponentJson) {
      yield* Effect.logWarning("⚠️ No Component json found")
    } else {
      yield* Effect.logDebug("✅ component json found")
    }

    yield* Effect.logDebug("🟠 TODO: parse component json and check if matches shadcn/ui")

    // Globals css check
    const hasGlobalsCss = yield* fs.exists(path.join(options.cwd, "globals.css"))

    if (hasGlobalsCss) {
      yield* Effect.logWarning("⚠️ No globals.css found")
    } else {
      yield* Effect.logDebug("✅ globals.css found")
    }

    // Check contents of files from component json
    yield* Effect.logDebug(`🟠 TODO: check contents of ${FILES_TO_CHECK_FROM_COMPONENT_JSON.check.join(", ")}`)

    function* checkGit() {
      const isDirty = yield* git.checkIfDirty
      if (isDirty) {
        yield* Effect.log("⚠️  Git repository is dirty")
      } else {
        yield* Effect.log("✅ Git repository is clean")
      }
    }

    if (options.interactive) {
      yield* Effect.log("🟠 TODO: prompt user to fix issues as they are found")
      yield* checkGit()
    }

    if (options.addMissing) {
      yield* Effect.log("🔧 Adding missing stuff...")
      yield* checkGit()
    }

    const prompt = yield* Prompt.confirm({
      message: "Does this work?",
      label: { confirm: "y", deny: "n" },
      initial: true,
      placeholder: { defaultConfirm: "y/n" }
    })

    yield* Effect.log(`Answered: ${prompt}`)

    const prompt2 = yield* Prompt.select({
      choices: [
        { title: "y", value: "y" },
        { title: "n", value: "n" }
      ],
      message: "Does this work?"
    })

    yield* Effect.log(`Answered 2: ${prompt2}`)
  })
}

export { DoctorCommand, doctorHandler }
