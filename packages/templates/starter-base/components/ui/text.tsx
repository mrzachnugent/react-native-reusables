'use client';

import { cn } from '@/lib/utils';
import * as Slot from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Text as RNText, type Role } from 'react-native';

const textVariants = cva(
  cn(
    'text-base text-foreground',
    Platform.select({
      web: 'select-text',
    })
  ),
  {
    variants: {
      variant: {
        default: '',
        h1: cn(
          'text-center text-4xl font-extrabold tracking-tight',
          Platform.select({ web: 'scroll-m-20 text-balance' })
        ),
        h2: cn(
          'border-b border-border pb-2 text-3xl font-semibold tracking-tight',
          Platform.select({ web: 'scroll-m-20 first:mt-0' })
        ),
        h3: cn('text-2xl font-semibold tracking-tight', Platform.select({ web: 'scroll-m-20' })),
        h4: cn('text-xl font-semibold tracking-tight', Platform.select({ web: 'scroll-m-20' })),
        p: 'leading-7 mt-3 sm:mt-6',
        blockquote: 'mt-4 sm:mt-6 border-l-2 pl-3 sm:pl-6 italic',
        code: cn(
          'bg-muted relative rounded px-[0.3rem] py-[0.2rem] text-sm font-semibold',
          Platform.select({ android: 'font-sans', default: 'font-mono' })
        ),
        lead: 'text-muted-foreground text-xl',
        large: 'text-lg font-semibold',
        small: 'text-sm leading-none font-medium',
        muted: 'text-muted-foreground text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  asChild = false,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof RNText> &
  VariantProps<typeof textVariants> & {
    ref?: React.RefObject<RNText>;
    asChild?: boolean;
  }) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      {...getSemanticProps(variant)}
      className={cn(textVariants({ variant }), textClass, className)}
      {...props}
    />
  );
}

export { Text, TextClassContext };

function getSemanticProps(variant: VariantProps<typeof textVariants>['variant']) {
  switch (variant) {
    case 'h1':
      return {
        role: 'heading',
        'aria-level': '1',
      } as const;
    case 'h2':
      return {
        role: 'heading',
        'aria-level': '2',
      } as const;
    case 'h3':
      return {
        role: 'heading',
        'aria-level': '3',
      } as const;
    case 'h4':
      return {
        role: 'heading',
        'aria-level': '4',
      } as const;
    case 'blockquote':
      return Platform.select({ web: { role: 'blockquote' as Role } });
    case 'code':
      return Platform.select({ web: { role: 'code' as Role } });
    default:
      return {};
  }
}
