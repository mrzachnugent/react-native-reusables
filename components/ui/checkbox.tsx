import React from 'react';
import { Check } from 'lucide-react-native';

import { cn } from '~/lib/utils';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface CheckboxProps {
  value: boolean;
  onChange: (checked: boolean) => void;
  iconClass?: string;
  iconSize?: number;
}

interface AnimatedCheckProps {
  value: boolean;
  size: number;
  className: string;
  opacity: number;
}

const AnimatedCheck = Animated.createAnimatedComponent(
  React.forwardRef(
    (
      { value, size, className, opacity, ...props }: AnimatedCheckProps,
      ref: React.ForwardedRef<any>
    ) => {
      return (
        <View ref={ref} style={{ opacity }}>
          <Check size={size} className={className} {...props} />
        </View>
      );
    }
  )
);

const Checkbox = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'onPress'> &
    CheckboxProps
>(({ className, value, onChange, iconClass, iconSize = 16, ...props }, ref) => {
  const opacity = useSharedValue(0);

  opacity.value = withTiming(value === true ? 1.0 : 0.0, {
    duration: 250,
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <Pressable
      ref={ref}
      role="checkbox"
      accessibilityState={{ checked: value }}
      className={cn(
        'peer h-7 w-7 shrink-0 flex items-center bg-card justify-center rounded-md border border-primary ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      onPress={() => {
        onChange(!value);
      }}
      {...props}
    >
      <View />

      <AnimatedCheck
        size={iconSize || 16}
        className={cn('text-foreground', iconClass) || ''}
        value={value}
        opacity={opacity}
      />
    </Pressable>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
