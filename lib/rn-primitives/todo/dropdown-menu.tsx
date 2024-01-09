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
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';
import {
  Insets,
  LayoutPosition,
  useRelativePosition,
} from '../hooks/useRelativePosition';

interface RootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface RootStoreContext {
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
}

const RootContext = React.createContext<RootProps | null>(null);
const RootStoreContext = React.createContext<StoreApi<RootStoreContext> | null>(
  null
);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, open, onOpenChange, ...viewProps }, ref) => {
  const nativeID = React.useId();
  const storeRef = React.useRef<StoreApi<RootStoreContext> | null>(null);
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
    <RootStoreContext.Provider value={storeRef.current}>
      <RootContext.Provider
        value={{
          open,
          onOpenChange,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </RootContext.Provider>
    </RootStoreContext.Provider>
  );
});

Root.displayName = 'RootDropdownMenu';

function useDropdownMenuContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'DropdownMenu compound components cannot be rendered outside the DropdownMenu component'
    );
  }
  return context;
}

function useRootStoreContext<T>(selector: (state: RootStoreContext) => T): T {
  const store = React.useContext(RootStoreContext);
  if (!store) {
    throw new Error(
      'DropdownMenu compound components cannot be rendered outside the DropdownMenu component'
    );
  }
  return useStore(store, selector);
}

function useGetRootStore() {
  const store = React.useContext(RootStoreContext);
  if (!store) {
    throw new Error(
      'DropdownMenu compound components cannot be rendered outside the DropdownMenu component'
    );
  }
  return store;
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const triggerRef = React.useRef<View>(null);
  const { open, onOpenChange } = useDropdownMenuContext();
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
    const newValue = !open;
    onOpenChange(newValue);
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
      aria-expanded={open}
      {...props}
    />
  );
});

Trigger.displayName = 'TriggerDropdownMenu';

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
  const value = useDropdownMenuContext();
  const triggerPosition = useRootStoreContext((state) => state.triggerPosition);
  const nativeID = useRootStoreContext((state) => state.nativeID);
  const store = useGetRootStore();

  if (!triggerPosition) {
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
    const { open, onOpenChange } = useDropdownMenuContext();
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

Overlay.displayName = 'OverlayDropdownMenu';

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
    const { open, onOpenChange } = useDropdownMenuContext();
    const nativeID = useRootStoreContext((state) => state.nativeID);
    const triggerPosition = useRootStoreContext(
      (state) => state.triggerPosition
    );
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
      if (!open) {
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

Content.displayName = 'ContentDropdownMenu';

const Item = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    onSelect?: (ev: GestureResponderEvent) => void;
    textValue?: string;
    closeOnPress?: boolean;
  }
>(
  (
    {
      asChild,
      onSelect,
      textValue,
      onPress: onPressProp,
      disabled = false,
      closeOnPress = true,
      ...props
    },
    ref
  ) => {
    const { onOpenChange } = useDropdownMenuContext();
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
      onSelect?.(ev);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        role='menuitem'
        onPress={onPress}
        disabled={disabled}
        aria-valuetext={textValue}
        aria-disabled={!!disabled}
        accessibilityState={{ disabled: !!disabled }}
        {...props}
      />
    );
  }
);

Item.displayName = 'ItemDropdownMenu';

const Group = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='group' {...props} />;
});

Group.displayName = 'GroupDropdownMenu';

const Label = React.forwardRef<
  React.ElementRef<typeof Text>,
  ComponentPropsWithAsChild<typeof Text>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : Text;
  return <Component ref={ref} {...props} />;
});

Label.displayName = 'LabelDropdownMenu';

type FormItemContext =
  | { checked: boolean }
  | {
      value: string | undefined;
      onValueChange: (value: string) => void;
    };

const FormItemContext = React.createContext<FormItemContext | null>(null);

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    closeOnPress?: boolean;
    onSelect?: (ev: GestureResponderEvent) => void;
    textValue?: string;
  }
>(
  (
    {
      asChild,
      checked,
      onCheckedChange,
      onSelect,
      textValue,
      onPress: onPressProp,
      closeOnPress = true,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { onOpenChange } = useDropdownMenuContext();
    const setTriggerPosition = useRootStoreContext(
      (state) => state.setTriggerPosition
    );
    const setContentLayout = useRootStoreContext(
      (state) => state.setContentLayout
    );
    function onPress(ev: GestureResponderEvent) {
      onCheckedChange(!checked);
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onOpenChange(false);
      }
      onSelect?.(ev);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <FormItemContext.Provider value={{ checked }}>
        <Component
          ref={ref}
          role='checkbox'
          aria-checked={checked}
          onPress={onPress}
          disabled={disabled}
          aria-disabled={!!disabled}
          aria-valuetext={textValue}
          accessibilityState={{ disabled: !!disabled }}
          {...props}
        />
      </FormItemContext.Provider>
    );
  }
);

