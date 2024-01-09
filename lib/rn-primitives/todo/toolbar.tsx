import React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/todo/slot';
import * as ToggleGroupUtils from '~/lib/rn-primitives/todo/toggle-group-utils';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='toolbar' {...props} />;
});

Root.displayName = 'RootToolbar';

type SingleToggleGroupProps = {
  type: 'single';
  value: string | undefined;
  onValueChange: (val: string | undefined) => void;
};

type MultipleToggleGroupProps = {
  type: 'multiple';
  value: string[];
  onValueChange: (val: string[]) => void;
};

type ToggleGroupProps = (SingleToggleGroupProps | MultipleToggleGroupProps) & {
  disabled?: boolean;
};

const ToggleGroupContext = React.createContext<ToggleGroupProps | null>(null);

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & ToggleGroupProps
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
          } as ToggleGroupProps
        }
      >
        <Component ref={ref} role='group' {...viewProps} />
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = 'ToggleGroupToolbar';

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const ToggleItem = React.forwardRef<
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

ToggleItem.displayName = 'ToggleItemToolbar';

interface SeparatorProps {
  decorative?: boolean;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & SeparatorProps
>(({ asChild, decorative, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Component
      role={decorative ? 'presentation' : 'separator'}
      ref={ref}
      {...props}
    />
  );
});

Separator.displayName = 'SeparatorToolbar';

const Link = React.forwardRef<
  React.ElementRef<typeof Text>,
  ComponentPropsWithAsChild<typeof Text>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : Text;
  return <Component ref={ref} role='link' {...props} />;
});

Link.displayName = 'LinkToolbar';

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} role='button' {...props} />;
});

export { Button, Link, Root, Separator, ToggleGroup, ToggleItem };
