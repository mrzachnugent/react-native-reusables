import { VariantProps } from 'class-variance-authority';
import * as Haptics from 'expo-haptics';
import { useColorScheme } from 'nativewind';
import React, { useImperativeHandle } from 'react';
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof Modal>,
  Omit<React.ComponentPropsWithoutRef<typeof Modal>, 'width'> & {
    overlayClass?: string;
    width?: 'auto' | number;
    align?: 'left' | 'right';
  }
>(
  (
    {
      className,
      children,
      animationType = 'fade',
      width = 'auto',
      align = 'left',
      overlayClass,
      ...props
    },
    ref
  ) => {
    const { colorScheme } = useColorScheme();
    const { triggerPosition, setTriggerPosition } = usePopoverContext();

    return (
      <Modal
        ref={ref}
        animationType={animationType}
        transparent={true}
        visible={!!triggerPosition}
        aria-modal
        onRequestClose={() => {
          setTriggerPosition(null);
        }}
        {...props}
      >
        <Pressable
          aria-hidden={!!triggerPosition}
          onPressOut={() => {
            setTriggerPosition(null);
          }}
          className={cn('flex-1', overlayClass)}
        >
          {!!triggerPosition && (
            <AnimatedPressable
              entering={FadeIn}
              style={[
                {
                  top: triggerPosition.pageY + triggerPosition.height + 6,
                  left:
                    align === 'left'
                      ? triggerPosition.pageX
                      : triggerPosition.pageX +
                        triggerPosition.width -
                        (width === 'auto' ? triggerPosition.width : width),
                  width: width === 'auto' ? triggerPosition.width : width,
                  maxWidth: width,
                },
                colorScheme === 'dark' ? styles.shadowDark : styles.shadowLight,
              ]}
              className={cn(
                'bg-popover rounded-2xl p-8 border border-border',
                className
              )}
            >
              {children}
            </AnimatedPressable>
          )}
        </Pressable>
      </Modal>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverContent, PopoverTrigger };

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
