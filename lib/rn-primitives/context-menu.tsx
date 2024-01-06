import React, { useRef } from 'react';
import {
  AccessibilityActionEvent,
  BackHandler,
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { PortalHost, Portal as RNPPortal } from '~/lib/rn-primitives/portal';
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';
import {
  Insets,
  LayoutPosition,
  useRelativePosition,
} from './hooks/useRelativePosition';
import * as Popover from '~/lib/rn-primitives/popover';
import { create } from 'zustand';

const window = Dimensions.get('window');
interface RootProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

interface RootContext extends RootProps {
  pressPosition: LayoutPosition | null;
  setPressPosition: React.Dispatch<React.SetStateAction<LayoutPosition | null>>;
  contentLayout: LayoutRectangle | null;
  setContentLayout: React.Dispatch<
    React.SetStateAction<LayoutRectangle | null>
  >;
  close: () => void;
  nativeID: string;
}

const ContextMenuContext = React.createContext({} as RootContext);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, open, onOpenChange, ...viewProps }, ref) => {
  const nativeID = React.useId();
  const [pressPosition, setPressPosition] =
    React.useState<LayoutPosition | null>(null);
  const [contentLayout, setContentLayout] =
    React.useState<LayoutRectangle | null>(null);

  const close = React.useCallback(function close() {
    setPressPosition(null);
    setContentLayout(null);
    onOpenChange(false);
  }, []);

  const Slot = asChild ? ViewSlot : View;
  return (
    <ContextMenuContext.Provider
      value={{
        open,
        onOpenChange,
        nativeID,
        pressPosition,
        setPressPosition,
        contentLayout,
        setContentLayout,
        close,
      }}
    >
      <Slot ref={ref} {...viewProps} />
    </ContextMenuContext.Provider>
  );
});

Root.displayName = 'RootContextMenu';

function useContextMenuContext() {
  const context = React.useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      'ContextMenu compound components cannot be rendered outside the ContextMenu component'
    );
  }
  return context;
}

