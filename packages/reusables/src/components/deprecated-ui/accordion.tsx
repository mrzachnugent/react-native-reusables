import { ChevronDown } from '../../lib/icons/ChevronDown';
import * as React from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import Animated, {
  AnimatedRef,
  Extrapolation,
  SharedValue,
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Separator } from '../../components/deprecated-ui/separator';
import { cn } from '../../lib/utils';

const Accordion = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View role='presentation' ref={ref} className={className} {...props} />
));

Accordion.displayName = 'Accordion';

interface AccordionItemProps {
  disabled?: boolean;
  defaultOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
}

interface AccordionItemContext extends AccordionItemProps {
  innerContentRef: AnimatedRef<View>;
  contentHeight: SharedValue<number>;
  progress: SharedValue<number>;
  open: SharedValue<boolean>;
  nativeID: string;
}

const AccordionItemContext = React.createContext<AccordionItemContext>({} as AccordionItemContext);

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & AccordionItemProps
>(({ className, disabled = false, defaultOpen = false, onChange, ...props }, ref) => {
  const nativeID = React.useId();
  const open = useSharedValue(defaultOpen);
  const contentHeight = useSharedValue(0);
  const innerContentRef = useAnimatedRef<View>();
  const progress = useDerivedValue(() => (open.value ? withTiming(1) : withTiming(0)));
  return (
    <AccordionItemContext.Provider
      value={{
        disabled,
        onChange,
        innerContentRef,
        contentHeight,
        open,
        progress,
        nativeID,
      }}
    >
      <View ref={ref} className={cn(className, 'overflow-hidden')} {...props} />
    </AccordionItemContext.Provider>
  );
});

AccordionItem.displayName = 'AccordionItem';

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem compound components cannot be rendered outside the AccordionItem component'
    );
  }
  return context;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'onPress'> & {
    children: React.ReactNode;
  }
>(({ children, className, ...props }, ref) => {
  const { contentHeight, open, innerContentRef, onChange, disabled, nativeID, progress } =
    useAccordionItemContext();
  const [isOpen, setIsOpen] = React.useState(open.value);

  const chevronAnimationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: contentHeight.value === 0 ? '0deg' : `${progress.value * 180}deg`,
      },
    ],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  function onPress() {
    if (disabled) return;
    if (contentHeight.value === 0) {
      runOnUI(() => {
        'worklet';
        contentHeight.value = measure(innerContentRef)?.height ?? 0;
      })();
    }
    open.value = !open.value;
    setIsOpen(open.value);
    onChange?.(open.value);
  }

  return (
    <>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        aria-expanded={isOpen}
        nativeID={nativeID}
        ref={ref}
        className={cn('flex-row justify-between items-center p-4', className)}
        {...props}
      >
        <View className={'flex-1'}>{children}</View>
        <Animated.View style={chevronAnimationStyle}>
          <ChevronDown className='text-foreground' />
        </Animated.View>
      </Pressable>
      <Separator />
    </>
  );
});

AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Animated.View>,
  Omit<React.ComponentPropsWithoutRef<typeof Animated.View>, 'onLayout'> & {
    children: React.ReactNode;
  }
>(({ children, className, ...props }, ref) => {
  const { contentHeight, innerContentRef, nativeID, progress } = useAccordionItemContext();

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [0, contentHeight.value], Extrapolation.CLAMP),
  }));

  const onLayout = React.useCallback(
    ({
      nativeEvent: {
        layout: { height },
      },
    }: LayoutChangeEvent) => {
      contentHeight.value = height;
    },
    [contentHeight]
  );

  return (
    <Animated.View style={heightAnimationStyle} aria-labelledby={nativeID}>
      <View className='absolute top-0 w-full' ref={innerContentRef}>
        <Animated.View
          ref={ref}
          className={cn('pb-4 pt-0', className, 'flex-1')}
          onLayout={onLayout}
          role='summary'
          {...props}
        >
          {children}
        </Animated.View>
      </View>
    </Animated.View>
  );
});

AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
