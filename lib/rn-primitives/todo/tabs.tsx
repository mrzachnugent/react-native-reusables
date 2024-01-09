import React, { useId } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

interface RootProps {
  value: string;
  onValueChange: (value: string) => void;
}

interface RootContext extends RootProps {
  nativeID: string;
}

const TabsContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, value, onValueChange, ...viewProps }, ref) => {
  const nativeID = useId();
  const Component = asChild ? Slot.View : View;
  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange,
        nativeID,
      }}
    >
      <Component ref={ref} {...viewProps} />
    </TabsContext.Provider>
  );
});

Root.displayName = 'RootTabs';

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(
      'Tabs compound components cannot be rendered outside the Tabs component'
    );
  }
  return context;
}

const List = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='tablist' {...props} />;
});

List.displayName = 'ListTabs';

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    value: string;
  }
>(
  (
    { asChild, onPress: onPressProp, disabled, value: tabValue, ...props },
    ref
  ) => {
    const { onValueChange, value: rootValue, nativeID } = useTabsContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onValueChange(tabValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        nativeID={`${nativeID}-tab-${tabValue}`}
        aria-disabled={!!disabled}
        aria-selected={rootValue === tabValue}
        role='tab'
        onPress={onPress}
        accessibilityState={{
          selected: rootValue === tabValue,
          disabled: !!disabled,
        }}
        disabled={!!disabled}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'TriggerTabs';

const Content = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    value: string;
    forceMount?: true | undefined;
  }
>(({ asChild, forceMount, value: tabValue, ...props }, ref) => {
  const { value: rootValue, nativeID } = useTabsContext();

  if (!forceMount) {
    if (rootValue !== tabValue) {
      return null;
    }
  }

  const Component = asChild ? Slot.View : View;
  return (
    <Component
      ref={ref}
      aria-hidden={!(forceMount || rootValue === tabValue)}
      aria-labelledby={`${nativeID}-tab-${tabValue}`}
      role='tabpanel'
      {...props}
    />
  );
});

Content.displayName = 'ContentTabs';

export { Content, List, Root, Trigger };
