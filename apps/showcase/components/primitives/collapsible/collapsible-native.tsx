import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import * as Slot from '~/components/primitives/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '~/components/primitives/types';
import type { CollapsibleContentProps, CollapsibleRootProps } from './types';

interface RootContext extends CollapsibleRootProps {
  nativeID: string;
}
const CollapsibleContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & CollapsibleRootProps
>(({ asChild, disabled = false, open, onOpenChange, ...viewProps }, ref) => {
  const nativeID = React.useId();

  const Component = asChild ? Slot.View : View;
  return (
    <CollapsibleContext.Provider
      value={{
        disabled,
        open,
        onOpenChange,
        nativeID,
      }}
    >
      <Component ref={ref} {...viewProps} />
    </CollapsibleContext.Provider>
  );
});

Root.displayName = 'RootNativeCollapsible';

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      'Collapsible compound components cannot be rendered outside the Collapsible component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  (
    { asChild, onPress: onPressProp, disabled: disabledProp = false, ...props },
    ref
  ) => {
    const { disabled, open, onOpenChange, nativeID } = useCollapsibleContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled || disabledProp) return;
      onOpenChange(!open);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        key={`trigger-${nativeID}-${open}`}
        ref={ref}
        nativeID={nativeID}
        aria-disabled={(disabled || disabledProp) ?? undefined}
        role='button'
        onPress={onPress}
        accessibilityState={{
          expanded: open,
          disabled: (disabled || disabledProp) ?? undefined,
        }}
        disabled={disabled || disabledProp}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'TriggerNativeCollapsible';

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & CollapsibleContentProps
>(({ asChild, forceMount, ...props }, ref) => {
  const { nativeID, open } = useCollapsibleContext();

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  const Component = asChild ? Slot.View : View;
  return (
    <Component
      ref={ref}
      aria-hidden={!(forceMount || open)}
      aria-labelledby={nativeID}
      role={'region'}
      {...props}
    />
  );
});

Content.displayName = 'ContentNativeCollapsible';

export { Content, Root, Trigger };
