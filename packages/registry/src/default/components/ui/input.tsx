'use client';

import { cn } from '@/registry/default/lib/utils';
import * as React from 'react';
import { Platform, TextInput, type TextInputProps } from 'react-native';

const DEFAULT_HIT_SLOP = 12;

function Input({
  className,
  placeholderClassName,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
}) {
  return (
    <TextInput
      className={cn(
        'dark:bg-input/30 border-input flex flex-row items-center h-9 text-base leading-5 w-full min-w-0 rounded-md border bg-background px-3 py-1 text-foreground shadow-sm',
        props.editable === false &&
          cn(
            'opacity-50',
            Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' })
          ),
        Platform.select({
          web: cn(
            'md:text-sm placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground transition-[color,box-shadow] outline-none',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
          ),
          native: 'shadow-black/5',
        }),
        className
      )}
      hitSlop={DEFAULT_HIT_SLOP}
      {...props}
    />
  );
}

export { Input };
