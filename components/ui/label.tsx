import React from 'react';

import { cn } from '~/lib/utils';
import { Text, Pressable } from 'react-native';

const Label = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & {
    rootProps?: Omit<
      React.ComponentPropsWithoutRef<typeof Pressable>,
      'onPress'
    >;
  }
>(({ className, onPress, rootProps, ...props }, ref) => (
  <Pressable onPress={onPress} {...rootProps}>
    <Text
      ref={ref}
      className={cn(
        'text-lg text-foreground font-medium px-0.5 py-1.5 leading-none',
        className
      )}
      {...props}
    />
  </Pressable>
));

Label.displayName = 'Label';

export { Label };
