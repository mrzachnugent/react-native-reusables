import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';
import { View, Text } from 'react-native';

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

const badgeTextVariants = cva('text-sm font-semibold', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Badge = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof badgeRootVariants> & { textClass?: string }
>(({ className, children, textClass, variant, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(badgeRootVariants({ variant }), className)}
      {...props}
    >
      <Text className={cn(badgeTextVariants({ variant }), textClass)}>
        {children}
      </Text>
    </View>
  );
});

export { Badge, badgeRootVariants, badgeTextVariants };
