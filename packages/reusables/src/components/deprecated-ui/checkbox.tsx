import * as React from 'react';
import { Pressable } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { Check } from '../../lib/icons/Check';
import { cn } from '../../lib/utils';

interface CheckboxProps {
  value: boolean;
  onChange: (checked: boolean) => void;
  iconClass?: string;
  iconSize?: number;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'onPress'> & CheckboxProps
>(({ className, value, onChange, iconClass, iconSize = 16, ...props }, ref) => {
  const opacity = useSharedValue(0);

  opacity.value = withTiming(value === true ? 1.0 : 0.0, {
    duration: 200,
  });

  return (
    <Pressable
      ref={ref}
      role='checkbox'
      accessibilityState={{ checked: value }}
      className={cn(
        'web:peer h-7 w-7 shrink-0 flex items-center bg-card justify-center rounded-md border border-primary web:ring-offset-background web:disabled:cursor-not-allowed web:disabled:opacity-50',
        className
      )}
      onPress={() => {
        onChange(!value);
      }}
      {...props}
    >
      <Animated.View style={{ opacity }}>
        <Check size={iconSize} className={cn('text-foreground', iconClass)} />
      </Animated.View>
    </Pressable>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
