import { atom, useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { AtomScopeProvider } from '~/lib/rn-primitives/AtomScopeProvider';
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { useAugmentedRef } from '~/lib/rn-primitives/util-hooks';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootProps {
  disabled?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open?: boolean) => void;
}

interface RootAtom extends Omit<RootProps, 'defaultOpen'> {
  open: boolean;
  nativeID: string;
}
const rootAtom = atom<RootAtom>({} as RootAtom);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(
  (
    {
      asChild,
      disabled = false,
      defaultOpen = false,
      onOpenChange,
      ...viewProps
    },
    ref
  ) => {
    const nativeID = React.useId();

    const Slot = asChild ? ViewSlot : View;
    return (
      <AtomScopeProvider
        atom={rootAtom}
        value={{
          disabled,
          open: defaultOpen,
          onOpenChange,
          nativeID,
        }}
      >
        <Slot ref={ref} {...viewProps} />
      </AtomScopeProvider>
    );
  }
);

Root.displayName = 'RootCollapsible';

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable> & { click?: () => void },
  ComponentPropsWithAsChild<typeof Pressable>
>(
  (
    { asChild, onPress: onPressProp, disabled: disabledProp = false, ...props },
    ref
  ) => {
    const [{ disabled, open, onOpenChange, nativeID }, setRoot] =
      useAtom(rootAtom);
    const augmentedRef = React.useRef<React.ElementRef<typeof Pressable>>(null);
    useAugmentedRef({
      ref,
      augmentedRef,
      methods: { click: onPress },
      deps: [disabled, disabledProp, open],
    });

    function onPress(ev: GestureResponderEvent) {
      if (disabled || disabledProp) return;
      const newValue = !open;
      setRoot((prev) => ({ ...prev, open: newValue }));
      onOpenChange?.(newValue);
      onPressProp?.(ev);
    }

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <Slot
        ref={augmentedRef}
        nativeID={nativeID}
        aria-disabled={(disabled || disabledProp) ?? undefined}
        role='button'
        onPress={onPress}
        accessibilityState={{
          expanded: open,
          disabled: (disabled || disabledProp) ?? undefined,
        }}
        disabled={disabled || disabledProp}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'TriggerCollapsible';

const Content = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & { forceMount?: boolean }
>(({ asChild, forceMount = false, ...props }, ref) => {
  const { nativeID, open } = useAtomValue(rootAtom);

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  const Slot = asChild ? ViewSlot : View;
  return (
    <Slot
      ref={ref}
      aria-hidden={!(forceMount || open)}
      aria-labelledby={nativeID}
      role={'region'}
      {...props}
    />
  );
});

Content.displayName = 'ContentCollapsible';

export { Content, Root, Trigger };
