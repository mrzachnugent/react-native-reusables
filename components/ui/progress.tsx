import React from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { cn } from '~/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof Animated.View>,
  Omit<React.ComponentPropsWithoutRef<typeof Animated.View>, 'style'> & {
    /**
     * Value between 0 and 100
     */
    progress: SharedValue<number>;
    rootClass?: string;
    style?: ViewStyle;
  }
>(({ progress, rootClass, className, style, ...props }, ref) => {
  const stylez = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(
          progress.value,
          [0, 100],
          [1, 100],
          Extrapolate.CLAMP
        )}%`,
        { overshootClamping: true }
      ),
    };
  });

  return (
    <View
      className={cn(
        'rounded-xl h-4 bg-border overflow-hidden relative',
        rootClass
      )}
      role='progressbar'
    >
      <Animated.View
        style={[stylez, style]}
        className={cn('h-full bg-foreground', className)}
        {...props}
      />
    </View>
  );
});

Progress.displayName = 'Progress';

export { Progress };
