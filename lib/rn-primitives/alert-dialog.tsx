import { atom, useAtom, useAtomValue } from 'jotai';
import React from 'react';
import {
  GestureResponderEvent,
  Modal,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from 'react-native';
import { AtomScopeProvider } from '~/lib/rn-primitives/AtomScopeProvider';
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { useAugmentedRef } from '~/lib/rn-primitives/util-hooks';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';
import * as Dialog from '~/lib/rn-primitives/dialog';

interface RootProps {
  defaultOpen?: boolean;
  onOpenChange?: (value?: boolean) => void;
}

interface RootAtom extends Omit<RootProps, 'defaultOpen'> {
  value: boolean;
  nativeID: string;
}
const rootAtom = atom<RootAtom>({} as RootAtom);

const Root = React.forwardRef<
  React.ElementRef<typeof Dialog.Root>,
  React.ComponentPropsWithoutRef<typeof Dialog.Root>
>(({ asChild, defaultOpen = false, onOpenChange, ...viewProps }, ref) => {
  const nativeID = React.useId();
  const Slot = asChild ? ViewSlot : View;
  return (
    <AtomScopeProvider
      atom={rootAtom}
      value={{
        value: defaultOpen,
        onOpenChange,
        nativeID,
      }}
    >
      <Slot ref={ref} {...viewProps} />
    </AtomScopeProvider>
  );
});

Root.displayName = 'RootAlertDialog';

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable> & { click?: () => void },
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const [{ value, onOpenChange }, setRoot] = useAtom(rootAtom);
  const augmentedRef = React.useRef<React.ElementRef<typeof Pressable>>(null);
  useAugmentedRef({
    ref,
    augmentedRef,
    methods: { click: onPress },
    deps: [value, disabled],
  });

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    const newValue = !value;
    setRoot((prev) => ({ ...prev, value: newValue }));
    onOpenChange?.(newValue);
    onPressProp?.(ev);
  }

  const Slot = asChild ? PressableSlot : Pressable;
  return (
    <Slot
      ref={augmentedRef}
      aria-disabled={disabled ?? undefined}
      role='button'
      onPress={onPress}
      disabled={disabled ?? undefined}
      {...props}
    />
  );
});

Trigger.displayName = 'TriggerAlertDialog';

const Portal = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal> & {
    forceMount?: boolean;
  }
>(
  (
    {
      transparent = true,
      statusBarTranslucent = true,
      forceMount,
      onRequestClose: onRequestCloseProp,
      ...props
    },
    ref
  ) => {
    const [{ value, onOpenChange }, setRoot] = useAtom(rootAtom);

    function onRequestClose(ev: NativeSyntheticEvent<any>) {
      onOpenChange?.(!value);
      setRoot((prev) => ({ ...prev, value: !prev.value }));
      onRequestCloseProp?.(ev);
    }

    return (
      <Modal
        ref={ref}
        aria-hidden={!(forceMount || value)}
        transparent={transparent}
        statusBarTranslucent={statusBarTranslucent}
        onRequestClose={onRequestClose}
        visible={forceMount || value}
        {...props}
      />
    );
  }
);

Portal.displayName = 'PortalAlertDialog';

const Overlay = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    forceMount?: boolean;
    closeOnPress?: boolean;
  }
>(({ asChild, forceMount = false, closeOnPress = true, ...props }, ref) => {
  const { value } = useAtomValue(rootAtom);

  if (!forceMount) {
    if (!value) {
      return null;
    }
  }

  const Slot = asChild ? ViewSlot : View;
  return <Slot ref={ref} {...props} />;
});

Overlay.displayName = 'OverlayAlertDialog';

const Content = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & { forceMount?: boolean }
>(({ asChild, forceMount = false, ...props }, ref) => {
  const { value, nativeID } = useAtomValue(rootAtom);

  if (!forceMount) {
    if (!value) {
      return null;
    }
  }

  const Slot = asChild ? ViewSlot : View;
  return (
    <Slot
      ref={ref}
      role='alertdialog'
      nativeID={nativeID}
      aria-labelledby={`${nativeID}_label`}
      aria-describedby={`${nativeID}_desc`}
      aria-modal={true}
      {...props}
    />
  );
});

Content.displayName = 'ContentAlertDialog';

const Close = React.forwardRef<
  React.ElementRef<typeof Pressable> & { click?: () => void },
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const [{ value, onOpenChange }, setRoot] = useAtom(rootAtom);
  const augmentedRef = React.useRef<React.ElementRef<typeof Pressable>>(null);
  useAugmentedRef({
    ref,
    augmentedRef,
    methods: { click: onPress },
    deps: [value, disabled],
  });

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    setRoot((prev) => ({ ...prev, value: false }));
    onOpenChange?.(false);
    onPressProp?.(ev);
  }

  const Slot = asChild ? PressableSlot : Pressable;
  return (
    <Slot
      ref={augmentedRef}
      aria-disabled={disabled ?? undefined}
      role='button'
      onPress={onPress}
      disabled={disabled ?? undefined}
      {...props}
    />
  );
});

Close.displayName = 'CloseAlertDialog';

const Action = React.forwardRef<
  React.ElementRef<typeof Pressable> & { click?: () => void },
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const [{ value, onOpenChange }, setRoot] = useAtom(rootAtom);
  const augmentedRef = React.useRef<React.ElementRef<typeof Pressable>>(null);
  useAugmentedRef({
    ref,
    augmentedRef,
    methods: { click: onPress },
    deps: [value, disabled],
  });

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    setRoot((prev) => ({ ...prev, value: false }));
    onOpenChange?.(false);
    onPressProp?.(ev);
  }

  const Slot = asChild ? PressableSlot : Pressable;
  return (
    <Slot
      ref={augmentedRef}
      aria-disabled={disabled ?? undefined}
      role='button'
      onPress={onPress}
      disabled={disabled ?? undefined}
      {...props}
    />
  );
});

Action.displayName = 'ActionAlertDialog';

const Title = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  const { nativeID } = useAtomValue(rootAtom);
  return (
    <Text ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />
  );
});

Title.displayName = 'TitleAlertDialog';

const Description = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  const { nativeID } = useAtomValue(rootAtom);
  return (
    <Text ref={ref} role='heading' nativeID={`${nativeID}_desc`} {...props} />
  );
});

Description.displayName = 'DescriptionAlertDialog';

export {
  Action,
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
};
