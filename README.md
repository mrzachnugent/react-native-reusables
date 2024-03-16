_Work in progress..._

# React Native Reusables

![banner](https://github.com/mrzachnugent/react-native-reusables/assets/63797719/0eef0a6d-d8eb-4b52-a97d-fa3b1e534215)

## Universal [shadcn/ui](https://ui.shadcn.com) for React Native

Crafted with [NativeWind v4](https://www.nativewind.dev/v4/overview) and accessibility in mind, `react-native-reusables` is open source, offering a foundation for developing your own high-quality component library.

https://github.com/mrzachnugent/react-native-reusables/assets/63797719/ae7e074f-05a4-4568-b71a-f1e0be13650d

**📖 Read the docs** _(wip)_: https://rnr-docs.vercel.app/ 

**🌐 Try the web showcase:** https://rnr-showcase.vercel.app/

### How to use

**For your own project:**

1. Start with a template or manually setup configuration: [Check out the docs](https://rnr-docs.vercel.app/getting-started/initial-setup/)

2. Copy/paste what you need into your project (2 options)

    - Follow instructions in [docs](https://rnr-docs.vercel.app/) **(work in progress)**
    - Browse [`packages/reusables/src/components/ui/*`](packages/reusables/src/components/ui)
      1. Copy file in your project to `~/components/ui/*`
      2. If it uses a primitive, replace `@rnr/*` with `~/components/primitives/*`
      3. Copy the primitive to `~/components/primitives/*`
        - _If the primitive uses other primitives repeat steps 2 and 3._


**For this repository:**

1. Clone the repo: `git clone https://github.com/mrzachnugent/react-native-reusables.git` 

2. Change directory into the cloned repo: `cd react-native-reusables`

3. Install the dependencies (**IMPORTANT:** Must use pnpm): `pnpm i`

4. Start up desired app

- Showcase
  - iOS: `pnpm dev:showcase`
  - Android: `pnpm dev:showcase:android`
  - Web: `pnpm dev:showcase:web`
- Starter-base
  - iOS: `pnpm dev:starter-base`
  - Android: `pnpm dev:starter-base:android`
  - Web: `pnpm dev:starter-base:web`
- Docs: `pnpm dev:docs`

### Templates

**Starter-base:** 

<img src="https://github.com/mrzachnugent/react-native-reusables/assets/63797719/42c94108-38a7-498b-9c70-18640420f1bc"
     alt="starter-base-template"
     style="width:270px;" />

Follow [instructions](https://rnr-docs.vercel.app/getting-started/initial-setup/) or check out the [code](apps/starter-base)

**Includes:**

- NativeWind v4
- Dark and light mode
    - Android Navigation Bar matches mode
    - Persistant mode
- Common components
    - Icons, ThemeToggle, Avatar, Button, Card, Progress, Text, Tooltip

### Backlog

- **[Documentation Project](https://github.com/users/mrzachnugent/projects/1)**
   <br>
   _Backlog for documentation. If you'd like to contribute, assign yourself the issue and track its progression in the project's backlog._

- **Add missing universal components**
  <br>
  _Refactor native components missing in `/ui` that are found in `/deprecated-ui` and add their web components from [ui/shadcn](https://ui.shadcn.com/)_

- **Create following custom native components**
  <br>
  _Replace 3rd party packages with custom native components_

  - [ ] Calendar
  - [ ] Toast

### Deprecated-UI

[See screenshots](/packages/reusables/src/components/deprecated-ui/README.md)

The first draft of components with little to no focus on the web. The code remains for those who may still want to use it. 

