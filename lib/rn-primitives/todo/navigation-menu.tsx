import React from 'react';
import {
  BackHandler,
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { StoreApi, createStore, useStore } from 'zustand';
import { Portal as RNPPortal } from '~/lib/rn-primitives/todo/portal';
import * as Slot from '~/lib/rn-primitives/todo/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';
import {
  Insets,
  LayoutPosition,
  useRelativePosition,
} from '../hooks/useRelativePosition';

interface RootProps {
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
}

const RootContext = React.createContext<RootProps | null>(null);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, value, onValueChange, ...viewProps }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <RootContext.Provider
      value={{
        value,
        onValueChange,
      }}
    >
      <Component ref={ref} role='navigation' {...viewProps} />
    </RootContext.Provider>
  );
});

Root.displayName = 'RootNavigationMenu';

function useNavigationMenuContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'NavigationMenu compound components cannot be rendered outside the NavigationMenu component'
    );
  }
  return context;
}

const List = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...viewProps }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='menubar' {...viewProps} />;
});

List.displayName = 'ListNavigationMenu';

interface ItemProps {
  value: string | undefined;
}

interface ItemStoreContext {
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
}

const ItemContext = React.createContext<ItemProps | null>(null);
const ItemStoreContext = React.createContext<StoreApi<ItemStoreContext> | null>(
  null
);

const Item = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & ItemProps
>(({ asChild, value, ...viewProps }, ref) => {
  const nativeID = React.useId();
  const storeRef = React.useRef<StoreApi<ItemStoreContext> | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStore((set) => ({
      triggerPosition: null,
      setTriggerPosition: (triggerPosition: LayoutPosition | null) =>
        set({ triggerPosition }),
      contentLayout: null,
      setContentLayout: (contentLayout: LayoutRectangle | null) =>
        set({ contentLayout }),
      nativeID,
    }));
  }

  const Component = asChild ? Slot.View : View;
  return (
    <ItemStoreContext.Provider value={storeRef.current}>
      <ItemContext.Provider
        value={{
          value,
        }}
      >
        <Component ref={ref} role='menuitem' {...viewProps} />
      </ItemContext.Provider>
    </ItemStoreContext.Provider>
  );
});

Item.displayName = 'ItemNavigationMenu';

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error(
      'NavigationMenu compound components cannot be rendered outside the NavigationMenu component'
    );
  }
  return context;
}

function useItemStoreContext<T>(selector: (state: ItemStoreContext) => T): T {
  const store = React.useContext(ItemStoreContext);
  if (!store) {
    throw new Error(
      'NavigationMenu compound components cannot be rendered outside the NavigationMenu component'
    );
  }
  return useStore(store, selector);
}

function useGetItemStore() {
  const store = React.useContext(ItemStoreContext);
  if (!store) {
    throw new Error(
      'NavigationMenu compound components cannot be rendered outside the NavigationMenu component'
    );
  }
  return store;
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const triggerRef = React.useRef<View>(null);
  const { value, onValueChange } = useNavigationMenuContext();
  const { value: menuValue } = useItemContext();
  const setTriggerPosition = useItemStoreContext(
    (state) => state.setTriggerPosition
  );

  React.useImperativeHandle(
    ref,
    () => {
      if (!triggerRef.current) {
        return new View({});
      }
      return triggerRef.current;
    },
    [triggerRef.current]
  );

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerPosition({ width, pageX, pageY: pageY, height });
    });

    onValueChange(menuValue === value ? undefined : menuValue);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Component
      ref={triggerRef}
      aria-disabled={disabled ?? undefined}
      role='button'
      onPress={onPress}
      disabled={disabled ?? undefined}
      aria-expanded={value === menuValue}
      {...props}
    />
  );
});

Trigger.displayName = 'TriggerNavigationMenu';

/**
 * @warning when using a custom `<PortalHost />`, you will have to adjust the Content's sideOffset to account for nav elements like headers.
 */
