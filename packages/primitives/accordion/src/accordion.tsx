import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import * as Slot from '@rnr/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr/types';
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionRootProps,
  RootContext,
} from './types';
import { useControllableState } from '@rnr/hooks';

const AccordionContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & AccordionRootProps>(
  (
    {
      asChild,
      type,
      disabled,
      collapsible = true,
      value: valueProp,
      onValueChange: onValueChangeProps,
      defaultValue,
      ...viewProps
    },
    ref
  ) => {
    const [value = type === 'multiple' ? [] : undefined, onValueChange] = useControllableState<
      (string | undefined) | string[]
    >({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChangeProps as (state: string | string[] | undefined) => void,
    });

    const Component = asChild ? Slot.View : View;
    return (
      <AccordionContext.Provider
        value={{
          type,
          disabled,
          collapsible,
          value,
          onValueChange,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </AccordionContext.Provider>
    );
  }
);

Root.displayName = 'RootNativeAccordion';

function useRootContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion compound components cannot be rendered outside the Accordion component'
    );
  }
  return context;
}

type AccordionItemContext = AccordionItemProps & {
  nativeID: string;
  isExpanded: boolean;
};

const AccordionItemContext = React.createContext<AccordionItemContext | null>(null);

const Item = React.forwardRef<ViewRef, SlottableViewProps & AccordionItemProps>(
  ({ asChild, value, disabled, ...viewProps }, ref) => {
    const { value: rootValue } = useRootContext();
    const nativeID = React.useId();

    const Component = asChild ? Slot.View : View;
    return (
      <AccordionItemContext.Provider
        value={{
          value,
          disabled,
          nativeID,
          isExpanded: isItemExpanded(rootValue, value),
        }}
      >
        <Component ref={ref} {...viewProps} />
      </AccordionItemContext.Provider>
    );
  }
);

Item.displayName = 'ItemNativeAccordion';

function useItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem compound components cannot be rendered outside the AccordionItem component'
    );
  }
  return context;
}

const Header = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, ...props }, ref) => {
  const { disabled: rootDisabled } = useRootContext();
  const { disabled: itemDisabled, isExpanded } = useItemContext();

  const Component = asChild ? Slot.View : View;
  return (
    <Component
      ref={ref}
      role='heading'
      aria-expanded={isExpanded}
      aria-disabled={rootDisabled ?? itemDisabled}
      {...props}
    />
  );
});

Header.displayName = 'HeaderNativeAccordion';

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled: disabledProp, ...props }, ref) => {
    const {
      disabled: rootDisabled,
      type,
      onValueChange,
      value: rootValue,
      collapsible,
    } = useRootContext();
    const { nativeID, disabled: itemDisabled, value, isExpanded } = useItemContext();

    function onPress(ev: GestureResponderEvent) {
      if (rootDisabled || itemDisabled) return;
      if (type === 'single') {
        const newValue = collapsible ? (value === rootValue ? undefined : value) : value;
        onValueChange(newValue);
      }
      if (type === 'multiple') {
        const rootToArray = toStringArray(rootValue);
        const newValue = collapsible
          ? rootToArray.includes(value)
            ? rootToArray.filter((val) => val !== value)
            : rootToArray.concat(value)
          : [...new Set(rootToArray.concat(value))];
        // @ts-ignore - `newValue` is of type `string[]` which is OK
        onValueChange(newValue);
      }
      onPressProp?.(ev);
    }

    const isDisabled = disabledProp || rootDisabled || itemDisabled;
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        key={`${nativeID}-${JSON.stringify(rootValue)}-${isDisabled}-${collapsible}-${type}`}
        nativeID={nativeID}
        aria-disabled={isDisabled}
        role='button'
        onPress={onPress}
        accessibilityState={{
          expanded: isExpanded,
          disabled: isDisabled,
        }}
        disabled={isDisabled}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'TriggerNativeAccordion';

const Content = React.forwardRef<ViewRef, SlottableViewProps & AccordionContentProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { type } = useRootContext();
    const { nativeID, isExpanded } = useItemContext();

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
  }
);

Content.displayName = 'ContentNativeAccordion';

export { Content, Header, Item, Root, Trigger, useRootContext, useItemContext };

function toStringArray(value?: string | string[]) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function isItemExpanded(rootValue: string | string[] | undefined, value: string) {
  return Array.isArray(rootValue) ? rootValue.includes(value) : rootValue === value;
}
