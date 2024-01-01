import { atom, useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { AtomScopeProvider } from '~/lib/rn-primitives/AtomScopeProvider';
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { useAugmentedRef } from '~/lib/rn-primitives/util-hooks';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked?: boolean) => void;
}

interface RootAtom extends Omit<RootProps, 'defaultChecked'> {
  checked: boolean;
  nativeID?: string;
}
const rootAtom = atom<RootAtom>({} as RootAtom);

const Root = React.forwardRef<
  React.ElementRef<typeof Pressable> & { click?: () => void },
  ComponentPropsWithAsChild<typeof Pressable> & RootProps
>(
  (
    {
      asChild,
      disabled = false,
      defaultChecked = false,
      onCheckedChange,
      nativeID,
      ...props
    },
    ref
  ) => {
    return (
      <AtomScopeProvider
        atom={rootAtom}
        value={{
          disabled,
          checked: defaultChecked,
          onCheckedChange,
          nativeID,
        }}
      >
        <Trigger ref={ref} {...props} />
      </AtomScopeProvider>
    );
  }
);

Root.displayName = 'RootCheckbox';

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable> & { click?: () => void },
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, ...props }, ref) => {
  const [{ disabled, checked, onCheckedChange, nativeID }, setRoot] =
    useAtom(rootAtom);
  const augmentedRef = React.useRef<React.ElementRef<typeof Pressable>>(null);
  useAugmentedRef({
    ref,
    augmentedRef,
    methods: { click: onPress },
    deps: [disabled, checked],
  });

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    const newValue = !checked;
    setRoot((prev) => ({ ...prev, checked: newValue }));
    onCheckedChange?.(newValue);
    onPressProp?.(ev);
  }

  const Slot = asChild ? PressableSlot : Pressable;
  return (
    <Slot
      ref={augmentedRef}
      nativeID={nativeID}
      aria-disabled={disabled}
      role='checkbox'
      aria-checked={checked}
      onPress={onPress}
      accessibilityState={{
        checked,
        disabled,
      }}
      disabled={disabled}
      {...props}
    />
  );
});

Trigger.displayName = 'TriggerCheckbox';

const Indicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & { forceMount?: boolean }
>(({ asChild, forceMount = false, ...props }, ref) => {
  const { checked, disabled } = useAtomValue(rootAtom);

  if (!forceMount) {
    if (!checked) {
      return null;
    }
  }

  const Slot = asChild ? ViewSlot : View;
  return (
    <Slot
      ref={ref}
      aria-disabled={disabled}
      aria-hidden={!(forceMount || checked)}
      role={'presentation'}
      {...props}
    />
  );
});

Indicator.displayName = 'IndicatorCheckbox';

export { Indicator, Root };
