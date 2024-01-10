import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';
import { View } from 'react-native';
import * as Slot from '../slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../types';
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionRootProps,
} from './types';

const Root = React.forwardRef<ViewRef, SlottableViewProps & AccordionRootProps>(
  (
    {
      asChild,
      value,
      onValueChange,
      type,
      disabled,
      dir,
      orientation,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Accordion.Root
        asChild
        value={value as any}
        onValueChange={onValueChange as any}
        disabled={disabled}
        type={type as any}
        dir={dir}
        orientation={orientation}
      >
        <Component ref={ref} {...props} />
      </Accordion.Root>
    );
  }
);

Root.displayName = 'RootWebAccordion';

const Item = React.forwardRef<ViewRef, AccordionItemProps & SlottableViewProps>(
  ({ asChild, value, disabled, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Accordion.Item value={value} disabled={disabled} asChild>
        <Component ref={ref} {...props} />
      </Accordion.Item>
    );
  }
);

Item.displayName = 'ItemWebAccordion';

const Header = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Accordion.Header asChild>
        <Component ref={ref} {...props} />
      </Accordion.Header>
    );
  }
);

Header.displayName = 'HeaderWebAccordion';

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Slot.Pressable;
    return (
      <Accordion.Trigger asChild>
        <Component ref={ref} role='button' {...props} />
      </Accordion.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebAccordion';

const Content = React.forwardRef<
  ViewRef,
  AccordionContentProps & SlottableViewProps
>(({ asChild, forceMount, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Accordion.Content forceMount={forceMount} asChild>
      <Component ref={ref} {...props} />
    </Accordion.Content>
  );
});

Content.displayName = 'ContentWebAccordion';

export { Content, Header, Item, Root, Trigger };
