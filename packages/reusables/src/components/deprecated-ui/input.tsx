import * as React from 'react';
import { TextInput } from 'react-native';

import { cn } from '../../lib/utils';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'rounded-md border border-input bg-background px-3 text-lg h-12 leading-[1.25] text-foreground items-center  placeholder:text-muted-foreground disabled:opacity-50',
        className
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
