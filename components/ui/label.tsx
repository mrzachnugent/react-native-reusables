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
  <Pressable
    onPress={onPress}
    className='rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    {...rootProps}
  >
    <Text
      ref={ref}
      className={cn(
        'native:text-lg text-foreground font-medium px-0.5 py-1.5 leading-none ',
        className
      )}
      {...props}
    />
  </Pressable>
));

Label.displayName = 'Label';

export { Label };
