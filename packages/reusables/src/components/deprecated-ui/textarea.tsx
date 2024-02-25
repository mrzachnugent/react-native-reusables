import * as React from 'react';
import { TextInput } from 'react-native';

import { cn } from '../../lib/utils';

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
          'rounded-md border border-input bg-background p-3 native:text-lg h-28 leading-[1.25] text-foreground items-center  web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical='top'
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
