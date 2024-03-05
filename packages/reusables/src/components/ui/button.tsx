import * as React from 'react';
import { Pressable } from 'react-native';
import { tv, type VariantProps as TVVariantProps } from 'tailwind-variants';
import { cn } from '../../lib/utils';
import { TextClassContext } from './text';

const buttonVariants = tv({
  slots: {
    container:
      'group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
    label:
      'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
  },
  variants: {
    variant: {
      default: {
        container: 'bg-primary web:hover:opacity-90 active:opacity-90',
        label: 'text-primary-foreground',
      },
      destructive: {
        container: 'bg-destructive web:hover:opacity-90 active:opacity-90',
        label: 'text-destructive-foreground',
      },
      outline: {
        container:
          'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        label: 'group-active:text-accent-foreground',
      },
      secondary: {
        container: 'bg-secondary web:hover:opacity-80 active:opacity-80',
        label: 'text-secondary-foreground group-active:text-secondary-foreground',
      },
      ghost: {
        container: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        label: 'group-active:text-accent-foreground',
      },
      link: {
        container: 'web:underline-offset-4 web:hover:underline web:focus:underline ',
        label: 'text-primary group-active:underline',
      },
    },
    size: {
      default: {
        container: 'h-10 px-4 py-2 native:h-12 native:px-5 native:py-3',
        label: '',
      },
      sm: {
        container: 'h-9 rounded-md px-3',
        label: '',
      },
      lg: {
        container: 'h-11 rounded-md px-8 native:h-14',
        label: 'native:text-lg',
      },
      icon: {
        container: 'h-10 w-10',
        label: '',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  TVVariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { container, label } = buttonVariants({ variant, size });

    return (
      <TextClassContext.Provider
        value={cn(props.disabled && 'web:pointer-events-none', label({ variant, size }))}
      >
        <Pressable
          className={cn(
            props.disabled && 'opacity-50 web:pointer-events-none',
            container({ variant, size, className })
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

export { Button, buttonVariants };
export type { ButtonProps };
