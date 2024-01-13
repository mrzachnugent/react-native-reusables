import * as Collapsible from '@radix-ui/react-collapsible';
import React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { useAugmentedRef } from '../hooks/useAugmentedRef';
import * as Slot from '../slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../types';
import type { CollapsibleContentProps, CollapsibleRootProps } from './types';

const CollapsibleContext = React.createContext<CollapsibleRootProps | null>(
  null
);

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & CollapsibleRootProps
>(({ asChild, disabled = false, open, onOpenChange, ...viewProps }, ref) => {
  const augmentedRef = React.useRef<ViewRef>(null);
  useAugmentedRef({ augmentedRef, ref });

  React.useLayoutEffect(() => {
    if (augmentedRef.current) {
      const augRef = augmentedRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = open ? 'open' : 'closed';
    }
  }, [open]);

  React.useLayoutEffect(() => {
    if (augmentedRef.current) {
      const augRef = augmentedRef.current as unknown as HTMLDivElement;
      if (disabled) {
        augRef.dataset.disabled = 'true';
      } else {
        augRef.dataset.disabled = undefined;
      }
    }
  }, [disabled]);

  const Component = asChild ? Slot.View : View;
  return (
    <CollapsibleContext.Provider
      value={{
        disabled,
        open,
        onOpenChange,
      }}
    >
      <Collapsible.Root
        open={open}
        onOpenChange={onOpenChange}
        disabled={disabled}
      >
        <Component ref={ref} {...viewProps} />
      </Collapsible.Root>
    </CollapsibleContext.Provider>
  );
});

Root.displayName = 'RootWebCollapsible';

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
    const { disabled, open, onOpenChange } = useCollapsibleContext();

    const augmentedRef = React.useRef<PressableRef>(null);
    useAugmentedRef({ augmentedRef, ref });

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.dataset.state = open ? 'open' : 'closed';
      }
    }, [open]);

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.type = 'button';

        if (disabled) {
          augRef.dataset.disabled = 'true';
        } else {
          augRef.dataset.disabled = undefined;
        }
      }
    }, [disabled]);

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onOpenChange(!open);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Collapsible.Trigger disabled={disabled} asChild>
        <Component
          ref={augmentedRef}
          role='button'
          onPress={onPress}
          disabled={disabled}
          {...props}
        />
      </Collapsible.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebCollapsible';

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & CollapsibleContentProps
>(({ asChild, forceMount, ...props }, ref) => {
  const augmentedRef = React.useRef<ViewRef>(null);
  useAugmentedRef({ augmentedRef, ref });
  const { open } = useCollapsibleContext();

  React.useLayoutEffect(() => {
    if (augmentedRef.current) {
      const augRef = augmentedRef.current as unknown as HTMLDivElement;
      augRef.dataset.state = open ? 'open' : 'closed';
    }
  }, [open]);

  const Component = asChild ? Slot.View : View;
  return (
    <Collapsible.Content forceMount={forceMount} asChild>
      <Component ref={augmentedRef} {...props} />
    </Collapsible.Content>
  );
});

Content.displayName = 'ContentWebCollapsible';

export { Content, Root, Trigger };
