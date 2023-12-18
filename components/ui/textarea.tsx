import React from 'react';
import { TextInput } from 'react-native';

import { cn } from '~/lib/utils';

const Textarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(
  (
    {
      className,
      editable = true,
      multiline = true,
      numberOfLines = 4,
      placeholderClassName,
      ...props
    },
    ref
  ) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'rounded-md border border-input bg-background px-3 text-lg h-28 leading-[1.25] text-foreground items-center  placeholder:text-muted-foreground disabled:opacity-50',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
