import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import * as ToggleGroupUtils from '~/lib/rn-primitives/todo/toggle-group-utils';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

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
        onValueChange(ToggleGroupUtils.getNewSingleValue(value, itemValue));
      }
      if (type === 'multiple') {
        onValueChange(ToggleGroupUtils.getNewMultipleValue(value, itemValue));
      }
      onPressProp?.(ev);
    }

    const isChecked =
      type === 'single'
        ? ToggleGroupUtils.getIsSelected(value, itemValue)
        : undefined;
    const isSelected =
      type === 'multiple'
        ? ToggleGroupUtils.getIsSelected(value, itemValue)
        : undefined;

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
