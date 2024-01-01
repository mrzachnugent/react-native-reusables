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
import { PropsWithAsChild } from '~/lib/rn-primitives/utils';

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
  React.ElementRef<typeof View>,
  PropsWithAsChild<typeof View> & RootProps
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

Root.displayName = 'RootDialog';

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable> & { press?: () => void },
  PropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const [{ value, onOpenChange }, setRoot] = useAtom(rootAtom);
  const augmentedRef = React.useRef<React.ElementRef<typeof Pressable>>(null);
  useAugmentedRef({
    ref,
    augmentedRef,
    methods: { press: onPress },
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

Trigger.displayName = 'TriggerDialog';

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

Portal.displayName = 'PortalDialog';

const Overlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  PropsWithAsChild<typeof Pressable> & {
    forceMount?: boolean;
    closeOnPress?: boolean;
    children: NonNullable<PropsWithAsChild<typeof Pressable>['children']>;
  }
>(
  (
    {
      asChild,
      forceMount = false,
      closeOnPress = true,
      onPress: OnPressProp,
      ...props
    },
    ref
  ) => {
    const [{ value, onOpenChange }, setRoot] = useAtom(rootAtom);

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        onOpenChange?.(!value);
        setRoot((prev) => ({ ...prev, value: !prev.value }));
      }
      OnPressProp?.(ev);
    }

    if (!forceMount) {
      if (!value) {
        return null;
      }
    }

    const Slot = asChild ? PressableSlot : Pressable;
    return <Slot ref={ref} onPress={onPress} {...props} />;
  }
);

Overlay.displayName = 'OverlayDialog';

const Content = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  PropsWithAsChild<typeof Pressable> & { forceMount?: boolean }
>(({ asChild, forceMount = false, ...props }, ref) => {
  const { value, nativeID } = useAtomValue(rootAtom);

  if (!forceMount) {
    if (!value) {
      return null;
    }
  }

  const Slot = asChild ? PressableSlot : Pressable;
  return (
    <Slot
      ref={ref}
      role='dialog'
      nativeID={nativeID}
      aria-labelledby={`${nativeID}_label`}
      aria-describedby={`${nativeID}_desc`}
      aria-modal={true}
      {...props}
    />
  );
});

Content.displayName = 'ContentDialog';

const Close = React.forwardRef<
  React.ElementRef<typeof Pressable> & { press?: () => void },
  PropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const [{ value, onOpenChange }, setRoot] = useAtom(rootAtom);
  const augmentedRef = React.useRef<React.ElementRef<typeof Pressable>>(null);
  useAugmentedRef({
    ref,
    augmentedRef,
    methods: { press: onPress },
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

Close.displayName = 'CloseDialog';

const Title = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  const { nativeID } = useAtomValue(rootAtom);
  return (
    <Text ref={ref} role='heading' nativeID={`${nativeID}_label`} {...props} />
  );
});

Title.displayName = 'TitleDialog';

const Description = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  const { nativeID } = useAtomValue(rootAtom);
  return (
    <Text ref={ref} role='heading' nativeID={`${nativeID}_desc`} {...props} />
  );
});

Description.displayName = 'DescriptionDialog';

export { Close, Content, Description, Overlay, Portal, Root, Title, Trigger };
