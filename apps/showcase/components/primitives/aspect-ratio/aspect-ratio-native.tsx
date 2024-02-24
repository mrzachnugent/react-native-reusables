import * as React from 'react';
import { View } from 'react-native';
import * as Slot from '~/components/primitives/slot';
import type { SlottableViewProps } from '~/components/primitives/types';
import type { AspectRatioRootProps } from './types';

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<SlottableViewProps, 'style'> & AspectRatioRootProps
>(({ asChild, ratio = 1, style, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Component ref={ref} style={[style, { aspectRatio: ratio }]} {...props} />
  );
});

Root.displayName = 'RootAspectRatio';

export { Root };
