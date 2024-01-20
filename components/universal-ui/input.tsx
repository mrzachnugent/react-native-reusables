import React from 'react';
import { TextInput } from 'react-native';

import { cn } from '~/lib/utils';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'web:flex h-10 native:h-12 w-full rounded-md border border-input  bg-background px-3 web:py-2  text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.editable === false && 'opacity-50 web:cursor-not-allowed',
        className
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
