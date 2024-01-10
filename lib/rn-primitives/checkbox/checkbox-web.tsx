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
      onKeyDown: onKeyDownProp,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onCheckedChange(!checked);
    }

    function onKeyDown(ev: React.KeyboardEvent) {
      onKeyDownProp?.(ev);
      if (ev.key === 'Enter' || ev.key === ' ') {
        onCheckedChange(!checked);
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Checkbox.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        ref={buttonRef}
        asChild
      >
        <Component
          ref={ref}
          // @ts-expect-error - web only
          onKeyDown={onKeyDown}
          onPress={onPress}
          {...props}
        />
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
