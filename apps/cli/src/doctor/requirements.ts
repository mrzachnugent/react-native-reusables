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

interface CustomFileCheck {
  name: string
  defaultFileNames?: ReadonlyArray<string>
  docs: string
  includes: Array<{
    content: ReadonlyArray<string>
    message: string
    docs: string
  }>
}

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
  "nativewind",
  "react-native-reanimated",
  "react-native-safe-area-context",
  "tailwindcss-animate",
  "class-variance-authority",
  "clsx",
  "tailwind-merge"
] as const

const DEV_DEPENDENCIES = ["tailwindcss"] as const

const FILE_CHECKS: Array<FileCheck> = [
  {
    name: "Babel Config",
    fileNames: ["babel.config.js", "babel.config.ts"],
    docs: "https://google.com",
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
    docs: "https://google.com",
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
    docs: "https://google.com",
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

const DEPRECATED_FROM_LIB = ["icons", "constants.ts", "useColorScheme.tsx"] as const

const CUSTOM_FILE_CHECKS = {
  tailwindConfig: {
    name: "Tailwind Config",
    defaultFileNames: ["tailwind.config.js", "tailwind.config.ts"],
    docs: "https://google.com",
    includes: [
      {
        content: ["nativewind/preset"],
        message: "The nativewind preset is missing",
        docs: "https://google.com"
      },
      {
        content: ["primary", "secondary", "destructive"],
        message: "At least one of the color css variables is missing",
        docs: "https://google.com"
      }
    ]
  },
  theme: {
    name: "Theme",
    defaultFileNames: ["lib/theme.ts"],
    docs: "https://google.com",
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
    docs: "https://google.com",
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
    docs: "https://google.com",
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
    docs: "https://google.com",
    includes: [
      {
        content: ["@tailwind base", "@tailwind components", "@tailwind utilities"],
        message: "The tailwind layer directives are missing",
        docs: "https://google.com"
      },
      {
        content: ["primary", "secondary", "destructive"],
        message: "At least one of the color css variables is missing",
        docs: "https://google.com"
      }
    ]
  }
}

const REQUIREMENTS = {
  dependencies: DEPENDENCIES,
  devDependencies: DEV_DEPENDENCIES,
  fileChecks: FILE_CHECKS,
  deprecatedFromLib: DEPRECATED_FROM_LIB,
  customFileChecks: CUSTOM_FILE_CHECKS
}

export { REQUIREMENTS }
export type { FileCheck, CustomFileCheck, FileWithContent, MissingInclude }
