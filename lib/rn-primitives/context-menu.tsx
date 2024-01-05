import React from 'react';
import {
  AccessibilityActionEvent,
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
import { PressableSlot, ViewSlot } from '~/lib/rn-primitives/slot';
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
  pressPosition: LayoutPosition | null;
  setPressPosition: React.Dispatch<React.SetStateAction<LayoutPosition | null>>;
  contentLayout: LayoutRectangle | null;
  setContentLayout: React.Dispatch<
    React.SetStateAction<LayoutRectangle | null>
  >;
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
    const triggerRef = React.useRef<View>(null);
    const { open, onOpenChange, setPressPosition } = useContextMenuContext();

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

    function onLongPress(ev: GestureResponderEvent) {
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
    }

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
        ref={triggerRef}
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
    <RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
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
    const { open, onOpenChange, setPressPosition, setContentLayout } =
      useContextMenuContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        setPressPosition(null);
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
      onOpenChange,
      setPressPosition,
    } = useContextMenuContext();

    React.useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          setPressPosition(null);
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

// TODO:
// Item
// Group
// Label
// CheckboxItem
// RadioGroup
// RadioItem
// ItemIndicator
// Separator
// Sub
// SubTrigger
// SubContent

export { Content, Overlay, Portal, Root, Trigger };
