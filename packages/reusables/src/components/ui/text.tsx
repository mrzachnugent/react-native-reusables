import { cn } from '@/lib/utils';
import * as Slot from '@rn-primitives/slot';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Text as RNText } from 'react-native';

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
        p: 'leading-7 mt-6',
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
  return <Component className={cn(textVariants({ variant }), textClass, className)} {...props} />;
}

export { Text, TextClassContext };
