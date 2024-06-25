_Work in progress..._

# React Native Reusables

![banner](https://github.com/mrzachnugent/react-native-reusables/assets/63797719/0eef0a6d-d8eb-4b52-a97d-fa3b1e534215)

## Universal [shadcn/ui](https://ui.shadcn.com) for React Native

Crafted with [NativeWind v4](https://www.nativewind.dev/v4/overview) and accessibility in mind, `react-native-reusables` is open source, offering a foundation for developing your own high-quality component library.

https://github.com/mrzachnugent/react-native-reusables/assets/63797719/ae7e074f-05a4-4568-b71a-f1e0be13650d

**📖 Read the docs**: https://rnr-docs.vercel.app/

**🌐 Try the web showcase:** https://rnr-showcase.vercel.app/

### How to use

**For your own project:**

1. Start with a template or manually setup configuration: [Check out the docs](https://rnr-docs.vercel.app/getting-started/initial-setup/)

2. Browse the [docs](https://rnr-docs.vercel.app/) and use the CLI to add the components to your project

**For this repository:**

1. Fork this repo, then clone your fork on your machine.

2. Change directory into the cloned repo: `cd react-native-reusables`

3. Install the dependencies (**IMPORTANT:** Must use pnpm): `pnpm i`

4. From the root directory, start up desired app with the following commands:

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
  - Persistent mode
- Common components
  - ThemeToggle, Avatar, Button, Card, Progress, Text, Tooltip

### `rn-primitives`

RNR components are built on top of universal _(iOS, Android, and Web)_ style agnostic _(can be used with any styling system)_ [react-native primitives](https://rn-primitives.vercel.app/) which use [radix-ui/primitives](https://www.radix-ui.com/primitives) for the web.

### Deprecated-UI

[See screenshots](/packages/reusables/src/components/deprecated-ui/README.md)

The first draft of components with little to no focus on the web. The code remains for those who may still want to use it.

#### Community Templates

- [RNR Base Bare](https://github.com/a0m0rajab/rnr-base-bare) by [a0m0rajab](https://github.com/a0m0rajab): _A simple app using Supabase as the backend, featuring sign-in/sign-up and profile functionality._

<br/>
<br/>

> If you'd like to share a template you've made with react-native-reusables, feel free to open a PR. The format should replicate the other community template items

```md
[Name of template](https://github.com/your-profile/your-template-repo) by [yourGithubHandle](https://github.com/yourGithubHandle): _A short description_
```
