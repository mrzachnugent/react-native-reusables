interface FileCheck {
  name: string
  fileNames: Array<string>
  docs: string
  includes: Array<{
    content: Array<string>
    message: string
    docs: string
  }>
}

type CustomFileCheck = Omit<FileCheck, "fileNames"> & { defaultFileNames?: ReadonlyArray<string> }

interface FileWithContent extends FileCheck {
  content: string
}

interface MissingInclude {
  fileName: string
  content: ReadonlyArray<string>
  message: string
  docs: string
}

const DEPENDENCIES = [
  "expo",
  "nativewind",
  "react-native-reanimated",
  "react-native-safe-area-context",
  "tailwindcss-animate",
  "class-variance-authority",
  "clsx",
  "tailwind-merge"
]

const DEV_DEPENDENCIES = ["tailwindcss@^3.4.17"]

const FILE_CHECKS: Array<FileCheck> = [
  {
    name: "Babel Config",
    fileNames: ["babel.config.js", "babel.config.ts"],
    docs: "https://www.nativewind.dev/docs/getting-started/installation#3-add-the-babel-preset",
    includes: [
      {
        content: ["nativewind/babel", "jsxImportSource"],
        message: "jsxImportSource or nativewind/babel is missing",
        docs: "https://www.nativewind.dev/docs/getting-started/installation#3-add-the-babel-preset"
      }
    ]
  },
  {
    name: "Metro Config",
    fileNames: ["metro.config.js", "metro.config.ts"],
    docs: "https://www.nativewind.dev/docs/getting-started/installation#4-create-or-modify-your-metroconfigjs",
    includes: [
      {
        content: ["withNativeWind("],
        message: "The withNativeWind function is missing",
        docs: "https://www.nativewind.dev/docs/getting-started/installation#4-create-or-modify-your-metroconfigjs"
      },
      {
        content: ["inlineRem", "16"],
        message: "The inlineRem is missing",
        docs: "https://google.com" // TODO: add reactnativereusables link
      }
    ]
  },
  {
    name: "Root Layout",
    fileNames: ["app/_layout.tsx", "src/app/_layout.tsx"],
    docs: "https://google.com", // TODO: add reactnativereusables link
    includes: [
      {
        content: [".css"],
        message: "The css file import is missing",
        docs: "https://www.nativewind.dev/docs/getting-started/installation#5-import-your-css-file"
      },
      {
        content: ["<PortalHost"],
        message: "The PortalHost component is missing",
        docs: "https://google.com" // TODO: add reactnativereusables link
      }
    ]
  }
]

const DEPRECATED_FROM_LIB = [
  {
    name: "Icons",
    fileNames: ["icons/iconWithClassName.ts"],
    includes: [
      {
        content: ["iconWithClassName"],
        message: "lib/icons and its contents are deprecated. Use the new icon wrapper from components/ui/icon.",
        docs: "https://google.com" // TODO: add reactnativereusables link
      }
    ]
  },
  {
    name: "Constants",
    fileNames: ["constants.ts"],
    includes: [
      {
        content: ["NAV_THEME"],
        message: "Usage of lib/constants for NAV_THEME is deprecated. Use lib/theme instead.",
        docs: "https://google.com" // TODO: add reactnativereusables link
      }
    ]
  },
  {
    name: "useColorScheme",
    fileNames: ["useColorScheme.tsx"],
    includes: [
      {
        content: ["useColorScheme"],
        message: "lib/useColorScheme is deprecated. Use NativeWind's color scheme hook instead.",
        docs: "https://www.nativewind.dev/docs/api/use-color-scheme"
      }
    ]
  }
]

const CUSTOM_FILE_CHECKS = {
  tailwindConfig: {
    name: "Tailwind Config",
    defaultFileNames: ["tailwind.config.js", "tailwind.config.ts"],
    docs: "https://google.com", // TODO: add reactnativereusables link
    includes: [
      {
        content: ["nativewind/preset"],
        message: "The nativewind preset is missing",
        docs: "https://www.nativewind.dev/docs/getting-started/installation#2-setup-tailwind-css"
      },
      {
        content: ["primary", "secondary", "destructive"],
        message: "At least one of the color css variables is missing",
        docs: "https://google.com" // TODO: add reactnativereusables link
      }
    ]
  },
  theme: {
    name: "Theme",
    defaultFileNames: ["lib/theme.ts"],
    docs: "https://google.com", // TODO: add reactnativereusables link
    includes: [
      {
        content: ["primary", "secondary", "destructive"],
        message: "At least one of the color variables is missing",
        docs: "https://google.com" // TODO: add reactnativereusables link
      },
      {
        content: ["NAV_THEME"],
        message: "The NAV_THEME is missing",
        docs: "https://google.com" // TODO: add reactnativereusables link
      }
    ]
  },
  nativewindEnv: {
    name: "Nativewind Env",
    docs: "https://www.nativewind.dev/docs/getting-started/installation#7-typescript-setup-optional",
    includes: [
      {
        content: ["nativewind/types"],
        message: "The nativewind types are missing",
        docs: "https://www.nativewind.dev/docs/getting-started/installation#7-typescript-setup-optional"
      }
    ]
  },
  utils: {
    name: "Utils",
    defaultFileNames: ["lib/utils.ts"],
    docs: "https://google.com", // TODO: add reactnativereusables link
    includes: [
      {
        content: ["function cn("],
        message: "The cn function is missing",
        docs: "https://google.com" // TODO: add reactnativereusables link
      }
    ]
  },
  css: {
    name: "CSS",
    defaultFileNames: ["globals.css", "src/global.css"],
    docs: "https://google.com", // TODO: add reactnativereusables link
    includes: [
      {
        content: ["@tailwind base", "@tailwind components", "@tailwind utilities"],
        message: "The tailwind layer directives are missing",
        docs: "https://google.com" // TODO: add reactnativereusables link
      },
      {
        content: ["primary", "secondary", "destructive"],
        message: "At least one of the color css variables is missing",
        docs: "https://google.com" // TODO: add reactnativereusables link
      }
    ]
  }
}

const PROJECT_MANIFEST = {
  dependencies: DEPENDENCIES,
  devDependencies: DEV_DEPENDENCIES,
  fileChecks: FILE_CHECKS,
  deprecatedFromLib: DEPRECATED_FROM_LIB,
  customFileChecks: CUSTOM_FILE_CHECKS
}

const NATIVEWIND_ENV_FILE = "nativewind-env.d.ts"

export { PROJECT_MANIFEST, NATIVEWIND_ENV_FILE }
export type { FileCheck, CustomFileCheck, FileWithContent, MissingInclude }
