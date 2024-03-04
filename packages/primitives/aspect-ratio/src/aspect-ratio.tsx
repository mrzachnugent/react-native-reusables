import * as React from 'react';
import { View, type ViewStyle } from 'react-native';
import * as Slot from '@rnr/slot';
import type { SlottableViewProps } from '@rnr/types';

interface AspectRatioRootProps {
  ratio?: number;
  style?: ViewStyle;
}

export type { AspectRatioRootProps };

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<SlottableViewProps, 'style'> & AspectRatioRootProps
>(({ asChild, ratio = 1, style, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} style={[style, { aspectRatio: ratio }]} {...props} />;
});

Root.displayName = 'RootAspectRatio';

export { Root };
