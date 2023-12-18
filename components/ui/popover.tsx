import { VariantProps } from 'class-variance-authority';
import * as Haptics from 'expo-haptics';
import { useColorScheme } from 'nativewind';
import React, { useImperativeHandle } from 'react';
import {
  GestureResponderEvent,
  LayoutRectangle,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '~/lib/utils';
import { buttonVariants } from './button';

interface LayoutPosition {
  pageY: number;
  pageX: number;
  width: number;
  height: number;
}

interface PopoverContext {
  triggerRef: React.RefObject<View>;
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: React.Dispatch<
    React.SetStateAction<LayoutPosition | null>
  >;
  nativeID: string;
}

const PopoverContext = React.createContext({} as PopoverContext);

const Popover = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>((props, ref) => {
  const nativeID = React.useId();
  const triggerRef = React.useRef<View>(null);
  const [triggerPosition, setTriggerPosition] =
    React.useState<LayoutPosition | null>(null);

  return (
    <PopoverContext.Provider
      key={`popover-provider-${nativeID}`}
      value={{
        triggerRef,
        triggerPosition,
        setTriggerPosition,
        nativeID,
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
    throw new Error(
      'Popover compound components cannot be rendered outside the Popover component'
    );
  }
  return context;
}

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof buttonVariants> & {
      textClass?: string;
    }
>(
  (
    { textClass, children, variant, size, className, onPress, ...props },
    ref
  ) => {
    const { triggerRef, setTriggerPosition } = usePopoverContext();

    function handleOnPress(event: GestureResponderEvent) {
      triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY: pageY, height });
      });
      onPress?.(event);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

    return (
      <Pressable
        className={cn(buttonVariants({ variant, size, className }))}
        ref={triggerRef}
        onPress={handleOnPress}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof Modal>,
  Omit<React.ComponentPropsWithoutRef<typeof Modal>, 'width'> & {
    overlayClass?: string;
    width?: 'auto' | number;
    align?: 'left' | 'right';
    position?: 'auto' | 'top' | 'bottom';
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
      style,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const { triggerPosition, setTriggerPosition } = usePopoverContext();
    const [contentLayout, setContentLayout] =
      React.useState<LayoutRectangle | null>(null);

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
        {...props}
      >
        <Pressable
          aria-hidden={!!triggerPosition}
          onPressOut={() => {
            setTriggerPosition(null);
            setContentLayout(null);
          }}
          className={cn(
            'flex-1 bg-zinc-50/30 dark:bg-zinc-900/30',
            overlayClass
          )}
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
                colorScheme === 'dark' ? styles.shadowDark : styles.shadowLight,
                style,
              ]}
              className={cn(
                'bg-popover rounded-2xl p-8 border border-border',
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

export { Popover, PopoverContent, PopoverTrigger };

interface GetContentPositionArgs {
  position: 'auto' | 'top' | 'bottom';
  align: 'left' | 'right';
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
      align === 'left'
        ? triggerPosition?.pageX
        : triggerPosition?.pageX +
          triggerPosition?.width -
          (width === 'auto' ? triggerPosition?.width : width),
    width: width === 'auto' ? triggerPosition?.width : width,
    maxWidth: width,
  };
}

const styles = StyleSheet.create({
  shadowLight: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  shadowDark: {
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});
