---
title: Dialog Primitive
description: A popup view that appears on top of the main view or another dialog, making the content underneath unclickable.
---

A popup view that appears on top of the main view or another dialog, making the content underneath unclickable.

```tsx
import { PortalHost } from '~/components/primitives/portal';
import * as DialogPrimitive from '~/components/primitives/dialog';

function Root() {
  return (
    <>
      <Stack />
      <PortalHost />
    </>
  );
}

function ExampleDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger>
        <Text>Edit Profile</Text>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay>
          <DialogPrimitive.Content>
            <DialogPrimitive.Title>Edit profile</DialogPrimitive.Title>
            <DialogPrimitive.Description>
              Make changes to your profile here. Click save when you're done.
            </DialogPrimitive.Description>
            <DialogPrimitive.Close>
              <Text>OK</Text>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
```

## Features

- Manages screen reader announcements with `Title` and `Description` components
- Uses radix-ui/primitives' [Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) component on the web

## How to add

The web component depends on <a target="_blank" href="https://www.radix-ui.com/primitives/docs/components/dialog">@radix-ui/react-dialog</a> as well as shared reusables.

### Add shared reusables

If you have aleady added these shared reusables, you do not need to add them again. The following reusables are used by other primitives

- [Portal Primitive](/primitives/portal)
- [Slot Primitive](/primitives/slot)
- [Primitive Types](/primitives/types)
- [useAugmentedRef (web only)](/primitives/use-augmented-ref)

### Install web-only dependency

```bash
npx expo install @radix-ui/react-dialog
```

### Copy/Paste

#### Native

Create a file `~/components/primitives/dialog/dialog-native.tsx` and copy/paste the following code into that new file:

```tsx
import * as React from 'react';
import {
  BackHandler,
  GestureResponderEvent,
  Pressable,
  Text,
  View,
} from 'react-native';
import { Portal as RNPPortal } from '~/components/primitives/portal';
import * as Slot from '~/components/primitives/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '~/components/primitives/types';
import type {
  DialogContentProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps,
} from './types';

interface RootContext extends DialogRootProps {
  nativeID: string;
}
const DialogContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & DialogRootProps>(
  ({ asChild, open, onOpenChange, ...viewProps }, ref) => {
    const nativeID = React.useId();
    const Component = asChild ? Slot.View : View;
    return (
      <DialogContext.Provider
        value={{
          open,
          onOpenChange,
          nativeID,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </DialogContext.Provider>
    );
  }
);

Root.displayName = 'RootNativeDialog';

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(
      'Dialog compound components cannot be rendered outside the Dialog component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { open, onOpenChange } = useDialogContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      const newValue = !open;
      onOpenChange(newValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        aria-disabled={disabled ?? undefined}
        role='button'
        onPress={onPress}
        disabled={disabled ?? undefined}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'TriggerNativeDialog';

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset to account for nav elements like headers.
 */
function Portal({ forceMount, hostName, children }: DialogPortalProps) {
  const value = useDialogContext();

  if (!forceMount) {
    if (!value.open) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
      <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
    </RNPPortal>
  );
}

const Overlay = React.forwardRef<
  PressableRef,
  SlottablePressableProps & DialogOverlayProps
>(
  (
    {
      asChild,
      forceMount,
      closeOnPress = true,
      onPress: OnPressProp,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange } = useDialogContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        onOpenChange(!open);
      }
      OnPressProp?.(ev);
    }

    if (!forceMount) {
      if (!open) {
        return null;
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} onPress={onPress} {...props} />;
  }
);

Overlay.displayName = 'OverlayNativeDialog';

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & DialogContentProps
>(({ asChild, forceMount, ...props }, ref) => {
  const { open, nativeID, onOpenChange } = useDialogContext();

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onOpenChange(false);
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  const Component = asChild ? Slot.View : View;
  return (
    <Component
      ref={ref}
      role='dialog'
      nativeID={nativeID}
      aria-labelledby={`${nativeID}_label`}
      aria-describedby={`${nativeID}_desc`}
      aria-modal={true}
      onStartShouldSetResponder={onStartShouldSetResponder}
      {...props}
    />
  );
});

Content.displayName = 'ContentNativeDialog';

const Close = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onOpenChange(false);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        aria-disabled={disabled ?? undefined}
        role='button'
        onPress={onPress}
        disabled={disabled ?? undefined}
        {...props}
      />
    );
  }
);

Close.displayName = 'CloseNativeDialog';

const Title = React.forwardRef<TextRef, SlottableTextProps>((props, ref) => {
  const { nativeID } = useDialogContext();
  return (
    <Text ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />
  );
});

Title.displayName = 'TitleNativeDialog';

const Description = React.forwardRef<TextRef, SlottableTextProps>(
  (props, ref) => {
    const { nativeID } = useDialogContext();
    return <Text ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
  }
);

Description.displayName = 'DescriptionNativeDialog';

export {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
  useDialogContext,
};

function onStartShouldSetResponder() {
  return true;
}
```

