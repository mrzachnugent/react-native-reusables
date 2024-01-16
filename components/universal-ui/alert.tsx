import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';
import { Text, View } from 'react-native';
import * as LucideIcon from 'lucide-react-native';

const alertVariants = cva(
  'relative w-full rounded-lg border border-border p-4',
  {
    variants: {
      variant: {
        default: 'bg-background',
        destructive: 'border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const alertIconVariants = cva(
  'absolute left-4 top-4 -translate-y-0.5 text-foreground',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof alertVariants> & {
      icon: keyof typeof LucideIcon;
      iconSize?: number;
      iconClassName?: string;
    }
>(
  (
    {
      className,
      variant,
      children,
      icon,
      iconSize = 16,
      iconClassName,
      ...props
    },
    ref
  ) => {
    const Icon = LucideIcon[icon] as LucideIcon.Icon;
    return (
      <View
        ref={ref}
        role='alert'
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon
          size={iconSize}
          className={cn(cn(alertIconVariants({ variant }), iconClassName))}
        />
        {children}
      </View>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      'pl-7 mb-1 font-medium text-base leading-none tracking-tight text-foreground',
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('pl-7 text-sm leading-relaxed text-foreground', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
