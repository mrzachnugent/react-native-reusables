import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootProps {
  value: string | undefined;
  onValueChange: (val: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext({} as RootProps);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, value, onValueChange, disabled = false, ...viewProps }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <RadioGroupContext.Provider
      value={{
        value,
        disabled,
        onValueChange,
      }}
    >
      <Component ref={ref} role='radiogroup' {...viewProps} />
    </RadioGroupContext.Provider>
  );
});

Root.displayName = 'RootRadioGroup';

function useRadioGroupContext() {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error(
      'RadioGroup compound components cannot be rendered outside the RadioGroup component'
    );
  }
  return context;
}

interface RadioItemContext {
  itemValue: string | undefined;
}

const RadioItemContext = React.createContext({} as RadioItemContext);

const Item = React.forwardRef<
  React.ElementRef<typeof Pressable>,
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
      value: itemValue,
      disabled: disabledProp = false,
      onPress: onPressProp,
      ...props
    },
    ref
  ) => {
    const { disabled, value, onValueChange } = useRadioGroupContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled || disabledProp) return;
      onValueChange(itemValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <RadioItemContext.Provider
        value={{
          itemValue: itemValue,
        }}
      >
        <Component
          ref={ref}
          role='radio'
          onPress={onPress}
          aria-checked={value === itemValue}
          disabled={(disabled || disabledProp) ?? false}
          accessibilityState={{
            disabled: (disabled || disabledProp) ?? false,
            checked: value === itemValue,
          }}
          {...props}
        />
      </RadioItemContext.Provider>
    );
  }
);

Item.displayName = 'ItemRadioGroup';

function useRadioItemContext() {
  const context = React.useContext(RadioItemContext);
  if (!context) {
    throw new Error(
      'RadioItem compound components cannot be rendered outside the RadioItem component'
    );
  }
  return context;
}

const Indicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    forceMount?: boolean;
  }
>(({ asChild, forceMount, ...props }, ref) => {
  const { value } = useRadioGroupContext();
  const { itemValue } = useRadioItemContext();

  if (!forceMount) {
    if (value !== itemValue) {
      return null;
    }
  }
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='presentation' {...props} />;
});

Indicator.displayName = 'IndicatorRadioGroup';

export { Indicator, Item, Root };
