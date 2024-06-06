import * as Popover from '@radix-ui/react-popover';
import { useAugmentedRef } from '@rnr/hooks';
import * as Slot from '@rnr/slot';
import type {
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr/types';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import type { PopoverOverlayProps, PopoverPortalProps, PopoverTriggerRef } from './types';

const RootContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & { onOpenChange?: (open: boolean) => void }
>(({ asChild, onOpenChange: onOpenChangeProp, ...viewProps }, ref) => {
  const [open, setOpen] = React.useState(false);

  function onOpenChange(value: boolean) {
    setOpen(value);
    onOpenChangeProp?.(value);
  }
  const Component = asChild ? Slot.View : View;
  return (
    <RootContext.Provider value={{ open, onOpenChange }}>
      <Popover.Root open={open} onOpenChange={onOpenChange}>
        <Component ref={ref} {...viewProps} />
      </Popover.Root>
    </RootContext.Provider>
  );
});

Root.displayName = 'RootWebPopover';

function useRootContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Popover compound components cannot be rendered outside the Popover component');
  }
  return context;
}

const Trigger = React.forwardRef<PopoverTriggerRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, role: _role, disabled, ...props }, ref) => {
    const { onOpenChange, open } = useRootContext();
    const augmentedRef = useAugmentedRef({
      ref,
      methods: {
        open() {
          onOpenChange(true);
        },
        close() {
          onOpenChange(false);
        },
      },
    });
    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      onOpenChange(!open);
    }

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.dataset.state = open ? 'open' : 'closed';
        augRef.type = 'button';
      }
    }, [open]);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Popover.Trigger disabled={disabled ?? undefined} asChild>
        <Component
          ref={augmentedRef}
          onPress={onPress}
          role='button'
          disabled={disabled}
          {...props}
        />
      </Popover.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebPopover';

function Portal({ forceMount, container, children }: PopoverPortalProps) {
  return <Popover.Portal forceMount={forceMount} children={children} container={container} />;
}

const Overlay = React.forwardRef<PressableRef, SlottablePressableProps & PopoverOverlayProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} {...props} />;
  }
);

Overlay.displayName = 'OverlayWebPopover';

const Content = React.forwardRef<ViewRef, SlottableViewProps & PositionedContentProps>(
  (
    {
      asChild = false,
      forceMount,
      align = 'start',
      side = 'bottom',
      sideOffset = 0,
      alignOffset = 0,
      avoidCollisions = true,
      insets: _insets,
      disablePositioningStyle: _disablePositioningStyle,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onInteractOutside,
      onPointerDownOutside,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Popover.Content
        onCloseAutoFocus={onCloseAutoFocus}
        onEscapeKeyDown={onEscapeKeyDown}
        onInteractOutside={onInteractOutside}
        onPointerDownOutside={onPointerDownOutside}
        forceMount={forceMount}
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
      >
        <Component ref={ref} {...props} />
      </Popover.Content>
    );
  }
);

Content.displayName = 'ContentWebPopover';

const Close = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled, ...props }, ref) => {
    const augmentedRef = useAugmentedRef({ ref });
    const { onOpenChange, open } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (onPressProp) {
        onPressProp(ev);
      }
      onOpenChange(!open);
    }

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLButtonElement;
        augRef.type = 'button';
      }
    }, []);

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <>
        <Popover.Close disabled={disabled ?? undefined} asChild>
          <Component
            ref={augmentedRef}
            onPress={onPress}
            role='button'
            disabled={disabled}
            {...props}
          />
        </Popover.Close>
      </>
    );
  }
);

Close.displayName = 'CloseWebPopover';

export { Close, Content, Overlay, Portal, Root, Trigger, useRootContext };

export type { PopoverTriggerRef };