const accessibilityActions = [{ name: 'longpress' }];

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(
  (
    {
      asChild,
      onLongPress: onLongPressProp,
      disabled = false,
      onAccessibilityAction: onAccessibilityActionProp,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange, setPressPosition } = useContextMenuContext();

    const onLongPress = React.useCallback(function onLongPress(
      ev: GestureResponderEvent
    ) {
      if (disabled) return;
      setPressPosition({
        width: 0,
        pageX: ev.nativeEvent.pageX,
        pageY: ev.nativeEvent.pageY,
        height: 0,
      });
      const newValue = !open;
      onOpenChange(newValue);
      onLongPressProp?.(ev);
    },
    []);

    function onAccessibilityAction(event: AccessibilityActionEvent) {
      if (disabled) return;
      if (event.nativeEvent.actionName === 'longpress') {
        setPressPosition({
          width: 0,
          pageX: 0,
          pageY: 0,
          height: 0,
        });
        const newValue = !open;
        onOpenChange(newValue);
      }
      onAccessibilityActionProp?.(event);
    }

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <Slot
        ref={ref}
        aria-disabled={disabled ?? undefined}
        role='button'
        onLongPress={onLongPress}
        disabled={disabled ?? undefined}
        aria-expanded={open}
        accessibilityActions={accessibilityActions}
        onAccessibilityAction={onAccessibilityAction}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'TriggerContextMenu';

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
  const value = useContextMenuContext();

  if (!value.pressPosition) {
    return null;
  }

  if (!forceMount) {
    if (!value.open) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${id}-${value.nativeID}_portal`}>
      <ContextMenuContext.Provider value={value}>
        {children}
      </ContextMenuContext.Provider>
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
    const { open, close } = useContextMenuContext();

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

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <Slot
        ref={ref}
        onPress={onPress}
        style={[StyleSheet.absoluteFill, style]}
        {...props}
      />
    );
  }
);

Overlay.displayName = 'OverlayContextMenu';

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
      pressPosition,
      contentLayout,
      setContentLayout,
      close,
    } = useContextMenuContext();
    const hasContentLayout = useRef(false);

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
      triggerPosition: pressPosition,
      contentLayout,
      alignOffset,
      insets,
      sideOffset,
      side,
    });

    const onLayout = React.useCallback(function onLayout(
      event: LayoutChangeEvent
    ) {
      if (hasContentLayout.current) return;
      setContentLayout(event.nativeEvent.layout);
      onLayoutProp?.(event);
      hasContentLayout.current = true;
    },
    []);

    if (!forceMount) {
      if (!open) {
        return null;
      }
    }

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <Slot
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

Content.displayName = 'ContentContextMenu';

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
    const { close } = useContextMenuContext();
    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        close();
      }
      onSelect?.(ev);
      onPressProp?.(ev);
    }

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <Slot
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

Item.displayName = 'ItemContextMenu';

const Group = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const Slot = asChild ? ViewSlot : View;
  return <Slot ref={ref} role='group' {...props} />;
});

Group.displayName = 'GroupContextMenu';

const Label = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => {
  return <Text ref={ref} role='heading' {...props} />;
});

Label.displayName = 'LabelContextMenu';

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
    const { close } = useContextMenuContext();
    function onPress(ev: GestureResponderEvent) {
      onCheckedChange(!checked);
      if (closeOnPress) {
        close();
      }
      onSelect?.(ev);
      onPressProp?.(ev);
    }

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <FormItemContext.Provider value={{ checked }}>
        <Slot
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

CheckboxItem.displayName = 'CheckboxItemContextMenu';

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
  const Slot = asChild ? ViewSlot : View;
  return (
    <FormItemContext.Provider value={{ value, onValueChange }}>
      <Slot ref={ref} role='radiogroup' {...props} />
    </FormItemContext.Provider>
  );
});

RadioGroup.displayName = 'RadioGroupContextMenu';

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
    const { close } = useContextMenuContext();
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

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <RadioItemContext.Provider value={{ itemValue }}>
        <Slot
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

RadioItem.displayName = 'RadioItemContextMenu';

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
  const Slot = asChild ? ViewSlot : View;
  return <Slot ref={ref} role='presentation' {...props} />;
});

ItemIndicator.displayName = 'ItemIndicatorContextMenu';

const Separator = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & {
    decorative?: boolean;
  }
>(({ asChild, decorative, ...props }, ref) => {
  const Slot = asChild ? ViewSlot : View;
  return (
    <Slot
      role={decorative ? 'presentation' : 'separator'}
      ref={ref}
      {...props}
    />
  );
});

Separator.displayName = 'SeparatorContextMenu';

const SubContext = React.createContext(
  {} as {
    nativeID: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triggerPosition: LayoutPosition | null;
    setTriggerPosition: React.Dispatch<
      React.SetStateAction<LayoutPosition | null>
    >;
  }
);
const Sub = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View>
>(({ asChild, ...props }, ref) => {
  const nativeID = React.useId();
  const [triggerPosition, setTriggerPosition] =
    React.useState<LayoutPosition | null>(null);
  const [open, setOpen] = React.useState(false);

  const Slot = asChild ? ViewSlot : View;
  return (
    <SubContext.Provider
      value={{
        nativeID,
        triggerPosition,
        setTriggerPosition,
        open,
        setOpen,
      }}
    >
      <Slot role='group' ref={ref} {...props} />
    </SubContext.Provider>
  );
});

Sub.displayName = 'SubContextMenu';

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
  React.ElementRef<typeof Popover.Trigger>,
  React.ComponentPropsWithoutRef<typeof Popover.Trigger> & {
    textValue?: string;
  }
>(({ textValue, onLayout: onLayoutProp, ...props }, ref) => {
  const triggerRef = React.useRef<View>(null);
  const { nativeID, setTriggerPosition, setOpen } = useSubContext();

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

  const onLayout = React.useCallback(function onLayout(ev: LayoutChangeEvent) {
    // setTriggerDimensions({
    //   height: ev.nativeEvent.layout.height,
    //   width: ev.nativeEvent.layout.width,
    // });
    // triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
    //   setTriggerPosition({ width, pageX, pageY: pageY, height });
    // });
    onLayoutProp?.(ev);
  }, []);

  return (
    <Pressable
      ref={triggerRef}
      aria-valuetext={textValue}
      role='menu'
      nativeID={nativeID}
      onLayout={onLayout}
      onPress={(ev) => {
        // console.log('PRESS', Object.keys(ev.target.viewConfig.validAttributes));

        triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
          console.log({
            _x,
            _y,
            width,
            height,
            pageX,
            pageY,
          });
          setTriggerPosition({
            width,
            height,
            pageX,
            pageY,
          });
        });
        setOpen((prev) => !prev);
      }}
      {...props}
    />
  );
});

SubTrigger.displayName = 'SubTriggerContextMenu';

const usePortal = create<{
  contentLayout: LayoutRectangle | null;
  setContentLayout: (layout: LayoutRectangle | null) => void;
}>((set) => ({
  contentLayout: null,
  setContentLayout: (layout: LayoutRectangle | null) =>
    set(() => ({ contentLayout: layout })),
}));

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally.
 */
const SubContent = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & ContentProps
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
    // const contentLayout = usePortal((state) => state.contentLayout);
    // const setContentLayout = usePortal((state) => state.setContentLayout);

    const { open, nativeID, triggerPosition, setOpen } = useSubContext();
    const [contentLayout, setContentLayout] =
      React.useState<LayoutRectangle | null>(null);

    React.useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          setOpen(false);
          return true;
        }
      );

      return () => {
        backHandler.remove();
      };
    }, []);

    const isCollision =
      (triggerPosition?.pageX ?? 0) +
        (triggerPosition?.width ?? 0) +
        (contentLayout?.width ?? 0) >
      window.width;

    const tempStyle =
      contentLayout && triggerPosition
        ? isCollision
          ? {
              position: 'absolute',
              top: triggerPosition.height,
              right: 0,
            }
          : {
              position: 'absolute',
              top: 0,
              left: triggerPosition.width,
            }
        : { position: 'absolute', opacity: 0 };
    console.log('tempStyle', tempStyle);

    const onLayout = React.useCallback(function onLayout(
      event: LayoutChangeEvent
    ) {
      setContentLayout(event.nativeEvent.layout);
      onLayoutProp?.(event);
    },
    []);

    if (!forceMount) {
      if (!open) {
        return null;
      }
    }

    const Slot = asChild ? PressableSlot : Pressable;
    return (
      <View
        ref={ref}
        role='menu'
        nativeID={nativeID}
        aria-modal={true}
        // style={[style, positionStyle]}
        style={tempStyle}
        // className='absolute top-32 left-32 h-32 w-32 bg-red-500'
        onLayout={onLayout}
        {...props}
      />
    );
  }
);

Content.displayName = 'ContentContextMenu';

function getAlignOffset(align: 'start' | 'end', triggerWidth: number) {
  switch (align) {
    case 'start':
      return -triggerWidth + 2;
    case 'end':
      return triggerWidth - 2;
  }
}

function getSideOffset(side: 'top' | 'bottom', triggerHeight: number) {
  switch (side) {
    case 'top':
      return triggerHeight + 2;
    case 'bottom':
      return -triggerHeight - 2;
  }
}

export {
  Content,
  Overlay,
  Portal,
  Root,
  Trigger,
  Item,
  Group,
  Label,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  Separator,
  Sub,
  SubTrigger,
  SubContent,
};
