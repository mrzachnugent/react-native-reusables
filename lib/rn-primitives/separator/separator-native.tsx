import React from 'react';
import { View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot/slot-native';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';
import { SeparatorRootProps } from './types';

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & SeparatorRootProps
>(({ asChild, decorative, orientation = 'horizontal', ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Component
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={orientation}
      ref={ref}
      {...props}
    />
  );
});

Root.displayName = 'RootSeparator';

export { Root };
