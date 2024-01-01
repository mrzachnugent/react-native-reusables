import React from 'react';
import { View, ViewStyle } from 'react-native';
import { ViewSlot } from '~/lib/rn-primitives/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/utils';

interface RootProps {
  ratio?: number;
  style?: ViewStyle;
}

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof View>,
  Omit<ComponentPropsWithAsChild<typeof View>, 'style'> & RootProps
>(({ asChild, ratio = 1, style, ...props }, ref) => {
  const Slot = asChild ? ViewSlot : View;
  return <Slot ref={ref} style={[style, { aspectRatio: ratio }]} {...props} />;
});

AspectRatio.displayName = 'PrimitiveAspectRatio';

export { AspectRatio };
