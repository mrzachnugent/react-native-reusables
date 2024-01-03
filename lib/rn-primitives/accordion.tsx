import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

type SingleRootProps = {
  type: 'single';
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
};

type MultipleRootProps = {
  type: 'multiple';
  value: string[];
  onValueChange: (value: string[]) => void;
};

type RootProps = (SingleRootProps | MultipleRootProps) & {
  disabled?: boolean;
  collapsable?: boolean;
};

const AccordionContext = React.createContext({} as RootProps);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(
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
    const Slot = asChild ? ViewSlot : View;
    return (
      <AccordionContext.Provider
        value={
          {
            type,
            disabled,
            collapsable,
            value,
            onValueChange,
          } as RootProps
        }
      >
        <Slot ref={ref} {...viewProps} />
      </AccordionContext.Provider>
    );
  }
);

Root.displayName = 'RootAccordion';

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion compound components cannot be rendered outside the Accordion component'
    );
  }
  return context;
}

interface ItemProps {
  value: string;
  disabled?: boolean;
}

interface ItemAtom extends ItemProps {
  nativeID: string;
}

const AccordionItemContext = React.createContext({} as ItemAtom);

const Item = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & ItemProps
>(({ asChild, value, disabled, ...viewProps }, ref) => {
  const nativeID = React.useId();

  const Slot = asChild ? ViewSlot : View;
  return (
    <AccordionItemContext.Provider
      value={{
        value,
        disabled,
        nativeID,
      }}
    >
      <Slot ref={ref} {...viewProps} />
    </AccordionItemContext.Provider>
  );
});

Item.displayName = 'ItemAccordion';

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem compound components cannot be rendered outside the AccordionItem component'
    );
  }
  return context;
}

const Header = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const { disabled: rootDisabled, value: rootValue } = useAccordionContext();
  const { disabled: itemDisabled, value } = useAccordionItemContext();

  const Slot = asChild ? ViewSlot : View;
  return (
    <Slot
      ref={ref}
      role='heading'
      aria-expanded={isItemExpanded(rootValue, value)}
      aria-disabled={rootDisabled ?? itemDisabled}
      {...props}
    />
  );
});

Header.displayName = 'HeaderAccordion';

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(
  (
    { asChild, onPress: onPressProp, disabled: disabledProp, ...props },
    ref
  ) => {
    const {
      disabled: rootDisabled,
      type,
      onValueChange,
      value: rootValue,
      collapsable,
    } = useAccordionContext();
    const {
      nativeID,
      disabled: itemDisabled,
      value,
    } = useAccordionItemContext();

    function onPress(ev: GestureResponderEvent) {
      if (rootDisabled || itemDisabled) return;
      if (type === 'single') {
        const newValue = collapsable
          ? value === rootValue
            ? undefined
            : value
          : value;
        onValueChange(newValue);
      }
      if (type === 'multiple') {
        const rootToArray = toStringArray(rootValue);
        const newValue = collapsable
          ? rootToArray.includes(value)
            ? rootToArray.filter((val) => val !== value)
            : rootToArray.concat(value)
          : [...new Set(rootToArray.concat(value))];
        onValueChange(newValue);
      }
      onPressProp?.(ev);
    }

    const isDisabled = disabledProp || rootDisabled || itemDisabled;
    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <Slot
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

Trigger.displayName = 'TriggerAccordion';

const Content = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & { forceMount?: boolean }
>(({ asChild, forceMount = false, ...props }, ref) => {
  const { type, value: rootValue } = useAccordionContext();
  const { nativeID, value } = useAccordionItemContext();
  const isExpanded = isItemExpanded(rootValue, value);

  if (!forceMount) {
    if (!isExpanded) {
      return null;
    }
  }

  const Slot = asChild ? ViewSlot : View;
  return (
    <Slot
      ref={ref}
      aria-hidden={!(forceMount || isExpanded)}
      aria-labelledby={nativeID}
      role={type === 'single' ? 'region' : 'summary'}
      {...props}
    />
  );
});

Content.displayName = 'ContentAccordion';

export { Content, Header, Item, Root, Trigger };

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
