# React Native Reusables CLI

> Please follow [the initial setup steps](https://rnr-docs.vercel.app/getting-started/initial-setup/) before using

A CLI to add [react-native-reusables](https://rnr-docs.vercel.app/getting-started/introduction/) components to your project. When components depend on other components, they will also be added to your project.

## How to use

Use the following command _(with optional arugments and flags)_:

```bash
npx @react-native-reusables/cli@latest add
```

### Arguments

If you do not add arguments, you will be prompted to select the `ui` components you would like to add to your project.

#### UI Components

- `accordion`
- `alert`
- `alert-dialog`
- `aspect-ratio`
- `avatar`
- `badge`
- `button`
- `card`
- `checkbox`
- `collapsible`
- `context-menu`
- `dialog`
- `dropdown-menu`
- `hover-card`
- `input`
- `label`
- `menubar`
- `navigation-menu`
- `popover`
- `radio-group`
- `select`
- `separator`
- `skeleton`
- `switch`
- `table`
- `tabs`
- `text`
- `textarea`
- `toggle`
- `toggle-group`
- `tooltip`
- `typography`

### Flags

- `-o` or `--overwrite`: Overwrite existing files. Default to `false`
- `-c <cmd>` or `--cwd <cwd>`: The working directory. Defaults to the current directory.

```mdx
This project uses code from shadcn.
The code is licensed under the MIT License.
https://github.com/shadcn-ui/ui
```
