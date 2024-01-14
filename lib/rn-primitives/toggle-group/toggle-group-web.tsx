import * as ToggleGroup from '@radix-ui/react-toggle-group';
import React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import * as Slot from '../slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../types';
import { ToggleGroupUtils } from '../utils';
import type { ToggleGroupItemProps, ToggleGroupRootProps } from './types';

const ToggleGroupContext = React.createContext<ToggleGroupRootProps | null>(
  null
);

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & ToggleGroupRootProps
>(
  (
    {
      asChild,
      type,
      value,
      onValueChange,
      disabled = false,
      rovingFocus,
      orientation,
      dir,
      loop,
      ...viewProps
    },
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
          } as ToggleGroupRootProps
        }
      >
        <ToggleGroup.Root
          type={type as any}
          value={value as any}
          onValueChange={onValueChange as any}
          disabled={disabled}
          rovingFocus={rovingFocus}
          orientation={orientation}
          dir={dir}
          loop={loop}
          asChild
        >
          <Component ref={ref} {...viewProps} />
        </ToggleGroup.Root>
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
  PressableRef,
  SlottablePressableProps & ToggleGroupItemProps
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
      onPressProp?.(ev);
      if (type === 'single') {
        onValueChange(ToggleGroupUtils.getNewSingleValue(value, itemValue));
      }
      if (type === 'multiple') {
        onValueChange(ToggleGroupUtils.getNewMultipleValue(value, itemValue));
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ToggleGroup.Item value={itemValue} asChild>
        <Component
          ref={ref}
          onPress={onPress}
          disabled={disabled || disabledProp}
          role='button'
          {...props}
        />
      </ToggleGroup.Item>
    );
  }
);

Item.displayName = 'ItemToggleGroup';

export { Item, Root };
