import React from 'react';
import { View, ViewStyle } from 'react-native';
import * as Slot from '~/lib/rn-primitives/todo/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

interface RootProps {
  ratio?: number;
  style?: ViewStyle;
}

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<ComponentPropsWithAsChild<typeof View>, 'style'> & RootProps
>(({ asChild, ratio = 1, style, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Component ref={ref} style={[style, { aspectRatio: ratio }]} {...props} />
  );
});

AspectRatio.displayName = 'PrimitiveAspectRatio';

export { AspectRatio };
