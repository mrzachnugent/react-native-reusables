import * as React from 'react';
import { View } from 'react-native';
import { cn } from '../../lib/utils';

const Separator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn('native:h-[1] web:h-[1px] bg-border', className)}
      role='separator'
      {...props}
    />
  );
});

Separator.displayName = 'Separator';

export { Separator };
