import { atom, useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { AtomScopeProvider } from '~/lib/rn-primitives/AtomScopeProvider';
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';

interface RootProps {
  type: 'single' | 'multiple';
  disabled?: boolean;
  collapsable?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value?: string | string[]) => void;
}

const rootAtom = atom<RootProps>({} as RootProps);

type ComponentPropsWithoutRef<T extends React.ElementType<any>> =
  React.ComponentPropsWithoutRef<T> & { asChild?: boolean };

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithoutRef<typeof View> & RootProps
>(
  (
    {
      asChild,
      type,
      disabled,
      collapsable = true,
      value,
      defaultValue,
      onValueChange,
      ...viewProps
    },
    ref
  ) => {
    const Slot = asChild ? ViewSlot : View;
    return (
      <AtomScopeProvider
        atom={rootAtom}
        value={{
          type,
          disabled,
          collapsable,
          value: defaultValue ?? value ?? (type === 'single' ? undefined : []),
          onValueChange,
        }}
      >
        <Slot ref={ref} {...viewProps} />
      </AtomScopeProvider>
    );
  }
);

Root.displayName = 'RootAccordion';

interface ItemProps {
  value: string;
  disabled?: boolean;
}

interface ItemAtom extends ItemProps {
  nativeID: string;
}
const itemAtom = atom<ItemAtom>({} as ItemAtom);

const Item = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithoutRef<typeof View> & ItemProps
>(({ asChild, value, disabled, ...viewProps }, ref) => {
  const nativeID = React.useId();

  const Slot = asChild ? ViewSlot : View;
  return (
    <AtomScopeProvider
      atom={itemAtom}
      value={{
        value,
        disabled,
        nativeID,
      }}
    >
      <Slot ref={ref} {...viewProps} />
    </AtomScopeProvider>
  );
});

Item.displayName = 'ItemAccordion';

const Header = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithoutRef<typeof View>
>(({ asChild, ...props }, ref) => {
  const { disabled: rootDisabled, value: rootValue } = useAtomValue(rootAtom);
  const { disabled: itemDisabled, value } = useAtomValue(itemAtom);

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
  ComponentPropsWithoutRef<typeof Pressable>
>(({ asChild, onPress: onPressProp, ...props }, ref) => {
  const {
    disabled: rootDisabled,
    type,
    onValueChange,
    value: rootValue,
    collapsable,
  } = useAtomValue(rootAtom);
  const setRoot = useSetAtom(rootAtom);
  const { nativeID, disabled: itemDisabled, value } = useAtomValue(itemAtom);

  function onPress(ev: GestureResponderEvent) {
    if (rootDisabled || itemDisabled) return;
    if (type === 'single') {
      const newValue = collapsable
        ? value === rootValue
          ? undefined
          : value
        : value;
      setRoot((prev) => ({ ...prev, value: newValue }));
      onValueChange?.(newValue);
    }
    if (type === 'multiple') {
      const rootToArray = toStringArray(rootValue);
      const newValue = collapsable
        ? rootToArray.includes(value)
          ? rootToArray.filter((val) => val !== value)
          : rootToArray.concat(value)
        : [...new Set(rootToArray.concat(value))];
      setRoot((prev) => ({ ...prev, value: newValue }));
      onValueChange?.(newValue);
    }
    onPressProp?.(ev);
  }

  const Slot = asChild ? PressableSlot : Pressable;
  return (
    <Slot
      ref={ref}
      nativeID={nativeID}
      aria-disabled={rootDisabled ?? itemDisabled}
      role='button'
      onPress={onPress}
      accessibilityState={{
        expanded: isItemExpanded(rootValue, value),
        disabled: rootDisabled ?? itemDisabled,
      }}
      {...props}
    />
  );
});

Trigger.displayName = 'TriggerAccordion';

const Content = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithoutRef<typeof View> & { forceMount?: boolean }
>(({ asChild, forceMount = false, ...props }, ref) => {
  const { type, value: rootValue } = useAtomValue(rootAtom);
  const { nativeID, value } = useAtomValue(itemAtom);
  const isExpanded = isItemExpanded(rootValue, value);

  if (!forceMount && !isExpanded) {
    return null;
  }

  const Slot = asChild ? ViewSlot : View;
  return (
    <Slot
      ref={ref}
      aria-hidden={!isExpanded}
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
