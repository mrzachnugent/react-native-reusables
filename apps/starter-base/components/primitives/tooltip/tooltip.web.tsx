import * as Tooltip from '@radix-ui/react-tooltip';
import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { useAugmentedRef, useControllableState } from '~/components/primitives/hooks';
import * as Slot from '~/components/primitives/slot';
import type {
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '~/components/primitives/types';
import type {
  RootContext,
  TooltipOverlayProps,
  TooltipPortalProps,
  TooltipRootProps,
} from './types';

const RootContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & TooltipRootProps>(
  (
    {
      asChild,
      defaultOpen,
      open: openProp,
      onOpenChange: onOpenChangeProp,
      delayDuration,
      skipDelayDuration,
      disableHoverableContent,
      ...viewProps
    },
    ref
  ) => {
    const [open = false, onOpenChange] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChangeProp,
    });

    const Component = asChild ? Slot.View : View;
    return (
      <RootContext.Provider value={{ open, onOpenChange }}>
        <Tooltip.Provider
          delayDuration={delayDuration}
          skipDelayDuration={skipDelayDuration}
          disableHoverableContent={disableHoverableContent}
        >
          <Tooltip.Root
            open={open}
            onOpenChange={onOpenChange}
            delayDuration={delayDuration}
            disableHoverableContent={disableHoverableContent}
          >
            <Component ref={ref} {...viewProps} />
          </Tooltip.Root>
        </Tooltip.Provider>
      </RootContext.Provider>
    );
  }
);

Root.displayName = 'RootWebTooltip';

function useTooltipContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Tooltip compound components cannot be rendered outside the Tooltip component');
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, role: _role, disabled, ...props }, ref) => {
    const augmentedRef = useAugmentedRef({ ref });
    const { onOpenChange, open } = useTooltipContext();
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
      <Tooltip.Trigger disabled={disabled ?? undefined} asChild>
        <Component
          ref={augmentedRef}
          onPress={onPress}
          role='button'
          disabled={disabled}
          {...props}
        />
      </Tooltip.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebTooltip';

function Portal({ forceMount, container, children }: TooltipPortalProps) {
  return <Tooltip.Portal forceMount={forceMount} children={children} container={container} />;
}

const Overlay = React.forwardRef<PressableRef, SlottablePressableProps & TooltipOverlayProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} {...props} />;
  }
);

Overlay.displayName = 'OverlayWebTooltip';

const Content = React.forwardRef<ViewRef, SlottableViewProps & PositionedContentProps>(
  (
    {
      asChild = false,
      forceMount,
      align = 'center',
      side = 'top',
      sideOffset = 0,
      alignOffset = 0,
      avoidCollisions = true,
      insets: _insets,
      disablePositioningStyle: _disablePositioningStyle,
      onCloseAutoFocus: _onCloseAutoFocus,
      onEscapeKeyDown,
      onInteractOutside: _onInteractOutside,
      onPointerDownOutside,
      sticky,
      hideWhenDetached,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
    return (
      <Tooltip.Content
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        forceMount={forceMount}
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        sticky={sticky}
        hideWhenDetached={hideWhenDetached}
      >
        <Component ref={ref} {...props} />
      </Tooltip.Content>
    );
  }
);

Content.displayName = 'ContentWebTooltip';

export { Content, Overlay, Portal, Root, Trigger };
