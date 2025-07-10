import { Command, Options } from "@effect/cli"
import { Console, Effect } from "effect"
import { Git } from "../services/git.js"
import { Path, FileSystem } from "@effect/platform"

// Default command checks:
// - nativewind - https://www.nativewind.dev/docs/getting-started/installation#1-install-nativewind
// - rnr deps -  npx expo install tailwindcss-animate class-variance-authority clsx tailwind-merge
// - constants - @/lib/constants.ts
// - typescript alias - tsconfig.json
// - cn - @/lib/utils.ts

// - components.json - @/components.json
// - css variables (if enabled) - @/styles/globals.css | @/globals.css
// - tailwind config (with css variables if enabled) - @/tailwind.config.js
// - import css in root layout - @/app/\_layout.tsx - @/app/\_layout.tsx
// - Check for theme and Portal in /\_layout.tsx - @/app/\_layout.tsx

// If step can be fixed automatically:
// - prompt user to fix
//   - check that git is clean: if not, suggest to commit changes then prompt if they want to continue
//   - run the fix command

// If step cannot be fixed automatically or the user does not want to fix it:
// - at the end, show a list of issues that require manual intervention or the issues not selected above with links to docs

// --fix command runs the default command and then fixes the issues that can be fixed automatically

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
  cssFileIncludes: ["@tailwind base;", "@tailwind components;", "@tailwind utilities;"],
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
    yield* Console.debug("cwd", options.cwd)
    const packageJsonPath = path.join(options.cwd, "package.json")

    yield* Console.info("🏥 Running doctor command...")

    // Expo check
    const hasPackageJson = yield* fs.exists(packageJsonPath)
    if (!hasPackageJson) {
      yield* Console.error("⚠️  Package.json not found")
      return yield* Effect.fail("Package.json not found")
    }

    yield* Console.debug("✅ Package.json found")
    const packageJson = yield* fs.readFileString(packageJsonPath)

    const UNSAFE_PACKAGE_JSON = JSON.parse(packageJson)

    const expoVersion = UNSAFE_PACKAGE_JSON.dependencies?.expo

    if (!expoVersion) {
      yield* Console.error("⚠️  Expo not found in package.json")
      return yield* Effect.fail("Expo not found in package.json")
    }

    yield* Console.debug("✅ Expo found in package.json")

    // Deps check

    for (const dep of NATIVEWIND.dependencies) {
      const versionInstalled = UNSAFE_PACKAGE_JSON.dependencies?.[dep]
      yield* Console.debug(`${dep}@${versionInstalled}`)
      if (!UNSAFE_PACKAGE_JSON.dependencies?.[dep]) {
        yield* Console.error(`⚠️  ${dep} not found in package.json`)
        return yield* Effect.fail(`${dep} not found in package.json`)
      }
    }

    for (const dep of NATIVEWIND.devDependencies) {
      const versionInstalled = UNSAFE_PACKAGE_JSON.devDependencies?.[dep]
      yield* Console.debug(`${dep}@${versionInstalled}`)
      if (!UNSAFE_PACKAGE_JSON.devDependencies?.[dep]) {
        yield* Console.error(`⚠️  ${dep} not found in package.json`)
        return yield* Effect.fail(`${dep} not found in package.json`)
      }
    }

    for (const dep of RNR.dependencies) {
      const versionInstalled = UNSAFE_PACKAGE_JSON.dependencies?.[dep]
      yield* Console.debug(`${dep}@${versionInstalled}`)
      if (!UNSAFE_PACKAGE_JSON.dependencies?.[dep]) {
        yield* Console.error(`⚠️  ${dep} not found in package.json`)
        return yield* Effect.fail(`${dep} not found in package.json`)
      }
    }

    // Typescript check
    const hasTsConfig = yield* fs.exists(path.join(options.cwd, "tsconfig.json"))
    if (!hasTsConfig) {
      yield* Console.error("⚠️  Tsconfig not found")
      return yield* Effect.fail("Tsconfig not found")
    }

    yield* Console.debug("✅ Tsconfig found")

    const tsConfigContent = yield* fs.readFileString(path.join(options.cwd, "tsconfig.json"))

    const hasTsConfigIncludes = RNR.typescriptConfigIncludes.every((include) => tsConfigContent.includes(include))

    if (!hasTsConfigIncludes) {
      yield* Console.error("⚠️  Tsconfig does not include paths")
      return yield* Effect.fail("Tsconfig does not include paths")
    }

    yield* Console.debug("✅ Tsconfig includes paths")

    // Utils file check
    const hasUtilsFile = yield* fs.exists(path.join(options.cwd, "lib/utils.ts"))

    if (!hasUtilsFile) {
      yield* Console.error("⚠️  Utils file not found")
      return yield* Effect.fail("Utils file not found")
    }

    yield* Console.debug("✅ Utils file found")

    const utilsFileContent = yield* fs.readFileString(path.join(options.cwd, "lib/utils.ts"))

    const hasUtilsFileIncludes = RNR.utilsFileIncludes.every((include) => utilsFileContent.includes(include))

    if (!hasUtilsFileIncludes) {
      yield* Console.error("⚠️  Utils file does not include function cn")
      return yield* Effect.fail("Utils file does not include function cn")
    }

    yield* Console.debug("✅ Utils file includes function cn")

    // Tailwind config check - first
    const hasTailwindConfig = yield* fs.exists(path.join(options.cwd, "tailwind.config.js"))
    if (!hasTailwindConfig) {
      yield* Console.error("⚠️  Tailwind config not found")
      return yield* Effect.fail("Tailwind config not found")
    }

    yield* Console.debug("✅ Tailwind config found")

    const tailwindConfig = yield* fs.readFileString(path.join(options.cwd, "tailwind.config.js"))

    const hasTailwindConfigIncludes = NATIVEWIND.tailwindConfigIncludes.every((include) =>
      tailwindConfig.includes(include)
    )

    if (!hasTailwindConfigIncludes) {
      yield* Console.error("⚠️  Tailwind config does not include nativewind/preset")
      return yield* Effect.fail("Tailwind config does not include nativewind/preset")
    }

    yield* Console.debug("✅ Tailwind config includes nativewind/preset")

    // Babel config check

    const hasBabelConfig = yield* fs.exists(path.join(options.cwd, "babel.config.js"))
    if (!hasBabelConfig) {
      yield* Console.error("⚠️  Babel config not found")
      return yield* Effect.fail("Babel config not found")
    }

    yield* Console.debug("✅ Babel config found")

    const babelConfig = yield* fs.readFileString(path.join(options.cwd, "babel.config.js"))

    const hasBabelConfigIncludes = NATIVEWIND.babelConfigIncludes.every((include) => babelConfig.includes(include))

    if (!hasBabelConfigIncludes) {
      yield* Console.error("⚠️  Babel config does not include nativewind/babel")
      return yield* Effect.fail("Babel config does not include nativewind/babel")
    }

    yield* Console.debug("✅ Babel config includes nativewind/babel")

    // Metro config check

    const hasMetroConfig = yield* fs.exists(path.join(options.cwd, "metro.config.js"))
    if (!hasMetroConfig) {
      yield* Console.error("⚠️  Metro config not found")
      return yield* Effect.fail("Metro config not found")
    }

    yield* Console.debug("✅ Metro config found")

    const metroConfig = yield* fs.readFileString(path.join(options.cwd, "metro.config.js"))

    yield* Console.debug("✅ Metro config found")

    const hasMetroConfigIncludes = NATIVEWIND.metroConfigIncludes.every((include) => metroConfig.includes(include))

    yield* Console.debug("✅ Metro config includes withNativeWind")

    // Nativewind env types check
    const hasEnvTypes = yield* fs.exists(path.join(options.cwd, "nativewind-env.d.ts"))

    if (!hasEnvTypes) {
      yield* Console.error("⚠️  Env types not found")
      return yield* Effect.fail("Env types not found")
    }

    yield* Console.debug("✅ Nativewind Env types found")

    if (!hasMetroConfigIncludes) {
      yield* Console.error("⚠️  Metro config does not include withNativeWind")
      return yield* Effect.fail("Metro config does not include withNativeWind")
    }

    // Root layout check
    const rootLayout = yield* fs.exists(path.join(options.cwd, "app/_layout.tsx"))

    if (!rootLayout) {
      const srcRootLayout = yield* fs.exists(path.join(options.cwd, "src/app/_layout.tsx"))
      if (!srcRootLayout) {
        yield* Console.error("⚠️  Root layout not found")
        return yield* Effect.fail("Root layout not found")
      }

      yield* Console.debug("✅ Root layout found in src/_layout.tsx")
      const srcRootLayoutContent = yield* fs.readFileString(path.join(options.cwd, "src/app/_layout.tsx"))
      if (!srcRootLayoutContent.includes(".css")) {
        yield* Console.error("⚠️  CSS import not found in src/app/_layout.tsx")
        return yield* Effect.fail("CSS import not found in src/app/_layout.tsx")
      }

      if (!srcRootLayoutContent.includes("<PortalHost")) {
        yield* Console.error("⚠️  PortalHost not found in src/app/_layout.tsx")
        return yield* Effect.fail("PortalHost not found in src/app/_layout.tsx")
      }
    }

    const rootLayoutContent = yield* fs.readFileString(path.join(options.cwd, "app/_layout.tsx"))
    if (!rootLayoutContent.includes(".css")) {
      const hasIndexFile = yield* fs.exists(path.join(options.cwd, "index.js"))
      if (!hasIndexFile) {
        yield* Console.error("⚠️  CSS import not found in app/_layout.tsx")
        return yield* Effect.fail("CSS import not found in app/_layout.tsx")
      }

      const indexFile = yield* fs.readFileString(path.join(options.cwd, "index.js"))
      if (!indexFile.includes(".css")) {
        yield* Console.error("⚠️  CSS import not found in index.js")
        return yield* Effect.fail("CSS import not found in index.js")
      }
    }

    if (!rootLayoutContent.includes("<PortalHost")) {
      yield* Console.error("⚠️  PortalHost not found in app/_layout.tsx")
      return yield* Effect.fail("PortalHost not found in app/_layout.tsx")
    }

    yield* Console.debug("✅ CSS import found")
    yield* Console.debug("✅ PortalHost found ")

    // Deprecated files check
    const hasDeprecatedConstants = yield* fs.exists(path.join(options.cwd, "lib/constants.ts"))

    if (hasDeprecatedConstants) {
      yield* Console.error("⚠️  Deprecated constants found")
    } else {
      yield* Console.debug("✅ No deprecated constants found")
    }

    const hasDeprecatedIcons = yield* fs.exists(path.join(options.cwd, "lib/icons.ts"))

    if (hasDeprecatedIcons) {
      yield* Console.error("⚠️  Deprecated icons found")
    } else {
      yield* Console.debug("✅ No deprecated icons found")
    }

    const hasDeprecatedUseColorScheme = yield* fs.exists(path.join(options.cwd, "lib/useColorScheme.tsx"))
    if (hasDeprecatedUseColorScheme) {
      yield* Console.error("⚠️  Deprecated useColorScheme found")
    } else {
      yield* Console.debug("✅ No deprecated useColorScheme found")
    }

    // Component json check
    const hasComponentJson = yield* fs.exists(path.join(options.cwd, COMPONENT_JSON))

    if (hasComponentJson) {
      yield* Console.error("⚠️ No Component json found")
    } else {
      yield* Console.debug("✅ component json found")
    }

    yield* Console.debug("🟠 TODO: parse component json and check if matches shadcn/ui")

    // Globals css check
    const hasGlobalsCss = yield* fs.exists(path.join(options.cwd, "globals.css"))

    if (hasGlobalsCss) {
      yield* Console.error("⚠️ No globals.css found")
    } else {
      yield* Console.debug("✅ globals.css found")
    }

    const globalCssContent = yield* fs.readFileString(path.join(options.cwd, "global.css"))
    if (FILES_TO_CHECK_FROM_COMPONENT_JSON.cssFileIncludes.some((include) => !globalCssContent.includes(include))) {
      yield* Console.error("⚠️ global.css does not contain @tailwind base; @tailwind components; @tailwind utilities;")
    } else {
      yield* Console.debug("✅ global.css contains @tailwind base; @tailwind components; @tailwind utilities;")
    }

    // Check contents of files from component json
    yield* Console.debug(`🟠 TODO: check contents of ${FILES_TO_CHECK_FROM_COMPONENT_JSON.check.join(", ")}`)

    function* checkGit() {
      const isDirty = yield* git.checkIfDirty
      if (isDirty) {
        yield* Console.log("⚠️  Git repository is dirty")
      } else {
        yield* Console.log("✅ Git repository is clean")
      }
    }

    if (options.interactive) {
      yield* Console.log("🟠 TODO: prompt user to fix issues as they are found")
      yield* checkGit()
    }

    if (options.addMissing) {
      yield* Console.log("🔧 Adding missing stuff...")
      yield* checkGit()
    }
  })
}

export { DoctorCommand, doctorHandler }
