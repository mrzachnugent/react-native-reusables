import React, { useEffect } from 'react';
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
import { Portal as RNPPortal } from '~/lib/rn-primitives/portal';
import * as Slot from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';
import {
  Insets,
  LayoutPosition,
  useRelativePosition,
} from './hooks/useRelativePosition';

interface RootProps {
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface RootStoreContext {
  pressPosition: LayoutPosition | null;
  setTriggerPosition: (pressPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
  itemMap: Map<string, string>;
  setItemMap: (itemMap: Map<string, string>) => void;
}

const RootContext = React.createContext<RootProps | null>(null);
const RootStoreContext = React.createContext<StoreApi<RootStoreContext> | null>(
  null
);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(
  (
    { asChild, value, onValueChange, open, onOpenChange, ...viewProps },
    ref
  ) => {
    const nativeID = React.useId();
    const storeRef = React.useRef<StoreApi<RootStoreContext> | null>(null);
    if (!storeRef.current) {
      storeRef.current = createStore((set) => ({
        pressPosition: null,
        setTriggerPosition: (pressPosition: LayoutPosition | null) =>
          set({ pressPosition }),
        contentLayout: null,
        setContentLayout: (contentLayout: LayoutRectangle | null) =>
          set({ contentLayout }),
        nativeID,
        itemMap: new Map(),
        setItemMap: (itemMap: Map<string, string>) =>
          set({ itemMap: new Map(itemMap) }),
      }));
    }

    const Component = asChild ? Slot.View : View;
    return (
      <RootStoreContext.Provider value={storeRef.current}>
        <RootContext.Provider
          value={{ value, onValueChange, open, onOpenChange }}
        >
          <Component ref={ref} {...viewProps} />
        </RootContext.Provider>
      </RootStoreContext.Provider>
    );
  }
);

Root.displayName = 'RootSelect';

function useSelectContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'Select compound components cannot be rendered outside the Select component'
    );
  }
  return context;
}

function useRootStoreContext<T>(selector: (state: RootStoreContext) => T): T {
  const store = React.useContext(RootStoreContext);
  if (!store) {
    throw new Error(
      'Select compound components cannot be rendered outside the Select component'
    );
  }
  return useStore(store, selector);
}

function useGetRootStore() {
  const store = React.useContext(RootStoreContext);
  if (!store) {
    throw new Error(
      'Select compound components cannot be rendered outside the Select component'
    );
  }
  return store;
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const triggerRef = React.useRef<View>(null);
  const { open, onOpenChange } = useSelectContext();
  const setTriggerPosition = useRootStoreContext(
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
    onOpenChange(!open);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Component
      ref={triggerRef}
      aria-disabled={disabled ?? undefined}
      role='combobox'
      onPress={onPress}
      disabled={disabled ?? undefined}
      aria-expanded={open}
      {...props}
    />
  );
});

Trigger.displayName = 'TriggerSelect';

const Value = React.forwardRef<
  React.ElementRef<typeof Text>,
  ComponentPropsWithAsChild<typeof Text> & {
    placeholder: string;
  }
>(({ asChild, placeholder, ...props }, ref) => {
  const { value } = useSelectContext();
  const itemMap = useRootStoreContext((state) => state.itemMap);
  const Component = asChild ? Slot.Text : Text;
  return (
    <Component ref={ref} {...props}>
      {value ? itemMap.get(value) ?? value : placeholder}
    </Component>
  );
});

Value.displayName = 'ValueSelect';

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset.
 */
