import * as Checkbox from '@radix-ui/react-checkbox';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import * as Slot from '../slot';
import type {
  ComponentPropsWithAsChild,
  PressableRef,
  SlottablePressableProps,
} from '../types';
import type { CheckboxIndicator, CheckboxRootProps } from './types';

const Root = React.forwardRef<
  PressableRef,
  SlottablePressableProps & CheckboxRootProps
>(
  (
    {
      asChild,
      disabled = false,
      checked,
      onCheckedChange,
      onPress: onPressProp,
      nativeID,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Checkbox.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        ref={buttonRef}
        tabIndex={-1}
      >
        <Component ref={ref} role='button' onPress={onPress} {...props} />
      </Checkbox.Root>
    );
  }
);

Root.displayName = 'RootWebCheckbox';

const Indicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & CheckboxIndicator
>(({ asChild, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Checkbox.Indicator forceMount={forceMount}>
      <Component ref={ref} {...props} />
    </Checkbox.Indicator>
  );
});

Indicator.displayName = 'IndicatorWebCheckbox';

export { Indicator, Root };
