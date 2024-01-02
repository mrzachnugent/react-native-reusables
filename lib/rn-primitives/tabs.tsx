import { atom, useAtomValue, useSetAtom } from 'jotai';
import React, { useId } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { AtomScopeProvider } from '~/lib/rn-primitives/AtomScopeProvider';
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { useAugmentedRef } from '~/lib/rn-primitives/util-hooks';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootProps {
  defaultValue: string;
  onValueChange?: (value: string) => void;
}

interface RootAtom extends Omit<RootProps, 'defaultValue'> {
  value: string;
  nativeID: string;
}

const rootAtom = atom<RootAtom>({} as RootAtom);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, defaultValue, onValueChange, ...viewProps }, ref) => {
  const nativeID = useId();
  const Slot = asChild ? ViewSlot : View;
  return (
    <AtomScopeProvider
      atom={rootAtom}
      value={{
        value: defaultValue,
        onValueChange,
        nativeID,
      }}
    >
      <Slot ref={ref} {...viewProps} />
    </AtomScopeProvider>
  );
});

Root.displayName = 'RootTabs';

const List = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Slot = asChild ? ViewSlot : View;
  return <Slot ref={ref} role='tablist' {...props} />;
});

List.displayName = 'ListTabs';

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable> & { click?: () => void },
  ComponentPropsWithAsChild<typeof Pressable> & {
    value: string;
  }
>(
  (
    { asChild, onPress: onPressProp, disabled, value: tabValue, ...props },
    ref
  ) => {
    const {
      onValueChange,
      value: rootValue,
      nativeID,
    } = useAtomValue(rootAtom);
    const setRoot = useSetAtom(rootAtom);
    const augmentedRef = React.useRef<React.ElementRef<typeof Pressable>>(null);
    useAugmentedRef({
      ref,
      augmentedRef,
      methods: { click: onPress },
      deps: [tabValue, disabled],
    });

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      setRoot((prev) => ({ ...prev, value: tabValue }));
      onValueChange?.(tabValue);
      onPressProp?.(ev);
    }

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <Slot
        ref={augmentedRef}
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
  const { value: rootValue, nativeID } = useAtomValue(rootAtom);

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
