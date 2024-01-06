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
import { Portal as RNPPortal } from '~/lib/rn-primitives/portal';
import * as Slot from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';
import {
  Insets,
  LayoutPosition,
  useRelativePosition,
} from './hooks/useRelativePosition';

interface RootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface RootContext extends RootProps {
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: React.Dispatch<
    React.SetStateAction<LayoutPosition | null>
  >;
  contentLayout: LayoutRectangle | null;
  setContentLayout: React.Dispatch<
    React.SetStateAction<LayoutRectangle | null>
  >;
  close: () => void;
  nativeID: string;
}

const DropdownMenuContext = React.createContext({} as RootContext);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, open, onOpenChange, ...viewProps }, ref) => {
  const nativeID = React.useId();
  const [triggerPosition, setTriggerPosition] =
    React.useState<LayoutPosition | null>(null);
  const [contentLayout, setContentLayout] =
    React.useState<LayoutRectangle | null>(null);

  function close() {
    setTriggerPosition(null);
    setContentLayout(null);
    onOpenChange(false);
  }

  const Component = asChild ? Slot.View : View;
  return (
    <DropdownMenuContext.Provider
      value={{
        open,
        onOpenChange,
        nativeID,
        triggerPosition,
        setTriggerPosition,
        contentLayout,
        setContentLayout,
        close,
      }}
    >
      <Component ref={ref} {...viewProps} />
    </DropdownMenuContext.Provider>
  );
});

Root.displayName = 'RootDropdownMenu';

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      'DropdownMenu compound components cannot be rendered outside the DropdownMenu component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(
  (
    {
      asChild,
      onPress: onPressProp,
      disabled = false,
      onAccessibilityAction: onAccessibilityActionProp,
      ...props
    },
    ref
  ) => {
    const triggerRef = React.useRef<View>(null);
    const { open, onOpenChange, setTriggerPosition } = useDropdownMenuContext();

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
  }
);

Trigger.displayName = 'TriggerDropdownMenu';

/**
 * @warning when using a custom `<PortalHost />`, you will have to adjust the Content's sideOffset to account for nav elements like headers.
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
  const id = React.useId();
  const value = useDropdownMenuContext();

  if (!value.triggerPosition) {
    return null;
  }

  if (!forceMount) {
    if (!value.open) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${id}-${value.nativeID}_portal`}>
      <DropdownMenuContext.Provider value={value}>
        {children}
      </DropdownMenuContext.Provider>
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
    const { open, close } = useDropdownMenuContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        close();
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
  forceMount?: boolean;
  style?: Omit<ViewStyle, 'position' | 'top' | 'left' | 'maxWidth'>;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  insets?: Insets;
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
}

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally.
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
      ...props
    },
    ref
  ) => {
    const {
      open,
      nativeID,
      triggerPosition,
      contentLayout,
      setContentLayout,
      close,
    } = useDropdownMenuContext();

    React.useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          close();
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
        style={[style, positionStyle]}
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
    const { close } = useDropdownMenuContext();
    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        close();
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
  return <Component ref={ref} role='heading' {...props} />;
});

Label.displayName = 'LabelDropdownMenu';

type FormItemContext =
  | { checked: boolean }
  | {
      value: string | undefined;
      onValueChange: (value: string) => void;
    };

const FormItemContext = React.createContext({} as FormItemContext);

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
    const { close } = useDropdownMenuContext();
    function onPress(ev: GestureResponderEvent) {
      onCheckedChange(!checked);
      if (closeOnPress) {
        close();
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
    const { close } = useDropdownMenuContext();
    const { value, onValueChange } =
      useFormItemContext() as BothFormItemContext;
    function onPress(ev: GestureResponderEvent) {
      onValueChange(itemValue);
      if (closeOnPress) {
        close();
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
  const context = React.useContext(RadioItemContext);
  if (!context) {
    return { itemValue: null };
  }
  return context;
}

const ItemIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    forceMount?: boolean;
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

const SubContext = React.createContext(
  {} as {
    nativeID: string;
    open: boolean;
    onOpenChange: (value: boolean) => void;
  }
);
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
    forceMount?: boolean;
  }
>(({ asChild = false, forceMount = false, ...props }, ref) => {
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
