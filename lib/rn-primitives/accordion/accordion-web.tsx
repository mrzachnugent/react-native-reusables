import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';
import { View } from 'react-native';
import type {
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionRootProps,
  AccordionTriggerProps,
} from '~/lib/rn-primitives/accordion/types';
import * as Slot from '~/lib/rn-primitives/todo/slot';
import {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '~/lib/rn-primitives/types';
import { useTrigger } from '~/lib/rn-primitives/hooks/useTrigger';
import { useAugmentedRef } from '~/lib/rn-primitives/hooks/useAugmentedRef';

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps &
    AccordionRootProps & {
      dir?: 'ltr' | 'rtl';
      orientation?: 'vertical' | 'horizontal';
    }
>(
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

const Header = React.forwardRef<
  ViewRef,
  AccordionHeaderProps & SlottableViewProps
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Accordion.Header asChild>
      <Component ref={ref} {...props} />
    </Accordion.Header>
  );
});

Header.displayName = 'HeaderWebAccordion';

const Trigger = React.forwardRef<
  PressableRef,
  AccordionTriggerProps & SlottablePressableProps
>(({ asChild, ...props }, ref) => {
  const augmentedRef = React.useRef<PressableRef>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { htmlButtonProps, pressableProps } = useTrigger(buttonRef, props);
  useAugmentedRef({ augmentedRef, ref });

  function onFocus() {
    augmentedRef.current?.focus();
  }

  const Component = asChild ? Slot.Pressable : Slot.Pressable;
  return (
    <>
      <Accordion.Trigger
        ref={buttonRef}
        onFocus={onFocus}
        {...htmlButtonProps}
      />
      <Component ref={augmentedRef} {...pressableProps} />
    </>
  );
});

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
