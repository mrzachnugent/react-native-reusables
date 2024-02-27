import * as Toggle from '@radix-ui/react-toggle';
import * as React from 'react';
import { Pressable, type GestureResponderEvent } from 'react-native';
import * as Slot from '@rnr/slot';
import type { PressableRef, SlottablePressableProps } from '@rnr/types';
import type { ToggleRootProps } from './types';

const Root = React.forwardRef<PressableRef, SlottablePressableProps & ToggleRootProps>(
  ({ asChild, pressed, onPressedChange, disabled, onPress: onPressProp, ...props }, ref) => {
    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onPressedChange(!pressed);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Toggle.Root pressed={pressed} onPressedChange={onPressedChange} disabled={disabled} asChild>
        <Component ref={ref} onPress={onPress} disabled={disabled} role='button' {...props} />
      </Toggle.Root>
    );
  }
);

Root.displayName = 'RootWebToggle';

export { Root };
