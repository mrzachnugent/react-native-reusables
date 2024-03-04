import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { useAugmentedRef } from '@rnr/hooks';
import * as Slot from '@rnr/slot';
import type {
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rnr/types';
import { EmptyGestureResponderEvent } from '@rnr/utils';
import type {
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuPortalProps,
  NavigationMenuRootProps,
} from './types';

const NavigationMenuContext = React.createContext<NavigationMenuRootProps | null>(null);

const Root = React.forwardRef<ViewRef, SlottableViewProps & NavigationMenuRootProps>(
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
      <NavigationMenuContext.Provider value={{ value, onValueChange, orientation }}>
        <NavigationMenu.Root
          value={value}
          onValueChange={onValueChange}
          delayDuration={delayDuration}
          skipDelayDuration={skipDelayDuration}
          dir={dir}
          orientation={orientation}
        >
          <Component ref={ref} {...viewProps} />
        </NavigationMenu.Root>
      </NavigationMenuContext.Provider>
    );
  }
);

Root.displayName = 'RootWebNavigationMenu';

function useRootContext() {
  const context = React.useContext(NavigationMenuContext);
  if (!context) {
    throw new Error(
      'NavigationMenu compound components cannot be rendered outside the NavigationMenu component'
    );
  }
  return context;
}

const List = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, ...viewProps }, ref) => {
  const augmentedRef = useAugmentedRef({ ref });
  const { orientation } = useRootContext();

  React.useLayoutEffect(() => {
    if (augmentedRef.current) {
      const augRef = augmentedRef.current as unknown as HTMLDivElement;
      augRef.dataset.orientation = orientation;
    }
  }, [orientation]);

  const Component = asChild ? Slot.View : View;
  return (
    <NavigationMenu.List asChild>
      <Component ref={ref} {...viewProps} />
    </NavigationMenu.List>
  );
});

List.displayName = 'ListWebNavigationMenu';

const ItemContext = React.createContext<NavigationMenuItemProps | null>(null);

const Item = React.forwardRef<ViewRef, SlottableViewProps & NavigationMenuItemProps>(
  ({ asChild, value, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return (
      <ItemContext.Provider value={{ value }}>
        <NavigationMenu.Item value={value} asChild>
          <Component ref={ref} {...props} />
        </NavigationMenu.Item>
      </ItemContext.Provider>
    );
  }
);

Item.displayName = 'ItemWebNavigationMenu';

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error(
      'NavigationMenu compound components cannot be rendered outside the NavigationMenu component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  (
    { asChild, onPress: onPressProp, disabled = false, onKeyDown: onKeyDownProp, ...props },
    ref
  ) => {
    const { value: rootValue, onValueChange } = useRootContext();
    const { value } = useItemContext();
    function onKeyDown(ev: React.KeyboardEvent) {
      onKeyDownProp?.(ev);
      if (ev.key === ' ') {
        onPressProp?.(EmptyGestureResponderEvent);
        onValueChange(value === rootValue ? '' : value);
      }
    }

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onValueChange(value === rootValue ? '' : value);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <NavigationMenu.Trigger disabled={disabled ?? undefined} asChild>
        <Component
          ref={ref}
          // @ts-expect-error web only
          onKeyDown={onKeyDown}
          onPress={onPress}
          {...props}
        />
      </NavigationMenu.Trigger>
    );
  }
);

Trigger.displayName = 'TriggerWebNavigationMenu';

function Portal({ children }: NavigationMenuPortalProps) {
  return <>{children}</>;
}

const Content = React.forwardRef<ViewRef, SlottableViewProps & PositionedContentProps>(
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

const Link = React.forwardRef<PressableRef, SlottablePressableProps & NavigationMenuLinkProps>(
  ({ asChild, active, onPress: onPressProp, onKeyDown: onKeyDownProp, ...props }, ref) => {
    const { onValueChange } = useRootContext();
    function onKeyDown(ev: React.KeyboardEvent) {
      onKeyDownProp?.(ev);
      if (ev.key === 'Enter' || ev.key === ' ') {
        onPressProp?.(EmptyGestureResponderEvent);
        onValueChange('');
      }
    }

    function onPress(ev: GestureResponderEvent) {
      onPressProp?.(ev);
      onValueChange('');
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <NavigationMenu.Link active={active} asChild>
        <Component
          ref={ref}
          role='link'
          // @ts-expect-error web only
          onKeyDown={onKeyDown}
          onPress={onPress}
          {...props}
        />
      </NavigationMenu.Link>
    );
  }
);

Link.displayName = 'LinkWebNavigationMenu';

const Viewport = React.forwardRef<
  ViewRef,
  Omit<React.ComponentPropsWithoutRef<typeof View>, 'children'>
>((props, ref) => {
  return (
    <Slot.View ref={ref} {...props}>
      <NavigationMenu.Viewport />
    </Slot.View>
  );
});

Viewport.displayName = 'ViewportWebNavigationMenu';

const Indicator = React.forwardRef<ViewRef, SlottableViewProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <NavigationMenu.Indicator asChild>
      <Component ref={ref} {...props} />
    </NavigationMenu.Indicator>
  );
});

Indicator.displayName = 'IndicatorWebNavigationMenu';

export {
  Content,
  Indicator,
  Item,
  Link,
  List,
  Portal,
  Root,
  Trigger,
  Viewport,
  useItemContext,
  useRootContext,
};
