import * as Toolbar from '@radix-ui/react-toolbar';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import * as Slot from '@rnr/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr/types';
import { ToggleGroupUtils } from '@rnr/utils';
import type { ToolbarRootProps, ToolbarToggleGroupProps, ToolbarToggleItem } from './types';

const Root = React.forwardRef<ViewRef, SlottableViewProps & ToolbarRootProps>(
  ({ asChild, orientation, dir, loop, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Toolbar.Root orientation={orientation} dir={dir} loop={loop} asChild>
        <Component ref={ref} {...props} />
      </Toolbar.Root>
    );
  }
);

Root.displayName = 'RootWebToolbar';

const ToggleGroupContext = React.createContext<ToolbarToggleGroupProps | null>(null);

const ToggleGroup = React.forwardRef<ViewRef, SlottableViewProps & ToolbarToggleGroupProps>(
  ({ asChild, type, value, onValueChange, disabled = false, ...viewProps }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <ToggleGroupContext.Provider
        value={
          {
            type,
            value,
            disabled,
            onValueChange,
          } as ToolbarToggleGroupProps
        }
      >
        <Toolbar.ToggleGroup
          type={type as any}
          value={value as any}
          onValueChange={onValueChange as any}
          disabled={disabled}
          asChild
        >
          <Component ref={ref} {...viewProps} />
        </Toolbar.ToggleGroup>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = 'ToggleGroupWebToolbar';

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (!context) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const ToggleItem = React.forwardRef<PressableRef, SlottablePressableProps & ToolbarToggleItem>(
  (
    { asChild, value: itemValue, disabled: disabledProp = false, onPress: onPressProp, ...props },
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

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Toolbar.ToggleItem value={itemValue} asChild>
        <Component ref={ref} onPress={onPress} role='button' {...props} />
      </Toolbar.ToggleItem>
    );
  }
);

ToggleItem.displayName = 'ToggleItemWebToolbar';

const Separator = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} {...props} />;
});

Separator.displayName = 'SeparatorWebToolbar';

const Link = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Toolbar.Link asChild>
        <Component ref={ref} {...props} />
      </Toolbar.Link>
    );
  }
);

Link.displayName = 'LinkWebToolbar';

const Button = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Toolbar.Button asChild>
        <Component ref={ref} role='button' {...props} />
      </Toolbar.Button>
    );
  }
);

export { Button, Link, Root, Separator, ToggleGroup, ToggleItem };
