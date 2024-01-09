import React from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import * as Slot from '~/lib/rn-primitives/todo/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

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

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
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
