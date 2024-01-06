import React from 'react';
import {
  BackHandler,
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  Pressable,
  StyleSheet,
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
  nativeID: string;
}

const PopoverContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, open, onOpenChange, ...viewProps }, ref) => {
  const nativeID = React.useId();
  const [triggerPosition, setTriggerPosition] =
    React.useState<LayoutPosition | null>(null);
  const [contentLayout, setContentLayout] =
    React.useState<LayoutRectangle | null>(null);

  const Component = asChild ? Slot.View : View;
  return (
    <PopoverContext.Provider
      value={{
        open,
        onOpenChange,
        nativeID,
        triggerPosition,
        setTriggerPosition,
        contentLayout,
        setContentLayout,
      }}
    >
      <Component ref={ref} {...viewProps} />
    </PopoverContext.Provider>
  );
});

Root.displayName = 'RootPopover';

function usePopoverContext() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error(
      'Popover compound components cannot be rendered outside the Popover component'
    );
  }
  return context;
}

const Trigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const triggerRef = React.useRef<View>(null);
  const { open, onOpenChange, setTriggerPosition } = usePopoverContext();

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
      {...props}
    />
  );
});

Trigger.displayName = 'TriggerPopover';

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
  const value = usePopoverContext();

  if (!value.triggerPosition) {
    return null;
  }

  if (!forceMount) {
    if (!value.open) {
      return null;
    }
  }

  return (
    <RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
      <PopoverContext.Provider value={value}>
        {children}
      </PopoverContext.Provider>
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
    const { open, onOpenChange, setTriggerPosition, setContentLayout } =
      usePopoverContext();

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

Overlay.displayName = 'OverlayPopover';

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
      onOpenChange,
      setTriggerPosition,
    } = usePopoverContext();

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
        role='dialog'
        nativeID={nativeID}
        aria-modal={true}
        style={[style, positionStyle]}
        onLayout={onLayout}
        {...props}
      />
    );
  }
);

Content.displayName = 'ContentPopover';

const Close = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ComponentPropsWithAsChild<typeof Pressable>
>(({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
  const { onOpenChange, setTriggerPosition, setContentLayout } =
    usePopoverContext();

  function onPress(ev: GestureResponderEvent) {
    if (disabled) return;
    setTriggerPosition(null);
    setContentLayout(null);
    onOpenChange(false);
    onPressProp?.(ev);
  }

  const Component = asChild ? Slot.Pressable : Pressable;
  return (
    <Component
      ref={ref}
      aria-disabled={disabled ?? undefined}
      role='button'
      onPress={onPress}
      disabled={disabled ?? undefined}
      {...props}
    />
  );
});

Close.displayName = 'ClosePopover';

export { Close, Content, Overlay, Portal, Root, Trigger };
