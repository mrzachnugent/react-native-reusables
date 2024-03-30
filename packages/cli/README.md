# React Native Reusables CLI

> Please follow [the initial setup steps](https://rnr-docs.vercel.app/getting-started/initial-setup/) before using

A CLI to add [react-native-reusables](https://rnr-docs.vercel.app/getting-started/introduction/) components to your project. When components depend on other components and/or primitives, they will also be added to your project.

## How to use

Use the following command _(with optional arugments and flags)_:

```bash
npx @react-native-reusables/cli@latest add
```

### Arguments

If you do not add arguments, you will be promted to select the `ui` components you would like to add to your project.

#### UI Components

- `accordion`
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

#### Primitive Components

- `accordion-primitive`
- `alert-dialog-primitive`
- `aspect-ratio-primitive`
- `avatar-primitive`
- `checkbox-primitive`
- `collapsible-primitive`
- `context-menu-primitive`
- `dialog-primitive`
- `dropdown-menu-primitive`
- `hover-card-primitive`
- `label-primitive`
- `menubar-primitive`
- `navigation-menu-primitive`
- `popover-primitive`
- `progress-primitive`
- `radio-group-primitive`
- `select-primitive`
- `separator-primitive`
- `slider-primitive`
- `switch-primitive`
- `table-primitive`
- `tabs-primitive`
- `toast-primitive`
- `toggle-primitive`
- `toggle-group-primitive`
- `toolbar-primitive`
- `tooltip-primitive`
- `hooks-primitive`
- `portal-primitive`
- `slot-primitive`
- `types-primitive`
- `utils-primitive`

### Flags

- `-o` or `--overwrite`: Overwrite existing files. Default to `false`
- `-c <cmd>` or `--cwd <cwd>`: The working directory. Defaults to the current directory.

```mdx
This project uses code from shadcn.
The code is licensed under the MIT License.
https://github.com/shadcn-ui/ui
```