import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { useColorScheme } from 'nativewind';
import { Platform, Pressable, Text, View } from 'react-native';
import { cn, isTextChildren } from '~/lib/utils';
import { PressableSlot } from '../primitives/pressable-slot';

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-md text-sm font-medium ring-offset-background disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        destructive: 'bg-destructive',
        outline: 'border border-input bg-background',
        secondary: 'bg-secondary ',
        ghost: '',
        link: '',
      },
      size: {
        default: 'px-6 py-3.5',
        sm: 'px-3 py-2',
        lg: 'px-8 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      link: 'text-primary underline',
    },
    size: {
      default: 'text-xl',
      sm: 'text-lg',
      lg: 'text-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const rippleColor = (isThemeDark: boolean) => {
  const secondary = isThemeDark ? 'hsl(240 4% 16%)' : 'hsl(240 5% 96%)';
  return {
    default: isThemeDark ? '#d4d4d8' : '#3f3f46',
    destructive: isThemeDark ? '#b91c1c' : '#f87171',
    outline: secondary,
    secondary: isThemeDark ? '#3f3f46' : '#e4e4e7',
    ghost: secondary,
    link: secondary,
  };
};

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof buttonVariants> & {
      textClass?: string;
      androidRootClass?: string;
    }
>(
  (
    {
      className,
      textClass,
      variant = 'default',
      size,
      children,
      androidRootClass,
      ...props
    },
    ref
  ) => {
    const { colorScheme } = useColorScheme();
    const Root = Platform.OS === 'android' ? View : PressableSlot;
    return (
      <Root
        className={
          Platform.OS === 'android'
            ? cn('flex-row rounded-md overflow-hidden', androidRootClass)
            : ''
        }
      >
        <Pressable
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          android_ripple={{
            color: rippleColor(colorScheme === 'dark')[variant as 'default'],
            borderless: false,
          }}
          {...props}
        >
          {isTextChildren(children)
            ? ({ pressed }) => (
                <Text
                  className={cn(
                    pressed ? 'opacity-70' : '',
                    buttonTextVariants({ variant, size, className: textClass })
                  )}
                >
                  {children as string | string[]}
                </Text>
              )
            : children}
        </Pressable>
      </Root>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
