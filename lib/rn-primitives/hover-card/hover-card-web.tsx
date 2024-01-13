import * as HoverCard from '@radix-ui/react-hover-card';
import React from 'react';
import { Pressable, View } from 'react-native';
import * as Slot from '../slot';
import type {
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../types';
import type {
  HoverCardOverlayProps,
  HoverCardPortalProps,
  HoverCardRootProps,
} from './types';

const Root = React.forwardRef<ViewRef, SlottableViewProps & HoverCardRootProps>(
  ({ asChild, open, onOpenChange, ...viewProps }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <HoverCard.Root open={open} onOpenChange={onOpenChange}>
        <Component ref={ref} {...viewProps} />
      </HoverCard.Root>
    );
  }
);

Root.displayName = 'RootWebHoverCard';

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

/**
 * @warning when using a custom `<PortalHost />`, you will have to adjust the Content's sideOffset to account for nav elements like headers.
 */
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

export { Content, Overlay, Portal, Root, Trigger };
