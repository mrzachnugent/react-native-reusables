import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Pressable, type GestureResponderEvent } from 'react-native';
import { TextClassContext } from '~/components/universal-ui/typography';
import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary web:hover:opacity-90',
        destructive: 'bg-destructive web:hover:opacity-90',
        outline:
          'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground',
        secondary: 'bg-secondary web:hover:opacity-80',
        ghost: 'web:hover:bg-accent web:hover:text-accent-foreground',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline',
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

const buttonPressedVariants = cva('', {
  variants: {
    variant: {
      default: 'opacity-90', // `active:opacity-90`
      destructive: 'opacity-90', // `active:opacity-90`
      outline: 'bg-accent', // `active:bg-accent`
      secondary: 'opacity-80', // `active:opacity-80`
      ghost: 'bg-accent', // `active:bg-accent`
      link: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: '',
        secondary: 'text-secondary-foreground',
        ghost: '',
        link: 'text-primary',
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

const buttonTextPressedVariants = cva('', {
  variants: {
    variant: {
      default: '',
      destructive: '',
      outline: 'text-accent-foreground', // `group-active:text-accent-foreground`
      secondary: 'text-secondary-foreground', // `group-active:text-secondary-foreground`
      ghost: 'text-accent-foreground', // `group-active:text-accent-foreground`
      link: 'underline', // `group-active:underline`
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      onPressIn: onPressInProp,
      onPressOut: onPressOutProp,
      ...props
    },
    ref
  ) => {
    // Given bug in NativeWind <= v4.0.13: https://github.com/marklawlor/nativewind/issues/740
    // `isPressed` is a workaround for `group` and `active:*` preventing `onPress` to be updated: https://github.com/mrzachnugent/react-native-reusables/issues/25
    // When bug is resolved, add `group` to buttonVariants, add commented classNames in pressed variants to respective variants, and remove `isPressed` related code.
    const [isPressed, setIsPressed] = React.useState(false);
    function onPressIn(ev: GestureResponderEvent) {
      onPressInProp?.(ev);
      if (Platform.OS !== 'web') {
        setIsPressed(true);
      }
    }
    function onPressOut(ev: GestureResponderEvent) {
      onPressInProp?.(ev);
      if (Platform.OS !== 'web') {
        setIsPressed(false);
      }
    }

    return (
      <TextClassContext.Provider
        value={cn(
          props.disabled && 'web:pointer-events-none',
          buttonTextVariants({ variant, size }),
          isPressed && buttonTextPressedVariants({ variant })
        )}
      >
        <Pressable
          className={cn(
            props.disabled && 'opacity-50 web:pointer-events-none',
            buttonVariants({ variant, size, className }),
            isPressed && buttonPressedVariants({ variant })
          )}
          ref={ref}
          role='button'
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
