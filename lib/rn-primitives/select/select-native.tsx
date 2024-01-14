import React from 'react';
import {
  BackHandler,
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from 'react-native';
import { createStore, useStore, type StoreApi } from 'zustand';
import {
  useRelativePosition,
  type LayoutPosition,
} from '../hooks/useRelativePosition';
import { Portal as RNPPortal } from '../portal';
import * as Slot from '../slot';
import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../types';
import type {
  SelectContentProps,
  SelectItemProps,
  SelectOverlayProps,
  SelectPortalProps,
  SelectRootProps,
  SelectSeparatorProps,
  SelectValueProps,
} from './types';

interface RootStoreContext {
  pressPosition: LayoutPosition | null;
  setTriggerPosition: (pressPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
}

const RootContext = React.createContext<SelectRootProps | null>(null);
const RootStoreContext = React.createContext<StoreApi<RootStoreContext> | null>(
  null
);

const Root = React.forwardRef<ViewRef, SlottableViewProps & SelectRootProps>(
  (
    {
      asChild,
      value,
      onValueChange,
      open,
      onOpenChange,
      disabled,
      ...viewProps
    },
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
      }));
    }

    const Component = asChild ? Slot.View : View;
    return (
      <RootStoreContext.Provider value={storeRef.current}>
        <RootContext.Provider
          value={{ value, onValueChange, open, onOpenChange, disabled }}
        >
          <Component ref={ref} {...viewProps} />
        </RootContext.Provider>
      </RootStoreContext.Provider>
    );
  }
);

Root.displayName = 'RootNativeSelect';

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

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const triggerRef = React.useRef<View>(null);
    const { open, onOpenChange, disabled: disabledRoot } = useSelectContext();
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
        disabled={disabled ?? disabledRoot}
        aria-expanded={open}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'TriggerNativeSelect';

const Value = React.forwardRef<TextRef, SlottableTextProps & SelectValueProps>(
  ({ asChild, placeholder, ...props }, ref) => {
    const { value } = useSelectContext();
    const Component = asChild ? Slot.Text : Text;
    return (
      <Component ref={ref} {...props}>
        {value?.label ?? placeholder}
      </Component>
    );
  }
);

Value.displayName = 'ValueNativeSelect';

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset.
 */
function Portal({ forceMount, hostName, children }: SelectPortalProps) {
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
  PressableRef,
  SlottablePressableProps & SelectOverlayProps
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
    return <Component ref={ref} onPress={onPress} {...props} />;
  }
);

Overlay.displayName = 'OverlayNativeSelect';

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally. Opt out of this behavior by setting `disablePositioningStyle` to `true`.
 */
const Content = React.forwardRef<
  ViewRef,
  SlottableViewProps & PositionedContentProps & SelectContentProps
>(
  (
    {
      asChild = false,
      forceMount,
      align = 'start',
      side = 'bottom',
      sideOffset = 0,
      alignOffset = 0,
      avoidCollisions = true,
      onLayout: onLayoutProp,
      insets,
      style,
      disablePositioningStyle,
      position: _position,
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

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        role='list'
        nativeID={nativeID}
        aria-modal={true}
        style={[positionStyle, style]}
        onLayout={onLayout}
        onStartShouldSetResponder={onStartShouldSetResponder}
        {...props}
      />
    );
  }
);

Content.displayName = 'ContentNativeSelect';

const ItemContext = React.createContext<{
  itemValue: string;
  label: string;
} | null>(null);

const Item = React.forwardRef<
  PressableRef,
  SlottablePressableProps & SelectItemProps
>(
  (
    {
      asChild,
      value: itemValue,
      label,
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

      onValueChange(
        value?.value === itemValue ? undefined : { value: itemValue, label }
      );
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ItemContext.Provider value={{ itemValue, label }}>
        <Component
          ref={ref}
          role='option'
          onPress={onPress}
          disabled={disabled}
          aria-checked={value?.value === itemValue}
          aria-valuetext={label}
          aria-disabled={!!disabled}
          accessibilityState={{
            disabled: !!disabled,
            checked: value?.value === itemValue,
          }}
          {...props}
        />
      </ItemContext.Provider>
    );
  }
);

Item.displayName = 'ItemNativeSelect';

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
  TextRef,
  Omit<SlottableTextProps, 'children'>
>(({ asChild, ...props }, ref) => {
  const { label } = useItemContext();

  const Component = asChild ? Slot.Text : Text;
  return (
    <Component ref={ref} {...props}>
      {label}
    </Component>
  );
});

ItemText.displayName = 'ItemTextNativeSelect';

const ItemIndicator = React.forwardRef<
  ViewRef,
  SlottableViewProps & ForceMountable
>(({ asChild, forceMount, ...props }, ref) => {
  const { itemValue } = useItemContext();
  const { value } = useSelectContext();

  if (!forceMount) {
    if (value?.value !== itemValue) {
      return null;
    }
  }
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='presentation' {...props} />;
});

ItemIndicator.displayName = 'ItemIndicatorNativeSelect';

const Group = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} role='group' {...props} />;
  }
);

Group.displayName = 'GroupNativeSelect';

const Label = React.forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return <Component ref={ref} {...props} />;
  }
);

Label.displayName = 'LabelNativeSelect';

const Separator = React.forwardRef<
  ViewRef,
  SlottableViewProps & SelectSeparatorProps
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

Separator.displayName = 'SeparatorNativeSelect';

export {
  Content,
  Group,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Overlay,
  Portal,
  Root,
  Separator,
  Trigger,
  Value,
};

function onStartShouldSetResponder() {
  return true;
}
