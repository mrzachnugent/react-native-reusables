import * as Collapsible from '@radix-ui/react-collapsible';
import { useAugmentedRef, useControllableState } from '@rnr/hooks';
import * as Slot from '@rnr/slot';
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr/types';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type { CollapsibleContentProps, CollapsibleRootProps, RootContext } from './types';

const CollapsibleContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & CollapsibleRootProps>(
  (
    {
      asChild,
      disabled = false,
      open: openProp,
      defaultOpen,
      onOpenChange: onOpenChangeProp,
      ...viewProps
    },
    ref
  ) => {
    const [open = false, onOpenChange] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChangeProp,
    });
    const augmentedRef = useAugmentedRef({ ref });

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
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          disabled={disabled}
        >
          <Component ref={ref} {...viewProps} />
        </Collapsible.Root>
      </CollapsibleContext.Provider>
    );
  }
);

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
  ({ asChild, onPress: onPressProp, disabled: disabledProp = false, ...props }, ref) => {
    const { disabled, open, onOpenChange } = useCollapsibleContext();
    const augmentedRef = useAugmentedRef({ ref });

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

const Content = React.forwardRef<ViewRef, SlottableViewProps & CollapsibleContentProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const augmentedRef = useAugmentedRef({ ref });
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
  }
);

Content.displayName = 'ContentWebCollapsible';

export { Content, Root, Trigger };
