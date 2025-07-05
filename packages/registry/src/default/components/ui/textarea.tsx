'use client';

import { cn } from '@/registry/default/lib/utils';
import * as React from 'react';
import { Platform, TextInput, type TextInputProps } from 'react-native';

function Textarea({
  className,
  multiline = true,
  numberOfLines = 4, // On web, numberOfLines also determines initial height. On native, it determines the maximum height.
  placeholderClassName,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
}) {
  return (
    <TextInput
      className={cn(
        'text-foreground border-input dark:bg-input/30 flex flex-row min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm md:text-sm',
        Platform.select({
          web: 'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive field-sizing-content transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed resize-y',
          native: 'shadow-black/5',
        }),
        props.editable === false && 'opacity-50',
        className
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical='top'
      {...props}
    />
  );
}

export { Textarea };
