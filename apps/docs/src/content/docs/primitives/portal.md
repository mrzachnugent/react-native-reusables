---
title: Portal Primitive
description: Portals let you render its children into a different part of your app.
---

Portals let you render its children into a different part of your app.

```tsx
import { Portal, PortalHost } from '~/components/primitives/portal';

function Root() {
  return (
    <>
      <Header />
      <Body />
      {/* Children of <Portal /> will render here */}
      <PortalHost />
    </>
  );
}

function Body() {
  return (
    <>
      <Hero />
      {/* <Footer /> will render as a child of <PortalHost /> in the < Root/> */}
      {/* It will not render between <Hero /> and <Section /> */}
      <Portal name='unique-name'>
        <Footer />
      </Portal>
      <Section />
      <Section2 />
    </>
  );
}
```

## Features

- Defaults to a single host
- Supports multiple hosts
- Supports multiple portals for a single host

## How to add

The portal primitive depends on one external library (<a target="_blank" href="https://github.com/pmndrs/zustand">zustand</a>).
Once it is installed, you can copy the primitive to your codebase.

### Install dependency

```bash
npx expo install zustand
```

### Copy/Paste

Create a file `~/components/primitives/portal/portal-native.tsx` and copy/paste the following code into that new file:

```tsx
import * as React from 'react';
import { create } from 'zustand';

const DEFAULT_PORTAL_HOST = 'INTERNAL_PRIMITIVE_DEFAULT_HOST_NAME';

type PortalMap = Map<string, React.ReactNode>;
type PortalHostMap = Map<string, PortalMap>;

const usePortal = create<{ map: PortalHostMap }>(() => ({
  map: new Map<string, PortalMap>().set(
    DEFAULT_PORTAL_HOST,
    new Map<string, React.ReactNode>()
  ),
}));

const updatePortal = (
  hostName: string,
  name: string,
  children: React.ReactNode
) => {
  usePortal.setState((prev) => {
    const next = new Map(prev.map);
    const portal = next.get(hostName) ?? new Map<string, React.ReactNode>();
    portal.set(name, children);
    next.set(hostName, portal);
    return { map: next };
  });
};
const removePortal = (hostName: string, name: string) => {
  usePortal.setState((prev) => {
    const next = new Map(prev.map);
    const portal = next.get(hostName) ?? new Map<string, React.ReactNode>();
    portal.delete(name);
    next.set(hostName, portal);
    return { map: next };
  });
};

export function PortalHost({ name = DEFAULT_PORTAL_HOST }: { name?: string }) {
  const portalMap =
    usePortal((state) => state.map).get(name) ??
    new Map<string, React.ReactNode>();
  if (portalMap.size === 0) return null;
  return <>{Array.from(portalMap.values())}</>;
}

export function Portal({
  name,
  hostName = DEFAULT_PORTAL_HOST,
  children,
}: {
  name: string;
  hostName?: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    updatePortal(hostName, name, children);
  }, [hostName, name, children]);

  React.useEffect(() => {
    return () => {
      removePortal(hostName, name);
    };
  }, [hostName, name]);

  return null;
}
```

Then, create `~/components/primitives/portal/index.ts` and copy/paste the following code into that new file:

```ts
export * from './portal-native';
```

To use a portal on the web, it is recommended to use [createPortal](https://react.dev/reference/react-dom/createPortal) from `react-dom` instead.

## Usage

### Default Portal

Add the `<PortalHost />` as the last child of your `<Root/>` component (for expo-router, the default export in the root `_layout.tsx`)

```tsx
import { PortalHost } from '~/components/primitives/portal';

function Root() {
  return (
    <>
      <Stack />
      {/* The default host does not require a `name` props */}
      <PortalHost />
    </>
  );
}
```

Then, from any component, add a `<Portal />` and its content will be rendered as a child of `<PortalHost />`

```tsx
import { Portal } from '~/components/primitives/portal';

function Card() {
  return (
    <Wrapper>
      <Content />
      <Portal name='card-portal'>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
            },
          ]}
        >
          <View>
            <Text style={{ color: 'white' }}>
              I am centered and overlay the entier screen
            </Text>
          </View>
        </View>
      </Portal>
    </Wrapper>
  );
}
```

### Custom Portal Host

Add the `<PortalHost name="unique-host-name"/>` with a unique name where you want the contents of `<Portal />` to render. Then, from any component, add a `<Portal />` and its content will be rendered as a child of `<PortalHost />`

```tsx
import { Portal, PortalHost } from '~/components/primitives/portal';

function Example() {
  return (
    <Wrapper>
      <PortalHost name='example-host' />
      <Content />
      <Portal name='example-portal' hostName='example-host'>
        <View>
          <Text>I will be rendered above the Content component</Text>
        </View>
      </Portal>
    </Wrapper>
  );
}
```

## Props

### PortalHost

By default, children of all Portal components will be rendered as its own children.

| Prop |       Type        |                   Note                   |
| :--: | :---------------: | :--------------------------------------: |
| name | string (optional) | Provide when it is used as a custom host |

### Portal

|   Prop   |       Type        |                                         Note                                          |
| :------: | :---------------: | :-----------------------------------------------------------------------------------: |
|   name   |      string       | Unique value otherwise the portal with the same name will replace the original portal |
| hostName | string (optional) |             Provide when its children are to be rendered in a custom host             |
