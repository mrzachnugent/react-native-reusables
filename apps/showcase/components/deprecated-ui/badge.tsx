import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text, View } from 'react-native';

const badgeRootVariants = cva(
  'items-center rounded-full border px-2.5 py-0.5',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary ',
        secondary: 'border-transparent bg-secondary ',
        destructive: 'border-transparent bg-destructive ',
        outline: 'border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva('font-semibold', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
    },
    size: {
      sm: 'text-xs native:text-sm',
      md: 'text-sm native:text-base',
      lg: 'text-base native:text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const Badge = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof badgeTextVariants> & { textClass?: string }
>(({ className, children, textClass, variant, size, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={badgeRootVariants({ variant, className })}
      {...props}
    >
      <Text
        className={badgeTextVariants({ variant, size, className: textClass })}
      >
        {children}
      </Text>
    </View>
  );
});

export { Badge, badgeRootVariants, badgeTextVariants };
