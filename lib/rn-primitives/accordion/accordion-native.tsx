import React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import * as Slot from '../slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../types';
import type {
  AccordionContentProps,
  AccordionContext,
  AccordionItemContext,
  AccordionItemProps,
  AccordionRootProps,
} from './types';

const AccordionContext = React.createContext<AccordionContext | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & AccordionRootProps>(
  (
    {
      asChild,
      type,
      disabled,
      collapsable = true,
      value,
      onValueChange,
      ...viewProps
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;

    return (
      <AccordionContext.Provider
        value={
          {
            type,
            disabled,
            collapsable,
            value,
            onValueChange,
          } as AccordionContext
        }
      >
        <Component ref={ref} {...viewProps} />
      </AccordionContext.Provider>
    );
  }
);

Root.displayName = 'RootNativeAccordion';

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion compound components cannot be rendered outside the Accordion component'
    );
  }
  return context;
}

const AccordionItemContext = React.createContext<AccordionItemContext | null>(
  null
);

const Item = React.forwardRef<ViewRef, SlottableViewProps & AccordionItemProps>(
  ({ asChild, value, disabled, ...viewProps }, ref) => {
    const nativeID = React.useId();

    const Component = asChild ? Slot.View : View;
    return (
      <AccordionItemContext.Provider
        value={{
          value,
          disabled,
          nativeID,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </AccordionItemContext.Provider>
    );
  }
);

Item.displayName = 'ItemNativeAccordion';

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem compound components cannot be rendered outside the AccordionItem component'
    );
  }
  return context;
}

const Header = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const { disabled: rootDisabled, value: rootValue } = useAccordionContext();
    const { disabled: itemDisabled, value } = useAccordionItemContext();

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        role='heading'
        aria-expanded={isItemExpanded(rootValue, value)}
        aria-disabled={rootDisabled ?? itemDisabled}
        {...props}
      />
    );
  }
);

Header.displayName = 'HeaderNativeAccordion';

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  (
    { asChild, onPress: onPressProp, disabled: disabledProp, ...props },
    ref
  ) => {
    const {
      disabled: rootDisabled,
      type,
      onValueChange,
      value: rootValue,
      collapsible,
    } = useAccordionContext();
    const {
      nativeID,
      disabled: itemDisabled,
      value,
    } = useAccordionItemContext();

    function onPress(ev: GestureResponderEvent) {
      if (rootDisabled || itemDisabled) return;
      if (type === 'single') {
        const newValue = collapsible
          ? value === rootValue
            ? undefined
            : value
          : value;
        onValueChange(newValue);
      }
      if (type === 'multiple') {
        const rootToArray = toStringArray(rootValue);
        const newValue = collapsible
          ? rootToArray.includes(value)
            ? rootToArray.filter((val) => val !== value)
            : rootToArray.concat(value)
          : [...new Set(rootToArray.concat(value))];
        onValueChange(newValue);
      }
      onPressProp?.(ev);
    }

    const isDisabled = disabledProp || rootDisabled || itemDisabled;
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        nativeID={nativeID}
        aria-disabled={isDisabled}
        role='button'
        onPress={onPress}
        accessibilityState={{
          expanded: isItemExpanded(rootValue, value),
          disabled: isDisabled,
        }}
        disabled={isDisabled}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'TriggerNativeAccordion';

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & AccordionContentProps
>(({ asChild, forceMount, ...props }, ref) => {
  const { type, value: rootValue } = useAccordionContext();
  const { nativeID, value } = useAccordionItemContext();
  const isExpanded = isItemExpanded(rootValue, value);

  if (!forceMount) {
    if (!isExpanded) {
      return null;
    }
  }

  const Component = asChild ? Slot.View : View;
  return (
    <Component
      ref={ref}
      aria-hidden={!(forceMount || isExpanded)}
      aria-labelledby={nativeID}
      role={type === 'single' ? 'region' : 'summary'}
      {...props}
    />
  );
});

Content.displayName = 'ContentNativeAccordion';

export {
  Content,
  Header,
  Item,
  Root,
  Trigger,
  useAccordionContext,
  useAccordionItemContext,
};

function toStringArray(value?: string | string[]) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function isItemExpanded(
  rootValue: string | string[] | undefined,
  value: string
) {
  return Array.isArray(rootValue)
    ? rootValue.includes(value)
    : rootValue === value;
}
