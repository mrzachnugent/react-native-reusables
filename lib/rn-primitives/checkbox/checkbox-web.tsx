import * as Checkbox from '@radix-ui/react-checkbox';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { useAugmentedRef } from '../hooks/useAugmentedRef';
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
      role: _role,
      ...props
    },
    ref
  ) => {
    const augmentedRef = React.useRef<PressableRef>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    useAugmentedRef({
      augmentedRef,
      ref,
    });

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onCheckedChange(!checked);
    }

    React.useEffect(() => {
      if (augmentedRef.current) {
        const auggRef = augmentedRef.current as unknown as HTMLButtonElement;
        auggRef.dataset.state = checked ? 'checked' : 'unchecked';
        auggRef.type = 'button';
        auggRef.role = 'checkbox';
        auggRef.value = checked ? 'on' : 'off';
      }
    }, [checked]);

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
          ref={augmentedRef}
          role='button'
          onPress={onPress}
          disabled={disabled}
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
    <Checkbox.Indicator forceMount={forceMount} asChild>
      <Component ref={ref} {...props} />
    </Checkbox.Indicator>
  );
});

Indicator.displayName = 'IndicatorWebCheckbox';

export { Indicator, Root };