CheckboxItem.displayName = 'CheckboxItemDropdownMenu';

function useFormItemContext() {
  const context = React.useContext(FormItemContext);
  if (!context) {
    throw new Error(
      'CheckboxItem or RadioItem compound components cannot be rendered outside of a CheckboxItem or RadioItem component'
    );
  }
  return context;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    value: string | undefined;
    onValueChange: (value: string) => void;
  }
>(({ asChild, value, onValueChange, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <FormItemContext.Provider value={{ value, onValueChange }}>
      <Component ref={ref} role='radiogroup' {...props} />
    </FormItemContext.Provider>
  );
});

RadioGroup.displayName = 'RadioGroupDropdownMenu';

type BothFormItemContext = Exclude<FormItemContext, { checked: boolean }> & {
  checked: boolean;
};

const RadioItemContext = React.createContext({} as { itemValue: string });

const RadioItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    value: string;
    onSelect?: (ev: GestureResponderEvent) => void;
    textValue?: string;
    closeOnPress?: boolean;
  }
>(
  (
    {
      asChild,
      value: itemValue,
      onSelect,
      textValue,
      onPress: onPressProp,
      disabled = false,
      closeOnPress = true,
      ...props
    },
    ref
  ) => {
    const { onOpenChange } = useDropdownMenuContext();
    const setTriggerPosition = useRootStoreContext(
      (state) => state.setTriggerPosition
    );
    const setContentLayout = useRootStoreContext(
      (state) => state.setContentLayout
    );

    const { value, onValueChange } =
      useFormItemContext() as BothFormItemContext;
    function onPress(ev: GestureResponderEvent) {
      onValueChange(itemValue);
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onOpenChange(false);
      }
      onSelect?.(ev);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <RadioItemContext.Provider value={{ itemValue }}>
        <Component
          ref={ref}
          onPress={onPress}
          role='radio'
          aria-checked={value === itemValue}
          disabled={disabled ?? false}
          accessibilityState={{
            disabled: disabled ?? false,
            checked: value === itemValue,
          }}
          aria-valuetext={textValue}
          {...props}
        />
      </RadioItemContext.Provider>
    );
  }
);

RadioItem.displayName = 'RadioItemDropdownMenu';

function useItemIndicatorContext() {
  return React.useContext(RadioItemContext);
}

const ItemIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    forceMount?: true | undefined;
  }
>(({ asChild, forceMount, ...props }, ref) => {
  const { itemValue } = useItemIndicatorContext();
  const { checked, value } = useFormItemContext() as BothFormItemContext;

  if (!forceMount) {
    if (itemValue == null && !checked) {
      return null;
    }
    if (value !== itemValue) {
      return null;
    }
  }
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='presentation' {...props} />;
});

ItemIndicator.displayName = 'ItemIndicatorDropdownMenu';

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

Separator.displayName = 'SeparatorDropdownMenu';

const SubContext = React.createContext<{
  nativeID: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
} | null>(null);
const Sub = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    open: boolean;
    onOpenChange: (value: boolean) => void;
  }
>(({ asChild, open, onOpenChange, ...props }, ref) => {
  const nativeID = React.useId();

  const Component = asChild ? Slot.View : View;
  return (
    <SubContext.Provider
      value={{
        nativeID,
        open,
        onOpenChange,
      }}
    >
      <Component ref={ref} {...props} />
    </SubContext.Provider>
  );
});

Sub.displayName = 'SubDropdownMenu';

function useSubContext() {
  const context = React.useContext(SubContext);
  if (!context) {
    throw new Error(
      'Sub compound components cannot be rendered outside of a Sub component'
    );
  }
  return context;
}

const SubTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable> & {
    textValue?: string;
  }
>(
  (
    { asChild, textValue, onPress: onPressProp, disabled = false, ...props },
    ref
  ) => {
    const { nativeID, open, onOpenChange } = useSubContext();

    function onPress(ev: GestureResponderEvent) {
      onOpenChange(!open);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        aria-valuetext={textValue}
        role='menuitem'
        aria-expanded={open}
        accessibilityState={{ expanded: open, disabled: !!disabled }}
        nativeID={nativeID}
        onPress={onPress}
        disabled={disabled}
        aria-disabled={!!disabled}
        {...props}
      />
    );
  }
);

SubTrigger.displayName = 'SubTriggerDropdownMenu';

const SubContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    forceMount?: true | undefined;
  }
>(({ asChild = false, forceMount, ...props }, ref) => {
  const { open, nativeID } = useSubContext();

  if (!forceMount) {
    if (!open) {
      return null;
    }
  }

  const Component = asChild ? Slot.View : View;
  return (
    <Component ref={ref} role='group' aria-labelledby={nativeID} {...props} />
  );
});

Content.displayName = 'ContentDropdownMenu';

export {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Overlay,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
};
