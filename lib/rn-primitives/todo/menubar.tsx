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
      <Component ref={ref} {...viewProps} />
    </RootContext.Provider>
  );
});

Root.displayName = 'RootMenubar';

function useMenubarContext() {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error(
      'Menubar compound components cannot be rendered outside the Menubar component'
    );
  }
  return context;
}

interface MenuProps {
  value: string | undefined;
}

interface MenuStoreContext {
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
}

const MenuContext = React.createContext<MenuProps | null>(null);
const MenuStoreContext = React.createContext<StoreApi<MenuStoreContext> | null>(
  null
);

const Menu = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & MenuProps
>(({ asChild, value, ...viewProps }, ref) => {
  const nativeID = React.useId();
  const storeRef = React.useRef<StoreApi<MenuStoreContext> | null>(null);
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
    <MenuStoreContext.Provider value={storeRef.current}>
      <MenuContext.Provider
        value={{
          value,
        }}
      >
        <Component ref={ref} role='menubar' {...viewProps} />
      </MenuContext.Provider>
    </MenuStoreContext.Provider>
  );
});

Menu.displayName = 'MenuMenubar';

function useMenuContext() {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error(
      'Menubar compound components cannot be rendered outside the Menubar component'
    );
  }
  return context;
}

function useMenuStoreContext<T>(selector: (state: MenuStoreContext) => T): T {
  const store = React.useContext(MenuStoreContext);
  if (!store) {
    throw new Error(
      'Menubar compound components cannot be rendered outside the Menubar component'
    );
  }
  return useStore(store, selector);
}

function useGetMenuStore() {
  const store = React.useContext(MenuStoreContext);
  if (!store) {
    throw new Error(
      'Menubar compound components cannot be rendered outside the Menubar component'
    );
  }
  return store;
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const triggerRef = React.useRef<View>(null);
  const { value, onValueChange } = useMenubarContext();
  const { value: menuValue } = useMenuContext();
  const setTriggerPosition = useMenuStoreContext(
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
      setTriggerPosition({ width, pageX, pageY, height });
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

Trigger.displayName = 'TriggerMenubar';

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
  const menubar = useMenubarContext();
  const menu = useMenuContext();
  const triggerPosition = useMenuStoreContext((state) => state.triggerPosition);
  const nativeID = useMenuStoreContext((state) => state.nativeID);
  const store = useGetMenuStore();

  if (!triggerPosition) {
    return null;
  }

  if (!forceMount) {
    if (menubar.value !== menu.value) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${nativeID}_portal`}>
      <RootContext.Provider
        value={menubar}
        key={`RootContex_t${nativeID}_portal`}
      >
        <MenuStoreContext.Provider
          value={store}
          key={`MenuStoreContext_${nativeID}_portal`}
        >
          <MenuContext.Provider
            value={menu}
            key={`MenuContext_${nativeID}_portal`}
          >
            {children}
          </MenuContext.Provider>
        </MenuStoreContext.Provider>
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
    const { value, onValueChange } = useMenubarContext();
    const setTriggerPosition = useMenuStoreContext(
      (state) => state.setTriggerPosition
    );
    const setContentLayout = useMenuStoreContext(
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

Overlay.displayName = 'OverlayMenubar';

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
    const { value, onValueChange } = useMenubarContext();
    const { value: menuValue } = useMenuContext();
    const nativeID = useMenuStoreContext((state) => state.nativeID);
    const triggerPosition = useMenuStoreContext(
      (state) => state.triggerPosition
    );
    const setTriggerPosition = useMenuStoreContext(
      (state) => state.setTriggerPosition
    );
    const contentLayout = useMenuStoreContext((state) => state.contentLayout);
    const setContentLayout = useMenuStoreContext(
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

Content.displayName = 'ContentMenubar';

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
    const { onValueChange } = useMenubarContext();
    const setTriggerPosition = useMenuStoreContext(
      (state) => state.setTriggerPosition
    );
    const setContentLayout = useMenuStoreContext(
      (state) => state.setContentLayout
    );
    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onValueChange(undefined);
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

Item.displayName = 'ItemMenubar';

const Group = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role='group' {...props} />;
});

Group.displayName = 'GroupMenubar';

const Label = React.forwardRef<
  React.ElementRef<typeof Text>,
  ComponentPropsWithAsChild<typeof Text>
>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : Text;
  return <Component ref={ref} {...props} />;
});

Label.displayName = 'LabelMenubar';

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
    const { onValueChange } = useMenubarContext();
    const setTriggerPosition = useMenuStoreContext(
      (state) => state.setTriggerPosition
    );
    const setContentLayout = useMenuStoreContext(
      (state) => state.setContentLayout
    );
    function onPress(ev: GestureResponderEvent) {
      onCheckedChange(!checked);
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onValueChange(undefined);
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

CheckboxItem.displayName = 'CheckboxItemMenubar';

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

RadioGroup.displayName = 'RadioGroupMenubar';

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
    const { onValueChange: onRootValueChange } = useMenubarContext();
    const setTriggerPosition = useMenuStoreContext(
      (state) => state.setTriggerPosition
    );
    const setContentLayout = useMenuStoreContext(
      (state) => state.setContentLayout
    );

    const { value, onValueChange } =
      useFormItemContext() as BothFormItemContext;
    function onPress(ev: GestureResponderEvent) {
      onValueChange(itemValue);
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onRootValueChange(undefined);
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

RadioItem.displayName = 'RadioItemMenubar';

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

ItemIndicator.displayName = 'ItemIndicatorMenubar';

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

Separator.displayName = 'SeparatorMenubar';

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

Sub.displayName = 'SubMenubar';

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

SubTrigger.displayName = 'SubTriggerMenubar';

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

SubContent.displayName = 'SubContentMenubar';

export {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Menu,
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
