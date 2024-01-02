import React from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { PressableSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  disabled?: boolean;
}

const Root = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & RootProps
>(
  (
    {
      asChild,
      pressed,
      onPressedChange,
      disabled,
      onPress: onPressProp,
      ...props
    },
    ref
  ) => {
    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      const newValue = !pressed;
      onPressedChange(newValue);
      onPressProp?.(ev);
    }

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <Slot
        ref={ref}
        aria-disabled={disabled}
        role='switch'
        aria-selected={pressed}
        onPress={onPress}
        accessibilityState={{
          selected: pressed,
          disabled,
        }}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Root.displayName = 'RootToggle';

export { Root };
