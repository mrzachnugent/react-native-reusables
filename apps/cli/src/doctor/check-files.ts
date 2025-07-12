import { type FileCheck, type FileWithContent, type MissingInclude } from "@cli/doctor/requirements.js"
import { retryWith } from "@cli/doctor/utils.js"
import { FileSystem, Path } from "@effect/platform"
import { Effect } from "effect"

const checkFiles = (cwd: string, files: Array<FileCheck>) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path

    const missingFiles: Array<FileCheck> = []
    const missingIncludes: Array<MissingInclude> = []

    const filesWithContent = yield* Effect.forEach(
      files,
      (file) =>
        retryWith(
          (filePath: string) =>
            Effect.gen(function* () {
              const fileContents = yield* fs.readFileString(filePath)
              yield* Effect.logDebug(`✅ ${file.name} found`)
              return { ...file, content: fileContents } as FileWithContent
            }),
          file.fileNames.map((p) => path.join(cwd, p)) as [string, ...Array<string>]
        ).pipe(
          Effect.catchAll(() => {
            missingFiles.push(file)
            return Effect.succeed(null)
          })
        ),
      { concurrency: "unbounded" }
    ).pipe(Effect.map((files) => files.filter((file): file is FileWithContent => file !== null)))

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

    return { missingFiles, missingIncludes }
  })

export { checkFiles }
