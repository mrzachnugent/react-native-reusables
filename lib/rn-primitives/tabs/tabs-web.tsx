import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';
import { Pressable, View } from 'react-native';
import * as Slot from '../slot';
import type {
  ComponentPropsWithAsChild,
  SlottableViewProps,
  ViewRef,
} from '../types';
import type { TabsContentProps, TabsRootProps } from './types';

const Root = React.forwardRef<ViewRef, SlottableViewProps & TabsRootProps>(
  (
    {
      asChild,
      value,
      onValueChange,
      orientation,
      dir,
      activationMode,
      ...viewProps
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Tabs.Root
        value={value}
        onValueChange={onValueChange}
        orientation={orientation}
        dir={dir}
        activationMode={activationMode}
        asChild
      >
        <Component ref={ref} {...viewProps} />
      </Tabs.Root>
    );
  }
);

Root.displayName = 'RootNativeTabs';

const List = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Tabs.List asChild>
        <Component ref={ref} {...props} />
      </Tabs.List>
    );
  }
);

List.displayName = 'ListNativeTabs';

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    value: string;
  }
>(({ asChild, value: tabValue, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Tabs.Trigger value={tabValue} asChild>
      <Component ref={ref} {...props} />
    </Tabs.Trigger>
  );
});

Trigger.displayName = 'TriggerNativeTabs';

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & TabsContentProps
>(({ asChild, forceMount, value, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Tabs.Content value={value} asChild>
      <Component ref={ref} {...props} />
    </Tabs.Content>
  );
});

Content.displayName = 'ContentNativeTabs';

export { Content, List, Root, Trigger };
