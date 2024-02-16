import * as HoverCard from '@radix-ui/react-hover-card';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import * as Slot from '~/components/primitives/slot';
import type {
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '~/components/primitives/types';
import type {
  HoverCardOverlayProps,
  HoverCardPortalProps,
  HoverCardRootProps,
} from './types';

const HoverCardContext = React.createContext<HoverCardRootProps | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & HoverCardRootProps>(
  ({ asChild, open, onOpenChange, ...viewProps }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <HoverCardContext.Provider value={{ open, onOpenChange }}>
        <HoverCard.Root open={open} onOpenChange={onOpenChange}>
          <Component ref={ref} {...viewProps} />
        </HoverCard.Root>
      </HoverCardContext.Provider>
    );
  }
);

Root.displayName = 'RootWebHoverCard';

function useHoverCardContext() {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error(
      'HoverCard compound components cannot be rendered outside the HoverCard component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <HoverCard.Trigger asChild>
        <Component ref={ref} {...props} />
      </HoverCard.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebHoverCard';

function Portal({ forceMount, container, children }: HoverCardPortalProps) {
  return (
    <HoverCard.Portal
      forceMount={forceMount}
      container={container}
      children={children}
    />
  );
}

const Overlay = React.forwardRef<
  PressableRef,
  SlottablePressableProps & HoverCardOverlayProps
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;
  return <Component ref={ref} {...props} />;
});

Overlay.displayName = 'OverlayWebHoverCard';

const Content = React.forwardRef<
  PressableRef,
  SlottablePressableProps & PositionedContentProps
>(
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

export { Content, Overlay, Portal, Root, Trigger, useHoverCardContext };
