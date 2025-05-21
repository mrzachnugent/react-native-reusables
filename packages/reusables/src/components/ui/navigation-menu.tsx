import * as NavigationMenuPrimitive from '@rn-primitives/navigation-menu';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { Platform, View } from 'react-native';
import Animated, {
  Extrapolation,
  FadeInLeft,
  FadeOutLeft,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { cn } from '../../lib/utils';

function NavigationMenu({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.RootProps & {
  ref?: React.RefObject<NavigationMenuPrimitive.RootRef>;
}) {
  return (
    <NavigationMenuPrimitive.Root
      className={cn('relative z-10 flex flex-row max-w-max items-center justify-center', className)}
      {...props}
    >
      {children}
      {Platform.OS === 'web' && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: NavigationMenuPrimitive.ListProps & {
  ref?: React.RefObject<NavigationMenuPrimitive.ListRef>;
}) {
  return (
    <NavigationMenuPrimitive.List
      className={cn(
        'web:group flex flex-1 flex-row web:list-none items-center justify-center gap-1',
        className
      )}
      {...props}
    />
  );
}

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  'web:group web:inline-flex flex-row h-10 native:h-12 native:px-3 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium web:transition-colors web:hover:bg-accent active:bg-accent web:hover:text-accent-foreground web:focus:bg-accent web:focus:text-accent-foreground web:focus:outline-none web:disabled:pointer-events-none disabled:opacity-50 web:data-[active]:bg-accent/50 web:data-[state=open]:bg-accent/50'
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: Omit<NavigationMenuPrimitive.TriggerProps, 'children'> & {
  children?: React.ReactNode;
  ref?: React.RefObject<NavigationMenuPrimitive.TriggerRef>;
}) {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    value === itemValue ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(
        navigationMenuTriggerStyle(),
        'web:group gap-1.5',
        value === itemValue && 'bg-accent',
        className
      )}
      {...props}
    >
      {children}
      <Animated.View style={chevronStyle}>
        <ChevronDown
          size={12}
          className={cn('relative text-foreground h-3 w-3 web:transition web:duration-200')}
          aria-hidden={true}
        />
      </Animated.View>
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  children,
  portalHost,
  ...props
}: NavigationMenuPrimitive.ContentProps & {
  portalHost?: string;
  ref?: React.RefObject<NavigationMenuPrimitive.ContentRef>;
}) {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();
  return (
    <NavigationMenuPrimitive.Portal hostName={portalHost}>
      <NavigationMenuPrimitive.Content
        className={cn(
          'w-full native:border native:border-border native:rounded-lg native:shadow-lg native:bg-popover native:text-popover-foreground native:overflow-hidden',
          value === itemValue
            ? 'web:animate-in web:fade-in web:slide-in-from-right-20'
            : 'web:animate-out web:fade-out web:slide-out-to-left-20',
          className
        )}
        {...props}
      >
        <Animated.View
          entering={Platform.OS !== 'web' ? FadeInLeft : undefined}
          exiting={Platform.OS !== 'web' ? FadeOutLeft : undefined}
        >
          {children}
        </Animated.View>
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Portal>
  );
}

const NavigationMenuLink = NavigationMenuPrimitive.Link;

function NavigationMenuViewport({
  className,
  ...props
}: NavigationMenuPrimitive.ViewportProps & {
  ref?: React.RefObject<NavigationMenuPrimitive.ViewportRef>;
}) {
  return (
    <View className={cn('absolute left-0 top-full flex justify-center')}>
      <View
        className={cn(
          'web:origin-top-center relative mt-1.5 web:h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg web:animate-in web:zoom-in-90',
          className
        )}
        {...props}
      >
        <NavigationMenuPrimitive.Viewport />
      </View>
    </View>
  );
}

function NavigationMenuIndicator({
  ref,
  className,
  ...props
}: NavigationMenuPrimitive.IndicatorProps & {
  ref?: React.RefObject<NavigationMenuPrimitive.IndicatorRef>;
}) {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        value === itemValue ? 'web:animate-in web:fade-in' : 'web:animate-out web:fade-out',
        className
      )}
      {...props}
    >
      <View className='relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md shadow-foreground/5' />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
};
