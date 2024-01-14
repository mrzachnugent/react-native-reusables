import * as Toggle from '@radix-ui/react-toggle';
import React from 'react';
import { Pressable, type GestureResponderEvent } from 'react-native';
import * as Slot from '../slot';
import type { PressableRef, SlottablePressableProps } from '../types';
import type { ToggleRootProps } from './types';

const Root = React.forwardRef<
  PressableRef,
  SlottablePressableProps & ToggleRootProps
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
      const newValue = !pressed;
      onPressedChange(newValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Toggle.Root
        pressed={pressed}
        onPressedChange={onPressedChange}
        disabled={disabled}
        asChild
      >
        <Component
          ref={ref}
          onPress={onPress}
          disabled={disabled}
          role='button'
          {...props}
        />
      </Toggle.Root>
    );
  }
);

Root.displayName = 'RootWebToggle';

export { Root };
