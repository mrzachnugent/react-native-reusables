import * as React from 'react';
import { Pressable, type GestureResponderEvent } from 'react-native';
import * as Slot from '@rnr/slot';
import type { PressableRef, SlottablePressableProps } from '@rnr/types';
import type { ToggleRootProps } from './types';

const Root = React.forwardRef<PressableRef, SlottablePressableProps & ToggleRootProps>(
  ({ asChild, pressed, onPressedChange, disabled, onPress: onPressProp, ...props }, ref) => {
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

Root.displayName = 'RootNativeToggle';

export { Root };
