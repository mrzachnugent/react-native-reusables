import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

type SingleRootProps = {
  type: 'single';
  value: string | undefined;
  onValueChange: (val: string | undefined) => void;
};

type MultipleRootProps = {
  type: 'multiple';
  value: string[];
  onValueChange: (val: string[]) => void;
};

type RootProps = (SingleRootProps | MultipleRootProps) & {
  disabled?: boolean;
};

const ToggleGroupContext = React.createContext<RootProps | null>(null);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(
  (
    { asChild, type, value, onValueChange, disabled = false, ...viewProps },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
    return (
      <ToggleGroupContext.Provider
        value={
          {
            type,
            value,
            disabled,
            onValueChange,
          } as RootProps
        }
      >
        <Component ref={ref} role='group' {...viewProps} />
      </ToggleGroupContext.Provider>
    );
  }
);

Root.displayName = 'RootToggleGroup';

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const Item = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    value: string;
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
    const { type, disabled, value, onValueChange } = useToggleGroupContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled || disabledProp) return;
      if (type === 'single') {
        onValueChange(getNewSingleValue(value, itemValue));
      }
      if (type === 'multiple') {
        onValueChange(getNewMultipleValue(value, itemValue));
      }
      onPressProp?.(ev);
    }

    const isChecked =
      type === 'single' ? getIsSelected(value, itemValue) : undefined;
    const isSelected =
      type === 'multiple' ? getIsSelected(value, itemValue) : undefined;

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        aria-disabled={disabled}
        role={type === 'single' ? 'radio' : 'checkbox'}
        onPress={onPress}
        aria-checked={isChecked}
        aria-selected={isSelected}
        disabled={(disabled || disabledProp) ?? false}
        accessibilityState={{
          disabled: (disabled || disabledProp) ?? false,
          checked: isChecked,
          selected: isSelected,
        }}
        {...props}
      />
    );
  }
);

Item.displayName = 'ItemToggleGroup';

export { Item, Root };

function getIsSelected(
  value: string | string[] | undefined,
  itemValue: string
) {
  if (value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value === itemValue;
  }
  return value.includes(itemValue);
}

function getNewSingleValue(
  originalValue: string | string[] | undefined,
  itemValue: string
) {
  if (originalValue === itemValue) {
    return undefined;
  }
  return itemValue;
}

function getNewMultipleValue(
  originalValue: string | string[] | undefined,
  itemValue: string
) {
  if (originalValue === undefined) {
    return [itemValue];
  }
  if (typeof originalValue === 'string') {
    return originalValue === itemValue ? [] : [originalValue, itemValue];
  }
  if (originalValue.includes(itemValue)) {
    return originalValue.filter((v) => v !== itemValue);
  }
  return [...originalValue, itemValue];
}
