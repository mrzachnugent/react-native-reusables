import { VariantProps } from 'class-variance-authority';
import React, { useImperativeHandle } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  LayoutRectangle,
  Modal,
  Pressable,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Slot from '@rn-primitives/slot';
import { cn } from '../../lib/utils';
import { Button, buttonVariants } from './button';

const windowWidth = Dimensions.get('window').width;

const MARGIN_X = 12;
interface LayoutPosition {
  pageY: number;
  pageX: number;
  width: number;
  height: number;
}

interface PopoverContext {
  triggerRef: React.RefObject<View>;
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: React.Dispatch<React.SetStateAction<LayoutPosition | null>>;
  contentLayout: LayoutRectangle | null;
  setContentLayout: React.Dispatch<React.SetStateAction<LayoutRectangle | null>>;
}

const PopoverContext = React.createContext({} as PopoverContext);

const Popover = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>((props, ref) => {
  const triggerRef = React.useRef<View>(null);
  const [triggerPosition, setTriggerPosition] = React.useState<LayoutPosition | null>(null);
  const [contentLayout, setContentLayout] = React.useState<LayoutRectangle | null>(null);

  return (
    <PopoverContext.Provider
      value={{
        triggerRef,
        triggerPosition,
        setTriggerPosition,
        contentLayout,
        setContentLayout,
      }}
    >
      <View ref={ref} {...props} />
    </PopoverContext.Provider>
  );
});

Popover.displayName = 'Popover';

function usePopoverContext() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover compound components cannot be rendered outside the Popover component');
  }
  return context;
}

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ asChild, onPress, ...props }, ref) => {
  const { triggerRef, setTriggerPosition } = usePopoverContext();

  function handleOnPress(event: GestureResponderEvent) {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerPosition({ width, pageX, pageY: pageY, height });
    });
    onPress?.(event);
  }

  useImperativeHandle(
    ref,
    () => {
      if (!triggerRef.current) {
        return new View({});
      }
      return triggerRef.current;
    },
    [triggerRef.current]
  );

  const Trigger = asChild ? Slot.Pressable : Button;
  return <Trigger ref={triggerRef} onPress={handleOnPress} {...props} />;
});

PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ asChild, onPress, ...props }, ref) => {
  const { setTriggerPosition, setContentLayout } = usePopoverContext();

  function handleOnPress(event: GestureResponderEvent) {
    setTriggerPosition(null);
    setContentLayout(null);
    onPress?.(event);
  }

  const Trigger = asChild ? Slot.Pressable : Button;
  return <Trigger ref={ref} onPress={handleOnPress} {...props} />;
});

PopoverClose.displayName = 'PopoverClose';

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof Modal>,
  Omit<React.ComponentPropsWithoutRef<typeof Modal>, 'width' | 'style'> & {
    overlayClass?: string;
    width?: 'auto' | number;
    align?: 'left' | 'right' | 'center';
    position?: 'auto' | 'top' | 'bottom';
    style?: ViewStyle;
  }
>(
  (
    {
      className,
      children,
      animationType = 'fade',
      width = 'auto',
      align = 'left',
      position = 'auto',
      overlayClass,
      style: styleProp,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const { triggerPosition, setTriggerPosition, contentLayout, setContentLayout } =
      usePopoverContext();

    return (
      <Modal
        ref={ref}
        animationType={animationType}
        transparent={true}
        visible={!!triggerPosition}
        aria-modal
        onRequestClose={() => {
          setTriggerPosition(null);
          setContentLayout(null);
        }}
        statusBarTranslucent
        {...props}
      >
        <Pressable
          aria-hidden={!!triggerPosition}
          onPressOut={() => {
            setTriggerPosition(null);
            setContentLayout(null);
          }}
          className={cn('flex-1 bg-zinc-50/30 dark:bg-zinc-900/30', overlayClass)}
        >
          {!!triggerPosition && (
            <Pressable
              onLayout={(event) => {
                setContentLayout(event.nativeEvent.layout);
              }}
              style={[
                getContentPosition({
                  align,
                  contentLayout,
                  insetsTop: insets.top,
                  position,
                  triggerPosition,
                  width,
                }),
                styleProp,
                { maxWidth: windowWidth - MARGIN_X * 2 },
              ]}
              className={cn(
                'bg-popover rounded-2xl p-8 border border-border shadow-lg shadow-foreground/5',
                !contentLayout && 'opacity-0',
                className
              )}
            >
              {children}
            </Pressable>
          )}
        </Pressable>
      </Modal>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverClose, PopoverContent, PopoverTrigger };

interface GetContentPositionArgs {
  position: 'auto' | 'top' | 'bottom';
  align: 'left' | 'right' | 'center';
  triggerPosition: LayoutPosition;
  contentLayout: LayoutRectangle | null;
  insetsTop: number;
  width: number | 'auto';
}

function getContentPosition({
  align,
  contentLayout,
  insetsTop,
  position,
  triggerPosition,
  width,
}: GetContentPositionArgs) {
  const positionTop = triggerPosition?.pageY - 6 - (contentLayout?.height ?? 0);
  const positionBottom = triggerPosition.pageY + triggerPosition.height + 6;

  const alignCenter =
    triggerPosition?.pageX +
    triggerPosition?.width / 2 -
    (width === 'auto' ? triggerPosition?.width : width) / 2;

  const maxLeft = windowWidth - (width === 'auto' ? triggerPosition.width : width);

  return {
    top:
      position === 'auto'
        ? triggerPosition.pageY > (contentLayout?.height ?? 0) + insetsTop
          ? positionTop
          : positionBottom
        : position === 'top'
        ? positionTop
        : positionBottom,
    left:
      align === 'center'
        ? alignCenter > maxLeft
          ? MARGIN_X
          : alignCenter
        : align === 'left'
        ? triggerPosition?.pageX
        : triggerPosition?.pageX +
          triggerPosition?.width -
          (width === 'auto' ? triggerPosition?.width : width),
    width: width === 'auto' ? triggerPosition?.width : width,
    maxWidth: width,
  };
}