#### Types

Add the types for the component. Create `~/components/primitives/dialog/types.ts` and copy/paste the following code into that new file:

```tsx
import type { ForceMountable } from '~/components/primitives/types';

type DialogRootProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

interface DialogPortalProps extends ForceMountable {
  children: React.ReactNode;
  /**
   * Platform: NATIVE ONLY
   */
  hostName?: string;
  /**
   * Platform: WEB ONLY
   */
  container?: HTMLElement | null | undefined;
}
type DialogOverlayProps = ForceMountable & {
  /**
   * Platform: NATIVE ONLY - default: true
   */
  closeOnPress?: boolean;
};
type DialogContentProps = ForceMountable & {
  /**
   * Platform: WEB ONLY
   */
  onOpenAutoFocus?: (ev: Event) => void;
  /**
   * Platform: WEB ONLY
   */
  onCloseAutoFocus?: (ev: Event) => void;
  /**
   * Platform: WEB ONLY
   */
  onEscapeKeyDown?: (ev: Event) => void;
  /**
   * Platform: WEB ONLY
   */
  onInteractOutside?: (ev: Event) => void;
  /**
   * Platform: WEB ONLY
   */
  onPointerDownOutside?: (ev: Event) => void;
};

export type {
  DialogRootProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
};
```

#### Web

If your application is also a web app, create `~/components/primitives/dialog/dialog-web.tsx` and copy/paste the following code into that new file:

```tsx
import * as Dialog from '@radix-ui/react-dialog';
import * as React from 'react';
import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { useAugmentedRef } from '~/components/primitives/hooks';
import * as Slot from '~/components/primitives/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '~/components/primitives/types';
import type {
  DialogContentProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps,
} from './types';

const DialogContext = React.createContext<DialogRootProps | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & DialogRootProps>(
  ({ asChild, open, onOpenChange, ...viewProps }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <DialogContext.Provider value={{ open, onOpenChange }}>
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <Component ref={ref} {...viewProps} />
        </Dialog.Root>
      </DialogContext.Provider>
    );
  }
);

Root.displayName = 'RootWebDialog';

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(
      'Dialog compound components cannot be rendered outside the Dialog component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, role: _role, disabled, ...props }, ref) => {
    const augmentedRef = useAugmentedRef({ ref });
    const { onOpenChange, open } = useDialogContext();
    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      onOpenChange(!open);
    }

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.dataset.state = open ? 'open' : 'closed';
        augRef.type = 'button';
      }
    }, [open]);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Dialog.Trigger disabled={disabled ?? undefined} asChild>
        <Component
          ref={augmentedRef}
          onPress={onPress}
          role='button'
          disabled={disabled}
          {...props}
        />
      </Dialog.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebDialog';

function Portal({ forceMount, container, children }: DialogPortalProps) {
  return (
    <Dialog.Portal
      forceMount={forceMount}
      children={children}
      container={container}
    />
  );
}

const Overlay = React.forwardRef<
  PressableRef,
  SlottablePressableProps & DialogOverlayProps
>(({ asChild, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Dialog.Overlay forceMount={forceMount}>
      <Component ref={ref} {...props} />
    </Dialog.Overlay>
  );
});

Overlay.displayName = 'OverlayWebDialog';

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & DialogContentProps
>(
  (
    {
      asChild,
      forceMount,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onInteractOutside,
      onPointerDownOutside,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Dialog.Content
        onOpenAutoFocus={onOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
        onEscapeKeyDown={onEscapeKeyDown}
        onInteractOutside={onInteractOutside}
        onPointerDownOutside={onPointerDownOutside}
        forceMount={forceMount}
      >
        <Component ref={ref} {...props} />
      </Dialog.Content>
    );
  }
);

Content.displayName = 'ContentWebDialog';

const Close = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled, ...props }, ref) => {
    const augmentedRef = useAugmentedRef({ ref });
    const { onOpenChange, open } = useDialogContext();

    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      onOpenChange(!open);
    }

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.type = 'button';
      }
    }, []);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <Dialog.Close disabled={disabled ?? undefined} asChild>
          <Component
            ref={augmentedRef}
            onPress={onPress}
            role='button'
            disabled={disabled}
            {...props}
          />
        </Dialog.Close>
      </>
    );
  }
);

Close.displayName = 'CloseWebDialog';

const Title = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <Dialog.Title asChild>
        <Component ref={ref} {...props} />
      </Dialog.Title>
    );
  }
);

Title.displayName = 'TitleWebDialog';

const Description = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return (
      <Dialog.Description asChild>
        <Component ref={ref} {...props} />
      </Dialog.Description>
    );
  }
);

Description.displayName = 'DescriptionWebDialog';

export {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
  useDialogContext,
};
```

