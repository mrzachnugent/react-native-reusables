import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable } from 'react-native';
import * as Slot from '~/lib/rn-primitives/slot';
import type {
  PressableRef,
  SlottablePressableProps,
} from '~/lib/rn-primitives/types';
import { cn } from '~/lib/utils';
import { TextClassContext } from '~/components/universal-ui/typography';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-md ring-offset-background web:transition-colors web:focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:opacity-90 active:opacity-90',
        destructive: 'bg-destructive hover:opacity-90 active:opacity-90',
        outline:
          'border border-input bg-background hover:bg-accent active:bg-accent',
        secondary: 'bg-secondary hover:opacity-80 active:opacity-80',
        ghost: 'hover:bg-accent active:bg-accent',
        link: '',
      },
      size: {
        default: 'h-10 px-4 py-2 native:h-12 native:px-5 native:py-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8 native:h-14',
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
  'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline:
          'group-hover:text-accent-foreground group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground',
        ghost:
          'group-hover:text-accent-foreground group-active:text-accent-foreground',
        link: 'text-primary web:underline-offset-4 group-hover:underline group-active:underline',
      },
      size: {
        default: '',
        sm: '',
        lg: 'native:text-lg',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = SlottablePressableProps &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<PressableRef, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <TextClassContext.Provider
        value={cn(
          props.disabled && 'web:pointer-events-none',
          buttonTextVariants({ variant, size })
        )}
      >
        <Component
          className={cn(
            props.disabled && 'opacity-50 web:pointer-events-none',
            buttonVariants({ variant, size, className })
          )}
          ref={ref}
          role='button'
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
