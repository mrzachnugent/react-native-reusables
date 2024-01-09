import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

interface RootProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Root = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & RootProps
>(
  (
    {
      asChild,
      checked,
      onCheckedChange,
      disabled,
      onPress: onPressProp,
      'aria-valuetext': ariaValueText,
      ...props
    },
    ref
  ) => {
    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onCheckedChange(!checked);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        aria-disabled={disabled}
        role='switch'
        aria-checked={checked}
        aria-valuetext={ariaValueText ?? checked ? 'on' : 'off'}
        onPress={onPress}
        accessibilityState={{
          checked,
          disabled,
        }}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Root.displayName = 'RootSwitch';

const Thumb = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='presentation' {...props} />;
});

Root.displayName = 'RootSwitch';

export { Root, Thumb };
