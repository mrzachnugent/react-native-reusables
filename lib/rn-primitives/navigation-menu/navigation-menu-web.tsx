import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useAugmentedRef } from '../hooks/useAugmentedRef';
import * as Slot from '../slot';
import type {
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../types';
import type {
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuPortalProps,
  NavigationMenuRootProps,
} from './types';

const NavigationMenuContext =
  React.createContext<NavigationMenuRootProps | null>(null);

const Root = React.forwardRef<
  ViewRef,
  SlottableViewProps & NavigationMenuRootProps
>(
  (
    {
      asChild,
      value,
      onValueChange,
      delayDuration,
      skipDelayDuration,
      dir,
      orientation,
      ...viewProps
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
    return (
      <NavigationMenuContext.Provider
        value={{ value, onValueChange, orientation }}
      >
        <NavigationMenu.Root
          value={value}
          onValueChange={onValueChange}
          delayDuration={delayDuration}
          skipDelayDuration={skipDelayDuration}
          dir={dir}
          orientation={orientation}
        >
          <Component ref={ref} {...viewProps} />
          <NavigationMenu.Viewport />
        </NavigationMenu.Root>
      </NavigationMenuContext.Provider>
    );
  }
);

Root.displayName = 'RootWebNavigationMenu';

function useNavigationMenuContext() {
  const context = React.useContext(NavigationMenuContext);
  if (!context) {
    throw new Error(
      'NavigationMenu compound components cannot be rendered outside the NavigationMenu component'
    );
  }
  return context;
}

const List = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...viewProps }, ref) => {
    const augmentedRef = React.useRef<View>(null);
    useAugmentedRef({ ref, augmentedRef });
    const { orientation } = useNavigationMenuContext();

    React.useLayoutEffect(() => {
      if (augmentedRef.current) {
        const augRef = augmentedRef.current as unknown as HTMLDivElement;
        augRef.dataset.orientation = orientation;
      }
    }, [orientation]);

    const Component = asChild ? Slot.View : View;
    return (
      <NavigationMenu.List>
        <Component ref={ref} {...viewProps} />
      </NavigationMenu.List>
    );
  }
);

List.displayName = 'ListWebNavigationMenu';

const Item = React.forwardRef<
  ViewRef,
  SlottableViewProps & NavigationMenuItemProps
>(({ asChild, value, ...viewProps }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <NavigationMenu.Item value={value}>
      <Component ref={ref} {...viewProps} />
    </NavigationMenu.Item>
  );
});

Item.displayName = 'ItemWebNavigationMenu';

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <NavigationMenu.Trigger disabled={disabled ?? undefined}>
        <Component ref={ref} pointerEvents='none' {...props} />
      </NavigationMenu.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebNavigationMenu';

function Portal({ children }: NavigationMenuPortalProps) {
  return <>{children}</>;
}

const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & PositionedContentProps
>(
  (
    {
      asChild = false,
      forceMount,
      align: _align,
      side: _side,
      sideOffset: _sideOffset,
      alignOffset: _alignOffset,
      avoidCollisions: _avoidCollisions,
      onLayout: onLayoutProp,
      insets: _insets,
      disablePositioningStyle: _disablePositioningStyle,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;
    return (
      <NavigationMenu.Content
        forceMount={forceMount}
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        onFocusOutside={onFocusOutside}
        onInteractOutside={onInteractOutside}
      >
        <Component ref={ref} {...props} />
      </NavigationMenu.Content>
    );
  }
);

Content.displayName = 'ContentWebNavigationMenu';

const Link = React.forwardRef<
  PressableRef,
  SlottablePressableProps & NavigationMenuLinkProps
>(({ asChild, active, ...props }, ref) => {
  function onKeyDown(ev: React.KeyboardEvent) {
    if (ev.key === 'Enter' || ev.key === ' ') {
      props.onPress?.({} as any);
    }
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <NavigationMenu.Link active={active} onKeyDown={onKeyDown} tabIndex={1}>
      <Component ref={ref} {...props} />
    </NavigationMenu.Link>
  );
});

Link.displayName = 'LinkWebNavigationMenu';

export { Content, Item, Link, List, Portal, Root, Trigger };
