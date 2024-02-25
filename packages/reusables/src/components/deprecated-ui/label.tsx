import * as React from 'react';

import { cn } from '../../lib/utils';
import { Text, Pressable } from 'react-native';

const Label = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & {
    rootProps?: Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'onPress'>;
  }
>(({ className, onPress, rootProps, ...props }, ref) => (
  <Pressable
    onPress={onPress}
    className='rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:disabled:pointer-events-none disabled:opacity-50'
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
