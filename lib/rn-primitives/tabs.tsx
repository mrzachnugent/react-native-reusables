import React, { useId } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootProps {
  value: string;
  onValueChange: (value: string) => void;
}

interface RootContext extends RootProps {
  nativeID: string;
}

const TabsContext = React.createContext({} as RootContext);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, value, onValueChange, ...viewProps }, ref) => {
  const nativeID = useId();
  const Slot = asChild ? ViewSlot : View;
  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange,
        nativeID,
      }}
    >
      <Slot ref={ref} {...viewProps} />
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
  const Slot = asChild ? ViewSlot : View;
  return <Slot ref={ref} role='tablist' {...props} />;
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

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <Slot
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
    forceMount?: boolean;
  }
>(({ asChild, forceMount = false, value: tabValue, ...props }, ref) => {
  const { value: rootValue, nativeID } = useTabsContext();

  if (!forceMount) {
    if (rootValue !== tabValue) {
      return null;
    }
  }

  const Slot = asChild ? ViewSlot : View;
  return (
    <Slot
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