Then, create `~/components/primitives/dialog/index.ts` and copy/paste the following code into that new file:

```ts
import { Platform } from 'react-native';
import * as AlertDialogWeb from './dialog-web';
import * as AlertDialogNative from './dialog-native';

export const Root = Platform.select({
  web: AlertDialogWeb.Root,
  default: AlertDialogNative.Root,
});

export const Trigger = Platform.select({
  web: AlertDialogWeb.Trigger,
  default: AlertDialogNative.Trigger,
});

export const Portal = Platform.select({
  web: AlertDialogWeb.Portal,
  default: AlertDialogNative.Portal,
});

export const Overlay = Platform.select({
  web: AlertDialogWeb.Overlay,
  default: AlertDialogNative.Overlay,
});

export const Content = Platform.select({
  web: AlertDialogWeb.Content,
  default: AlertDialogNative.Content,
});

export const Title = Platform.select({
  web: AlertDialogWeb.Title,
  default: AlertDialogNative.Title,
});

export const Description = Platform.select({
  web: AlertDialogWeb.Description,
  default: AlertDialogNative.Description,
});

export const Close = Platform.select({
  web: AlertDialogWeb.Close,
  default: AlertDialogNative.Close,
});

export const useContext = Platform.select({
  web: AlertDialogWeb.useDialogContext,
  default: AlertDialogNative.useDialogContext,
});
```

## Usage

Add the `<PortalHost />` as the last child of your `<Root/>` component (for expo-router, the default export in the root `_layout.tsx`). If you already have one, do not add a second `PortalHost` component.

```tsx
import { PortalHost } from '~/components/primitives/portal';
import * as DialogPrimitive from '~/components/primitives/dialog';

function Root() {
  return (
    <>
      <Stack />
      <PortalHost />
    </>
  );
}

function ExampleDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger>
        <Text>Edit Profile</Text>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay>
          <DialogPrimitive.Content>
            <DialogPrimitive.Title>Edit profile</DialogPrimitive.Title>
            <DialogPrimitive.Description>
              Make changes to your profile here. Click save when you're done.
            </DialogPrimitive.Description>
            <DialogPrimitive.Close>
              <Text>OK</Text>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
```

## Props

TODO

### Root

| Prop | Type | Note |
| :--: | :--: | :--: |

### Trigger

| Prop | Type | Note |
| :--: | :--: | :--: |

### Portal

| Prop | Type | Note |
| :--: | :--: | :--: |

### Overlay

| Prop | Type | Note |
| :--: | :--: | :--: |

### Content

| Prop | Type | Note |
| :--: | :--: | :--: |

### Title

| Prop | Type | Note |
| :--: | :--: | :--: |

### Description

| Prop | Type | Note |
| :--: | :--: | :--: |

### Close

| Prop | Type | Note |
| :--: | :--: | :--: |

### useDialogContext

| Prop | Type | Note |
| :--: | :--: | :--: |
