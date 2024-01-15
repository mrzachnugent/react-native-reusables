import * as React from 'react';
import * as AccordionPrimitive from '~/lib/rn-primitives/accordion';

import { ChevronDown } from 'lucide-react-native';
import { Platform, View } from 'react-native';
import Animated, {
  Extrapolate,
  FadeInUp,
  FadeOutUp,
  Layout,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '~/lib/utils';

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      {...props}
      asChild={Platform.OS !== 'web'}
    >
      <Animated.View layout={Layout.duration(200)}>{children}</Animated.View>
    </AccordionPrimitive.Root>
  );
});

Accordion.displayName = AccordionPrimitive.Root.displayName;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, value, ...props }, ref) => {
  return (
    <Animated.View className={'overflow-hidden'} layout={Layout.duration(200)}>
      <AccordionPrimitive.Item
        ref={ref}
        className={cn('border-b border-border', className)}
        value={value}
        {...props}
      />
    </Animated.View>
  );
});
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    isExpanded
      ? withTiming(1, { duration: 250 })
      : withTiming(0, { duration: 200 })
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolate.CLAMP),
  }));

  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger ref={ref} {...props} asChild>
        <View
          className={cn(
            'flex flex-row web:flex-1 rounded-md items-center justify-between py-4 transition-all group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground',
            className
          )}
        >
          {children}
          <Animated.View style={chevronStyle}>
            <ChevronDown size={18} className={'text-foreground shrink-0'} />
          </Animated.View>
        </View>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  return (
    <AccordionPrimitive.Content
      className={cn(
        'overflow-hidden text-sm transition-all',
        isExpanded ? 'animate-accordion-down' : 'animate-accordion-up'
      )}
      ref={ref}
      {...props}
    >
      <InnerContent className={cn('pb-4', className)}>{children}</InnerContent>
    </AccordionPrimitive.Content>
  );
});

function InnerContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  if (Platform.OS === 'web') {
    return <View className={cn('pb-4', className)}>{children}</View>;
  }
  return (
    <Animated.View
      entering={FadeInUp.duration(220)}
      exiting={FadeOutUp.duration(200)}
      className={cn('pb-4', className)}
    >
      {children}
    </Animated.View>
  );
}

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
