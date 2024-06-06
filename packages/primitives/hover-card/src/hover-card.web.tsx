import * as HoverCard from '@radix-ui/react-hover-card';
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
import { Pressable, View } from 'react-native';
import type {
  HoverCardOverlayProps,
  HoverCardPortalProps,
  HoverCardRootProps,
  HoverCardTriggerRef,
  RootContext,
} from './types';

const HoverCardContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & HoverCardRootProps>(
  ({ asChild, openDelay, closeDelay, ...viewProps }, ref) => {
    const [open, onOpenChange] = React.useState(false);
    const Component = asChild ? Slot.View : View;
    return (
      <HoverCardContext.Provider value={{ open, onOpenChange }}>
        <HoverCard.Root
          open={open}
          onOpenChange={onOpenChange}
          openDelay={openDelay}
          closeDelay={closeDelay}
        >
          <Component ref={ref} {...viewProps} />
        </HoverCard.Root>
      </HoverCardContext.Provider>
    );
  }
);

Root.displayName = 'RootWebHoverCard';

function useRootContext() {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error(
      'HoverCard compound components cannot be rendered outside the HoverCard component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<HoverCardTriggerRef, SlottablePressableProps>(
  ({ asChild, ...props }, ref) => {
    const { onOpenChange } = useRootContext();
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

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <HoverCard.Trigger asChild>
        <Component ref={augmentedRef} {...props} />
      </HoverCard.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebHoverCard';

function Portal({ forceMount, container, children }: HoverCardPortalProps) {
  return <HoverCard.Portal forceMount={forceMount} container={container} children={children} />;
}

const Overlay = React.forwardRef<PressableRef, SlottablePressableProps & HoverCardOverlayProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} {...props} />;
  }
);

Overlay.displayName = 'OverlayWebHoverCard';

const Content = React.forwardRef<PressableRef, SlottablePressableProps & PositionedContentProps>(
  (
    {
      asChild = false,
      forceMount,
      align,
      side,
      sideOffset,
      alignOffset = 0,
      avoidCollisions = true,
      insets,
      loop: _loop,
      onCloseAutoFocus: _onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      collisionBoundary,
      sticky,
      hideWhenDetached,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <HoverCard.Content
        forceMount={forceMount}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={insets}
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        onFocusOutside={onFocusOutside}
        onInteractOutside={onInteractOutside}
        collisionBoundary={collisionBoundary}
        sticky={sticky}
        hideWhenDetached={hideWhenDetached}
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <Component ref={ref} {...props} />
      </HoverCard.Content>
    );
  }
);

Content.displayName = 'ContentWebHoverCard';

export { Content, Overlay, Portal, Root, Trigger, useRootContext };

export type { HoverCardTriggerRef };
