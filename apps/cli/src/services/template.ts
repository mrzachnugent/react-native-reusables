import { runCommand } from "@cli/utils/run-command.js"
import { Prompt } from "@effect/cli"
import { FileSystem, Path } from "@effect/platform"
import { Effect } from "effect"
import { Spinner } from "@cli/services/spinner.js"
import logSymbols from "log-symbols"

class Template extends Effect.Service<Template>()("src/services/template", {
  dependencies: [Spinner.Default],
  effect: Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path
    const spinner = yield* Spinner

    return {
      clone: ({ cwd, name, repo }: { cwd: string; name: string; repo: { subPath?: string; url: string } }) =>
        Effect.acquireUseRelease(
          fs.makeTempDirectory(),
          (tempDirPath) =>
            Effect.gen(function* () {
              yield* Effect.logDebug(`Template.clone args: ${JSON.stringify({ cwd, name, repo }, null, 2)}`)

              const newRepoPath = path.join(cwd, name)

              const newRepoPathExists = yield* fs.exists(newRepoPath)

              yield* Effect.logDebug(`Does ${newRepoPath} exist? ${newRepoPathExists ? "yes" : "no"}`)

              if (newRepoPathExists) {
                yield* Effect.logWarning(`${logSymbols.warning} A project already exists in this directory.`)
                const choice = yield* Prompt.select({
                  message: "How would you like to proceed?",
                  choices: [
                    { title: "Cancel and exit", value: "cancel" },
                    { title: "Overwrite the existing project", value: "overwrite" }
                  ]
                })

                if (choice === "cancel") {
                  yield* Effect.logDebug(`User chose to cancel`)
                  return yield* Effect.succeed(true)
                }

                const confirmOverwrite = yield* Prompt.confirm({
                  message: "Are you sure you want to overwrite the existing project?",
                  initial: true
                })

                if (!confirmOverwrite) {
                  yield* Effect.logDebug(`User chose to not overwrite the existing project`)
                  return yield* Effect.succeed(true)
                }
              }

              yield* Effect.logDebug(`Created temp directory: ${tempDirPath}`)

              const templateName = repo.subPath
                ? path.basename(repo.subPath)
                : path.basename(repo.url).replace(".git", "")

              spinner.start(`Initializing the ${templateName} template...`)
              yield* runCommand("git", ["clone", "--depth=1", "--branch", "main", repo.url, name], {
                cwd: tempDirPath
              })

              const cloneToTempPath = path.join(tempDirPath, name)

              yield* Effect.logDebug(`Cloned temp template to ${cloneToTempPath}`)

              yield* fs.copy(repo.subPath ? path.join(cloneToTempPath, repo.subPath) : cloneToTempPath, newRepoPath, {
                overwrite: true
              })

              yield* Effect.logDebug(`Copied template to ${newRepoPath}`)

              const allPaths = yield* fs.readDirectory(newRepoPath, { recursive: true })

              yield* Effect.logDebug(`Replacing template name ${templateName} with ${name} in ${allPaths.length} files`)
              yield* Effect.logDebug(`All paths: ${allPaths.join("\n")}`)

              yield* Effect.forEach(allPaths, (file) =>
                Effect.gen(function* () {
                  const content = yield* fs
                    .readFileString(path.join(newRepoPath, file))
                    .pipe(Effect.catchAll(() => Effect.succeed("")))

                  if (!content.includes(templateName)) {
                    return
                  }

                  yield* Effect.logDebug(`Replacing template name "${templateName}" with "${name}" in ${file}`)

                  const replaced = content.replaceAll(templateName, name)
                  yield* fs.writeFileString(path.join(newRepoPath, file), replaced)
                })
              )

              spinner.stop()

              const installDependencies = yield* Prompt.confirm({
                message: "Would you like to install dependencies?",
                initial: true
              })
              let packageManager = "none"
              if (installDependencies) {
                packageManager = yield* Prompt.select({
                  message: "Which package manager would you like to use?",
                  choices: [
                    { title: "bun", value: "bun" },
                    { title: "pnpm", value: "pnpm" },
                    { title: "npm", value: "npm" },
                    { title: "yarn", value: "yarn" }
                  ]
                })

                const npmrcPath = path.join(newRepoPath, ".npmrc")
                const hasNpmrc = yield* fs.exists(npmrcPath)

                if (packageManager === "pnpm" && !hasNpmrc) {
                  yield* Effect.logDebug(`Writing .npmrc file...`)
                  yield* fs.writeFileString(npmrcPath, "node-linker=hoisted\nenable-pre-post-scripts=true")
                }

                if (packageManager !== "pnpm" && packageManager !== "none" && hasNpmrc) {
                  yield* Effect.logDebug(`Removing .npmrc file...`)
                  yield* fs.remove(npmrcPath)
                }

                yield* runCommand(packageManager, ["install"], {
                  cwd: newRepoPath,
                  stdio: "inherit"
                })

                yield* runCommand("npx", ["expo", "install", "--fix"], {
                  cwd: newRepoPath,
                  stdio: "inherit"
                })
              }

              const gitInit = yield* Prompt.confirm({
                message: "Would you like to initialize a Git repository?",
                initial: true
              })

              if (gitInit) {
                spinner.start(`Initializing Git repository...`)

                let hasGitError = false
                yield* runCommand("git", ["init"], {
                  cwd: newRepoPath,
                  stdio: "inherit"
                }).pipe(
                  Effect.catchAll(() => {
                    hasGitError = true
                    return Effect.succeed(true)
                  })
                )

                if (!hasGitError) {
                  yield* runCommand("git", ["add", "-A"], {
                    cwd: newRepoPath,
                    stdio: "inherit"
                  }).pipe(
                    Effect.catchAll(() => {
                      hasGitError = true
                      return Effect.succeed(true)
                    })
                  )
                }

                if (!hasGitError) {
                  yield* runCommand("git", ["commit", "-m", "initialize project with @react-native-reusables/cli"], {
                    cwd: newRepoPath,
                    stdio: "inherit"
                  }).pipe(Effect.catchAll(() => Effect.succeed(true)))
                }
                spinner.stop()
              }

              console.log("\n")
              yield* Effect.log(`\x1b[37m${logSymbols.success} New project initialized successfully!\x1b[0m`)
              if (packageManager !== "none") {
                yield* Effect.log(
                  `\x1b[22m\x1b[38;5;250m${logSymbols.info} To get started, run: \x1b[37m\`cd ${path.join(
                    cwd,
                    name
                  )} && ${packageManager} ${
                    packageManager === "npm" || packageManager === "bun" ? "run" : ""
                  } dev\`\x1b[0m`
                )
              }

              if (packageManager === "none") {
                yield* Effect.log(`\x1b[22m\x1b[38;5;250m${logSymbols.info} To get started:\x1b[0m`)
                yield* Effect.log(
                  "\x1b[22m\x1b[38;5;250m↪ Install the dependencies manually using your package manager of choice.\x1b[0m"
                )
                yield* Effect.log("\x1b[22m\x1b[38;5;250m↪ Run the dev script.\x1b[0m")
              }
              console.log("\n")
              yield* Effect.log(`\x1b[37m${logSymbols.info} Additional resources\x1b[0m`)
              yield* Effect.log(
                `\x1b[22m\x1b[38;5;250m↪ Documentation: \x1b[37mhttps://reactnativereusables.com\x1b[0m`
              )
              yield* Effect.log(
                `\x1b[22m\x1b[38;5;250m↪ Report issues: \x1b[37mhttps://github.com/founded-labs/react-native-reusables/issues\x1b[0m`
              )

              return newRepoPath
            }),
          (tempDirPath) => {
            spinner.stop()
            return fs
              .remove(tempDirPath, { recursive: true })
              .pipe(Effect.catchAll(() => Effect.logError(`Failed to remove temp directory at ${tempDirPath}`)))
          }
        )
    }
  })
}) {}

export { Template }
