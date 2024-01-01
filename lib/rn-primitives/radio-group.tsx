import { atom, useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { AtomScopeProvider } from '~/lib/rn-primitives/AtomScopeProvider';
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';
import { useAugmentedRef } from './util-hooks';

interface RootProps {
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  disabled?: boolean;
}

interface RootAtom extends Omit<RootProps, 'defaultValue'> {
  value: string | undefined;
  disabled: boolean;
}
const rootAtom = atom({} as RootAtom);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(
  (
    { asChild, defaultValue, onValueChange, disabled = false, ...viewProps },
    ref
  ) => {
    const Slot = asChild ? ViewSlot : View;
    return (
      <AtomScopeProvider
        atom={rootAtom}
        value={{
          value: defaultValue,
          disabled,
          onValueChange,
        }}
      >
        <Slot ref={ref} role='radiogroup' {...viewProps} />
      </AtomScopeProvider>
    );
  }
);

Root.displayName = 'RootRadioGroup';

interface ItemAtom {
  value: string | undefined;
}
const itemAtom = atom({} as ItemAtom);

const Item = React.forwardRef<
  React.ElementRef<typeof Pressable> & {
    click?: () => void;
  },
  ComponentPropsWithAsChild<typeof Pressable> & {
    value: string;
    /**
     * nativeID of the label element that describes this radio group item
     */
    'aria-labelledby': string;
  }
>(
  (
    {
      asChild,
      value: valueProp,
      disabled: disabledProp = false,
      onPress: onPressProp,
      ...props
    },
    ref
  ) => {
    const [{ disabled, value, onValueChange }, setRoot] = useAtom(rootAtom);
    const augmentedRef = React.useRef<React.ElementRef<typeof Pressable>>(null);
    useAugmentedRef({
      ref,
      augmentedRef,
      methods: { click: onPress },
      deps: [valueProp, disabled, disabledProp],
    });

    function onPress(ev: GestureResponderEvent) {
      if (disabled || disabledProp) return;
      setRoot((prev) => ({ ...prev, value: valueProp }));
      onValueChange?.(valueProp);
      onPressProp?.(ev);
    }

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <AtomScopeProvider
        atom={itemAtom}
        value={{
          value: valueProp,
        }}
      >
        <Slot
          ref={augmentedRef}
          role='radio'
          onPress={onPress}
          aria-checked={value === valueProp}
          disabled={(disabled || disabledProp) ?? false}
          accessibilityState={{
            disabled: (disabled || disabledProp) ?? false,
            checked: value === valueProp,
          }}
          {...props}
        />
      </AtomScopeProvider>
    );
  }
);

Item.displayName = 'ItemRadioGroup';

const Indicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    forceMount?: boolean;
  }
>(({ asChild, forceMount, ...props }, ref) => {
  const { value } = useAtomValue(rootAtom);
  const { value: itemValue } = useAtomValue(itemAtom);

  if (!forceMount) {
    if (value !== itemValue) {
      return null;
    }
  }
  const Slot = asChild ? ViewSlot : View;
  return <Slot ref={ref} role='presentation' {...props} />;
});

Indicator.displayName = 'IndicatorAvatar';

export { Indicator, Item, Root };