function Portal({
  forceMount,
  hostName,
  children,
}: {
  children: React.ReactNode;
  hostName?: string;
  forceMount?: true | undefined;
}) {
  const navigationMenu = useNavigationMenuContext();
  const item = useItemContext();
  const triggerPosition = useItemStoreContext((state) => state.triggerPosition);
  const nativeID = useItemStoreContext((state) => state.nativeID);
  const store = useGetItemStore();

  if (!triggerPosition) {
    return null;
  }

  if (!forceMount) {
    if (navigationMenu.value !== item.value) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${nativeID}_portal`}>
      <RootContext.Provider
        value={navigationMenu}
        key={`RootContex_t${nativeID}_portal`}
      >
        <ItemStoreContext.Provider value={store}>
          <ItemContext.Provider value={item}>{children}</ItemContext.Provider>
        </ItemStoreContext.Provider>
      </RootContext.Provider>
    </RNPPortal>
  );
}

const Overlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    forceMount?: true | undefined;
    style?: ViewStyle;
    closeOnPress?: boolean;
  }
>(
  (
    {
      asChild,
      forceMount,
      onPress: OnPressProp,
      closeOnPress = true,
      style,
      ...props
    },
    ref
  ) => {
    const { value, onValueChange } = useNavigationMenuContext();
    const setTriggerPosition = useItemStoreContext(
      (state) => state.setTriggerPosition
    );
    const setContentLayout = useItemStoreContext(
      (state) => state.setContentLayout
    );

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onValueChange(undefined);
      }
      OnPressProp?.(ev);
    }

    if (!forceMount) {
      if (!value) {
        return null;
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        onPress={onPress}
        style={[StyleSheet.absoluteFill, style]}
        {...props}
      />
    );
  }
);

Overlay.displayName = 'OverlayNavigationMenu';

interface ContentProps {
  forceMount?: true | undefined;
  style?: ViewStyle;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  insets?: Insets;
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  disablePositioningStyle?: boolean;
}

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally. Opt out of this behavior by setting `disablePositioningStyle` to `true`.
 */
const Content = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & ContentProps
>(
  (
    {
      asChild = false,
      forceMount,
      align = 'center',
      side = 'bottom',
      sideOffset = 0,
      alignOffset = 0,
      avoidCollisions = true,
      onLayout: onLayoutProp,
      insets,
      style,
      disablePositioningStyle,
      ...props
    },
    ref
  ) => {
    const { value, onValueChange } = useNavigationMenuContext();
    const { value: menuValue } = useItemContext();
    const nativeID = useItemStoreContext((state) => state.nativeID);
    const triggerPosition = useItemStoreContext(
      (state) => state.triggerPosition
    );
    const setTriggerPosition = useItemStoreContext(
      (state) => state.setTriggerPosition
    );
    const contentLayout = useItemStoreContext((state) => state.contentLayout);
    const setContentLayout = useItemStoreContext(
      (state) => state.setContentLayout
    );

    React.useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          setTriggerPosition(null);
          setContentLayout(null);
          onValueChange(undefined);
          return true;
        }
      );

      return () => {
        setContentLayout(null);
        backHandler.remove();
      };
    }, []);

    const positionStyle = useRelativePosition({
      align,
      avoidCollisions,
      triggerPosition,
      contentLayout,
      alignOffset,
      insets,
      sideOffset,
      side,
      disablePositioningStyle,
    });

    function onLayout(event: LayoutChangeEvent) {
      setContentLayout(event.nativeEvent.layout);
      onLayoutProp?.(event);
    }

    if (!forceMount) {
      if (value !== menuValue) {
        return null;
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        role='menu'
        nativeID={nativeID}
        aria-modal={true}
        style={[positionStyle, style]}
        onLayout={onLayout}
        {...props}
      />
    );
  }
);

Content.displayName = 'ContentNavigationMenu';

const Link = React.forwardRef<
  React.ElementRef<typeof Text>,
  ComponentPropsWithAsChild<typeof Text>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : Text;
  return <Component ref={ref} role='link' {...props} />;
});

Link.displayName = 'LinkNavigationMenu';

export { Content, Item, Link, List, Overlay, Portal, Root, Trigger };
