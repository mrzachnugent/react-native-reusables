import React from 'react';
import { View } from 'react-native';
import * as Slot from '~/lib/rn-primitives/todo/slot';
import { ComponentPropsWithAsChild } from '~/lib/rn-primitives/types';

interface RootProps {
  decorative?: boolean;
}

const Root = React.forwardRef<
  React.ElementRef<typeof View>,
  ComponentPropsWithAsChild<typeof View> & RootProps
>(({ asChild, decorative, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Component
      role={decorative ? 'presentation' : 'separator'}
      ref={ref}
      {...props}
    />
  );
});

Root.displayName = 'RootSeparator';

export { Root };
