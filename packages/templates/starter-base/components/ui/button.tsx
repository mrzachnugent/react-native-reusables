'use client';

import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Pressable } from 'react-native';

const buttonVariants = cva(
  cn(
    'group flex-row items-center justify-center gap-2 rounded-md shrink-0',
    Platform.select({
      web: "whitespace-nowrap transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-primary shadow-sm active:bg-primary/90',
          Platform.select({ web: 'hover:bg-primary/90', native: 'shadow-black/5' })
        ),
        destructive: cn(
          'bg-destructive shadow-sm active:bg-destructive/90 dark:bg-destructive/60',
          Platform.select({
            web: 'hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
            native: 'shadow-black/5',
          })
        ),
        outline: cn(
          'border border-border bg-background shadow-sm active:bg-accent dark:bg-input/30 dark:border-input dark:active:bg-input/50',
          Platform.select({
            web: 'hover:bg-accent dark:hover:bg-input/50',
            native: 'shadow-black/5',
          })
        ),
        secondary: cn(
          'bg-secondary shadow-sm active:bg-secondary/80',
          Platform.select({ web: 'hover:bg-secondary/80', native: 'shadow-black/5' })
        ),
        ghost: cn(
          'active:bg-accent dark:active:bg-accent/50',
          Platform.select({ web: 'hover:bg-accent dark:hover:bg-accent/50' })
        ),
        link: '',
      },
      size: {
        default: cn('h-10 px-4 py-2', Platform.select({ web: 'has-[>svg]:px-3' })),
        sm: cn('h-9 rounded-md px-3', Platform.select({ web: 'has-[>svg]:px-2.5' })),
        lg: cn('h-11 rounded-md px-6', Platform.select({ web: 'has-[>svg]:px-4' })),
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  cn(
    'text-sm font-medium text-foreground',
    Platform.select({ web: 'transition-colors pointer-events-none' })
  ),
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-white',
        outline: cn(
          'group-active:text-accent-foreground',
          Platform.select({ web: 'group-hover:text-accent-foreground' })
        ),
        secondary: 'text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: cn(
          'text-primary group-active:underline',
          Platform.select({ web: 'group-hover:underline underline-offset-4 hover:underline' })
        ),
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<typeof Pressable> & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(props.disabled && 'opacity-50', buttonVariants({ variant, size }), className)}
        role='button'
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