function Portal({
  forceMount = false,
  hostName,
  children,
}: {
  children: React.ReactNode;
  hostName?: string;
  forceMount?: boolean;
}) {
  const value = useSelectContext();
  const pressPosition = useRootStoreContext((state) => state.pressPosition);
  const nativeID = useRootStoreContext((state) => state.nativeID);
  const store = useGetRootStore();

  if (!pressPosition) {
    return null;
  }

  if (!forceMount) {
    if (!value.open) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${nativeID}_portal`}>
      <RootStoreContext.Provider value={store}>
        <RootContext.Provider value={value}>{children}</RootContext.Provider>
      </RootStoreContext.Provider>
    </RNPPortal>
  );
}

const Overlay = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    forceMount?: boolean;
    style?: ViewStyle;
    closeOnPress?: boolean;
  }
>(
  (
    {
      asChild,
      forceMount = false,
      onPress: OnPressProp,
      closeOnPress = true,
      style,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange } = useSelectContext();
    const setTriggerPosition = useRootStoreContext(
      (state) => state.setTriggerPosition
    );
    const setContentLayout = useRootStoreContext(
      (state) => state.setContentLayout
    );

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onOpenChange(false);
      }
      OnPressProp?.(ev);
    }

    if (!forceMount) {
      if (!open) {
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

Overlay.displayName = 'OverlaySelect';

interface ContentProps {
  forceMount?: boolean;
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
      forceMount = false,
      align = 'start',
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
    const { open, onOpenChange } = useSelectContext();
    const nativeID = useRootStoreContext((state) => state.nativeID);
    const pressPosition = useRootStoreContext((state) => state.pressPosition);
    const setTriggerPosition = useRootStoreContext(
      (state) => state.setTriggerPosition
    );
    const contentLayout = useRootStoreContext((state) => state.contentLayout);
    const setContentLayout = useRootStoreContext(
      (state) => state.setContentLayout
    );

    React.useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          setTriggerPosition(null);
          setContentLayout(null);
          onOpenChange(false);
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
      triggerPosition: pressPosition,
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
      if (!open) {
        return null;
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        role='list'
        nativeID={nativeID}
        aria-modal={true}
        style={[positionStyle, style]}
        onLayout={onLayout}
        {...props}
      />
    );
  }
);

Content.displayName = 'ContentSelect';

const ItemContext = React.createContext<{ itemValue: string } | null>(null);

const Item = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    value: string;
    textValue?: string;
    closeOnPress?: boolean;
  }
>(
  (
    {
      asChild,
      value: itemValue,
      textValue,
      onPress: onPressProp,
      disabled = false,
      closeOnPress = true,
      ...props
    },
    ref
  ) => {
    const { onOpenChange, value, onValueChange } = useSelectContext();
    const setTriggerPosition = useRootStoreContext(
      (state) => state.setTriggerPosition
    );
    const setContentLayout = useRootStoreContext(
      (state) => state.setContentLayout
    );

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onOpenChange(false);
      }
      onValueChange(value === itemValue ? undefined : itemValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ItemContext.Provider value={{ itemValue }}>
        <Component
          ref={ref}
          role='option'
          onPress={onPress}
          disabled={disabled}
          aria-checked={value === itemValue}
          aria-valuetext={textValue}
          aria-disabled={!!disabled}
          accessibilityState={{
            disabled: !!disabled,
            checked: value === itemValue,
          }}
          {...props}
        />
      </ItemContext.Provider>
    );
  }
);

Item.displayName = 'ItemSelect';

function useItemContext() {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error(
      'Item compound components cannot be rendered outside of an Item component'
    );
  }
  return context;
}

const ItemText = React.forwardRef<
  React.ElementRef<typeof Text>,
  Omit<ComponentPropsWithAsChild<typeof Text>, 'children'> & {
    children: string;
  }
>(({ asChild, children, ...props }, ref) => {
  const { itemValue } = useItemContext();
  const itemMap = useRootStoreContext((state) => state.itemMap);
  const setItemMap = useRootStoreContext((state) => state.setItemMap);
  useEffect(() => {
    itemMap.set(itemValue, children);
    setItemMap(itemMap);
  }, [itemValue, children]);

  const Component = asChild ? Slot.Text : Text;
  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
});

ItemText.displayName = 'ItemTextSelect';

const ItemIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    forceMount?: boolean;
  }
>(({ asChild, forceMount, ...props }, ref) => {
  const { itemValue } = useItemContext();
  const { value } = useSelectContext();

  if (!forceMount) {
    if (value !== itemValue) {
      return null;
    }
  }
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='presentation' {...props} />;
});

ItemIndicator.displayName = 'ItemIndicatorSelect';

const Group = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='group' {...props} />;
});

Group.displayName = 'GroupSelect';

const Label = React.forwardRef<
  React.ElementRef<typeof Text>,
  ComponentPropsWithAsChild<typeof Text>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : Text;
  return <Component ref={ref} {...props} />;
});

Label.displayName = 'LabelSelect';

const Separator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    decorative?: boolean;
  }
>(({ asChild, decorative, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Component
      role={decorative ? 'presentation' : 'separator'}
      ref={ref}
      {...props}
    />
  );
});

Separator.displayName = 'SeparatorSelect';

export {
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Overlay,
  Portal,
  Root,
  Separator,
  Trigger,
  Value,
  ItemText,
};
