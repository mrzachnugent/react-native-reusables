import * as ProgressPrimitive from '@rn-primitives/progress';
import * as React from 'react';
import type { ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { createStyleSheet, useStyleSheet } from '~/lib/styles/stylesheet';
import { cs } from '~/lib/styles/utils/combine';

const Progress = React.forwardRef<
  ProgressPrimitive.RootRef,
  ProgressPrimitive.RootProps & {
    indicatorStyle?: ViewStyle;
  }
>(({ style, value, indicatorStyle, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return (
    <ProgressPrimitive.Root ref={ref} style={cs(styles.root, style)} {...props}>
      <Indicator value={value} style={indicatorStyle} />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

function Indicator({ value, style }: { value: number | undefined | null; style?: ViewStyle }) {
  const { theme } = useStyleSheet(stylesheet);
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => {
    return {
      height: '100%',
      backgroundColor: theme.colors.primary,
      width: withSpring(
        `${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true }
      ),
      ...style,
    };
  }, [style, theme.colors.primary]);

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View style={cs(indicator)} />
    </ProgressPrimitive.Indicator>
  );
}

const stylesheet = createStyleSheet(({ colors }, { space, rounded }) => {
  return {
    root: {
      position: 'relative',
      height: space[4],
      width: '100%',
      overflow: 'hidden',
      borderRadius: rounded['full'],
      backgroundColor: colors.secondary,
    },
  };
});
